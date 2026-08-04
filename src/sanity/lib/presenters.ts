import { text } from "@/lib/i18n-shared";
import type { Locale } from "@/lib/i18n-shared";
import type { SanityArchiveEntryPreview, SanityEventPreview, SanityProgrammeSeriesPreview } from "@/sanity/types";

function formatDate(locale: Locale, value: string): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "2-digit",
    month: locale === "de" ? "2-digit" : "long",
    year: "numeric",
  }).format(new Date(value));
}

function getEventKindLabel(locale: Locale, kind?: SanityEventPreview["eventType"]): string {
  switch (kind) {
    case "exhibition":
      return text(locale, { de: "Ausstellung", en: "Exhibition" });
    case "concert":
      return text(locale, { de: "Konzert", en: "Concert" });
    case "workshop":
      return text(locale, { de: "Workshop", en: "Workshop" });
    case "release-show":
      return text(locale, { de: "Release-Show", en: "Release show" });
    default:
      return text(locale, { de: "Event", en: "Event" });
  }
}

function getArchiveTypeLabel(locale: Locale, typeLabel?: SanityArchiveEntryPreview["archiveType"]): string {
  switch (typeLabel) {
    case "catalogue":
      return text(locale, { de: "Katalog", en: "Catalogue" });
    case "documentation":
      return text(locale, { de: "Dokumentation", en: "Documentation" });
    case "poster":
      return text(locale, { de: "Poster", en: "Poster" });
    default:
      return text(locale, { de: "Archiv", en: "Archive" });
  }
}

export function formatEventMeta(locale: Locale, event: SanityEventPreview): string {
  const kind = getEventKindLabel(locale, event.eventType);

  if (event.startDate && event.endDate) {
    return `${formatDate(locale, event.startDate)} – ${formatDate(locale, event.endDate)}  •  ${kind}`;
  }

  if (event.startDate) {
    return `${formatDate(locale, event.startDate)}  •  ${kind}`;
  }

  return kind;
}

export function formatSeriesMeta(locale: Locale, format: SanityProgrammeSeriesPreview): string {
  return format.status === "active"
    ? text(locale, { de: "Laufendes Format", en: "Ongoing format" })
    : text(locale, { de: "Format", en: "Format" });
}

export function formatArchiveMeta(locale: Locale, item: SanityArchiveEntryPreview): string {
  const label = getArchiveTypeLabel(locale, item.archiveType);

  if (item.date) {
    return `${formatDate(locale, item.date)}  •  ${label}`;
  }

  return label;
}
