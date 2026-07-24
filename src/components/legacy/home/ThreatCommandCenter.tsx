"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { HeroScenario, HeroScenarioId } from "@/data/heroScenarios";
import { services } from "@/data/services";
import { ScenarioTabs } from "./ScenarioTabs";
import { ThreatMap } from "./ThreatMap";
import { AttackPathSimulator } from "./AttackPathSimulator";
import { ExecutiveRiskPanel } from "./ExecutiveRiskPanel";
import { PublicIntelTicker } from "./PublicIntelTicker";
import { MotionGridBackground } from "./MotionGridBackground";

interface ThreatCommandCenterProps {
  scenarios: HeroScenario[];
  activeScenarioId: HeroScenarioId;
  onScenarioChange: (id: HeroScenarioId) => void;
}

export function ThreatCommandCenter({
  scenarios,
  activeScenarioId,
  onScenarioChange,
}: ThreatCommandCenterProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const scenario = scenarios.find((s) => s.id === activeScenarioId) ?? scenarios[0];
  const prefersReducedMotion = useReducedMotion();

  const recommendedServices = scenario.serviceIds
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="command-panel relative overflow-hidden">
      <MotionGridBackground scenarioId={scenario.id} />

      <div className="relative p-4 sm:p-6">
        <ScenarioTabs
          scenarios={scenarios}
          activeId={activeScenarioId}
          onChange={(id) => {
            setSelectedNodeId(null);
            onScenarioChange(id);
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            id={`panel-${scenario.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${scenario.id}`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-cyber-cyan/80">
              {scenario.eyebrow}
            </p>
            <div className="mb-4 mt-1">
              <h2 className="text-lg font-semibold text-white">{scenario.panelTitle}</h2>
              <p className="mt-1 text-sm text-white/60">{scenario.panelDescription}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="glow-border aspect-[16/10] rounded-lg bg-navy-950/50 p-4">
                  <ThreatMap
                    scenario={scenario}
                    selectedNodeId={selectedNodeId}
                    onNodeSelect={setSelectedNodeId}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {scenario.metrics.map((m) => (
                    <span key={m.label} className="source-pill text-[10px]">
                      {m.label}: {m.value}
                      {m.source === "simulated" && " (symulacja)"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <ExecutiveRiskPanel scenario={scenario} selectedNodeId={selectedNodeId} />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-cyber-cyan">
                    Co robi SprintTech
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {scenario.sprinttechActions.map((step) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-white/70">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-green" aria-hidden />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <AttackPathSimulator scenario={scenario} />

                {recommendedServices.length > 0 && (
                  <div>
                    <p className="text-xs text-white/40">Rekomendowane usługi</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recommendedServices.map((svc) => svc && (
                        <Link
                          key={svc.id}
                          href={svc.href}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70 hover:border-cyber-cyan/30 hover:text-cyber-cyan"
                        >
                          {svc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href={scenario.ctaHref} className="btn-primary flex-1 justify-center text-sm">
                    {scenario.ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                  {scenario.secondaryCtaHref && (
                    <Link href={scenario.secondaryCtaHref} className="btn-secondary flex-1 justify-center text-sm">
                      {scenario.secondaryCtaLabel ?? "Kontakt"}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Footer: mini public intel ticker */}
            <div className="mt-6 border-t border-white/10 pt-4" aria-describedby="threat-pulse-hero-disclaimer">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-white/30">
                Public Threat Pulse — kontekst, nie telemetria
              </p>
              <PublicIntelTicker compact showSources={false} />
              <p id="threat-pulse-hero-disclaimer" className="mt-2 text-[10px] text-white/40">
                {scenario.disclosureText}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
