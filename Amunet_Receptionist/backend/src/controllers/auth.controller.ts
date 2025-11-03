import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/connection';
import { generateToken, generateRefreshToken } from '../middleware/auth';
import logger from '../utils/logger';
import sendgridService from '../services/sendgrid.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if exists
    const existing = await db('users').where({ email }).first();
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const [user] = await db('users')
      .insert({ email, hash, role: 'client' })
      .returning(['id', 'email', 'role']);

    // Send welcome email
    await sendgridService.sendWelcomeEmail(email, name || email);

    // Generate tokens
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    logger.info('User signed up', { userId: user.id, email });

    res.status(201).json({ user, token, refreshToken });
  } catch (error) {
    logger.error('Signup error', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    logger.info('User logged in', { userId: user.id });

    res.json({
      user: { id: user.id, email: user.email, role: user.role },
      token,
      refreshToken,
    });
  } catch (error) {
    logger.error('Login error', error);
    res.status(500).json({ error: 'Login failed' });
  }
};