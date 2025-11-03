import express from 'express';
import { inboundWebhook } from '../controllers/twilio.controller';
import { webhookLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/inbound', webhookLimiter, inboundWebhook);

export default router;