# Amunet AI - Deployment Guide

## Overview

This repository contains the complete Amunet AI platform with three main components:

1. **Backend** - Node.js + Express + PostgreSQL API server
2. **Marketing** - React marketing website
3. **App** - React SaaS client portal

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### 1. Clone or Extract Repository

If you have the archive file:
```bash
# For .tar.gz
tar -xzf amunet-ai.tar.gz
cd amunet-ai

# For .zip
unzip amunet-ai.zip
cd amunet-ai
```

If cloning from GitHub:
```bash
git clone <your-repo-url>
cd amunet-ai
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your credentials:
# - DATABASE_URL
# - JWT_SECRET
# - STRIPE_SECRET_KEY
# - TWILIO credentials
# - SENDGRID_API_KEY
# - GEMINI_API_KEY

# Run database migrations
npm run migrate:latest

# Start development server
npm run dev
```

Backend will run on `http://localhost:8080`

### 3. Marketing Site Setup

```bash
cd marketing
npm install

# Copy environment file
cp .env.example .env
# Update VITE_API_URL if needed

# Start development server
npm run dev
```

Marketing site will run on `http://localhost:5173`

### 4. SaaS App Setup

```bash
cd app
npm install

# Copy environment file
cp .env.example .env
# Update VITE_API_URL and other variables

# Start development server
npm run dev
```

App will run on `http://localhost:5174`

## Production Deployment

### Backend (Google Cloud Run)

1. Build Docker image:
```bash
cd backend
docker build -t gcr.io/YOUR_PROJECT/amunet-backend .
docker push gcr.io/YOUR_PROJECT/amunet-backend
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy amunet-backend \
  --image gcr.io/YOUR_PROJECT/amunet-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

3. Set environment variables in Cloud Run console

### Frontend (Vercel)

#### Marketing Site

1. Connect repository to Vercel
2. Set build settings:
   - Framework: Vite
   - Root Directory: `marketing`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables
4. Deploy

#### SaaS App

1. Create new Vercel project
2. Set build settings:
   - Framework: Vite
   - Root Directory: `app`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables
4. Deploy

## Environment Variables

### Backend

```env
PORT=8080
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=no-reply@amunet.ai
GEMINI_API_KEY=AIza...
SORA_API_KEY=sk-proj-...
MARKETING_URL=https://amunet.ai
APP_URL=https://app.amunet.ai
ENCRYPTION_KEY=...
```

### Marketing Site

```env
VITE_API_URL=https://api.amunet.ai
```

### SaaS App

```env
VITE_API_URL=https://api.amunet.ai
VITE_MARKETING_URL=https://amunet.ai
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

## Database Setup

### Local Development

```bash
# Install PostgreSQL
# Create database
createdb amunet_dev

# Update DATABASE_URL in backend/.env
# Run migrations
cd backend
npm run migrate:latest
```

### Production (Google Cloud SQL)

1. Create Cloud SQL PostgreSQL instance
2. Create database: `amunet_db`
3. Get connection string
4. Update DATABASE_URL in Cloud Run environment
5. Run migrations from local machine or Cloud Shell

## API Keys Required

1. **Stripe** - Payment processing
   - Get from: https://dashboard.stripe.com/apikeys
   
2. **Twilio** - SMS and voice calls
   - Get from: https://console.twilio.com/
   
3. **SendGrid** - Email delivery
   - Get from: https://app.sendgrid.com/settings/api_keys
   
4. **Google Gemini** - AI text generation
   - Get from: https://makersuite.google.com/app/apikey
   
5. **OpenAI** - Sora video generation (optional)
   - Get from: https://platform.openai.com/api-keys

## GitHub Repository Setup

### Initialize Git Repository

```bash
cd amunet-ai
git init
git add .
git commit -m "Initial commit: Amunet AI platform"
```

### Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `amunet-ai`)
3. Don't initialize with README (we already have one)

### Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/amunet-ai.git
git branch -M main
git push -u origin main
```

## Directory Structure

The project uses a clean, flattened monorepo structure:

```
amunet-ai/
├── backend/          # All backend files directly here
│   ├── package.json
│   ├── src/
│   └── ...
├── marketing/        # All marketing site files directly here
│   ├── package.json
│   ├── src/
│   └── ...
└── app/             # All SaaS app files directly here
    ├── package.json
    ├── src/
    └── ...
```

## Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify all required environment variables are set

### Frontend can't connect to API
- Check VITE_API_URL points to correct backend
- Verify CORS settings in backend allow your frontend domain
- Check backend is running and accessible

### Database migration errors
- Ensure database exists
- Check PostgreSQL user has proper permissions
- Verify connection string format

## Support

For issues or questions:
- Check the README.md in each component directory
- Review environment variable configuration
- Ensure all dependencies are installed

## License

Proprietary - All rights reserved
