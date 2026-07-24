/**
 * Scenariusze Cyber Resilience Twin — Tu edytujesz copy, ścieżki i historię bez ruszania komponentów.
 */

export type HeroScenarioId = "vulnerability" | "soc-incident" | "regulatory" | "ot-ics";

export type TopologyNodeId =
  | "external-surface"
  | "identity"
  | "cloud"
  | "applications"
  | "endpoints"
  | "soc"
  | "it-core"
  | "ot-ics"
  | "governance"
  | "resilience-core";

export type CoreStatus = "Exposure" | "Detection" | "Compliance" | "Resilience";

export type ScenarioAccent = "cyan" | "blue" | "green" | "amber";

export interface TopologyNodeConfig {
  id: TopologyNodeId;
  label: string;
  shortStatus: string;
  description: string;
  /** Percent position within twin canvas */
  x: number;
  y: number;
  icon: "globe" | "key" | "cloud" | "app" | "monitor" | "radar" | "server" | "factory" | "shield" | "core";
  isCore?: boolean;
}

export interface StoryStep {
  title: string;
  description: string;
}

export interface HeroScenario {
  id: HeroScenarioId;
  number: string;
  tabLabel: string;
  shortLabel: string;
  accent: ScenarioAccent;
  pathNodeIds: TopologyNodeId[];
  storySteps: StoryStep[];
  outcomeTitle: string;
  outcomes: string[];
  coreStatus: CoreStatus;
  ctaHref: string;
}

export const topologyNodes: TopologyNodeConfig[] = [
  {
    id: "external-surface",
    label: "External Surface",
    shortStatus: "Attack surface",
    description: "Publiczna ekspozycja — aplikacje, API i usługi dostępne z internetu.",
    x: 18,
    y: 14,
    icon: "globe",
  },
  {
    id: "identity",
    label: "Identity",
    shortStatus: "Access control",
    description: "Tożsamość, uprawnienia i ścieżki eskalacji — kluczowy wektor ataku.",
    x: 82,
    y: 18,
    icon: "key",
  },
  {
    id: "cloud",
    label: "Cloud",
    shortStatus: "Shared responsibility",
    description: "Konfiguracja chmury, IAM i ekspozycja zasobów w środowisku multi-cloud.",
    x: 88,
    y: 48,
    icon: "cloud",
  },
  {
    id: "applications",
    label: "Applications",
    shortStatus: "Business logic",
    description: "Aplikacje webowe, API i logika biznesowa — główny cel eksploatacji.",
    x: 72,
    y: 78,
    icon: "app",
  },
  {
    id: "endpoints",
    label: "Endpoints",
    shortStatus: "EDR coverage",
    description: "Stacje robocze i serwery — pierwszy sygnał w detekcji incydentu.",
    x: 12,
    y: 72,
    icon: "monitor",
  },
  {
    id: "soc",
    label: "SOC",
    shortStatus: "Detection & triage",
    description: "Korelacja, triage i eskalacja — przekształcenie alertu w działanie.",
    x: 28,
    y: 48,
    icon: "radar",
  },
  {
    id: "it-core",
    label: "IT Core",
    shortStatus: "Critical systems",
    description: "Infrastruktura krytyczna łącząca warstwy IT i operacje biznesowe.",
    x: 50,
    y: 82,
    icon: "server",
  },
  {
    id: "ot-ics",
    label: "OT / ICS",
    shortStatus: "Production safety",
    description: "Środowisko przemysłowe — segmentacja i monitoring bez przestoju produkcji.",
    x: 62,
    y: 10,
    icon: "factory",
  },
  {
    id: "governance",
    label: "Governance",
    shortStatus: "Compliance evidence",
    description: "Polityki, dowody zgodności i odpowiedzialność zarządu wobec regulacji.",
    x: 6,
    y: 42,
    icon: "shield",
  },
  {
    id: "resilience-core",
    label: "Cyber Resilience Core",
    shortStatus: "BUSINESS CONTINUITY",
    description: "Rdzeń odporności — miejsce, w którym sygnał staje się decyzją operacyjną.",
    x: 50,
    y: 50,
    icon: "core",
    isCore: true,
  },
];

