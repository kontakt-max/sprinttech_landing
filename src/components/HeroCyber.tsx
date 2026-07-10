"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Shield, Activity } from "lucide-react";
import { SecurityBadges } from "@/components/SecurityBadges";

const alerts = [
  { id: 1, severity: "info", message: "SIEM: korelacja zakończona — 0 incydentów P1", time: "14:32:01" },
  { id: 2, severity: "low", message: "EDR: blokada podejrzanej domeny — endpoint WS-042", time: "14:31:58" },
  { id: 3, severity: "medium", message: "Firewall: anomalia ruchu OT-DMZ — triage w toku", time: "14:31:45" },
  { id: 4, severity: "info", message: "Cloud: GuardDuty — brak alertów krytycznych", time: "14:31:30" },
  { id: 5, severity: "low", message: "Auth: 3 nieudane logowania VPN — w normie SLA", time: "14:31:12" },
];

const radarNodes = [
  { x: 50, y: 30, label: "SOC" },
  { x: 75, y: 45, label: "Cloud" },
  { x: 25, y: 50, label: "OT" },
  { x: 60, y: 70, label: "Endpoint" },
  { x: 40, y: 65, label: "Network" },
];

export function HeroCyber() {
  const prefersReducedMotion = useReducedMotion();
  const [activeAlert, setActiveAlert] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % alerts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const severityColors = useMemo(
    () => ({
      info: "border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan",
      low: "border-cyber-green/30 bg-cyber-green/5 text-cyber-green",
      medium: "border-cyber-amber/30 bg-cyber-amber/5 text-cyber-amber",
    }),
    []
  );

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 via-transparent to-navy-950"
        aria-hidden
      />
      {!prefersReducedMotion && (
        <div className="absolute inset-0 scanline pointer-events-none" aria-hidden />
      )}

      <div className="container-wide relative section-padding">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-1.5 text-sm text-cyber-cyan">
                <Shield className="h-4 w-4" aria-hidden />
                ISO/IEC 27001:2022 · Pentesty · SOC · OT/ICS
              </div>
              <h1 className="heading-display text-balance">
                Tworzymy{" "}
                <span className="text-gradient">cyberodporność</span>{" "}
                organizacji, które nie mogą pozwolić sobie na przestój.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                Pentesty, audyty, SOC, compliance i bezpieczeństwo OT/ICS realizowane przez zespół
                inżynierów, audytorów, pentesterów i operatorów SOC.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/kontakt" className="btn-primary">
                  Umów konsultację
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
                <Link href="/oferta" className="btn-secondary">
                  Zobacz ofertę
                </Link>
              </div>
            </motion.div>
            <div className="mt-10">
              <SecurityBadges compact />
            </div>
          </div>

          <div className="relative" aria-hidden={false} role="img" aria-label="Wizualizacja mapy cyberodporności SOC">
            <div className="glass-panel relative aspect-square max-h-[480px] overflow-hidden p-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                  <defs>
                    <radialGradient id="radarGlow">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {[20, 35, 50].map((r) => (
                    <circle
                      key={r}
                      cx="50"
                      cy="50"
                      r={r}
                      fill="none"
                      stroke="rgba(0,212,255,0.15)"
                      strokeWidth="0.3"
                    />
                  ))}
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(0,212,255,0.1)" strokeWidth="0.2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(0,212,255,0.1)" strokeWidth="0.2" />
                  <circle cx="50" cy="50" r="30" fill="url(#radarGlow)" />
                  {radarNodes.map((node) => (
                    <g key={node.label}>
                      <line
                        x1="50"
                        y1="50"
                        x2={node.x}
                        y2={node.y}
                        stroke="rgba(0,212,255,0.2)"
                        strokeWidth="0.3"
                      />
                      <circle cx={node.x} cy={node.y} r="2" fill="#00d4ff" opacity="0.8" />
                      <text
                        x={node.x}
                        y={node.y - 4}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize="3"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                  {!prefersReducedMotion && mounted && (
                    <motion.line
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="10"
                      stroke="#00d4ff"
                      strokeWidth="0.5"
                      opacity="0.6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "50px 50px" }}
                    />
                  )}
                </svg>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Activity className="h-3 w-3 text-cyber-green" aria-hidden />
                  SOC Live Feed — dane syntetyczne
                </div>
                {mounted &&
                  alerts.map((alert, i) => (
                    <div
                      key={alert.id}
                      className={`rounded border px-3 py-2 text-xs transition-opacity duration-500 ${
                        severityColors[alert.severity as keyof typeof severityColors]
                      } ${i === activeAlert ? "opacity-100" : "opacity-40"}`}
                    >
                      <span className="font-mono text-white/40">{alert.time}</span>{" "}
                      {alert.message}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
