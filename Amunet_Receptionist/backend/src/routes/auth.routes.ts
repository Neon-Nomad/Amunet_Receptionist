import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);

export default router;