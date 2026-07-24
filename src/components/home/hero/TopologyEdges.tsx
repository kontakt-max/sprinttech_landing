"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { TopologyNodeConfig, ScenarioAccent } from "@/data/heroScenarios";
import { accentColors } from "@/data/heroScenarios";

interface TopologyEdgesProps {
  nodes: TopologyNodeConfig[];
  pathNodeIds: string[];
  activePathIndex: number;
  accent: ScenarioAccent;
}

function getCenter(node: TopologyNodeConfig) {
  return { x: node.x, y: node.y };
}

export function TopologyEdges({ nodes, pathNodeIds, activePathIndex, accent }: TopologyEdgesProps) {
  const prefersReducedMotion = useReducedMotion();
  const colors = accentColors[accent];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const segments: { from: { x: number; y: number }; to: { x: number; y: number }; index: number }[] = [];
  for (let i = 0; i < pathNodeIds.length - 1; i++) {
    const fromNode = nodeMap.get(pathNodeIds[i] as TopologyNodeConfig["id"]);
    const toNode = nodeMap.get(pathNodeIds[i + 1] as TopologyNodeConfig["id"]);
    if (fromNode && toNode) {
      segments.push({ from: getCenter(fromNode), to: getCenter(toNode), index: i });
    }
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {segments.map((seg) => {
        const isLit = seg.index < activePathIndex;
        const isCurrent = seg.index === activePathIndex - 1;
        const d = `M ${seg.from.x} ${seg.from.y} L ${seg.to.x} ${seg.to.y}`;

        return (
          <g key={`${seg.index}-${pathNodeIds[seg.index]}`}>
            <path
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.35"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={d}
              fill="none"
              stroke={colors.primary}
              strokeWidth={isCurrent ? 0.55 : 0.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{
                pathLength: isLit || isCurrent ? 1 : 0,
                opacity: isLit || isCurrent ? (isCurrent ? 1 : 0.6) : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
            />
            {isCurrent && !prefersReducedMotion && (
              <motion.circle
                r="0.9"
                fill={colors.primary}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{
                  offsetPath: `path('${d}')`,
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
