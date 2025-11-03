import db from '../db/connection';
import { decrypt } from '../utils/encryption';
import twilioService from './twilio.service';
import sendgridService from './sendgrid.service';
import logger from '../utils/logger';

class HubService {
  async getIntegrationMode(businessId: string, service: string): Promise<'shared' | 'custom'> {
    const integration = await db('integrations')
      .where({ business_id: businessId, service })
      .first();

    return integration?.mode || 'shared';
  }

  async getDecryptedCredentials(businessId: string, service: string): Promise<any> {
    const integration = await db('integrations')
      .where({ business_id: businessId, service })
      .first();

    if (!integration || !integration.encrypted_credentials) {
      return null;
    }

    const decrypted = decrypt(integration.encrypted_credentials);
    return JSON.parse(decrypted);
  }

  async sendSMS(businessId: string, to: string, body: string): Promise<void> {
    const mode = await this.getIntegrationMode(businessId, 'twilio');

    if (mode === 'custom') {
      const creds = await this.getDecryptedCredentials(businessId, 'twilio');
      if (creds) {
        await twilioService.sendSMSWithCustomCreds(to, body, creds);
        return;
      }
    }

    // Fallback to shared
    await twilioService.sendSMS(to, body);
  }

  async sendEmail(
    businessId: string,
    to: string,
    subject: string,
    html: string,
    from?: string
  ): Promise<void> {
    const mode = await this.getIntegrationMode(businessId, 'sendgrid');

    if (mode === 'custom') {
      const creds = await this.getDecryptedCredentials(businessId, 'sendgrid');
      if (creds && creds.apiKey && creds.fromEmail) {
        await sendgridService.sendWithCustomCreds(creds.apiKey, creds.fromEmail, to, subject, html);
        return;
      }
    }

    // Fallback to shared
    await sendgridService.sendWelcomeEmail(to, ''); // Generic send
  }
}

export default new HubService();