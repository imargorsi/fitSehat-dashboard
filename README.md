# FitSehat

All-in-one health tracking for calories, movement, and progress. Built with Next.js 16, Neon Postgres, and Neon Auth. Deploy on Vercel.

Internal working notes (`AGENTS.md`, `doc/`) stay on the author's machine and are gitignored.

## Local setup

```bash
npm install
cp .env.example .env.local
```

`.env.local` needs:

| Variable | What to paste |
|---|---|
| `DATABASE_URL` | Neon **pooled** connection string (`sslmode=require`) |
| `NEON_AUTH_BASE_URL` | Neon Console → Auth → Auth URL |
| `NEON_AUTH_COOKIE_SECRET` | `openssl rand -base64 32` (32+ characters) |

Dev server uses **port 43127** on purpose (not Next.js default 3000). See `package.json` → `"dev": "next dev --port 43127 --hostname 127.0.0.1"`. This matches the Neon Auth allowlist for local sign-in (`http://127.0.0.1:43127`). To use `localhost:3000` instead, change the dev script and add that origin in Neon Console → Auth → Domains.

```bash
npm run db:push
npm run dev
```

## Deploy on Vercel

The app is a standard Next.js project (`vercel.json` sets `framework: nextjs`). Node 20.9+ (see `.nvmrc`).

1. Push this folder as the Git root (or set **Root Directory** to `fitSehat-dashboard` if the repo is the parent folder).
2. Import the project in Vercel. Leave Build Command and Output empty — Vercel will use Next.js defaults (`npm run build`).
3. **Before the first deploy**, add these Environment Variables for **Production and Preview**:
   - `DATABASE_URL`
   - `NEON_AUTH_BASE_URL`
   - `NEON_AUTH_COOKIE_SECRET` — a **new** 32+ character secret, not the local one

   Do not prefix these with `NEXT_PUBLIC_`.

4. Deploy. Open `https://YOUR-APP.vercel.app/api/health`. You want `{ "ok": true, "database": "connected" }`.
5. Neon Console → Auth → Domains. Add:
   - `https://YOUR-APP.vercel.app`
   - any custom domain
   - each Preview URL you will actually sign in on (Neon does not treat `*.vercel.app` as `localhost`)

6. Sign in on the live origin. If you see the allowlist message, the origin is missing from step 5.

Missing env or a short cookie secret fails the build on purpose.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local server (`127.0.0.1:43127`) |
| `npm run build` | Production build (what Vercel runs) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push `public` schema to Neon |

## Features

- Email/password auth
- Overview dashboard with health score, fuel, protein, meals, walking
- Calorie logs with edit/delete and week chart
- Saved meals with quick add
- Walking tracker with calendar backdating
- Weight and waist measurements with trends
- Macro targets and weekly reports (routes redirect; data model retained)
