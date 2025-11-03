import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../utils/logger';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  private visionModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Gemini text generation failed', error);
      throw new Error('Failed to generate text');
    }
  }

  async summarizeTranscript(transcript: string): Promise<string> {
    const prompt = `Summarize this call transcript concisely in 2-3 sentences:\n\n${transcript}`;
    return this.generateText(prompt);
  }

  async classifyLead(transcript: string): Promise<{
    intent: string;
    keywords: string[];
    estimatedValue: number;
    priority: 'LOW' | 'HIGH';
  }> {
    const prompt = `Analyze this call transcript and extract: