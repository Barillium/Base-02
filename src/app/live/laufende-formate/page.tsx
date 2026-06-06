import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { LIVE_ONGOING_FORMATS_QUERY } from "@/sanity/lib/queries";
import { formatFormatMeta } from "@/sanity/lib/presenters";
import type { SanityFormatPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Laufende Formate in Aachen bei The Base e.V.",
  description:
    "Laufende Formate von The Base e.V. in Aachen mit wiederkehrenden Ausstellungs- und Programmlinien im BOA Bunker of Art.",
  path: "/live/laufende-formate",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  external: true;
  ctaLabel: string;
};

async function getResolvedEntries(locale: Locale): Promise<Entry[]> {
  const formats = await maybeSanityFetch<SanityFormatPreview[]>({
    query: LIVE_ONGOING_FORMATS_QUERY,
    tags: ["format", "live", "ongoing-formats"],
    revalidate: 300,
  });

  if (!formats?.length) {
    return [];
  }

  const mappedEntries = formats
    .filter((format) => Boolean(format.externalUrl))
    .map((format) => ({
      title: format.title,
      href: format.externalUrl as string,
      description: format.summary,
      meta: formatFormatMeta(locale, format),
      external: true as const,
      ctaLabel: text(locale, { de: "Mehr dazu", en: "Learn more" }),
    }));

  return mappedEntries;
}

export default async function LaufendeFormatePage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);
  const note = entries.length
    ? {
        de: "Die Eintraege verweisen auf laufende Reihen und Kooperationen, die nicht nur an einen einzelnen Termin gebunden sind.",
        en: "These entries point to ongoing series and collaborations that are not tied to a single date only.",
      }
    : {
        de: "Solange noch keine Formate im CMS angelegt sind, bleibt die Seite bewusst offen und zeigt nur ihre spaetere Struktur.",
        en: "As long as no formats have been created in the CMS yet, the page intentionally stays open and only shows its future structure.",
      };

  return (
    <SimplePage
      eyebrow="Live"
      title={{ de: "Laufende Formate", en: "Ongoing formats" }}
      description={{
        de: "Diese Seite bündelt wiederkehrende Formate im Live-Programm, etwa Total Local oder die Beteiligung an der Aachener Kunstroute.",
        en: "This page gathers recurring formats within the live programme, such as Total Local or the involvement in the Aachener Kunstroute.",
      }}
      note={note}
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Format", en: "Format" })}
        title={text(locale, { de: "Laufende Reihen", en: "Recurring series" })}
        description={text(locale, {
          de: "Hier erscheinen laufende Formate als einzelne Einträge mit Kurzbeschreibung und weiterführendem Link.",
          en: "Recurring formats appear here as individual entries with summary and supporting link.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[10ch]"
        contentClassName="lg:pt-3"
      >
        {entries.length ? (
          entries.map((entry) => <Card key={entry.href} locale={locale} {...entry} />)
        ) : (
          <div className="border border-[var(--line)]/70 px-4 py-4 text-[var(--muted)] md:px-5">
            <p className="type-meta">{text(locale, { de: "Noch keine Formate", en: "No formats yet" })}</p>
            <p className="type-body mt-2">
              {text(locale, {
                de: "Laufende Formate können hier erscheinen, sobald in Sanity erste `format`-Dokumente angelegt sind.",
                en: "Recurring formats can appear here once the first `format` documents have been created in Sanity.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
