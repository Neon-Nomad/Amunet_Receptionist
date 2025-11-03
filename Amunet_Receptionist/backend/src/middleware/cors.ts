import cors from 'cors';

const allowedOrigins = [
  process.env.MARKETING_URL || 'http://localhost:5173',
  process.env.APP_URL || 'http://localhost:5174',
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});