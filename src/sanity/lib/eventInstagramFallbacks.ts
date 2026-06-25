import type { Locale } from "@/lib/i18n-shared";
import type { SanityEventDetail, SanityEventPreview } from "@/sanity/types";

type LocalizedValue = {
  de: string;
  en: string;
};

type EventInstagramFallback = {
  externalUrl: string;
  slug?: string;
  title: LocalizedValue;
  summary: LocalizedValue;
  eventType?: SanityEventPreview["eventType"];
  venue?: string;
  startDate?: string;
  endDate?: string;
};

const INSTAGRAM_EVENT_FALLBACKS: EventInstagramFallback[] = [
  {
    externalUrl: "https://www.instagram.com/the.base.ev/p/DYcFhaxtS8G/",
    slug: "the-roots-of-all-that-exists-2026",
    title: {
      de: "The Roots of All That Exists",
      en: "The Roots of All That Exists",
    },
    summary: {
      de: "Mehrtägige Ausstellung im BOA Bunker of Art mit Vernissage, Live-Acts und unterschiedlichen künstlerischen Positionen vom 29. bis 31. Mai 2026.",
      en: "Multi-day exhibition at the BOA Bunker of Art with vernissage, live acts, and different artistic positions from 29 to 31 May 2026.",
    },
    eventType: "exhibition",
    venue: "Bunker of Art, Scheibenstraße 34, 52070 Aachen",
    startDate: "2026-05-29T18:00:00.000Z",
    endDate: "2026-05-31T20:00:00.000Z",
  },
  {
    externalUrl: "https://www.instagram.com/the.base.ev/p/DXe58xqjcgO/",
    slug: "total-local-2026",
    title: {
      de: "Total Local",
      en: "Total Local",
    },
    summary: {
      de: "Ausstellung mit 18 Künstler:innen aus dem direkten Umfeld von The Base, geprägt von Austausch, Vertrauen und gemeinsamer Praxis im BOA.",
      en: "Exhibition with 18 artists from The Base's immediate surroundings, shaped by exchange, trust, and shared practice at the BOA.",
    },
    eventType: "exhibition",
    venue: "Bunker of Art, Aachen",
    startDate: "2026-05-02T18:00:00.000Z",
    endDate: "2026-05-05T21:00:00.000Z",
  },
  {
    externalUrl: "https://www.instagram.com/the.base.ev/p/DXFJJbajTgY/",
    slug: "the-base-open-ground-2026",
    title: {
      de: "The Base @ Open Ground",
      en: "The Base @ Open Ground",
    },
    summary: {
      de: "Gastspiel von The Base im Open Ground am 23. April 2026.",
      en: "Guest appearance by The Base at Open Ground on 23 April 2026.",
    },
    eventType: "concert",
    venue: "Open Ground",
    startDate: "2026-04-23T00:00:00.000Z",
  },
  {
    externalUrl: "https://www.instagram.com/the.base.ev/p/DVxon7TDVeS/",
    slug: "the-base-kreisstrich-az-aachen-2026",
    title: {
      de: "The Base x Kreisstrich im AZ Aachen",
      en: "The Base x Kreisstrich at AZ Aachen",
    },
    summary: {
      de: "Clubnacht im Autonomen Zentrum Aachen mit mehreren b2b-Sets von The Base und Kreisstrich am 21. März um 23 Uhr.",
      en: "Club night at the Autonomes Zentrum Aachen with several b2b sets by The Base and Kreisstrich on 21 March at 23:00.",
    },
    eventType: "concert",
    venue: "Autonomes Zentrum Aachen",
    startDate: "2026-03-21T23:00:00.000Z",
  },
  {
    externalUrl: "https://www.instagram.com/p/DR2wOqtDR8h/",
    slug: "10-years-the-base-2025",
    title: {
      de: "10 Years The Base",
      en: "10 Years The Base",
    },
    summary: {
      de: "Zum zehnjährigen Bestehen bündelt The Base ein zweitägiges Programm aus Ausstellung, Live-Konzerten und Klubnacht.",
      en: "For its tenth anniversary, The Base brings together a two-day programme of exhibition, live concerts, and Klubnacht.",
    },
    eventType: "other",
  },
  {
    externalUrl: "https://www.instagram.com/p/DRZD7eNjcom/",
    slug: "rrade-rhythmic-resonance-2025",
    title: {
      de: "RRADE x The Base – Rhythmic Resonance",
      en: "RRADE x The Base – Rhythmic Resonance",
    },
    summary: {
      de: "Releaseshow zur EP \"Rhythmic Resonance\" von RRADE mit Premiere von EP, Vinyl und Musikvideo, Live-Performance und Aftershow.",
      en: "Release show for RRADE's EP \"Rhythmic Resonance\" with EP, vinyl, and music video premiere, live performance, and aftershow.",
    },
    eventType: "release-show",
    startDate: "2025-11-29T00:00:00.000Z",
  },
];

