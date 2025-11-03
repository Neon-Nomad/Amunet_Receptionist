# Amunet Receptionist

Amunet Receptionist is an AI-powered virtual assistant platform that automatically answers calls, books appointments, manages client messages, and creates engaging social media and newsletter content — all under one dashboard.

## 🚀 Overview

**Amunet Receptionist** combines automation, voice AI, and marketing tools to help service-based businesses capture every lead and stay connected with clients.

### Features
- **AI Call Receptionist** – Answers calls 24/7 via Twilio integration  
- **Appointment Booking** – Syncs with Google Calendar and SMS reminders  
- **Lead Notifications** – Instantly alert owners via text for high-value leads  
- **Social Media Manager** – Automates post creation and scheduling  
- **Newsletter Generator** – Creates branded monthly client newsletters  
- **Voice & Video AI** – Integrates Google Gemini and Sora (optional)  
- **Stripe Billing** – Handles recurring subscriptions and payments  

---

## 🧩 Project Structure

Amunet_Receptionist/
├── backend/ # Node.js + Express + PostgreSQL API
├── app/ # Client SaaS Portal (React + Vite)
└── marketing/ # Public Website (React + Vite + Tailwind)

yaml
Copy code

---

## 🛠️ Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React, Vite, TailwindCSS, TypeScript |
| **Backend** | Node.js, Express, Knex.js, PostgreSQL |
| **Integrations** | Stripe, Twilio, SendGrid, Google Gemini, OpenAI Sora |
| **Deployment** | Vercel (frontend), Google Cloud Run (backend) |

---

## ⚙️ Setup

### 1. Clone the Repo
```bash
git clone https://github.com/Neon-Nomad/Amunet_Receptionist.git
cd Amunet_Receptionist
2. Backend
bash
Copy code
cd backend
npm install
cp .env.example .env
npm run migrate:latest
npm run dev
3. Marketing Site
bash
Copy code
cd marketing
npm install
npm run dev
4. SaaS App
bash
Copy code
cd app
npm install
npm run dev
🌍 Deployment
Component	Platform	Notes
Backend	Google Cloud Run	Docker-ready build
Marketing	Vercel	Root domain: amunet.ai
App	Vercel	Subdomain: app.amunet.ai

🔑 Environment Variables
Backend .env

ini
Copy code
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
SENDGRID_API_KEY=SG...
GEMINI_API_KEY=AIza...
SORA_API_KEY=sk-proj-...
Frontend .env

ini
Copy code
VITE_API_URL=https://api.amunet.ai
VITE_STRIPE_PUBLIC_KEY=pk_live_...
🧠 Notes
The backend handles AI, messaging, and integrations.

The marketing site promotes plans and demos.

The app portal is for clients to configure services and view analytics.

🧾 License
© 2025 Amunet AI. All rights reserved. Proprietary software.

yaml
Copy code

---

Would you like me to tailor this for **premium client-facing tone** (e.g., more polished marketing copy and visuals) or k
