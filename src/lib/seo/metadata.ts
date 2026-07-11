import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/utils";
import { publicEnv } from "@/lib/env";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSEOProps): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | SprintTech`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "cyberbezpieczeństwo",
      "pentesty",
      "audyty",
      "SOC",
      "NIS2",
      "DORA",
      "KSC",
      "ISO 27001",
      "OT/ICS",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "SprintTech",
      locale: "pl_PL",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SprintTech",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Wyspecjalizowana spółka cyberbezpieczeństwa oferująca pentesty, audyty, SOC, compliance i bezpieczeństwo OT/ICS.",
    parentOrganization: {
      "@type": "Organization",
      name: "Sprint SA",
    },
    areaServed: "PL",
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "SOC",
      "NIS2",
      "DORA",
      "ISO 27001",
      "OT/ICS Security",
    ],
    sameAs: [publicEnv.NEXT_PUBLIC_LINKEDIN_COMPANY_URL],
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "SprintTech",
      url: siteUrl,
    },
    areaServed: "PL",
    url: `${siteUrl}${path}`,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  category: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "SprintTech",
    },
    publisher: {
      "@type": "Organization",
      name: "SprintTech",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/artykuly/${article.slug}`,
    articleSection: article.category,
  };
}
