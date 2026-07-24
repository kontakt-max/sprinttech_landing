"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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

function ReadinessGauge({ percent, level }: { percent: number; level: ReadinessLevel }) {
  const prefersReducedMotion = useReducedMotion();
  const color = level === "high" ? "#00e676" : level === "medium" ? "#ffb020" : "#ff4757";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36" role="img" aria-label={`Wynik gotowości: ${percent} procent`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={prefersReducedMotion ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{percent}%</span>
      </div>
    </div>
  );
}

export function RegulationReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shareConsent, setShareConsent] = useState(false);

  const handleAnswer = (value: boolean) => {
    const q = questions[currentQ];
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    if (currentQ < questions.length - 1) setCurrentQ((p) => p + 1);
    else setShowResult(true);
  };

  const result = (() => {
    if (!showResult) return null;
    const maxScore = questions.reduce((s, q) => s + q.weight, 0);
    let score = 0;
    questions.forEach((q) => { if (answers[q.id] === true) score += q.weight; });
    const percent = Math.round((score / maxScore) * 100);
    let level: ReadinessLevel = "low";
    if (percent >= 70) level = "high";
    else if (percent >= 40) level = "medium";
    const messages: Record<ReadinessLevel, { title: string; desc: string }> = {
      low: { title: "Niski poziom gotowości", desc: "Istotne luki w governance, dokumentacji lub kontrolach. Zalecamy audyt wstępny i plan remediacji priorytetowej." },
      medium: { title: "Średni poziom gotowości", desc: "Podstawy są na miejscu, ale brakuje spójności lub dowodów. Warto uzupełnić dokumentację i zweryfikować kontrole." },
      high: { title: "Wysoki poziom gotowości", desc: "Solidne fundamenty. Rozważ audyt weryfikacyjny, pentest i testy procedur incydentów." },
    };
    return { percent, level, ...messages[level] };
  })();

  const reset = () => { setAnswers({}); setCurrentQ(0); setShowResult(false); setShareConsent(false); };

  if (showResult && result) {
    return (
      <div className="command-panel p-8 text-center">
        <h3 className="heading-section text-xl">Wynik oceny gotowości</h3>
        <div className="mt-6"><ReadinessGauge percent={result.percent} level={result.level} /></div>
        <h4 className="mt-4 text-lg font-semibold">{result.title}</h4>
        <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">{result.desc}</p>
        <p className="mt-4 text-xs text-white/40">Wynik nie jest zapisywany bez Twojej zgody.</p>
        <label className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
          <input type="checkbox" checked={shareConsent} onChange={(e) => setShareConsent(e.target.checked)} className="rounded text-cyber-cyan" />
          Chcę przekazać wynik konsultantowi przy kontakcie
        </label>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={shareConsent ? `/kontakt?interest=audyt&readiness=${result.percent}` : "/kontakt?interest=audyt"}
            className="btn-primary text-sm"
          >
            Umów konsultację
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
          <button type="button" onClick={reset} className="btn-secondary text-sm">Powtórz quiz</button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="command-panel p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/50">Regulation Readiness Checker</span>
        <span className="text-sm text-cyber-cyan">{currentQ + 1} / {questions.length}</span>
      </div>
      <div className="mt-3 flex gap-1">
        {questions.map((_, i) => (
          <div key={i} className={cn("h-1 flex-1 rounded-full transition-colors", i <= currentQ ? "bg-cyber-cyan" : "bg-white/10")} />
        ))}
      </div>
      <h3 className="mt-8 text-lg font-medium text-white">{q.text}</h3>
      <div className="mt-6 flex gap-4">
        <button type="button" onClick={() => handleAnswer(true)} className="btn-primary flex-1">Tak</button>
        <button type="button" onClick={() => handleAnswer(false)} className="btn-secondary flex-1">Nie</button>
      </div>
      {currentQ > 0 && (
        <button type="button" onClick={() => setCurrentQ((p) => p - 1)} className="mt-4 inline-flex items-center gap-1 text-sm text-white/50 hover:text-white">
          <ChevronLeft className="h-4 w-4" /> Wstecz
        </button>
      )}
      <p className="mt-4 text-xs text-white/40">Odpowiedzi nie są przechowywane w przeglądarce ani na serwerze.</p>
    </div>
  );
}
