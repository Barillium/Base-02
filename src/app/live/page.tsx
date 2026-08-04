import { Card } from "@/components/Card";
import { PageJsonLd } from "@/components/PageJsonLd";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import {
  resolveLinkFieldHref,
  resolveLinkedDocumentHref,
  splitDisplayTitle,
} from "@/sanity/lib/content";
import {
  getCurrentInstagramEventFallback,
  resolveCurrentInstagramAwareEvent,
} from "@/sanity/lib/eventInstagramFallbacks";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { formatEventMeta } from "@/sanity/lib/presenters";
import { LIVE_CURRENT_EVENT_QUERY, LIVE_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityEventPreview, SanityLivePage, SanityTeaserCard } from "@/sanity/types";

const livePageMetadata = {
  title: "Live-Programm in Aachen: Ausstellungen, Konzerte und Workshops",
  description:
    "Das Live-Programm von The Base e.V. in Aachen bündelt Ausstellungen, Konzerte, Workshops und weitere Termine im BOA Bunker of Art.",
  path: "/live",
} as const;

export const metadata = pageMetadata(livePageMetadata);

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  ctaLabel?: string;
  external?: true;
};

function getCurrentAndUpcoming(locale: Locale): Entry[] {
  const currentEvent = getCurrentInstagramEventFallback(locale);

  return [
    {
      title: currentEvent.title,
      href: currentEvent.externalUrl ?? "",
      description: currentEvent.summary,
      meta: text(locale, { de: "Aktuell", en: "Current" }),
      ctaLabel: text(locale, { de: "Zum Instagram-Post", en: "Open Instagram post" }),
      external: true,
    },
  ];
}

function getPastEvents(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Übersicht vergangener Veranstaltungen", en: "Past events overview" }),
      href: "/live/events",
      description: text(locale, {
        de: "Hier liegen die jüngsten dokumentierten Veranstaltungen wie UNDERGROUND, The Roots of All That Exists und Total Local mit direktem Verweis zum jeweiligen Instagram-Post.",
        en: "This section gathers the latest documented events such as UNDERGROUND, The Roots of All That Exists, and Total Local, each linking directly to its Instagram post.",
      }),
      meta: text(locale, { de: "Archiv", en: "Archive" }),
    },
  ];
}

function getOngoingFormats(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Laufende Formate", en: "Ongoing formats" }),
      href: "/live/laufende-formate",
      description: text(locale, {
        de: "Die Übersicht bündelt wiederkehrende Reihen wie Total Local, die Beteiligung an der Aachener Kunstroute und stadtbezogene Allianzen wie Krachparade.",
        en: "This overview gathers recurring strands such as Total Local, the contribution to the Aachener Kunstroute, and city-based alliances such as Krachparade.",
      }),
      meta: text(locale, { de: "Übersicht", en: "Overview" }),
    },
  ];
}

function resolveTeaserCardEntry(card: SanityTeaserCard): Entry | null {
  const href = resolveLinkFieldHref(card.link) || resolveLinkedDocumentHref(card.linkedDocument) || "";

  if (!href) {
    return null;
  }

  return {
    title: card.title,
    href,
    description: card.description,
    meta: card.meta ?? "",
    ctaLabel: card.ctaLabel,
    external: /^https?:\/\//.test(href) ? true : undefined,
  };
}

function isEntry(entry: Entry | null): entry is Entry {
  return entry !== null;
}

function isGenericCurrentEntry(entry: Entry, locale: Locale) {
  return (
    entry.title === text(locale, { de: "Aktuelle Veranstaltung", en: "Current event" })
    || entry.meta === text(locale, { de: "Aktuell", en: "Current" })
  );
}

function isGenericPastEntry(entry: Entry, locale: Locale) {
  return (
    entry.title === text(locale, { de: "Übersicht vergangener Veranstaltungen", en: "Past events overview" })
    || entry.meta === text(locale, { de: "Archiv", en: "Archive" })
  );
}

function isGenericFormatsEntry(entry: Entry, locale: Locale) {
  return (
    entry.title === text(locale, { de: "Laufende Formate", en: "Ongoing formats" })
    || entry.meta === text(locale, { de: "Übersicht", en: "Overview" })
  );
}

