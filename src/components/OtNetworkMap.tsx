"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ViewMode = "before" | "after";

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
  { id: "enterprise-it", label: "Enterprise IT", x: 5, y: 5, width: 35, height: 25, risks: ["Phishing i malware", "Nadmierne uprawnienia AD", "Brak segmentacji"], recommendations: ["MFA na wszystkich kontach", "Segmentacja od OT", "EDR na stacjach"] },
  { id: "dmz", label: "DMZ", x: 45, y: 5, width: 25, height: 25, risks: ["Ekspozycja usług", "Brak WAF", "Stare certyfikaty"], recommendations: ["Reverse proxy z WAF", "Cykliczny przegląd reguł", "Monitoring ruchu"] },
  { id: "ot-core", label: "OT Core", x: 5, y: 35, width: 40, height: 30, risks: ["Płaska sieć OT", "Brak inwentaryzacji", "Legacy protokoły"], recommendations: ["Strefy IEC 62443", "Pasywny monitoring", "Jump host dla dostępu"] },
  { id: "plc-rtu", label: "PLC / RTU", x: 50, y: 40, width: 20, height: 20, risks: ["Brak backupu konfiguracji", "Domyślne hasła", "Bezpośredni dostęp z IT"], recommendations: ["Backup konfiguracji PLC", "Kontrola zmian firmware", "Konduity z firewall"] },
  { id: "hmi-scada", label: "HMI / SCADA", x: 75, y: 35, width: 20, height: 25, risks: ["Niezałatane stacje inżynierskie", "USB bez kontroli", "Współdzielone konta"], recommendations: ["Hardening stacji", "Kontrola nośników", "Osobiste konta z MFA"] },
  { id: "historian", label: "Historian", x: 50, y: 65, width: 25, height: 20, risks: ["Ekspozycja danych produkcyjnych", "Brak szyfrowania", "Słabe ACL"], recommendations: ["Szyfrowanie danych w spoczynku", "Segmentacja od IT", "Audyt dostępu"] },
  { id: "remote", label: "Remote Access", x: 75, y: 65, width: 20, height: 25, risks: ["VPN bez MFA", "Brak logowania sesji", "Stałe tunele integratorów"], recommendations: ["Jump host z MFA", "Just-in-time access", "Nagrywanie sesji"] },
];

const flows = {
  before: [
    { from: "enterprise-it", to: "ot-core", risky: true },
    { from: "enterprise-it", to: "hmi-scada", risky: true },
    { from: "dmz", to: "ot-core", risky: false },
  ],
  after: [
    { from: "enterprise-it", to: "dmz", risky: false },
    { from: "dmz", to: "ot-core", risky: false },
    { from: "ot-core", to: "plc-rtu", risky: false },
    { from: "ot-core", to: "hmi-scada", risky: false },
  ],
};

export function OtNetworkMap() {
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("before");
  const prefersReducedMotion = useReducedMotion();
  const selected = segments.find((s) => s.id === active);
  const currentFlows = flows[mode];
  const nodeMap = new Map(segments.map((s) => [s.id, s]));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="command-panel relative aspect-[4/3] p-4">
        <div className="mb-3 flex gap-2">
          {(["before", "after"] as ViewMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn("scenario-tab text-xs", mode === m && "scenario-tab-active")}
              aria-pressed={mode === m}
            >
              {m === "before" ? "Przed segmentacją" : "Po segmentacji"}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 100 95" className="h-[calc(100%-2.5rem)] w-full" role="application" aria-label="Interaktywna mapa sieci OT">
          {currentFlows.map((flow) => {
            const from = nodeMap.get(flow.from);
            const to = nodeMap.get(flow.to);
            if (!from || !to) return null;
            const x1 = from.x + from.width / 2;
            const y1 = from.y + from.height / 2;
            const x2 = to.x + to.width / 2;
            const y2 = to.y + to.height / 2;
            return (
              <line
                key={`${flow.from}-${flow.to}-${mode}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={flow.risky ? "rgba(255,71,87,0.6)" : "rgba(0,230,118,0.5)"}
                strokeWidth={flow.risky ? 0.8 : 0.5}
                strokeDasharray={flow.risky ? "2 2" : "none"}
                className={!prefersReducedMotion && !flow.risky ? "animated-edge" : undefined}
              />
            );
          })}
          {segments.map((seg) => (
            <g key={seg.id}>
              <rect
                x={seg.x} y={seg.y} width={seg.width} height={seg.height} rx="2"
                className={cn("cursor-pointer transition-all stroke-1", active === seg.id ? "fill-cyber-cyan/20 stroke-cyber-cyan" : "fill-white/5 stroke-white/20 hover:fill-white/10")}
                onClick={() => setActive(seg.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(seg.id); } }}
                tabIndex={0} role="button" aria-label={`Segment: ${seg.label}`}
              />
              <text x={seg.x + seg.width / 2} y={seg.y + seg.height / 2} textAnchor="middle" dominantBaseline="middle" className="pointer-events-none fill-white/80 text-[3.5px] font-medium">{seg.label}</text>
            </g>
          ))}
          {mode === "after" && !prefersReducedMotion && (
            <motion.rect x="44" y="30" width="2" height="35" fill="rgba(0,212,255,0.3)" initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden />
          )}
        </svg>
        <p className="absolute bottom-2 left-4 text-xs text-white/40">Kliknij segment · {mode === "before" ? "czerwone = ryzykowne połączenia" : "zielone = kontrolowane konduity"}</p>
      </div>
      <div className="command-panel p-6">
        {selected ? (
          <>
            <h3 className="text-lg font-semibold text-cyber-cyan">{selected.label}</h3>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-cyber-amber">Ryzyka</h4>
              <ul className="mt-2 space-y-1">{selected.risks.map((r) => <li key={r} className="text-sm text-white/70">⚠ {r}</li>)}</ul>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-cyber-green">Rekomendacje</h4>
              <ul className="mt-2 space-y-1">{selected.recommendations.map((r) => <li key={r} className="text-sm text-white/70">✓ {r}</li>)}</ul>
            </div>
          </>
        ) : (
          <p className="flex h-full items-center text-center text-white/50">Wybierz segment na mapie zakładu.</p>
        )}
      </div>
    </div>
  );
}
