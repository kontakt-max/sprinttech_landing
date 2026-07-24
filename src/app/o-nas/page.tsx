import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SecurityBadges } from "@/components/SecurityBadges";
import { CapabilityMatrix } from "@/components/CapabilityMatrix";
import { companyInfo, timelineEvents } from "@/data/company";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "O nas",
  description:
    "SprintTech — wyspecjalizowana spółka cyberbezpieczeństwa w grupie Sprint SA. Zespół inżynierów, audytorów, pentesterów i operatorów SOC. ISO/IEC 27001:2022.",
  path: "/o-nas",
});

export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "O nas", path: "/o-nas" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">O SprintTech</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            {companyInfo.name} to wyspecjalizowana spółka cyberbezpieczeństwa w grupie{" "}
            {companyInfo.parent}, skupiona wyłącznie na budowaniu cyberodporności organizacji,
            które nie mogą pozwolić sobie na przestój operacyjny ani formalną zgodność bez realnej ochrony.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-section">Misja i podejście</h2>
            <p className="mt-4 text-white/70">
              Naszą misją jest realna cyberodporność — nie tylko zgodność formalna z regulacjami.
              Wierzymy, że bezpieczeństwo informacji to ciągły proces: ocena ryzyka, kontrolowane testy,
              remediacja, monitoring i doskonalenie. Każdy raport, który dostarczamy, ma dwa odbiorców:
              zarząd (ryzyko biznesowe, priorytety, budżet) i zespoły techniczne (konkretne kroki remediacji).
            </p>
            <p className="mt-4 text-white/70">
              Posiadamy certyfikat ISO/IEC 27001:2022 w zakresie audytów bezpieczeństwa IT,
              testów penetracyjnych i usług Security Operations Center. To potwierdzenie systemowego
              podejścia do bezpieczeństwa informacji — te same standardy stosujemy u naszych klientów.
            </p>
          </div>
          <div>
            <h2 className="heading-section">Nasz zespół</h2>
            <p className="mt-4 text-white/70">
              Tworzą go inżynierowie bezpieczeństwa, audytorzy z doświadczeniem certyfikacyjnym,
              pentesterzy (OSCP, CEH, GXPN) i operatorzy SOC z praktyką w SIEM, EDR i reagowaniu na incydenty.
              Łączymy kompetencje IT i OT — wielu z nas pracowało w środowiskach przemysłowych,
              finansowych i infrastruktury krytycznej.
            </p>
            <SecurityBadges compact />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <h2 className="heading-section">Mocne strony</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Kompetencje IT i OT",
                text: "Pentesty sieci przemysłowych, modernizacja OT wg IEC 62443 i audyty infrastruktury krytycznej — bez kompromisów w kwestii bezpieczeństwa operacyjnego.",
              },
              {
                title: "Środowiska regulowane",
                text: "DORA, NIS2, KSC, KNF, ISO 27001, Polish Cloud 2.0 — znamy wymagania i wiemy, jakie dowody oczekują audytorzy i organy nadzoru.",
              },
              {
                title: "Audyt + technika + monitoring",
                text: "Nie kończymy na raporcie. Wspieramy remediację, budujemy use case'y SOC i weryfikujemy skuteczność poprawek retestem.",
              },
              {
                title: "Raportowanie dla zarządu i IT",
                text: "Executive summary z mapą ryzyka biznesowego i raport techniczny z PoC — dwa poziomy komunikacji, jeden spójny wniosek.",
              },
              {
                title: "Infrastruktura krytyczna",
                text: "Doświadczenie w energetyce, telekomunikacji, transporcie i ochronie zdrowia — sektorach, gdzie incydent cybernetyczny ma konsekwencje fizyczne.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-panel p-6">
                <h3 className="font-semibold text-cyber-cyan">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide">
          <h2 className="heading-section">Rozwój kompetencji</h2>
          <div className="mt-10 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-cyber-cyan/20 hidden sm:block" aria-hidden />
            <div className="space-y-8">
              {timelineEvents.map((event) => (
                <div key={event.year} className="relative sm:pl-12">
                  <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-cyber-cyan hidden sm:block" aria-hidden />
                  <span className="text-sm font-bold text-cyber-cyan">{event.year}</span>
                  <h3 className="mt-1 font-semibold">{event.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-wide">
          <h2 className="heading-section">Capability Matrix</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Przegląd kompetencji w obszarach audytu, pentestów, SOC, OT i compliance.
            Filtruj według interesującego Cię obszaru.
          </p>
          <div className="mt-10">
            <CapabilityMatrix />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-900/50">
        <div className="container-wide text-center">
          <h2 className="heading-section">Porozmawiajmy o Twoim środowisku</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Chętnie opowiemy o naszym podejściu i dopasujemy zakres usług do Twoich potrzeb.
          </p>
          <Link href="/kontakt" className="btn-primary mt-8 inline-flex">
            Umów konsultację
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
