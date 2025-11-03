import sgMail from '@sendgrid/mail';
import logger from '../utils/logger';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'no-reply@amunet.ai';
const SALES_EMAIL = process.env.SENDGRID_SALES_EMAIL || 'sales@amunet.ai';

class SendGridService {
  async sendContactFormEmail(data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    interest?: string;
    message?: string;
  }): Promise<void> {
    const msg = {
      to: SALES_EMAIL,
      from: FROM_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Interest:</strong> ${data.interest || 'General'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'No message provided'}</p>
      `,
    };

    try {
      await sgMail.send(msg);
      logger.info('Contact form email sent', { to: SALES_EMAIL });
    } catch (error) {
      logger.error('SendGrid contact email failed', error);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const msg = {
      to,
      from: FROM_EMAIL,
      subject: 'Welcome to Amunet AI',
      html: `
        <h1>Welcome to Amunet AI, ${name}!</h1>
        <p>Your intelligent business automation platform is ready.</p>
        <p><a href="${process.env.APP_URL}/onboarding">Complete your setup</a></p>
      `,
    };

    try {
      await sgMail.send(msg);
      logger.info('Welcome email sent', { to });
    } catch (error) {
      logger.error('Welcome email failed', error);
    }
  }

  async sendNewsletter(
    to: string[],
    subject: string,
    htmlContent: string
  ): Promise<void> {
    const msg = {
      to,
      from: FROM_EMAIL,
      subject,
      html: htmlContent,
    };

    try {
      await sgMail.sendMultiple(msg);
      logger.info('Newsletter sent', { recipients: to.length });
    } catch (error) {
      logger.error('Newsletter send failed', error);
      throw error;
    }
  }

  async sendWithCustomCreds(
    apiKey: string,
    from: string,
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const customSgMail = require('@sendgrid/mail');
    customSgMail.setApiKey(apiKey);
    await customSgMail.send({ to, from, subject, html });
  }
}

export default new SendGridService();