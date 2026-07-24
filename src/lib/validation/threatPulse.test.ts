import { describe, it, expect } from "vitest";
import {
  threatPulseResponseSchema,
  assertNoPiiInResponse,
  assertNoRawIndicators,
} from "@/lib/validation/threatPulse";
import { buildFallbackResponse } from "@/lib/threat-intel/fallback";

describe("threatPulseResponseSchema", () => {
  it("validates fallback response shape", () => {
    const data = buildFallbackResponse(new Date().toISOString(), true, "error");
    const parsed = threatPulseResponseSchema.safeParse(data);
    expect(parsed.success).toBe(true);
  });

  it("rejects invalid CVE format", () => {
    const data = buildFallbackResponse(new Date().toISOString(), true, "error");
    const invalid = {
      ...data,
      vulnerabilities: [{ ...data.vulnerabilities[0], cve: "INVALID" }],
    };
    expect(threatPulseResponseSchema.safeParse(invalid).success).toBe(false);
  });
});

describe("PII and indicator guards", () => {
  it("fallback response contains no PII", () => {
    const data = buildFallbackResponse(new Date().toISOString(), true, "error");
    const parsed = threatPulseResponseSchema.parse(data);
    expect(assertNoPiiInResponse(parsed)).toBe(true);
  });

  it("fallback response contains no raw indicators", () => {
    const data = buildFallbackResponse(new Date().toISOString(), true, "error");
    const parsed = threatPulseResponseSchema.parse(data);
    expect(assertNoRawIndicators(parsed)).toBe(true);
  });
});
