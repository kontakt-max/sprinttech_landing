"use client";

import {
  Globe,
  KeyRound,
  Cloud,
  AppWindow,
  Monitor,
  Radar,
  Server,
  Factory,
  Shield,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import type { TopologyNodeConfig, ScenarioAccent } from "@/data/heroScenarios";
import { accentColors } from "@/data/heroScenarios";
import { cn } from "@/lib/utils";

const iconMap: Record<TopologyNodeConfig["icon"], LucideIcon> = {
  globe: Globe,
  key: KeyRound,
  cloud: Cloud,
  app: AppWindow,
  monitor: Monitor,
  radar: Radar,
  server: Server,
  factory: Factory,
  shield: Shield,
  core: CircleDot,
};

interface TopologyNodeProps {
  node: TopologyNodeConfig;
  isOnPath: boolean;
  isActive: boolean;
  isDimmed: boolean;
  isSelected: boolean;
  accent: ScenarioAccent;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function TopologyNode({
  node,
  isOnPath,
  isActive,
  isDimmed,
  isSelected,
  accent,
  onSelect,
  onHover,
}: TopologyNodeProps) {
  if (node.isCore) return null;

  const Icon = iconMap[node.icon];
  const colors = accentColors[accent];

  return (
    <motion.button
      type="button"
      layout
      initial={false}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 0.45 }}
      className={cn(
        "twin-node absolute z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border px-2 py-2 text-center sm:px-3 sm:py-2.5",
        isOnPath ? "border-white/20 bg-navy-900/80" : "border-white/10 bg-navy-950/60",
        isActive && "twin-node-active",
        isSelected && "ring-2 ring-offset-2 ring-offset-navy-950"
      )}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        ...(isActive ? { borderColor: colors.primary, boxShadow: `0 0 24px ${colors.glow}` } : {}),
        ...(isSelected ? { ringColor: colors.primary } : {}),
      }}
      aria-label={`${node.label}: ${node.description}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
    >
      <Icon
        className="h-4 w-4 sm:h-5 sm:w-5"
        style={{ color: isActive ? colors.primary : "rgba(255,255,255,0.6)" }}
        aria-hidden
      />
      <span className="text-xs font-semibold leading-tight text-white sm:text-sm">{node.label}</span>
      <span className="hidden text-[10px] text-white/50 sm:block">{node.shortStatus}</span>
    </motion.button>
  );
}
