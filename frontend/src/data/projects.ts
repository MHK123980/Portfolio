import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'xora-marketplace',
    title: 'XORA — Multi-Vendor Marketplace Ecosystem',
    category: 'Android',
    tagline: 'Multi-vendor commerce ecosystem bridging buyers, verified suppliers, and resellers.',
    description:
      'A comprehensive multi-tier marketplace platform engineered natively for Android, backed by Supabase and PostgreSQL with strict Row Level Security policies.',
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
    status: 'Active Development',
    featured: true,
    image: '/images/projects/xora-preview.svg',
    githubUrl: 'https://github.com/MHK123980',
    liveDemoUrl: '',
    overview:
      'XORA is an ecosystem engineered to connect buyers, suppliers/manufacturers, and independent resellers into a unified, secure commerce flow. It addresses the friction of fragmented distributor communication and disparate order processing through a cohesive Android mobile experience.',
    problem:
      'Traditional wholesale and multi-vendor distribution channels often suffer from unverified seller risks, lack of real-time inventory visibility across resellers, and complex role-based data permissions.',
    solution:
      'Engineered an Android application with dynamic multi-persona navigation (Buyer, Supplier, Reseller), real-time catalogue indexing, role-gated queries via Supabase Row Level Security (RLS), and resilient offline-capable state synchronization.',
    keyFeatures: [
      'Multi-persona access control for buyers, suppliers, and resellers',
      'Role-based database policies leveraging PostgreSQL Row Level Security (RLS)',
      'Real-time product catalog & inventory tracking via Supabase API integration',
      'Clean Architecture with MVVM, Kotlin Coroutines, and StateFlow',
      'Secure authentication workflows with JWT token refresh',
      'Comprehensive order lifecycle tracking and status transitions',
    ],
    roleContribution:
      'Designed and developed the Android App architecture in Kotlin, configured the Supabase backend schema and Row Level Security policies, and integrated REST endpoints for order and inventory management.',
    challenges:
      'Balancing complex multi-tier security policies where suppliers can only manage their own listings while resellers require specialized commission calculations and inventory access without compromising proprietary pricing.',
    outcome:
      'Delivered an extensible, secure mobile foundation with strict database-level access controls and an intuitive user interface that scales smoothly across different device sizes.',
    galleryImages: [
      '/images/projects/xora-preview.svg',
      '/images/projects/xora-architecture.svg',
    ],
  },
  {
    id: 'dev-workspace-portal',
    title: 'Modern Web Application Platform',
    category: 'Full-Stack',
    tagline: 'High-performance responsive web platform with API services and live data synchronization.',
    description:
      'A production-grade full-stack web application featuring React, TypeScript, EJS, and Express with real-time state management and secure authentication.',
    technologies: ['React', 'TypeScript', 'EJS', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'REST APIs'],
    status: 'Completed',
    featured: true,
    image: '/images/projects/web-platform.svg',
    githubUrl: 'https://github.com/MHK123980/ouscollection',
    liveDemoUrl: 'https://ouscollection.store',
    overview:
      'A full-stack web platform built for high-demand business workflows, offering responsive interfaces, role-gated endpoints, and low-latency API interactions.',
    keyFeatures: [
      'Modular TypeScript frontend architecture with reusable component library',
      'Express REST API with centralized validation, rate limiting, and security headers',
      'Interactive dashboards with responsive data filtering and search',
      'Accessible, keyboard-friendly UI with dark mode ergonomics',
      'Real-time updates via WebSockets and MongoDB change streams',
      'Fully Responsive and Real-time updates Admin Panel for managing users, products, orders, categories, analytics, and many more!',
      'Email integration for notifications and transactional workflows',
    ],
  },
  {
    id: 'api-gateway-service',
    title: 'Enterprise Backend & Microservices Hub',
    category: 'Web',
    tagline: 'Resilient Node.js API integration layer handling auth, validation, and data orchestration.',
    description:
      'A backend service architecture engineered for high throughput, data sanitization, third-party webhook processing, and unified REST endpoints.',
    technologies: ['Node.js', 'TypeScript', 'Express', 'Zod', 'PostgreSQL', 'Docker'],
    status: 'Completed',
    featured: false,
    image: '/images/projects/api-service.svg',
    githubUrl: 'https://github.com/MHK123980',
    overview:
      'Backend infrastructure layer coordinating client requests, executing schema validations, and managing database connections with connection pooling.',
    keyFeatures: [
      'Strict Zod schema validation on incoming payloads',
      'Automated rate-limiting and honeypot bot defenses',
      'Centralized error interception and standardized error payload schemas',
      'Comprehensive Postman collection and integration test suites',
    ],
  },
  {
  id: 'custom-homekitchen-website',
  title: 'Custom Pre-Ordering Website For Home Kitchen',
  category: 'Web',
  tagline: 'Fully Responsive Website for Home Kitchen with Pre-Ordering System in Javascript, Node.js, Express, and Tailwind CSS.',
  description: 'A fully responsive pre-ordering website for a home kitchen business, allowing customers to pre-order meals and manage their orders seamlessly.',
  technologies: ['JavaScript', 'Node.js', 'Express', 'Tailwind CSS'],
  status: 'Completed',
  featured: false,
  image: '/images/projects/api-service.svg',
  githubUrl: 'https://github.com/MHK123980/saltmuchhh',
  liveDemoUrl: 'https://saltmuchhh.vercel.app/',
  overview: 'A custom pre-ordering website designed for a home kitchen business, enabling customers to browse the menu, place orders in advance, and receive order confirmations.',
  keyFeatures: ['Fully responsive design for all devices', 'Pre-ordering system with order management', 'Secure form submissions and data handling', 'Integration with email notifications for order confirmations'],
}
];
