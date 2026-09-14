export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  tagline?: string;
  description?: string;
  overview?: string;
  caseStudy?: string;
  category: 'Android' | 'Web' | 'Full-Stack' | string;
  status?: 'Production' | 'Active Development' | 'Completed' | 'Case Study' | string;
  technologies: string[];
  thumbnail: string;
  image?: string;
  gallery: string[];
  galleryImages?: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  date: string;
  publishedAt?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  roleContribution?: string;
  problem?: string;
  solution?: string;
  challenges?: string;
  keyFeatures: string[];
  outcome?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectRequestStatus =
  | 'NEW'
  | 'VIEWED'
  | 'IN_DISCUSSION'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export interface ProjectRequest {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  service: string;
  projectTitle: string;
  projectDescription: string;
  budgetRange: string;
  expectedTimeline: string;
  referenceUrl?: string;
  additionalRequirements?: string;
  status: ProjectRequestStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface PortfolioSettings {
  availabilityStatus: 'Available for New Projects' | 'Limited Availability' | 'Currently Booked' | string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  domain: string;
  developerName: string;
  heroRole: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  admin: AdminUser;
  projects: Project[];
  requests: ProjectRequest[];
  settings: PortfolioSettings;
}
