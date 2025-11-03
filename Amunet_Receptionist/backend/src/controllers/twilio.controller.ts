import { Request, Response } from 'express';
import db from '../db/connection';
import geminiService from '../services/gemini.service';
import twilioService from '../services/twilio.service';
import sendgridService from '../services/sendgrid.service';
import logger from '../utils/logger';

export const inboundWebhook = async (req: Request, res: Response) => {
  try {
    const { From, To, TranscriptionText, CallSid, CallStatus } = req.body;

    // Find business by phone number
    const business = await db('businesses').where({ phone: To }).first();
    
    if (!business) {
      logger.warn('Inbound call to unknown number', { To });
      return res.status(200).send('<Response></Response>');
    }

    // Store call
    const [call] = await db('calls')
      .insert({
        business_id: business.id,
        from_number: From,
        to_number: To,
        transcript: TranscriptionText || '',
        status: CallStatus || 'completed',
      })
      .returning('*');

    // Classify lead if transcript available
    if (TranscriptionText) {
      const classification = await geminiService.classifyLead(TranscriptionText);

      await db('calls').where({ id: call.id }).update({
        priority: classification.priority,
        estimated_value: classification.estimatedValue,
        metadata: JSON.stringify({
          intent: classification.intent,
          keywords: classification.keywords,
        }),
      });

      // High-priority alert
      if (classification.priority === 'HIGH' || classification.estimatedValue >= 1000) {
        if (business.phone) {
          await twilioService.sendHighPriorityAlert(business.phone, {
            from: From,
            estimatedValue: classification.estimatedValue,
            intent: classification.intent,
          });
        }
      }
    }

    logger.info('Inbound call processed', { businessId: business.id, from: From });

    res.status(200).send('<Response><Say>Thank you for calling. We will get back to you soon.</Say></Response>');
  } catch (error) {
    logger.error('Twilio webhook error', error);
    res.status(500).send('<Response><Say>An error occurred.</Say></Response>');
  }
};