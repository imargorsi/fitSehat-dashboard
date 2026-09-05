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
| `FATSECRET_CLIENT_ID` | Optional. FatSecret Consumer Key |
| `FATSECRET_CLIENT_SECRET` | Optional. FatSecret Consumer Secret |
| `NEXT_PUBLIC_SITE_URL` | Optional. Public origin for sitemap, robots, and Open Graph |
| `GEMINI_API_KEY` | Optional. Gemini key for FitSehat AI meal logging |
| `GEMINI_MODEL` | Optional. Defaults to `gemini-3.5-flash-lite` |

Food lookup is optional. Meal logging still works without FatSecret keys (manual calories/macros). Do not prefix FatSecret or Gemini vars with `NEXT_PUBLIC_`. FatSecret lookup uses OAuth 1.0 signed REST calls — no IP whitelist. FitSehat AI is optional; without `GEMINI_API_KEY` the AI path asks you to use Search Food instead.

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
   - `NEXT_PUBLIC_SITE_URL` — optional. Canonical origin (`https://YOUR-APP.vercel.app` or your custom domain). Used for sitemap, robots, and Open Graph.
   - `FATSECRET_CLIENT_ID` and `FATSECRET_CLIENT_SECRET` — optional; meal logging works without them
   - `GEMINI_API_KEY` and `GEMINI_MODEL` — optional; FitSehat AI degrades to Search Food if missing. Never prefix with `NEXT_PUBLIC_`.

   Do not prefix FatSecret keys with `NEXT_PUBLIC_`. `NEXT_PUBLIC_SITE_URL` is public on purpose.

4. Deploy. Open `https://YOUR-APP.vercel.app/api/health`. You want `{ "ok": true, "database": "connected" }`.
5. Neon Console → Auth → Domains. Add:
   - `https://YOUR-APP.vercel.app`
   - any custom domain
   - each Preview URL you will actually sign in on (Neon does not treat `*.vercel.app` as `localhost`)

6. Sign in on the live origin. If you see the allowlist message, the origin is missing from step 5.
7. Confirm SEO: `https://YOUR-APP.vercel.app/robots.txt` allows `/` and lists the sitemap. `https://YOUR-APP.vercel.app/sitemap.xml` includes `/`, `/sign-in`, and `/sign-up`. Dashboard routes stay out of the sitemap and are `noindex`.

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
- Fuel, Meals, Move, Check-in, and a Dashboard home in the dock
- Calorie logs with FitSehat AI, FatSecret search (optional), and always-available manual entry
- Saved meals with one-tap add to today
- Walking tracker with calendar backdating
- Weight and waist check-ins with trends
- Macro targets and weekly reports (routes redirect; data model retained)
