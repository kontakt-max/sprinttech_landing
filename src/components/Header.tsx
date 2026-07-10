"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Shield, ChevronDown } from "lucide-react";
import { navigation } from "@/data/company";
import { MegaMenu } from "@/components/MegaMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-navy-950/80 backdrop-blur-lg">
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-white" aria-label="SprintTech — strona główna">
          <Shield className="h-7 w-7 text-cyber-cyan" aria-hidden />
          <span>
            Sprint<span className="text-cyber-cyan">Tech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Główne menu">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-cyber-cyan",
                    pathname.startsWith(item.href) ? "text-cyber-cyan" : "text-white/80"
                  )}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
                {megaOpen && <MegaMenu items={item.children} />}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-cyber-cyan",
                  pathname === item.href ? "text-cyber-cyan" : "text-white/80"
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/kontakt" className="btn-primary ml-2 text-sm py-2">
            Kontakt
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden text-white/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-white/5 bg-navy-950 px-4 py-4 lg:hidden"
          aria-label="Menu mobilne"
        >
          {navigation.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-2 text-sm font-medium text-white/80 hover:text-cyber-cyan"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block py-1.5 pl-4 text-sm text-white/60 hover:text-cyber-cyan"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/kontakt"
            className="btn-primary mt-4 block text-center text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Kontakt
          </Link>
        </nav>
      )}
    </header>
  );
}