export default async function LivePage() {
  const locale = await getLocale();
  const [livePage, currentEvent] = await Promise.all([
    maybeSanityFetch<SanityLivePage>({
      query: LIVE_PAGE_QUERY,
      params: { locale },
      tags: ["livePage", "live"],
      revalidate: 300,
    }),
    maybeSanityFetch<SanityEventPreview>({
      query: LIVE_CURRENT_EVENT_QUERY,
      params: { locale },
      tags: ["event", "live", "current-event"],
      revalidate: 300,
    }),
  ]);
  const resolvedCurrentEntries = livePage?.currentSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? [];
  const resolvedPastEvents = livePage?.archiveSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? [];
  const resolvedOngoingFormats = livePage?.formatsSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? [];
  const resolvedCurrentEvent = resolveCurrentInstagramAwareEvent(locale, currentEvent);
  const instagramCurrentFallback = getCurrentAndUpcoming(locale)[0];
  const currentFallbackEntry: Entry = {
    title: resolvedCurrentEvent.title,
    href: resolvedCurrentEvent.externalUrl || instagramCurrentFallback.href,
    description: resolvedCurrentEvent.summary,
    meta: resolvedCurrentEvent.startDate
      ? formatEventMeta(locale, resolvedCurrentEvent)
      : instagramCurrentFallback.meta,
    ctaLabel: text(locale, { de: "Zum Instagram-Post", en: "Open Instagram post" }),
    external: true,
  };
  const currentAndUpcoming = resolvedCurrentEntries.length
    ? resolvedCurrentEntries.map((entry, index) =>
        index === 0 && isGenericCurrentEntry(entry, locale)
          ? {
              ...entry,
              title: currentFallbackEntry.title,
              href: currentFallbackEntry.href,
              description: currentFallbackEntry.description,
              meta: currentFallbackEntry.meta,
              ctaLabel: currentFallbackEntry.ctaLabel,
              external: currentFallbackEntry.external,
            }
          : entry,
      )
    : [currentFallbackEntry];
  const pastFallbackEntry = getPastEvents(locale)[0];
  const pastEvents = resolvedPastEvents.length
    ? resolvedPastEvents.map((entry, index) =>
        index === 0 && isGenericPastEntry(entry, locale)
          ? {
              ...entry,
              title: pastFallbackEntry.title,
              href: pastFallbackEntry.href,
              description: pastFallbackEntry.description,
              meta: pastFallbackEntry.meta,
            }
          : entry,
      )
    : [pastFallbackEntry];
  const formatsFallbackEntry = getOngoingFormats(locale)[0];
  const ongoingFormats = resolvedOngoingFormats.length
    ? resolvedOngoingFormats.map((entry, index) =>
        index === 0 && isGenericFormatsEntry(entry, locale)
          ? {
              ...entry,
              title: formatsFallbackEntry.title,
              href: formatsFallbackEntry.href,
              description: formatsFallbackEntry.description,
              meta: formatsFallbackEntry.meta,
            }
          : entry,
      )
    : [formatsFallbackEntry];

  return (
    <div className="editorial-fade page-flow">
      <PageJsonLd {...livePageMetadata} pageType="CollectionPage" />

      <PageIntro
        eyebrow={livePage?.eyebrow ?? "Live"}
        title={livePage?.title ?? text(locale, {
          de: "Live-Programm in Aachen",
          en: "Live programme in Aachen",
        })}
        titleLines={splitDisplayTitle(livePage?.displayTitle) ?? [
          text(locale, { de: "Live-Programm", en: "Live programme" }),
          text(locale, { de: "in Aachen", en: "in Aachen" }),
        ]}
        description={livePage?.description ?? text(locale, {
          de: "Der Live-Bereich bündelt Ausstellungen, Veranstaltungen und wiederkehrende Formate im BOA Bunker of Art und macht aktuelle sowie vergangene Programmpunkte lesbar.",
          en: "The live area brings together exhibitions, events, and recurring formats at the BOA Bunker of Art and makes current and past programme points legible.",
        })}
        note={livePage?.note}
        layout={livePage?.introLayout}
        className="layout-overview-intro"
        titleClassName="max-w-[13.6ch] md:max-w-[13.8ch] lg:max-w-[13.8ch] lg:text-[clamp(2.26rem,2.72vw,2.8rem)] xl:max-w-[14.6ch] xl:text-[clamp(2.42rem,2.88vw,2.96rem)]"
        rightClassName="layout-overview-copy-start lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow={livePage?.currentSection?.eyebrow ?? text(locale, { de: "Aktuell", en: "Current" })}
        title={livePage?.currentSection?.title ?? text(locale, {
          de: "Aktuelle Veranstaltung",
          en: "Current event",
        })}
        titleLines={splitDisplayTitle(livePage?.currentSection?.displayTitle) ?? [
          text(locale, { de: "Aktuelle", en: "Current" }),
          text(locale, { de: "Veranstaltung", en: "event" }),
        ]}
        description={livePage?.currentSection?.description ?? text(locale, {
          de: "Hier landet jeweils die aktuelle Veranstaltung, ob Ausstellung, Konzert oder ein anderes Format im Programm.",
          en: "This section highlights the current event, whether it is an exhibition, concert, or another programme format.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[15.4ch] lg:text-[clamp(1.48rem,2vw,1.92rem)] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {currentAndUpcoming.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={livePage?.archiveSection?.eyebrow ?? text(locale, { de: "Rückblick", en: "Retrospective" })}
        title={livePage?.archiveSection?.title ?? text(locale, { de: "Eventarchiv", en: "Event archive" })}
        titleLines={splitDisplayTitle(livePage?.archiveSection?.displayTitle) ?? [text(locale, { de: "Eventarchiv", en: "Event archive" })]}
        description={text(locale, {
          de: "Das Eventarchiv führt zu einer Übersicht vergangener Veranstaltungen und versammelt Rückblicke auf Ausstellungen, Konzerte und Sonderformate.",
          en: "The event archive leads to an overview of past events and gathers retrospectives on exhibitions, concerts, and special formats.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[15.4ch] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {pastEvents.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={livePage?.formatsSection?.eyebrow ?? text(locale, { de: "Laufend", en: "Ongoing" })}
        title={livePage?.formatsSection?.title ?? text(locale, { de: "Laufende Formate", en: "Ongoing formats" })}
        titleLines={splitDisplayTitle(livePage?.formatsSection?.displayTitle) ?? [
          text(locale, { de: "Laufende", en: "Ongoing" }),
          text(locale, { de: "Formate", en: "formats" }),
        ]}
        description={text(locale, {
          de: "Hier werden wiederkehrende Programmlinien wie Total Local oder die Beteiligung an der Aachener Kunstroute gebündelt.",
          en: "Recurring programme lines such as Total Local or the involvement in the Aachener Kunstroute are gathered here.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[15.4ch] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {ongoingFormats.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>
    </div>
  );
}
