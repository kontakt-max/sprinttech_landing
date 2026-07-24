import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  className?: string;
  featured?: boolean;
}

export function ServiceCard({
  title,
  description,
  href,
  tags = [],
  className,
  featured = false,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "glass-panel-hover group flex flex-col p-6",
        featured && "border-cyber-cyan/20 bg-gradient-to-br from-cyber-blue/10 to-transparent",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-cyber-cyan transition-colors">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{description}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyber-cyan hover:underline"
        aria-label={`Dowiedz się więcej o ${title}`}
      >
        Szczegóły
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

interface ServiceDetailCardProps {
  title: string;
  problem: string;
  scope: string[];
  deliverables: string[];
  href?: string;
}

export function ServiceDetailCard({
  title,
  problem,
  scope,
  deliverables,
  href,
}: ServiceDetailCardProps) {
  return (
    <article className="glass-panel p-6 lg:p-8">
      <h3 className="heading-section text-xl">{title}</h3>
      <p className="mt-3 text-white/70">{problem}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan">
            Zakres
          </h4>
          <ul className="mt-3 space-y-2">
            {scope.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-green" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan">
            Deliverables
          </h4>
          <ul className="mt-3 space-y-2">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-green" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {href && (
        <Link href={href} className="btn-primary mt-6 inline-flex">
          Umów konsultację
        </Link>
      )}
    </article>
  );
}
