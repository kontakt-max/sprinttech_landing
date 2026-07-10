"use client";

import Link from "next/link";
import { Target, Radar, Shield, Factory } from "lucide-react";
import { securityPathSection } from "@/data/home";
import type { HeroScenarioId } from "@/data/heroScenarios";

const iconMap = {
  target: Target,
  radar: Radar,
  shield: Shield,
  factory: Factory,
};

interface ServicePathCardsProps {
  onScenarioSelect?: (id: HeroScenarioId) => void;
}

export function ServicePathCards({ onScenarioSelect }: ServicePathCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {securityPathSection.paths.map((path) => {
        const Icon = iconMap[path.icon as keyof typeof iconMap] ?? Target;
        return (
          <div key={path.id} className="command-panel-hover group flex flex-col p-6">
            <Icon className="h-6 w-6 text-cyber-cyan" aria-hidden />
            <h3 className="mt-4 font-semibold text-white group-hover:text-cyber-cyan transition-colors">
              {path.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-white/60">{path.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={path.href} className="btn-primary text-xs py-2 px-4">
                Szczegóły
              </Link>
              {onScenarioSelect && (
                <button
                  type="button"
                  onClick={() => onScenarioSelect(path.scenarioId)}
                  className="text-xs text-cyber-cyan hover:underline"
                >
                  Zobacz w hero →
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServicePathCardsStatic() {
  return <ServicePathCards />;
}
