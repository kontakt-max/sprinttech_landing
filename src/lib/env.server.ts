import "server-only";
import { z } from "zod";
import { publicEnv, boolFlag, formatIssues } from "./env";

/**
 * SERVER-ONLY environment variables.
 *
 * This module is guarded with `import "server-only"`: any attempt to import it
 * from a Client Component (`"use client"`) fails the build. Secrets, API keys and
 * tokens must ONLY be read here, never in client code.
 *
 * Optional integrations follow a "safely disabled when unconfigured" policy —
 * missing keys never crash the app, they just turn the integration off (see the
 * derived `integrations` object at the bottom of this file).
 */

/** Non-negative integer env var with a default. */
function intVar(defaultValue: number, min = 0) {
  return z.preprocess((value) => {
    if (value === undefined || value === "") return defaultValue;
    if (typeof value === "number") return value;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }, z.number().int().min(min));
}

/** Optional secret/string: empty string is treated as "not set". */
const optionalSecret = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  z.string().min(1).optional(),
);

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // --- Threat Intelligence (Threat Pulse) ---
  THREAT_PULSE_ENABLED: boolFlag(true),
  THREAT_PULSE_CACHE_TTL_HOURS: intVar(6, 1),
  THREAT_PULSE_REQUEST_TIMEOUT_MS: intVar(12000, 1000),
  THREAT_PULSE_MAX_CVES: intVar(20, 1),
  PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED: boolFlag(true),
  NVD_API_KEY: optionalSecret,
  SHADOWSERVER_INTEGRATION_ENABLED: boolFlag(false),
  SHADOWSERVER_API_KEY: optionalSecret,

  // --- Google Workspace / Sheets / Forms ---
  GOOGLE_SERVICE_ACCOUNT_EMAIL: optionalSecret,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: optionalSecret,
  GOOGLE_SHEETS_SPREADSHEET_ID: optionalSecret,
  GOOGLE_SHEETS_SHEET_NAME: z
    .string()
    .min(1)
    .default("Leads"),

  // --- LinkedIn API (server-side OAuth) ---
  LINKEDIN_CLIENT_ID: optionalSecret,
  LINKEDIN_CLIENT_SECRET: optionalSecret,
  LINKEDIN_ACCESS_TOKEN: optionalSecret,

  // --- Soro AI content webhook ---
  SORO_WEBHOOK_ENABLED: boolFlag(false),
  SORO_WEBHOOK_API_KEY: optionalSecret,
  SORO_WEBHOOK_SECRET: optionalSecret,
  SORO_PUBLISH_MODE: z.enum(["draft", "publish"]).default("draft"),

  // --- OpenAI Sora video ---
  SORA_VIDEO_ENABLED: boolFlag(false),
  OPENAI_API_KEY: optionalSecret,
  SORA_DAILY_LIMIT: intVar(10, 0),

  // --- Rate limiting ---
  RATE_LIMIT_MAX_REQUESTS: intVar(5, 1),
  RATE_LIMIT_WINDOW_MS: intVar(60000, 1000),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

const parsedServer = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  THREAT_PULSE_ENABLED: process.env.THREAT_PULSE_ENABLED,
  THREAT_PULSE_CACHE_TTL_HOURS: process.env.THREAT_PULSE_CACHE_TTL_HOURS,
  THREAT_PULSE_REQUEST_TIMEOUT_MS: process.env.THREAT_PULSE_REQUEST_TIMEOUT_MS,
  THREAT_PULSE_MAX_CVES: process.env.THREAT_PULSE_MAX_CVES,
  PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED:
    process.env.PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED,
  NVD_API_KEY: process.env.NVD_API_KEY,
  SHADOWSERVER_INTEGRATION_ENABLED: process.env.SHADOWSERVER_INTEGRATION_ENABLED,
  SHADOWSERVER_API_KEY: process.env.SHADOWSERVER_API_KEY,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  GOOGLE_SHEETS_SHEET_NAME: process.env.GOOGLE_SHEETS_SHEET_NAME,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
  LINKEDIN_ACCESS_TOKEN: process.env.LINKEDIN_ACCESS_TOKEN,
  SORO_WEBHOOK_ENABLED: process.env.SORO_WEBHOOK_ENABLED,
  SORO_WEBHOOK_API_KEY: process.env.SORO_WEBHOOK_API_KEY,
  SORO_WEBHOOK_SECRET: process.env.SORO_WEBHOOK_SECRET,
  SORO_PUBLISH_MODE: process.env.SORO_PUBLISH_MODE,
  SORA_VIDEO_ENABLED: process.env.SORA_VIDEO_ENABLED,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SORA_DAILY_LIMIT: process.env.SORA_DAILY_LIMIT,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
});

if (!parsedServer.success) {
  // Fail fast with a readable, aggregated message instead of a cryptic runtime crash.
  throw new Error(formatIssues("server", parsedServer.error));
}

/** Validated server-only environment. */
export const serverEnv: ServerEnv = parsedServer.data;

const googleSheetsConfigured = Boolean(
  serverEnv.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    serverEnv.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
    serverEnv.GOOGLE_SHEETS_SPREADSHEET_ID,
);

/**
 * Derived integration status. Optional integrations are "safely disabled" when
 * their credentials are absent — read these flags instead of re-checking keys.
 */
export const integrations = {
  googleSheets: {
    configured: googleSheetsConfigured,
    email: serverEnv.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // Support literal "\n" sequences in single-line env values.
    privateKey: serverEnv.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    spreadsheetId: serverEnv.GOOGLE_SHEETS_SPREADSHEET_ID,
    sheetName: serverEnv.GOOGLE_SHEETS_SHEET_NAME,
  },
  linkedInApi: {
    configured: Boolean(serverEnv.LINKEDIN_CLIENT_ID && serverEnv.LINKEDIN_ACCESS_TOKEN),
    clientId: serverEnv.LINKEDIN_CLIENT_ID,
    accessToken: serverEnv.LINKEDIN_ACCESS_TOKEN,
  },
  soro: {
    enabled: serverEnv.SORO_WEBHOOK_ENABLED,
    configured:
      serverEnv.SORO_WEBHOOK_ENABLED &&
      Boolean(serverEnv.SORO_WEBHOOK_API_KEY || serverEnv.SORO_WEBHOOK_SECRET),
    publishMode: serverEnv.SORO_PUBLISH_MODE,
    apiKey: serverEnv.SORO_WEBHOOK_API_KEY,
    secret: serverEnv.SORO_WEBHOOK_SECRET,
  },
  sora: {
    enabled: serverEnv.SORA_VIDEO_ENABLED && Boolean(serverEnv.OPENAI_API_KEY),
    dailyLimit: serverEnv.SORA_DAILY_LIMIT,
  },
  shadowserver: {
    enabled:
      serverEnv.SHADOWSERVER_INTEGRATION_ENABLED && Boolean(serverEnv.SHADOWSERVER_API_KEY),
  },
  threatPulse: {
    enabled: serverEnv.THREAT_PULSE_ENABLED,
    cacheTtlHours: serverEnv.THREAT_PULSE_CACHE_TTL_HOURS,
    requestTimeoutMs: serverEnv.THREAT_PULSE_REQUEST_TIMEOUT_MS,
    maxCves: serverEnv.THREAT_PULSE_MAX_CVES,
    attributionEnabled: serverEnv.PUBLIC_THREAT_SOURCES_ATTRIBUTION_ENABLED,
    nvdApiKey: serverEnv.NVD_API_KEY,
  },
} as const;

export { publicEnv };
