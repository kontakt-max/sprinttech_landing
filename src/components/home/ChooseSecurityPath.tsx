"use client";

import Link from "next/link";
import { ArrowRight, Target, Radar, Shield, Factory, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { securityPathSection } from "@/data/home";
import type { HeroScenarioId } from "@/data/heroScenarios";

const iconMap = {
  target: Target,
  radar: Radar,
  shield: Shield,
  factory: Factory,
  chart: BarChart3,
};

const miniPaths: Record<string, string> = {
  resilience: "M4 20 L12 12 L20 8 L28 14",
  regulatory: "M4 16 L14 10 L22 14 L28 6",
  soc: "M4 18 L10 10 L18 14 L28 8",
  ot: "M4 14 L12 18 L20 6 L28 12",
  executive: "M4 12 L16 12 L16 4 L28 20",
};

interface ChooseSecurityPathProps {
  onScenarioSelect?: (id: HeroScenarioId) => void;
}

export function ChooseSecurityPath({ onScenarioSelect }: ChooseSecurityPathProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {securityPathSection.paths.map((path, i) => {
        const Icon = iconMap[path.icon as keyof typeof iconMap] ?? Target;
        const miniPath = miniPaths[path.id] ?? miniPaths.resilience;

        return (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="path-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 p-6 transition-colors hover:border-cyber-cyan/30"
          >
            <svg className="path-card-viz mb-4 h-8 w-full text-cyber-cyan/40" viewBox="0 0 32 24" aria-hidden>
              <motion.path
                d={miniPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </svg>

            <Icon className="h-6 w-6 text-cyber-cyan" aria-hidden />
            <h3 className="mt-3 text-base font-semibold text-white group-hover:text-cyber-cyan transition-colors">
              {path.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-white/60 leading-relaxed">{path.problem}</p>

            <Link
              href={path.href}
              onClick={() => onScenarioSelect?.(path.scenarioId)}
              className="mt-5 inline-flex items-center text-sm font-medium text-cyber-cyan hover:underline"
            >
              {path.firstStep.slice(0, 40)}…
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
