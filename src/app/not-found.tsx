import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-cyber-cyan">404</p>
      <h1 className="mt-2 text-3xl font-bold text-white">Nie znaleziono strony</h1>
      <p className="mt-3 max-w-md text-sm text-white/60">
        Adres może być nieaktualny lub strona została przeniesiona.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Wróć na stronę główna
      </Link>
    </div>
  );
}
