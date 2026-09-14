import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';

export const getPublicSettings = (_req: Request, res: Response): void => {
  const settings = dbService.getSettings();
  res.status(200).json({
    success: true,
    data: {
      availabilityStatus: settings.availabilityStatus,
      contactEmail: settings.contactEmail,
      githubUrl: settings.githubUrl,
      linkedinUrl: settings.linkedinUrl,
      domain: settings.domain,
      developerName: settings.developerName,
      heroRole: settings.heroRole,
    },
  });
};

export const adminGetSettings = (_req: Request, res: Response): void => {
  const settings = dbService.getSettings();
  res.status(200).json({
    success: true,
    data: settings,
  });
};

export const adminUpdateSettings = (req: Request, res: Response): void => {
  const updated = dbService.updateSettings(req.body);
  res.status(200).json({
    success: true,
    message: 'Portfolio settings updated successfully.',
    data: updated,
  });
};
