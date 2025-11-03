import express from 'express';
import { submitContact } from '../controllers/contact.controller';
import { apiLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post('/', apiLimiter, submitContact);

export default router;