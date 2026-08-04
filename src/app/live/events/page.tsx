import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import {
  getPastInstagramEventFallbacks,
  withInstagramFallbackForEventPreview,
} from "@/sanity/lib/eventInstagramFallbacks";
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
  external?: true;
  ctaLabel: string;
};

function getFallbackEntries(locale: Locale): Entry[] {
  return getPastInstagramEventFallbacks(locale).map((event) => ({
    title: event.title,
    href: event.externalUrl ?? "",
    description: event.summary,
    meta: formatEventMeta(locale, event),
    external: true,
    ctaLabel: text(locale, { de: "Zum Instagram-Post", en: "Open Instagram post" }),
  }));
}

async function getResolvedEntries(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getFallbackEntries(locale);
  const pastEvents = await maybeSanityFetch<SanityEventPreview[]>({
    query: LIVE_PAST_EVENTS_QUERY,
    params: { locale },
    tags: ["event", "live", "event-archive"],
    revalidate: 300,
  });

  if (!pastEvents?.length) {
    return fallbackEntries;
  }

  const mappedEntries: Entry[] = pastEvents
    .filter((event) => Boolean(event.slug || event.externalUrl))
    .map((event) => {
      const resolvedEvent = withInstagramFallbackForEventPreview(locale, event);

      return {
        title: resolvedEvent.title,
        href: resolvedEvent.externalUrl || "",
        description: resolvedEvent.summary,
        meta: formatEventMeta(locale, resolvedEvent),
        external: true as const,
        ctaLabel: text(locale, { de: "Zum Instagram-Post", en: "Open Instagram post" }),
      };
    })
    .filter((entry) => Boolean(entry.href));

  const mergedEntries = [...fallbackEntries];
  const seenHrefs = new Set(mergedEntries.map((entry) => entry.href.toLowerCase()));
  const seenTitles = new Set(mergedEntries.map((entry) => entry.title.toLowerCase()));

  for (const entry of mappedEntries) {
    const normalizedHref = entry.href.toLowerCase();
    const normalizedTitle = entry.title.toLowerCase();
    if (!seenHrefs.has(normalizedHref) && !seenTitles.has(normalizedTitle)) {
      mergedEntries.push(entry);
      seenHrefs.add(normalizedHref);
      seenTitles.add(normalizedTitle);
    }
  }

  return mergedEntries;
}

export default async function EventsPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);
  const note = {
    de: "Das Archiv bündelt vergangene Veranstaltungen und führt von jedem Eintrag direkt zur zugehörigen Veröffentlichung auf Instagram.",
    en: "The archive gathers past events and links each entry directly to its related publication on Instagram.",
  };

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Live"
        title={text(locale, { de: "Rückblicke", en: "Retrospectives" })}
        titleLines={[
          text(locale, { de: "Rückblicke", en: "Retrospectives" }),
        ]}
        description={text(locale, {
          de: "Rückblicke auf Ausstellungen, Workshops und andere Momente, die für den Ort, seine Nachbarschaft und sein Netzwerk prägend waren.",
          en: "Retrospectives on exhibitions, workshops, and other moments that have shaped the site, its neighbourhood, and its network.",
        })}
        note={text(locale, note)}
        className="layout-live-intro"
        titleClassName="max-w-none text-[clamp(1.6rem,5.2vw,1.98rem)] md:max-w-none md:text-[clamp(1.86rem,4.5vw,2.28rem)] lg:max-w-[12.6ch] lg:text-[clamp(2.36rem,2.9vw,2.92rem)] xl:max-w-[13.4ch] xl:text-[clamp(2.56rem,3.1vw,3.12rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />
      <SectionGrid
        eyebrow={text(locale, { de: "Live", en: "Live" })}
        title={text(locale, { de: "Eventarchiv", en: "Event archive" })}
        titleLines={[text(locale, { de: "Eventarchiv", en: "Event archive" })]}
        description={text(locale, {
          de: "Hier stehen vergangene Veranstaltungen, Ausstellungen und Formate als einzelne Einträge mit Datum, Kontext und weiterführendem Verweis.",
          en: "Past events, exhibitions, and formats appear here as individual entries with date, context, and supporting reference.",
        })}
        className="layout-live-section"
        titleClassName="max-w-none text-[clamp(1.46rem,4.74vw,1.84rem)] md:max-w-[13.8ch] md:text-[clamp(1.38rem,3.12vw,1.64rem)] lg:max-w-[16.2ch] lg:text-[clamp(1.26rem,1.42vw,1.48rem)] xl:max-w-[17ch] xl:text-[clamp(1.36rem,1.5vw,1.58rem)]"
        contentClassName="lg:pt-3"
      >
        {entries.length ? (
          entries.map((entry) => <Card key={`${entry.href}-${entry.title}`} locale={locale} {...entry} />)
        ) : (
          <div className="border border-[var(--line)]/70 px-4 py-4 text-[var(--muted)] md:px-5">
            <p className="type-meta">{text(locale, { de: "Noch keine Einträge", en: "No entries yet" })}</p>
            <p className="type-body mt-2">
              {text(locale, {
                de: "Vergangene Veranstaltungen erscheinen hier, sobald erste Rückblicke veröffentlicht sind.",
                en: "Past events appear here once the first retrospectives have been published.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </div>
  );
}
