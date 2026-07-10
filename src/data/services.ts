export type ServiceCategory =
  | "pentest"
  | "audit"
  | "soc"
  | "ot"
  | "compliance"
  | "documentation"
  | "awareness"
  | "cloud";

export type ServiceNeed =
  | "regulations"
  | "vulnerabilities"
  | "monitoring"
  | "ot-modernization"
  | "documentation";

export type ServiceEnvironment =
  | "web"
  | "mobile"
  | "cloud"
  | "infrastructure"
  | "database"
  | "container"
  | "ot-ics"
  | "organization"
  | "soc";

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  scope: string[];
  methodology: string[];
  results: string[];
  deliverables: string[];
  targetAudience: string[];
  category: ServiceCategory;
  needs: ServiceNeed[];
  environments: ServiceEnvironment[];
  href: string;
}

export const services: Service[] = [
  {
    id: "pentest-web",
    slug: "pentesty-aplikacji-webowych",
    title: "Pentesty aplikacji webowych",
    shortDescription:
      "Kontrolowane testy bezpieczeństwa aplikacji webowych i API zgodnie z OWASP, z priorytetyzacją ryzyka biznesowego.",
    problem:
      "Aplikacje webowe i API są głównym wektorem ataku — błędy autoryzacji, injection i logiki biznesowej prowadzą do wycieku danych i naruszeń zgodności.",
    scope: [
      "OWASP Top 10 i testy API",
      "Autoryzacja, sesje, IDOR, SSRF",
      "Injection (SQL, NoSQL, command, template)",
      "Logika biznesowa i eskalacja uprawnień",
      "Konfiguracja nagłówków i transportu",
    ],
    methodology: [
      "Reconnaissance i mapowanie powierzchni ataku",
      "Testy automatyczne + manualne weryfikacje",
      "Eksploatacja kontrolowana z PoC",
      "Ocena wpływu na dane i procesy",
    ],
    results: [
      "Identyfikacja podatności z ratingiem CVSS",
      "Mapa ścieżek ataku do danych krytycznych",
      "Priorytetyzacja działań naprawczych",
    ],
    deliverables: [
      "Raport techniczny z PoC",
      "Executive summary dla zarządu",
      "Rekomendacje remediacji",
      "Retest po wdrożeniu poprawek",
    ],
    targetAudience: [
      "Organizacje z aplikacjami B2B/B2C",
      "Zespoły produktowe przed release",
      "Podmioty podlegające DORA/NIS2",
    ],
    category: "pentest",
    needs: ["vulnerabilities"],
    environments: ["web"],
    href: "/oferta/pentesty#web",
  },
  {
    id: "pentest-mobile",
    slug: "pentesty-mobilne",
    title: "Pentesty aplikacji mobilnych",
    shortDescription:
      "Testy iOS/Android: storage, transport, reverse engineering, integracja z API i polityki MDM/BYOD.",
    problem:
      "Aplikacje mobilne przechowują tokeny i dane lokalnie — słabe zabezpieczenia umożliwiają odtworzenie sesji i dostęp do backendu.",
    scope: [
      "Bezpieczne przechowywanie danych (Keychain/Keystore)",
      "Certificate pinning i transport TLS",
      "Reverse engineering i obfuskacja",
      "Integracja z API backend",
      "Scenariusze MDM/BYOD",
    ],
    methodology: [
      "Analiza statyczna i dynamiczna",
      "Testy na urządzeniach jailbreak/root (w zakresie)",
      "Interceptacja ruchu i walidacja API",
      "Ocena polityk mobilnych organizacji",
    ],
    results: [
      "Lista podatności z kontekstem mobilnym",
      "Rekomendacje hardeningu aplikacji",
      "Wskazówki dla polityk BYOD/MDM",
    ],
    deliverables: [
      "Raport techniczny",
      "PoC exploitów",
      "Checklist remediacji",
      "Retest",
    ],
    targetAudience: [
      "Firmy z aplikacjami mobilnymi dla klientów",
      "Organizacje z programem BYOD",
      "Sektor finansowy i medyczny",
    ],
    category: "pentest",
    needs: ["vulnerabilities"],
    environments: ["mobile"],
    href: "/oferta/pentesty#mobile",
  },
  {
    id: "pentest-infra",
    slug: "pentesty-infrastruktury",
    title: "Pentesty infrastruktury IT",
    shortDescription:
      "Testy AD, VPN, perimetru, segmentacji i lateral movement w trybach black/grey/white box.",
    problem:
      "Infrastruktura IT bez regularnych testów umożliwia eskalację uprawnień i ruch lateralny po kompromitacji pojedynczego hosta.",
    scope: [
      "Active Directory i tożsamość",
      "VPN i dostęp zdalny",
      "Perimeter i segmentacja sieci",
      "Hardening i patching",
      "Lateral movement i privilege escalation",
    ],
    methodology: [
      "Black/grey/white box według zakresu",
      "Enumeracja i mapowanie domeny",
      "Eksploatacja kontrolowana",
      "Dokumentacja ścieżek ataku",
    ],
    results: [
      "Mapa wektorów ataku w infrastrukturze",
      "Ocena skuteczności segmentacji",
      "Plan hardeningu priorytetowego",
    ],
    deliverables: [
      "Raport techniczny z timeline ataku",
      "Executive summary",
      "Rekomendacje remediacji",
      "Retest",
    ],
    targetAudience: [
      "Organizacje z infrastrukturą hybrydową",
      "Podmioty krytyczne i regulowane",
      "Firmy po fuzjach i migracjach",
    ],
    category: "pentest",
    needs: ["vulnerabilities"],
    environments: ["infrastructure"],
    href: "/oferta/pentesty#infrastructure",
  },
  {
    id: "pentest-cloud",
    slug: "pentesty-chmury",
    title: "Pentesty środowisk chmurowych",
    shortDescription:
      "Azure, AWS, GCP: IAM, storage, secrets, ekspozycja sieciowa, logging i benchmarki CIS.",
    problem:
      "Błędna konfiguracja chmury — publiczne buckety, nadmierne uprawnienia IAM, brak logowania — to najczęstsza przyczyna incydentów.",
    scope: [
      "IAM i least privilege",
      "Storage buckets i ekspozycja danych",
      "Secrets management",
      "Network exposure i security groups",
      "Logging, detection i compliance",
    ],
    methodology: [
      "Przegląd konfiguracji (CIS benchmark)",
      "Testy uprawnień i eskalacji",
      "Weryfikacja logowania i alertów",
      "Mapowanie do DORA/NIS2/ISO 27001",
    ],
    results: [
      "Lista misconfigurations z priorytetem",
      "Ocena gotowości detekcji",
      "Roadmapa remediacji chmurowej",
    ],
    deliverables: [
      "Raport techniczny",
      "Mapa zgodności regulacyjnej",
      "Rekomendacje architektoniczne",
      "Retest",
    ],
    targetAudience: [
      "Organizacje w chmurze publicznej",
      "Zespoły DevOps/Cloud",
      "Sektor finansowy (DORA, KNF)",
    ],
    category: "pentest",
    needs: ["vulnerabilities", "regulations"],
    environments: ["cloud"],
    href: "/oferta/pentesty#cloud",
  },
  {
    id: "pentest-ot",
    slug: "pentesty-ot-ics",
    title: "Pentesty OT/ICS",
    shortDescription:
      "Testy sieci przemysłowych, PLC, RTU zgodnie z ISA/IEC 62443 — safety-first, bez ryzyka dla produkcji.",
    problem:
      "Sieci OT często łączą legacy z IT — brak segmentacji i zdalny dostęp tworzą ścieżki od biura do linii produkcyjnej.",
    scope: [
      "Sieci przemysłowe i segmentacja",
      "PLC, RTU, HMI, SCADA",
      "Zdalny dostęp inżynierski",
      "Pasywne rozpoznanie",
      "Zgodność ISA/IEC 62443",
    ],
    methodology: [
      "Safety-first: pisemny zakres i okna testowe",
      "Pasywne i aktywne testy w uzgodnionym zakresie",
      "Bez działań destabilizujących produkcję",
      "Współpraca z zespołem utrzymania",
    ],
    results: [
      "Mapa ryzyk OT z kontekstem operacyjnym",
      "Rekomendacje segmentacji",
      "Plan modernizacji bez przestojów",
    ],
    deliverables: [
      "Raport techniczny OT",
      "Executive summary",
      "Plan remediacji fazowej",
      "Retest w oknie serwisowym",
    ],
    targetAudience: [
      "Przemysł i produkcja",
      "Energetyka i infrastruktura krytyczna",
      "Organizacje modernizujące OT",
    ],
    category: "pentest",
    needs: ["vulnerabilities", "ot-modernization"],
    environments: ["ot-ics"],
    href: "/oferta/pentesty#ot",
  },
  {
    id: "audit-security",
    slug: "audyt-bezpieczenstwa-it",
    title: "Audyt bezpieczeństwa IT",
    shortDescription:
      "Ocena dojrzałości organizacyjnej i technicznej z roadmapą rozwoju cyberbezpieczeństwa.",
    problem:
      "Brak obiektywnej oceny stanu bezpieczeństwa utrudnia alokację budżetu i priorytetyzację inwestycji.",
    scope: [
      "Governance i polityki",
      "Zarządzanie tożsamością i dostępem",
      "Ochrona danych i backup",
      "Monitoring i reagowanie",
      "Zarządzanie podatnościami",
    ],
    methodology: [
      "Wywiady z kluczowymi interesariuszami",
      "Przegląd dokumentacji i konfiguracji",
      "Próbkowanie kontroli technicznych",
      "Ocena wg modelu dojrzałości",
    ],
    results: [
      "Mapa luk organizacyjnych i technicznych",
      "Ocena poziomu dojrzałości",
      "Roadmapa 12–24 miesięcy",
    ],
    deliverables: [
      "Raport audytowy",
      "Rejestr ustaleń z priorytetami",
      "Prezentacja dla zarządu",
      "Plan działań naprawczych",
    ],
    targetAudience: [
      "Zarządy i CISO",
      "Organizacje przed certyfikacją",
      "Podmioty po incydencie",
    ],
    category: "audit",
    needs: ["regulations", "vulnerabilities"],
    environments: ["organization"],
    href: "/oferta/audyty#security",
  },
  {
    id: "audit-nis2",
    slug: "audyt-nis2",
    title: "Audyt zgodności NIS2",
    shortDescription:
      "Weryfikacja governance, zarządzania ryzykiem, incydentów, łańcucha dostaw i odpowiedzialności kadry zarządzającej.",
    problem:
      "NIS2 nakłada konkretne obowiązki na zarząd i podmioty kluczowe — brak dowodów zgodności to ryzyko sankcji i utraty kontraktów.",
    scope: [
      "Governance i accountability zarządu",
      "Risk management i analiza ryzyka",
      "Incident handling i raportowanie CSIRT",
      "Supply chain security",
      "Business continuity i szkolenia",
    ],
    methodology: [
      "Gap analysis względem wymagań NIS2",
      "Przegląd dokumentacji i procesów",
      "Weryfikacja kontroli technicznych",
      "Ocena gotowości kadry zarządzającej",
    ],
    results: [
      "Mapa luk NIS2 z priorytetami",
      "Ocena gotowości organizacji",
      "Plan działań naprawczych",
    ],
    deliverables: [
      "Raport audytowy NIS2",
      "Checklist zgodności",
      "Plan remediacji",
      "Materiały dla zarządu",
    ],
    targetAudience: [
      "Podmioty kluczowe i ważne",
      "Dostawcy usług kluczowych",
      "Sektor publiczny",
    ],
    category: "audit",
    needs: ["regulations"],
    environments: ["organization"],
    href: "/oferta/audyty#nis2",
  },
  {
    id: "audit-dora",
    slug: "audyt-dora",
    title: "Audyt zgodności DORA",
    shortDescription:
      "ICT risk management, incident management, resilience testing i third-party risk dla sektora finansowego.",
    problem:
      "DORA wymaga udokumentowanego zarządzania ryzykiem ICT, testów odporności i nadzoru nad dostawcami — audytorzy oczekują dowodów.",
    scope: [
      "ICT risk management framework",
      "Incident management i raportowanie",
      "Resilience testing (w tym TLPT)",
      "Third-party ICT risk",
      "Dokumentacja i dowody zgodności",
    ],
    methodology: [
      "Gap analysis DORA",
      "Przegląd polityk i procedur ICT",
      "Weryfikacja testów odporności",
      "Ocena zarządzania dostawcami",
    ],
    results: [
      "Mapa zgodności DORA",
      "Identyfikacja braków dokumentacyjnych",
      "Plan przygotowania do nadzoru",
    ],
    deliverables: [
      "Raport audytowy DORA",
      "Rejestr luk z priorytetami",
      "Plan remediacji",
      "Wsparcie w przygotowaniu do audytu nadzorczego",
    ],
    targetAudience: [
      "Banki i instytucje finansowe",
      "Ubezpieczyciele",
      "Dostawcy ICT dla sektora finansowego",
    ],
    category: "audit",
    needs: ["regulations"],
    environments: ["organization"],
    href: "/oferta/audyty#dora",
  },
  {
    id: "soc-monitoring",
    slug: "soc-monitoring",
    title: "SOC — monitoring 24/7",
    shortDescription:
      "Security Operations Center: detekcja, analiza, triage, eskalacja i wsparcie reagowania na incydenty.",
    problem:
      "Brak ciągłego monitoringu oznacza, że incydenty wykrywane są po tygodniach — gdy dane już opuściły organizację.",
    scope: [
      "Monitoring logów i alertów 24/7",
      "Korelacja i triage incydentów",
      "Integracja SIEM/EDR/NDR/Firewall/Cloud",
      "Playbooki reagowania",
      "Raporty okresowe i SLA",
    ],
    methodology: [
      "Onboarding źródeł logów",
      "Budowa use case'ów detekcji",
      "Kalibracja progów i redukcja false positive",
      "Ćwiczenia reagowania",
    ],
    results: [
      "Skrócony czas detekcji (MTTD)",
      "Standaryzowany proces eskalacji",
      "Widoczność postawy bezpieczeństwa",
    ],
    deliverables: [
      "Raporty okresowe SOC",
      "Dashboard incydentów",
      "Rekomendacje usprawnień detekcji",
      "Wsparcie IR w uzgodnionym zakresie",
    ],
    targetAudience: [
      "Organizacje bez własnego SOC",
      "Firmy rozszerzające monitoring",
      "Podmioty wymagające SLA",
    ],
    category: "soc",
    needs: ["monitoring"],
    environments: ["soc"],
    href: "/oferta/soc",
  },
  {
    id: "ot-modernization",
    slug: "modernizacja-sieci-ot",
    title: "Modernizacja sieci OT",
    shortDescription:
      "Segmentacja IT/OT, strefy i konduity, zdalny dostęp, monitoring pasywny i hardening bez przestoju produkcji.",
    problem:
      "Starsze sieci OT łączą systemy sterowania z biurem — lateral movement z IT do PLC to realne ryzyko operacyjne.",
    scope: [
      "Segmentacja IT/OT i strefy ISA/IEC 62443",
      "Bezpieczny zdalny dostęp inżynierski",
      "Pasywna inwentaryzacja aktywów OT",
      "Monitoring anomalii",
      "Hardening stacji inżynierskich",
      "Backup konfiguracji PLC",
    ],
    methodology: [
      "Audyt i mapowanie topologii OT",
      "Projekt segmentacji fazowej",
      "Wdrożenie bez przestoju produkcji",
      "Procedury reakcji operacyjnej",
    ],
    results: [
      "Zredukowane ryzyko lateral movement",
      "Widoczność aktywów OT",
      "Zgodność z ISA/IEC 62443",
    ],
    deliverables: [
      "Dokumentacja architektury OT",
      "Procedury operacyjne",
      "Plan utrzymania i monitoringu",
      "Szkolenie zespołu utrzymania",
    ],
    targetAudience: [
      "Zakłady produkcyjne",
      "Operatorzy infrastruktury krytycznej",
      "Organizacje po audycie OT",
    ],
    category: "ot",
    needs: ["ot-modernization"],
    environments: ["ot-ics"],
    href: "/oferta/ot-ics",
  },
  {
    id: "documentation",
    slug: "dostosowanie-dokumentacji",
    title: "Dostosowanie dokumentacji SZBI",
    shortDescription:
      "Polityki, procedury, rejestry ryzyk, plany ciągłości i dokumentacja DORA/NIS2/KSC/ISO 27001.",
    problem:
      "Brak aktualnej dokumentacji SZBI blokuje certyfikację, audyty nadzorcze i skuteczne reagowanie na incydenty.",
    scope: [
      "Polityka bezpieczeństwa informacji",
      "Procedury incydentów i podatności",
      "Rejestr aktywów i ryzyk ICT",
      "BIA i plany ciągłości",
      "Dokumentacja regulacyjna",
    ],
    methodology: [
      "Gap analysis dokumentacji",
      "Warsztaty z właścicielami procesów",
      "Dostosowanie do kontekstu organizacji",
      "Walidacja z audytorem wewnętrznym",
    ],
    results: [
      "Kompletna dokumentacja SZBI",
      "Zgodność z wymaganiami regulacyjnymi",
      "Gotowość do audytu certyfikacyjnego",
    ],
    deliverables: [
      "Pakiet dokumentów SZBI",
      "Rejestry i matryce odpowiedzialności",
      "Wersjonowanie i plan aktualizacji",
    ],
    targetAudience: [
      "Organizacje przed ISO 27001",
      "Podmioty pod NIS2/DORA/KSC",
      "Firmy po reorganizacji",
    ],
    category: "documentation",
    needs: ["documentation", "regulations"],
    environments: ["organization"],
    href: "/oferta/dokumentacja-compliance",
  },
  {
    id: "phishing",
    slug: "testy-socjotechniczne",
    title: "Testy socjotechniczne i phishing",
    shortDescription:
      "Kontrolowane kampanie phishingowe i ćwiczenia awareness z raportem i planem szkoleń.",
    problem:
      "Ludzki czynnik pozostaje głównym wektorem — bez mierzalnych testów trudno ocenić skuteczność programu awareness.",
    scope: [
      "Kampanie phishingowe (e-mail, SMS)",
      "Scenariusze pretexting (w zakresie)",
      "Pomiar wskaźnika klikalności",
      "Analiza zachowań użytkowników",
    ],
    methodology: [
      "Projekt scenariuszy zgodnych z polityką",
      "Bezpieczna infrastruktura testowa",
      "Monitoring i natychmiastowa edukacja",
      "Raport bez ujawniania tożsamości pojedynczych osób",
    ],
    results: [
      "Mierzalny poziom świadomości",
      "Identyfikacja grup wysokiego ryzyka",
      "Plan szkoleń ukierunkowanych",
    ],
    deliverables: [
      "Raport kampanii",
      "Rekomendacje programu awareness",
      "Materiały edukacyjne",
    ],
    targetAudience: [
      "Organizacje 50+ pracowników",
      "Podmioty po incydencie phishingowym",
      "Firmy budujące kulturę bezpieczeństwa",
    ],
    category: "awareness",
    needs: ["vulnerabilities"],
    environments: ["organization"],
    href: "/oferta/pentesty#phishing",
  },
  {
    id: "maturity",
    slug: "ocena-dojrzalosci",
    title: "Program oceny dojrzałości cyberbezpieczeństwa",
    shortDescription:
      "Strukturalna ocena dojrzałości z benchmarkiem branżowym i planem rozwoju kompetencji.",
    problem:
      "Bez obiektywnej miary dojrzałości trudno uzasadnić inwestycje i śledzić postęp w czasie.",
    scope: [
      "Ocena 8–12 domen bezpieczeństwa",
      "Benchmark branżowy",
      "Analiza luk kompetencyjnych",
      "Plan rozwoju 12–36 miesięcy",
    ],
    methodology: [
      "Ankiety i wywiady strukturalne",
      "Próbkowanie kontroli technicznych",
      "Scoring wg modelu dojrzałości",
      "Warsztat wyników z zarządem",
    ],
    results: [
      "Wynik dojrzałości z breakdown per domena",
      "Porównanie z benchmarkiem",
      "Priorytetyzacja inwestycji",
    ],
    deliverables: [
      "Raport dojrzałości",
      "Dashboard metryk",
      "Roadmapa rozwoju",
      "Rekomendacje organizacyjne",
    ],
    targetAudience: [
      "Zarządy i komitety bezpieczeństwa",
      "CISO bez własnego benchmarku",
      "Organizacje po fuzji",
    ],
    category: "audit",
    needs: ["regulations", "vulnerabilities"],
    environments: ["organization"],
    href: "/oferta",
  },
];

export const serviceNeedsLabels: Record<ServiceNeed, string> = {
  regulations: "Muszę spełnić regulacje",
  vulnerabilities: "Chcę sprawdzić podatności",
  monitoring: "Chcę monitorować incydenty",
  "ot-modernization": "Modernizuję OT",
  documentation: "Potrzebuję dokumentacji",
};

export const serviceEnvironmentLabels: Record<ServiceEnvironment, string> = {
  web: "Web",
  mobile: "Mobile",
  cloud: "Cloud",
  infrastructure: "Infrastruktura",
  database: "Baza danych",
  container: "Kontenery",
  "ot-ics": "OT/ICS",
  organization: "Organizacja",
  soc: "SOC",
};

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
