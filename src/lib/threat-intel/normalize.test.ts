import { describe, it, expect } from "vitest";
import {
  normalizeSeverity,
  truncateTitle,
  determineMode,
  containsPii,
} from "@/lib/threat-intel/normalize";

describe("normalizeSeverity", () => {
  it("maps CVSS scores to severity bands", () => {
    expect(normalizeSeverity(9.8, undefined)).toBe("CRITICAL");
    expect(normalizeSeverity(7.5, undefined)).toBe("HIGH");
    expect(normalizeSeverity(5, undefined)).toBe("MEDIUM");
    expect(normalizeSeverity(2, undefined)).toBe("LOW");
  });

  it("prefers explicit label when provided", () => {
    expect(normalizeSeverity(undefined, "HIGH")).toBe("HIGH");
  });
});

describe("truncateTitle", () => {
  it("truncates long titles", () => {
    const long = "a".repeat(250);
    expect(truncateTitle(long).length).toBeLessThanOrEqual(200);
  });
});

describe("determineMode", () => {
  it("returns live when both sources ok", () => {
    expect(determineMode("ok", "ok")).toBe("live");
    expect(determineMode("cached", "ok")).toBe("live");
  });

  it("returns fallback when both fallback", () => {
    expect(determineMode("fallback", "fallback")).toBe("fallback");
  });

  it("returns partial otherwise", () => {
    expect(determineMode("ok", "fallback")).toBe("partial");
    expect(determineMode("error", "ok")).toBe("partial");
  });
});

describe("containsPii", () => {
  it("detects email and IP patterns", () => {
    expect(containsPii('{"email":"user@example.com"}')).toBe(true);
    expect(containsPii('{"ip":"192.168.1.1"}')).toBe(true);
    expect(containsPii('{"cve":"CVE-2024-1234"}')).toBe(false);
  });
});
