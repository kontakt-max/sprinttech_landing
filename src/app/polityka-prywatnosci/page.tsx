import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Polityka prywatności",
  description: "Polityka prywatności SprintTech — informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
  path: "/polityka-prywatnosci",
});

export default function PrivacyPage() {
  return (
    <section className="section-padding pt-28">
      <div className="container-wide max-w-3xl prose prose-invert">
        <h1 className="heading-display text-3xl">Polityka prywatności</h1>
        <p className="text-white/70">Ostatnia aktualizacja: 10 lipca 2025</p>

        <h2 className="mt-8 text-xl font-semibold">1. Administrator danych</h2>
        <p className="text-white/70">
          Administratorem danych osobowych jest SprintTech Sp. z o.o., część grupy Sprint SA.
          Kontakt: kontakt@sprinttech.pl
        </p>

        <h2 className="mt-8 text-xl font-semibold">2. Zakres przetwarzania</h2>
        <p className="text-white/70">
          Przetwarzamy dane podane w formularzach kontaktowych: imię i nazwisko, firma, e-mail służbowy,
          telefon (opcjonalnie), branża, opis potrzeby. Podstawa prawna: zgoda (art. 6 ust. 1 lit. a RODO)
          oraz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO) w przypadku odpowiedzi na zapytanie.
        </p>

        <h2 className="mt-8 text-xl font-semibold">3. Okres przechowywania</h2>
        <p className="text-white/70">
          Dane przechowujemy przez okres niezbędny do obsługi zapytania i przez maksymalnie 24 miesiące
          od ostatniego kontaktu, chyba że przepisy wymagają dłuższego okresu.
        </p>

        <h2 className="mt-8 text-xl font-semibold">4. Odbiorcy danych</h2>
        <p className="text-white/70">
          Dane mogą być przekazywane dostawcom usług hostingowych (Vercel/Cloudflare), Google Workspace
          (jeśli skonfigurowano integrację Sheets) — wyłącznie na podstawie umów powierzenia.
          Nie sprzedajemy danych osobom trzecim.
        </p>

        <h2 className="mt-8 text-xl font-semibold">5. Prawa osób</h2>
        <p className="text-white/70">
          Przysługuje Ci prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania,
          przenoszenia danych, sprzeciwu oraz skargi do PUODO.
        </p>

        <h2 className="mt-8 text-xl font-semibold">6. Cookies i technologie śledzące</h2>
        <p className="text-white/70">
          Szczegóły w <a href="/cookies" className="text-cyber-cyan hover:underline">Polityce cookies</a>.
          LinkedIn Insight Tag i Google Forms embed są wyłączone domyślnie i wymagają zgody.
        </p>
      </div>
    </section>
  );
}
