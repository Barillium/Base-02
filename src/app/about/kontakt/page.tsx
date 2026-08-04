import { PageIntro } from "@/components/PageIntro";
import { SocialLinks } from "@/components/SocialLinks";
import { getLocale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, STATIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanitySiteSettings, SanityStaticPage } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Kontakt zu The Base e.V. in Aachen",
  description:
    "Kontakt zu The Base e.V. Aachen: Adresse, E-Mail, Presse, Kooperationen, Programmfragen und Raumanfragen im BOA Bunker of Art.",
  path: "/about/kontakt",
});

export default async function KontaktPage() {
  const locale = await getLocale();
  const [page, siteSettings] = await Promise.all([
    maybeSanityFetch<SanityStaticPage>({
      query: STATIC_PAGE_QUERY,
      params: { locale, routeKey: "about-kontakt" },
      tags: ["staticPage", "about"],
      revalidate: 300,
    }),
    maybeSanityFetch<SanitySiteSettings>({
      query: SITE_SETTINGS_QUERY,
      params: { locale },
      tags: ["siteSettings"],
      revalidate: 300,
    }),
  ]);
  const addressLines = siteSettings?.postalAddress
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="editorial-fade page-flow-compact">
      <PageIntro
        eyebrow={page?.eyebrow ?? "About"}
        title={page?.title ?? text(locale, { de: "Kontakt", en: "Contact" })}
        titleLines={splitDisplayTitle(page?.displayTitle)}
        description={
          page?.description ??
          text(locale, {
            de: "Diese Seite sammelt die direkten Kontaktwege für Programmfragen, Presse, Kooperationen, Workshops, Raumanfragen und Besuch im BOA Bunker of Art Aachen.",
            en: "This page brings together direct contact paths for programme questions, press, collaborations, workshops, space requests, and visits to the BOA Bunker of Art Aachen.",
          })
        }
        layout={page?.introLayout}
        className="layout-about-intro"
        titleClassName="lg:max-w-[9.8ch] lg:text-[clamp(2.46rem,3.12vw,3.02rem)] xl:max-w-[10.6ch] xl:text-[clamp(2.66rem,3.24vw,3.18rem)]"
        rightClassName="lg:max-w-[44rem] lg:pt-4"
      />

      <section className="content-grid layout-about-section pt-2 md:pt-3">
        <address className="content-stack-tight min-w-0 not-italic lg:pr-4 xl:pr-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Adresse", en: "Address" })}</p>
          {(addressLines?.length ? addressLines : ["BOA / Bunker of Art", "Scheibenstraße 34, 52070 Aachen"]).map((line) => (
            <p key={line} className="type-body-lg text-[var(--ink)]">
              {line}
            </p>
          ))}
        </address>

        <address className="content-stack layout-copy-start min-w-0 not-italic lg:max-w-[44rem] lg:pt-2">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontakt", en: "Contact" })}</p>
          <a href={`mailto:${siteSettings?.contactEmail ?? "info@thebase-ev.de"}`} className="type-body-lg text-[var(--accent)]">
            {siteSettings?.contactEmail ?? "info@thebase-ev.de"}
          </a>
          {siteSettings?.socialLinks?.length ? (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="type-body text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <>
              <p className="type-body text-[var(--muted)]">Instagram + Facebook</p>
              <SocialLinks locale={locale} />
            </>
          )}
        </address>
      </section>

      <section className="content-grid layout-about-section pt-1 md:pt-2">
        <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Hinweis", en: "Note" })}</p>
        </div>

        <div className="content-stack layout-copy-start min-w-0 lg:max-w-[44rem] lg:pt-1">
          <p className="type-body-lg text-[var(--ink)]">
            {page?.note ??
              text(locale, {
                de: "Öffnungszeiten sind programmabhängig und werden laufend über Live, Archive und Social Updates veröffentlicht.",
                en: "Opening hours depend on the programme and are published continuously via Live, Archive, and social updates.",
              })}
          </p>
        </div>
      </section>
    </div>
  );
}
