import type { ThreatVulnerability } from "./types";

export function normalizeSeverity(
  score: number | undefined,
  label: string | undefined
): ThreatVulnerability["severity"] {
  if (label) {
    const u = label.toUpperCase();
    if (["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(u)) {
      return u as ThreatVulnerability["severity"];
    }
  }
  if (score === undefined) return "UNKNOWN";
  if (score >= 9) return "CRITICAL";
  if (score >= 7) return "HIGH";
  if (score >= 4) return "MEDIUM";
  return "LOW";
}

export function truncateTitle(text: string, max = 200): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function determineMode(
  nvdStatus: string,
  epssStatus: string
): "live" | "fallback" | "partial" {
  const ok = (s: string) => s === "ok" || s === "cached";
  if (ok(nvdStatus) && ok(epssStatus)) return "live";
  if (nvdStatus === "fallback" && epssStatus === "fallback") return "fallback";
  return "partial";
}

export function containsPii(json: string): boolean {
  const patterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  ];
  return patterns.some((p) => p.test(json));
}
