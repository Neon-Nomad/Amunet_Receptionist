import express from 'express';
import { generateVideo, generateSoraVideo } from '../controllers/video.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/generate', authenticateToken, apiLimiter, generateVideo);
router.post('/sora', authenticateToken, requireAdmin, apiLimiter, generateSoraVideo);

export default router;