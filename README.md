# Job Application Tracker — Frontend

React + Vite frontend for the Job Application Tracker. Paired with a Spring Boot backend.

🔗 **Live demo:** https://job-tracker-ui.vercel.app
📦 **Backend repo:** [SushmaSri028/job-application-tracker](https://github.com/SushmaSri028/job-application-tracker)

---

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** (utility-first styling)
- **React Router** (client-side routing)
- **@tanstack/react-query** (server state)
- **axios** with interceptors (auth + auto-redirect on 401)
- **@dnd-kit/core** (drag-and-drop Kanban)
- **Recharts** (analytics charts)
- **react-hot-toast** (notifications)
- **lucide-react** (icons)

---

## Features

- 🔐 Login / Register with JWT token storage
- 📋 List view with search + status filters
- 📊 Kanban board with drag-and-drop status updates
- 📈 Analytics page (response rate, status pie chart, applications-over-time, top companies)
- 🌙 Dark mode (system preference detection + localStorage persistence)
- 📥 CSV export
- ⚠️ Stale application reminders
- ✨ Toast notifications + skeleton loaders + inline form validation

---

## Architecture

\`\`\`
src/
├── api/          # axios instance + API functions
├── components/   # reusable UI (cards, modals, charts)
├── context/      # AuthContext + ThemeContext
├── hooks/        # useApplications (React Query wrappers)
├── pages/        # Login, Register, Dashboard, Analytics
├── utils/        # csvExport, analytics math
└── constants/    # status enum
\`\`\`

---

## Local Setup

\`\`\`bash
# Clone
git clone git@github.com:SushmaSri028/job-tracker-ui.git
cd job-tracker-ui

# Install
npm install

# Create .env.local
echo "VITE_API_URL=http://localhost:8080" > .env.local

# Run dev server
npm run dev
\`\`\`

App opens at `http://localhost:5173`. Requires the backend running at `localhost:8080`.

---

## Deployment

Hosted on Vercel with GitHub auto-deploy on push to `main`. The `VITE_API_URL` environment variable points to the production backend.

---

## About

Built by **Sushma Sri Kondamareddy** • MS CS, Florida Atlantic University, graduating May 2026.

Open to Java Full Stack / Application Engineering roles starting June 2026 🇺🇸 (OPT/F-1, STEM extension eligible).

📧 kondamareddysushmasri03@gmail.com