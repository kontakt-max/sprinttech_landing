import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { AnimatedSection } from "@/components/AnimatedSection";
import { OfferFilters } from "@/components/OfferFilters";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Oferta",
  description:
    "Pełna oferta SprintTech: pentesty, audyty NIS2/DORA/KSC, SOC 24/7, bezpieczeństwo OT/ICS, dostosowanie dokumentacji SZBI i program oceny dojrzałości.",
  path: "/oferta",
  keywords: ["oferta cyberbezpieczeństwo", "usługi security"],
});

export default function OfferPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "Oferta", path: "/oferta" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Oferta cyberbezpieczeństwa</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Kompleksowe usługi od kontrolowanych testów penetracyjnych i audytów zgodności,
            przez monitoring SOC i modernizację sieci OT, po dostosowanie dokumentacji SZBI.
            Filtruj według potrzeby lub środowiska technicznego.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <OfferFilters />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide">
          <h2 className="heading-section">Główne obszary usług</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Pentesty", href: "/oferta/pentesty", desc: "Web, mobile, infra, cloud, OT, kontenery" },
              { title: "Audyty", href: "/oferta/audyty", desc: "NIS2, DORA, KSC, ISO 27001, security audit" },
              { title: "SOC", href: "/oferta/soc", desc: "Monitoring 24/7, detekcja, IR" },
              { title: "OT/ICS", href: "/oferta/ot-ics", desc: "Segmentacja, IEC 62443, modernizacja" },
              { title: "Dokumentacja", href: "/oferta/dokumentacja-compliance", desc: "SZBI, rejestry, plany ciągłości" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-panel-hover block p-6">
                <h3 className="font-semibold text-cyber-cyan">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
