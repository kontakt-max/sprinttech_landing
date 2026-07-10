"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { HeroScenario, HeroScenarioId } from "@/data/heroScenarios";
import { services } from "@/data/services";
import { ScenarioTabs } from "./ScenarioTabs";
import { ThreatMap } from "./ThreatMap";
import { AttackPathSimulator } from "./AttackPathSimulator";
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
          onChange={onScenarioChange}
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
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">{scenario.panelTitle}</h2>
              <p className="mt-1 text-sm text-white/60">{scenario.panelDescription}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="glow-border aspect-[16/10] rounded-lg bg-navy-950/50 p-4">
                  <ThreatMap scenario={scenario} />
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

              <div className="lg:col-span-2 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-cyber-cyan">
                    Co robi SprintTech
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {scenario.nextSteps.map((step) => (
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

                <Link href={scenario.ctaHref} className="btn-primary w-full justify-center text-sm">
                  {scenario.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
