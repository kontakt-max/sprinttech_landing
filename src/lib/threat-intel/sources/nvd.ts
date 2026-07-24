import { getNvdApiKey } from "@/lib/env";
import type { ThreatVulnerability } from "../types";
import { normalizeSeverity, truncateTitle } from "../normalize";
import { getCached, setCache, getCacheTtlHours, getRequestTimeout } from "../cache";
import { FALLBACK_CVES } from "../fallback";

const NVD_BASE = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const FETCH_TIMEOUT = getRequestTimeout();
const USER_AGENT = "SprintTech-ThreatPulse/1.0 (security research; kontakt@sprinttech.pl)";

interface NvdCveItem {
  cve?: {
    id?: string;
    descriptions?: { lang: string; value: string }[];
    published?: string;
    lastModified?: string;
    metrics?: {
      cvssMetricV31?: { cvssData?: { baseScore?: number; baseSeverity?: string } }[];
      cvssMetricV30?: { cvssData?: { baseScore?: number; baseSeverity?: string } }[];
    };
    cisaActionDue?: string;
    cisaExploitAdd?: string;
    cisaRequiredAction?: string;
  };
}

interface NvdResponse {
  vulnerabilities?: NvdCveItem[];
  totalResults?: number;
}

function mapSeverity(score: number | undefined, label: string | undefined): ThreatVulnerability["severity"] {
  return normalizeSeverity(score, label);
}

function parseNvdItem(item: NvdCveItem): ThreatVulnerability | null {
  const cve = item.cve;
  if (!cve?.id) return null;

  const cvssData =
    cve.metrics?.cvssMetricV31?.[0]?.cvssData ??
    cve.metrics?.cvssMetricV30?.[0]?.cvssData;

  const desc = cve.descriptions?.find((d) => d.lang === "en")?.value ?? "No description";

  return {
    cve: cve.id,
    title: truncateTitle(desc),
    severity: mapSeverity(cvssData?.baseScore, cvssData?.baseSeverity),
    cvss: cvssData?.baseScore ?? null,
    epss: null,
    percentile: null,
    kev: Boolean(cve.cisaExploitAdd || cve.cisaActionDue),
    published: cve.published ?? new Date().toISOString(),
    lastModified: cve.lastModified ?? new Date().toISOString(),
    sourceIds: ["nvd"],
  };
}

const FALLBACK_CVES_LOCAL = FALLBACK_CVES;

async function fetchWithTimeout(url: string, headers: Record<string, string>): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, { headers, signal: controller.signal, next: { revalidate: 21600 } });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchRecentCves(days = 7): Promise<{
  vulnerabilities: ThreatVulnerability[];
  status: "ok" | "cached" | "fallback" | "error";
  fetchedAt: string | null;
}> {
  const cacheKey = `nvd:recent:${days}`;
  const cached = getCached<ThreatVulnerability[]>(cacheKey);
  if (cached) {
    return { vulnerabilities: cached, status: "cached", fetchedAt: new Date().toISOString() };
  }

  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    pubStartDate: start.toISOString(),
    pubEndDate: end.toISOString(),
    resultsPerPage: "20",
  });

  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  const apiKey = getNvdApiKey();
  if (apiKey) headers["apiKey"] = apiKey;

  try {
    const res = await fetchWithTimeout(`${NVD_BASE}?${params}`, headers);
    if (res.status === 429 || !res.ok) {
      return { vulnerabilities: FALLBACK_CVES_LOCAL, status: "fallback", fetchedAt: null };
    }

    const data = (await res.json()) as NvdResponse;
    const parsed = (data.vulnerabilities ?? [])
      .map(parseNvdItem)
      .filter((v): v is ThreatVulnerability => v !== null)
      .filter((v) => v.severity === "CRITICAL" || v.severity === "HIGH")
      .slice(0, 10);

    if (parsed.length === 0) {
      return { vulnerabilities: FALLBACK_CVES_LOCAL, status: "fallback", fetchedAt: null };
    }

    setCache(cacheKey, parsed, getCacheTtlHours());
    return { vulnerabilities: parsed, status: "ok", fetchedAt: new Date().toISOString() };
  } catch {
    return { vulnerabilities: FALLBACK_CVES, status: "fallback", fetchedAt: null };
  }
}

export async function enrichWithKev(
  vulns: ThreatVulnerability[]
): Promise<ThreatVulnerability[]> {
  return vulns;
}
