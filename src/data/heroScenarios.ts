/**
 * Scenariusze interaktywnego hero — Tu edytujesz copy, kroki procesu i mapowanie usług bez ruszania komponentów.
 */

export type HeroScenarioId = "vulnerability" | "soc-incident" | "regulatory" | "ot-ics";

export interface ScenarioNode {
  id: string;
  label: string;
  x: number;
  y: number;
  description?: string;
}

export interface ScenarioEdge {
  from: string;
  to: string;
  label?: string;
}

export interface SimulatedEvent {
  id: string;
  timestamp: string;
  message: string;
  type: "process" | "context";
}

export interface HeroScenario {
  id: HeroScenarioId;
  tabLabel: string;
  panelTitle: string;
  panelDescription: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  serviceIds: string[];
  nextSteps: string[];
  nodes: ScenarioNode[];
  edges: ScenarioEdge[];
  activeNodeIds: string[];
  simulatedEvents: SimulatedEvent[];
  mitreTacticIds?: string[];
  metrics: { label: string; value: string; source: "simulated" | "api" | "static" }[];
  dataDisclaimer: string;
}

export const heroScenarios: HeroScenario[] = [
  {
    id: "vulnerability",
    tabLabel: "Eksploatowana podatność",
    panelTitle: "Od CVE do decyzji zarządczej",
    panelDescription:
      "Publiczny sygnał zagrożenia (NVD, EPSS, KEV) → priorytetyzacja → kontrolowany test exploitability → raport i retest.",
    ctaLabel: "Sprawdź podatności",
    ctaHref: "/oferta/pentesty",
    secondaryCtaHref: "/kontakt?interest=pentest",
    serviceIds: ["pentest-web", "pentest-infra", "pentest-cloud"],
    nextSteps: [
      "Weryfikacja ekspozycji",
      "Priorytetyzacja EPSS/CVSS/KEV",
      "Kontrolowany test exploitability",
      "Raport techniczny + executive summary",
      "Retest po remediacji",
    ],
    nodes: [
      { id: "cve", label: "CVE", x: 10, y: 50, description: "Publikacja w NVD" },
      { id: "epss", label: "EPSS", x: 30, y: 35, description: "Prawdopodobieństwo eksploatacji" },
      { id: "kev", label: "KEV/NVD", x: 30, y: 65, description: "Known Exploited Vulnerabilities" },
      { id: "pentest", label: "Pentest", x: 55, y: 50, description: "Kontrolowana weryfikacja" },
      { id: "report", label: "Raport", x: 75, y: 40, description: "CVSS + ryzyko biznesowe" },
      { id: "retest", label: "Retest", x: 90, y: 50, description: "Weryfikacja remediacji" },
    ],
    edges: [
      { from: "cve", to: "epss", label: "score" },
      { from: "cve", to: "kev", label: "flag" },
      { from: "epss", to: "pentest" },
      { from: "kev", to: "pentest" },
      { from: "pentest", to: "report" },
      { from: "report", to: "retest" },
    ],
    activeNodeIds: ["cve", "epss", "kev", "pentest"],
    simulatedEvents: [
      { id: "v1", timestamp: "T+0", message: "[Kontekst publiczny] Nowe CVE critical/high w NVD — filtrowanie według EPSS i KEV", type: "context" },
      { id: "v2", timestamp: "T+1", message: "[Symulacja procesu] Mapowanie CVE na ekspozycję w infrastrukturze klienta", type: "process" },
      { id: "v3", timestamp: "T+2", message: "[Symulacja procesu] Priorytetyzacja: CVSS × EPSS × kontekst biznesowy", type: "process" },
      { id: "v4", timestamp: "T+3", message: "[Symulacja procesu] Zaplanowany pentest / weryfikacja exploitability w uzgodnionym zakresie", type: "process" },
    ],
    metrics: [
      { label: "Źródło CVE", value: "NVD", source: "api" },
      { label: "Wzbogacenie", value: "EPSS + KEV", source: "api" },
      { label: "Deliverable", value: "Raport + retest", source: "simulated" },
    ],
    dataDisclaimer:
      "CVE/EPSS/KEV pochodzą z publicznych API. Ścieżka pentest → raport → retest to symulowany przebieg procesu SprintTech, nie telemetria klientów.",
  },
  {
    id: "soc-incident",
    tabLabel: "Incydent w SOC",
    panelTitle: "Od logu do eskalacji i raportu",
    panelDescription:
      "Symulowany przepływ analizy incydentu: źródło logów → korelacja → mapowanie MITRE → triage → eskalacja według SLA.",
    ctaLabel: "Porozmawiaj o SOC",
    ctaHref: "/oferta/soc",
    secondaryCtaHref: "/kontakt?interest=soc",
    serviceIds: ["soc-monitoring"],
    nextSteps: [
      "Korelacja logów",
      "Mapowanie MITRE",
      "Triage i priorytet",
      "Eskalacja według SLA",
      "Raport i rekomendacje hardeningu",
    ],
    nodes: [
      { id: "logs", label: "Log Source", x: 8, y: 50 },
      { id: "correlation", label: "Korelacja", x: 25, y: 50 },
      { id: "mitre", label: "MITRE", x: 42, y: 35 },
      { id: "triage", label: "Triage", x: 42, y: 65 },
      { id: "escalation", label: "Eskalacja", x: 62, y: 50 },
      { id: "report", label: "Raport", x: 82, y: 50 },
    ],
    edges: [
      { from: "logs", to: "correlation" },
      { from: "correlation", to: "mitre" },
      { from: "correlation", to: "triage" },
      { from: "mitre", to: "escalation" },
      { from: "triage", to: "escalation" },
      { from: "escalation", to: "report" },
    ],
    activeNodeIds: ["logs", "correlation", "mitre", "triage", "escalation"],
    mitreTacticIds: ["TA0001", "TA0008", "TA0010"],
    simulatedEvents: [
      { id: "s1", timestamp: "T+0", message: "[Symulacja procesu] Alert z SIEM/EDR — korelacja z 4 źródeł logów", type: "process" },
      { id: "s2", timestamp: "T+5m", message: "[Symulacja procesu] Mapowanie na MITRE: Initial Access → Lateral Movement", type: "process" },
      { id: "s3", timestamp: "T+12m", message: "[Symulacja procesu] Triage P2 — analiza kontekstu i fałszywych pozytywów", type: "process" },
      { id: "s4", timestamp: "T+18m", message: "[Symulacja procesu] Eskalacja do IR według playbooka i SLA", type: "process" },
    ],
    metrics: [
      { label: "Tryb", value: "Symulacja SOC", source: "simulated" },
      { label: "Framework", value: "MITRE ATT&CK", source: "static" },
      { label: "SLA P1", value: "< 15 min", source: "simulated" },
    ],
    dataDisclaimer:
      "Przepływ incydentu to symulowany przebieg procesu SOC SprintTech. Nie jest to telemetria rzeczywistych klientów ani live feed operacyjny.",
  },
  {
    id: "regulatory",
    tabLabel: "Presja regulacyjna",
    panelTitle: "Od wymogu do dowodów zgodności",
    panelDescription:
      "NIS2 / DORA / KSC → gap analysis → dokumentacja → audyt → roadmapa remediacji z priorytetami dla zarządu.",
    ctaLabel: "Oceń gotowość",
    ctaHref: "/oferta/audyty",
    secondaryCtaHref: "/kontakt?interest=audyt",
    serviceIds: ["audit-nis2", "audit-dora", "audit-ksc", "documentation"],
    nextSteps: [
      "Gap analysis",
      "Rejestr ryzyk ICT",
      "Procedury i dowody zgodności",
      "Audyt",
      "Roadmapa remediacji",
    ],
    nodes: [
      { id: "reg", label: "NIS2/DORA/KSC", x: 12, y: 50 },
      { id: "gap", label: "Gap Analysis", x: 30, y: 50 },
      { id: "docs", label: "Dokumentacja", x: 48, y: 35 },
      { id: "evidence", label: "Dowody", x: 48, y: 65 },
      { id: "audit", label: "Audyt", x: 68, y: 50 },
      { id: "roadmap", label: "Roadmapa", x: 88, y: 50 },
    ],
    edges: [
      { from: "reg", to: "gap" },
      { from: "gap", to: "docs" },
      { from: "gap", to: "evidence" },
      { from: "docs", to: "audit" },
      { from: "evidence", to: "audit" },
      { from: "audit", to: "roadmap" },
    ],
    activeNodeIds: ["reg", "gap", "docs", "evidence"],
    simulatedEvents: [
      { id: "r1", timestamp: "Faza 1", message: "[Symulacja procesu] Identyfikacja wymagań NIS2/DORA/KSC dla profilu organizacji", type: "process" },
      { id: "r2", timestamp: "Faza 2", message: "[Symulacja procesu] Gap analysis — rejestr luk P1–P3 z dowodami", type: "process" },
      { id: "r3", timestamp: "Faza 3", message: "[Symulacja procesu] Uzupełnienie dokumentacji SZBI i procedur operacyjnych", type: "process" },
      { id: "r4", timestamp: "Faza 4", message: "[Symulacja procesu] Audyt weryfikacyjny i roadmapa 12–18 miesięcy", type: "process" },
    ],
    metrics: [
      { label: "Regulacje", value: "NIS2·DORA·KSC", source: "static" },
      { label: "Deliverable", value: "Mapa zgodności", source: "simulated" },
      { label: "Odbiorca", value: "Zarząd + audyt", source: "simulated" },
    ],
    dataDisclaimer:
      "Scenariusz regulacyjny ilustruje metodykę audytu i dokumentacji SprintTech. Statystyki branżowe pochodzą z raportów ENISA/Verizon, nie z danych klientów.",
  },
  {
    id: "ot-ics",
    tabLabel: "Ryzyko OT/ICS",
    panelTitle: "Od IT do linii produkcyjnej",
    panelDescription:
      "Ścieżka ryzyka: Enterprise IT → DMZ → OT Core → HMI/SCADA → PLC/RTU. Segmentacja, konduity i monitoring bez przestoju produkcji.",
    ctaLabel: "Zaplanuj modernizację OT",
    ctaHref: "/oferta/ot-ics",
    secondaryCtaHref: "/kontakt?interest=ot",
    serviceIds: ["ot-modernization", "pentest-ot"],
    nextSteps: [
      "Pasywna inwentaryzacja",
      "Strefy i konduity",
      "Zdalny dostęp przez jump host",
      "Monitoring anomalii",
      "Plan modernizacji bez przestoju",
    ],
    nodes: [
      { id: "it", label: "Enterprise IT", x: 8, y: 50 },
      { id: "dmz", label: "DMZ", x: 25, y: 50 },
      { id: "otcore", label: "OT Core", x: 45, y: 50 },
      { id: "hmi", label: "HMI/SCADA", x: 62, y: 35 },
      { id: "plc", label: "PLC/RTU", x: 62, y: 65 },
      { id: "segment", label: "Segmentacja", x: 85, y: 50 },
    ],
    edges: [
      { from: "it", to: "dmz" },
      { from: "dmz", to: "otcore" },
      { from: "otcore", to: "hmi" },
      { from: "otcore", to: "plc" },
      { from: "hmi", to: "segment" },
      { from: "plc", to: "segment" },
    ],
    activeNodeIds: ["it", "dmz", "otcore", "hmi", "plc"],
    simulatedEvents: [
      { id: "o1", timestamp: "Krok 1", message: "[Symulacja procesu] Mapowanie topologii IT/OT — pasywna inwentaryzacja 48h", type: "process" },
      { id: "o2", timestamp: "Krok 2", message: "[Symulacja procesu] Identyfikacja ścieżki lateral movement: biuro → HMI", type: "process" },
      { id: "o3", timestamp: "Krok 3", message: "[Symulacja procesu] Projekt stref i konduits wg IEC 62443-3-2", type: "process" },
      { id: "o4", timestamp: "Krok 4", message: "[Symulacja procesu] Wdrożenie fazowe — zero przestojów produkcji", type: "process" },
    ],
    metrics: [
      { label: "Standard", value: "IEC 62443", source: "static" },
      { label: "Tryb", value: "Safety-first", source: "simulated" },
      { label: "Przestoje", value: "0", source: "simulated" },
    ],
    dataDisclaimer:
      "Diagram OT/ICS to symulowany model architektury zakładu. Nie przedstawia rzeczywistej infrastruktury żadnego klienta.",
  },
];

export const defaultScenarioId: HeroScenarioId = "vulnerability";

export function getScenarioById(id: HeroScenarioId): HeroScenario | undefined {
  return heroScenarios.find((s) => s.id === id);
}
