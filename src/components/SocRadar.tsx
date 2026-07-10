"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Radio,
  GitMerge,
  Search,
  AlertTriangle,
  FileText,
  CheckCircle,
} from "lucide-react";

const flowSteps = [
  { id: "source", label: "Źródło logów", icon: Radio, detail: "SIEM · EDR · Firewall · Cloud" },
  { id: "correlation", label: "Korelacja", icon: GitMerge, detail: "Reguły · Use cases · MITRE" },
  { id: "analysis", label: "Analiza", icon: Search, detail: "Triage · Kontekst · Priorytet" },
  { id: "escalation", label: "Eskalacja", icon: AlertTriangle, detail: "SLA · Playbook · IR" },
  { id: "recommendation", label: "Rekomendacja", icon: CheckCircle, detail: "Remediacja · Hardening" },
  { id: "report", label: "Raport", icon: FileText, detail: "Miesięczny · Executive" },
];

const mockAlerts = [
  { id: "ALT-2847", severity: "P2", tactic: "Initial Access", status: "In Progress" },
  { id: "ALT-2846", severity: "P3", tactic: "Discovery", status: "Triage" },
  { id: "ALT-2845", severity: "P1", tactic: "Lateral Movement", status: "Escalated" },
];

const mitreTactics = [
  { name: "Initial Access", count: 3, active: false },
  { name: "Execution", count: 1, active: false },
  { name: "Persistence", count: 0, active: false },
  { name: "Lateral Movement", count: 2, active: true },
  { name: "Exfiltration", count: 0, active: false },
];

export function SocRadar() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan">
          SOC Alert Flow
        </h3>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeStep;
            return (
              <div key={step.id} className="flex flex-1 items-center gap-2">
                <motion.div
                  className={`flex flex-col items-center rounded-lg border p-3 text-center transition-colors ${
                    isActive
                      ? "border-cyber-cyan/50 bg-cyber-cyan/10"
                      : "border-white/10 bg-white/5"
                  }`}
                  animate={isActive && !prefersReducedMotion ? { scale: 1.05 } : { scale: 1 }}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-cyber-cyan" : "text-white/50"}`}
                    aria-hidden
                  />
                  <span className="mt-1 text-xs font-medium">{step.label}</span>
                  <span className="mt-0.5 text-[10px] text-white/40">{step.detail}</span>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-cyber-cyan/30 to-transparent lg:block" aria-hidden />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan">
            Aktywne alerty — dane syntetyczne
          </h3>
          <div className="mt-4 space-y-2" role="table" aria-label="Lista alertów SOC">
            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-white/40" role="row">
              <span role="columnheader">ID</span>
              <span role="columnheader">Severity</span>
              <span role="columnheader">MITRE</span>
              <span role="columnheader">Status</span>
            </div>
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="grid grid-cols-4 gap-2 rounded border border-white/5 bg-white/[0.02] px-3 py-2 text-sm"
                role="row"
              >
                <span className="font-mono text-white/70" role="cell">{alert.id}</span>
                <span
                  className={
                    alert.severity === "P1"
                      ? "text-cyber-red"
                      : alert.severity === "P2"
                        ? "text-cyber-amber"
                        : "text-white/60"
                  }
                  role="cell"
                >
                  {alert.severity}
                </span>
                <span className="text-white/60" role="cell">{alert.tactic}</span>
                <span className="text-cyber-cyan" role="cell">{alert.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan">
            MITRE ATT&CK — pokrycie taktyk
          </h3>
          <div className="mt-4 space-y-2">
            {mitreTactics.map((tactic) => (
              <div key={tactic.name} className="flex items-center gap-3">
                <span className="w-32 text-xs text-white/60">{tactic.name}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      tactic.active ? "bg-cyber-amber" : "bg-cyber-cyan/40"
                    }`}
                    style={{ width: `${Math.min(tactic.count * 30, 100)}%` }}
                  />
                </div>
                <span className="w-6 text-right text-xs text-white/40">{tactic.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
