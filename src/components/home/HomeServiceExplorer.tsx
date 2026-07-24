"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { offerPreviewSection } from "@/data/home";
import type { HeroScenarioId } from "@/data/heroScenarios";
import { cn } from "@/lib/utils";

const scenarioServiceMap: Record<HeroScenarioId, string[]> = {
  vulnerability: ["pentest-web", "pentest-infra", "pentest-cloud", "pentest-mobile", "phishing", "maturity"],
  "soc-incident": ["soc-monitoring", "maturity"],
  regulatory: ["audit-nis2", "audit-dora", "audit-ksc", "documentation", "audit-security"],
  "ot-ics": ["ot-modernization", "pentest-ot"],
};

export function HomeServiceExplorer() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? services.slice(0, 8)
      : services.filter((s) =>
          scenarioServiceMap[filter as HeroScenarioId]?.includes(s.id)
        );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtr usług według scenariusza">
        {offerPreviewSection.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "scenario-tab",
              filter === f.id && "scenario-tab-active"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <article key={service.id} className="command-panel-hover flex flex-col p-5">
            <h3 className="font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-xs text-white/50">
              <span className="text-white/40">Problem: </span>
              {service.problem}
            </p>
            <div className="mt-3 flex-1">
              <p className="text-xs font-medium text-white/40">Zakres</p>
              <ul className="mt-1 space-y-0.5">
                {service.scope.slice(0, 3).map((item) => (
                  <li key={item} className="text-xs text-white/60">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-white/40">Deliverables</p>
              <ul className="mt-1 space-y-0.5">
                {service.deliverables.slice(0, 2).map((item) => (
                  <li key={item} className="text-xs text-white/60">• {item}</li>
                ))}
              </ul>
            </div>
            <Link
              href={service.href}
              className="mt-4 inline-flex items-center text-sm text-cyber-cyan hover:underline"
            >
              Szczegóły usługi
              <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-white/60">
          Brak usług dla wybranego scenariusza.
        </p>
      )}

      <div className="mt-8 text-center">
        <Link href="/oferta" className="btn-secondary">
          Zobacz pełną ofertę
        </Link>
      </div>
    </div>
  );
}
