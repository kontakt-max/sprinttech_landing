"use client";

import { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { EditableHomeSection } from "@/components/home/EditableHomeSection";
import { ServicePathCards } from "@/components/home/ServicePathCards";
import { HomeOfferPreview } from "@/components/home/HomeOfferPreview";
import { PublicIntelTicker } from "@/components/home/PublicIntelTicker";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { LeadForm } from "@/components/LeadForm";
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import {
  securityPathSection,
  publicThreatPulseSection,
  signalToActionSection,
  offerPreviewSection,
  whySection,
  caseStudySection,
  leadMagnetSection,
  finalCtaSection,
} from "@/data/home";
import { whySprintTech } from "@/data/company";
import { getFeaturedCaseStudies } from "@/data/caseStudies";
import type { HeroScenarioId } from "@/data/heroScenarios";
import { Users, RefreshCw, Shield, BarChart3, Target } from "lucide-react";

const ThreatPulseHero = dynamic(
  () => import("@/components/home/ThreatPulseHero").then((m) => m.ThreatPulseHero),
  { loading: () => <div className="min-h-[92vh] animate-pulse bg-navy-900" /> }
);

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  cycle: <RefreshCw className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  chart: <BarChart3 className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
};

export function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredCases = getFeaturedCaseStudies();

  const handleScenarioFromPath = useCallback((id: HeroScenarioId) => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("sprinttech:scenario", { detail: id }));
  }, []);

  return (
    <>
      <div ref={heroRef}>
        <ThreatPulseHero />
      </div>

      <EditableHomeSection
        id={securityPathSection.id}
        title={securityPathSection.title}
        subtitle={securityPathSection.subtitle}
      >
        <ServicePathCards onScenarioSelect={handleScenarioFromPath} />
      </EditableHomeSection>

      <EditableHomeSection
        id={publicThreatPulseSection.id}
        title={publicThreatPulseSection.title}
        subtitle={publicThreatPulseSection.subtitle}
        dark
      >
        <PublicIntelTicker showSources />
        <p className="mt-6 text-xs text-white/40">{publicThreatPulseSection.disclaimer}</p>
      </EditableHomeSection>

      <EditableHomeSection
        id={signalToActionSection.id}
        title={signalToActionSection.title}
        subtitle={signalToActionSection.subtitle}
      >
        <div className="grid gap-4 md:grid-cols-5">
          {signalToActionSection.steps.map((step, i) => (
            <div key={step.step} className="command-panel relative p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyber-cyan/10 text-sm font-bold text-cyber-cyan">
                {step.step}
              </div>
              <h3 className="mt-3 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.description}</p>
              {i < signalToActionSection.steps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyber-cyan/30 md:block" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </EditableHomeSection>

      <EditableHomeSection
        title={offerPreviewSection.title}
        subtitle={offerPreviewSection.subtitle}
        dark
      >
        <HomeOfferPreview />
      </EditableHomeSection>

      <EditableHomeSection title={whySection.title} subtitle={whySection.subtitle}>
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whySprintTech.map((item) => (
            <StaggerItem key={item.title}>
              <div className="command-panel-hover h-full p-6">
                <div className="text-cyber-cyan">{iconMap[item.icon]}</div>
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </EditableHomeSection>

      <EditableHomeSection
        title={caseStudySection.title}
        subtitle={caseStudySection.subtitle}
        dark
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

      <EditableHomeSection title={leadMagnetSection.title} subtitle={leadMagnetSection.subtitle}>
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
