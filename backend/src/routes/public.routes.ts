import { Router } from 'express';
import { getHealth } from '../controllers/health.controller.js';
import { handleContact } from '../controllers/contact.controller.js';
import { handlePublicProjectRequest } from '../controllers/request.controller.js';
import { getPublicProjects, getPublicProjectBySlug } from '../controllers/project.controller.js';
import { getPublicSettings } from '../controllers/settings.controller.js';
import { validateRequest } from '../middleware/validate.js';
import { contactSchema, projectRequestSchema } from '../validators/schema.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Health Check
router.get('/health', getHealth);

// Public Portfolio Settings
router.get('/settings', getPublicSettings);

// Public Projects (Latest-6 via ?limit=6 or All published)
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getPublicProjectBySlug);

// Public Contact Message
router.post('/contact', submissionLimiter, validateRequest(contactSchema), handleContact);

// Public Project Inquiry Request
router.post(
  '/project-requests',
  submissionLimiter,
  validateRequest(projectRequestSchema),
  handlePublicProjectRequest
);

export default router;
