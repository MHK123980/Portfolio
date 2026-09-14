import { Router } from 'express';
import publicRoutes from './public.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

// Mount public routes directly under /api
router.use('/', publicRoutes);

// Mount protected admin routes under /api/admin
router.use('/admin', adminRoutes);

export default router;
