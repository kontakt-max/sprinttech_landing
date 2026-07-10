import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { LeadForm } from "@/components/LeadForm";
import { GoogleFormEmbed } from "@/components/GoogleFormEmbed";
import { companyInfo } from "@/data/company";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Skontaktuj się z SprintTech — umów konsultację w sprawie pentestów, audytów, SOC, OT/ICS lub dokumentacji compliance.",
  path: "/kontakt",
});

export default function ContactPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Strona główna", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="section-padding pt-28">
        <div className="container-wide">
          <h1 className="heading-display">Kontakt</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/70">
            Opisz swoją potrzebę — skontaktujemy się w ciągu 1–2 dni roboczych z propozycją
            zakresu, harmonogramu i wstępną wyceną. Wszystkie dane przetwarzamy zgodnie z RODO.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h2 className="font-semibold">Dane kontaktowe</h2>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-cyber-cyan">
                    <Mail className="h-5 w-5 text-cyber-cyan" aria-hidden />
                    {companyInfo.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-cyber-cyan">
                    <Phone className="h-5 w-5 text-cyber-cyan" aria-hidden />
                    {companyInfo.phone}
                  </a>
                </li>
                <li>
                  <a href={companyInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/70 hover:text-cyber-cyan">
                    <Linkedin className="h-5 w-5 text-cyber-cyan" aria-hidden />
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-5 w-5 text-cyber-cyan shrink-0" aria-hidden />
                  Polska · obsługa klientów enterprise i sektor publiczny
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2">
            <LeadForm source="kontakt" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-900/50">
        <div className="container-wide max-w-3xl">
          <h2 className="heading-section text-xl">Alternatywa: formularz Google</h2>
          <p className="mt-4 text-sm text-white/60">
            Jeśli wolisz formularz Google Forms, możesz go użyć po wyrażeniu zgody na treści zewnętrzne.
          </p>
          <div className="mt-6">
            <GoogleFormEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
