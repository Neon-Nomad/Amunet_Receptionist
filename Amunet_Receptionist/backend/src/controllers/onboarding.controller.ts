import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import db from '../db/connection';
import { encrypt } from '../utils/encryption';
import stripeService from '../services/stripe.service';
import logger from '../utils/logger';

export const saveBusinessInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { name, industry, description } = req.body;
    const userId = req.user!.id;

    const [business] = await db('businesses')
      .insert({
        user_id: userId,
        name,
        industry,
        description,
      })
      .returning('*');

    // Initialize branding
    await db('branding').insert({
      business_id: business.id,
      color_hex: '#9D00FF',
      voice_style: 'professional',
    });

    // Initialize services_selected
    await db('services_selected').insert({ business_id: business.id });

    res.json({ business });
  } catch (error) {
    logger.error('Save business info failed', error);
    res.status(500).json({ error: 'Failed to save business info' });
  }
};

export const saveContactInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId, phone, email, hours, timezone } = req.body;

    await db('businesses').where({ id: businessId }).update({
      phone,
      email,
      hours: JSON.stringify(hours),
      timezone,
    });

    res.json({ success: true });
  } catch (error) {
    logger.error('Save contact info failed', error);
    res.status(500).json({ error: 'Failed to save contact info' });
  }
};

export const saveServices = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId, services } = req.body;

    await db('services_selected').where({ business_id: businessId }).update(services);

    res.json({ success: true });
  } catch (error) {
    logger.error('Save services failed', error);
    res.status(500).json({ error: 'Failed to save services' });
  }
};

export const saveIntegration = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId, service, mode, credentials } = req.body;

    let encryptedCreds = null;
    if (mode === 'custom' && credentials) {
      encryptedCreds = encrypt(JSON.stringify(credentials));
    }

    await db('integrations')
      .insert({
        business_id: businessId,
        service,
        mode,
        encrypted_credentials: encryptedCreds,
      })
      .onConflict(['business_id', 'service'])
      .merge();

    res.json({ success: true });
  } catch (error) {
    logger.error('Save integration failed', error);
    res.status(500).json({ error: 'Failed to save integration' });
  }
};

export const saveBranding = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId, colorHex, logoUrl, voiceStyle, greetingScript } = req.body;

    await db('branding').where({ business_id: businessId }).update({
      color_hex: colorHex,
      logo_url: logoUrl,
      voice_style: voiceStyle,
      greeting_script: greetingScript,
    });

    res.json({ success: true });
  } catch (error) {
    logger.error('Save branding failed', error);
    res.status(500).json({ error: 'Failed to save branding' });
  }
};

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId } = req.body;

    // Seed demo data
    await seedDemoData(businessId);

    logger.info('Onboarding completed', { businessId });

    res.json({ success: true, message: 'Onboarding completed! Demo data seeded.' });
  } catch (error) {
    logger.error('Complete onboarding failed', error);
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
};

async function seedDemoData(businessId: string) {
  // Sample call
  await db('calls').insert({
    business_id: businessId,
    from_number: '+15555551234',
    to_number: '+15555555678',
    transcript: 'Hi, I\'m interested in your premium package. Can you call me back?',
    status: 'completed',
    priority: 'HIGH',
    estimated_value: 1500,
    metadata: JSON.stringify({ intent: 'purchase_inquiry', keywords: ['premium', 'package'] }),
  });

  // Sample newsletter
  await db('newsletters').insert({
    business_id: businessId,
    subject: 'Welcome to Our Newsletter!',
    body_html: '<h1>Hello!</h1><p>Thank you for subscribing.</p>',
    send_status: 'draft',
  });

  // Sample post
  await db('posts').insert({
    business_id: businessId,
    platform: 'instagram',
    caption: 'Exciting news coming soon! 🚀',
    media_url: 'https://via.placeholder.com/1080x1080',
    status: 'draft',
  });
}