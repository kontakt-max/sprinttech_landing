# AGENTS.md

## Cursor Cloud specific instructions

This repository is the **SprintTech** cybersecurity landing site: a Next.js 15 (App Router) + React 19 + TypeScript app styled with Tailwind CSS and Framer Motion. Content lives in `src/data/*.ts`; lead capture posts to `POST /api/lead`. Standard commands and env docs are in `README.md` (Polish) and `.env.example`.

### Services

There is one service: the Next.js web app.

- Dev server: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint` (`next lint`) — Type check: `npm run typecheck` (`tsc --noEmit`)
- Build: `npm run build` — Prod start: `npm run start`
- There is no automated test framework configured in this repo.

### Non-obvious notes

- The app runs with **no secrets**. All integrations (Google Sheets leads, LinkedIn, Soro webhook, Sora video) are optional and degrade gracefully. When `GOOGLE_SERVICE_ACCOUNT_*` env vars are unset, `POST /api/lead` still returns `201` and just logs the lead without PII (see `src/lib/integrations/google-sheets.ts`). This makes submitting the contact form a valid no-secret end-to-end smoke test.
- Copy `.env.example` to `.env.local` for local dev; all values may be left blank. `.env.local` is git-ignored.
- `POST /api/lead` is rate-limited to 5 requests/60s per IP (`RATE_LIMIT_*` in env). If you get `429` while testing, wait a minute or restart the dev server (the limiter is in-memory).
- The lead schema rejects personal email domains (gmail, outlook, wp.pl, etc.) — use a business-looking domain when testing form submission.
- The Sora video endpoint returns `501` by default and the Soro webhook is draft-only; these are intentional, not bugs.
- The app code historically lived only on a feature branch while `main` was an empty placeholder. If `main` is empty (no `package.json`), the update script's `npm ci`/`npm install` is intentionally skipped; run it manually after the branch containing the app is checked out.
