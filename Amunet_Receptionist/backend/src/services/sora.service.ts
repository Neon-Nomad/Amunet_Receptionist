import logger from '../utils/logger';

class SoraService {
  private creditsRemaining: number = parseInt(process.env.SORA_CREDITS_LIMIT || '100');

  async generateVideo(prompt: string, aspectRatio: string, duration: number): Promise<string> {
    if (this.creditsRemaining <= 0) {
      throw new Error('Sora credits exhausted');
    }

    logger.info('Sora video generation (admin)', { prompt, creditsRemaining: this.creditsRemaining });

    // TODO: Call OpenAI Sora API
    // Placeholder response
    this.creditsRemaining--;

    return `/videos/sora/premium_${Date.now()}.mp4`;
  }

  getCreditsRemaining(): number {
    return this.creditsRemaining;
  }
}

export default new SoraService();