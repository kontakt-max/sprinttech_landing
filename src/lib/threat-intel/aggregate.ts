import { reportStats } from "@/data/reportStats";
import { threatSources } from "@/data/threatSources";
import { fetchRecentCves } from "./sources/nvd";
import { fetchTopEpss, mergeEpssIntoVulns } from "./sources/epss";
import { getMitreSubset } from "./sources/mitre";
import { getShadowserverInfo } from "./sources/shadowserver";
import {
  type ThreatPulseResponse,
  threatPulseResponseSchema,
  assertNoPiiInResponse,
} from "@/lib/validation/threatPulse";
import { isThreatPulseEnabled } from "./cache";
import { integrations } from "@/lib/env.server";

export async function aggregateThreatPulse(): Promise<ThreatPulseResponse> {
  const now = new Date().toISOString();
  const attributionEnabled = integrations.threatPulse.attributionEnabled;

  if (!isThreatPulseEnabled()) {
    return buildFallbackResponse(now, attributionEnabled, "disabled");
  }

  const [nvdResult, epssResult] = await Promise.all([
    fetchRecentCves(7),
    fetchTopEpss(50),
  ]);

  const vulnerabilities = mergeEpssIntoVulns(
    nvdResult.vulnerabilities,
    epssResult.scores,
  ).slice(0, integrations.threatPulse.maxCves);

  const metrics = reportStats.map((s) => ({
    id: s.id,
    label: s.label,
    value: s.value,
    unit: s.unit,
    sourceId: s.sourceId,
    description: s.description,
  }));

  const sources = threatSources.map((src) => {
    let status: "ok" | "cached" | "fallback" | "error" | "disabled" = "disabled";
    let fetchedAt: string | null = null;

    if (!src.enabled) {
      status = "disabled";
    } else if (src.id === "nvd") {
      status = nvdResult.status;
      fetchedAt = nvdResult.fetchedAt;
    } else if (src.id === "epss") {
      status = epssResult.status;
      fetchedAt = epssResult.fetchedAt;
    } else if (src.type === "static") {
      status = "ok";
      fetchedAt = now;
    } else if (src.id === "shadowserver") {
      status = "disabled";
    }

    return { id: src.id, name: src.name, url: src.url, fetchedAt, status };
  });

  const response: ThreatPulseResponse = {
    lastUpdated: now,
    sources,
    metrics,
    vulnerabilities,
    enabled: true,
    attributionEnabled,
  };

  const parsed = threatPulseResponseSchema.safeParse(response);
  if (!parsed.success) {
    return buildFallbackResponse(now, attributionEnabled, "error");
  }

  if (!assertNoPiiInResponse(parsed.data)) {
    return buildFallbackResponse(now, attributionEnabled, "error");
  }

  return parsed.data;
}

function buildFallbackResponse(
  now: string,
  attributionEnabled: boolean,
  reason: "disabled" | "error"
): ThreatPulseResponse {
  const metrics = reportStats.map((s) => ({
    id: s.id,
    label: s.label,
    value: s.value,
    unit: s.unit,
    sourceId: s.sourceId,
    description: s.description,
  }));

  return {
    lastUpdated: now,
    sources: threatSources.map((s) => ({
      id: s.id,
      name: s.name,
      url: s.url,
      fetchedAt: s.type === "static" ? now : null,
      status: s.enabled ? (reason === "disabled" ? "disabled" : "fallback") : "disabled",
    })),
    metrics,
    vulnerabilities: [],
    enabled: reason !== "disabled",
    attributionEnabled,
  };
}

export { getMitreSubset, getShadowserverInfo };
