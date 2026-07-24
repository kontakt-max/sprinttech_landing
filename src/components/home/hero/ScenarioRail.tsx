"use client";

import { cn } from "@/lib/utils";
import type { HeroScenario } from "@/data/heroScenarios";
import { accentColors } from "@/data/heroScenarios";

interface ScenarioRailProps {
  scenarios: HeroScenario[];
  activeId: HeroScenario["id"];
  onChange: (id: HeroScenario["id"]) => void;
  layout?: "horizontal" | "vertical";
}

export function ScenarioRail({ scenarios, activeId, onChange, layout = "horizontal" }: ScenarioRailProps) {
  return (
    <div
      role="tablist"
      aria-label="Scenariusze cyberodporności"
      className={cn(
        "flex gap-2",
        layout === "vertical" ? "flex-col" : "flex-row overflow-x-auto snap-x snap-mandatory pb-1 scrollbar-none"
      )}
    >
      {scenarios.map((s) => {
        const isActive = s.id === activeId;
        const accent = accentColors[s.accent];
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`twin-panel-${s.id}`}
            onClick={() => onChange(s.id)}
            className={cn(
              "twin-rail-btn shrink-0 snap-start",
              isActive && "twin-rail-btn-active"
            )}
            style={
              isActive
                ? { borderColor: accent.primary, color: accent.primary, backgroundColor: `${accent.primary}12` }
                : undefined
            }
          >
            <span className="text-[10px] font-mono opacity-60">{s.number}</span>
            <span className="text-sm font-semibold whitespace-nowrap">{s.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
