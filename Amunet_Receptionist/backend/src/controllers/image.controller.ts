import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import imageService from '../services/image.service';
import logger from '../utils/logger';

export const generateImage = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, size } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt required' });
    }

    const imageUrl = await imageService.generateImage(prompt, size || '1024x1024');

    logger.info('Image generated', { userId: req.user?.id, prompt: prompt.slice(0, 50) });

    res.json({ imageUrl });
  } catch (error) {
    logger.error('Image generation failed', error);
    res.status(500).json({ error: 'Image generation failed' });
  }
};