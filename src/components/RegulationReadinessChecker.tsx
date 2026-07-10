"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Question {
  id: string;
  text: string;
  weight: number;
}

const questions: Question[] = [
  { id: "q1", text: "Czy zarząd formalnie przyjął odpowiedzialność za cyberbezpieczeństwo?", weight: 10 },
  { id: "q2", text: "Czy posiadacie aktualną politykę bezpieczeństwa informacji?", weight: 8 },
  { id: "q3", text: "Czy prowadzicie rejestr ryzyk ICT z planami traktowania?", weight: 9 },
  { id: "q4", text: "Czy procedura reagowania na incydenty była testowana w ostatnich 12 miesiącach?", weight: 9 },
  { id: "q5", text: "Czy macie zdefiniowane wymagania bezpieczeństwa dla dostawców ICT?", weight: 8 },
  { id: "q6", text: "Czy przeprowadzacie regularne testy bezpieczeństwa (pentest/skan)?", weight: 7 },
  { id: "q7", text: "Czy monitoring bezpieczeństwa (SIEM/SOC) działa 24/7 lub w uzgodnionych godzinach?", weight: 8 },
  { id: "q8", text: "Czy plan ciągłości działania obejmuje scenariusze cyberincydentów?", weight: 8 },
  { id: "q9", text: "Czy kadra zarządzająca przeszła szkolenie z cyberbezpieczeństwa?", weight: 7 },
  { id: "q10", text: "Czy dokumentacja zgodności (NIS2/DORA/KSC) jest kompletna i aktualna?", weight: 10 },
];

type ReadinessLevel = "low" | "medium" | "high";

export function RegulationReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: boolean) => {
    const q = questions[currentQ];
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const result = (() => {
    if (!showResult) return null;
    const maxScore = questions.reduce((sum, q) => sum + q.weight, 0);
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === true) score += q.weight;
    });
    const percent = Math.round((score / maxScore) * 100);
    let level: ReadinessLevel = "low";
    if (percent >= 70) level = "high";
    else if (percent >= 40) level = "medium";

    const messages: Record<ReadinessLevel, { title: string; desc: string }> = {
      low: {
        title: "Niski poziom gotowości",
        desc: "Istotne luki w governance, dokumentacji lub kontrolach technicznych. Zalecamy audyt wstępny i plan remediacji priorytetowej.",
      },
      medium: {
        title: "Średni poziom gotowości",
        desc: "Podstawy są na miejscu, ale brakuje spójności lub dowodów. Warto uzupełnić dokumentację i zweryfikować skuteczność kontroli.",
      },
      high: {
        title: "Wysoki poziom gotowości",
        desc: "Organizacja ma solidne fundamenty. Rozważ audyt weryfikacyjny, pentest i testy procedur incydentów.",
      },
    };

    return { percent, level, ...messages[level] };
  })();

  const reset = () => {
    setAnswers({});
    setCurrentQ(0);
    setShowResult(false);
  };

  if (showResult && result) {
    return (
      <div className="glass-panel p-6 lg:p-8 text-center">
        <h3 className="heading-section text-xl">Wynik oceny gotowości</h3>
        <div
          className={`mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full border-4 text-3xl font-bold ${
            result.level === "high"
              ? "border-cyber-green text-cyber-green"
              : result.level === "medium"
                ? "border-cyber-amber text-cyber-amber"
                : "border-cyber-red text-cyber-red"
          }`}
          aria-label={`Wynik: ${result.percent} procent`}
        >
          {result.percent}%
        </div>
        <h4 className="mt-4 text-lg font-semibold">{result.title}</h4>
        <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">{result.desc}</p>
        <p className="mt-4 text-xs text-white/40">
          Wynik nie jest zapisywany. To orientacyjna ocena — nie zastępuje audytu.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/kontakt" className="btn-primary text-sm">
            Umów konsultację
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
          <button type="button" onClick={reset} className="btn-secondary text-sm">
            Powtórz quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="glass-panel p-6 lg:p-8">
      <div className="flex items-center justify-between text-sm text-white/50">
        <span>Regulation Readiness Checker</span>
        <span>
          Pytanie {currentQ + 1} / {questions.length}
        </span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-cyber-cyan transition-all"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>
      <h3 className="mt-6 text-lg font-medium text-white">{q.text}</h3>
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => handleAnswer(true)}
          className="btn-primary flex-1"
        >
          Tak
        </button>
        <button
          type="button"
          onClick={() => handleAnswer(false)}
          className="btn-secondary flex-1"
        >
          Nie
        </button>
      </div>
      <p className="mt-4 text-xs text-white/40">
        Odpowiedzi nie są przechowywane w przeglądarce ani na serwerze.
      </p>
    </div>
  );
}
