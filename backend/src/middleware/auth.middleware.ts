import { Request, Response, NextFunction } from 'express';
import { AuthService, TokenPayload } from '../services/auth.service.js';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const requireAdminAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Authentication required to access this resource.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const payload = AuthService.verifyToken(token);

  if (!payload || payload.role !== 'admin') {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Session expired or invalid token. Please log in again.',
    });
    return;
  }

  req.user = payload;
  next();
};
