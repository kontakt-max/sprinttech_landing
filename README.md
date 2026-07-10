# SprintTech — strona cyberbezpieczeństwa

Produkcyjna strona WWW dla SprintTech (sprinttech.pl): pentesty, audyty, SOC, OT/ICS, compliance.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion
- **Zod** + React Hook Form
- Treść w plikach TypeScript (`src/data/`)
- Deployment: Vercel / Cloudflare Pages

## Uruchomienie lokalne

```bash
cp .env.example .env.local
npm install
npm run dev
```

Strona: http://localhost:3000

## Skrypty

| Skrypt | Opis |
|--------|------|
| `npm run dev` | Serwer deweloperski |
| `npm run build` | Build produkcyjny |
| `npm run start` | Serwer produkcyjny |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

## Konfiguracja środowiska

Skopiuj `.env.example` do `.env.local`. **Nigdy nie commituj sekretów.**

### Google Sheets (leady)

1. Utwórz projekt w [Google Cloud Console](https://console.cloud.google.com/)
2. Włącz **Google Sheets API**
3. Utwórz **Service Account** z minimalnymi uprawnieniami
4. Pobierz klucz JSON — wyciągnij `client_email` i `private_key`
5. Utwórz arkusz Google Sheets i udostępnij go service account (rola: Editor)
6. Ustaw zmienne:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=...
GOOGLE_SHEETS_SHEET_NAME=Leads
```

### Model danych arkusza (kolumny A–Q)

| Kolumna | Pole |
|---------|------|
| A | id (UUID) |
| B | createdAt |
| C | source |
| D | name |
| E | company |
| F | email |
| G | phone |
| H | industry |
| I | companySize |
| J | interestArea |
| K | regulatedBy |
| L | message |
| M | consentContact |
| N | consentPrivacy |
| O | status (New) |
| P | owner |
| Q | notes |

### Google Forms (alternatywa)

```env
NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/.../viewform?embedded=true
NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL=https://docs.google.com/forms/d/e/.../viewform
```

Embed ładuje się **tylko po zgodzie** na treści zewnętrzne w Consent Manager.

### AppSheet — panel leadów

1. Połącz AppSheet z arkuszem Google Sheets jako źródłem danych
2. Utwórz aplikację z widokiem tabeli na arkuszu `Leads`
3. Kolumna `status`: New → Qualified → In progress → Closed / Rejected
4. Role: `Sales` (edycja statusu), `Manager` (przypisanie owner), `Admin` (pełny dostęp)
5. Notyfikacje: reguła przy `status = New` → e-mail do zespołu sprzedaży
6. Komentarze w kolumnie `notes` z timestampem

### LinkedIn

- **Share button**: działa bez API (publiczny URL LinkedIn)
- **Insight Tag**: wyłączony domyślnie — wymaga `NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED=true` + zgody marketingowej
- **API OAuth** (opcjonalnie): `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_ACCESS_TOKEN` — placeholder w `/api/integrations/linkedin/share`

### Soro AI (content webhook)

```env
SORO_WEBHOOK_API_KEY=...
SORO_WEBHOOK_SECRET=...
```

Endpoint: `POST /api/integrations/soro/webhook`

- Weryfikacja: header `X-Api-Key` lub `X-Webhook-Signature` (HMAC-SHA256)
- Tryb **draft-only**: treści trafiają do `content/drafts/` — nigdy auto-publish
- Payload walidowany Zod (`soroWebhookPayloadSchema`)

### OpenAI Sora (video)

```env
OPENAI_API_KEY=...
SORA_VIDEO_ENABLED=false
SORA_DAILY_LIMIT=10
```

Endpoint: `POST /api/integrations/sora/video-request` — domyślnie **501 Not Implemented**.

## Deployment

### Vercel

```bash
vercel
```

Ustaw zmienne środowiskowe w panelu Vercel. `NEXT_PUBLIC_SITE_URL` = domena produkcyjna.

### Cloudflare Pages

```bash
npm run build
# Output: .next (użyj @cloudflare/next-on-pages lub static export jeśli bez API)
```

Dla API routes wymagany adapter Next.js na Cloudflare.

## Struktura routingu

- `/` — Home
- `/o-nas` — O nas
- `/oferta` — Oferta z filtrami
- `/oferta/pentesty`, `/audyty`, `/soc`, `/ot-ics`, `/dokumentacja-compliance`
- `/case-study`, `/case-study/[slug]`
- `/artykuly`, `/artykuly/[slug]`
- `/kontakt`
- `/polityka-prywatnosci`, `/cookies`
- `/.well-known/security.txt`

## Bezpieczeństwo

Zobacz [SECURITY.md](./SECURITY.md) i [PRIVACY_NOTES.md](./PRIVACY_NOTES.md).

## Rozbudowa treści

- Usługi: `src/data/services.ts`
- Case studies: `src/data/caseStudies.ts`
- Artykuły: `src/data/articles.ts`
- Drafty z Soro: `content/drafts/`
