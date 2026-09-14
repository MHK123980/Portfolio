// ─────────────────────────────────────────────────────────────
// Existing Frontend Types
// ─────────────────────────────────────────────────────────────

export interface ProfileData {
  name: string;
  role: string;
  availability: string;
  headline: string;
  supportingMessage: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  domain: string;
  bio: string[];
}

export interface SkillItem {
  name: string;
  category: 'Mobile Development' | 'Web Development' | 'Backend & Database' | 'Tools & Platforms';
  proficiency?: 'Advanced' | 'Proficient' | 'Familiar';
  tag?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  deliverables: string[];
  iconName: string;
  badge?: string;
}

// This is the LOCAL data type (from data/projects.ts static file)
export interface ProjectItem {
  id: string;
  title: string;
  category: 'Android' | 'Web' | 'Full-Stack';
  tagline: string;
  description: string;
  technologies: string[];
  status: 'Production' | 'Active Development' | 'Completed' | 'Case Study';
  featured: boolean;
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  overview: string;
  problem?: string;
  solution?: string;
  keyFeatures: string[];
  roleContribution?: string;
  challenges?: string;
  outcome?: string;
  galleryImages?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  type: 'Independent Developer' | 'Freelance Projects' | 'Personal Software Projects';
  organization: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string[];
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectRequestFormData {
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
  honeypot?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// ─────────────────────────────────────────────────────────────
// Backend-aligned Types (for API responses)
// ─────────────────────────────────────────────────────────────

/** Matches the backend Project entity from db.service.ts */
export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  problem?: string;
  solution?: string;
  category: 'Android' | 'Web' | 'Full-Stack' | string;
  technologies: string[];
  status: 'Production' | 'Active Development' | 'Completed' | 'Case Study' | string;
  featured: boolean;
  published: boolean;
  image: string;
  galleryImages?: string[];
  keyFeatures: string[];
  challenges?: string;
  outcome?: string;
  roleContribution?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  // adminNotes is NEVER returned by public APIs
}

export type ProjectRequestStatus = 'new' | 'in_discussion' | 'accepted' | 'rejected' | 'completed';

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

export interface PortfolioSettings {
  developerName: string;
  availability: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  bio?: string;
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalRequests: number;
  newRequests: number;
  inDiscussionRequests: number;
  completedRequests: number;
  availability: string;
}
