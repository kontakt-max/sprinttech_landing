import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, caseStudies } from "@/data/caseStudies";
import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { LinkedInShareButton } from "@/components/LinkedInShareButton";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getSiteUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return createPageMetadata({
    title: study.title,
    description: study.excerpt,
    path: `/case-study/${slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "Case Study", path: "/case-study" },
    { name: study.title, path: `/case-study/${slug}` },
  ]);

  const shareUrl = `${getSiteUrl()}/case-study/${slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <article className="section-padding pt-28">
        <div className="container-wide max-w-4xl">
          <Link href="/case-study" className="text-sm text-cyber-cyan hover:underline">
            ← Wszystkie case studies
          </Link>
          <p className="mt-4 text-sm text-cyber-cyan">{study.sector}</p>
          <h1 className="mt-2 heading-display text-3xl">{study.title}</h1>
          <p className="mt-4 text-lg text-white/70">{study.excerpt}</p>
          <div className="mt-6">
            <LinkedInShareButton url={shareUrl} title={study.title} />
          </div>
        </div>
      </article>

      <AnimatedSection className="section-padding">
        <div className="container-wide max-w-4xl space-y-10">
          <section>
            <h2 className="heading-section text-xl">Kontekst</h2>
            <p className="mt-4 text-white/70 leading-relaxed">{study.context}</p>
          </section>
          <section>
            <h2 className="heading-section text-xl">Wyzwanie</h2>
            <p className="mt-4 text-white/70 leading-relaxed">{study.challenge}</p>
          </section>
          <section>
            <h2 className="heading-section text-xl">Podejście</h2>
            <ul className="mt-4 space-y-2">
              {study.approach.map((a) => (
                <li key={a} className="text-white/70 before:mr-2 before:text-cyber-cyan before:content-['▸']">
                  {a}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="heading-section text-xl">Zakres</h2>
            <ul className="mt-4 space-y-2">
              {study.scope.map((s) => (
                <li key={s} className="text-white/70 before:mr-2 before:text-cyber-cyan before:content-['▸']">
                  {s}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="heading-section text-xl">Rezultaty</h2>
            <ul className="mt-4 space-y-2">
              {study.results.map((r) => (
                <li key={r} className="text-white/70 before:mr-2 before:text-cyber-green before:content-['✓']">
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="heading-section text-xl">Metryki</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {study.metrics.map((m) => (
                <div key={m.label} className="glass-panel p-4">
                  <div className="text-2xl font-bold text-cyber-cyan">{m.value}</div>
                  <div className="text-sm text-white/60">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="heading-section text-xl">Co klient otrzymał</h2>
            <ul className="mt-4 space-y-2">
              {study.deliverables.map((d) => (
                <li key={d} className="text-white/70">{d}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="heading-section text-xl">Dalsze kroki</h2>
            <ul className="mt-4 space-y-2">
              {study.nextSteps.map((n) => (
                <li key={n} className="text-white/70">{n}</li>
              ))}
            </ul>
          </section>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide text-center">
          <Link href="/kontakt" className="btn-primary inline-flex">Porozmawiajmy o podobnym projekcie</Link>
        </div>
      </AnimatedSection>
    </>
  );
}
