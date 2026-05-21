import { SocialLinks } from "@/components/SocialLinks";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getLocale, text } from "@/lib/i18n";
import Link from "next/link";

export async function Footer() {
  const locale = await getLocale();

  return (
    <footer className="mt-10 py-3 text-[var(--muted)] md:py-3.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SocialLinks size="lg" />
      </div>

      <div className="mt-3 pt-3">
        <NewsletterForm locale={locale} />
      </div>

      <div className="type-meta mt-3 flex flex-wrap items-center gap-4 pt-2">
        <Link href="/impressum" className="transition-colors hover:text-[var(--ink)]">
          {text(locale, { de: "Impressum", en: "Imprint" })}
        </Link>
        <Link href="/datenschutz" className="transition-colors hover:text-[var(--ink)]">
          {text(locale, { de: "Datenschutz", en: "Privacy" })}
        </Link>
      </div>
    </footer>
  );
}
