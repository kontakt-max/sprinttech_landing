"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Cookie, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConsentCategory = "necessary" | "analytics" | "marketing" | "thirdParty";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
}

const CONSENT_KEY = "sprinttech-consent";
const CONSENT_VERSION = "1";

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  thirdParty: false,
};

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { version: string; consent: ConsentState };
        if (parsed.version === CONSENT_VERSION) {
          setConsent({ ...defaultConsent, ...parsed.consent, necessary: true });
        }
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    const toSave = { ...newConsent, necessary: true };
    setConsent(toSave);
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ version: CONSENT_VERSION, consent: toSave })
    );
  }, []);

  return { consent, saveConsent, loaded };
}

export function ConsentManager() {
  const { consent, saveConsent, loaded } = useConsent();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (loaded) {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setShowBanner(true);
    }
  }, [loaded]);

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      thirdParty: true,
    });
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    saveConsent(defaultConsent);
    setShowBanner(false);
  };

  const saveCustom = () => {
    saveConsent(consent);
    setShowBanner(false);
    setShowDetails(false);
  };

  if (!loaded || !showBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-navy-900/95 p-6 shadow-2xl backdrop-blur-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyber-cyan/10">
            <Cookie className="h-5 w-5 text-cyber-cyan" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 id="consent-title" className="text-lg font-semibold text-white">
              Ustawienia prywatności
            </h2>
            <p id="consent-desc" className="mt-2 text-sm text-white/70">
              Używamy plików cookie i podobnych technologii wyłącznie po Twojej zgodzie.
              Niezbędne cookie są wymagane do działania formularzy. Analityka, LinkedIn Insight Tag
              i osadzenia Google Forms wymagają osobnej zgody.
            </p>

            {showDetails && (
              <div className="mt-4 space-y-3">
                <ConsentToggle
                  label="Niezbędne"
                  description="Wymagane do działania strony i formularzy"
                  checked={true}
                  disabled
                />
                <ConsentToggle
                  label="Analityka"
                  description="Anonimowe statystyki odwiedzin"
                  checked={consent.analytics}
                  onChange={(v) => saveConsent({ ...consent, analytics: v })}
                />
                <ConsentToggle
                  label="Marketing (LinkedIn Insight Tag)"
                  description="Śledzenie konwersji z LinkedIn — tylko po aktywacji w konfiguracji"
                  checked={consent.marketing}
                  onChange={(v) => saveConsent({ ...consent, marketing: v })}
                />
                <ConsentToggle
                  label="Treści zewnętrzne (Google Forms)"
                  description="Osadzenie formularza Google w iframe"
                  checked={consent.thirdParty}
                  onChange={(v) => saveConsent({ ...consent, thirdParty: v })}
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={acceptAll} className="btn-primary text-sm">
                Akceptuj wszystkie
              </button>
              <button type="button" onClick={acceptNecessary} className="btn-secondary text-sm">
                Tylko niezbędne
              </button>
              <button
                type="button"
                onClick={() => (showDetails ? saveCustom() : setShowDetails(true))}
                className="text-sm text-cyber-cyan hover:underline"
              >
                {showDetails ? "Zapisz wybór" : "Dostosuj"}
              </button>
            </div>
            <p className="mt-3 text-xs text-white/50">
              <a href="/polityka-prywatnosci" className="hover:text-cyber-cyan">
                Polityka prywatności
              </a>
              {" · "}
              <a href="/cookies" className="hover:text-cyber-cyan">
                Polityka cookies
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={acceptNecessary}
            className="text-white/50 hover:text-white"
            aria-label="Zamknij i zaakceptuj tylko niezbędne"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentToggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-3 rounded-lg border border-white/10 p-3",
        disabled && "opacity-60"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-cyber-cyan focus:ring-cyber-cyan"
      />
      <div>
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          {label}
          {disabled && <Shield className="h-3 w-3 text-cyber-green" aria-label="Wymagane" />}
        </span>
        <span className="text-xs text-white/50">{description}</span>
      </div>
    </label>
  );
}

export function LinkedInInsightTag() {
  const { consent, loaded } = useConsent();
  const enabled =
    loaded &&
    consent.marketing &&
    process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED === "true";

  useEffect(() => {
    if (!enabled) return;
    // Placeholder — load only when explicitly enabled in env + consent
    console.info("[consent] LinkedIn Insight Tag would load here");
  }, [enabled]);

  return null;
}
