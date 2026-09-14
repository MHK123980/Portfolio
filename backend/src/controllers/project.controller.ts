import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';

// --- Public Endpoints ---

export const getPublicProjects = (req: Request, res: Response): void => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
  const projects = dbService.getPublishedProjects(limit);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
};

export const getPublicProjectBySlug = (req: Request, res: Response): void => {
  const slug = String(req.params.slug);
  const project = dbService.getPublishedProjectBySlug(slug);

  if (!project) {
    res.status(404).json({
      success: false,
      message: 'Project not found or is currently private.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: project,
  });
};

// --- Admin Endpoints ---

export const adminGetAllProjects = (_req: Request, res: Response): void => {
  const projects = dbService.getAllProjects();
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
};

export const adminGetProjectById = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const project = dbService.getProjectById(id);

  if (!project) {
    res.status(404).json({
      success: false,
      message: 'Project not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: project,
  });
};

export const adminCreateProject = (req: Request, res: Response): void => {
  const newProject = dbService.createProject(req.body);

  res.status(201).json({
    success: true,
    message: 'Project created successfully.',
    data: newProject,
  });
};

export const adminUpdateProject = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const updated = dbService.updateProject(id, req.body);

  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Project not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Project updated successfully.',
    data: updated,
  });
};

export const adminDeleteProject = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const deleted = dbService.deleteProject(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Project not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully.',
  });
};

export const adminTogglePublish = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const { published } = req.body;

  const targetPublished = published !== undefined ? Boolean(published) : true;
  const updated = dbService.setProjectPublishStatus(id, targetPublished);

  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Project not found.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: targetPublished ? 'Project published successfully.' : 'Project moved to draft.',
    data: updated,
  });
};
