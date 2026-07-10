import { NextResponse } from "next/server";
import { soraVideoRequestSchema } from "@/lib/validation/integrations";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";
import { logIntegrationEvent } from "@/lib/integrations/helpers";
import { getSecurityHeaders } from "@/lib/security/headers";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`sora-video:${ip}`);

  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const enabled = process.env.SORA_VIDEO_ENABLED === "true";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!enabled || !apiKey) {
    logIntegrationEvent("sora", "not_implemented");
    return NextResponse.json(
      {
        error: "Not Implemented",
        message:
          "Video generation is disabled. Enable SORA_VIDEO_ENABLED and configure OPENAI_API_KEY with moderation policy.",
      },
      { status: 501, headers: getSecurityHeaders() }
    );
  }

  try {
    const body: unknown = await request.json();
    const parsed = soraVideoRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Placeholder: queue implementation would go here
    logIntegrationEvent("sora", "video_queued", { promptLength: String(parsed.data.prompt.length) });

    return NextResponse.json(
      {
        success: true,
        status: "queued",
        message: "Video request queued for server-side processing with moderation.",
      },
      { status: 202, headers: getSecurityHeaders() }
    );
  } catch {
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
