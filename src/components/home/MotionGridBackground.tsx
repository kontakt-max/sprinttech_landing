"use client";

import { cn } from "@/lib/utils";
import type { HeroScenarioId } from "@/data/heroScenarios";

const scenarioGradients: Record<HeroScenarioId, string> = {
  vulnerability: "from-cyber-red/5 via-transparent to-cyber-amber/5",
  "soc-incident": "from-cyber-cyan/5 via-transparent to-cyber-blue/5",
  regulatory: "from-cyber-blue/5 via-transparent to-cyber-green/5",
  "ot-ics": "from-cyber-amber/5 via-transparent to-cyber-cyan/5",
};

interface MotionGridBackgroundProps {
  scenarioId: HeroScenarioId;
  className?: string;
}

export function MotionGridBackground({ scenarioId, className }: MotionGridBackgroundProps) {
  return (
    <div
      className={cn("premium-grid-bg pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-700",
          scenarioGradients[scenarioId]
        )}
      />
    </div>
  );
}
