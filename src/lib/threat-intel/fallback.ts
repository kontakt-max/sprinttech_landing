import { reportStats as staticReportStats } from "@/data/reportStats";
import { threatSources } from "@/data/threatSources";
import type { ThreatPulseResponse, ThreatVulnerability } from "./types";

export const FALLBACK_CVES: ThreatVulnerability[] = [
  {
    cve: "CVE-2024-3094",
    title: "XZ Utils backdoor — supply chain compromise (przykład edukacyjny KEV)",
    severity: "CRITICAL",
    cvss: 10.0,
    epss: null,
    percentile: null,
    kev: true,
    published: "2024-03-29T00:00:00.000Z",
    lastModified: "2024-04-01T00:00:00.000Z",
    sourceIds: ["nvd", "fallback"],
  },
  {
    cve: "CVE-2023-44487",
    title: "HTTP/2 Rapid Reset Attack — wektor DDoS (przykład edukacyjny)",
    severity: "HIGH",
    cvss: 7.5,
    epss: null,
    percentile: null,
    kev: true,
    published: "2023-10-10T00:00:00.000Z",
    lastModified: "2023-10-11T00:00:00.000Z",
    sourceIds: ["nvd", "fallback"],
  },
];

export function buildReportStatsItems() {
  return staticReportStats.map((s) => ({
    id: s.id,
    label: s.label,
    value: s.value + (s.unit ?? ""),
    sourceId: s.sourceId,
    context: s.description,
    sourceName: s.sourceTitle,
    sourceUrl: s.sourceUrl,
    publicationDate: s.publicationDate,
  }));
}

export function buildFallbackResponse(
  now: string,
  attributionEnabled: boolean,
  reason: "disabled" | "error" | "partial" = "error"
): ThreatPulseResponse {
  const mode = reason === "disabled" ? "fallback" : reason === "error" ? "fallback" : "partial";

  return {
    lastUpdated: now,
    mode,
    sources: threatSources.map((s) => ({
      id: s.id,
      name: s.name,
      url: s.url,
      fetchedAt: s.type === "static" ? now : null,
      status: s.enabled ? (reason === "disabled" ? "disabled" : "fallback") : "disabled",
      disclaimer: s.description,
    })),
    metrics: staticReportStats.map((s) => ({
      id: s.id,
      label: s.label,
      value: s.value,
      unit: s.unit,
      sourceId: s.sourceId,
      description: s.description,
    })),
    vulnerabilities: reason === "disabled" ? [] : FALLBACK_CVES,
    reportStats: buildReportStatsItems(),
    enabled: reason !== "disabled",
    attributionEnabled,
  };
}
