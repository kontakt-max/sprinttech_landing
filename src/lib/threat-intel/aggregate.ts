import { threatSources } from "@/data/threatSources";
import { fetchRecentCves } from "./sources/nvd";
import { fetchTopEpss, mergeEpssIntoVulns } from "./sources/epss";
import { getStaticReportStats } from "./sources/reportStats";
import {
  threatPulseResponseSchema,
  assertNoPiiInResponse,
  assertNoRawIndicators,
} from "@/lib/validation/threatPulse";
import { isThreatPulseEnabled, isThreatAttributionEnabled, getThreatPulseMaxCves } from "@/lib/env";
import { buildFallbackResponse } from "./fallback";
import { determineMode } from "./normalize";
import type { ThreatPulseResponse } from "./types";

export async function aggregateThreatPulse(): Promise<ThreatPulseResponse> {
  const now = new Date().toISOString();
  const attributionEnabled = isThreatAttributionEnabled();

  if (!isThreatPulseEnabled()) {
    return buildFallbackResponse(now, attributionEnabled, "disabled");
  }

  const [nvdResult, epssResult] = await Promise.all([
    fetchRecentCves(7),
    fetchTopEpss(20),
  ]);

  const maxCves = getThreatPulseMaxCves();
  const vulnerabilities = mergeEpssIntoVulns(
    nvdResult.vulnerabilities,
    epssResult.scores
  ).slice(0, maxCves);

  const mode = determineMode(nvdResult.status, epssResult.status);
  const reportStats = getStaticReportStats();

  const metrics = [
    {
      id: "critical-high-cves",
      label: "Critical / High CVE",
      value: vulnerabilities.filter(
        (v) => v.severity === "CRITICAL" || v.severity === "HIGH"
      ).length,
      unit: "CVE",
      sourceId: "nvd",
      description: "CVE z ostatnich 7 dni (NVD API)",
    },
    ...reportStats.slice(0, 3).map((s) => ({
      id: s.id,
      label: s.label,
      value: s.value,
      sourceId: s.sourceId,
      description: s.context,
    })),
  ];

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
    }

    return {
      id: src.id,
      name: src.name,
      url: src.url,
      fetchedAt,
      status,
      disclaimer: src.description,
    };
  });

  const response: ThreatPulseResponse = {
    lastUpdated: now,
    mode,
    sources,
    metrics,
    vulnerabilities,
    reportStats,
    enabled: true,
    attributionEnabled,
  };

  const parsed = threatPulseResponseSchema.safeParse(response);
  if (!parsed.success) {
    return buildFallbackResponse(now, attributionEnabled, "error");
  }

  if (!assertNoPiiInResponse(parsed.data) || !assertNoRawIndicators(parsed.data)) {
    return buildFallbackResponse(now, attributionEnabled, "error");
  }

  return parsed.data;
}

export { getMitreSubset } from "./sources/mitre";
export { getShadowserverInfo } from "./sources/shadowserver";
