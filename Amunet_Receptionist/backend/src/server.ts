import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors';
import { helmetMiddleware } from './middleware/helmet';
import logger from './utils/logger';

// Routes
import authRoutes from './routes/auth.routes';
import contactRoutes from './routes/contact.routes';
import chatRoutes from './routes/chat.routes';
import twilioRoutes from './routes/twilio.routes';
import stripeRoutes from './routes/stripe.routes';
import imageRoutes from './routes/image.routes';
import videoRoutes from './routes/video.routes';
import onboardingRoutes from './routes/onboarding.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(corsMiddleware);
app.use(helmetMiddleware);

// Body parsing - raw for Stripe webhook
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/twilio', twilioRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/onboarding', onboardingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Amunet AI Backend running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;