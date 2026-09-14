import { createApp } from './app.js';
import { config } from './config/env.js';
import { dbService } from './services/db.service.js';

const app = createApp();

// Ensure DB is initialized
dbService.getSettings();

let server: any = null;

if (!process.env.VERCEL) {
  server = app.listen(config.port, () => {
    console.log(`
=====================================================
  Portfolio Full-Stack Backend API Running
  Port: ${config.port}
  Environment: ${config.nodeEnv}
  Health Check: http://localhost:${config.port}/api/health
  Client Origin: ${config.clientUrl}
  Database: backend/data/db.json (Authoritative Store)
  Admin ID: ${config.admin.email}
=====================================================
    `);
  });

  const shutdown = () => {
    console.log('Received shutdown signal, closing server gracefully...');
    if (server) {
      server.close(() => {
        console.log('Backend HTTP server closed.');
        process.exit(0);
      });
    }
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export { app, server };
export default app;
