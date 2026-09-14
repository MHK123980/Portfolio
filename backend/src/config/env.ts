import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  admin: {
    email: process.env.ADMIN_EMAIL || 'mhk@portfolio.manage',
    password: process.env.ADMIN_PASSWORD || 'portfolio@mhk.980',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_super_secret_jwt_portfolio_key_2026_mhk',
    expiresIn: '7d',
  },
  email: {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    contactEmail: process.env.CONTACT_EMAIL || 'mhk@portfolio.manage',
  },
};
