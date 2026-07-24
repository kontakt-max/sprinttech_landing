"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { HeroScenario } from "@/data/heroScenarios";
import { accentColors } from "@/data/heroScenarios";

interface RiskOutcomeCardProps {
  scenario: HeroScenario;
}

export function RiskOutcomeCard({ scenario }: RiskOutcomeCardProps) {
  const colors = accentColors[scenario.accent];
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scenario.id}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-white/10 bg-navy-900/50 p-4 backdrop-blur-sm"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Result</p>
        <p className="mt-2 text-sm font-medium leading-snug text-white" style={{ color: colors.primary }}>
          {scenario.outcomeTitle}
        </p>
        <ul className="mt-3 space-y-1.5">
          {scenario.outcomes.map((o) => (
            <li key={o} className="flex items-center gap-2 text-xs text-white/70">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: colors.primary }}
                aria-hidden
              />
              {o}
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
