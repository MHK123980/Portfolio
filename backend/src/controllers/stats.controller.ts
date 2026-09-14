import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';

export const getDashboardStats = (_req: Request, res: Response): void => {
  const allProjects = dbService.getAllProjects();
  const allRequests = dbService.getAllRequests();
  const settings = dbService.getSettings();

  const totalProjects = allProjects.length;
  const publishedProjects = allProjects.filter((p) => p.published).length;
  const draftProjects = allProjects.filter((p) => !p.published).length;

  const newRequests = allRequests.filter((r) => r.status === 'NEW').length;
  const inDiscussionRequests = allRequests.filter((r) => r.status === 'IN_DISCUSSION').length;
  const completedProjects = allRequests.filter((r) => r.status === 'COMPLETED').length;

  res.status(200).json({
    success: true,
    data: {
      totalProjects,
      publishedProjects,
      draftProjects,
      newRequests,
      inDiscussionRequests,
      completedProjects,
      availabilityStatus: settings.availabilityStatus,
    },
  });
};
