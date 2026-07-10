"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Segment {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  risks: string[];
  recommendations: string[];
}

const segments: Segment[] = [
  {
    id: "enterprise-it",
    label: "Enterprise IT",
    x: 5,
    y: 5,
    width: 35,
    height: 25,
    risks: ["Phishing i malware", "Nadmierne uprawnienia AD", "Brak segmentacji"],
    recommendations: ["MFA na wszystkich kontach", "Segmentacja od OT", "EDR na stacjach"],
  },
  {
    id: "dmz",
    label: "DMZ",
    x: 45,
    y: 5,
    width: 25,
    height: 25,
    risks: ["Ekspozycja usług", "Brak WAF", "Stare certyfikaty"],
    recommendations: ["Reverse proxy z WAF", "Cykliczny przegląd reguł", "Monitoring ruchu"],
  },
  {
    id: "ot-core",
    label: "OT Core",
    x: 5,
    y: 35,
    width: 40,
    height: 30,
    risks: ["Płaska sieć OT", "Brak inwentaryzacji", "Legacy protokoły"],
    recommendations: ["Strefy IEC 62443", "Pasywny monitoring", "Jump host dla dostępu"],
  },
  {
    id: "plc-rtu",
    label: "PLC / RTU",
    x: 50,
    y: 40,
    width: 20,
    height: 20,
    risks: ["Brak backupu konfiguracji", "Domyślne hasła", "Bezpośredni dostęp z IT"],
    recommendations: ["Backup konfiguracji PLC", "Kontrola zmian firmware", "Konduity z firewall"],
  },
  {
    id: "hmi-scada",
    label: "HMI / SCADA",
    x: 75,
    y: 35,
    width: 20,
    height: 25,
    risks: ["Niezałatane stacje inżynierskie", "USB bez kontroli", "Współdzielone konta"],
    recommendations: ["Hardening stacji", "Kontrola nośników", "Osobiste konta z MFA"],
  },
  {
    id: "historian",
    label: "Historian",
    x: 50,
    y: 65,
    width: 25,
    height: 20,
    risks: ["Ekspozycja danych produkcyjnych", "Brak szyfrowania", "Słabe ACL"],
    recommendations: ["Szyfrowanie danych w spoczynku", "Segmentacja od IT", "Audyt dostępu"],
  },
  {
    id: "remote",
    label: "Remote Access",
    x: 75,
    y: 65,
    width: 20,
    height: 25,
    risks: ["VPN bez MFA", "Brak logowania sesji", "Stałe tunele integratorów"],
    recommendations: ["Jump host z MFA", "Just-in-time access", "Nagrywanie sesji"],
  },
];

export function OtNetworkMap() {
  const [active, setActive] = useState<string | null>(null);
  const selected = segments.find((s) => s.id === active);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div
        className="glass-panel relative aspect-[4/3] p-4"
        role="application"
        aria-label="Interaktywna mapa sieci OT zakładu produkcyjnego"
      >
        <svg viewBox="0 0 100 95" className="h-full w-full">
          {segments.map((seg) => (
            <g key={seg.id}>
              <rect
                x={seg.x}
                y={seg.y}
                width={seg.width}
                height={seg.height}
                rx="2"
                className={cn(
                  "cursor-pointer transition-all stroke-1",
                  active === seg.id
                    ? "fill-cyber-cyan/20 stroke-cyber-cyan"
                    : "fill-white/5 stroke-white/20 hover:fill-white/10 hover:stroke-cyber-cyan/50"
                )}
                onClick={() => setActive(seg.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(seg.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Segment: ${seg.label}`}
              />
              <text
                x={seg.x + seg.width / 2}
                y={seg.y + seg.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none fill-white/80 text-[3.5px] font-medium"
              >
                {seg.label}
              </text>
            </g>
          ))}
          <line x1="40" y1="17" x2="45" y2="17" stroke="rgba(0,212,255,0.3)" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="25" y1="30" x2="25" y2="35" stroke="rgba(0,212,255,0.3)" strokeWidth="0.5" strokeDasharray="2" />
        </svg>
        <p className="absolute bottom-2 left-4 text-xs text-white/40">
          Kliknij segment, aby zobaczyć ryzyka i rekomendacje
        </p>
      </div>

      <div className="glass-panel p-6">
        {selected ? (
          <>
            <h3 className="text-lg font-semibold text-cyber-cyan">{selected.label}</h3>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-cyber-amber">Zidentyfikowane ryzyka</h4>
              <ul className="mt-2 space-y-1">
                {selected.risks.map((r) => (
                  <li key={r} className="text-sm text-white/70 before:mr-2 before:text-cyber-amber before:content-['⚠']">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-cyber-green">Rekomendacje</h4>
              <ul className="mt-2 space-y-1">
                {selected.recommendations.map((r) => (
                  <li key={r} className="text-sm text-white/70 before:mr-2 before:text-cyber-green before:content-['✓']">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-white/50">
            <p>Wybierz segment na mapie zakładu, aby zobaczyć szczegóły ryzyka i rekomendacje modernizacji.</p>
          </div>
        )}
      </div>
    </div>
  );
}
