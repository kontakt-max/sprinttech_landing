export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  excerpt: string;
  context: string;
  challenge: string;
  approach: string[];
  scope: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
  nextSteps: string[];
  services: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "instytucja-publiczna-nis2-ksc",
    title: "Instytucja publiczna: audyt zgodności i plan naprawczy NIS2/KSC",
    sector: "Sektor publiczny",
    excerpt:
      "Kompleksowy audyt zgodności z NIS2 i KSC dla instytucji samorządowej z infrastrukturą hybrydową i wieloma podmiotami powierzchni.",
    context:
      "Instytucja samorządowa świadcząca usługi publiczne dla ponad 200 tys. mieszkańców, z infrastrukturą IT rozproszoną między siedzibą główną, oddziałami terenowymi i systemami e-usług. Organizacja została sklasyfikowana jako podmiot kluczowy w rozumieniu KSC i podlega wymogom NIS2.",
    challenge:
      "Zarząd instytucji nie posiadał obiektywnej oceny gotowości na nadchodzące wymagania regulacyjne. Dokumentacja SZBI była fragmentaryczna, procedury incydentów nie były testowane, a odpowiedzialność kadry zarządzającej nie była formalnie przypisana. Audyt wewnętrzny z poprzedniego roku wykazał 47 ustaleń, z których 12 oznaczono jako wysokie ryzyko — bez uporządkowanego planu remediacji.",
    approach: [
      "Gap analysis NIS2 i KSC względem aktualnego stanu dokumentacji i kontroli",
      "Wywiady z zarządem, IT i właścicielami procesów biznesowych",
      "Próbkowanie kontroli technicznych: IAM, backup, monitoring, segmentacja",
      "Mapowanie łańcucha dostaw ICT i ocena umów z dostawcami",
      "Warsztat z zarządem: przypisanie accountability i plan szkoleń",
    ],
    scope: [
      "Audyt governance i polityk SZBI",
      "Weryfikacja procedur incydentów i ciągłości działania",
      "Ocena kontroli technicznych (próbkowanie)",
      "Analiza zgodności z KSC (usługi kluczowe)",
      "Przygotowanie planu naprawczego z harmonogramem",
    ],
    results: [
      "Zidentyfikowano 34 luki regulacyjne z priorytetyzacją P1–P3",
      "Opracowano plan naprawczy na 18 miesięcy z budżetem szacunkowym",
      "Formalnie przypisano odpowiedzialność zarządu za cyberbezpieczeństwo",
      "Utworzono rejestr ryzyk ICT zgodny z wymogami NIS2",
      "Przygotowano pakiet dokumentacji do audytu nadzorczego",
    ],
    metrics: [
      { label: "Luki P1 zamknięte w 6 mies.", value: "100%" },
      { label: "Redukcja ustaleń wysokiego ryzyka", value: "−78%" },
      { label: "Dokumentacja SZBI uzupełniona", value: "23 dokumenty" },
      { label: "Czas przygotowania do audytu nadzorczego", value: "4 mies." },
    ],
    deliverables: [
      "Raport audytowy NIS2/KSC z rejestrem luk",
      "Plan naprawczy z harmonogramem i odpowiedzialnościami",
      "Pakiet dokumentacji SZBI (polityki, procedury, rejestry)",
      "Prezentacja dla zarządu i rady",
      "Checklist gotowości na audyt nadzorczy",
    ],
    nextSteps: [
      "Wdrożenie SOC w modelu managed (faza 2)",
      "Cykliczne testy procedur incydentów (co 6 mies.)",
      "Audyt follow-up po 12 miesiącach",
    ],
    services: ["Audyt NIS2", "Audyt KSC", "Dokumentacja SZBI"],
    featured: true,
  },
  {
    slug: "przemysl-segmentacja-ot",
    title: "Przemysł: segmentacja OT i redukcja ryzyka lateral movement",
    sector: "Przemysł i produkcja",
    excerpt:
      "Modernizacja architektury sieci OT zakładu produkcyjnego bez przestoju — segmentacja, monitoring pasywny i bezpieczny dostęp zdalny.",
    context:
      "Zakład produkcyjny z 4 liniami montażowymi, systemami PLC (Siemens, Allen-Bradley), SCADA i zdalnym dostępem dla integratorów. Sieć OT była płaska — stacje inżynierskie w tej samej domenie co biuro. Po incydencie ransomware w sąsiedniej firmie z tej samej branży zarząd zlecił ocenę ryzyka OT.",
    challenge:
      "Pentest wewnętrzny wykazał możliwość przejścia z sieci biurowej do stacji inżynierskiej HMI w mniej niż 45 minut. Brak inwentaryzacji aktywów OT, brak segmentacji wg ISA/IEC 62443, konfiguracje PLC bez backupu. Wymaganie biznesowe: zero przestojów produkcji podczas wdrożenia.",
    approach: [
      "Pasywna inwentaryzacja aktywów OT (48h monitoring)",
      "Projekt architektury stref i konduits wg IEC 62443-3-2",
      "Fazowe wdrożenie segmentacji w oknach serwisowych",
      "Wdrożenie jump hosta i MFA dla dostępu zdalnego integratorów",
      "Backup konfiguracji PLC i procedury rollback",
    ],
    scope: [
      "Mapowanie topologii IT/OT",
      "Projekt i wdrożenie segmentacji",
      "Monitoring pasywny anomalii OT",
      "Hardening stacji inżynierskich",
      "Szkolenie zespołu utrzymania",
    ],
    results: [
      "Wyeliminowano bezpośrednią łączność biuro → OT Core",
      "Zinwentaryzowano 127 aktywów OT (wcześniej: 43 w CMDB)",
      "Wdrożono monitoring pasywny z 12 use case'ami detekcji",
      "Czas dostępu zdalnego integratora: z niekontrolowanego VPN do audytowanego jump hosta",
      "Zero przestojów produkcji podczas 6-miesięcznego projektu",
    ],
    metrics: [
      { label: "Redukcja ścieżek lateral movement", value: "−92%" },
      { label: "Aktywa OT zinwentaryzowane", value: "127" },
      { label: "Przestoje produkcji", value: "0" },
      { label: "Czas detekcji anomalii OT", value: "< 15 min" },
    ],
    deliverables: [
      "Dokumentacja architektury OT z mapą stref",
      "Procedury dostępu zdalnego i awaryjne",
      "Rejestr aktywów OT",
      "Raport z testów segmentacji",
      "Plan utrzymania i aktualizacji",
    ],
    nextSteps: [
      "Pentest OT w uzgodnionym oknie serwisowym",
      "Rozszerzenie monitoringu na linię produkcyjną 5 (w budowie)",
      "Certyfikacja zgodności IEC 62443 (faza 3)",
    ],
    services: ["Modernizacja OT", "Pentest OT/ICS", "Monitoring"],
    featured: true,
  },
  {
    slug: "finanse-pentest-dora",
    title: "Finanse: pentest aplikacji i przegląd zgodności DORA",
    sector: "Finanse i ubezpieczenia",
    excerpt:
      "Pentest platformy B2B i mapa zgodności DORA dla instytucji finansowej przygotowującej się do nadzoru EBA.",
    context:
      "Instytucja płatnicza obsługująca transakcje B2B dla średnich przedsiębiorstw, z platformą API-first hostowaną w AWS. Organizacja podlega DORA i przygotowuje się do pierwszego audytu nadzorczego dotyczącego zarządzania ryzykiem ICT.",
    challenge:
      "Platforma przeszła szybki rozwój funkcjonalny bez równoległych testów bezpieczeństwa. Zespół compliance zidentyfikował braki w dokumentacji resilience testing i third-party risk. Pentest był wymagany przed uruchomieniem nowego modułu płatności masowych.",
    approach: [
      "Pentest grey-box aplikacji webowej i API (OWASP + logika biznesowa)",
      "Przegląd konfiguracji AWS (IAM, S3, CloudTrail, GuardDuty)",
      "Gap analysis DORA: ICT risk, incidents, resilience testing, TPRM",
      "Mapowanie ustaleń pentestu do wymagań DORA",
      "Warsztat remediacji z zespołem dev i security",
    ],
    scope: [
      "Pentest aplikacji webowej i REST API",
      "Przegląd bezpieczeństwa chmury AWS",
      "Audyt dokumentacji DORA (ICT risk, IR, TPRM)",
      "Ocena gotowości resilience testing",
      "Przygotowanie planu remediacji",
    ],
    results: [
      "Wykryto 3 podatności krytyczne (IDOR, broken auth, SSRF) — zamknięte przed go-live",
      "Zidentyfikowano 8 misconfigurations AWS (public S3, nadmierne IAM)",
      "Mapa zgodności DORA: 67% gotowości → plan do 95% w 9 miesięcy",
      "Przygotowano dokumentację resilience testing dla nadzoru",
      "Retest potwierdził zamknięcie wszystkich ustaleń P1 i P2",
    ],
    metrics: [
      { label: "Podatności krytyczne przed go-live", value: "0" },
      { label: "Gotowość DORA (po remediacji P1)", value: "82%" },
      { label: "Czas zamknięcia ustaleń P1", value: "21 dni" },
      { label: "Retest pass rate", value: "100%" },
    ],
    deliverables: [
      "Raport pentestu z PoC i CVSS",
      "Raport przeglądu AWS",
      "Mapa zgodności DORA z rejestrem luk",
      "Plan remediacji i resilience testing",
      "Executive summary dla zarządu i nadzoru",
    ],
    nextSteps: [
      "TLPT (Threat-Led Penetration Testing) — planowane Q3",
      "Cykliczny pentest API (co 12 mies.)",
      "Rozszerzenie SOC o use case'y cloud",
    ],
    services: ["Pentest web/API", "Pentest chmury", "Audyt DORA"],
    featured: true,
  },
  {
    slug: "soc-use-cases-wielooddzialowa",
    title: "Budowa use case'ów SOC dla organizacji wielooddziałowej",
    sector: "Telekomunikacja i IT",
    excerpt:
      "Projekt i wdrożenie use case'ów detekcji SOC dla organizacji z 12 oddziałami i hybrydową infrastrukturą.",
    context:
      "Dostawca usług IT dla sektora publicznego i prywatnego, 12 oddziałów, infrastruktura hybrydowa (on-prem + Azure), SIEM już wdrożony ale z wysokim false positive rate i bez standaryzowanych playbooków.",
    challenge:
      "SOC wewnętrzny (3 osoby) był przeciążony alertami — 340 alertów dziennie, MTTD > 72h dla incydentów istotnych. Brak korelacji między źródłami, brak mapowania do MITRE ATT&CK, brak SLA z biznesem.",
    approach: [
      "Audyt źródeł logów i jakości danych",
      "Projekt 24 use case'ów detekcji (malware, phishing, lateral movement, cloud)",
      "Kalibracja progów i redukcja false positive",
      "Playbooki eskalacji i integracja z ITSM",
      "Szkolenie zespołu SOC i ćwiczenie tabletop",
    ],
    scope: [
      "Onboarding i normalizacja logów",
      "Budowa use case'ów i reguł korelacji",
      "Playbooki IR i eskalacja",
      "Dashboard i raportowanie",
      "Przekazanie do operacji (managed SOC opcjonalnie)",
    ],
    results: [
      "Redukcja alertów dziennie z 340 do 28 (istotne)",
      "MTTD spadł z >72h do <4h dla incydentów P1",
      "24 use case'y zmapowane do MITRE ATT&CK",
      "SLA eskalacji uzgodnione z biznesem",
      "Miesięczne raporty dla zarządu",
    ],
    metrics: [
      { label: "Redukcja false positive", value: "−92%" },
      { label: "MTTD incydentów P1", value: "< 4h" },
      { label: "Use case'y detekcji", value: "24" },
      { label: "Pokrycie MITRE tactics", value: "11/14" },
    ],
    deliverables: [
      "Biblioteka use case'ów z dokumentacją",
      "Playbooki reagowania (12 scenariuszy)",
      "Dashboard SOC i raporty miesięczne",
      "Procedury eskalacji i SLA",
      "Plan rozwoju detekcji (roadmapa 12 mies.)",
    ],
    nextSteps: [
      "Rozszerzenie o detekcję cloud (Azure AD, M365)",
      "Managed SOC 24/7 (faza 2)",
      "Purple team exercise",
    ],
    services: ["SOC", "Use case development", "IR playbooki"],
    featured: false,
  },
  {
    slug: "szbi-przed-audytem-iso",
    title: "Porządkowanie dokumentacji SZBI przed audytem ISO 27001",
    sector: "Ochrona zdrowia",
    excerpt:
      "Kompleksowe dostosowanie dokumentacji SZBI sieci placówek medycznych przed certyfikacją ISO/IEC 27001:2022.",
    context:
      "Sieć 8 placówek medycznych, wspólne systemy EHR i infrastruktura IT. Zarząd podjął decyzję o certyfikacji ISO 27001 w zakresie przetwarzania danych medycznych. Istniejąca dokumentacja była rozproszona, niespójna i nieaktualna.",
    challenge:
      "Audyt wewnętrzny wykazał brak 19 wymaganych dokumentów, niespójność polityk między placówkami i brak rejestru ryzyk. Termin audytu certyfikacyjnego za 8 miesięcy. Wymagania dodatkowe: zgodność z przepisami o ochronie danych medycznych.",
    approach: [
      "Gap analysis ISO 27001:2022 Annex A",
      "Warsztaty z właścicielami procesów w każdej placówce",
      "Ujednolicenie polityk z zachowaniem specyfiki lokalnej",
      "Budowa rejestru ryzyk i matrycy odpowiedzialności",
      "Przygotowanie do audytu certyfikacyjnego (mock audit)",
    ],
    scope: [
      "Dokumentacja polityk i procedur SZBI",
      "Rejestr aktywów i ryzyk",
      "Procedury incydentów i podatności",
      "Plany ciągłości i backup",
      "Mock audit przed certyfikacją",
    ],
    results: [
      "Kompletna dokumentacja SZBI (31 dokumentów)",
      "Rejestr ryzyk z 47 pozycjami i planami traktowania",
      "Mock audit: 3 ustalenia nieistotne (minor)",
      "Certyfikacja ISO 27001:2022 uzyskana za pierwszym podejściem",
      "Harmonogram przeglądu dokumentacji (cykl 12 mies.)",
    ],
    metrics: [
      { label: "Dokumenty SZBI opracowane", value: "31" },
      { label: "Ustalenia mock audit (minor)", value: "3" },
      { label: "Certyfikacja za pierwszym podejściem", value: "Tak" },
      { label: "Czas projektu", value: "7 mies." },
    ],
    deliverables: [
      "Pakiet dokumentacji SZBI",
      "Rejestr ryzyk i aktywów",
      "Matryca odpowiedzialności RACI",
      "Raport mock auditu",
      "Plan utrzymania certyfikatu",
    ],
    nextSteps: [
      "Surveillance audit (za 12 mies.)",
      "Rozszerzenie zakresu na nową placówkę",
      "Integracja z programem NIS2 (podmiot ważny)",
    ],
    services: ["Dokumentacja SZBI", "Audyt ISO 27001", "Przygotowanie do certyfikacji"],
    featured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}
