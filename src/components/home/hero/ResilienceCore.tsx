"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CoreStatus, ScenarioAccent } from "@/data/heroScenarios";
import { accentColors } from "@/data/heroScenarios";

interface ResilienceCoreProps {
  status: CoreStatus;
  accent: ScenarioAccent;
  isActive: boolean;
}

export function ResilienceCore({ status, accent, isActive }: ResilienceCoreProps) {
  const colors = accentColors[accent];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {!prefersReducedMotion && isActive && (
        <>
          <motion.div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: colors.ring }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: colors.ring }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </>
      )}
      <div
        className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 bg-navy-950/90 text-center shadow-2xl sm:h-28 sm:w-28"
        style={{
          borderColor: isActive ? colors.primary : "rgba(255,255,255,0.15)",
          boxShadow: isActive ? `0 0 40px ${colors.glow}` : undefined,
        }}
      >
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 sm:text-[9px]">
          Business Continuity
        </span>
        <span className="mt-0.5 text-[10px] font-semibold leading-tight text-white sm:text-xs">
          Resilience Core
        </span>
        <span
          className="mt-1 rounded-full px-2 py-0.5 text-[9px] font-medium sm:text-[10px]"
          style={{
            color: colors.primary,
            backgroundColor: `${colors.primary}18`,
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
