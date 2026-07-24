# SprintTech — Cyber Resilience Command Center

Produkcyjna strona WWW dla SprintTech (sprinttech.pl): pentesty, audyty, SOC, OT/ICS, compliance.

Strona główna to interaktywne **Cyber Resilience Command Center** — hero z czterema scenariuszami (podatność, SOC, compliance, OT/ICS), publicznym Threat Pulse z legalnych API oraz ścieżkami do usług.

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
| `npm run dev:cursor` | Serwer dev na `0.0.0.0:3000` (podgląd Cursor) |
| `npm run clean` | Usuwa `.next`, `out`, `coverage` |
| `npm run doctor` | Diagnostyka środowiska |
| `npm run check` | typecheck + lint + build |
| `npm run test:e2e` | Playwright smoke tests |

## Cyber Resilience Command Center

Sekcje strony głównej (`src/app/page.tsx` → `HomePageClient`):

1. **ThreatPulseHero** — interaktywny command center z 4 scenariuszami
2. **Choose your security path** — 5 kart z problemem, ryzykiem i pierwszym krokiem
3. **Public Threat Pulse** — live/fallback/partial z NVD + EPSS
4. **Od sygnału do działania** — 6-etapowy flow (sticky desktop / accordion mobile)
5. **Oferta w skrócie** — HomeServiceExplorer z filtrem scenariusza
6. **Case studies**
7. **Lead magnet NIS2/DORA**
8. **Final CTA**

### Co jest live, a co symulacją

| Typ | Przykład |
|-----|----------|
| **Dane publiczne (live)** | CVE z NVD, EPSS z FIRST, statystyki ENISA/Verizon |
| **Symulacja procesu** | Przebieg SOC, ścieżka compliance, diagram OT/ICS w hero |
| **Hybryda** | Scenariusz podatności — publiczne CVE + symulowany proces SprintTech |

Symulacje są wyraźnie oznaczone w UI (`symulowany przebieg procesu`, `public source`).

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
- Timeout per source: `THREAT_PULSE_REQUEST_TIMEOUT_MS` (domyślnie 5000ms)
- Max CVE w odpowiedzi: `THREAT_PULSE_MAX_CVES` (domyślnie 20)
- Rate limiting na endpoint
- Fallback edukacyjny gdy API niedostępne (status 200, `mode: fallback`)
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
THREAT_PULSE_REQUEST_TIMEOUT_MS=5000
THREAT_PULSE_MAX_CVES=20
NVD_API_KEY=          # opcjonalny, zwiększa rate limit NVD
SHADOWSERVER_INTEGRATION_ENABLED=false
PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED=true
```

### Manual QA checklist (Lighthouse)

- [ ] LCP < 2.5s na deployu produkcyjnym
- [ ] CLS < 0.1
- [ ] Accessibility 95+ (keyboard na scenariuszach i diagramie)
- [ ] Hero nie używa starego HeroCyber
- [ ] `/api/threat-pulse` zwraca `lastUpdated`, `sources`, `mode`
- [ ] Symulacje oznaczone w feedzie hero


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
