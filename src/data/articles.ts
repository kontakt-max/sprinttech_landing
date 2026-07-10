export type ArticleCategory =
  | "NIS2"
  | "DORA"
  | "KSC"
  | "Pentesty"
  | "SOC"
  | "OT/ICS"
  | "Cloud Security"
  | "Awareness";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export const articleCategories: ArticleCategory[] = [
  "NIS2",
  "DORA",
  "KSC",
  "Pentesty",
  "SOC",
  "OT/ICS",
  "Cloud Security",
  "Awareness",
];

export const articles: Article[] = [
  {
    slug: "nis2-obowiazki-zarzadu",
    title: "NIS2: konkretne obowiązki zarządu i jak je udokumentować",
    excerpt:
      "DYrektywa NIS2 przenosi odpowiedzialność za cyberbezpieczeństwo na zarząd. Jakie decyzje musi podjąć, jakie dowody przygotować i jak uniknąć formalnej zgodności bez realnej odporności.",
    category: "NIS2",
    publishedAt: "2025-11-15",
    readTime: 8,
    tags: ["NIS2", "governance", "zarząd", "compliance"],
  },
  {
    slug: "nis2-supply-chain-wymagania",
    title: "Łańcuch dostaw w NIS2 — od umowy do weryfikacji kontroli",
    excerpt:
      "Wymagania NIS2 dotyczące bezpieczeństwa łańcucha dostaw ICT: klauzule umowne, ocena dostawców, monitoring i eskalacja. Praktyczny checklist dla działu zakupów i security.",
    category: "NIS2",
    publishedAt: "2025-10-28",
    readTime: 10,
    tags: ["NIS2", "supply chain", "TPRM"],
  },
  {
    slug: "dora-resilience-testing",
    title: "DORA resilience testing: od vulnerability scanning do TLPT",
    excerpt:
      "Hierarchia testów odporności wg DORA — kiedy wystarczy skan podatności, kiedy potrzebny pentest, a kiedy Threat-Led Penetration Testing. Jak zaplanować program i udokumentować wyniki.",
    category: "DORA",
    publishedAt: "2025-11-02",
    readTime: 12,
    tags: ["DORA", "TLPT", "pentest", "resilience"],
  },
  {
    slug: "dora-incident-reporting",
    title: "Raportowanie incydentów ICT wg DORA — terminy i treść zgłoszenia",
    excerpt:
      "Klasyfikacja incydentów, terminy wstępnego i pełnego raportu, wymagana treść zgłoszenia do organu nadzorczego. Jak przygotować procedurę i przetestować ją przed realnym incydentem.",
    category: "DORA",
    publishedAt: "2025-09-20",
    readTime: 9,
    tags: ["DORA", "incident", "raportowanie"],
  },
  {
    slug: "ksc-uslugi-kluczowe-audyt",
    title: "KSC: audyt usług kluczowych — środki techniczne i organizacyjne",
    excerpt:
      "Jak przeprowadzić audyt zgodności z ustawą o KSC: identyfikacja usług kluczowych, weryfikacja środków bezpieczeństwa, dokumentacja i raport dla CSIRT MON.",
    category: "KSC",
    publishedAt: "2025-10-10",
    readTime: 11,
    tags: ["KSC", "audyt", "infrastruktura krytyczna"],
  },
  {
    slug: "pentest-api-owasp",
    title: "Pentest API: najczęstsze podatności w architekturach REST i GraphQL",
    excerpt:
      "IDOR, broken object level authorization, mass assignment, rate limiting — praktyczny przegląd podatności API z przykładami remediacji. Kiedy automated scanning wystarczy, a kiedy potrzebna weryfikacja manualna.",
    category: "Pentesty",
    publishedAt: "2025-11-08",
    readTime: 14,
    tags: ["pentest", "API", "OWASP"],
  },
  {
    slug: "pentest-ot-safety-first",
    title: "Pentesty OT: safety-first — jak testować bez ryzyka dla produkcji",
    excerpt:
      "Metodyka testów OT/ICS zgodna z ISA/IEC 62443: pasywne rozpoznanie, okna serwisowe, współpraca z utrzymaniem. Czego nie robić podczas pentestu sieci przemysłowej.",
    category: "Pentesty",
    publishedAt: "2025-08-15",
    readTime: 10,
    tags: ["pentest", "OT", "IEC 62443"],
  },
  {
    slug: "soc-use-cases-mitre",
    title: "Budowa use case'ów SOC z mapowaniem MITRE ATT&CK",
    excerpt:
      "Jak projektować reguły detekcji powiązane z taktykami MITRE: od źródła logów przez korelację do playbooka. Przykłady use case'ów dla malware, phishing i lateral movement.",
    category: "SOC",
    publishedAt: "2025-10-22",
    readTime: 13,
    tags: ["SOC", "MITRE", "SIEM", "detekcja"],
  },
  {
    slug: "soc-mttd-mttc-metodyki",
    title: "MTTD i MTTC — jak mierzyć skuteczność SOC i co z tym zrobić",
    excerpt:
      "Definicje metryk, benchmarki branżowe, pułapki w pomiarach i plan poprawy. Kiedy niski MTTD nie oznacza dobrej detekcji i jak uniknąć gaming metryk.",
    category: "SOC",
    publishedAt: "2025-09-05",
    readTime: 8,
    tags: ["SOC", "metryki", "MTTD"],
  },
  {
    slug: "ot-segmentacja-iec-62443",
    title: "Segmentacja OT wg IEC 62443: strefy, konduity i praktyczne wdrożenie",
    excerpt:
      "Model stref i konduits w środowisku przemysłowym: jak podzielić sieć bez przestoju, jakie urządzenia umieścić na granicach stref i jak udokumentować architekturę.",
    category: "OT/ICS",
    publishedAt: "2025-11-01",
    readTime: 15,
    tags: ["OT", "segmentacja", "IEC 62443"],
  },
  {
    slug: "cloud-iam-least-privilege",
    title: "IAM w chmurze: od nadmiernych uprawnień do least privilege",
    excerpt:
      "Audyt uprawnień AWS/Azure/GCP: jak znaleźć nadmiarowe role, jak wdrożyć JIT access i jak monitorować eskalację. Checklist dla zespołów cloud i security.",
    category: "Cloud Security",
    publishedAt: "2025-10-18",
    readTime: 11,
    tags: ["cloud", "IAM", "AWS", "Azure"],
  },
  {
    slug: "awareness-phishing-kampanie",
    title: "Kampanie phishingowe: jak mierzyć skuteczność bez naruszania zaufania",
    excerpt:
      "Projektowanie etycznych kampanii testowych: scenariusze, częstotliwość, edukacja po kliknięciu i raportowanie bez witch hunt. Jak budować program awareness oparty na danych.",
    category: "Awareness",
    publishedAt: "2025-08-30",
    readTime: 7,
    tags: ["awareness", "phishing", "szkolenia"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category);
}
