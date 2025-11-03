import express from 'express';
import { createCheckout, webhook } from '../controllers/stripe.controller';
import { webhookLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/checkout', createCheckout);
router.post('/webhook', express.raw({ type: 'application/json' }), webhookLimiter, webhook);

export default router;