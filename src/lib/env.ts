import { z } from "zod";

/**
 * PUBLIC environment variables (client-safe).
 *
 * Everything exported from this file may be inlined into the browser bundle by
 * Next.js, so it MUST be safe to expose publicly. Only `NEXT_PUBLIC_*` variables
 * belong here — NEVER put secrets, API keys, tokens or credentials in this file.
 *
 * Server-only variables live in `src/lib/env.server.ts`, which is guarded with
 * `import "server-only"` so it can never be bundled into client code.
 *
 * Each value below is read with the full literal `process.env.NEXT_PUBLIC_*` key
 * so Next.js can statically replace it in the client build.
 */

/** Parse common truthy/falsy string flags, falling back to a default. */
function boolFlag(defaultValue: boolean) {
  return z.preprocess((value) => {
    if (value === undefined || value === "") return defaultValue;
    if (typeof value === "boolean") return value;
    const normalized = String(value).trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off"].includes(normalized)) return false;
    return value;
  }, z.boolean());
}

/** Optional URL: treats empty string / undefined as "not set". */
const optionalUrl = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  z.string().url().optional(),
);

const publicEnvSchema = z.object({
  // Required (has safe default): absolute site URL used for SEO/canonical links.
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://sprinttech.pl"),
  // Required (has safe default): human-readable site name.
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("SprintTech"),
  // Optional: public LinkedIn company profile URL.
  NEXT_PUBLIC_LINKEDIN_COMPANY_URL: z
    .string()
    .url()
    .default("https://www.linkedin.com/company/sprinttech"),
  // Optional feature flag: load LinkedIn Insight Tag (requires marketing consent).
  NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED: boolFlag(false),
  // Optional feature flag: enable analytics (requires consent).
  NEXT_PUBLIC_ANALYTICS_ENABLED: boolFlag(false),
  // Optional: Google Forms embed URL (lead capture alternative).
  NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL: optionalUrl,
  // Optional: Google Forms fallback (open in new tab) URL.
  NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL: optionalUrl,
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

function formatIssues(scope: string, error: z.ZodError): string {
  const lines = error.issues.map(
    (issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`,
  );
  return `[env] Invalid ${scope} environment configuration:\n${lines.join("\n")}`;
}

const parsedPublic = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_LINKEDIN_COMPANY_URL: process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL,
  NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED:
    process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED,
  NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
  NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL,
  NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL: process.env.NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL,
});

if (!parsedPublic.success) {
  throw new Error(formatIssues("public", parsedPublic.error));
}

/** Validated, client-safe public environment. */
export const publicEnv: PublicEnv = parsedPublic.data;

export { boolFlag, optionalUrl, formatIssues };
