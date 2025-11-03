import { Request, Response } from 'express';
import geminiService from '../services/gemini.service';
import logger from '../utils/logger';

const CHAT_CONTEXT = `You are Amunet AI's website assistant. Help visitors learn about:
- AI Receptionist (24/7 call handling)
- SMS & Email automation
- Social media content creation
- Newsletter management
- Amunet Studio (AI images)
- Amunet Motion (AI videos)
Pricing: Core $997/mo, Growth $1997/mo, Elite (custom). 72-hour setup fee waiver active.`;

export const chatMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    const response = await geminiService.chatResponse(message, CHAT_CONTEXT);

    logger.info('Chat interaction', { message: message.slice(0, 50) });

    res.json({ response });
  } catch (error) {
    logger.error('Chat error', error);
    res.status(500).json({ error: 'Chat failed', response: 'Sorry, I encountered an error. Please try again.' });
  }
};