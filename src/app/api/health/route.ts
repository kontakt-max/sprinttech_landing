import { NextResponse } from "next/server";
import { serverEnv, integrations, publicEnv } from "@/lib/env.server";
import { getSecurityHeaders } from "@/lib/security/headers";

/**
 * Lightweight health/status endpoint.
 *
 * Reports integration status derived purely from configuration. It MUST NOT
 * expose any secret, token, private key, spreadsheet ID or service-account
 * address — only coarse enabled/disabled flags.
 */
export async function GET() {
  const status = (on: boolean) => (on ? "enabled" : "disabled");

  return NextResponse.json(
    {
      status: "ok",
      app: "sprinttech-website",
      environment: serverEnv.NODE_ENV,
      integrations: {
        threatPulse: status(integrations.threatPulse.enabled),
        googleSheets: status(integrations.googleSheets.configured),
        soroSeo: status(integrations.soro.configured),
        linkedinInsight: status(publicEnv.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED),
      },
    },
    { status: 200, headers: getSecurityHeaders() },
  );
}
