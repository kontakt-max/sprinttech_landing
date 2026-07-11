"use client";

import { useConsent } from "@/components/ConsentManager";
import { ExternalLink } from "lucide-react";
import { publicEnv } from "@/lib/env";

interface GoogleFormEmbedProps {
  embedUrl?: string;
  fallbackUrl?: string;
  title?: string;
}

export function GoogleFormEmbed({
  embedUrl = publicEnv.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL,
  fallbackUrl = publicEnv.NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL,
  title = "Formularz kontaktowy SprintTech",
}: GoogleFormEmbedProps) {
  const { consent, loaded } = useConsent();

  if (!embedUrl) {
    return (
      <p className="text-sm text-white/60">
        Formularz Google Forms nie jest skonfigurowany. Użyj formularza na stronie lub skontaktuj się
        bezpośrednio:{" "}
        <a href="mailto:kontakt@sprinttech.pl" className="text-cyber-cyan hover:underline">
          kontakt@sprinttech.pl
        </a>
      </p>
    );
  }

  if (!loaded || !consent.thirdParty) {
    return (
      <div className="glass-panel p-6 text-center">
        <p className="text-sm text-white/70">
          Osadzenie formularza Google wymaga zgody na treści zewnętrzne.
          Zaakceptuj cookies w banerze lub użyj linku poniżej.
        </p>
        {fallbackUrl && (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-4 inline-flex items-center gap-2"
          >
            Otwórz formularz w nowej karcie
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <iframe
        src={embedUrl}
        title={title}
        className="h-[600px] w-full border-0 bg-white"
        loading="lazy"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
      {fallbackUrl && (
        <div className="border-t border-white/10 bg-white/5 p-3 text-center">
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-cyber-cyan hover:underline"
          >
            Otwórz formularz w nowej karcie
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
      )}
    </div>
  );
}
