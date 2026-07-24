import Link from "next/link";
import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { articles, articleCategories } from "@/data/articles";
import { LinkedInShareButton } from "@/components/LinkedInShareButton";
import { getSiteUrl } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Artykuły i blog",
  description:
    "Eksperckie artykuły o NIS2, DORA, KSC, pentestach, SOC, OT/ICS i cloud security. Wiedza od praktyków cyberbezpieczeństwa.",
  path: "/artykuly",
});

export default function ArticlesPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "Artykuły", path: "/artykuly" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Artykuły</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Ekspercka wiedza o regulacjach, testach bezpieczeństwa, monitoringu SOC i ochronie
            środowisk OT. Praktyczne porady dla CISO, zarządów i zespołów technicznych.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {articleCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="glass-panel-hover flex flex-col p-6">
                <span className="text-xs font-medium text-cyber-cyan">{article.category}</span>
                <h2 className="mt-2 text-lg font-semibold leading-snug">
                  <Link href={`/artykuly/${article.slug}`} className="hover:text-cyber-cyan">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm text-white/70">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("pl-PL")} · {article.readTime} min
                  </span>
                  <LinkedInShareButton
                    variant="icon"
                    url={`${getSiteUrl()}/artykuly/${article.slug}`}
                    title={article.title}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
