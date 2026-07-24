"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EditableHomeSection } from "@/components/home/EditableHomeSection";
import { ChooseSecurityPath } from "@/components/home/ChooseSecurityPath";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { LeadForm } from "@/components/LeadForm";
import { CyberResilienceHero } from "@/components/home/hero/CyberResilienceHero";
import {
  securityPathSection,
  publicThreatPulseSection,
  signalToActionSection,
  offerPreviewSection,
  caseStudySection,
  leadMagnetSection,
  finalCtaSection,
} from "@/data/home";
import { getFeaturedCaseStudies } from "@/data/caseStudies";
import type { HeroScenarioId } from "@/data/heroScenarios";

const SignalToActionFlow = dynamic(
  () => import("@/components/home/SignalToActionFlow").then((m) => m.SignalToActionFlow),
  { loading: () => <div className="h-64 animate-pulse rounded-xl bg-white/5" /> }
);

const PublicThreatPulseSection = dynamic(
  () => import("@/components/home/PublicThreatPulseSection").then((m) => m.PublicThreatPulseSection),
  { loading: () => <div className="h-64 animate-pulse rounded-xl bg-white/5" /> }
);

const HomeServiceExplorer = dynamic(
  () => import("@/components/home/HomeServiceExplorer").then((m) => m.HomeServiceExplorer),
  { loading: () => <div className="h-48 animate-pulse rounded-xl bg-white/5" /> }
);

export function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scenarioId, setScenarioId] = useState<HeroScenarioId | null>(null);
  const featuredCases = getFeaturedCaseStudies();

  const handleScenarioFromPath = useCallback((id: HeroScenarioId) => {
    setScenarioId(id);
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("sprinttech:scenario", { detail: id }));
  }, []);

  return (
    <>
      <div ref={heroRef}>
        <CyberResilienceHero externalScenarioId={scenarioId} />
      </div>

      <EditableHomeSection
        id={securityPathSection.id}
        title={securityPathSection.title}
        subtitle={securityPathSection.subtitle}
        className="section-flow-connector"
      >
        <ChooseSecurityPath onScenarioSelect={handleScenarioFromPath} />
      </EditableHomeSection>

      <EditableHomeSection
        id={publicThreatPulseSection.id}
        title={publicThreatPulseSection.title}
        subtitle={publicThreatPulseSection.subtitle}
        dark
      >
        <PublicThreatPulseSection />
      </EditableHomeSection>

      <EditableHomeSection
        id={signalToActionSection.id}
        title={signalToActionSection.title}
        subtitle={signalToActionSection.subtitle}
      >
        <SignalToActionFlow />
      </EditableHomeSection>

      <EditableHomeSection
        title={offerPreviewSection.title}
        subtitle={offerPreviewSection.subtitle}
        dark
      >
        <HomeServiceExplorer />
      </EditableHomeSection>

      <EditableHomeSection
        title={caseStudySection.title}
        subtitle={caseStudySection.subtitle}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCases.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={caseStudySection.cta.href} className="btn-secondary">
            {caseStudySection.cta.label}
          </Link>
        </div>
      </EditableHomeSection>

      <EditableHomeSection title={leadMagnetSection.title} subtitle={leadMagnetSection.subtitle} dark>
        <div className="grid gap-12 lg:grid-cols-2">
          <ul className="space-y-2 text-sm text-white/60">
            {leadMagnetSection.bullets.map((b) => (
              <li key={b}>✓ {b}</li>
            ))}
          </ul>
          <LeadForm variant="qualification" source="home-lead-magnet" />
        </div>
      </EditableHomeSection>

      <EditableHomeSection
        title={finalCtaSection.title}
        subtitle={finalCtaSection.subtitle}
        className="bg-gradient-to-b from-cyber-blue/5 to-transparent"
      >
        <div className="text-center">
          <Link href={finalCtaSection.cta.href} className="btn-primary mt-4 inline-flex">
            {finalCtaSection.cta.label}
          </Link>
        </div>
      </EditableHomeSection>
    </>
  );
}
