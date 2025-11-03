# Amunet AI - Quick Start Guide

## ✅ Structure Fixed!

The project now has a **clean, flattened directory structure** with no redundant nested folders.

## 📁 Directory Layout

```
amunet-ai/
├── backend/          ← All backend files here (NOT backend/backend/)
│   ├── package.json
│   ├── src/
│   └── ...
│
├── marketing/        ← All marketing files here
│   ├── package.json
│   ├── src/
│   └── ...
│
└── app/             ← All app files here (NOT app/app/)
    ├── package.json
    ├── src/
    └── ...
```

## 🚀 Quick Setup

### 1. Extract
```bash
tar -xzf amunet-ai.tar.gz
cd amunet-ai
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
```

**Marketing:**
```bash
cd ../marketing
npm install
cp .env.example .env
```

**App:**
```bash
cd ../app
npm install
cp .env.example .env
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run migrate:latest  # Set up database
npm run dev            # Runs on :8080
```

**Terminal 2 - Marketing:**
```bash
cd marketing
npm run dev            # Runs on :5173
```

**Terminal 3 - App:**
```bash
cd app
npm run dev            # Runs on :5174
```

## 📝 Environment Variables

You'll need API keys for:
- PostgreSQL (database)
- Stripe (payments)
- Twilio (SMS/calls)
- SendGrid (email)
- Google Gemini AI
- OpenAI (optional, for Sora videos)

See `.env.example` in each directory for the full list.

## 🐙 Push to GitHub

```bash
cd amunet-ai
git init
git add .
git commit -m "Initial commit: Amunet AI platform"
git remote add origin https://github.com/YOUR_USERNAME/amunet-ai.git
git branch -M main
git push -u origin main
```

## 📚 Documentation

- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `PROJECT_STRUCTURE.txt` - Full directory tree
- `AMUNET_PROJECT_SUMMARY.md` - Detailed project summary

## ✨ What's Included

- **Backend**: 56 files - Node.js + Express + PostgreSQL
- **Marketing**: 21 files - React marketing website
- **App**: 50 files - React SaaS client portal
- **Total**: 129 files ready to use!

## 🎯 Next Steps

1. Set up your API keys in `.env` files
2. Run database migrations (`npm run migrate:latest` in backend)
3. Start all three development servers
4. Visit http://localhost:5173 for marketing site
5. Visit http://localhost:5174 for SaaS app

Happy coding! 🚀
