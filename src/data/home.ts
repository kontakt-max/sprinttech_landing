/**
 * Treści strony głównej — Tu edytujesz copy i konfigurację sekcji bez ruszania komponentów.
 */

export const homeHero = {
  badge: "ISO/IEC 27001:2022 · SOC · Pentesty · NIS2 · DORA · OT/ICS",
  h1GradientWord: "Cyberodporność",
  h1Rest: "Twojej organizacji,",
  subcopy:
    "Łączymy pentesty, audyty, SOC, compliance i bezpieczeństwo OT/ICS w jeden program redukcji ryzyka — od sygnału zagrożenia do kontrolowanej remediacji i decyzji zarządczej.",
  ctaPrimary: { label: "Umów konsultację", href: "/kontakt" },
  ctaSecondary: { label: "Zobacz, jak działamy", href: "#signal-to-action" },
};

export const securityPathSection = {
  id: "security-path",
  title: "Wybierz swoją ścieżkę bezpieczeństwa",
  subtitle: "Wybierz scenariusz dopasowany do priorytetu — każda ścieżka prowadzi do konkretnej usługi i pierwszego kroku.",
  paths: [
    {
      id: "resilience",
      title: "Chcę sprawdzić realną odporność",
      problem: "Nie wiesz, czy kontrolki rzeczywiście chronią przed eksploatacją w Twoim środowisku.",
      risk: "Podatność wykryta publicznie może być już wykorzystywana, zanim zdążysz ją naprawić.",
      firstStep: "Zmapuj ekspozycję i zaplanuj kontrolowany pentest w uzgodnionym zakresie.",
      href: "/oferta/pentesty",
      scenarioId: "vulnerability" as const,
      icon: "target",
    },
    {
      id: "regulatory",
      title: "Muszę spełnić wymagania regulacyjne",
      problem: "NIS2, DORA lub KSC wymagają dowodów procesów — nie tylko dokumentów na półce.",
      risk: "Brak audytowalnych dowodów i rejestru ryzyk ICT to ryzyko sankcji i odpowiedzialności zarządu.",
      firstStep: "Przeprowadź gap analysis i zbuduj rejestr luk z priorytetami P1–P3.",
      href: "/oferta/audyty",
      scenarioId: "regulatory" as const,
      icon: "shield",
    },
    {
      id: "soc",
      title: "Chcę monitorować incydenty",
      problem: "Logi są, ale brakuje korelacji, triage i eskalacji według SLA.",
      risk: "Incydent wykryty za późno — lateral movement, ransomware lub wyciek danych.",
      firstStep: "Zdefiniuj use case'y detekcji i playbook eskalacji z mapowaniem MITRE.",
      href: "/oferta/soc",
      scenarioId: "soc-incident" as const,
      icon: "radar",
    },
    {
      id: "ot",
      title: "Modernizuję środowisko przemysłowe",
      problem: "IT i OT są połączone, ale segmentacja i monitoring nie nadążają za produkcją.",
      risk: "Atak z biura może dotrzeć do HMI/SCADA — przestój linii produkcyjnej.",
      firstStep: "Pasywna inwentaryzacja OT i projekt stref wg IEC 62443 bez przestoju.",
      href: "/oferta/ot-ics",
      scenarioId: "ot-ics" as const,
      icon: "factory",
    },
    {
      id: "executive",
      title: "Potrzebuję planu dla zarządu",
      problem: "Zarząd oczekuje mierzalnej redukcji ryzyka, a nie kolejnego raportu technicznego.",
      risk: "Decyzje inwestycyjne bez kontekstu ryzyka i ROI w cyberbezpieczeństwie.",
      firstStep: "Zbuduj program cyberodporności z roadmapą, KPI i executive summary.",
      href: "/kontakt?interest=program",
      scenarioId: "regulatory" as const,
      icon: "chart",
    },
  ],
};

export const publicThreatPulseSection = {
  id: "public-threat-pulse",
  title: "Public Threat Pulse",
  subtitle:
    "Kontekst zagrożeń z legalnych źródeł publicznych — NVD, FIRST EPSS i raporty ENISA/Verizon. Nie jest to telemetria SOC SprintTech ani skan Twojej organizacji.",
  disclaimer:
    "Dane CVE pochodzą z publicznych API z cache po stronie serwera. Scenariusze procesowe w hero są symulowane. Zawsze weryfikuj źródło i datę aktualizacji przed decyzją.",
  fallbackMessage:
    "Dane publiczne chwilowo niedostępne — prezentujemy fallback edukacyjny z raportów branżowych.",
  ctas: [
    { label: "Sprawdź ekspozycję organizacji", href: "/oferta/pentesty#scope-builder" },
    { label: "Umów konsultację podatności", href: "/kontakt?interest=pentest" },
    { label: "Zobacz pentesty", href: "/oferta/pentesty" },
  ],
  epssExplainer:
    "EPSS (Exploit Prediction Scoring System) wspiera priorytetyzację: łączymy CVSS, EPSS i flagę KEV z kontekstem Twojego środowiska — nie tylko surowy wynik z bazy.",
};

export const signalToActionSection = {
  id: "signal-to-action",
  title: "Od sygnału do działania",
  subtitle:
    "Jak SprintTech przekształca publiczny kontekst zagrożeń, zgłoszenie klienta lub wymóg regulacyjny w konkretne działania operacyjne.",
  steps: [
    {
      step: 1,
      title: "Rozpoznanie sygnału",
      description:
        "CVE z NVD, alert EPSS/KEV, raport branżowy lub zgłoszenie wewnętrzne — identyfikujemy źródło i kontekst biznesowy.",
    },
    {
      step: 2,
      title: "Ocena ekspozycji",
      description:
        "Mapujemy ekspozycję na środowisko, regulacje i krytyczne procesy. Priorytetyzacja: CVSS × EPSS × ekspozycja × wpływ biznesowy.",
    },
    {
      step: 3,
      title: "Kontrolowana weryfikacja",
      description:
        "Pentest, audyt logowania, gap analysis NIS2/DORA lub pasywne rozpoznanie OT — zawsze w uzgodnionym zakresie i z safety-first.",
    },
    {
      step: 4,
      title: "Remediacja i dowody",
      description:
        "Deliverables: raport techniczny z PoC, executive summary, rejestr ryzyk i rekomendacje remediacji z priorytetami dla zarządu.",
    },
    {
      step: 5,
      title: "Retest lub monitoring",
      description:
        "Retest po remediacji, ciągły monitoring SOC lub audyt weryfikacyjny zgodności — zamknięcie pętli cyberodporności.",
    },
  ],
};

export const offerPreviewSection = {
  title: "Oferta w skrócie",
  subtitle: "Filtruj według scenariusza — każda karta prowadzi do szczegółowego zakresu usługi z deliverables.",
  filters: [
    { id: "all", label: "Wszystkie" },
    { id: "vulnerability", label: "Podatności" },
    { id: "soc-incident", label: "SOC" },
    { id: "regulatory", label: "Compliance" },
    { id: "ot-ics", label: "OT/ICS" },
  ],
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
