"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pl">
      <body style={{ margin: 0, background: "#050a14", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ textAlign: "center", maxWidth: "28rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Błąd aplikacji</h1>
            <p style={{ marginTop: "0.75rem", opacity: 0.7, fontSize: "0.875rem" }}>
              Wystąpił krytyczny błąd. Odśwież stronę lub spróbuj ponownie później.
            </p>
            {process.env.NODE_ENV === "development" && error.digest && (
              <p style={{ marginTop: "0.5rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5 }}>
                ID: {error.digest}
              </p>
            )}
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "linear-gradient(90deg, #0066ff, #00d4ff)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
