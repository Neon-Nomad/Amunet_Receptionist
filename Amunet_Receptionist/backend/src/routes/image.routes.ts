import express from 'express';
import { generateImage } from '../controllers/image.controller';
import { authenticateToken } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/generate', authenticateToken, apiLimiter, generateImage);

export default router;