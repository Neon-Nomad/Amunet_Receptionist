import { Request, Response } from 'express';
import db from '../db/connection';
import sendgridService from '../services/sendgrid.service';
import logger from '../utils/logger';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, company, email, phone, interest, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }

    // Save to database
    await db('contact_submissions').insert({
      name,
      company,
      email,
      phone,
      interest,
      message,
    });

    // Send email to sales
    await sendgridService.sendContactFormEmail({
      name,
      email,
      company,
      phone,
      interest,
      message,
    });

    logger.info('Contact form submitted', { email, name });

    res.status(201).json({ success: true, message: 'Thank you! We will be in touch soon.' });
  } catch (error) {
    logger.error('Contact form error', error);
    res.status(500).json({ error: 'Submission failed' });
  }
};