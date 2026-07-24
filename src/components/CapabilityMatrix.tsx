"use client";

import { useState } from "react";
import { capabilities } from "@/data/company";
import { cn } from "@/lib/utils";

type FilterId = "all" | "audit" | "pentest" | "soc" | "ot" | "compliance";

export function CapabilityMatrix() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: "Wszystkie" },
    { id: "audit", label: "Audit" },
    { id: "pentest", label: "Pentest" },
    { id: "soc", label: "SOC" },
    { id: "ot", label: "OT" },
    { id: "compliance", label: "Compliance" },
  ];

  const filtered =
    activeFilter === "all"
      ? capabilities
      : capabilities.filter((c) => c.id === activeFilter);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtruj kompetencje"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === f.id
                ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
                : "bg-white/5 text-white/60 border border-white/10 hover:border-white/20"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
        {filtered.map((cap) => (
          <div key={cap.id} className="glass-panel-hover p-5">
            <h3 className="text-lg font-semibold text-cyber-cyan">{cap.label}</h3>
            <ul className="mt-3 space-y-2">
              {cap.areas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-sm text-white/70 before:h-1 before:w-1 before:rounded-full before:bg-cyber-cyan/60"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
