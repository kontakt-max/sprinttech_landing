import { z } from "zod";

export const threatSourceStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  fetchedAt: z.string().nullable(),
  status: z.enum(["ok", "cached", "fallback", "error", "disabled"]),
});

export const threatMetricSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  sourceId: z.string(),
  description: z.string().optional(),
});

export const threatVulnerabilitySchema = z.object({
  cve: z.string(),
  title: z.string(),
  severity: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"]),
  cvss: z.number().nullable(),
  epss: z.number().nullable(),
  percentile: z.number().nullable(),
  kev: z.boolean(),
  published: z.string(),
  lastModified: z.string(),
  sourceIds: z.array(z.string()),
});

export const threatPulseResponseSchema = z.object({
  lastUpdated: z.string(),
  sources: z.array(threatSourceStatusSchema),
  metrics: z.array(threatMetricSchema),
  vulnerabilities: z.array(threatVulnerabilitySchema),
  enabled: z.boolean(),
  attributionEnabled: z.boolean(),
});

export type ThreatPulseResponse = z.infer<typeof threatPulseResponseSchema>;
export type ThreatVulnerability = z.infer<typeof threatVulnerabilitySchema>;

/** Validates response contains no PII patterns */
export function assertNoPiiInResponse(data: ThreatPulseResponse): boolean {
  const json = JSON.stringify(data);
  const piiPatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
    /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
    /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
  ];
  return !piiPatterns.some((p) => p.test(json));
}
