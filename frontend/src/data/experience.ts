import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Architect & Mobile Engineer',
    organization: 'XORA Marketplace Ecosystem',
    period: '2023 — Present',
    type: 'Personal Software Projects',
    description:
      'Designing and engineering a comprehensive multi-tier commerce ecosystem natively on Android, connecting buyers, suppliers, and resellers with Supabase and PostgreSQL.',
    highlights: [
      'Architected Android client using Kotlin, Jetpack Compose, MVVM pattern, and Coroutines.',
      'Constructed database schema with fine-grained PostgreSQL Row Level Security (RLS) policies.',
      'Integrated RESTful APIs for automated inventory updates and authentication flows.',
    ],
    technologies: ['Android', 'Kotlin', 'Jetpack Compose', 'Supabase', 'PostgreSQL', 'RLS', 'REST APIs'],
  },
  {
    id: 'exp-2',
    role: 'Freelance Full-Stack & Android Developer',
    organization: 'Client Engagements & Independent Contracts',
    period: '2022 — Present',
    type: 'Freelance Projects',
    description:
      'Partnering with international clients, startups, and product owners to build custom Android apps, modern web frontends, and robust backend APIs.',
    highlights: [
      'Delivered responsive web applications with React, TypeScript, and Tailwind CSS.',
      'Developed and integrated Node.js/Express REST APIs with authentication, input validation, and database storage.',
      'Fixed critical performance bottlenecks and improved mobile UI responsiveness across diverse screen sizes.',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Android', 'REST APIs'],
  },
  {
    id: 'exp-3',
    role: 'Independent Software Developer',
    organization: 'Software Research & Open Source',
    period: '2021 — 2023',
    type: 'Independent Developer',
    description:
      'Dedicated focused effort to mastering modern software engineering principles, clean code patterns, native Android architecture, and scalable full-stack development.',
    highlights: [
      'Built and deployed end-to-end full-stack applications with strict TypeScript and modern tooling.',
      'Created modular Android utility libraries and reusable UI components.',
      'Refined database design principles, relational indexing, and API security best practices.',
    ],
    technologies: ['Kotlin', 'Java', 'JavaScript', 'TypeScript', 'Git', 'SQL', 'REST APIs'],
  },
  {
    id: 'exp-4',
    role: 'Freelance Full-Stack Website Development',
    organization: 'Client Engagements & Independent Contracts',
    period: '2025 — Present',
    type: 'Freelance Projects',
    description:
      'Partnering with Local clients, startups, and product owners to build custom Websites for their Businesses, modern web frontends, and robust backend APIs.',
    highlights: [
      'Delivered responsive website with React, TypeScript, EJS, and Tailwind CSS.',
      'Developed and integrated Node.js/Express REST APIs with authentication, input validation, and database storage.',
      'Fixed critical performance bottlenecks and improved mobile UI responsiveness across diverse screen sizes.',
    ],
    technologies: ['React', 'TypeScript', 'EJS', 'Node.js', 'Express', 'Tailwind CSS', 'Android', 'REST APIs'],
  },
];
