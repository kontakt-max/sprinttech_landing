import { createPageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceDetailCard } from "@/components/ServiceCard";
import dynamic from "next/dynamic";
import Link from "next/link";

const RegulationReadinessChecker = dynamic(
  () => import("@/components/RegulationReadinessChecker").then((m) => m.RegulationReadinessChecker),
  { loading: () => <div className="glass-panel h-64 animate-pulse" /> }
);

export const metadata = createPageMetadata({
  title: "Audyty bezpieczeństwa i zgodności",
  description:
    "Audyty NIS2, DORA, KSC, ISO 27001 i bezpieczeństwa IT. Gap analysis, roadmapa remediacji, dokumentacja i przygotowanie do audytu nadzorczego.",
  path: "/oferta/audyty",
});

const auditSections = [
  {
    id: "security",
    title: "Audyt bezpieczeństwa IT",
    problem:
      "Organizacje potrzebują obiektywnej oceny stanu bezpieczeństwa — zarówno organizacyjnego (polityki, procesy), jak i technicznego (konfiguracje, kontrole).",
    scope: [
      "Governance i struktura odpowiedzialności",
      "Zarządzanie tożsamością i dostępem (IAM)",
      "Ochrona danych, szyfrowanie, DLP",
      "Backup i odtwarzanie",
      "Monitoring, logowanie, SIEM",
      "Zarządzanie podatnościami i patch management",
    ],
    deliverables: [
      "Raport audytowy z oceną dojrzałości",
      "Rejestr ustaleń P1–P3",
      "Roadmapa rozwoju 12–24 miesięcy",
      "Prezentacja dla zarządu",
    ],
  },
  {
    id: "iso27001",
    title: "Audyt ISO/IEC 27001",
    problem:
      "Certyfikacja ISO 27001 wymaga kompletnego SZBI, rejestru ryzyk, Statement of Applicability i dowodów skuteczności kontroli Annex A.",
    scope: [
      "System Zarządzania Bezpieczeństwem Informacji (SZBI)",
      "Polityki, procedury, instrukcje",
      "Zarządzanie ryzykiem i rejestr ryzyk",
      "Nadzór, przegląd zarządzania, audyt wewnętrzny",
      "Ciągłe doskonalenie (PDCA)",
      "Przygotowanie do audytu certyfikacyjnego",
    ],
    deliverables: [
      "Raport gap analysis ISO 27001:2022",
      "Plan działań przed certyfikacją",
      "Checklist Annex A",
      "Wsparcie mock auditu",
    ],
  },
  {
    id: "ksc",
    title: "Audyt KSC",
    problem:
      "Ustawa o Krajowym Systemie Cyberbezpieczeństwa nakłada obowiązki na operatorów usług kluczowych i podmioty kluczowe w zakresie środków technicznych i organizacyjnych.",
    scope: [
      "Identyfikacja usług kluczowych",
      "Środki bezpieczeństwa — techniczne i organizacyjne",
      "Dokumentacja wymagana przez KSC",
      "Procedury incydentów i raportowanie CSIRT",
      "Audyt dostawców i łańcucha dostaw",
    ],
    deliverables: [
      "Raport audytowy KSC",
      "Rejestr luk i plan naprawczy",
      "Dokumentacja dla audytu nadzorczego",
      "Wsparcie w komunikacji z CSIRT",
    ],
  },
  {
    id: "nis2",
    title: "Audyt NIS2",
    problem:
      "Dyrektywa NIS2 rozszerza krąg podmiotów i wprowadza osobistą odpowiedzialność kadry zarządzającej za cyberbezpieczeństwo.",
    scope: [
      "Governance i accountability zarządu",
      "Risk management i analiza ryzyka cybernetycznego",
      "Incident handling — detekcja, reagowanie, raportowanie",
      "Supply chain security — dostawcy ICT",
      "Business continuity i zarządzanie kryzysowe",
      "Szkolenia i świadomość kadry zarządzającej",
    ],
    deliverables: [
      "Mapa luk NIS2 z priorytetami",
      "Plan remediacji z harmonogramem",
      "Materiały szkoleniowe dla zarządu",
      "Checklist gotowości regulacyjnej",
    ],
  },
  {
    id: "dora",
    title: "Audyt DORA",
    problem:
      "Digital Operational Resilience Act reguluje sektor finansowy UE — ICT risk management, incident reporting, resilience testing i third-party risk.",
    scope: [
      "ICT risk management framework",
      "ICT-related incident management i raportowanie",
      "Digital operational resilience testing (w tym TLPT)",
      "Third-party ICT risk management",
      "Dokumentacja i dowody zgodności dla EBA",
      "Informacje i komunikacja dla organów nadzoru",
    ],
    deliverables: [
      "Mapa zgodności DORA",
      "Rejestr luk z priorytetami",
      "Plan przygotowania do resilience testing",
      "Executive summary dla zarządu i nadzoru",
    ],
  },
  {
    id: "medical",
    title: "Audyty dla placówek medycznych i projektów formalnych",
    problem:
      "Placówki medyczne i projekty finansowane ze środków publicznych wymagają zgodności z przepisami o ochronie danych medycznych i wymogami formalnymi projektów cyberbezpieczeństwa.",
    scope: [
      "Zgodność z przepisami o ochronie danych medycznych",
      "Bezpieczeństwo infrastruktury IT/OT placówki",
      "Dokumentacja wymagana projektem",
      "Przygotowanie do audytu finansującego",
      "Ocena systemów EHR i integracji",
    ],
    deliverables: [
      "Raport audytowy z rejestrem luk",
      "Dokumentacja projektowa",
      "Plan naprawczy",
      "Wsparcie w audycie formalnym",
    ],
  },
];

export default function AudytyPage() {
  const jsonLd = [
    serviceJsonLd("Audyty bezpieczeństwa", "Audyty NIS2, DORA, KSC, ISO 27001", "/oferta/audyty"),
    breadcrumbJsonLd([
      { name: "Strona główna", path: "/" },
      { name: "Oferta", path: "/oferta" },
      { name: "Audyty", path: "/oferta/audyty" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Audyty bezpieczeństwa i zgodności</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Obiektywna ocena stanu cyberbezpieczeństwa i zgodności z NIS2, DORA, KSC, ISO 27001
            oraz wymaganiami sektorowymi. Gap analysis, roadmapa remediacji i przygotowanie dowodów
            dla audytu nadzorczego lub certyfikacyjnego.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-wide space-y-12">
          {auditSections.map((s) => (
            <div key={s.id} id={s.id}>
              <ServiceDetailCard {...s} />
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide max-w-2xl mx-auto">
          <h2 className="heading-section text-center mb-8">Regulation Readiness Checker</h2>
          <RegulationReadinessChecker />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide text-center">
          <Link href="/kontakt" className="btn-primary inline-flex">Umów audyt wstępny</Link>
        </div>
      </AnimatedSection>
    </>
  );
}
