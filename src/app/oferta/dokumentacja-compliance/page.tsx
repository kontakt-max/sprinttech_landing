import { createPageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { AnimatedSection } from "@/components/AnimatedSection";
import dynamic from "next/dynamic";
import Link from "next/link";

const DocumentationGapAnalyzer = dynamic(
  () => import("@/components/DocumentationGapAnalyzer").then((m) => m.DocumentationGapAnalyzer),
  { loading: () => <div className="glass-panel h-96 animate-pulse" /> }
);

export const metadata = createPageMetadata({
  title: "Dostosowanie dokumentacji i compliance",
  description:
    "Polityki SZBI, procedury incydentów, rejestry ryzyk, plany ciągłości i dokumentacja DORA/NIS2/KSC/ISO 27001.",
  path: "/oferta/dokumentacja-compliance",
});

const documents = [
  { title: "Polityka bezpieczeństwa informacji", desc: "Ramowa polityka zatwierdzona przez zarząd" },
  { title: "Procedura zarządzania incydentami", desc: "Detekcja, eskalacja, raportowanie CSIRT/nadzór" },
  { title: "Procedura zarządzania podatnościami", desc: "Skanowanie, priorytetyzacja, remediacja, retest" },
  { title: "Rejestr aktywów ICT", desc: "Inwentaryzacja z właścicielami i klasyfikacją" },
  { title: "Rejestr ryzyk ICT", desc: "Identyfikacja, analiza, traktowanie, akceptacja" },
  { title: "BIA / analiza wpływu", desc: "Krytyczne procesy, RTO/RPO, zależności" },
  { title: "Plan ciągłości i odtwarzania", desc: "BCP/DRP z procedurami aktywacji" },
  { title: "Procedury backupu", desc: "Harmonogram, szyfrowanie, testy odtwarzania" },
  { title: "Dostęp uprzywilejowany", desc: "PAM, JIT, rejestracja sesji" },
  { title: "Dokumentacja DORA/NIS2/KSC", desc: "Pakiet regulacyjny dopasowany do podmiotu" },
];

export default function DocumentationPage() {
  const jsonLd = [
    serviceJsonLd("Dokumentacja SZBI", "Dostosowanie dokumentacji compliance", "/oferta/dokumentacja-compliance"),
    breadcrumbJsonLd([
      { name: "Strona główna", path: "/" },
      { name: "Oferta", path: "/oferta" },
      { name: "Dokumentacja", path: "/oferta/dokumentacja-compliance" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Dostosowanie dokumentacji / Compliance</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Kompletna dokumentacja SZBI dopasowana do kontekstu organizacji i wymagań DORA, NIS2,
            KSC, ISO 27001. Nie sprzedajemy szablonów — tworzymy dokumenty z warsztatów
            z właścicielami procesów, gotowe do audytu i certyfikacji.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div key={doc.title} className="glass-panel-hover p-5">
              <h3 className="font-semibold text-white">{doc.title}</h3>
              <p className="mt-2 text-sm text-white/60">{doc.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide max-w-3xl mx-auto">
          <DocumentationGapAnalyzer />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide text-center">
          <Link href="/kontakt" className="btn-primary inline-flex">Zamów dostosowanie dokumentacji</Link>
        </div>
      </AnimatedSection>
    </>
  );
}
