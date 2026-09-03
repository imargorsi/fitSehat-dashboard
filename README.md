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
| `FATSECRET_CLIENT_ID` | Optional. FatSecret Client ID (consumer key) |
| `FATSECRET_CLIENT_SECRET` | Optional. FatSecret Client Secret |

Food lookup is optional. Meal logging still works without FatSecret keys (manual calories/macros). Do not prefix FatSecret vars with `NEXT_PUBLIC_`. In FatSecret → Manage API Keys, whitelist this machine’s public IP (`x.x.x.x/32`); a miss returns `invalid_client`.

Dev server uses the Next.js default: **http://localhost:3000**. Add that origin in Neon Console → Auth → Domains so local sign-in works (Neon pre-approves `http://localhost:*` in many setups; if you see an allowlist message, add `http://localhost:3000` explicitly).

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
   - `FATSECRET_CLIENT_ID` and `FATSECRET_CLIENT_SECRET` — optional; meal logging works without them

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
| `npm run dev` | Local server (`http://localhost:3000`) |
| `npm run build` | Production build (what Vercel runs) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push `public` schema to Neon |

## Features

- Email/password auth
- Overview dashboard with health score, fuel, protein, meals, walking
- Calorie logs with FatSecret search (optional) and always-available manual entry
- Saved meals with quick add
- Walking tracker with calendar backdating
- Weight and waist measurements with trends
- Macro targets and weekly reports (routes redirect; data model retained)
