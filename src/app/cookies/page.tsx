import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Polityka cookies",
  description: "Informacje o plikach cookies używanych na stronie sprinttech.pl.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <section className="section-padding pt-28">
      <div className="container-wide max-w-3xl prose prose-invert">
        <h1 className="heading-display text-3xl">Polityka cookies</h1>

        <h2 className="mt-8 text-xl font-semibold">Niezbędne</h2>
        <p className="text-white/70">
          Wymagane do działania strony i zapamiętania preferencji zgód (localStorage: sprinttech-consent).
        </p>

        <h2 className="mt-8 text-xl font-semibold">Analityka</h2>
        <p className="text-white/70">
          Wyłączona domyślnie. Aktywowana tylko po wyrażeniu zgody w banerze cookies
          i ustawieniu NEXT_PUBLIC_ANALYTICS_ENABLED=true.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Marketing (LinkedIn Insight Tag)</h2>
        <p className="text-white/70">
          Wyłączony domyślnie. Wymaga zgody marketingowej oraz NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED=true.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Treści zewnętrzne (Google Forms)</h2>
        <p className="text-white/70">
          Iframe Google Forms ładuje się wyłącznie po zgodzie na treści zewnętrzne.
          Alternatywnie użyj natywnego formularza na stronie.
        </p>
      </div>
    </section>
  );
}
