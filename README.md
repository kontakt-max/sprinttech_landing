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

## Uruchomienie w Cursor

```bash
nvm use            # Node 20 LTS (patrz .nvmrc; Node 20–22 jest wspierany)
npm ci
cp .env.example .env.local
npm run dev:cursor
```

- **Preview URL:** http://localhost:3000
- **Health URL:** http://localhost:3000/api/health

`npm run dev:cursor` uruchamia serwer na `0.0.0.0:3000`, dzięki czemu podgląd działa
w Cursor. Uwagi:

- Aplikacja działa **bez sekretów** — nic nie trzeba uzupełniać, aby uruchomić podgląd.
- Wszystkie integracje (Threat Pulse, Google Sheets/Forms, SORO AI SEO, LinkedIn Insight,
  Shadowserver) są **domyślnie wyłączone**.
- Brak `NVD_API_KEY`, kluczy Google czy SORO **nie blokuje** buildu ani renderowania strony —
  integracje po prostu pozostają wyłączone, a UI korzysta z fallbacków.
- Po zmianie `.env.local` **zrestartuj** serwer developerski (zmienne są wczytywane przy starcie).

## Konfiguracja zmiennych środowiskowych

Pełny, opisany szablon znajduje się w [`.env.example`](./.env.example) (podzielony na sekcje:
Site, Threat Intelligence, Google, LinkedIn, Soro, Sora, Rate limiting, Analytics, Security,
Feature flags). Walidacja i typy zmiennych są scentralizowane:

- `src/lib/env.ts` — zmienne **publiczne** (`NEXT_PUBLIC_*`), bezpieczne dla przeglądarki.
- `src/lib/env.server.ts` — zmienne **server-side** (sekrety); plik ma `import "server-only"`,
  więc jego zaimportowanie z komponentu `"use client"` przerywa build.

Obie warstwy używają **Zod** — aplikacja zgłasza czytelny błąd przy nieprawidłowej konfiguracji,
a opcjonalne integracje są bezpiecznie wyłączane, gdy brakuje klucza.

### `.env.local` (development)

```bash
cp .env.example .env.local
```

Aplikacja działa lokalnie **bez żadnych sekretów**. Wystarczą wartości domyślne:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=SprintTech
THREAT_PULSE_ENABLED=true
```

`.env.local` jest w `.gitignore` i **nie może** być commitowany.

### Zmienne wymagane

| Środowisko | Wymagane minimum | Uwaga |
|------------|------------------|-------|
| **Lokalnie** | brak (działają wartości domyślne) | wszystkie integracje opcjonalne |
| **Produkcyjnie** | `NEXT_PUBLIC_SITE_URL` (domena produkcyjna), `NEXT_PUBLIC_SITE_NAME` | reszta zależy od włączonych integracji |

Integracje opcjonalne wymagają sekretów **tylko** gdy są włączone, np. leady w Google Sheets
(`GOOGLE_SERVICE_ACCOUNT_*`, `GOOGLE_SHEETS_SPREADSHEET_ID`) lub Sora (`SORA_VIDEO_ENABLED=true`
**i** `OPENAI_API_KEY`). Bez kluczy dana integracja jest po prostu wyłączona.

### Vercel

1. Projekt → **Settings → Environment Variables**.
2. Dodaj zmienne dla `Production` / `Preview` / `Development`.
3. Ustaw `NEXT_PUBLIC_SITE_URL` na domenę produkcyjną.
4. Sekrety (`OPENAI_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, tokeny LinkedIn, klucze Soro)
   dodawaj wyłącznie jako zmienne **bez** prefiksu `NEXT_PUBLIC_`.
5. Redeploy po zmianach (zmienne są wstrzykiwane w czasie build/runtime).

### Cloudflare Pages

1. **Settings → Environment variables**.
2. Zmienne publiczne (`NEXT_PUBLIC_*`) → zwykłe **Plaintext** variables.
3. Sekrety server-side → oznacz jako **Secret** (encrypted) — nie trafią do bundla klienta.
4. Dla API routes wymagany adapter (`@cloudflare/next-on-pages`).

### Dlaczego `NEXT_PUBLIC_*` nie może zawierać sekretów

Next.js **statycznie wstawia** (inline) każdą zmienną `NEXT_PUBLIC_*` do JavaScriptu wysyłanego
do przeglądarki. Taka wartość jest widoczna dla każdego użytkownika w źródle strony. Dlatego:

- `NEXT_PUBLIC_*` = tylko dane jawne (URL-e, nazwy, flagi funkcji).
- Sekrety (klucze API, tokeny, klucze prywatne) trzymamy **bez** prefiksu i czytamy je wyłącznie
  przez `src/lib/env.server.ts` (server-side). Guard `server-only` uniemożliwia ich przypadkowe
  zbundlowanie po stronie klienta.

## Skrypty

| Skrypt | Opis |
|--------|------|
| `npm run dev` | Serwer deweloperski |
| `npm run build` | Build produkcyjny |
| `npm run start` | Serwer produkcyjny |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

## Threat Pulse (publiczne źródła)

Endpoint: `GET /api/threat-pulse` — agreguje legalne publiczne dane:

| Źródło | Typ | Opis |
|--------|-----|------|
| NVD (NIST) | API | CVE critical/high z ostatnich 7 dni |
| FIRST EPSS | API | Prawdopodobieństwo eksploatacji |
| MITRE ATT&CK | Statyczny subset | Wizualizacja procesu SOC |
| ENISA TL 2025 | Statyczne | Kuratorowane statystyki z raportu |
| Verizon DBIR 2026 | Statyczne | Kuratorowane statystyki z raportu |
| Shadowserver | **Wyłączony** | Tylko link — brak scrapingu |

- Cache serwerowy: domyślnie 6h (`THREAT_PULSE_CACHE_TTL_HOURS`)
- Rate limiting na endpoint
- Fallback UI gdy API niedostępne
- **Nie jest to telemetria klientów SprintTech**

### Edycja treści hero

- Copy hero: `src/data/home.ts`
- Scenariusze interaktywne: `src/data/heroScenarios.ts`
- Źródła danych: `src/data/threatSources.ts`
- Statystyki raportów: `src/data/reportStats.ts`

## Threat Pulse (publiczne źródła) — konfiguracja

```env
THREAT_PULSE_ENABLED=true
THREAT_PULSE_CACHE_TTL_HOURS=6
THREAT_PULSE_REQUEST_TIMEOUT_MS=5000   # timeout żądań do źródeł (ms)
THREAT_PULSE_MAX_CVES=20               # maksymalna liczba pobieranych CVE
NVD_API_KEY=                           # opcjonalny, zwiększa rate limit NVD
SHADOWSERVER_INTEGRATION_ENABLED=false
SHADOWSERVER_API_KEY=                  # opcjonalny, wymagany przy integracji
PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED=true
```


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
