/**
 * Centralized environment access. Optional integrations never throw on import.
 * Call getters at runtime — missing optional secrets disable features safely.
 */

import { z } from "zod";

const boolFromEnv = (value: string | undefined, defaultValue = false): boolean => {
  if (value === undefined || value === "") return defaultValue;
  return value === "true";
};

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("SprintTech"),
  NEXT_PUBLIC_LINKEDIN_COMPANY_URL: z.string().url().optional(),
  NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED: z.boolean().default(false),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z.boolean().default(false),
  NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL: z.string().optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

let cachedPublicEnv: PublicEnv | null = null;

export function getPublicEnv(): PublicEnv {
  if (!cachedPublicEnv) {
    cachedPublicEnv = publicEnvSchema.parse({
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? "SprintTech",
      NEXT_PUBLIC_LINKEDIN_COMPANY_URL: process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL,
      NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED: boolFromEnv(
        process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED
      ),
      NEXT_PUBLIC_ANALYTICS_ENABLED: boolFromEnv(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED),
      NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL || undefined,
      NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL:
        process.env.NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL || undefined,
    });
  }
  return cachedPublicEnv;
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function isThreatPulseEnabled(): boolean {
  return process.env.THREAT_PULSE_ENABLED !== "false";
}

export function getThreatPulseCacheTtlHours(): number {
  const parsed = parseInt(process.env.THREAT_PULSE_CACHE_TTL_HOURS ?? "6", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 6;
}

export function getThreatPulseRequestTimeoutMs(): number {
  const parsed = parseInt(process.env.THREAT_PULSE_REQUEST_TIMEOUT_MS ?? "5000", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 5000;
}

export function getThreatPulseMaxCves(): number {
  const parsed = parseInt(process.env.THREAT_PULSE_MAX_CVES ?? "20", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 20;
}

export function isThreatAttributionEnabled(): boolean {
  return process.env.PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED !== "false";
}

export function getNvdApiKey(): string | undefined {
  const key = process.env.NVD_API_KEY?.trim();
  return key || undefined;
}

export function isShadowserverEnabled(): boolean {
  return process.env.SHADOWSERVER_INTEGRATION_ENABLED === "true";
}

export function isGoogleSheetsConfigured(): boolean {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  return Boolean(email && key && spreadsheetId);
}

export function isSoroWebhookEnabled(): boolean {
  if (process.env.SORO_WEBHOOK_ENABLED === "false") return false;
  const apiKey = process.env.SORO_WEBHOOK_API_KEY?.trim();
  const secret = process.env.SORO_WEBHOOK_SECRET?.trim();
  return Boolean(apiKey || secret);
}

export function getSoroPublishMode(): "draft" | "publish" {
  return process.env.SORO_PUBLISH_MODE === "publish" ? "publish" : "draft";
}

export type IntegrationStatus = "configured" | "missing" | "disabled" | "enabled";

export interface IntegrationHealth {
  threatPulse: "enabled" | "disabled";
  googleSheets: "configured" | "disabled";
  soroSeo: "configured" | "disabled";
  linkedinInsight: "enabled" | "disabled";
}

export function getIntegrationHealth(): IntegrationHealth {
  return {
    threatPulse: isThreatPulseEnabled() ? "enabled" : "disabled",
    googleSheets: isGoogleSheetsConfigured() ? "configured" : "disabled",
    soroSeo: isSoroWebhookEnabled() ? "configured" : "disabled",
    linkedinInsight: boolFromEnv(process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED)
      ? "enabled"
      : "disabled",
  };
}
