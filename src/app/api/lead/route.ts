import { NextResponse } from "next/server";
import { leadFormSchema, leadQualificationSchema } from "@/lib/validation/lead";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";
import { appendLeadToSheet } from "@/lib/integrations/google-sheets";
import { sanitizeText } from "@/lib/utils";
import { getSecurityHeaders } from "@/lib/security/headers";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`lead:${ip}`);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Zbyt wiele żądań. Spróbuj ponownie później." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
          ...getSecurityHeaders(),
        },
      }
    );
  }

  try {
    const body: unknown = await request.json();

    if (typeof body === "object" && body !== null && "website" in body) {
      const honeypot = (body as { website?: string }).website;
      if (honeypot && honeypot.length > 0) {
        return NextResponse.json({ success: true, id: "ok" });
      }
    }

    const source =
      typeof body === "object" && body !== null && "source" in body
        ? String((body as { source?: string }).source ?? "website")
        : "website";

    const parsed = leadFormSchema.safeParse(body);
    if (!parsed.success) {
      const qualParsed = leadQualificationSchema.safeParse(body);
      if (!qualParsed.success) {
        return NextResponse.json(
          { error: "Nieprawidłowe dane formularza", details: parsed.error.flatten() },
          { status: 400, headers: getSecurityHeaders() }
        );
      }
      const qual = qualParsed.data;
      const mappedData = {
        name: qual.name,
        company: qual.company,
        email: qual.email,
        phone: "",
        industry: "Inna",
        companySize: "1–49 pracowników",
        interestArea: "Compliance" as const,
        regulatedBy: [qual.regulation.toUpperCase()],
        message: `Zapytanie o gotowość regulacyjną: ${qual.regulation}`,
        consentContact: qual.consentContact,
        consentPrivacy: qual.consentPrivacy,
        website: qual.website,
      };
      const fullCheck = leadFormSchema.safeParse(mappedData);
      if (!fullCheck.success) {
        return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
      }
      const result = await appendLeadToSheet(fullCheck.data, source);
      if (!result.success) {
        return NextResponse.json({ error: result.error ?? "Błąd zapisu" }, { status: 500 });
      }
      return NextResponse.json({ success: true, id: result.id }, { status: 201 });
    }

    const data = {
      ...parsed.data,
      name: sanitizeText(parsed.data.name),
      company: sanitizeText(parsed.data.company),
      message: sanitizeText(parsed.data.message),
      phone: parsed.data.phone ? sanitizeText(parsed.data.phone) : "",
    };

    const result = await appendLeadToSheet(data, source);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? "Błąd zapisu" },
        { status: 500, headers: getSecurityHeaders() }
      );
    }

    return NextResponse.json(
      { success: true, id: result.id },
      { status: 201, headers: getSecurityHeaders() }
    );
  } catch {
    return NextResponse.json(
      { error: "Wystąpił błąd serwera" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
