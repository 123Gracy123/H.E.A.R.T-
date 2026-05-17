# H.E.A.R.T*

**H**elping **E**very **A**t-Risk **M**other **T**hrive — a maternal cardiovascular health platform for pregnant and postpartum women in California.

## Features

- **Interactive anatomical heart** homepage with puzzle-piece navigation zones
- Dynamic heart coloring by cardiovascular risk score
- JWT authentication (Patient, Doctor, Admin roles)
- Education center with trimester filters and bookmarks
- Health stats dashboard with Recharts and live risk visualization
- Anonymous messaging with verified doctor badges
- Help line & crisis resources
- California hospital heatmap (Leaflet)
- Community space, PWA support, dark/light mode

## Tech Stack

- Next.js 14, React, TypeScript, Tailwind CSS
- Framer Motion, Recharts, React Leaflet
- Prisma ORM + SQLite
- JWT auth (bcrypt + httpOnly cookies)
- PWA via `@ducanh2912/next-pwa`

## Quick Start

```bash
cd heart-app
npm install
cp .env.example .env
npm run db:setup
node scripts/generate-icons.mjs
npm run dev
```

Open https://heart-app-chi.vercel.app/login

## Demo Accounts

| Role    | Email              | Password     |
|---------|--------------------|--------------|
| Patient | patient@test.com   | password123  |
| Patient | patient2@test.com  | password123  |
| Doctor  | doctor@test.com    | password123  |
| Admin   | admin@test.com     | password123  |

## Environment Variables

See `.env.example`:

- `DATABASE_URL` — SQLite path (`file:./dev.db`)
- `JWT_SECRET` — signing secret
- `NEXT_PUBLIC_APP_URL` — app URL
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` — optional push notifications

## API Routes

| Method | Route            | Description        |
|--------|------------------|--------------------|
| POST   | /api/auth/login  | Sign in            |
| POST   | /api/auth/register | Register         |
| POST   | /api/auth/logout | Sign out           |
| GET    | /api/auth/me     | Current session    |
| GET/PATCH | /api/patient  | Patient metrics    |
| GET/POST | /api/messages  | Anonymous chat     |
| GET    | /api/hospitals   | Heatmap data       |

## PWA Install

1. Run production build: `npm run build && npm start`
2. Open in Chrome/Safari on mobile
3. Use “Add to Home Screen” / “Install app”

## Project Structure

```
heart-app/
├── prisma/          # Schema + seed
├── public/          # Heart SVG, manifest, icons
├── src/
│   ├── app/         # Pages + API routes
│   ├── components/  # Heart, health, map, UI
│   ├── data/        # Education articles
│   └── lib/         # Auth, prisma, risk scoring
└── README.md
```

## Medical Disclaimer

This application is for **education and demonstration** only. It does not provide medical advice. In an emergency, call **911**.

## License

Demo / hackathon project.
