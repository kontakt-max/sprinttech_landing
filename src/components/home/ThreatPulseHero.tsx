"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";
import { homeHero } from "@/data/home";
import { heroScenarios, defaultScenarioId, type HeroScenarioId } from "@/data/heroScenarios";
import { SecurityBadges } from "@/components/SecurityBadges";
import { MetricStrip } from "./MetricStrip";

const ThreatCommandCenter = dynamic(
  () => import("./ThreatCommandCenter").then((m) => m.ThreatCommandCenter),
  {
    loading: () => (
      <div className="command-panel h-[480px] animate-pulse bg-white/5" aria-hidden />
    ),
    ssr: false,
  }
);

export function ThreatPulseHero() {
  const [activeScenario, setActiveScenario] = useState<HeroScenarioId>(defaultScenarioId);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<HeroScenarioId>).detail;
      if (id) setActiveScenario(id);
    };
    window.addEventListener("sprinttech:scenario", handler);
    return () => window.removeEventListener("sprinttech:scenario", handler);
  }, []);

  const scrollToThreatPulse = useCallback(() => {
    document.getElementById("public-threat-pulse")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24">
      <div className="premium-grid-bg absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-cyber-blue/8 via-navy-950/50 to-navy-950"
        aria-hidden
      />

      <div className="container-wide relative section-padding pb-8">
        <div className="grid items-start gap-10 xl:grid-cols-2 xl:gap-12">
          {/* Left column — message & CTA */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-1.5 text-xs font-medium text-cyber-cyan sm:text-sm">
              {homeHero.badge}
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              {homeHero.h1}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {homeHero.subcopy}
            </p>

            <div className="mt-4 space-y-2">
              {homeHero.microcopy.map((line) => (
                <p key={line} className="text-sm text-white/50 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={homeHero.ctaPrimary.href} className="btn-primary">
                {homeHero.ctaPrimary.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
              <Link href={homeHero.ctaSecondary.href} className="btn-secondary">
                {homeHero.ctaSecondary.label}
              </Link>
            </div>

            <button
              type="button"
              onClick={scrollToThreatPulse}
              className="mt-4 inline-flex items-center gap-1 text-sm text-cyber-cyan hover:underline"
            >
              {homeHero.ctaTertiary.label}
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>

            <div className="mt-8">
              <SecurityBadges compact />
            </div>
          </div>

          {/* Right column — command center */}
          <div className="min-h-[480px]">
            <ThreatCommandCenter
              scenarios={heroScenarios}
              activeScenarioId={activeScenario}
              onScenarioChange={setActiveScenario}
            />
          </div>
        </div>
      </div>

      <MetricStrip />
    </section>
  );
}
