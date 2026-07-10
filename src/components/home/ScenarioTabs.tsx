"use client";

import { cn } from "@/lib/utils";
import type { HeroScenario, HeroScenarioId } from "@/data/heroScenarios";

interface ScenarioTabsProps {
  scenarios: HeroScenario[];
  activeId: HeroScenarioId;
  onChange: (id: HeroScenarioId) => void;
}

export function ScenarioTabs({ scenarios, activeId, onChange }: ScenarioTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Scenariusze cyberodporności"
      className="flex flex-wrap gap-2"
    >
      {scenarios.map((s) => (
        <button
          key={s.id}
          type="button"
          role="tab"
          aria-selected={activeId === s.id}
          aria-controls={`panel-${s.id}`}
          onClick={() => onChange(s.id)}
          className={cn(
            "scenario-tab",
            activeId === s.id && "scenario-tab-active"
          )}
        >
          {s.tabLabel}
        </button>
      ))}
    </div>
  );
}
