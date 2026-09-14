import { z } from 'zod';

export const allowedServices = [
  'Android App Development',
  'Web Application Development',
  'Website Development',
  'Full-Stack Development',
  'Backend / API Development',
  'Bug Fixing / Improvements',
  'Other',
] as const;

export const allowedBudgetRanges = [
  'Under $250',
  '$250 - $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
  'Not Sure Yet',
] as const;

export const allowedTimelines = [
  'ASAP',
  '1-2 Weeks',
  '2-4 Weeks',
  '1-2 Months',
  '2+ Months',
  'Not Sure Yet',
] as const;

export const allowedRequestStatuses = [
  'NEW',
  'VIEWED',
  'IN_DISCUSSION',
  'ACCEPTED',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
  'CANCELLED',
] as const;

export const adminLoginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).trim().email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address'),
  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject must not exceed 150 characters'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
  honeypot: z.string().optional(),
});

export const projectRequestSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address'),
  company: z.string().trim().max(100).optional().or(z.literal('')),
  service: z.enum(allowedServices, {
    errorMap: () => ({ message: 'Please select a valid service' }),
  }),
  projectTitle: z
    .string({ required_error: 'Project title is required' })
    .trim()
    .min(3, 'Project title must be at least 3 characters')
    .max(150, 'Project title must not exceed 150 characters'),
  projectDescription: z
    .string({ required_error: 'Project description is required' })
    .trim()
    .min(15, 'Please describe your project in at least 15 characters')
    .max(3000, 'Project description must not exceed 3000 characters'),
  budgetRange: z.enum(allowedBudgetRanges, {
    errorMap: () => ({ message: 'Please select an estimated budget range' }),
  }),
  expectedTimeline: z.enum(allowedTimelines, {
    errorMap: () => ({ message: 'Please select an estimated timeline' }),
  }),
  referenceUrl: z
    .string()
    .trim()
    .url('Please provide a valid URL (e.g. https://example.com)')
    .optional()
    .or(z.literal('')),
  additionalRequirements: z.string().trim().max(2000).optional().or(z.literal('')),
  honeypot: z.string().optional(),
});

export const projectSchema = z.object({
  title: z
    .string({ required_error: 'Project title is required' })
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(150, 'Title cannot exceed 150 characters'),
  slug: z.string().trim().optional().or(z.literal('')),
  tagline: z.string().trim().optional().or(z.literal('')),
  shortDescription: z.string().trim().optional().or(z.literal('')),
  description: z.string().trim().optional().or(z.literal('')),
  overview: z.string().trim().optional().or(z.literal('')),
  fullDescription: z.string().trim().optional().or(z.literal('')),
  caseStudy: z.string().trim().optional().or(z.literal('')),
  category: z.string().trim().optional().default('Android'),
  status: z.string().trim().optional().default('Completed'),
  technologies: z.array(z.string()).optional().default([]),
  image: z.string().trim().optional().or(z.literal('')),
  thumbnail: z.string().trim().optional().or(z.literal('')),
  gallery: z.array(z.string()).optional().default([]),
  galleryImages: z.array(z.string()).optional().default([]),
  liveDemoUrl: z.string().trim().optional().or(z.literal('')),
  githubUrl: z.string().trim().optional().or(z.literal('')),
  date: z.string().trim().optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional(),
  roleContribution: z.string().trim().optional().or(z.literal('')),
  problem: z.string().trim().optional().or(z.literal('')),
  solution: z.string().trim().optional().or(z.literal('')),
  challenges: z.string().trim().optional().or(z.literal('')),
  keyFeatures: z.array(z.string()).optional().default([]),
  outcome: z.string().trim().optional().or(z.literal('')),
  adminNotes: z.string().trim().optional().or(z.literal('')),
});

export const requestStatusSchema = z.object({
  status: z.enum(allowedRequestStatuses, {
    errorMap: () => ({ message: 'Invalid status value' }),
  }),
});

export const requestNotesSchema = z.object({
  adminNotes: z.string().max(4000, 'Notes cannot exceed 4000 characters'),
});

export const settingsSchema = z.object({
  availabilityStatus: z.string().trim().min(2, 'Availability status is required'),
  contactEmail: z.string().trim().email('Invalid email address'),
  githubUrl: z.string().trim().url().optional().or(z.literal('')),
  linkedinUrl: z.string().trim().url().optional().or(z.literal('')),
  domain: z.string().trim().optional().or(z.literal('')),
  developerName: z.string().trim().min(1, 'Developer name is required'),
  heroRole: z.string().trim().min(1, 'Hero role is required'),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectRequestInput = z.infer<typeof projectRequestSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
