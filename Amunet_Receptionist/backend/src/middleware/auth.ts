import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.warn('Invalid token attempt', { error: err.message });
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded as { id: string; email: string; role: string };
    next();
  });
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const generateToken = (payload: { id: string; email: string; role: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const generateRefreshToken = (payload: { id: string }): string => {
  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET;
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};