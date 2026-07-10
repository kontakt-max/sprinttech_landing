import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";
import { caseStudies } from "@/data/caseStudies";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticPages = [
    "",
    "/o-nas",
    "/oferta",
    "/oferta/pentesty",
    "/oferta/audyty",
    "/oferta/soc",
    "/oferta/ot-ics",
    "/oferta/dokumentacja-compliance",
    "/case-study",
    "/artykuly",
    "/kontakt",
    "/polityka-prywatnosci",
    "/cookies",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-study/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/artykuly/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...articleEntries];
}
