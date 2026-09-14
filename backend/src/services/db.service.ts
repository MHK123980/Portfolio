import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { MongoClient, Db } from 'mongodb';
import { DatabaseSchema, Project, ProjectRequest, ProjectRequestStatus, PortfolioSettings, AdminUser } from '../models/types.js';
import { AuthService } from './auth.service.js';
import { config } from '../config/env.js';
import { slugify } from '../utils/slugify.js';

const DATA_DIR = fs.existsSync(path.resolve(process.cwd(), 'backend', 'data'))
  ? path.resolve(process.cwd(), 'backend', 'data')
  : path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export class DbService {
  private static instance: DbService;
  private data: DatabaseSchema;
  private mongoClient: MongoClient | null = null;
  private mongoDb: Db | null = null;
  private isMongoConnected: boolean = false;
  private lastMongoSync: number = 0;

  private constructor() {
    this.ensureDataDirectory();
    this.data = this.loadDatabase();
    this.initMongo();
  }

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('[DbService] Error reading database file, initializing with seeds:', err);
      }
    }

    const seeded = this.createInitialSeed();
    this.persist(seeded);
    return seeded;
  }

  private persist(dataToSave: DatabaseSchema = this.data): void {
    this.ensureDataDirectory();
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    const serialized = JSON.stringify(dataToSave, null, 2);
    try {
      fs.writeFileSync(tempFile, serialized, 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      // Fallback direct write if atomic rename is restricted on some Windows drives
      fs.writeFileSync(DB_FILE, serialized, 'utf-8');
    }
  }

  private async initMongo(): Promise<void> {
    if (!config.databaseUrl) {
      return;
    }
    try {
      this.mongoClient = new MongoClient(config.databaseUrl, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      await this.mongoClient.connect();
      this.mongoDb = this.mongoClient.db('mhkportfolio');
      this.isMongoConnected = true;
      console.log('[MongoDB] Connected successfully to MongoDB Atlas cloud database.');
      await this.syncWithMongo();
    } catch (err: any) {
      this.isMongoConnected = false;
      console.warn(`[MongoDB] Notice: Cloud DB connection unavailable (${err.message}). Using local storage fallback.`);
    }
  }

  public async syncWithMongo(): Promise<void> {
    if (!this.mongoDb) return;
    try {
      const projectsCol = this.mongoDb.collection<Project>('projects');
      const requestsCol = this.mongoDb.collection<ProjectRequest>('requests');
      const settingsCol = this.mongoDb.collection<PortfolioSettings>('settings');
      const adminCol = this.mongoDb.collection<AdminUser>('admin');

      const count = await projectsCol.countDocuments();
      if (count === 0) {
        if (this.data.projects.length > 0) {
          await projectsCol.insertMany(this.data.projects as any);
        }
        await adminCol.updateOne({}, { $set: this.data.admin }, { upsert: true });
        await settingsCol.updateOne({}, { $set: this.data.settings }, { upsert: true });
        console.log('[MongoDB] Seeded cloud database with initial portfolio data.');
      } else {
        const projects = await projectsCol.find({}).toArray();
        const requests = await requestsCol.find({}).toArray();
        const settings = await settingsCol.findOne({});
        const admin = await adminCol.findOne({});

        if (projects && projects.length > 0) {
          this.data.projects = projects.map((p) => {
            const { _id, ...rest } = p as any;
            return rest as Project;
          });
        }
        if (requests) {
          this.data.requests = requests.map((r) => {
            const { _id, ...rest } = r as any;
            return rest as ProjectRequest;
          });
        }
        if (settings) {
          const { _id, ...rest } = settings as any;
          this.data.settings = rest as PortfolioSettings;
        }
        if (admin) {
          const { _id, ...rest } = admin as any;
          this.data.admin = rest as AdminUser;
        }
        this.persist();
        console.log(`[MongoDB] Synced ${this.data.projects.length} projects and ${this.data.requests.length} requests from cloud database.`);
      }
      this.lastMongoSync = Date.now();
    } catch (err: any) {
      console.warn('[MongoDB] Sync error:', err.message);
    }
  }

  public async triggerRefresh(): Promise<void> {
    if (this.isMongoConnected && Date.now() - this.lastMongoSync > 2500) {
      await this.syncWithMongo();
    }
  }

  private createInitialSeed(): DatabaseSchema {
    const { hash, salt } = AuthService.hashPassword(config.admin.password);
    const now = new Date().toISOString();

    const initialProjects: Project[] = [
      {
        id: 'proj-1',
        title: 'XORA — Multi-Vendor Marketplace Ecosystem',
        slug: 'xora-marketplace',
        shortDescription:
          'Native Android multi-tier commerce ecosystem bridging buyers, verified suppliers, and resellers.',
        fullDescription:
          'A comprehensive multi-tier marketplace platform engineered natively for Android, backed by Supabase and PostgreSQL with strict Row Level Security policies.',
        caseStudy:
          'XORA is an ecosystem engineered to connect buyers, suppliers/manufacturers, and independent resellers into a unified, secure commerce flow. It addresses the friction of fragmented distributor communication and disparate order processing through a cohesive Android mobile experience.',
        category: 'Android',
        technologies: [
          'Android',
          'Kotlin',
          'Jetpack Compose',
          'Supabase',
          'PostgreSQL',
          'Row Level Security (RLS)',
          'REST APIs',
          'Coroutines',
        ],
        thumbnail: '/images/projects/xora-preview.svg',
        gallery: [
          '/images/projects/xora-preview.svg',
          '/images/projects/xora-architecture.svg',
        ],
        liveDemoUrl: '',
        githubUrl: 'https://github.com/[YOUR GITHUB]/xora',
        date: '2024-04-10',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        featured: true,
        published: true,
        displayOrder: 1,
        roleContribution:
          'Designed and developed the Android client architecture in Kotlin, configured the Supabase backend schema and Row Level Security policies, and integrated REST endpoints for order and inventory management.',
        problem:
          'Traditional wholesale and multi-vendor distribution channels suffer from unverified seller risks, lack of real-time inventory visibility across resellers, and complex role-based data permissions.',
        solution:
          'Engineered an Android application with dynamic multi-persona navigation (Buyer, Supplier, Reseller), real-time catalogue indexing, role-gated queries via Supabase Row Level Security (RLS), and resilient offline-capable state synchronization.',
        challenges:
          'Balancing complex multi-tier security policies where suppliers can only manage their own listings while resellers require specialized commission calculations and inventory access without compromising proprietary pricing.',
        keyFeatures: [
          'Multi-persona access control for buyers, suppliers, and resellers',
          'Role-based database policies leveraging PostgreSQL Row Level Security (RLS)',
          'Real-time product catalog & inventory tracking via Supabase API integration',
          'Clean Architecture with MVVM, Kotlin Coroutines, and StateFlow',
          'Secure authentication workflows with JWT token refresh',
          'Comprehensive order lifecycle tracking and status transitions',
        ],
        outcome:
          'Delivered an extensible, secure mobile foundation with strict database-level access controls and an intuitive user interface that scales smoothly across different device sizes.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-2',
        title: 'Modern Web Application Platform',
        slug: 'web-application-platform',
        shortDescription:
          'High-performance responsive web platform with API services and live data synchronization.',
        fullDescription:
          'A production-grade full-stack web application featuring React, TypeScript, and Express with real-time state management and secure authentication.',
        caseStudy:
          'Constructed a unified web application for data visualization, user access delegation, and real-time state synchronization.',
        category: 'Full-Stack',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL'],
        thumbnail: '/images/projects/web-platform.svg',
        gallery: ['/images/projects/web-platform.svg'],
        liveDemoUrl: 'https://demo.[YOUR DOMAIN]/web-platform',
        githubUrl: 'https://github.com/[YOUR GITHUB]/web-platform',
        date: '2024-03-15',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        featured: false,
        published: true,
        displayOrder: 2,
        roleContribution: 'Architected React frontend and Express REST endpoints.',
        keyFeatures: [
          'Modular TypeScript architecture with custom reusable UI system',
          'Express REST API with centralized validation and rate limiting',
          'Interactive dashboards with responsive data filtering',
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-3',
        title: 'Enterprise Backend & Microservices Hub',
        slug: 'enterprise-backend-hub',
        shortDescription:
          'Resilient Node.js API integration layer handling auth, validation, and data orchestration.',
        fullDescription:
          'A backend service architecture engineered for high throughput, data sanitization, third-party webhook processing, and unified REST endpoints.',
        category: 'Web',
        technologies: ['Node.js', 'TypeScript', 'Express', 'Zod', 'PostgreSQL'],
        thumbnail: '/images/projects/api-service.svg',
        gallery: ['/images/projects/api-service.svg'],
        date: '2024-02-20',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        featured: false,
        published: true,
        displayOrder: 3,
        keyFeatures: [
          'Strict Zod schema validation on incoming payloads',
          'Automated rate limiting and honeypot bot defense',
          'Centralized error interception and standardized responses',
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-4',
        title: 'Mobile Logistics & Dispatch Tracker',
        slug: 'mobile-logistics-dispatch',
        shortDescription:
          'Native Android driver dispatch client with offline-first caching and real-time transit status.',
        fullDescription:
          'Engineered an Android mobile application utilizing Room SQLite database for persistent offline manifest records and automatic server sync.',
        category: 'Android',
        technologies: ['Android', 'Kotlin', 'Room SQLite', 'Coroutines', 'REST APIs'],
        thumbnail: '/images/projects/xora-preview.svg',
        gallery: ['/images/projects/xora-preview.svg'],
        date: '2024-01-25',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        featured: false,
        published: true,
        displayOrder: 4,
        keyFeatures: [
          'Offline-first synchronization with Room SQLite database',
          'Dynamic status updates with background worker queue',
          'Adaptive UI supporting high-contrast daylight conditions',
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-5',
        title: 'Real-Time Operational Analytics Portal',
        slug: 'real-time-analytics-portal',
        shortDescription:
          'Interactive web analytics console monitoring operational telemetry and API uptime metrics.',
        fullDescription:
          'Built with React, TypeScript, and modern chart visualization primitives for low-latency operational reporting.',
        category: 'Full-Stack',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
        thumbnail: '/images/projects/web-platform.svg',
        gallery: ['/images/projects/web-platform.svg'],
        date: '2023-12-10',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        featured: false,
        published: true,
        displayOrder: 5,
        keyFeatures: [
          'Dynamic metric breakdown across service categories',
          'Keyboard-first navigation and dark ergonomics',
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-6',
        title: 'High-Throughput Webhook Processing Engine',
        slug: 'webhook-processing-engine',
        shortDescription:
          'Event-driven Node.js ingestion engine delivering verified webhook payloads with retry backoff.',
        fullDescription:
          'Reliable webhook receiver verifying HMAC cryptographic signatures and buffering transaction payloads.',
        category: 'Web',
        technologies: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL'],
        thumbnail: '/images/projects/api-service.svg',
        gallery: ['/images/projects/api-service.svg'],
        date: '2023-11-18',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
        featured: false,
        published: true,
        displayOrder: 6,
        keyFeatures: [
          'Cryptographic HMAC SHA-256 payload verification',
          'Exponential retry backoff strategy for downstream failures',
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-7',
        title: 'Offline-First Note & Task Sync Application',
        slug: 'offline-note-sync-app',
        shortDescription:
          'Kotlin Android application with bidirectional delta synchronization and SQLite local cache.',
        fullDescription:
          'An Android productivity tool designed with strict Clean Architecture, MVVM, and Room database migrations.',
        category: 'Android',
        technologies: ['Android', 'Kotlin', 'Room SQLite', 'MVVM'],
        thumbnail: '/images/projects/xora-preview.svg',
        gallery: ['/images/projects/xora-preview.svg'],
        date: '2023-10-05',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        featured: false,
        published: true,
        displayOrder: 7,
        keyFeatures: ['Conflict-free local state resolution', 'Instantaneous search across indexed records'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-8',
        title: 'Multi-Tenant Inventory Management System',
        slug: 'multi-tenant-inventory-system',
        shortDescription:
          'Full-stack management console supporting segregated warehouse inventories and role permissions.',
        fullDescription:
          'Comprehensive business application built with React, Node.js, and PostgreSQL for distributed stock management.',
        category: 'Full-Stack',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        thumbnail: '/images/projects/web-platform.svg',
        gallery: ['/images/projects/web-platform.svg'],
        date: '2023-09-12',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
        featured: false,
        published: true,
        displayOrder: 8,
        keyFeatures: ['Role-based permission gating', 'Exportable PDF and spreadsheet inventory reports'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-9',
        title: 'Automated REST API Documentation Portal',
        slug: 'automated-api-docs-portal',
        shortDescription:
          'Interactive schema-driven developer portal with live sandbox request execution.',
        fullDescription:
          'Developer portal automatically rendering OpenAPI endpoints with request syntax and response schema samples.',
        category: 'Web',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express'],
        thumbnail: '/images/projects/api-service.svg',
        gallery: ['/images/projects/api-service.svg'],
        date: '2023-08-14',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        featured: false,
        published: true,
        displayOrder: 9,
        keyFeatures: ['Interactive sandbox execution', 'Real-time schema validation feedback'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        updatedAt: now,
      },
      {
        id: 'proj-10',
        title: 'Android Native UI Component Framework',
        slug: 'android-ui-component-framework',
        shortDescription:
          'Modular Kotlin UI kit standardizing custom cards, animations, and typography for mobile apps.',
        fullDescription:
          'A reusable UI kit built with Jetpack Compose featuring dark-mode ergonomics and accessible touch targets.',
        category: 'Android',
        technologies: ['Android', 'Kotlin', 'Jetpack Compose'],
        thumbnail: '/images/projects/xora-preview.svg',
        gallery: ['/images/projects/xora-preview.svg'],
        date: '2023-07-01',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        featured: false,
        published: true,
        displayOrder: 10,
        keyFeatures: ['Reusable Jetpack Compose design primitives', 'WCAG compliant touch targets and contrast'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        updatedAt: now,
      },
    ];

    const initialSettings: PortfolioSettings = {
      availabilityStatus: 'Available for New Projects',
      contactEmail: config.admin.email,
      githubUrl: 'https://github.com/[YOUR GITHUB]',
      linkedinUrl: 'https://linkedin.com/in/[YOUR LINKEDIN]',
      domain: 'https://[YOUR DOMAIN]',
      developerName: '[YOUR NAME]',
      heroRole: 'Android & Full-Stack Web Developer',
      updatedAt: now,
    };

    return {
      admin: {
        id: 'admin-root',
        email: config.admin.email,
        passwordHash: hash,
        salt,
        createdAt: now,
      },
      projects: initialProjects,
      requests: [],
      settings: initialSettings,
    };
  }

  // --- Project Methods ---

  public getPublishedProjects(limit?: number): Project[] {
    const published = this.data.projects
      .filter((p) => p.published)
      .sort((a, b) => {
        const timeA = new Date(a.publishedAt || a.createdAt).getTime();
        const timeB = new Date(b.publishedAt || b.createdAt).getTime();
        return timeB - timeA; // Newest first
      });

    if (limit && limit > 0) {
      return published.slice(0, limit);
    }
    return published;
  }

  public getPublishedProjectBySlug(slug: string): Project | null {
    const project = this.data.projects.find(
      (p) => p.slug.toLowerCase() === slug.toLowerCase() && p.published
    );
    return project || null;
  }

  public getAllProjects(): Project[] {
    return [...this.data.projects].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  }

  public getProjectById(id: string): Project | null {
    const project = this.data.projects.find((p) => p.id === id);
    return project || null;
  }

  public createProject(input: Partial<Project>): Project {
    const now = new Date().toISOString();
    const id = `proj-${crypto.randomUUID().slice(0, 8)}`;
    const title = input.title?.trim() || 'Untitled Project';
    let slug = slugify(input.slug?.trim() || title);

    // Ensure slug uniqueness
    let counter = 1;
    while (this.data.projects.some((p) => p.slug === slug)) {
      slug = `${slugify(title)}-${counter}`;
      counter++;
    }

    const shortDesc = input.shortDescription?.trim() || input.tagline?.trim() || input.description?.trim() || '';
    const fullDesc = input.fullDescription?.trim() || input.overview?.trim() || input.description?.trim() || shortDesc;
    const thumbnail = input.thumbnail?.trim() || input.image?.trim() || '/images/projects/xora-preview.svg';
    const gallery = Array.isArray(input.gallery) && input.gallery.length > 0 
      ? input.gallery 
      : (Array.isArray(input.galleryImages) && input.galleryImages.length > 0)
        ? input.galleryImages
        : [thumbnail];

    const newProject: Project = {
      id,
      title,
      slug,
      shortDescription: shortDesc,
      tagline: input.tagline?.trim() || shortDesc,
      fullDescription: fullDesc,
      description: input.description?.trim() || shortDesc,
      overview: input.overview?.trim() || fullDesc,
      caseStudy: input.caseStudy?.trim() || '',
      category: input.category || 'Android',
      status: input.status || 'Completed',
      technologies: Array.isArray(input.technologies) ? input.technologies : [],
      thumbnail,
      image: input.image?.trim() || thumbnail,
      gallery,
      galleryImages: Array.isArray(input.galleryImages) && input.galleryImages.length > 0 ? input.galleryImages : gallery,
      liveDemoUrl: input.liveDemoUrl || '',
      githubUrl: input.githubUrl || '',
      date: input.date || now.split('T')[0],
      publishedAt: input.published ? now : undefined,
      featured: Boolean(input.featured),
      published: Boolean(input.published),
      displayOrder: typeof input.displayOrder === 'number' ? input.displayOrder : this.data.projects.length + 1,
      roleContribution: input.roleContribution || '',
      problem: input.problem || '',
      solution: input.solution || '',
      challenges: input.challenges || '',
      keyFeatures: Array.isArray(input.keyFeatures) ? input.keyFeatures : [],
      outcome: input.outcome || '',
      adminNotes: input.adminNotes || '',
      createdAt: now,
      updatedAt: now,
    };

    this.data.projects.unshift(newProject);
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('projects').insertOne({ ...newProject } as any).catch((err) => {
        console.warn('[MongoDB] Error saving project to cloud:', err.message);
      });
    }

    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const existing = this.data.projects[idx];
    const now = new Date().toISOString();

    let slug = existing.slug;
    if (updates.slug && updates.slug.trim() !== '') {
      slug = slugify(updates.slug.trim());
      // Check collision
      if (this.data.projects.some((p) => p.id !== id && p.slug === slug)) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    } else if (updates.title && updates.title !== existing.title) {
      slug = slugify(updates.title);
      if (this.data.projects.some((p) => p.id !== id && p.slug === slug)) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const wasPublished = existing.published;
    const isNowPublished = updates.published !== undefined ? updates.published : existing.published;

    const updatedProject: Project = {
      ...existing,
      ...updates,
      shortDescription: updates.shortDescription || updates.tagline || updates.description || existing.shortDescription,
      tagline: updates.tagline || updates.shortDescription || existing.tagline,
      fullDescription: updates.fullDescription || updates.overview || updates.description || existing.fullDescription,
      overview: updates.overview || updates.fullDescription || existing.overview,
      description: updates.description || updates.shortDescription || existing.description,
      thumbnail: updates.thumbnail || updates.image || existing.thumbnail,
      image: updates.image || updates.thumbnail || existing.image,
      id,
      slug,
      published: isNowPublished,
      publishedAt: isNowPublished && !wasPublished ? now : existing.publishedAt,
      updatedAt: now,
    };

    this.data.projects[idx] = updatedProject;
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('projects').updateOne({ id }, { $set: { ...updatedProject } }, { upsert: true }).catch((err) => {
        console.warn('[MongoDB] Error updating project in cloud:', err.message);
      });
    }

    return updatedProject;
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.persist();
      if (this.mongoDb) {
        this.mongoDb.collection('projects').deleteOne({ id }).catch((err) => {
          console.warn('[MongoDB] Error deleting project from cloud:', err.message);
        });
      }
      return true;
    }
    return false;
  }

  public setProjectPublishStatus(id: string, published: boolean): Project | null {
    const project = this.getProjectById(id);
    if (!project) return null;
    return this.updateProject(id, { published });
  }

  // --- Project Request (Client Inquiries) Methods ---

  public getAllRequests(): ProjectRequest[] {
    this.triggerRefresh().catch(() => {});
    return [...this.data.requests].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  public getRequestById(id: string): ProjectRequest | null {
    return this.data.requests.find((r) => r.id === id) || null;
  }

  public createRequest(input: Omit<ProjectRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): ProjectRequest {
    const now = new Date().toISOString();
    const newRequest: ProjectRequest = {
      ...input,
      id: `req-${crypto.randomUUID().slice(0, 8)}`,
      status: 'NEW',
      createdAt: now,
      updatedAt: now,
    };

    this.data.requests.unshift(newRequest);
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('requests').insertOne({ ...newRequest } as any).catch((err) => {
        console.warn('[MongoDB] Error saving request to cloud:', err.message);
      });
    }

    return newRequest;
  }

  public updateRequestStatus(id: string, status: ProjectRequestStatus): ProjectRequest | null {
    const req = this.data.requests.find((r) => r.id === id);
    if (!req) return null;

    req.status = status;
    req.updatedAt = new Date().toISOString();
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('requests').updateOne({ id }, { $set: { status, updatedAt: req.updatedAt } }).catch((err) => {
        console.warn('[MongoDB] Error updating request status in cloud:', err.message);
      });
    }

    return req;
  }

  public updateRequestNotes(id: string, adminNotes: string): ProjectRequest | null {
    const req = this.data.requests.find((r) => r.id === id);
    if (!req) return null;

    req.adminNotes = adminNotes;
    req.updatedAt = new Date().toISOString();
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('requests').updateOne({ id }, { $set: { adminNotes, updatedAt: req.updatedAt } }).catch((err) => {
        console.warn('[MongoDB] Error updating request notes in cloud:', err.message);
      });
    }

    return req;
  }

  // --- Settings Methods ---

  public getSettings(): PortfolioSettings {
    return this.data.settings;
  }

  public updateSettings(updates: Partial<PortfolioSettings>): PortfolioSettings {
    this.data.settings = {
      ...this.data.settings,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('settings').updateOne({}, { $set: { ...this.data.settings } }, { upsert: true }).catch((err) => {
        console.warn('[MongoDB] Error updating settings in cloud:', err.message);
      });
    }

    return this.data.settings;
  }

  // --- Admin Authentication Methods ---

  public getAdmin(): AdminUser {
    return this.data.admin;
  }

  public verifyAdminPassword(password: string): boolean {
    return AuthService.verifyPassword(password, this.data.admin.passwordHash, this.data.admin.salt);
  }

  public updateAdminLastLogin(): void {
    const now = new Date().toISOString();
    this.data.admin.lastLoginAt = now;
    this.persist();

    if (this.mongoDb) {
      this.mongoDb.collection('admin').updateOne({}, { $set: { lastLoginAt: now } }).catch((err) => {
        console.warn('[MongoDB] Error updating admin login in cloud:', err.message);
      });
    }
  }
}

export const dbService = DbService.getInstance();
