export type ThreatPulseMode = "live" | "fallback" | "partial";

export type SourceStatus = "ok" | "cached" | "fallback" | "error" | "disabled";

export interface ThreatSourceResult {
  id: string;
  name: string;
  url: string;
  fetchedAt: string | null;
  status: SourceStatus;
  disclaimer?: string;
}

export interface ThreatMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  sourceId: string;
  description?: string;
}

export interface ThreatVulnerability {
  cve: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";
  cvss: number | null;
  epss: number | null;
  percentile: number | null;
  kev: boolean;
  published: string;
  lastModified: string;
  sourceIds: string[];
}

export interface ReportStatItem {
  id: string;
  label: string;
  value: string;
  sourceId: string;
  context: string;
  sourceName: string;
  sourceUrl: string;
  publicationDate: string;
}

export interface ThreatPulseResponse {
  lastUpdated: string;
  mode: ThreatPulseMode;
  sources: ThreatSourceResult[];
  metrics: ThreatMetric[];
  vulnerabilities: ThreatVulnerability[];
  reportStats: ReportStatItem[];
  enabled: boolean;
  attributionEnabled: boolean;
}
