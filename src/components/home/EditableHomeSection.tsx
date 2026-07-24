"use client";

import { ReactNode } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

interface EditableHomeSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

/** Wrapper sekcji home — renderuje copy z data files przekazane jako props. */
export function EditableHomeSection({
  id,
  title,
  subtitle,
  children,
  className,
  dark = false,
}: EditableHomeSectionProps) {
  return (
    <AnimatedSection
      id={id}
      className={cn(
        "section-padding",
        dark && "bg-navy-900/50",
        className
      )}
    >
      <div className="container-wide">
        <h2 className="heading-section">{title}</h2>
        {subtitle && <p className="mt-4 max-w-3xl text-white/70">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </AnimatedSection>
  );
}
