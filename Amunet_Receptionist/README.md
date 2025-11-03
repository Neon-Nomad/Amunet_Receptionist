# Amunet AI

Complete business automation platform combining SaaS app and marketing website.

## Project Structure

```
amunet-ai/
├── backend/          # Node.js + Express + PostgreSQL backend
├── marketing/        # Marketing website (React + Vite)
└── app/             # SaaS client portal (React + Vite)
```

## Backend

Node.js backend with Express, Knex, PostgreSQL, and integrations for:
- Stripe (payments)
- Twilio (SMS/calls)
- SendGrid (email)
- Google Gemini AI
- OpenAI Sora (video generation)

### Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run migrate:latest
npm run dev
```

## Marketing Site

React + Vite marketing website with:
- Landing page
- Features showcase
- Pricing
- Demo
- Contact form

### Setup

```bash
cd marketing
npm install
cp .env.example .env
npm run dev
```

## SaaS App

React + Vite client portal with:
- Dashboard
- AI Receptionist management
- Content generation (images/videos)
- Analytics
- Integrations

### Setup

```bash
cd app
npm install
cp .env.example .env
npm run dev
```

## Deployment

- Backend: Google Cloud Run
- Frontend (marketing + app): Vercel

## License

Proprietary - All rights reserved
