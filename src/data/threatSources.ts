/** Konfiguracja publicznych źródeł threat intelligence. */

export interface ThreatSourceConfig {
  id: string;
  name: string;
  url: string;
  description: string;
  type: "api" | "static" | "disabled";
  enabled: boolean;
  cacheTtlHours: number;
  attributionRequired: boolean;
}

export const threatSources: ThreatSourceConfig[] = [
  {
    id: "nvd",
    name: "NVD (NIST)",
    url: "https://nvd.nist.gov/",
    description: "National Vulnerability Database — CVE, CVSS, CISA KEV flags.",
    type: "api",
    enabled: true,
    cacheTtlHours: 6,
    attributionRequired: true,
  },
  {
    id: "epss",
    name: "FIRST EPSS",
    url: "https://www.first.org/epss/",
    description: "Exploit Prediction Scoring System — prawdopodobieństwo eksploatacji CVE.",
    type: "api",
    enabled: true,
    cacheTtlHours: 6,
    attributionRequired: true,
  },
  {
    id: "mitre",
    name: "MITRE ATT&CK",
    url: "https://attack.mitre.org/",
    description: "Lokalny subset taktyk/technik do wizualizacji procesu SOC — nie pełny STIX.",
    type: "static",
    enabled: true,
    cacheTtlHours: 168,
    attributionRequired: true,
  },
  {
    id: "enisa",
    name: "ENISA Threat Landscape",
    url: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
    description: "Statyczne statystyki z raportu ENISA TL 2025.",
    type: "static",
    enabled: true,
    cacheTtlHours: 168,
    attributionRequired: true,
  },
  {
    id: "verizon-dbir",
    name: "Verizon DBIR",
    url: "https://www.verizon.com/business/resources/reports/dbir/",
    description: "Statyczne statystyki z raportu DBIR 2026.",
    type: "static",
    enabled: true,
    cacheTtlHours: 168,
    attributionRequired: true,
  },
  {
    id: "shadowserver",
    name: "Shadowserver",
    url: "https://www.shadowserver.org/",
    description: "Zewnętrzne publiczne dashboardy — connector wyłączony domyślnie. Brak raw IP/host indicators.",
    type: "disabled",
    enabled: false,
    cacheTtlHours: 24,
    attributionRequired: true,
  },
];

export function getEnabledSources(): ThreatSourceConfig[] {
  return threatSources.filter((s) => s.enabled);
}

export function getSourceById(id: string): ThreatSourceConfig | undefined {
  return threatSources.find((s) => s.id === id);
}
