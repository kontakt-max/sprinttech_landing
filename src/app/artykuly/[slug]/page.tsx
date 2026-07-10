import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, articles } from "@/data/articles";
import { createPageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { LinkedInShareButton } from "@/components/LinkedInShareButton";
import { getSiteUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/artykuly/${slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = [
    articleJsonLd({
      title: article.title,
      description: article.excerpt,
      slug: article.slug,
      publishedAt: article.publishedAt,
      category: article.category,
    }),
    breadcrumbJsonLd([
      { name: "Strona główna", path: "/" },
      { name: "Artykuły", path: "/artykuly" },
      { name: article.title, path: `/artykuly/${slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="section-padding pt-28">
        <div className="container-wide max-w-3xl">
          <Link href="/artykuly" className="text-sm text-cyber-cyan hover:underline">
            ← Wszystkie artykuły
          </Link>
          <span className="mt-4 block text-sm text-cyber-cyan">{article.category}</span>
          <h1 className="mt-2 heading-display text-3xl">{article.title}</h1>
          <p className="mt-4 text-white/50 text-sm">
            {new Date(article.publishedAt).toLocaleDateString("pl-PL")} · {article.readTime} min czytania
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/50">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <LinkedInShareButton
              url={`${getSiteUrl()}/artykuly/${slug}`}
              title={article.title}
            />
          </div>
          <div className="mt-10 prose prose-invert max-w-none">
            <p className="text-lg text-white/80 leading-relaxed">{article.excerpt}</p>
            <p className="mt-6 text-white/70 leading-relaxed">
              Pełna treść artykułu będzie dostępna wkrótce. W międzyczasie zapraszamy do kontaktu
              z naszymi ekspertami w obszarze {article.category} — chętnie omówimy temat
              na konsultacji dopasowanej do Twojej organizacji.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
