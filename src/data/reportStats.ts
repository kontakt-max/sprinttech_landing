/** Statyczne statystyki z publicznych raportów — kuratorowane ręcznie, bez fetch PDF. */

export interface ReportStat {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  sourceId: string;
  sourceTitle: string;
  sourceUrl: string;
  publicationDate: string;
}

export const reportStats: ReportStat[] = [
  {
    id: "enisa-incidents",
    label: "Incydenty analizowane przez ENISA",
    value: "4 875",
    description: "Liczba incydentów w analizie Threat Landscape 2025 (okres 1.07.2024–30.06.2025).",
    sourceId: "enisa",
    sourceTitle: "ENISA Threat Landscape 2025",
    sourceUrl: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
    publicationDate: "2025-10-01",
  },
  {
    id: "dbir-vuln-entry",
    label: "Naruszenia zaczynające się od podatności",
    value: "31",
    unit: "%",
    description: "Udział wektorów opartych o luki w oprogramowaniu w naruszeniach (Verizon DBIR 2026).",
    sourceId: "verizon-dbir",
    sourceTitle: "Verizon Data Breach Investigations Report 2026",
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    publicationDate: "2026-04-01",
  },
  {
    id: "dbir-ransomware",
    label: "Naruszenia z ransomware",
    value: "48",
    unit: "%",
    description: "Udział ransomware w analizowanych naruszeniach (Verizon DBIR 2026).",
    sourceId: "verizon-dbir",
    sourceTitle: "Verizon Data Breach Investigations Report 2026",
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    publicationDate: "2026-04-01",
  },
  {
    id: "dbir-mobile-click",
    label: "Wzrost klikalności phishingu mobilnego",
    value: "40",
    unit: "%",
    description: "Wyższy wskaźnik klikalności na urządzeniach mobilnych vs desktop (Verizon DBIR 2026).",
    sourceId: "verizon-dbir",
    sourceTitle: "Verizon Data Breach Investigations Report 2026",
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    publicationDate: "2026-04-01",
  },
];
