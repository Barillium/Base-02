import Link from "next/link";

import { getLocale, text } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <main className="editorial-fade page-flow-compact pt-4">
      <section className="grid gap-8 pt-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
        <p className="type-meta text-[var(--muted)]">404</p>
        <div className="space-y-5">
          <h1 className="type-display-hero text-[var(--ink)]">
            {text(locale, { de: "Seite nicht gefunden", en: "Page not found" })}
          </h1>
          <p className="type-body-lg max-w-2xl text-[var(--ink)]">
            {text(locale, {
              de: "Diese URL existiert aktuell nicht im The Base Archiv. Du kannst von hier direkt in die Hauptbereiche zurück.",
              en: "This URL does not currently exist in the The Base archive. From here you can jump back to the main sections.",
            })}
          </p>
          <div className="type-meta flex flex-wrap items-center gap-5 text-[var(--muted)]">
            <Link href="/" className="pb-1 text-[var(--ink)]">
              {text(locale, { de: "Startseite", en: "Home" })}
            </Link>
            <Link href="/about" className="transition-colors hover:text-[var(--ink)]">
              About
            </Link>
            <Link href="/mitmachen" className="transition-colors hover:text-[var(--ink)]">
              {text(locale, { de: "Mitmachen", en: "Get involved" })}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
