import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createHmac, timingSafeEqual } from "crypto";
import type { SoroWebhookPayload } from "@/lib/validation/integrations";

export async function saveDraftArticle(payload: SoroWebhookPayload): Promise<string> {
  const draftsDir = path.join(process.cwd(), "content", "drafts");
  await mkdir(draftsDir, { recursive: true });

  const filename = `${payload.slug}-${Date.now()}.json`;
  const filepath = path.join(draftsDir, filename);

  const draft = {
    ...payload,
    status: "draft" as const,
    receivedAt: new Date().toISOString(),
    published: false,
  };

  await writeFile(filepath, JSON.stringify(draft, null, 2), "utf-8");
  return filename;
}

export function logIntegrationEvent(
  integration: string,
  event: string,
  metadata?: Record<string, string>
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    integration,
    event,
    ...metadata,
  };
  console.info("[integration]", JSON.stringify(logEntry));
}

export function verifyApiKey(
  request: Request,
  envKey: string | undefined
): boolean {
  if (!envKey) return false;
  const headerKey = request.headers.get("x-api-key");
  const authHeader = request.headers.get("authorization");
  if (headerKey === envKey) return true;
  if (authHeader === `Bearer ${envKey}`) return true;
  return false;
}

export function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string | undefined
): boolean {
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
