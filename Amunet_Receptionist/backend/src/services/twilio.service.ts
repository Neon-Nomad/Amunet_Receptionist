import twilio from 'twilio';
import logger from '../utils/logger';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

class TwilioService {
  private client = twilio(accountSid, authToken);

  async sendSMS(to: string, body: string, from?: string): Promise<void> {
    try {
      await this.client.messages.create({
        body,
        from: from || twilioPhone,
        to,
      });
      logger.info('SMS sent', { to, body: body.slice(0, 50) });
    } catch (error) {
      logger.error('SMS send failed', error);
      throw error;
    }
  }

  async sendHighPriorityAlert(ownerPhone: string, leadInfo: any): Promise<void> {
    const message = `🔥 HIGH PRIORITY LEAD via Amunet AI
From: ${leadInfo.from}
Value: $${leadInfo.estimatedValue}
Intent: ${leadInfo.intent}

View details: ${process.env.APP_URL}/leads`;

    await this.sendSMS(ownerPhone, message);
  }

  // Custom credentials version (for BYO mode)
  async sendSMSWithCustomCreds(
    to: string,
    body: string,
    credentials: { sid: string; token: string; from: string }
  ): Promise<void> {
    const customClient = twilio(credentials.sid, credentials.token);
    await customClient.messages.create({
      body,
      from: credentials.from,
      to,
    });
  }
}

export default new TwilioService();