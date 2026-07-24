"use client";

import { useEffect, useState } from "react";
import type { ThreatPulseResponse } from "@/lib/validation/threatPulse";
import { SourceAttribution } from "./SourceAttribution";

interface PublicIntelTickerProps {
  initialData?: ThreatPulseResponse | null;
  showSources?: boolean;
  compact?: boolean;
}

export function PublicIntelTicker({
  initialData,
  showSources = true,
  compact = false,
}: PublicIntelTickerProps) {
  const [data, setData] = useState<ThreatPulseResponse | null>(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/threat-pulse");
        if (!res.ok) throw new Error("fetch failed");
        const json = (await res.json()) as ThreatPulseResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [initialData]);

  if (loading) {
    return (
      <div className={compact ? "h-8 animate-pulse rounded bg-white/5" : "space-y-3"} aria-busy="true" aria-label="Ładowanie danych threat pulse">
        {!compact && [1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <p className="text-xs text-white/50">
        {compact
          ? "Publiczne API chwilowo niedostępne — fallback edukacyjny."
          : "Publiczne API tymczasowo niedostępne. Wyświetlamy statyczne dane z raportów ENISA i Verizon DBIR."}
      </p>
    );
  }

  if (compact) {
    const top = data.vulnerabilities[0];
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
        <span className="data-freshness-badge">{data.mode}</span>
        {top && (
          <span>
            {top.cve} · {top.severity}
            {top.epss !== null && ` · EPSS ${(top.epss * 100).toFixed(0)}%`}
          </span>
        )}
        <span className="text-white/30">·</span>
        <span>{data.vulnerabilities.length} CVE w puli</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.vulnerabilities.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            Ostatnie CVE (critical/high) — źródło: NVD
          </p>
          {data.vulnerabilities.slice(0, 5).map((v) => (
            <a
              key={v.cve}
              href={`https://nvd.nist.gov/vuln/detail/${v.cve}`}
              target="_blank"
              rel="noopener noreferrer"
              className="command-panel-hover flex items-start justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm text-cyber-cyan">{v.cve}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      v.severity === "CRITICAL"
                        ? "bg-cyber-red/20 text-cyber-red"
                        : "bg-cyber-amber/20 text-cyber-amber"
                    }`}
                  >
                    {v.severity}
                  </span>
                  {v.kev && (
                    <span className="rounded bg-cyber-red/10 px-1.5 py-0.5 text-[10px] text-cyber-red">
                      KEV
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-xs text-white/60">{v.title}</p>
              </div>
              <div className="shrink-0 text-right text-xs text-white/40">
                {v.cvss !== null && <div>CVSS {v.cvss}</div>}
                {v.epss !== null && <div>EPSS {(v.epss * 100).toFixed(1)}%</div>}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/60">
          Brak świeżych CVE z API — wyświetlamy kontekst z raportów branżowych poniżej.
        </p>
      )}

      {showSources && (
        <SourceAttribution sources={data.sources} lastUpdated={data.lastUpdated} />
      )}
    </div>
  );
}