export const heroScenarios: HeroScenario[] = [
  {
    id: "vulnerability",
    number: "01",
    tabLabel: "Eksploatowana podatność",
    shortLabel: "Podatność",
    accent: "cyan",
    pathNodeIds: ["external-surface", "applications", "identity", "it-core", "resilience-core"],
    storySteps: [
      {
        title: "Publiczny sygnał CVE",
        description: "Nowe CVE critical/high w NVD — filtrujemy według EPSS, KEV i kontekstu Twojego środowiska.",
      },
      {
        title: "Weryfikacja ekspozycji",
        description: "Sprawdzamy, czy podatność wpływa na realne zasoby i procesy organizacji.",
      },
      {
        title: "Kontrolowany test exploitability",
        description: "Pentest w uzgodnionym zakresie potwierdza lub obala realne ryzyko eksploatacji.",
      },
      {
        title: "Remediacja zaplanowana",
        description: "Priorytetyzacja poprawek: CVSS × EPSS × ekspozycja × wpływ biznesowy.",
      },
      {
        title: "Retest potwierdza rezultat",
        description: "Weryfikacja remediacji jako deliverable — zamknięcie pętli odporności.",
      },
    ],
    outcomeTitle: "Priorytet oparty na CVSS, EPSS, KEV i kontekście biznesowym",
    outcomes: ["Reduced exposure", "Clear remediation priority", "Executive-ready evidence"],
    coreStatus: "Exposure",
    ctaHref: "/oferta/pentesty",
  },
  {
    id: "soc-incident",
    number: "02",
    tabLabel: "Incydent w SOC",
    shortLabel: "Incydent SOC",
    accent: "blue",
    pathNodeIds: ["endpoints", "identity", "soc", "it-core", "resilience-core"],
    storySteps: [
      {
        title: "Sygnał z EDR/SIEM",
        description: "Alert z wielu źródeł logów — korelacja bez przeładowania fałszywymi pozytywami.",
      },
      {
        title: "Korelacja i kontekst",
        description: "Łączymy zdarzenia w spójną narrację techniczną i biznesową.",
      },
      {
        title: "Mapowanie MITRE ATT&CK",
        description: "Identyfikujemy taktykę i technikę — wiemy, na jakim etapie jest atak.",
      },
      {
        title: "Triage i eskalacja",
        description: "Priorytetyzacja P1–P3 według playbooka i uzgodnionego SLA.",
      },
      {
        title: "Rekomendacja hardeningu",
        description: "Konkretne działania zapobiegające powtórzeniu incydentu.",
      },
    ],
    outcomeTitle: "Sygnał techniczny przekształcony w kontrolowane działanie",
    outcomes: ["Faster triage", "MITRE-mapped response", "Hardening roadmap"],
    coreStatus: "Detection",
    ctaHref: "/oferta/soc",
  },
  {
    id: "regulatory",
    number: "03",
    tabLabel: "Presja regulacyjna",
    shortLabel: "NIS2 / DORA",
    accent: "green",
    pathNodeIds: ["governance", "identity", "cloud", "it-core", "resilience-core"],
    storySteps: [
      {
        title: "Identyfikacja obowiązków",
        description: "Mapowanie wymagań NIS2, DORA lub KSC na profil i rolę organizacji.",
      },
      {
        title: "Gap analysis",
        description: "Rejestr luk P1–P3 z dowodami — co wymaga natychmiastowej uwagi zarządu.",
      },
      {
        title: "Dowody działania kontroli",
        description: "Procedury SZBI i operacyjne dowody, nie tylko dokumenty na dysku.",
      },
      {
        title: "Plan naprawczy",
        description: "Roadmapa remediacji z priorytetami i odpowiedzialnościami.",
      },
      {
        title: "Audyt weryfikacyjny",
        description: "Potwierdzenie zgodności przed kontrolą regulatora lub audytorem.",
      },
    ],
    outcomeTitle: "Zgodność poparta dowodami, odpowiedzialnością i roadmapą",
    outcomes: ["Audit-ready evidence", "ICT risk register", "Board-level roadmap"],
    coreStatus: "Compliance",
    ctaHref: "/oferta/audyty",
  },
  {
    id: "ot-ics",
    number: "04",
    tabLabel: "Ryzyko OT/ICS",
    shortLabel: "OT / ICS",
    accent: "amber",
    pathNodeIds: ["external-surface", "it-core", "ot-ics", "soc", "resilience-core"],
    storySteps: [
      {
        title: "Pasywna inwentaryzacja",
        description: "Mapowanie topologii IT/OT bez wpływu na produkcję — safety-first.",
      },
      {
        title: "Identyfikacja ścieżki IT–OT",
        description: "Gdzie atak z warstwy biurowej może dotrzeć do HMI/SCADA.",
      },
      {
        title: "Strefy i konduity",
        description: "Projekt segmentacji wg IEC 62443 — ograniczenie propagacji ataku.",
      },
      {
        title: "Bezpieczny zdalny dostęp",
        description: "Jump host i kontrolowany dostęp vendorów bez otwierania produkcji.",
      },
      {
        title: "Monitoring bez zatrzymania produkcji",
        description: "Pasywny monitoring anomalii — zero niekontrolowanych przestojów.",
      },
    ],
    outcomeTitle: "Redukcja ryzyka bez niekontrolowanego wpływu na produkcję",
    outcomes: ["Zero-downtime plan", "IEC 62443 zones", "Passive OT visibility"],
    coreStatus: "Resilience",
    ctaHref: "/oferta/ot-ics",
  },
];

export const defaultScenarioId: HeroScenarioId = "vulnerability";

export function getScenarioById(id: HeroScenarioId): HeroScenario | undefined {
  return heroScenarios.find((s) => s.id === id);
}

export function getTopologyNode(id: TopologyNodeId): TopologyNodeConfig | undefined {
  return topologyNodes.find((n) => n.id === id);
}

export const accentColors: Record<ScenarioAccent, { primary: string; glow: string; ring: string }> = {
  cyan: { primary: "#00d4ff", glow: "rgba(0,212,255,0.35)", ring: "rgba(0,212,255,0.5)" },
  blue: { primary: "#0066ff", glow: "rgba(0,102,255,0.35)", ring: "rgba(0,102,255,0.5)" },
  green: { primary: "#00e676", glow: "rgba(0,230,118,0.35)", ring: "rgba(0,230,118,0.5)" },
  amber: { primary: "#ffb020", glow: "rgba(255,176,32,0.35)", ring: "rgba(255,176,32,0.5)" },
};
