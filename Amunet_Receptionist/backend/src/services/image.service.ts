import logger from '../utils/logger';
import geminiService from './gemini.service';

class ImageService {
  async generateImage(prompt: string, size: string = '1024x1024'): Promise<string> {
    logger.info('Image generation via Gemini/Nano Banana', { prompt, size });
    
    // Use Gemini service (or actual image API)
    const imageUrl = await geminiService.generateImage(prompt);
    
    return imageUrl;
  }
}

export default new ImageService();