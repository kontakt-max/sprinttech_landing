"use client";

import { useState } from "react";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";
import { offerPreviewSection } from "@/data/home";
import type { HeroScenarioId } from "@/data/heroScenarios";
import { cn } from "@/lib/utils";

const scenarioServiceMap: Record<HeroScenarioId, string[]> = {
  vulnerability: ["pentest-web", "pentest-infra", "pentest-cloud", "pentest-mobile", "phishing"],
  "soc-incident": ["soc-monitoring", "maturity"],
  regulatory: ["audit-nis2", "audit-dora", "audit-ksc", "documentation", "audit-security"],
  "ot-ics": ["ot-modernization", "pentest-ot"],
};

export function HomeOfferPreview() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? services.slice(0, 8)
      : services.filter((s) =>
          scenarioServiceMap[filter as HeroScenarioId]?.includes(s.id)
        );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {offerPreviewSection.filters.map((f) => (
          <button
            key={f.id}
            type="button"
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
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.shortDescription}
            href={service.href}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/oferta" className="btn-secondary">
          Zobacz pełną ofertę
        </Link>
      </div>
    </div>
  );
}
