import rateLimit from 'express-rate-limit';

// General API rate limiter: 100 requests per 15 minutes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes.',
  },
});

// Stricter rate limiter for contact and project request submissions: 5 requests per 15 minutes
export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'You have submitted too many requests recently. Please wait a few minutes before trying again.',
  },
});
