import { NextResponse } from "next/server";
import { aggregateThreatPulse } from "@/lib/threat-intel/aggregate";
import { buildFallbackResponse } from "@/lib/threat-intel/fallback";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";
import { getSecurityHeaders } from "@/lib/security/headers";
import {
  threatPulseResponseSchema,
  assertNoPiiInResponse,
  assertNoRawIndicators,
} from "@/lib/validation/threatPulse";
import { isThreatAttributionEnabled } from "@/lib/env";

export const revalidate = 21600;

export async function GET(request: Request) {
  const attributionEnabled = isThreatAttributionEnabled();
  const ip = getClientIp(request);
  const limit = rateLimit(`threat-pulse:${ip}`);

  if (!limit.success) {
    const fallback = buildFallbackResponse(
      new Date().toISOString(),
      attributionEnabled,
      "error"
    );
    return NextResponse.json(fallback, {
      status: 200,
      headers: {
        ...getSecurityHeaders(),
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
      },
    });
  }

  try {
    const data = await aggregateThreatPulse();
    const parsed = threatPulseResponseSchema.safeParse(data);

    if (
      !parsed.success ||
      !assertNoPiiInResponse(parsed.data) ||
      !assertNoRawIndicators(parsed.data)
    ) {
      const fallback = buildFallbackResponse(
        new Date().toISOString(),
        attributionEnabled,
        "error"
      );
      return NextResponse.json(fallback, {
        status: 200,
        headers: {
          ...getSecurityHeaders(),
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      });
    }

    return NextResponse.json(parsed.data, {
      status: 200,
      headers: {
        ...getSecurityHeaders(),
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
      },
    });
  } catch {
    const fallback = buildFallbackResponse(
      new Date().toISOString(),
      attributionEnabled,
      "error"
    );
    return NextResponse.json(fallback, {
      status: 200,
      headers: {
        ...getSecurityHeaders(),
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  }
}
