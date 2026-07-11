export function buildCSP(options?: {
  allowGoogleForms?: boolean;
  allowLinkedIn?: boolean;
  allowAnalytics?: boolean;
}): string {
  const isDev = process.env.NODE_ENV !== "production";

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // In development, Next.js React Fast Refresh evaluates code with eval(),
    // and HMR uses a same-origin WebSocket — both require relaxing the CSP.
    // Production keeps the strict policy (no 'unsafe-eval').
    "script-src": isDev
      ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
      : ["'self'", "'unsafe-inline'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", "https://www.linkedin.com"],
    "font-src": ["'self'"],
    "connect-src": isDev ? ["'self'", "ws:", "wss:"] : ["'self'"],
    "frame-src": ["'none'"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
    "upgrade-insecure-requests": [],
  };

  if (options?.allowGoogleForms) {
    directives["frame-src"] = ["https://docs.google.com"];
    directives["connect-src"].push("https://docs.google.com");
  }

  if (options?.allowLinkedIn) {
    directives["script-src"].push("https://snap.licdn.com");
    directives["connect-src"].push("https://px.ads.linkedin.com");
    directives["img-src"].push("https://px.ads.linkedin.com");
  }

  if (options?.allowAnalytics) {
    directives["connect-src"].push("https://www.google-analytics.com");
    directives["script-src"].push("https://www.googletagmanager.com");
  }

  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(" ")}`;
    })
    .join("; ");
}

export function getSecurityHeaders(options?: {
  allowGoogleForms?: boolean;
  allowLinkedIn?: boolean;
  allowAnalytics?: boolean;
}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Security-Policy": buildCSP(options),
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    "X-DNS-Prefetch-Control": "on",
  };

  if (process.env.NODE_ENV === "production") {
    headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload";
  }

  return headers;
}
