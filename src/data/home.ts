/**
 * Treści strony głównej — Tu edytujesz copy bez ruszania komponentów.
 */

export const homeHero = {
  badge: "ISO/IEC 27001:2022 · SOC · Pentesty · NIS2 · DORA · OT/ICS",
  h1: "Cyberodporność dla organizacji, które nie mogą pozwolić sobie na przestój.",
  subcopy:
    "Łączymy pentesty, audyty, SOC, compliance i bezpieczeństwo OT/ICS w jeden program redukcji ryzyka — od wykrycia podatności po monitoring, dokumentację i plan naprawczy dla zarządu.",
  ctaPrimary: { label: "Umów konsultację", href: "/kontakt" },
  ctaSecondary: { label: "Zbuduj zakres usługi", href: "/oferta/pentesty#scope-builder" },
  ctaTertiary: { label: "Zobacz publiczny Threat Pulse", href: "#public-threat-pulse" },
  microcopy: [
    "Nie pokazujemy fajerwerków. Pokazujemy, jak z publicznego sygnału zagrożenia powstaje decyzja: test, audyt, monitoring albo remediacja.",
    "Publiczny Threat Pulse nie jest telemetrią klientów SprintTech. To kontekst zagrożeń z legalnych źródeł, który pomaga priorytetyzować działania.",
  ],
};

export const securityPathSection = {
  id: "security-path",
  title: "Choose your security path",
  subtitle: "Wybierz scenariusz — przejdź do usługi dopasowanej do Twojego priorytetu.",
  paths: [
    {
      id: "pentest",
      title: "Pentesty",
      description: "Kontrolowane testy exploitability — od aplikacji webowych po OT/ICS.",
      href: "/oferta/pentesty",
      scenarioId: "vulnerability" as const,
      icon: "target",
    },
    {
      id: "soc",
      title: "SOC",
      description: "Monitoring 24/7, korelacja, triage i eskalacja według SLA.",
      href: "/oferta/soc",
      scenarioId: "soc-incident" as const,
      icon: "radar",
    },
    {
      id: "audit",
      title: "Audyty",
      description: "NIS2, DORA, KSC, ISO 27001 — gap analysis i dowody zgodności.",
      href: "/oferta/audyty",
      scenarioId: "regulatory" as const,
      icon: "shield",
    },
    {
      id: "ot",
      title: "OT/ICS",
      description: "Segmentacja, IEC 62443, modernizacja bez przestoju produkcji.",
      href: "/oferta/ot-ics",
      scenarioId: "ot-ics" as const,
      icon: "factory",
    },
  ],
};

export const publicThreatPulseSection = {
  id: "public-threat-pulse",
  title: "Public Threat Pulse",
  subtitle:
    "Kontekst zagrożeń z legalnych źródeł publicznych — NVD, FIRST EPSS, raporty ENISA i Verizon DBIR. Nie jest to telemetria SOC SprintTech.",
  disclaimer:
    "Dane CVE pochodzą z publicznych API z cache po stronie serwera. Scenariusze procesowe są symulowane. Zawsze weryfikuj źródło i datę aktualizacji.",
};

export const signalToActionSection = {
  id: "signal-to-action",
  title: "Od sygnału do działania",
  subtitle: "Jak SprintTech przekształca publiczny kontekst zagrożeń i wymagania regulacyjne w konkretne działania.",
  steps: [
    { step: 1, title: "Kontekst", description: "Publiczne CVE, EPSS, raporty branżowe lub wymogi NIS2/DORA/KSC." },
    { step: 2, title: "Priorytetyzacja", description: "CVSS × EPSS × ekspozycja × kontekst biznesowy lub regulacyjny." },
    { step: 3, title: "Weryfikacja", description: "Pentest, audyt, gap analysis lub pasywne rozpoznanie OT." },
    { step: 4, title: "Remediacja", description: "Raport techniczny + executive summary + plan naprawczy." },
    { step: 5, title: "Utrwalenie", description: "Retest, SOC, dokumentacja SZBI lub modernizacja OT." },
  ],
};

export const offerPreviewSection = {
  title: "Oferta w skrócie",
  subtitle: "Filtruj według scenariusza — każda karta prowadzi do szczegółowego zakresu usługi.",
  filters: [
    { id: "all", label: "Wszystkie" },
    { id: "vulnerability", label: "Podatności" },
    { id: "soc-incident", label: "SOC" },
    { id: "regulatory", label: "Compliance" },
    { id: "ot-ics", label: "OT/ICS" },
  ],
};

export const whySection = {
  title: "Dlaczego SprintTech",
  subtitle:
    "Zespół inżynierów, audytorów, pentesterów i operatorów SOC — nie agencja od slajdów. Realne kompetencje w IT, OT i środowiskach regulowanych.",
};

export const caseStudySection = {
  title: "Case studies",
  subtitle: "Anonimowe studia przypadków z mierzalnymi rezultatami — bez ujawniania danych wrażliwych.",
  cta: { label: "Wszystkie case studies", href: "/case-study" },
};

export const leadMagnetSection = {
  title: "Sprawdź gotowość organizacji na NIS2/DORA",
  subtitle: "Krótki formularz kwalifikacyjny — propozycja audytu lub konsultacji dopasowana do regulacji.",
  bullets: [
    "Bezpłatna wstępna konsultacja (30 min)",
    "Propozycja zakresu audytu lub testów",
    "Szacunkowy harmonogram i deliverables",
  ],
};

export const finalCtaSection = {
  title: "Gotowy na rozmowę o cyberodporności?",
  subtitle: "Umów konsultację — dopasujemy zakres do środowiska i wymagań regulacyjnych.",
  cta: { label: "Umów konsultację", href: "/kontakt" },
};
