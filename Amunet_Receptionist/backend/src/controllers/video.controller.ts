import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import db from '../db/connection';
import videoService from '../services/video.service';
import soraService from '../services/sora.service';
import logger from '../utils/logger';

export const generateVideo = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, aspectRatio, duration, businessId } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt required' });
    }

    const videoUrl = await videoService.generateVideo(
      prompt,
      aspectRatio || '16:9',
      duration || 15
    );

    // Save to database
    if (businessId) {
      await db('videos').insert({
        business_id: businessId,
        prompt,
        video_url: videoUrl,
        engine: 'gemini',
        aspect_ratio: aspectRatio,
        duration,
        status: 'completed',
      });
    }

    logger.info('Video generated', { userId: req.user?.id, prompt: prompt.slice(0, 50) });

    res.json({ videoUrl, status: 'completed' });
  } catch (error) {
    logger.error('Video generation failed', error);
    res.status(500).json({ error: 'Video generation failed' });
  }
};

export const generateSoraVideo = async (req: AuthRequest, res: Response) => {
  try {
    // Admin only
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { prompt, aspectRatio, duration, businessId } = req.body;

    const creditsRemaining = soraService.getCreditsRemaining();
    if (creditsRemaining <= 0) {
      return res.status(429).json({ error: 'Sora credits exhausted, falling back to Gemini' });
    }

    const videoUrl = await soraService.generateVideo(prompt, aspectRatio || '16:9', duration || 15);

    if (businessId) {
      await db('videos').insert({
        business_id: businessId,
        prompt,
        video_url: videoUrl,
        engine: 'sora',
        aspect_ratio: aspectRatio,
        duration,
        status: 'completed',
      });
    }

    logger.info('Sora video generated', { userId: req.user?.id, creditsRemaining: soraService.getCreditsRemaining() });

    res.json({ videoUrl, status: 'completed', engine: 'sora', creditsRemaining: soraService.getCreditsRemaining() });
  } catch (error) {
    logger.error('Sora video generation failed', error);
    res.status(500).json({ error: 'Sora generation failed' });
  }
};