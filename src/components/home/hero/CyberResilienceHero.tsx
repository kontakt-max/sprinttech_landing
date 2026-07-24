"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeHero } from "@/data/home";
import { CyberResilienceTwin } from "./CyberResilienceTwin";
import { HeroProofStrip } from "./HeroProofStrip";
import type { HeroScenarioId } from "@/data/heroScenarios";

interface CyberResilienceHeroProps {
  externalScenarioId?: HeroScenarioId | null;
}

export function CyberResilienceHero({ externalScenarioId }: CyberResilienceHeroProps) {
  return (
    <section className="hero-twin-section relative min-h-[100svh] overflow-x-clip pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="hero-ambient absolute inset-0" aria-hidden />
      <div className="premium-grid-bg absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 via-transparent to-navy-950"
        aria-hidden
      />

      <div className="container-wide relative px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-8 xl:gap-12">
          {/* Left — message */}
          <div className="max-w-xl lg:py-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-1.5 text-xs font-medium text-cyber-cyan sm:text-sm">
              {homeHero.badge}
            </div>

            <h1 className="hero-h1 font-bold tracking-tight text-balance text-white">
              <span className="text-gradient">{homeHero.h1GradientWord}</span>{" "}
              {homeHero.h1Rest}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl">
              {homeHero.subcopy}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={homeHero.ctaPrimary.href} className="btn-primary">
                {homeHero.ctaPrimary.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
              <Link href={homeHero.ctaSecondary.href} className="btn-secondary">
                {homeHero.ctaSecondary.label}
              </Link>
            </div>

            <HeroProofStrip />
          </div>

          {/* Right — twin visualization */}
          <div className="relative lg:-mr-4 xl:-mr-8">
            <CyberResilienceTwin externalScenarioId={externalScenarioId} />
          </div>
        </div>
      </div>

      {/* Connector to next section */}
      <div className="hero-flow-connector absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-cyber-cyan/40 to-transparent" aria-hidden />
    </section>
  );
}
