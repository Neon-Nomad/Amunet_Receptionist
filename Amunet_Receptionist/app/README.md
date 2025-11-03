# Amunet AI - Client Portal

React + Vite + Tailwind CSS SaaS application for Amunet AI clients.

## Features

- ✅ Complete authentication flow
- ✅ 6-step onboarding wizard
- ✅ Dashboard with charts & analytics
- ✅ Lead management with priority alerts
- ✅ AI Studio (image generation)
- ✅ AI Motion (video generation - admin only Sora)
- ✅ Integrations management (shared vs custom)
- ✅ Stripe billing portal integration
- ✅ Settings & preferences
- ✅ Admin dashboard
- ✅ Fully responsive design
- ✅ PWA ready

## Setup

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API URL

# Run development server
npm run dev

# Build for production
npm run build
Tech Stack
React 18 - UI library
Vite - Build tool
Tailwind CSS - Styling
Framer Motion - Animations
React Router - Routing
Axios - API client
Zustand - State management
Recharts - Data visualization
React Hook Form - Form handling
Folder Structure
text

src/
├── components/     # Reusable UI components
├── pages/         # Route pages
├── context/       # React context (Auth)
├── hooks/         # Custom hooks
├── services/      # API & storage services
├── utils/         # Helpers & constants
└── App.tsx        # Main app & routing
Environment Variables
text

VITE_API_URL=http://localhost:8080
VITE_MARKETING_URL=http://localhost:5173
VITE_STRIPE_PUBLIC_KEY=pk_test_...
Deploy to Vercel
Bash

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
PWA Assets
Place these in public/: