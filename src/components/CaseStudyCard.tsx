import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  featured?: boolean;
}

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  return (
    <article
      className={`glass-panel-hover group flex flex-col overflow-hidden ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-center gap-2 text-sm text-cyber-cyan">
          <Building2 className="h-4 w-4" aria-hidden />
          <span>{study.sector}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white group-hover:text-cyber-cyan transition-colors">
          {study.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-white/70">{study.excerpt}</p>
        {study.metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="rounded-lg bg-white/5 px-3 py-2">
                <div className="text-lg font-bold text-cyber-cyan">{m.value}</div>
                <div className="text-xs text-white/50">{m.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {study.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/60"
            >
              {s}
            </span>
          ))}
        </div>
        <Link
          href={`/case-study/${study.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyber-cyan hover:underline"
        >
          Czytaj case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
