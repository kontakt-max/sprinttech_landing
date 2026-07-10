"use client";

import { useState, useMemo } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import {
  services,
  serviceNeedsLabels,
  serviceEnvironmentLabels,
  type ServiceNeed,
  type ServiceEnvironment,
} from "@/data/services";
import { cn } from "@/lib/utils";

export function OfferFilters() {
  const [need, setNeed] = useState<ServiceNeed | "all">("all");
  const [environment, setEnvironment] = useState<ServiceEnvironment | "all">("all");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (need !== "all" && !s.needs.includes(need)) return false;
      if (environment !== "all" && !s.environments.includes(environment)) return false;
      return true;
    });
  }, [need, environment]);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div>
          <span className="text-xs font-medium uppercase text-white/50">Według potrzeby</span>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterButton active={need === "all"} onClick={() => setNeed("all")}>
              Wszystkie
            </FilterButton>
            {(Object.keys(serviceNeedsLabels) as ServiceNeed[]).map((n) => (
              <FilterButton key={n} active={need === n} onClick={() => setNeed(n)}>
                {serviceNeedsLabels[n]}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-xs font-medium uppercase text-white/50">Według środowiska</span>
        <div className="mt-2 flex flex-wrap gap-2">
          <FilterButton active={environment === "all"} onClick={() => setEnvironment("all")}>
            Wszystkie
          </FilterButton>
          {(Object.keys(serviceEnvironmentLabels) as ServiceEnvironment[]).map((e) => (
            <FilterButton key={e} active={environment === e} onClick={() => setEnvironment(e)}>
              {serviceEnvironmentLabels[e]}
            </FilterButton>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-white/50">
        Znaleziono {filtered.length} usług
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.shortDescription}
            href={service.href}
            tags={[...service.needs.map((n) => serviceNeedsLabels[n]).slice(0, 1)]}
          />
        ))}
      </div>
    </>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
          : "bg-white/5 text-white/60 border border-white/10 hover:border-white/20"
      )}
    >
      {children}
    </button>
  );
}
