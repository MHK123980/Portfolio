import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'android-app-development',
    title: 'Android App Development',
    shortDesc:
      'Custom Android applications with modern architecture, APIs, authentication, databases, Fully Responsive, and polished UI.',
    detailedDesc:
      'Native Android applications engineered with Kotlin and modern Android Jetpack components. I design intuitive, responsive mobile interfaces backed by robust offline storage, smooth animations, secure authentication flows, and high performance on devices across all screen sizes.',
    deliverables: [
      'Native Kotlin & Jetpack UI development',
      'Architecture with MVVM / Clean Architecture',
      'Offline-first synchronization with Room/SQLite',
      'Secure token-based auth & biometric integration',
      'Push notifications, deep linking & background workers',
      'Google Play Store deployment readiness',
    ],
    iconName: 'Smartphone',
    badge: 'Mobile Core',
  },
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    shortDesc:
      'Modern responsive web applications with frontend, backend, authentication, APIs, and database integration.',
    detailedDesc:
      'Dynamic, client-side or full-stack web applications constructed with React, TypeScript, and modern component systems. Focused on rapid load times, interactive user workflows, state management, and real-time data synchronization.',
    deliverables: [
      'React & TypeScript single-page applications',
      'Complex dashboard interfaces & admin panels',
      'State management and data fetching caching',
      'Real-time updates via WebSockets/Supabase',
      'Role-based access control (RBAC) & authentication',
      'Cross-browser and mobile-friendly optimization',
    ],
    iconName: 'Layout',
    badge: 'Web Systems',
  },
  {
    id: 'website-development',
    title: 'Website Development',
    shortDesc:
      'Professional responsive websites for businesses, individuals, products, and services.',
    detailedDesc:
      'Tailored, high-conversion websites designed for companies, tech startups, and independent creators. Built with modern web standards, sleek micro-interactions, clean typography, fast performance scores, and search engine optimization.',
    deliverables: [
      'Fast, modern responsive static & interactive websites',
      'High conversion landing pages & portfolio sites',
      'Search Engine Optimization (SEO) & structured schema',
      'Interactive micro-animations & smooth scroll effects',
      'Accessible WCAG-compliant design patterns',
      'Custom domain & SSL hosting deployment setup',
    ],
    iconName: 'Globe',
    badge: 'High Conversion',
  },
  {
    id: 'full-stack-development',
    title: 'Full-Stack Development',
    shortDesc:
      'Complete frontend + backend applications with database and API integration.',
    deliverables: [
      'End-to-end software architecture & planning',
      'Frontend client (React) + Node.js/Express backend',
      'Database schema design (PostgreSQL / Supabase)',
      'Secure authentication, session & token handling',
      'Automated data validation & error handling',
      'Production deployment and environment configuration',
    ],
    detailedDesc:
      'Unified end-to-end engineering covering both user interfaces and backend infrastructures. I bridge the gap between intuitive frontends and resilient backends, ensuring seamless API communication, secure data models, and maintainable codebases.',
    iconName: 'Layers',
    badge: 'End-to-End',
  },
  {
    id: 'api-backend-integration',
    title: 'API & Backend Integration',
    shortDesc:
      'REST APIs, authentication, database integration, third-party services, and backend functionality.',
    deliverables: [
      'Clean RESTful API design & versioning',
      'Node.js & Express server architectures',
      'Supabase & PostgreSQL integration with RLS',
      'Third-party payment, SMS, or notification integration',
      'Rate limiting, CORS, security headers & input sanitization',
      'Comprehensive API documentation & Postman collections',
    ],
    detailedDesc:
      'Robust backend services and REST APIs capable of handling complex business logic, third-party webhook integrations, data pipelines, and strict authorization rules.',
    iconName: 'Server',
    badge: 'Backend & APIs',
  },
  {
    id: 'bug-fixing-improvements',
    title: 'Bug Fixing & Improvements',
    shortDesc:
      'Debugging, performance improvements, UI fixes, API issues, and feature improvements.',
    deliverables: [
      'Root-cause debugging for Android & web apps',
      'Performance audit & bundle size reduction',
      'UI/UX polishing and responsiveness repairs',
      'Database query optimization & indexing',
      'Refactoring legacy code into clean TypeScript',
      'Security patch remediation and library upgrades',
    ],
    detailedDesc:
      'Targeted technical troubleshooting and performance enhancement for existing software. Whether diagnosing erratic Android crashes, resolving CORS or API bottlenecks, or modernizing older web code, I deliver clear, well-tested fixes.',
    iconName: 'Wrench',
    badge: 'Optimization',
  },
];
