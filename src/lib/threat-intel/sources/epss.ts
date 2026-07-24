import type { ThreatVulnerability } from "../types";
import { getCached, setCache, getCacheTtlHours, getRequestTimeout } from "../cache";

const EPSS_API = "https://api.first.org/data/v1/epss";
const FETCH_TIMEOUT = getRequestTimeout();
const USER_AGENT = "SprintTech-ThreatPulse/1.0 (security research; kontakt@sprinttech.pl)";

interface EpssItem {
  cve: string;
  epss: string;
  percentile: string;
}

interface EpssResponse {
  data?: EpssItem[];
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
      next: { revalidate: 21600 },
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchTopEpss(limit = 10): Promise<{
  scores: Map<string, { epss: number; percentile: number }>;
  status: "ok" | "cached" | "fallback" | "error";
  fetchedAt: string | null;
}> {
  const cacheKey = `epss:top:${limit}`;
  const cached = getCached<Map<string, { epss: number; percentile: number }>>(cacheKey);
  if (cached) {
    return { scores: cached, status: "cached", fetchedAt: new Date().toISOString() };
  }

  try {
    const res = await fetchWithTimeout(`${EPSS_API}?limit=${limit}&sort=-epss`);
    if (!res.ok) {
      return { scores: new Map(), status: "fallback", fetchedAt: null };
    }

    const data = (await res.json()) as EpssResponse;
    const scores = new Map<string, { epss: number; percentile: number }>();

    for (const item of data.data ?? []) {
      scores.set(item.cve, {
        epss: parseFloat(item.epss),
        percentile: parseFloat(item.percentile),
      });
    }

    setCache(cacheKey, scores, getCacheTtlHours());
    return { scores, status: "ok", fetchedAt: new Date().toISOString() };
  } catch {
    return { scores: new Map(), status: "fallback", fetchedAt: null };
  }
}

export function mergeEpssIntoVulns(
  vulns: ThreatVulnerability[],
  scores: Map<string, { epss: number; percentile: number }>
): ThreatVulnerability[] {
  return vulns.map((v) => {
    const epss = scores.get(v.cve);
    if (!epss) return v;
    return {
      ...v,
      epss: epss.epss,
      percentile: epss.percentile,
      sourceIds: [...new Set([...v.sourceIds, "epss"])],
    };
  });
}

export async function fetchEpssEnrichedVulns(
  vulns: ThreatVulnerability[]
): Promise<{ vulns: ThreatVulnerability[]; status: "ok" | "cached" | "fallback" | "error"; fetchedAt: string | null }> {
  const { scores, status, fetchedAt } = await fetchTopEpss(50);
  if (scores.size === 0) return { vulns, status, fetchedAt };
  return { vulns: mergeEpssIntoVulns(vulns, scores), status, fetchedAt };
}
