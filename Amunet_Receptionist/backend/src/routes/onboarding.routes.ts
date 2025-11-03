import express from 'express';
import {
  saveBusinessInfo,
  saveContactInfo,
  saveServices,
  saveIntegration,
  saveBranding,
  completeOnboarding,
} from '../controllers/onboarding.controller';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/business', authenticateToken, saveBusinessInfo);
router.post('/contact', authenticateToken, saveContactInfo);
router.post('/services', authenticateToken, saveServices);
router.post('/integration', authenticateToken, saveIntegration);
router.post('/branding', authenticateToken, saveBranding);
router.post('/complete', authenticateToken, completeOnboarding);

export default router;