import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";

export const metadata = createPageMetadata({
  title: "Case Study",
  description:
    "Anonimowe studia przypadków: audyty NIS2, segmentacja OT, pentesty DORA, SOC i dokumentacja SZBI. Konkretne wyniki i metryki.",
  path: "/case-study",
});

export default function CaseStudyListingPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "Case Study", path: "/case-study" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Case Study</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Anonimowe studia przypadków z sektora publicznego, przemysłu, finansów i ochrony zdrowia.
            Każdy case opisuje kontekst, wyzwanie, podejście, rezultaty i dalsze kroki — bez ujawniania danych wrażliwych.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} featured />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
