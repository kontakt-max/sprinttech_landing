"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { StoryStep } from "@/data/heroScenarios";

interface ScenarioStoryProps {
  steps: StoryStep[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  accentColor: string;
}

export function ScenarioStory({ steps, activeIndex, onPrev, onNext, accentColor }: ScenarioStoryProps) {
  const prefersReducedMotion = useReducedMotion();
  const step = steps[activeIndex];
  const total = steps.length;

  return (
    <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-white/40">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={activeIndex === 0}
            className="rounded-lg border border-white/10 p-1.5 text-white/60 hover:text-white disabled:opacity-30"
            aria-label="Poprzedni krok"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex >= total - 1}
            className="rounded-lg border border-white/10 p-1.5 text-white/60 hover:text-white disabled:opacity-30"
            aria-label="Następny krok"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-3 flex gap-1.5" role="progressbar" aria-valuenow={activeIndex + 1} aria-valuemin={1} aria-valuemax={total}>
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: i <= activeIndex ? accentColor : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          <h3 className="text-base font-semibold text-white sm:text-lg">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
