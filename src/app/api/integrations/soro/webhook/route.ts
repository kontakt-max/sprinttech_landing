import { NextResponse } from "next/server";
import { soroWebhookPayloadSchema } from "@/lib/validation/integrations";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";
import {
  verifyApiKey,
  verifyWebhookSignature,
  saveDraftArticle,
  logIntegrationEvent,
} from "@/lib/integrations/helpers";
import { getSecurityHeaders } from "@/lib/security/headers";
import { integrations } from "@/lib/env.server";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`soro-webhook:${ip}`);

  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const apiKey = integrations.soro.apiKey;
  const secret = integrations.soro.secret;

  if (!integrations.soro.configured) {
    logIntegrationEvent("soro", "webhook_disabled");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503, headers: getSecurityHeaders() }
    );
  }

  const rawBody = await request.text();

  const signature = request.headers.get("x-webhook-signature");
  const apiKeyValid = verifyApiKey(request, apiKey);
  const signatureValid = verifyWebhookSignature(rawBody, signature, secret);

  if (!apiKeyValid && !signatureValid) {
    logIntegrationEvent("soro", "auth_failed", { ip: "redacted" });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = JSON.parse(rawBody);
    const parsed = soroWebhookPayloadSchema.safeParse(body);

    if (!parsed.success) {
      logIntegrationEvent("soro", "validation_failed");
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const payload = { ...parsed.data, status: "draft" as const };
    const filename = await saveDraftArticle(payload);

    logIntegrationEvent("soro", "draft_saved", {
      slug: payload.slug,
      category: payload.category,
      filename,
    });

    return NextResponse.json(
      {
        success: true,
        mode: "draft-only",
        message: "Content saved as draft. Manual review required before publish.",
        filename,
      },
      { status: 201, headers: getSecurityHeaders() }
    );
  } catch {
    logIntegrationEvent("soro", "processing_error");
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
