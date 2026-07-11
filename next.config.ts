import type { NextConfig } from "next";
import { getSecurityHeaders } from "./src/lib/security/headers";
import { publicEnv } from "./src/lib/env";

const globalSecurityHeaders = getSecurityHeaders({
  allowGoogleForms: Boolean(publicEnv.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL),
  allowLinkedIn: publicEnv.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED,
  allowAnalytics: publicEnv.NEXT_PUBLIC_ANALYTICS_ENABLED,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: Object.entries(globalSecurityHeaders).map(([key, value]) => ({
          key,
          value,
        })),
      },
    ];
  },
};

export default nextConfig;
