# Professional 3D Developer Portfolio Website

A production-grade personal developer portfolio website designed for an **Android & Full-Stack Web Developer**. Built with a modern dark-tech aesthetic, interactive 3D elements (Three.js / React Three Fiber), smooth physics-based animations (Framer Motion), a centralized configuration architecture, a comprehensive project inquiry system, and a robust Node.js/Express TypeScript backend with email notifications and anti-spam security.

---

## 1. Project Architecture

This project is structured as a clean monorepo:

```text
portfolio/
│
├── frontend/                     # React + Vite + TypeScript frontend
│   ├── public/                   # Static assets, SVG diagrams, robots.txt, sitemap
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── images/projects/      # SVG previews (XORA, web platform, API gateway)
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/               # Procedural 3D Hero core & 3D Skills constellation
│   │   │   ├── common/           # Custom cursor, scroll progress, back-to-top, headers
│   │   │   ├── Navbar/           # Sticky glassmorphism header & animated mobile menu
│   │   │   ├── Hero/             # Positioning, CTAs, availability indicator, 3D backdrop
│   │   │   ├── About/            # Bio, code terminal preview, core specializations
│   │   │   ├── Skills/           # Filterable tech categories, proficiency, 3D switch
│   │   │   ├── Services/         # 6 core services with "Request This Service" triggers
│   │   │   ├── Projects/         # XORA showcase + projects grid + deep-dive modal
│   │   │   ├── Experience/       # Transparent, honest developer timeline
│   │   │   ├── Value/            # "Why Work With Me" client-focused value propositions
│   │   │   ├── Process/          # 7-stage engineering methodology
│   │   │   ├── Contact/          # Direct message form + fast-track inquiry modal
│   │   │   └── Footer/           # Dynamic year, navigation, services, developer notes
│   │   ├── data/                 # Centralized portfolio data (profile, projects, skills, etc.)
│   │   ├── hooks/                # useScrollSpy, useReducedMotion, useMediaQuery
│   │   ├── lib/                  # Typed API client, utility functions
│   │   ├── types/                # Shared TypeScript models
│   │   ├── App.tsx               # Root application layout
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Tailwind styling, glassmorphism, scrollbars
│   ├── vite.config.ts            # Configured on port 3000 with API proxy
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                      # Node.js + Express + TypeScript API server
│   ├── src/
│   │   ├── config/               # Typed environment variables
│   │   ├── controllers/          # Health check, contact message, project requests
│   │   ├── middleware/           # Zod validation, rate limiter, error handling
│   │   ├── routes/               # /api/health, /api/contact, /api/project-requests
│   │   ├── services/             # Nodemailer with development fallback simulator
│   │   ├── validators/           # Zod schemas for all form inputs
│   │   ├── server.ts             # Express initialization with Helmet & CORS
│   │   └── index.ts              # Entry point listening on port 5000
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── package.json                  # Root monorepo scripts (concurrently dev, build)
├── .gitignore
└── README.md
```

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18 & TypeScript
- **Bundler / Tooling**: Vite
- **Styling**: Tailwind CSS, CSS Glassmorphism
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

### Backend
- **Runtime & Language**: Node.js & TypeScript (`tsx` for dev, `tsc` for production)
- **Framework**: Express
- **Security**: Helmet, CORS, Express-Rate-Limit (anti-spam)
- **Validation**: Zod (strict client and server schema enforcement)
- **Email Notifications**: Nodemailer (with graceful dev fallback logging when SMTP is unconfigured)

---

## 3. Local Development

### Required URLs
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Quick Start (Single Command)
From the **ROOT** project folder:

```bash
# 1. Install all dependencies (root, backend, frontend)
npm run install:all

# 2. Run both development servers concurrently
npm run dev
```

The command automatically starts:
- Frontend development server on **port 3000**
- Backend development API server on **port 5000**

You do **NOT** need to open two separate terminal windows.

---

## 4. Production Build

To build both backend and frontend for production:

```bash
npm run build
```

This compiles:
1. Backend TypeScript code into `backend/dist/`
2. Frontend React/TypeScript code into `frontend/dist/`

