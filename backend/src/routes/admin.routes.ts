import { Router } from 'express';
import {
  handleAdminLogin,
  handleGetMe,
  handleAdminLogout,
} from '../controllers/auth.controller.js';
import {
  adminGetAllProjects,
  adminGetProjectById,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminTogglePublish,
} from '../controllers/project.controller.js';
import {
  adminGetAllRequests,
  adminGetRequestById,
  adminUpdateRequestStatus,
  adminUpdateRequestNotes,
} from '../controllers/request.controller.js';
import {
  adminGetSettings,
  adminUpdateSettings,
} from '../controllers/settings.controller.js';
import { getDashboardStats } from '../controllers/stats.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validate.js';
import {
  adminLoginSchema,
  projectSchema,
  requestStatusSchema,
  requestNotesSchema,
  settingsSchema,
} from '../validators/schema.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// --- Authentication (Publicly accessible login) ---
router.post('/auth/login', submissionLimiter, validateRequest(adminLoginSchema), handleAdminLogin);

// --- Protected Admin Endpoints (Require valid JWT Bearer Token) ---
router.use(requireAdminAuth);

router.get('/auth/me', handleGetMe);
router.post('/auth/logout', handleAdminLogout);

// Dashboard stats
router.get('/stats', getDashboardStats);

// Project CMS
router.get('/projects', adminGetAllProjects);
router.post('/projects', validateRequest(projectSchema), adminCreateProject);
router.get('/projects/:id', adminGetProjectById);
router.put('/projects/:id', validateRequest(projectSchema), adminUpdateProject);
router.delete('/projects/:id', adminDeleteProject);
const handlePublish = (req: any, res: any) => {
  req.body.published = true;
  adminTogglePublish(req, res);
};
const handleUnpublish = (req: any, res: any) => {
  req.body.published = false;
  adminTogglePublish(req, res);
};

router.patch('/projects/:id/publish', handlePublish);
router.post('/projects/:id/publish', handlePublish);
router.patch('/projects/:id/unpublish', handleUnpublish);
router.post('/projects/:id/unpublish', handleUnpublish);

// Client Project Inquiries Management
router.get('/project-requests', adminGetAllRequests);
router.get('/project-requests/:id', adminGetRequestById);
router.patch(
  '/project-requests/:id/status',
  validateRequest(requestStatusSchema),
  adminUpdateRequestStatus
);
router.patch(
  '/project-requests/:id/notes',
  validateRequest(requestNotesSchema),
  adminUpdateRequestNotes
);

// Portfolio Settings
router.get('/settings', adminGetSettings);
router.put('/settings', validateRequest(settingsSchema), adminUpdateSettings);

export default router;
