# Security Policy — SprintTech Website

## Zgłaszanie podatności

Zgłoszenia: **kontakt@sprinttech.pl** (temat: Security Disclosure)

Cel odpowiedzi: 5 dni roboczych.

## Security Checklist (implementacja)

### Aplikacja

- [x] Strict TypeScript
- [x] ESLint (next/core-web-vitals)
- [x] Walidacja Zod na formularzach i API
- [x] Rate limiting (in-memory; produkcja: Redis/Upstash)
- [x] Honeypot w formularzach
- [x] Sanityzacja tekstu (brak HTML injection)
- [x] Brak sekretów w kodzie klienta
- [x] `.env.example` bez realnych kluczy
- [x] Logowanie bez PII (integracje)
- [x] Privacy by design — Consent Manager

### Nagłówki HTTP

- [x] Content-Security-Policy
- [x] X-Frame-Options / frame-ancestors
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy
- [x] HSTS (produkcja)
- [x] `poweredByHeader: false`

### Formularze

- [x] Walidacja klient + serwer
- [x] Rate limit per IP
- [x] Honeypot field
- [x] Wymóg służbowego e-mail (bez domen prywatnych)
- [x] Zgody RODO jako literal `true`

### Integracje zewnętrzne

- [x] Google Forms iframe — tylko po zgodzie + CSP frame-src
- [x] LinkedIn Insight Tag — wyłączony domyślnie
- [x] Soro webhook — API key / HMAC, draft-only
- [x] Sora video — 501 domyślnie
- [x] LinkedIn API — placeholder, brak auto-publish

### Treść

- [x] Brak `dangerouslySetInnerHTML` (wyjątek: JSON-LD w layout)
- [x] Brak scrapingu LinkedIn
- [x] security.txt w `public/.well-known/`

## Zalecenia produkcyjne

1. **Rate limiting**: zamień in-memory store na Redis/Upstash dla środowisk serverless multi-instance
2. **CSP**: rozważ nonce dla skryptów zamiast `unsafe-inline`
3. **Monitoring**: Sentry/LogDrain bez PII
4. **WAF**: Cloudflare/Vercel Firewall przed API routes
5. **Rotacja kluczy**: Google SA, Soro, LinkedIn — cykliczna rotacja
6. **Backup**: arkusz Google Sheets + eksport okresowy

## Known Limitations

- Rate limiter in-memory nie współdzieli stanu między instancjami serverless
- Qualification form mapuje `companySize` na domyślną wartość — uzupełniane na konsultacji
- Artykuły: pełna treść MDX — do rozbudowy (obecnie excerpt + placeholder)
