"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { signalToActionSection } from "@/data/home";
import { cn } from "@/lib/utils";

export function SignalToActionFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const steps = signalToActionSection.steps;
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveStep(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className="signal-flow relative">
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <span className="text-7xl font-bold leading-none text-cyber-cyan/20">
                  {String(steps[activeStep].step).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-white">{steps[activeStep].title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/65">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative border-l border-cyber-cyan/20 pl-8">
            {steps.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className={cn(
                  "signal-flow-step mb-16 min-h-[120px] transition-opacity duration-500",
                  activeStep === i ? "opacity-100" : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "absolute -left-[5px] h-2.5 w-2.5 rounded-full border-2 bg-navy-950 transition-colors",
                    activeStep === i ? "border-cyber-cyan bg-cyber-cyan" : "border-white/30"
                  )}
                  style={{ marginTop: "0.25rem" }}
                  aria-hidden
                />
                <p className="text-xs font-mono text-white/40">0{step.step}</p>
                <h4 className="mt-1 text-lg font-semibold text-white">{step.title}</h4>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="lg:hidden space-y-2">
        {steps.map((step, i) => {
          const isOpen = openMobile === i;
          return (
            <div key={step.step} className="command-panel overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenMobile(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-cyber-cyan/60">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white">{step.title}</span>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 text-white/40 transition-transform", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <p className="px-4 pb-4 text-sm text-white/70">{step.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
