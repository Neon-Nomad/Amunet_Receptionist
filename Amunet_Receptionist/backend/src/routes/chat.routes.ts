import express from 'express';
import { chatMessage } from '../controllers/chat.controller';
import { apiLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/', apiLimiter, chatMessage);

export default router;