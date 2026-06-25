import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { ARCHIVE_POSTER_ITEMS_QUERY } from "@/sanity/lib/queries";
import { formatArchiveMeta } from "@/sanity/lib/presenters";
import type { SanityArchiveEntryPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Poster-Archiv für Events und Ausstellungen",
  description:
    "Poster-Archiv von The Base e.V. mit Plakaten, Typografie und visuellen Kampagnen zu Events und Ausstellungen in Aachen.",
  path: "/archive/poster",
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
  const items = await maybeSanityFetch<SanityArchiveEntryPreview[]>({
    query: ARCHIVE_POSTER_ITEMS_QUERY,
    params: { locale },
    tags: ["archiveEntry", "archive", "poster"],
    revalidate: 300,
  });

  if (!items?.length) {
    return [];
  }

  const mappedEntries = items
    .filter((item) => Boolean(item.slug || item.externalUrl))
    .map((item) => ({
      title: item.title,
      href: item.slug ? `/archive/${item.slug}` : (item.externalUrl as string),
      description: item.summary,
      meta: formatArchiveMeta(locale, item),
      external: item.slug ? undefined : (true as const),
      ctaLabel: text(locale, { de: "Zur Seite", en: "Open page" }),
    }));

  return mappedEntries;
}

export default async function PosterPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);

  return (
    <SimplePage
      eyebrow="Archive"
      title={{ de: "Poster", en: "Posters" }}
      description={{
        de: "Grafische Spuren, Ankündigungen und visuelle Arbeiten aus dem Umfeld von Ausstellungen, Open Calls und Veranstaltungen.",
        en: "Graphic traces, announcements, and visual works from the context of exhibitions, open calls, and public events.",
      }}
      note={{
        de: "Solange hier noch keine grafischen Spuren versammelt sind, bleibt die Seite bewusst offen.",
        en: "As long as no graphic traces are gathered here yet, the page intentionally stays open.",
      }}
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Poster", en: "Poster" })}
        title={text(locale, { de: "Spuren im Raum", en: "Traces in space" })}
        description={text(locale, {
          de: "Hier sammeln sich Motive, Setzungen und grafische Gesten, die das Programm nach aussen tragen.",
          en: "Images, layouts, and graphic gestures that carry the programme outward gather here.",
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
                de: "Sobald erste Plakate, Motive und visuelle Spuren versammelt sind, werden sie hier sichtbar.",
                en: "As soon as the first posters, visuals, and traces are gathered, they will appear here.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