---

## 5. Centralized Configuration & Personalization

All personal details, projects, skills, services, and experience are centralized in `frontend/src/data/`. You can customize the portfolio without digging through component JSX:

### 1. Developer Profile & Personal Info
Edit [`frontend/src/data/profile.ts`](frontend/src/data/profile.ts):
- `name`: Replace `[YOUR NAME]` with your name.
- `role`: Default: `"Android & Full-Stack Web Developer"`
- `availability`: e.g. `"Available for Projects"` or `"Open to Remote Opportunities"`
- `email`: Replace `[YOUR EMAIL]` with your email.
- `github`: Replace `[YOUR GITHUB]` with your GitHub URL.
- `linkedin`: Replace `[YOUR LINKEDIN]` with your LinkedIn profile.
- `domain`: Replace `[YOUR DOMAIN]` with your domain.
- `bio`: Edit the 3 bio paragraphs honestly reflecting your focus.

### 2. Projects Showcase (including XORA)
Edit [`frontend/src/data/projects.ts`](frontend/src/data/projects.ts):
- Contains **XORA (Multi-Vendor Marketplace Ecosystem)** as the featured showcase with overview, problem, solution, features, contribution, and architecture diagram.
- Easily add new projects to the `projectsData` array using the `ProjectItem` interface.
- Supported categories: `All`, `Android`, `Web`, `Full-Stack`.

### 3. Skills Ecosystem
Edit [`frontend/src/data/skills.ts`](frontend/src/data/skills.ts):
- Organized by:
  - **Mobile Development** (Android, Kotlin, Jetpack Compose, Room SQLite, Coroutines)
  - **Web Development** (React, TypeScript, JavaScript, HTML5, Tailwind CSS)
  - **Backend & Database** (Node.js, Express, REST APIs, PostgreSQL, Supabase, RLS)
  - **Tools & Platforms** (Git, GitHub, VS Code, Postman)

### 4. Services
Edit [`frontend/src/data/services.ts`](frontend/src/data/services.ts):
- Contains the 6 core services:
  1. *Android App Development*
  2. *Web Application Development*
  3. *Website Development*
  4. *Full-Stack Development*
  5. *API & Backend Integration*
  6. *Bug Fixing & Improvements*

### 5. Honest Timeline & Experience
Edit [`frontend/src/data/experience.ts`](frontend/src/data/experience.ts):
- Categories: `Independent Developer`, `Freelance Projects`, `Personal Software Projects`.

---

## 6. Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service uptime and status check |
| `POST` | `/api/contact` | Submits general message with validation & honeypot defense |
| `POST` | `/api/project-requests` | Submits detailed project inquiry (service, budget, timeline) |

### Anti-Spam Protections
- **Honeypot Field**: Form submissions include a hidden `honeypot` field. If a bot fills this field, the server silently ignores the submission without error, saving resources.
- **Rate Limiting**: Submission endpoints are limited to 10 requests per 15 minutes per IP address.
- **Zod Schema Validation**: All payloads undergo strict structural and format validation.

---

## 7. Email Notification Configuration

Backend email credentials are set via environment variables.

Create a `backend/.env` file:

```ini
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# SMTP Provider (e.g., SendGrid, Brevo, AWS SES, Gmail App Password)
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
CONTACT_EMAIL=your_destination_email@example.com
```

### Development Fallback
If `EMAIL_HOST` or credentials are left blank, the backend **will not crash**. It runs in simulated development mode and prints formatted email notification summaries directly to the terminal stdout for inspection.

---

## 8. Mobile Responsiveness & Accessibility

- **Mobile Viewports**: Fully tested and optimized for viewports from `320px` to `1920px+`.
- **Navigation**: Animated full-screen drawer menu with touch-friendly targets (`>44px`).
- **3D Optimization**: Responsive camera field-of-view, throttled pixel ratio, and reduced particle counts on smaller screens.
- **Accessibility**: Native semantic HTML tags, keyboard navigation, focus states, and respect for `prefers-reduced-motion`.
