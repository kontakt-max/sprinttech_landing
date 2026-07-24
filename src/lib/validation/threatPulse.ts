import { z } from "zod";

export const threatSourceStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  fetchedAt: z.string().nullable(),
  status: z.enum(["ok", "cached", "fallback", "error", "disabled"]),
  disclaimer: z.string().optional(),
});

export const threatMetricSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  unit: z.string().optional(),
  sourceId: z.string(),
  description: z.string().optional(),
});

export const threatVulnerabilitySchema = z.object({
  cve: z.string().regex(/^CVE-\d{4}-\d+$/i),
  title: z.string().max(300),
  severity: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"]),
  cvss: z.number().nullable(),
  epss: z.number().nullable(),
  percentile: z.number().nullable(),
  kev: z.boolean(),
  published: z.string(),
  lastModified: z.string(),
  sourceIds: z.array(z.string()),
});

export const reportStatItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  sourceId: z.string(),
  context: z.string(),
  sourceName: z.string(),
  sourceUrl: z.string().url(),
  publicationDate: z.string(),
});

export const threatPulseResponseSchema = z.object({
  lastUpdated: z.string(),
  mode: z.enum(["live", "fallback", "partial"]),
  sources: z.array(threatSourceStatusSchema),
  metrics: z.array(threatMetricSchema),
  vulnerabilities: z.array(threatVulnerabilitySchema),
  reportStats: z.array(reportStatItemSchema),
  enabled: z.boolean(),
  attributionEnabled: z.boolean(),
});

export type ThreatPulseResponse = z.infer<typeof threatPulseResponseSchema>;
export type ThreatVulnerability = z.infer<typeof threatVulnerabilitySchema>;

export function assertNoPiiInResponse(data: ThreatPulseResponse): boolean {
  const json = JSON.stringify(data);
  const piiPatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  ];
  return !piiPatterns.some((p) => p.test(json));
}

export function assertNoRawIndicators(data: ThreatPulseResponse): boolean {
  const json = JSON.stringify(data);
  // Block common indicator patterns in responses
  const indicatorPatterns = [
    /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d+\b/,
    /\b[a-f0-9]{32}\b/i,
  ];
  return !indicatorPatterns.some((p) => p.test(json));
}
