import { NextResponse } from "next/server";
import { getSecurityHeaders } from "@/lib/security/headers";
import { logIntegrationEvent } from "@/lib/integrations/helpers";

/**
 * Placeholder for LinkedIn OAuth share API.
 * Does NOT publish content without proper OAuth 2.0 authorization.
 * Share buttons on the frontend use LinkedIn's public share URL instead.
 */
export async function POST(request: Request) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  if (!clientId || !accessToken) {
    logIntegrationEvent("linkedin", "api_not_configured");
    return NextResponse.json(
      {
        error: "Not Implemented",
        message:
          "LinkedIn API integration requires OAuth 2.0 setup. Use LinkedInShareButton for client-side sharing.",
      },
      { status: 501, headers: getSecurityHeaders() }
    );
  }

  try {
    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("url" in body) ||
      typeof (body as { url: unknown }).url !== "string"
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Placeholder — actual LinkedIn API call would require ugcPosts scope and moderation
    logIntegrationEvent("linkedin", "share_requested", {
      urlHost: new URL((body as { url: string }).url).hostname,
    });

    return NextResponse.json(
      {
        success: false,
        message: "Server-side LinkedIn publishing requires explicit approval workflow.",
      },
      { status: 501, headers: getSecurityHeaders() }
    );
  } catch {
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
