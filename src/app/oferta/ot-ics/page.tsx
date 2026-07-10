import { createPageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { AnimatedSection } from "@/components/AnimatedSection";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const OtNetworkMap = dynamic(
  () => import("@/components/OtNetworkMap").then((m) => m.OtNetworkMap),
  { loading: () => <div className="glass-panel h-96 animate-pulse" /> }
);

export const metadata = createPageMetadata({
  title: "Bezpieczeństwo OT/ICS i modernizacja sieci",
  description:
    "Segmentacja IT/OT, strefy IEC 62443, zdalny dostęp, monitoring pasywny, hardening i backup PLC. Modernizacja bez przestoju produkcji.",
  path: "/oferta/ot-ics",
});

const services = [
  "Segmentacja IT/OT i strefy wg ISA/IEC 62443",
  "Konduity i firewalle przemysłowe",
  "Bezpieczny zdalny dostęp inżynierski (jump host, MFA, JIT)",
  "Pasywna inwentaryzacja aktywów OT",
  "Monitoring anomalii w sieci przemysłowej",
  "Hardening stacji inżynierskich i HMI",
  "Backup konfiguracji PLC i procedury rollback",
  "Kontrola kont uprzywilejowanych",
  "Procedury reakcji bez zatrzymywania produkcji",
  "Pentesty OT/ICS (safety-first)",
];

export default function OtIcsPage() {
  const jsonLd = [
    serviceJsonLd("OT/ICS Security", "Modernizacja i bezpieczeństwo sieci przemysłowych", "/oferta/ot-ics"),
    breadcrumbJsonLd([
      { name: "Strona główna", path: "/" },
      { name: "Oferta", path: "/oferta" },
      { name: "OT/ICS", path: "/oferta/ot-ics" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">OT / ICS — bezpieczeństwo przemysłowe</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Modernizacja sieci OT, segmentacja IT/OT, zgodność z ISA/IEC 62443 i kontrolowane testy
            bezpieczeństwa środowisk przemysłowych. Dla zakładów produkcyjnych, operatorów
            infrastruktury krytycznej i organizacji łączących legacy OT z nowoczesnym IT.
          </p>
          <p className="mt-4 max-w-3xl text-white/60">
            Rozumiemy, że w OT priorytetem jest ciągłość produkcji i bezpieczeństwo operacyjne (safety).
            Wszystkie działania planujemy fazowo, w oknach serwisowych, z pełną dokumentacją
            i procedurami rollback. Nie przeprowadzamy destrukcyjnych testów bez pisemnego zakresu.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <h2 className="heading-section mb-8">Mapa zakładu — segmenty i ryzyka</h2>
          <OtNetworkMap />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide">
          <h2 className="heading-section">Zakres usług OT/ICS</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-cyber-green shrink-0" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-cyber-cyan">Standard ISA/IEC 62443</h3>
            <p className="mt-3 text-sm text-white/70">
              Projektujemy architekturę stref i konduits zgodnie z IEC 62443-3-2. Definiujemy
              wymagania bezpieczeństwa dla każdej strefy (SL-T), dobieramy środki ochrony
              i dokumentujemy decyzje dla audytu i certyfikacji.
            </p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-cyber-cyan">Safety-first</h3>
            <p className="mt-3 text-sm text-white/70">
              Pentesty OT prowadzimy z zasadą safety-first: pasywne rozpoznanie, aktywne testy
              tylko w uzgodnionym zakresie i oknach serwisowych, stały kontakt z zespołem utrzymania
              i procedura natychmiastowego przerwania testów.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide text-center">
          <Link href="/kontakt" className="btn-primary inline-flex">Umów audyt OT</Link>
        </div>
      </AnimatedSection>
    </>
  );
}
