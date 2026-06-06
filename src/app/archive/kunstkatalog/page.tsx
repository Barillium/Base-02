import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { ARCHIVE_CATALOGUE_ITEMS_QUERY } from "@/sanity/lib/queries";
import { formatArchiveMeta } from "@/sanity/lib/presenters";
import type { SanityArchiveItemPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Kunstkatalog von The Base e.V. Aachen",
  description:
    "Kunstkatalog von The Base e.V. Aachen mit Arbeiten, Künstler:innenprofilen, Ausstellungstexten und Projektdokumentation.",
  path: "/archive/kunstkatalog",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  external?: true;
  ctaLabel?: string;
};

async function getResolvedEntries(locale: Locale): Promise<Entry[]> {
  const items = await maybeSanityFetch<SanityArchiveItemPreview[]>({
    query: ARCHIVE_CATALOGUE_ITEMS_QUERY,
    tags: ["archiveItem", "archive", "catalogue"],
    revalidate: 300,
  });

  if (!items?.length) {
    return [];
  }

  const mappedEntries = items
    .filter((item) => Boolean(item.externalUrl))
    .map((item) => ({
      title: item.title,
      href: item.externalUrl as string,
      description: item.summary,
      meta: formatArchiveMeta(locale, item),
      external: true as const,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    }));

  return mappedEntries;
}

export default async function KunstkatalogPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);

  return (
    <SimplePage
      eyebrow="Archive"
      title={{ de: "Kunstkatalog", en: "Art catalogue" }}
      description={{
        de: "Arbeiten, Texte, Credits und Materialien, die einzelne Ausstellungen und Projekte in ihrem Zusammenhang lesbar machen.",
        en: "Works, texts, credits, and materials that make individual exhibitions and projects legible in their context.",
      }}
      note={{
        de: "Solange hier noch keine Arbeiten und Texte versammelt sind, bleibt die Seite bewusst zurueckhaltend.",
        en: "As long as no works and texts are gathered here yet, the page intentionally stays restrained.",
      }}
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Arbeiten", en: "Works" })}
        title={text(locale, { de: "Kontexte und Texte", en: "Contexts and texts" })}
        description={text(locale, {
          de: "Hier erscheinen Arbeiten und begleitende Texte als lesbare Spuren einzelner Projekte.",
          en: "Works and accompanying texts appear here as legible traces of individual projects.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[10ch]"
        contentClassName="lg:pt-3"
      >
        {entries.length ? (
          entries.map((entry) => <Card key={entry.href} locale={locale} {...entry} />)
        ) : (
          <div className="border border-[var(--line)]/70 px-4 py-4 text-[var(--muted)] md:px-5">
            <p className="type-meta">{text(locale, { de: "Noch keine Einträge", en: "No entries yet" })}</p>
            <p className="type-body mt-2">
              {text(locale, {
                de: "Sobald erste Arbeiten, Texte und Kontexte versammelt sind, werden sie hier sichtbar.",
                en: "As soon as the first works, texts, and contexts are gathered, they will appear here.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
