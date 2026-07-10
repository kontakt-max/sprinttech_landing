# Privacy Notes — SprintTech Website

## Zasady projektowe

1. **Minimalizacja danych** — zbieramy tylko pola niezbędne do kontaktu handlowego
2. **Zgoda przed trackingiem** — analityka, LinkedIn Tag, Google iframe wyłączone domyślnie
3. **Brak localStorage bez zgody** — Consent Manager zapisuje preferencje dopiero po interakcji
4. **Quiz/checklisty lokalne** — Regulation Readiness Checker i Documentation Gap Analyzer nie wysyłają wyników na serwer
5. **Logi serwera** — bez e-maili, imion i treści wiadomości w logach integracji

## Przepływ danych formularza

```
Użytkownik → LeadForm (walidacja Zod) → POST /api/lead
  → rate limit → honeypot → walidacja serwer → sanitize
  → Google Sheets (jeśli skonfigurowane) LUB log bez PII
```

## Cookies i localStorage

| Klucz | Typ | Cel | Zgoda |
|-------|-----|-----|-------|
| `sprinttech-consent` | localStorage | Preferencje cookies | Baner przy pierwszej wizycie |

## Podmioty przetwarzające

- Hosting: Vercel / Cloudflare (logi serwera)
- Google Workspace: Sheets (jeśli włączone) — umowa powierzenia wymagana
- LinkedIn: tylko po zgodzie marketingowej

## Retencja

- Leady w Sheets: max 24 miesiące od ostatniego kontaktu (polityka wewnętrzna)
- Drafty Soro: `content/drafts/` — review i usunięcie po publikacji lub odrzuceniu

## Prawa użytkownika

Realizacja przez: kontakt@sprinttech.pl

- Dostęp, sprostowanie, usunięcie, ograniczenie, przenoszenie, sprzeciw
- Skarga do PUODO

## DPIA

Dla organizacji klienta — formularz zbiera dane przedstawicieli biznesowych.
Administrator: SprintTech Sp. z o.o. Rekomendacja: aktualizacja rejestru czynności przetwarzania.
