import { z } from "zod";

export const soroWebhookPayloadSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(5).max(200),
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug musi być lowercase z myślnikami"),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(100).max(50000),
  category: z.enum([
    "NIS2",
    "DORA",
    "KSC",
    "Pentesty",
    "SOC",
    "OT/ICS",
    "Cloud Security",
    "Awareness",
  ]),
  tags: z.array(z.string().max(50)).max(10).optional(),
  author: z.string().max(100).optional(),
  status: z.literal("draft").default("draft"),
  metaDescription: z.string().max(160).optional(),
});

export type SoroWebhookPayload = z.infer<typeof soroWebhookPayloadSchema>;
