"use client";

import { useEffect, useState } from "react";
import type { ThreatPulseResponse } from "@/lib/validation/threatPulse";
import { reportStats } from "@/data/reportStats";

interface MetricStripProps {
  apiMetrics?: ThreatPulseResponse["metrics"];
  lastUpdated?: string;
}

export function MetricStrip({ apiMetrics, lastUpdated }: MetricStripProps) {
  const [data, setData] = useState<ThreatPulseResponse | null>(null);

  useEffect(() => {
    if (apiMetrics) return;
    let cancelled = false;
    fetch("/api/threat-pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((json: ThreatPulseResponse | null) => {
        if (!cancelled && json) setData(json);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [apiMetrics]);

  const metrics = apiMetrics?.length
    ? apiMetrics.slice(0, 4)
    : data?.metrics?.length
      ? data.metrics.slice(0, 4)
      : reportStats.slice(0, 4).map((s) => ({
          id: s.id,
          label: s.label,
          value: s.value,
          unit: s.unit,
        }));

  const updated = lastUpdated ?? data?.lastUpdated;

  return (
    <div className="border-t border-white/10 bg-navy-900/60 backdrop-blur-sm">
      <div className="container-wide px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.id} className="metric-card">
                <div className="text-xl font-bold text-cyber-cyan sm:text-2xl">
                  {m.value}
                  {"unit" in m && m.unit && (
                    <span className="text-sm text-white/50">{m.unit}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-white/60 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/40 lg:max-w-[220px] lg:text-right">
            {updated
              ? `Aktualizacja: ${new Date(updated).toLocaleString("pl-PL")}. `
              : ""}
            Statystyki z raportów ENISA/Verizon lub publicznych API. Nie telemetria SprintTech.
          </p>
        </div>
      </div>
    </div>
  );
}
