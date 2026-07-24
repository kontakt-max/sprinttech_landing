"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { HeroScenario } from "@/data/heroScenarios";

interface AttackPathSimulatorProps {
  scenario: HeroScenario;
}

export function AttackPathSimulator({ scenario }: AttackPathSimulatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="space-y-2"
      role="log"
      aria-label="Przebieg procesu — symulacja lub dane publiczne"
      aria-live="polite"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-white/40">
        Przebieg procesu
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {scenario.eventFeed.map((evt) => (
            <div
              key={evt.id}
              className={`rounded-lg border px-3 py-2 text-xs ${
                evt.source === "public"
                  ? "border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan"
                  : "border-white/10 bg-white/[0.03] text-white/70"
              }`}
            >
              <span className="font-mono text-white/40">{evt.timestamp}</span>{" "}
              <span className="text-[10px] uppercase opacity-60">
                {evt.source === "public" ? "public source" : "symulowany przebieg procesu"}
              </span>
              {" — "}
              {evt.message}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <p className="text-[10px] text-white/40 leading-relaxed">{scenario.disclosureText}</p>
    </div>
  );
}
