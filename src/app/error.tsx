"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-white">Wystąpił nieoczekiwany błąd</h1>
      <p className="mt-3 max-w-md text-sm text-white/60">
        Nie udało się załadować tej sekcji. Spróbuj ponownie lub wróć na stronę główną.
      </p>
      {process.env.NODE_ENV === "development" && error.digest && (
        <p className="mt-2 font-mono text-xs text-white/40">ID: {error.digest}</p>
      )}
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Spróbuj ponownie
        </button>
        <Link href="/" className="btn-secondary">
          Strona główna
        </Link>
      </div>
    </div>
  );
}
