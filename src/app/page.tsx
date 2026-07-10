import Link from "next/link";
import dynamic from "next/dynamic";
import { HeroCyber } from "@/components/HeroCyber";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { ServiceCard } from "@/components/ServiceCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { LeadForm } from "@/components/LeadForm";
import { whySprintTech, cooperationProcess } from "@/data/company";
import { services } from "@/data/services";
import { getFeaturedCaseStudies } from "@/data/caseStudies";
import { Users, RefreshCw, Shield, BarChart3, Target } from "lucide-react";

const SocRadar = dynamic(() => import("@/components/SocRadar").then((m) => m.SocRadar), {
  loading: () => <div className="glass-panel h-64 animate-pulse" />,
});

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  cycle: <RefreshCw className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  chart: <BarChart3 className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
};

export default function HomePage() {
  const featuredServices = services.slice(0, 8);
  const featuredCases = getFeaturedCaseStudies();

  return (
    <>
      <HeroCyber />

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="heading-section">Dlaczego SprintTech</h2>
            <p className="mt-4 text-white/70">
              Nie jesteśmy agencją od slajdów ani software house&apos;em z modułem security.
              Jesteśmy zespołem inżynierów, audytorów, pentesterów i operatorów SOC,
              który rozumie zarówno wymagania regulacyjne, jak i realia środowisk produkcyjnych IT i OT.
            </p>
          </div>
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whySprintTech.map((item) => (
              <StaggerItem key={item.title}>
                <div className="glass-panel-hover h-full p-6">
                  <div className="text-cyber-cyan">{iconMap[item.icon]}</div>
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <h2 className="heading-section">Oferta w skrócie</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Pełen cykl cyberbezpieczeństwa: od kontrolowanych testów i audytów zgodności,
            przez remediację i dokumentację, po ciągły monitoring SOC i modernizację sieci OT.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                href={service.href}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/oferta" className="btn-secondary">
              Zobacz pełną ofertę
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide">
          <h2 className="heading-section">Proces współpracy</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Przejrzysty proces od pierwszego kontaktu do retestu i monitoringu.
            Każdy etap ma zdefiniowane deliverables i kryteria odbioru.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cooperationProcess.map((step) => (
              <div key={step.step} className="glass-panel p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyber-cyan/10 text-sm font-bold text-cyber-cyan">
                  {step.step}
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <h2 className="heading-section">SOC w działaniu</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Od źródła logów do raportu dla zarządu — zobacz, jak wygląda przepływ
            analizy incydentu w Security Operations Center.
          </p>
          <div className="mt-10">
            <SocRadar />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide">
          <h2 className="heading-section">Case studies</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Anonimowe studia przypadków z sektora publicznego, przemysłu i finansów.
            Konkretne wyzwania, działania i mierzalne rezultaty.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredCases.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/case-study" className="btn-secondary">
              Wszystkie case studies
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="heading-section">Sprawdź gotowość organizacji na NIS2/DORA</h2>
              <p className="mt-4 text-white/70">
                Krótki formularz kwalifikacyjny — skontaktujemy się z propozycją audytu
                lub konsultacji dopasowanej do Twojej regulacji i branży.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li>✓ Bezpłatna wstępna konsultacja (30 min)</li>
                <li>✓ Propozycja zakresu audytu lub testów</li>
                <li>✓ Szacunkowy harmonogram i deliverables</li>
              </ul>
            </div>
            <LeadForm variant="qualification" source="home-lead-magnet" />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-gradient-to-b from-cyber-blue/5 to-transparent">
        <div className="container-wide text-center">
          <h2 className="heading-section">Gotowy na rozmowę o cyberodporności?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Umów bezpłatną konsultację z naszym ekspertem. Omówimy zakres, harmonogram
            i dopasujemy usługę do Twojego środowiska i wymagań regulacyjnych.
          </p>
          <Link href="/kontakt" className="btn-primary mt-8 inline-flex">
            Umów konsultację
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
