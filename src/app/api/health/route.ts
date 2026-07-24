import { NextResponse } from "next/server";
import { getIntegrationHealth, isDevelopment } from "@/lib/env";
import { getSecurityHeaders } from "@/lib/security/headers";

export async function GET() {
  const integrations = getIntegrationHealth();

  return NextResponse.json(
    {
      status: "ok",
      app: "sprinttech-website",
      environment: isDevelopment() ? "development" : "production",
      integrations,
    },
    {
      status: 200,
      headers: getSecurityHeaders(),
    }
  );
}
