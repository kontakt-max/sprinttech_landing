import { createPageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { AnimatedSection } from "@/components/AnimatedSection";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const SocRadar = dynamic(() => import("@/components/SocRadar").then((m) => m.SocRadar), {
  loading: () => <div className="glass-panel h-64 animate-pulse" />,
});

export const metadata = createPageMetadata({
  title: "SOC — Security Operations Center",
  description:
    "Monitoring bezpieczeństwa 24/7, detekcja incydentów, triage, eskalacja i wsparcie IR. Integracje SIEM, EDR, NDR, Firewall, Cloud.",
  path: "/oferta/soc",
});

const useCases = [
  "Malware i ransomware",
  "Phishing i business email compromise",
  "Brute force i credential stuffing",
  "Anomalie logowania i impossible travel",
  "Lateral movement w sieci",
  "Exfiltracja danych",
  "Alerty cloud (AWS, Azure, M365)",
  "Alerty endpoint (EDR/XDR)",
];

const integrations = [
  "SIEM (Splunk, QRadar, Sentinel, Elastic)",
  "EDR/XDR (CrowdStrike, Defender, SentinelOne)",
  "NDR i IDS/IPS",
  "Firewall i proxy",
  "VPN i ZTNA",
  "Cloud (AWS CloudTrail, Azure AD, GCP)",
];

export default function SocPage() {
  const jsonLd = [
    serviceJsonLd("SOC 24/7", "Security Operations Center — monitoring i reagowanie", "/oferta/soc"),
    breadcrumbJsonLd([
      { name: "Strona główna", path: "/" },
      { name: "Oferta", path: "/oferta" },
      { name: "SOC", path: "/oferta/soc" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Security Operations Center</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Ciągły monitoring bezpieczeństwa, detekcja incydentów, analiza, triage i eskalacja.
            SOC SprintTech to zespół operatorów pracujących 24/7 z playbookami, SLA i raportami
            okresowymi dla zarządu i zespołów technicznych.
          </p>
          <p className="mt-4 max-w-3xl text-white/60">
            Integrujemy się z istniejącą infrastrukturą SIEM, EDR, NDR i chmurą — nie wymuszamy
            wymiany narzędzi. Budujemy use case&apos;y detekcji zmapowane do MITRE ATT&CK,
            kalibrujemy progi i redukujemy false positive, aby Twój zespół otrzymywał istotne alerty.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <SocRadar />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-section">Use case&apos;y detekcji</h2>
            <ul className="mt-6 space-y-2">
              {useCases.map((uc) => (
                <li key={uc} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-cyber-green shrink-0" aria-hidden />
                  {uc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="heading-section">Integracje</h2>
            <ul className="mt-6 space-y-2">
              {integrations.map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-cyber-cyan shrink-0" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <h2 className="heading-section">Playbooki, SLA i raporty</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Playbooki IR",
                text: "Standaryzowane procedury reagowania na malware, phishing, lateral movement i incydenty cloud. Eskalacja według uzgodnionego SLA.",
              },
              {
                title: "SLA i eskalacja",
                text: "Zdefiniowane czasy reakcji (P1: <15 min), ścieżki eskalacji do CISO i zarządu, integracja z ITSM.",
              },
              {
                title: "Raporty okresowe",
                text: "Miesięczne raporty: liczba incydentów, MTTD, MTTC, top wektory ataku, rekomendacje usprawnień detekcji.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-panel p-6">
                <h3 className="font-semibold text-cyber-cyan">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide text-center">
          <h2 className="heading-section">Rozpocznij monitoring SOC</h2>
          <Link href="/kontakt" className="btn-primary mt-6 inline-flex">Umów konsultację SOC</Link>
        </div>
      </AnimatedSection>
    </>
  );
}
