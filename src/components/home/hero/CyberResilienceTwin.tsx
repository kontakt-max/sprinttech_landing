"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  heroScenarios,
  topologyNodes,
  defaultScenarioId,
  accentColors,
  type HeroScenarioId,
  type TopologyNodeId,
} from "@/data/heroScenarios";
import { ScenarioRail } from "./ScenarioRail";
import { TopologyNode } from "./TopologyNode";
import { TopologyEdges } from "./TopologyEdges";
import { ResilienceCore } from "./ResilienceCore";
import { ScenarioStory } from "./ScenarioStory";
import { RiskOutcomeCard } from "./RiskOutcomeCard";
import { PointerSpotlight } from "./PointerSpotlight";

const AUTOPLAY_MS = 7000;

interface CyberResilienceTwinProps {
  initialScenarioId?: HeroScenarioId;
  externalScenarioId?: HeroScenarioId | null;
}

export function CyberResilienceTwin({
  initialScenarioId = defaultScenarioId,
  externalScenarioId,
}: CyberResilienceTwinProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scenarioId, setScenarioId] = useState<HeroScenarioId>(initialScenarioId);
  const [storyIndex, setStoryIndex] = useState(0);
  const [pathIndex, setPathIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<TopologyNodeId | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TopologyNodeId | null>(null);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenario = heroScenarios.find((s) => s.id === scenarioId) ?? heroScenarios[0];
  const colors = accentColors[scenario.accent];
  const pathSet = new Set(scenario.pathNodeIds);

  const stopAutoplay = useCallback(() => setAutoplayStopped(true), []);

  const selectScenario = useCallback(
    (id: HeroScenarioId) => {
      stopAutoplay();
      setScenarioId(id);
      setStoryIndex(0);
      setPathIndex(0);
      setSelectedNode(null);
    },
    [stopAutoplay]
  );

  useEffect(() => {
    if (externalScenarioId) selectScenario(externalScenarioId);
  }, [externalScenarioId, selectScenario]);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<HeroScenarioId>).detail;
      if (id) selectScenario(id);
    };
    window.addEventListener("sprinttech:scenario", handler);
    return () => window.removeEventListener("sprinttech:scenario", handler);
  }, [selectScenario]);

  // Animate path + story in sync
  useEffect(() => {
    if (prefersReducedMotion) {
      setPathIndex(scenario.pathNodeIds.length);
      return;
    }

    setPathIndex(0);
    const pathTimer = window.setInterval(() => {
      setPathIndex((p) => {
        if (p >= scenario.pathNodeIds.length) return p;
        return p + 1;
      });
    }, 650);

    return () => window.clearInterval(pathTimer);
  }, [scenario.id, scenario.pathNodeIds.length, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const storyTimer = window.setInterval(() => {
      setStoryIndex((i) => (i < scenario.storySteps.length - 1 ? i + 1 : i));
    }, 1400);

    return () => window.clearInterval(storyTimer);
  }, [scenario.id, scenario.storySteps.length, prefersReducedMotion]);

  // Autoplay scenarios
  useEffect(() => {
    if (prefersReducedMotion || autoplayStopped) return;

    const timer = window.setInterval(() => {
      setScenarioId((current) => {
        const idx = heroScenarios.findIndex((s) => s.id === current);
        const next = heroScenarios[(idx + 1) % heroScenarios.length];
        setStoryIndex(0);
        setPathIndex(0);
        setSelectedNode(null);
        return next.id;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplayStopped, prefersReducedMotion]);

  const activeNodeId = scenario.pathNodeIds[Math.min(pathIndex, scenario.pathNodeIds.length - 1)];
  const calloutNode = topologyNodes.find(
    (n) => n.id === (selectedNode ?? hoveredNode)
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onPointerEnter={stopAutoplay}
      onFocusCapture={stopAutoplay}
      onTouchStart={stopAutoplay}
    >
      <div className="lg:grid lg:grid-cols-[140px_1fr] lg:gap-4 lg:items-start">
        <div className="mb-4 hidden lg:block">
          <ScenarioRail scenarios={heroScenarios} activeId={scenarioId} onChange={selectScenario} layout="vertical" />
        </div>

        <div>
          <div className="mb-3 lg:hidden">
            <ScenarioRail scenarios={heroScenarios} activeId={scenarioId} onChange={selectScenario} />
          </div>

          <div
            id={`twin-panel-${scenario.id}`}
            role="tabpanel"
            aria-label={`Scenariusz: ${scenario.shortLabel}`}
            className="twin-canvas relative mx-auto aspect-[4/3] w-full max-w-2xl sm:aspect-[16/11] lg:max-w-none lg:aspect-auto lg:min-h-[420px]"
          >
        <div className="twin-perspective absolute inset-0 rounded-2xl" aria-hidden>
          <div className="premium-grid-bg twin-grid absolute inset-0 opacity-60" />
          <PointerSpotlight />
        </div>

        <TopologyEdges
          nodes={topologyNodes}
          pathNodeIds={scenario.pathNodeIds}
          activePathIndex={pathIndex}
          accent={scenario.accent}
        />

        <ResilienceCore status={scenario.coreStatus} accent={scenario.accent} isActive={pathIndex > 0} />

        {topologyNodes.map((node) => (
          <TopologyNode
            key={node.id}
            node={node}
            isOnPath={pathSet.has(node.id)}
            isActive={
              node.id === activeNodeId ||
              (pathSet.has(node.id) && scenario.pathNodeIds.indexOf(node.id) < pathIndex)
            }
            isDimmed={pathIndex > 0 && !pathSet.has(node.id)}
            isSelected={selectedNode === node.id}
            accent={scenario.accent}
            onSelect={(id) => {
              stopAutoplay();
              setSelectedNode(selectedNode === id ? null : (id as TopologyNodeId));
            }}
            onHover={(id) => setHoveredNode(id as TopologyNodeId | null)}
          />
        ))}

        {calloutNode && !calloutNode.isCore && (
          <div
            className="absolute z-30 max-w-[200px] rounded-lg border border-white/15 bg-navy-900/95 p-3 text-xs shadow-xl backdrop-blur-md sm:max-w-[240px] sm:text-sm"
            style={{
              left: `${Math.min(calloutNode.x, 70)}%`,
              top: `${calloutNode.y + 8}%`,
            }}
            role="tooltip"
          >
            <p className="font-semibold text-white">{calloutNode.label}</p>
            <p className="mt-1 text-white/65 leading-snug">{calloutNode.description}</p>
          </div>
        )}
      </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ScenarioStory
          steps={scenario.storySteps}
          activeIndex={storyIndex}
          onPrev={() => {
            stopAutoplay();
            setStoryIndex((i) => Math.max(0, i - 1));
          }}
          onNext={() => {
            stopAutoplay();
            setStoryIndex((i) => Math.min(scenario.storySteps.length - 1, i + 1));
          }}
          accentColor={colors.primary}
        />
            <RiskOutcomeCard scenario={scenario} />
          </div>
        </div>
      </div>
    </div>
  );
}
