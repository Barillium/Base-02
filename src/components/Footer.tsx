import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getLocale, text } from "@/lib/i18n";
import Link from "next/link";

export async function Footer() {
  const locale = await getLocale();

  return (
    <footer className="mt-12 py-4 text-[var(--muted)] md:mt-14 md:py-5">
      <div className="content-grid gap-y-6">
        <div className="content-stack-tight">
          <p className="type-meta text-[var(--muted)]">
            {text(locale, { de: "Verbinden", en: "Connect" })}
          </p>
          <div className="flex items-center justify-between gap-4">
            <SocialLinks locale={locale} size="lg" tone="accent" />
            <Image
              src="/footer/IMG_6428.PNG"
              alt=""
              aria-hidden="true"
              width={556}
              height={444}
              sizes="3.5rem"
              className="h-auto w-14 shrink-0"
            />
          </div>
        </div>

        <div className="content-stack-tight layout-copy-start lg:max-w-[44rem] xl:max-w-[46rem]">
          <NewsletterForm locale={locale} />
        </div>
      </div>

      <div className="type-meta mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 md:mt-6">
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
