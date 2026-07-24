"use client";

import { AlertTriangle } from "lucide-react";
import type { HeroScenario } from "@/data/heroScenarios";

interface ExecutiveRiskPanelProps {
  scenario: HeroScenario;
  selectedNodeId?: string | null;
}

export function ExecutiveRiskPanel({ scenario, selectedNodeId }: ExecutiveRiskPanelProps) {
  const selectedNode = selectedNodeId
    ? scenario.nodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <aside
      className="executive-card p-4"
      aria-label="Panel ryzyka dla zarządu"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-cyber-amber" aria-hidden />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Co oznacza to ryzyko
        </h3>
      </div>

      {selectedNode ? (
        <div className="mt-3">
          <p className="text-sm font-medium text-cyber-cyan">{selectedNode.label}</p>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            {selectedNode.riskMeaning ?? selectedNode.description}
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div>
            <p className="text-xs text-white/40">Pytanie biznesowe</p>
            <p className="mt-1 text-sm text-white/80">{scenario.riskQuestion}</p>
          </div>
          <div>
            <p className="text-xs text-white/40">Wpływ biznesowy</p>
            <p className="mt-1 text-sm text-white/70">{scenario.businessImpact}</p>
          </div>
        </div>
      )}

      <div className="mt-4 border-t border-white/10 pt-3">
        <span className={`risk-badge ${scenario.sourceMode === "simulation" ? "" : scenario.sourceMode === "public" ? "risk-badge-high" : ""}`}>
          {scenario.sourceMode === "simulation"
            ? "Symulowany przebieg procesu"
            : scenario.sourceMode === "public"
              ? "Dane publiczne"
              : "Hybryda: publiczne + symulacja"}
        </span>
        <p className="mt-2 text-[10px] text-white/40 leading-relaxed">
          {scenario.disclosureText}
        </p>
      </div>
    </aside>
  );
}
