"use client";

import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadFormSchema,
  leadQualificationSchema,
  type LeadFormData,
  type LeadQualificationData,
  INDUSTRIES,
  COMPANY_SIZES,
  INTEREST_AREAS,
  REGULATED_OPTIONS,
} from "@/lib/validation/lead";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormVariant = "full" | "qualification";

interface LeadFormProps {
  variant?: FormVariant;
  source?: string;
  className?: string;
}

export function LeadForm({ variant = "full", source = "website", className }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [devModeNotice, setDevModeNotice] = useState(false);

  const isQualification = variant === "qualification";

  const fullForm = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      regulatedBy: [],
      consentContact: undefined,
      consentPrivacy: undefined,
      website: "",
    },
  });

  const qualForm = useForm<LeadQualificationData>({
    resolver: zodResolver(leadQualificationSchema),
    defaultValues: {
      consentContact: undefined,
      consentPrivacy: undefined,
      website: "",
    },
  });

  const onSubmitFull = async (data: LeadFormData) => {
    if (data.website) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Błąd wysyłania");
      setDevModeNotice(Boolean(json.devMode));
      setStatus("success");
      fullForm.reset();
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Wystąpił błąd");
    }
  };

  const onSubmitQual = async (data: LeadQualificationData) => {
    if (data.website) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: `${source}-qualification` }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Błąd wysyłania");
      setDevModeNotice(Boolean(json.devMode));
      setStatus("success");
      qualForm.reset();
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Wystąpił błąd");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("glass-panel p-8 text-center", className)} role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-cyber-green" aria-hidden />
        <h3 className="mt-4 text-lg font-semibold">Dziękujemy za zgłoszenie</h3>
        <p className="mt-2 text-sm text-white/70">
          Skontaktujemy się w ciągu 1–2 dni roboczych.
        </p>
        {devModeNotice && process.env.NODE_ENV === "development" && (
          <p className="mt-3 rounded-lg border border-cyber-amber/30 bg-cyber-amber/10 px-3 py-2 text-xs text-cyber-amber">
            Tryb developerski: Google Sheets nie jest skonfigurowany. Zgłoszenie zostało przyjęte testowo — dane nie zostały zapisane w arkuszu.
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-4 text-sm"
        >
          Wyślij kolejne zgłoszenie
        </button>
      </div>
    );
  }

  if (isQualification) {
    const { register, handleSubmit, formState: { errors } } = qualForm;
    return (
      <form
        onSubmit={handleSubmit(onSubmitQual)}
        className={cn("glass-panel space-y-4 p-6", className)}
        noValidate
      >
        <h3 className="font-semibold">Sprawdź gotowość na NIS2/DORA</h3>
        <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

        <Field label="Imię i nazwisko" error={errors.name?.message}>
          <input {...register("name")} className="input-field" autoComplete="name" />
        </Field>
        <Field label="Firma" error={errors.company?.message}>
          <input {...register("company")} className="input-field" autoComplete="organization" />
        </Field>
        <Field label="E-mail służbowy" error={errors.email?.message}>
          <input {...register("email")} type="email" className="input-field" autoComplete="email" />
        </Field>
        <Field label="Regulacja" error={errors.regulation?.message}>
          <select {...register("regulation")} className="input-field">
            <option value="">Wybierz...</option>
            <option value="nis2">NIS2</option>
            <option value="dora">DORA</option>
            <option value="ksc">KSC</option>
            <option value="iso27001">ISO 27001</option>
            <option value="other">Inna</option>
          </select>
        </Field>
        <CheckboxField
          label="Zgadzam się na kontakt handlowy w sprawie konsultacji"
          error={errors.consentContact?.message}
          register={register("consentContact")}
        />
        <CheckboxField
          label={<>Akceptuję <a href="/polityka-prywatnosci" className="text-cyber-cyan hover:underline">politykę prywatności</a></>}
          error={errors.consentPrivacy?.message}
          register={register("consentPrivacy")}
        />
        {status === "error" && <ErrorBanner message={errorMessage} />}
        <SubmitButton loading={status === "loading"} />
      </form>
    );
  }

  const { register, handleSubmit, formState: { errors } } = fullForm;

  return (
    <form
      onSubmit={handleSubmit(onSubmitFull)}
      className={cn("glass-panel space-y-4 p-6 lg:p-8", className)}
      noValidate
    >
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Imię i nazwisko *" error={errors.name?.message}>
          <input {...register("name")} className="input-field" autoComplete="name" />
        </Field>
        <Field label="Firma *" error={errors.company?.message}>
          <input {...register("company")} className="input-field" autoComplete="organization" />
        </Field>
        <Field label="E-mail służbowy *" error={errors.email?.message}>
          <input {...register("email")} type="email" className="input-field" autoComplete="email" />
        </Field>
        <Field label="Telefon" error={errors.phone?.message}>
          <input {...register("phone")} type="tel" className="input-field" autoComplete="tel" />
        </Field>
        <Field label="Branża *" error={errors.industry?.message}>
          <select {...register("industry")} className="input-field">
            <option value="">Wybierz...</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </Field>
        <Field label="Wielkość organizacji *" error={errors.companySize?.message}>
          <select {...register("companySize")} className="input-field">
            <option value="">Wybierz...</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Interesujący obszar *" error={errors.interestArea?.message}>
        <select {...register("interestArea")} className="input-field">
          <option value="">Wybierz...</option>
          {INTEREST_AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="text-sm font-medium text-white/80">Środowisko regulowane</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {REGULATED_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={opt}
                {...register("regulatedBy")}
                className="rounded text-cyber-cyan"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Opis potrzeby *" error={errors.message?.message}>
        <textarea {...register("message")} rows={4} className="input-field resize-y" />
      </Field>

      <Field label="Preferowany termin kontaktu" error={errors.preferredContact?.message}>
        <input {...register("preferredContact")} className="input-field" placeholder="np. przyszły tydzień, Q2 2025" />
      </Field>

      <CheckboxField
        label="Wyrażam zgodę na kontakt handlowy *"
        error={errors.consentContact?.message}
        register={register("consentContact")}
      />
      <CheckboxField
        label={<>Akceptuję <a href="/polityka-prywatnosci" className="text-cyber-cyan hover:underline">politykę prywatności</a> *</>}
        error={errors.consentPrivacy?.message}
        register={register("consentPrivacy")}
      />

      {status === "error" && <ErrorBanner message={errorMessage} />}
      <SubmitButton loading={status === "loading"} />
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80">{label}</label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-cyber-red" role="alert">{error}</p>
      )}
    </div>
  );
}

function CheckboxField({
  label,
  error,
  register,
}: {
  label: React.ReactNode;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: ReturnType<UseFormRegister<any>>;
}) {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" {...register} className="mt-1 rounded text-cyber-cyan" />
        <span className="text-white/70">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-cyber-red" role="alert">{error}</p>}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-cyber-red/30 bg-cyber-red/10 p-3 text-sm text-cyber-red" role="alert">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
      {message}
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
          Wysyłanie...
        </>
      ) : (
        "Wyślij zgłoszenie"
      )}
    </button>
  );
}
