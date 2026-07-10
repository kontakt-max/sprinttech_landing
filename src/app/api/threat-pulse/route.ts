import { NextResponse } from "next/server";
import { aggregateThreatPulse } from "@/lib/threat-intel/aggregate";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";
import { getSecurityHeaders } from "@/lib/security/headers";
import { threatPulseResponseSchema, assertNoPiiInResponse } from "@/lib/validation/threatPulse";

export const revalidate = 21600; // 6 hours

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`threat-pulse:${ip}`);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: getSecurityHeaders() }
    );
  }

  try {
    const data = await aggregateThreatPulse();
    const parsed = threatPulseResponseSchema.safeParse(data);

    if (!parsed.success || !assertNoPiiInResponse(data)) {
      return NextResponse.json(
        { error: "Invalid response shape" },
        { status: 500, headers: getSecurityHeaders() }
      );
    }

    return NextResponse.json(parsed.data, {
      status: 200,
      headers: {
        ...getSecurityHeaders(),
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Threat pulse unavailable" },
      { status: 503, headers: getSecurityHeaders() }
    );
  }
}
