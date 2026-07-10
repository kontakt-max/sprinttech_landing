import Link from "next/link";
import { Shield, Linkedin, Mail, Phone } from "lucide-react";
import { companyInfo, navigation } from "@/data/company";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-navy-900">
      <div className="container-wide section-padding">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-white">
              <Shield className="h-6 w-6 text-cyber-cyan" aria-hidden />
              SprintTech
            </Link>
            <p className="mt-4 text-sm text-white/60">{companyInfo.description}</p>
            <p className="mt-2 text-xs text-white/40">Część grupy {companyInfo.parent}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={companyInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-[#0A66C2]/50 hover:text-[#0A66C2]"
                aria-label="LinkedIn SprintTech"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Oferta
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation[0]?.children?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-cyber-cyan">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Firma
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/o-nas" className="text-sm text-white/60 hover:text-cyber-cyan">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/case-study" className="text-sm text-white/60 hover:text-cyber-cyan">
                  Case Study
                </Link>
              </li>
              <li>
                <Link href="/artykuly" className="text-sm text-white/60 hover:text-cyber-cyan">
                  Artykuły
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm text-white/60 hover:text-cyber-cyan">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-cyber-cyan"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-cyber-cyan"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {currentYear} {companyInfo.legalName}. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-white/40">
            <Link href="/polityka-prywatnosci" className="hover:text-cyber-cyan">
              Polityka prywatności
            </Link>
            <Link href="/cookies" className="hover:text-cyber-cyan">
              Cookies
            </Link>
            <a href="/.well-known/security.txt" className="hover:text-cyber-cyan">
              security.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
