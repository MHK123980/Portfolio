import { ProcessStep } from '../types';

export const processStepsData: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    summary: 'Understand the core idea, business objectives, and technical requirements.',
    details: [
      'In-depth discussion on project vision and target audience',
      'Analysis of technical constraints and performance goals',
      'Feasibility evaluation for mobile platforms and web architectures',
    ],
  },
  {
    step: '02',
    title: 'Planning',
    summary: 'Define features, software architecture, timeline, and deliverables.',
    details: [
      'Architectural blueprint (mobile MVVM, web stack, database schema)',
      'Milestone breakdown with transparent timelines and checkpoints',
      'API specification and security model definition',
    ],
  },
  {
    step: '03',
    title: 'Design',
    summary: 'Create intuitive UI/UX workflows and high-fidelity design directions.',
    details: [
      'Wireframing user journeys and mobile/web ergonomics',
      'Modern dark-theme aesthetic, typography, and color harmony',
      'Interactive micro-interactions and smooth transition planning',
    ],
  },
  {
    step: '04',
    title: 'Development',
    summary: 'Build frontend, backend, database models, and API integrations.',
    details: [
      'Writing type-safe, maintainable, modular code',
      'Native Android implementation (Kotlin) and modern React frontend',
      'Robust Node.js REST API with input validation and security headers',
    ],
  },
  {
    step: '05',
    title: 'Testing',
    summary: 'Test functionality, edge cases, responsiveness, and performance.',
    details: [
      'Multi-device testing across various Android viewports and screen sizes',
      'API load, security validation, and boundary conditions verification',
      'Cross-browser testing (Chrome, Safari, Firefox, Edge)',
    ],
  },
  {
    step: '06',
    title: 'Delivery',
    summary: 'Deploy production build and provide documented code handover.',
    details: [
      'Production deployment (Vercel, Netlify, VPS, Google Play Store preparation)',
      'Environment configuration and clean secret management setup',
      'Comprehensive documentation and developer handover walkthrough',
    ],
  },
  {
    step: '07',
    title: 'Support',
    summary: 'Ongoing maintenance, feature enhancements, and continuous optimization.',
    details: [
      'Post-launch monitoring and bug remediation',
      'Performance profiling and database query optimization',
      'Iterative feature rollouts based on real user feedback',
    ],
  },
];
