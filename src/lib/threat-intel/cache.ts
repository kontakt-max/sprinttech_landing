import { serverEnv } from "@/lib/env.server";

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttlHours: number): void {
  store.set(key, {
    data,
    expiresAt: Date.now() + ttlHours * 60 * 60 * 1000,
  });
}

export function getCacheTtlHours(): number {
  return serverEnv.THREAT_PULSE_CACHE_TTL_HOURS;
}

export function isThreatPulseEnabled(): boolean {
  return serverEnv.THREAT_PULSE_ENABLED;
}
