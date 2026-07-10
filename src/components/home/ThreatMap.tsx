"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroScenario } from "@/data/heroScenarios";

interface ThreatMapProps {
  scenario: HeroScenario;
}

export function ThreatMap({ scenario }: ThreatMapProps) {
  const prefersReducedMotion = useReducedMotion();
  const nodeMap = new Map(scenario.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label={`Diagram scenariusza: ${scenario.panelTitle}`}
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.1)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0.5)" />
        </linearGradient>
      </defs>

      {scenario.edges.map((edge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        const isActive =
          scenario.activeNodeIds.includes(edge.from) &&
          scenario.activeNodeIds.includes(edge.to);

        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className={isActive ? "animated-edge" : "opacity-20"}
            stroke={isActive ? "url(#edgeGrad)" : "rgba(255,255,255,0.15)"}
            strokeWidth={isActive ? 0.6 : 0.3}
            strokeDasharray={isActive ? "2 1" : "1 2"}
          />
        );
      })}

      {scenario.nodes.map((node) => {
        const isActive = scenario.activeNodeIds.includes(node.id);
        return (
          <g key={node.id}>
            {!prefersReducedMotion && isActive && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={5}
                fill="none"
                stroke="rgba(0,212,255,0.4)"
                strokeWidth={0.3}
                initial={{ r: 3, opacity: 0.8 }}
                animate={{ r: 7, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 3.5 : 2.5}
              fill={isActive ? "#00d4ff" : "rgba(255,255,255,0.25)"}
              stroke={isActive ? "rgba(0,212,255,0.6)" : "rgba(255,255,255,0.1)"}
              strokeWidth={0.3}
            />
            <text
              x={node.x}
              y={node.y - 5}
              textAnchor="middle"
              className="fill-white/80 text-[3.5px] font-medium"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
