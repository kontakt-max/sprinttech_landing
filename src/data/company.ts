export const companyInfo = {
  name: "SprintTech",
  legalName: "SprintTech Sp. z o.o.",
  parent: "Sprint SA",
  tagline: "Cyberodporność dla organizacji, które nie mogą pozwolić sobie na przestój",
  description:
    "Wyspecjalizowana spółka cyberbezpieczeństwa oferująca pentesty, audyty, SOC, compliance i bezpieczeństwo OT/ICS. Certyfikat ISO/IEC 27001:2022.",
  email: "kontakt@sprinttech.pl",
  phone: "+48 22 000 00 00",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL ??
    "https://www.linkedin.com/company/sprinttech",
  certifications: [
    "ISO/IEC 27001:2022",
    "SOC",
    "Pentesty",
    "NIS2",
    "DORA",
    "KSC",
    "OT/ICS",
  ],
};

export const whySprintTech = [
  {
    title: "Eksperci techniczno-operacyjni",
    description:
      "Zespół inżynierów bezpieczeństwa, audytorów, pentesterów i operatorów SOC — nie tylko konsultanci od slajdów. Realne kompetencje w testach, audytach i reagowaniu na incydenty.",
    icon: "users",
  },
  {
    title: "Audyt + wdrożenie + monitoring + reakcja",
    description:
      "Pełny cykl: od oceny ryzyka przez remediację po ciągły monitoring. Nie zostawiamy organizacji z raportem — wspieramy wdrożenie i weryfikujemy skuteczność.",
    icon: "cycle",
  },
  {
    title: "Doświadczenie w IT, OT i środowiskach regulowanych",
    description:
      "Finanse, infrastruktura krytyczna, przemysł, medycyna, sektor publiczny. Znamy wymagania DORA, NIS2, KSC, ISO 27001 i specyfikę środowisk OT.",
    icon: "shield",
  },
  {
    title: "Program oceny cyberdojrzałości",
    description:
      "Strukturalna ocena dojrzałości z benchmarkiem branżowym. Mierzalny postęp, priorytetyzacja inwestycji i język zrozumiały dla zarządu.",
    icon: "chart",
  },
  {
    title: "Podejście oparte o ryzyko, nie checklistę",
    description:
      "Zgodność formalna to minimum. Skupiamy się na redukcji realnego ryzyka biznesowego — priorytetyzacja działań według wpływu, nie według liczby checkboxów.",
    icon: "target",
  },
];

export const cooperationProcess = [
  {
    step: 1,
    title: "Rozpoznanie i zakres",
    description:
      "Warsztat kick-off: cele biznesowe, środowisko techniczne, wymagania regulacyjne. Definicja zakresu, ograniczeń i kryteriów sukcesu.",
  },
  {
    step: 2,
    title: "Bezpieczne przygotowanie testów",
    description:
      "Plan testów, whitelisty, okna serwisowe, kontakty awaryjne. Dla OT: safety-first z pisemnym zatwierdzeniem zakresu przez utrzymanie.",
  },
  {
    step: 3,
    title: "Realizacja techniczna / audytowa",
    description:
      "Pentest, audyt lub wdrożenie według uzgodnionej metodyki. Bieżąca komunikacja o ustaleń krytycznych (P1) w czasie rzeczywistym.",
  },
  {
    step: 4,
    title: "Raport z ryzykiem biznesowym",
    description:
      "Raport techniczny z CVSS i PoC oraz executive summary z mapą ryzyka biznesowego. Priorytetyzacja P1–P3 z uzasadnieniem.",
  },
  {
    step: 5,
    title: "Warsztat remediacyjny",
    description:
      "Sesja z zespołem technicznym i zarządem: omówienie ustaleń, plan naprawczy, odpowiedzialności i harmonogram.",
  },
  {
    step: 6,
    title: "Retest / monitoring / plan rozwoju",
    description:
      "Weryfikacja wdrożonych poprawek, opcjonalny monitoring SOC lub plan rozwoju dojrzałości na 12–24 miesiące.",
  },
];

export const timelineEvents = [
  {
    year: "2018",
    title: "Powstanie zespołu cyberbezpieczeństwa",
    description: "Formowanie kompetencji pentestów i audytów w grupie Sprint SA.",
  },
  {
    year: "2020",
    title: "Rozszerzenie o SOC",
    description: "Uruchomienie usług monitoringu i reagowania na incydenty.",
  },
  {
    year: "2022",
    title: "Kompetencje OT/ICS",
    description: "Certyfikacje i projekty w środowiskach przemysłowych i infrastrukturze krytycznej.",
  },
  {
    year: "2023",
    title: "Certyfikat ISO/IEC 27001:2022",
    description:
      "Potwierdzenie systemowego podejścia do bezpieczeństwa informacji w zakresie audytów, pentestów i SOC.",
  },
  {
    year: "2024",
    title: "Compliance DORA i NIS2",
    description: "Program audytów i dokumentacji dla sektora finansowego i podmiotów kluczowych.",
  },
  {
    year: "2025",
    title: "SprintTech jako wyspecjalizowana spółka",
    description: "Dedykowana marka cyberbezpieczeństwa w grupie Sprint SA.",
  },
];

export const capabilities = [
  { id: "audit", label: "Audit", areas: ["ISO 27001", "NIS2", "DORA", "KSC", "Security audit"] },
  { id: "pentest", label: "Pentest", areas: ["Web", "Mobile", "Infra", "Cloud", "OT", "Containers"] },
  { id: "soc", label: "SOC", areas: ["Monitoring 24/7", "Use cases", "IR support", "Reporting"] },
  { id: "ot", label: "OT", areas: ["Segmentation", "IEC 62443", "Passive monitoring", "Remote access"] },
  { id: "compliance", label: "Compliance", areas: ["DORA", "NIS2", "KSC", "KNF", "Polish Cloud 2.0"] },
];

export const trustBadges = [
  { label: "ISO/IEC 27001:2022", description: "System zarządzania bezpieczeństwem informacji" },
  { label: "SOC", description: "Security Operations Center 24/7" },
  { label: "Pentesty", description: "Kontrolowane testy penetracyjne" },
  { label: "NIS2", description: "Audyty i dokumentacja zgodności" },
  { label: "DORA", description: "Sektor finansowy i ICT risk" },
  { label: "KSC", description: "Infrastruktura krytyczna" },
  { label: "OT/ICS", description: "IEC 62443 i środowiska przemysłowe" },
];

export const navigation = [
  {
    label: "Oferta",
    href: "/oferta",
    children: [
      { label: "Pentesty", href: "/oferta/pentesty", description: "Testy penetracyjne IT i OT" },
      { label: "Audyty", href: "/oferta/audyty", description: "NIS2, DORA, KSC, ISO 27001" },
      { label: "SOC", href: "/oferta/soc", description: "Monitoring i reagowanie 24/7" },
      { label: "OT/ICS", href: "/oferta/ot-ics", description: "Bezpieczeństwo przemysłowe" },
      { label: "Dokumentacja", href: "/oferta/dokumentacja-compliance", description: "SZBI i compliance" },
    ],
  },
  { label: "O nas", href: "/o-nas" },
  { label: "Case Study", href: "/case-study" },
  { label: "Artykuły", href: "/artykuly" },
  { label: "Kontakt", href: "/kontakt" },
];
