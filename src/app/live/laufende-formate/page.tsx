import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { LIVE_ONGOING_SERIES_QUERY } from "@/sanity/lib/queries";
import { formatSeriesMeta } from "@/sanity/lib/presenters";
import type { SanityProgrammeSeriesPreview } from "@/sanity/types";

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
  external?: true;
  ctaLabel: string;
};

function getAdditionalEntries(locale: Locale): Entry[] {
  return [
    {
      title: "Total Local",
      href: "https://www.instagram.com/p/DXe58xqjcgO/",
      description: text(locale, {
        de: "Wiederkehrende Programmlinie mit lokal verankerten künstlerischen Positionen und kollaborativer Ausstellungspraxis.",
        en: "Recurring programme line for locally rooted artistic positions and collaborative exhibition practice.",
      }),
      meta: text(locale, { de: "Laufendes Format", en: "Ongoing format" }),
      external: true,
      ctaLabel: text(locale, { de: "Mehr dazu", en: "Learn more" }),
    },
    {
      title: text(locale, { de: "Kunstroute", en: "Kunstroute" }),
      href: "https://aachenerkunstroute.de/teilnehmer.html?start=13",
      description: text(locale, {
        de: "Bunker of Art / BOA als wiederkehrende Station im Rahmen der Aachener Kunstroute.",
        en: "Bunker of Art / BOA as a recurring station within the Aachener Kunstroute.",
      }),
      meta: text(locale, { de: "Laufendes Format", en: "Ongoing format" }),
      external: true,
      ctaLabel: text(locale, { de: "Mehr dazu", en: "Learn more" }),
    },
    {
      title: text(locale, { de: "Krachparade", en: "Krachparade" }),
      href: "/about/the-base",
      description: text(locale, {
        de: "Städtische Allianz für kulturelle Freiräume, an der The Base seit 2019 beteiligt ist und in der die Frage nach dauerhaft nutzbaren Orten öffentlich verhandelt wird.",
        en: "A city-wide alliance for cultural free spaces in which The Base has been involved since 2019, making the question of durable venues public.",
      }),
      meta: text(locale, { de: "Laufendes Format", en: "Ongoing format" }),
      ctaLabel: text(locale, { de: "Zum Kontext", en: "Open context" }),
    },
  ];
}

async function getResolvedEntries(locale: Locale): Promise<Entry[]> {
  const formats = await maybeSanityFetch<SanityProgrammeSeriesPreview[]>({
    query: LIVE_ONGOING_SERIES_QUERY,
    params: { locale },
    tags: ["programmeSeries", "live", "ongoing-formats"],
    revalidate: 300,
  });

  const mappedEntries: Entry[] = formats
    ?.filter((format) => Boolean(format.externalUrl))
    .map((format) => ({
      title: format.title,
      href: format.externalUrl as string,
      description: format.summary,
      meta: formatSeriesMeta(locale, format),
      external: true as const,
      ctaLabel: text(locale, { de: "Mehr dazu", en: "Learn more" }),
    })) ?? [];

  const additionalEntries = getAdditionalEntries(locale);
  const seenHrefs = new Set(mappedEntries.map((entry) => entry.href));
  const seenTitles = new Set(mappedEntries.map((entry) => entry.title.toLowerCase()));
  const mergedEntries = [...mappedEntries];

  for (const entry of additionalEntries) {
    const normalizedTitle = entry.title.toLowerCase();
    if (!seenHrefs.has(entry.href) && !seenTitles.has(normalizedTitle)) {
      mergedEntries.push(entry);
      seenHrefs.add(entry.href);
      seenTitles.add(normalizedTitle);
    }
  }

  return mergedEntries;
}

export default async function LaufendeFormatePage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);
  const note = entries.length
    ? {
        de: "Die Einträge verweisen auf laufende Reihen und Kooperationen, die nicht nur an einen einzelnen Termin gebunden sind.",
        en: "These entries point to ongoing series and collaborations that are not tied to a single date only.",
      }
    : {
        de: "Solange noch keine laufenden Formate veröffentlicht sind, bleibt die Seite bewusst offen.",
        en: "As long as no ongoing formats have been published yet, the page intentionally stays open.",
      };

  return (
    <SimplePage
      eyebrow="Live"
      title={{ de: "Laufende Formate", en: "Ongoing formats" }}
      introClassName="layout-live-intro"
      description={{
        de: "Diese Seite bündelt wiederkehrende Formate im Live-Programm, etwa Total Local, die Beteiligung an der Aachener Kunstroute oder stadtbezogene Allianzen wie Krachparade.",
        en: "This page gathers recurring formats within the live programme, such as Total Local, the involvement in the Aachener Kunstroute, or city-wide alliances such as Krachparade.",
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
        className="layout-live-section"
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
                de: "Laufende Formate erscheinen hier, sobald erste Reihen und Kooperationen veröffentlicht sind.",
                en: "Recurring formats appear here once the first series and collaborations have been published.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
