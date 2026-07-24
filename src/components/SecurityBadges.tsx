import { trustBadges } from "@/data/company";
import { Shield, Award, Lock, FileCheck, Factory, Server } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "ISO/IEC 27001:2022": <Award className="h-5 w-5" aria-hidden />,
  SOC: <Server className="h-5 w-5" aria-hidden />,
  Pentesty: <Lock className="h-5 w-5" aria-hidden />,
  NIS2: <FileCheck className="h-5 w-5" aria-hidden />,
  DORA: <FileCheck className="h-5 w-5" aria-hidden />,
  KSC: <Shield className="h-5 w-5" aria-hidden />,
  "OT/ICS": <Factory className="h-5 w-5" aria-hidden />,
};

export function SecurityBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex flex-wrap gap-2"
          : "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      }
      role="list"
      aria-label="Certyfikaty i obszary kompetencji"
    >
      {trustBadges.map((badge) => (
        <div
          key={badge.label}
          role="listitem"
          className={
            compact
              ? "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
              : "glass-panel-hover flex flex-col items-center gap-2 p-4 text-center"
          }
          title={badge.description}
        >
          <span className="text-cyber-cyan">{iconMap[badge.label] ?? <Shield className="h-5 w-5" />}</span>
          <span className={compact ? "" : "text-sm font-semibold"}>{badge.label}</span>
          {!compact && (
            <span className="text-xs text-white/50">{badge.description}</span>
          )}
        </div>
      ))}
    </div>
  );
}
