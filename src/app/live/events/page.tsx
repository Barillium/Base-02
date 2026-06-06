import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { LIVE_PAST_EVENTS_QUERY } from "@/sanity/lib/queries";
import { formatEventMeta } from "@/sanity/lib/presenters";
import type { SanityEventPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Eventarchiv in Aachen: Konzerte, Ausstellungen und Shows",
  description:
    "Das Eventarchiv von The Base e.V. in Aachen sammelt vergangene Konzerte, Ausstellungen, Release-Shows und weitere Veranstaltungen im BOA Bunker of Art.",
  path: "/live/events",
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
  const pastEvents = await maybeSanityFetch<SanityEventPreview[]>({
    query: LIVE_PAST_EVENTS_QUERY,
    tags: ["event", "live", "event-archive"],
    revalidate: 300,
  });

  if (!pastEvents?.length) {
    return [];
  }

  const mappedEntries = pastEvents
    .filter((event) => Boolean(event.externalUrl))
    .map((event) => ({
      title: event.title,
      href: event.externalUrl as string,
      description: event.summary,
      meta: formatEventMeta(locale, event),
      external: true as const,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    }));

  return mappedEntries;
}

export default async function EventsPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);
  const note = entries.length
    ? {
        de: "Das Archiv fuehrt vergangene Veranstaltungen als einzelne Eintraege mit Datum, Typ und weiterfuehrendem Link zusammen.",
        en: "The archive gathers past events as individual entries with date, type, and supporting link.",
      }
    : {
        de: "Solange im CMS noch keine Eintraege angelegt sind, bleibt diese Seite bewusst allgemein und zeigt nur ihre spaetere Struktur.",
        en: "As long as no entries exist in the CMS yet, this page intentionally stays general and only shows its future structure.",
      };

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Live"
        title={text(locale, { de: "Rueckblicke", en: "Retrospectives" })}
        titleLines={[
          text(locale, { de: "Rueck-", en: "Retro" }),
          text(locale, { de: "blicke", en: "spectives" }),
        ]}
        description={text(locale, {
          de: "Rueckblicke auf Ausstellungen, Konzerte, Release-Shows und andere Momente, die fuer den Ort und sein Umfeld praegend waren.",
          en: "Retrospectives on exhibitions, concerts, release shows, and other moments that have shaped the space and its context.",
        })}
        note={text(locale, note)}
        className="layout-editorial-intro"
        titleClassName="max-w-none text-[clamp(1.68rem,5.6vw,2.1rem)] md:max-w-none md:text-[clamp(1.96rem,4.9vw,2.42rem)] lg:max-w-[12.6ch] lg:text-[clamp(2.48rem,3.06vw,3.08rem)] xl:max-w-[13.4ch] xl:text-[clamp(2.74rem,3.3vw,3.34rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />
      <SectionGrid
        eyebrow={text(locale, { de: "Live", en: "Live" })}
        title={text(locale, { de: "Eventarchiv", en: "Event archive" })}
        titleLines={[text(locale, { de: "Eventarchiv", en: "Event archive" })]}
        description={text(locale, {
          de: "Hier stehen vergangene Veranstaltungen, Ausstellungen und Formate als einzelne Eintraege mit Datum, Kontext und weiterfuehrendem Link.",
          en: "Past events, exhibitions, and formats appear here as individual entries with date, context, and supporting link.",
        })}
        className="layout-live-events-section"
        titleClassName="max-w-none text-[clamp(1.54rem,5vw,1.96rem)] md:max-w-[13.8ch] md:text-[clamp(1.46rem,3.4vw,1.76rem)] lg:max-w-[16.2ch] lg:text-[clamp(1.34rem,1.56vw,1.6rem)] xl:max-w-[17ch] xl:text-[clamp(1.46rem,1.62vw,1.7rem)]"
        contentClassName="lg:pt-3"
      >
        {entries.length ? (
          entries.map((entry) => <Card key={entry.href} locale={locale} {...entry} />)
        ) : (
          <div className="border border-[var(--line)]/70 px-4 py-4 text-[var(--muted)] md:px-5">
            <p className="type-meta">{text(locale, { de: "Noch keine Einträge", en: "No entries yet" })}</p>
            <p className="type-body mt-2">
              {text(locale, {
                de: "Vergangene Veranstaltungen können hier eingepflegt werden, sobald in Sanity die ersten `event`-Dokumente mit Status `past` angelegt sind.",
                en: "Past events can be added here once the first `event` documents with status `past` have been created in Sanity.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </div>
  );
}
