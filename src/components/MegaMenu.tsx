import Link from "next/link";
import { ArrowRight, Target, Shield, Radar, Factory } from "lucide-react";

interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MegaMenuProps {
  items: MegaMenuItem[];
}

const commonNeeds = [
  { label: "Sprawdź podatności", href: "/oferta/pentesty", icon: Target },
  { label: "Oceń gotowość NIS2/DORA", href: "/oferta/audyty", icon: Shield },
  { label: "Monitoring SOC 24/7", href: "/oferta/soc", icon: Radar },
  { label: "Modernizacja OT/ICS", href: "/oferta/ot-ics", icon: Factory },
];

export function MegaMenu({ items }: MegaMenuProps) {
  return (
    <div
      className="absolute left-0 top-full pt-2"
      role="menu"
      aria-label="Podmenu oferty"
    >
      <div className="w-[32rem] rounded-xl border border-white/10 bg-navy-900/95 p-3 shadow-2xl backdrop-blur-lg">
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
            >
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-cyber-cyan">
                  {item.label}
                </span>
                {item.description && (
                  <p className="mt-0.5 text-xs text-white/50 leading-snug">{item.description}</p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/30 group-hover:text-cyber-cyan" aria-hidden />
            </Link>
          ))}
        </div>

        <div className="mt-2 border-t border-white/10 pt-2">
          <p className="px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
            Najczęstsze potrzeby
          </p>
          <div className="grid grid-cols-2 gap-1">
            {commonNeeds.map((need) => {
              const Icon = need.icon;
              return (
                <Link
                  key={need.href}
                  href={need.href}
                  role="menuitem"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-cyber-cyan"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {need.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-2 border-t border-white/10 pt-1">
          <Link
            href="/oferta"
            className="block rounded-lg p-3 text-sm font-medium text-cyber-cyan hover:bg-white/5"
            role="menuitem"
          >
            Zobacz pełną ofertę →
          </Link>
        </div>
      </div>
    </div>
  );
}
