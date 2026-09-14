import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AuthService } from '../services/auth.service.js';
import { AdminLoginInput } from '../validators/schema.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const handleAdminLogin = (req: Request, res: Response): void => {
  const { email, password }: AdminLoginInput = req.body;
  const admin = dbService.getAdmin();
  const settings = dbService.getSettings();

  const normalizedInputEmail = (email || '').trim().toLowerCase();
  const adminEmail = admin.email.trim().toLowerCase();
  const contactEmail = (settings.contactEmail || '').trim().toLowerCase();

  // Validate email (case-insensitive, match either designated admin ID or contact email)
  const isEmailMatch =
    normalizedInputEmail === adminEmail ||
    (contactEmail && normalizedInputEmail === contactEmail);

  if (!isEmailMatch) {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials. Access denied.',
    });
    return;
  }

  // Verify hashed password
  const isValid = dbService.verifyAdminPassword(password ? password.trim() : '');
  if (!isValid) {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials. Access denied.',
    });
    return;
  }

  // Update last login timestamp
  dbService.updateAdminLastLogin();

  // Issue signed JWT token
  const token = AuthService.generateToken({
    userId: admin.id,
    email: admin.email,
    role: 'admin',
  });

  res.status(200).json({
    success: true,
    message: 'Authentication successful.',
    token,
    data: {
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: 'admin',
      },
    },
    user: {
      id: admin.id,
      email: admin.email,
      role: 'admin',
    },
  });
};

export const handleGetMe = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthenticated' });
    return;
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const handleAdminLogout = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};
