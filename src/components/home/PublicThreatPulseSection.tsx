"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import type { ThreatPulseResponse } from "@/lib/validation/threatPulse";
import { publicThreatPulseSection } from "@/data/home";
import { SourceAttribution } from "./SourceAttribution";
import { cn } from "@/lib/utils";

const modeLabels: Record<ThreatPulseResponse["mode"], { label: string; className: string }> = {
  live: { label: "Live", className: "bg-cyber-green/15 text-cyber-green border-cyber-green/30" },
  partial: { label: "Partial", className: "bg-cyber-amber/15 text-cyber-amber border-cyber-amber/30" },
  fallback: { label: "Fallback", className: "bg-white/10 text-white/60 border-white/20" },
};

export function PublicThreatPulseSection() {
  const [data, setData] = useState<ThreatPulseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
  }, []);

  const mode = data?.mode ?? "fallback";
  const modeInfo = modeLabels[mode];
  const topCve = data?.vulnerabilities[0];
  const headlineMetric = data?.metrics.find((m) => m.id === "critical-high-cves");

  return (
    <div className="intel-brief space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {loading ? (
          <span className="data-freshness-badge flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" aria-hidden />
            Ładowanie…
          </span>
        ) : (
          <>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${modeInfo.className}`}>
              {modeInfo.label}
            </span>
            {data?.lastUpdated && (
              <span className="data-freshness-badge">
                {new Date(data.lastUpdated).toLocaleString("pl-PL")}
              </span>
            )}
            {error && (
              <span className="flex items-center gap-1 text-xs text-cyber-amber">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                {publicThreatPulseSection.fallbackMessage}
              </span>
            )}
          </>
        )}
      </div>

      {/* Headline metric */}
      <div className="intel-headline rounded-2xl border border-white/10 bg-gradient-to-br from-navy-900/80 to-cyber-blue/5 p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-white/40">Public Threat Pulse</p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <span className="text-5xl font-bold text-cyber-cyan sm:text-6xl">
            {headlineMetric?.value ?? "—"}
          </span>
          <div>
            <p className="text-lg font-semibold text-white">Critical / High CVE</p>
            <p className="text-sm text-white/50">Ostatnie 7 dni · źródło NVD + EPSS</p>
          </div>
        </div>
        {topCve && (
          <p className="mt-4 text-sm text-white/60">
            Najwyższy priorytet: <span className="font-mono text-cyber-cyan">{topCve.cve}</span>
            {topCve.epss !== null && ` · EPSS ${(topCve.epss * 100).toFixed(0)}%`}
          </p>
        )}
      </div>

      {/* Top 3 CVE */}
      {!loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {(data?.vulnerabilities ?? []).slice(0, 3).map((v, i) => (
            <a
              key={v.cve}
              href={`https://nvd.nist.gov/vuln/detail/${v.cve}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "intel-cve-card rounded-xl border border-white/10 p-5 transition-colors hover:border-cyber-cyan/30",
                i === 0 && "md:col-span-1 ring-1 ring-cyber-cyan/20"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold text-cyber-cyan">{v.cve}</span>
                <span className={`risk-badge ${v.severity === "CRITICAL" ? "risk-badge-critical" : "risk-badge-high"}`}>
                  {v.severity}
                </span>
                {v.kev && <span className="risk-badge risk-badge-critical">KEV</span>}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">{v.title}</p>
              <div className="mt-3 flex gap-4 text-xs text-white/40">
                {v.cvss !== null && <span>CVSS {v.cvss}</span>}
                {v.epss !== null && <span>EPSS {(v.epss * 100).toFixed(1)}%</span>}
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {publicThreatPulseSection.ctas.map((cta) => (
          <Link key={cta.href} href={cta.href} className="btn-secondary text-sm">
            {cta.label}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        ))}
      </div>

      <p className="text-xs text-white/40 leading-relaxed">{publicThreatPulseSection.disclaimer}</p>
      {data && <SourceAttribution sources={data.sources} lastUpdated={data.lastUpdated} />}
    </div>
  );
}
