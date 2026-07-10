import type { NextConfig } from "next";
import { getSecurityHeaders } from "./src/lib/security/headers";

const globalSecurityHeaders = getSecurityHeaders({
  allowGoogleForms: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL ? true : false,
  allowLinkedIn: process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED === "true",
  allowAnalytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
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
