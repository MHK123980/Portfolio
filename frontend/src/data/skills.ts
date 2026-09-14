import { SkillItem } from '../types';

export const skillsData: SkillItem[] = [
  // Mobile Development
  { name: 'Android', category: 'Mobile Development', proficiency: 'Advanced', tag: 'Core Platform' },
  { name: 'Kotlin', category: 'Mobile Development', proficiency: 'Advanced', tag: 'Primary Language' },
  { name: 'Android Studio', category: 'Mobile Development', proficiency: 'Advanced', tag: 'Native IDE' },
  { name: 'Jetpack Compose & Modern Android', category: 'Mobile Development', proficiency: 'Advanced', tag: 'UI & Architecture' },
  { name: 'Room & SQLite', category: 'Mobile Development', proficiency: 'Proficient', tag: 'Local Persistence' },
  { name: 'Coroutines & Flow', category: 'Mobile Development', proficiency: 'Advanced', tag: 'Asynchronous' },

  // Web Development
  { name: 'React', category: 'Web Development', proficiency: 'Advanced', tag: 'Frontend Library' },
  { name: 'TypeScript', category: 'Web Development', proficiency: 'Advanced', tag: 'Type-Safe Code' },
  { name: 'JavaScript (ES6+)', category: 'Web Development', proficiency: 'Advanced', tag: 'Modern Scripting' },
  { name: 'HTML5 & Semantic Markup', category: 'Web Development', proficiency: 'Advanced', tag: 'Accessibility' },
  { name: 'CSS3 & Tailwind CSS', category: 'Web Development', proficiency: 'Advanced', tag: 'Modern Styling' },
  { name: 'Responsive Web Design', category: 'Web Development', proficiency: 'Advanced', tag: 'Multi-Device' },

  // Backend & Database
  { name: 'Node.js', category: 'Backend & Database', proficiency: 'Advanced', tag: 'Runtime' },
  { name: 'Express', category: 'Backend & Database', proficiency: 'Advanced', tag: 'API Framework' },
  { name: 'REST APIs', category: 'Backend & Database', proficiency: 'Advanced', tag: 'Integration' },
  { name: 'PostgreSQL', category: 'Backend & Database', proficiency: 'Proficient', tag: 'Relational DB' },
  { name: 'Supabase', category: 'Backend & Database', proficiency: 'Advanced', tag: 'BaaS & Auth' },
  { name: 'Row Level Security (RLS)', category: 'Backend & Database', proficiency: 'Advanced', tag: 'Data Security' },
  { name: 'MongoDB', category: 'Backend & Database', proficiency: 'Advanced', tag: 'NoSQL DB' },

  // Tools & Platforms
  { name: 'Git', category: 'Tools & Platforms', proficiency: 'Advanced', tag: 'Version Control' },
  { name: 'GitHub', category: 'Tools & Platforms', proficiency: 'Advanced', tag: 'CI/CD & Collab' },
  { name: 'Antigravity IDE', category: 'Tools & Platforms', proficiency: 'Advanced', tag: 'Development' },
  { name: 'VS Code', category: 'Tools & Platforms', proficiency: 'Advanced', tag: 'Development' },
  { name: 'Postman', category: 'Tools & Platforms', proficiency: 'Advanced', tag: 'API Testing' },
];

export const skillCategories = [
  'Mobile Development',
  'Web Development',
  'Backend & Database',
  'Tools & Platforms',
] as const;
