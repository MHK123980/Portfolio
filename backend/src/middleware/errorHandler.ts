import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env.js';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[Unhandled Error]:', err);

  const statusCode = (err as any).statusCode || 500;
  const message = config.isDev
    ? err.message || 'Internal Server Error'
    : 'Something went wrong on our end. Please try again later or reach out directly.';

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isDev && { stack: err.stack }),
  });
};
