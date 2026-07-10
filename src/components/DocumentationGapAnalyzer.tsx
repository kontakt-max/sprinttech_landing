"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

const documents = [
  { id: "polityka", label: "Polityka bezpieczeństwa informacji", category: "Podstawowe" },
  { id: "incydenty", label: "Procedura zarządzania incydentami", category: "Operacyjne" },
  { id: "podatnosci", label: "Procedura zarządzania podatnościami", category: "Operacyjne" },
  { id: "aktywa", label: "Rejestr aktywów ICT", category: "Zarządzanie" },
  { id: "ryzyka", label: "Rejestr ryzyk ICT", category: "Zarządzanie" },
  { id: "bia", label: "Analiza wpływu na biznes (BIA)", category: "Ciągłość" },
  { id: "bcdr", label: "Plan ciągłości działania i odtwarzania", category: "Ciągłość" },
  { id: "backup", label: "Procedury backupu i odtwarzania", category: "Ciągłość" },
  { id: "privileged", label: "Procedura dostępu uprzywilejowanego", category: "Dostęp" },
  { id: "dora", label: "Dokumentacja ICT risk management (DORA)", category: "Regulacje" },
  { id: "nis2", label: "Dokumentacja zgodności NIS2", category: "Regulacje" },
  { id: "ksc", label: "Dokumentacja KSC / usługi kluczowe", category: "Regulacje" },
  { id: "iso", label: "Dokumentacja ISO 27001 (Statement of Applicability)", category: "Regulacje" },
  { id: "zarzad", label: "Raporty i materiały dla zarządu", category: "Governance" },
];

export function DocumentationGapAnalyzer() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const missing = documents.filter((d) => !checked.has(d.id));
  const coverage = Math.round((checked.size / documents.length) * 100);

  const categories = [...new Set(documents.map((d) => d.category))];

  return (
    <div className="glass-panel p-6 lg:p-8">
      <h3 className="heading-section text-xl">Documentation Gap Analyzer</h3>
      <p className="mt-2 text-sm text-white/60">
        Zaznacz dokumenty, które posiadacie i są aktualne. Na końcu zobaczysz listę braków.
      </p>

      {!showResult ? (
        <>
          {categories.map((cat) => (
            <div key={cat} className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan">
                {cat}
              </h4>
              <div className="mt-3 space-y-2">
                {documents
                  .filter((d) => d.category === cat)
                  .map((doc) => (
                    <label
                      key={doc.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-3 hover:border-white/20"
                    >
                      <input
                        type="checkbox"
                        checked={checked.has(doc.id)}
                        onChange={() => toggle(doc.id)}
                        className="h-4 w-4 rounded text-cyber-cyan"
                      />
                      <span className="text-sm text-white/80">{doc.label}</span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="btn-primary mt-8"
          >
            Pokaż analizę luk
          </button>
        </>
      ) : (
        <div className="mt-6">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-cyber-cyan">{coverage}%</div>
            <div className="text-sm text-white/60">
              Pokrycie dokumentacji ({checked.size} z {documents.length})
            </div>
          </div>

          {missing.length > 0 ? (
            <div className="mt-6">
              <h4 className="font-semibold text-white">Brakujące dokumenty ({missing.length})</h4>
              <ul className="mt-3 space-y-2">
                {missing.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <Circle className="h-4 w-4 text-cyber-amber" aria-hidden />
                    {doc.label}
                    <span className="text-white/40">({doc.category})</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 flex items-center gap-2 text-cyber-green">
              <CheckCircle2 className="h-5 w-5" aria-hidden />
              Kompletna checklista — rozważ audyt weryfikacyjny aktualności.
            </p>
          )}

          <p className="mt-4 text-xs text-white/40">
            Analiza wykonana lokalnie w przeglądarce — dane nie są wysyłane na serwer.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/kontakt" className="btn-primary text-sm">
              Zamów dostosowanie dokumentacji
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setShowResult(false)}
              className="btn-secondary text-sm"
            >
              Edytuj checklistę
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
