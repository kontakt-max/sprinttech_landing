import { ExternalLink } from "lucide-react";
import type { ThreatPulseResponse } from "@/lib/validation/threatPulse";

interface SourceAttributionProps {
  sources: ThreatPulseResponse["sources"];
  lastUpdated?: string;
  compact?: boolean;
}

export function SourceAttribution({ sources, lastUpdated, compact }: SourceAttributionProps) {
  const active = sources.filter((s) => s.status !== "disabled");

  return (
    <div className={compact ? "flex flex-wrap items-center gap-2" : "space-y-3"}>
      {!compact && (
        <p className="text-xs font-medium uppercase tracking-wider text-white/40">Źródła danych</p>
      )}
      <div className="flex flex-wrap gap-2">
        {active.map((src) => (
          <a
            key={src.id}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-pill inline-flex items-center gap-1"
            title={`Status: ${src.status}${src.fetchedAt ? ` · ${src.fetchedAt}` : ""}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                src.status === "ok" || src.status === "cached"
                  ? "bg-cyber-green"
                  : src.status === "fallback"
                    ? "bg-cyber-amber"
                    : "bg-white/30"
              }`}
              aria-hidden
            />
            {src.name}
            <ExternalLink className="h-3 w-3 opacity-50" aria-hidden />
          </a>
        ))}
      </div>
      {lastUpdated && (
        <span className="data-freshness-badge">
          Aktualizacja: {new Date(lastUpdated).toLocaleString("pl-PL")}
        </span>
      )}
    </div>
  );
}