function normalizeUrl(value?: string) {
  return value?.replace(/\/+$/, "").toLowerCase();
}

function getFallback(locale: Locale, event: Pick<SanityEventPreview, "slug" | "externalUrl">) {
  const bySlug = INSTAGRAM_EVENT_FALLBACKS.find((entry) => entry.slug === event.slug);

  if (bySlug) {
    return {
      title: bySlug.title[locale],
      summary: bySlug.summary[locale],
      externalUrl: bySlug.externalUrl,
      eventType: bySlug.eventType,
      venue: bySlug.venue,
      startDate: bySlug.startDate,
      endDate: bySlug.endDate,
    };
  }

  const eventUrl = normalizeUrl(event.externalUrl);
  const byUrl = INSTAGRAM_EVENT_FALLBACKS.find((entry) => normalizeUrl(entry.externalUrl) === eventUrl);

  if (!byUrl) {
    return null;
  }

  return {
    title: byUrl.title[locale],
    summary: byUrl.summary[locale],
    externalUrl: byUrl.externalUrl,
    eventType: byUrl.eventType,
    venue: byUrl.venue,
    startDate: byUrl.startDate,
    endDate: byUrl.endDate,
  };
}

function hasMeaningfulTitle(value?: string) {
  const normalized = value?.trim();
  return Boolean(normalized && normalized.toLowerCase() !== "untitled event" && normalized.toLowerCase() !== "event");
}

function hasMeaningfulSummary(value?: string) {
  return Boolean(value?.trim());
}

export function withInstagramFallbackForEventPreview(locale: Locale, event: SanityEventPreview): SanityEventPreview {
  const fallback = getFallback(locale, event);

  if (!fallback) {
    return event;
  }

  return {
    ...event,
    title: hasMeaningfulTitle(event.title) ? event.title : fallback.title,
    summary: hasMeaningfulSummary(event.summary) ? event.summary : fallback.summary,
    externalUrl: event.externalUrl || fallback.externalUrl,
    eventType: event.eventType || fallback.eventType,
    venue: event.venue || fallback.venue,
    startDate: event.startDate || fallback.startDate,
    endDate: event.endDate || fallback.endDate,
  };
}

export function withInstagramFallbackForEventDetail(locale: Locale, event: SanityEventDetail): SanityEventDetail {
  const fallback = getFallback(locale, event);

  if (!fallback) {
    return event;
  }

  return {
    ...event,
    title: hasMeaningfulTitle(event.title) ? event.title : fallback.title,
    summary: hasMeaningfulSummary(event.summary) ? event.summary : fallback.summary,
    externalUrl: event.externalUrl || fallback.externalUrl,
    eventType: event.eventType || fallback.eventType,
    venue: event.venue || fallback.venue,
    startDate: event.startDate || fallback.startDate,
    endDate: event.endDate || fallback.endDate,
  };
}
