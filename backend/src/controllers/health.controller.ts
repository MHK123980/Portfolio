import { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    service: 'developer-portfolio-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
