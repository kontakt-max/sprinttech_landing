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
- The home page renders a "Threat Command Center" that pulls from `GET /api/threat-pulse`, which aggregates public threat intel (NVD, FIRST EPSS, MITRE, ENISA). It is enabled by default (`THREAT_PULSE_ENABLED=true`) and degrades gracefully: each source falls back independently and the route returns cached/fallback data (or `503`) if outbound fetches fail, so it works offline without secrets. `NVD_API_KEY`/`SHADOWSERVER_API_KEY` are optional (raise rate limits / enable Shadowserver). Responses are cached ~6h.
- The app code historically lived only on a feature branch while `main` was an empty placeholder. If `main` is empty (no `package.json`), the update script's `npm ci`/`npm install` is intentionally skipped; run it manually after the branch containing the app is checked out.
- Environment variables are centralized and Zod-validated: `src/lib/env.ts` (public `NEXT_PUBLIC_*`, client-safe) and `src/lib/env.server.ts` (server-only secrets, guarded by `import "server-only"`). Read config from these modules — never scatter raw `process.env` reads. Optional integrations expose derived `integrations.*` flags and are "safely disabled" when keys are missing. Invalid config throws a readable aggregated error at startup (e.g. `[env] Invalid public environment configuration: ...`).
- **Dev-mode gotcha (client interactivity):** the strict CSP from `src/lib/security/headers.ts` sets `script-src 'self' 'unsafe-inline'` with **no `'unsafe-eval'`**. `next dev` (React Fast Refresh) needs `'unsafe-eval'`, so in `npm run dev` client JS fails to hydrate — interactive UI (e.g. the contact form) falls back to a native GET submit and never shows its success state. This is a CSP/dev limitation, not an app bug. To manually verify client-side behavior, test a production build instead: `npm run build && npm run start` (the CSP is production-appropriate there and hydration works). Server routes (`/api/*`) work fine in dev.
