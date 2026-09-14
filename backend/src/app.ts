import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import routes from './routes/index.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export function createApp(): Express {
  const app = express();

  // Security HTTP headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS configuration
  const allowedOrigins = [
    config.clientUrl,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || config.isDev) {
          return callback(null, true);
        }
        return callback(new Error('CORS policy: This origin is not allowed'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Body parsers
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // General rate limiter on all API endpoints
  app.use('/api', generalLimiter);

  // Mount API router
  app.use('/api', routes);

  // Root welcome / status
  app.get('/', (_req, res) => {
    res.json({
      name: 'Developer Portfolio Backend API',
      status: 'active',
      version: '2.0.0',
      endpoints: {
        health: '/api/health',
        projects: '/api/projects',
        projectBySlug: '/api/projects/:slug',
        settings: '/api/settings',
        contact: 'POST /api/contact',
        projectRequests: 'POST /api/project-requests',
        adminAuth: 'POST /api/admin/auth/login',
        adminDashboard: '/api/admin/stats',
      },
    });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Centralized Error handler
  app.use(errorHandler);

  return app;
}
