import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MegaMenuProps {
  items: MegaMenuItem[];
}

export function MegaMenu({ items }: MegaMenuProps) {
  return (
    <div
      className="absolute left-0 top-full pt-2"
      role="menu"
      aria-label="Podmenu oferty"
    >
      <div className="w-80 rounded-xl border border-white/10 bg-navy-900/95 p-2 shadow-2xl backdrop-blur-lg">
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
                <p className="mt-0.5 text-xs text-white/50">{item.description}</p>
              )}
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-white/30 group-hover:text-cyber-cyan" aria-hidden />
          </Link>
        ))}
        <div className="mt-1 border-t border-white/10 pt-1">
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
