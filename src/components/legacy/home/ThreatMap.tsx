"use client";

import { useState, useCallback } from "react";
import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroScenario } from "@/data/heroScenarios";

interface ThreatMapProps {
  scenario: HeroScenario;
  selectedNodeId?: string | null;
  onNodeSelect?: (nodeId: string | null) => void;
}

export function ThreatMap({ scenario, selectedNodeId, onNodeSelect }: ThreatMapProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const nodeMap = new Map(scenario.nodes.map((n) => [n.id, n]));

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, nodeId: string, index: number) => {
      const nodes = scenario.nodes;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onNodeSelect?.(selectedNodeId === nodeId ? null : nodeId);
      } else if (e.key === "ArrowRight" && index < nodes.length - 1) {
        e.preventDefault();
        document.getElementById(`threat-node-${nodes[index + 1].id}`)?.focus();
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        document.getElementById(`threat-node-${nodes[index - 1].id}`)?.focus();
      }
    },
    [scenario.nodes, selectedNodeId, onNodeSelect]
  );

  return (
    <div>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        role="img"
        aria-label={`Diagram scenariusza: ${scenario.panelTitle}`}
      >
        <defs>
          <linearGradient id={`edgeGrad-${scenario.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
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
              className={isActive && !prefersReducedMotion ? "animated-edge attack-path-line" : "opacity-20"}
              stroke={isActive ? `url(#edgeGrad-${scenario.id})` : "rgba(255,255,255,0.15)"}
              strokeWidth={isActive ? 0.6 : 0.3}
              strokeDasharray={isActive ? "2 1" : "1 2"}
            />
          );
        })}

        {scenario.nodes.map((node, index) => {
          const isActive = scenario.activeNodeIds.includes(node.id);
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredId === node.id;

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
                id={`threat-node-${node.id}`}
                tabIndex={0}
                role="button"
                aria-label={`${node.label}${node.description ? `: ${node.description}` : ""}`}
                aria-pressed={isSelected}
                cx={node.x}
                cy={node.y}
                r={isSelected || isHovered ? 4.5 : isActive ? 3.5 : 2.5}
                fill={isActive || isSelected ? "#00d4ff" : "rgba(255,255,255,0.25)"}
                stroke={isSelected ? "rgba(0,230,118,0.8)" : isActive ? "rgba(0,212,255,0.6)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isSelected ? 0.6 : 0.3}
                className="threat-node cursor-pointer focus:outline-none"
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onNodeSelect?.(isSelected ? null : node.id)}
                onKeyDown={(e) => handleKeyDown(e, node.id, index)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
              />
              <text
                x={node.x}
                y={node.y - 5}
                textAnchor="middle"
                className="fill-white/80 text-[3px] font-medium pointer-events-none"
              >
                {node.label}
              </text>
              {isHovered && node.description && (
                <title>{node.description}</title>
              )}
            </g>
          );
        })}
      </svg>

      {/* Screen reader alternative list */}
      <ul className="sr-only">
        {scenario.nodes.map((node) => (
          <li key={node.id}>
            {node.label}: {node.riskMeaning ?? node.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
