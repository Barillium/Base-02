import { text } from "@/lib/i18n-shared";
import type { Locale } from "@/lib/i18n-shared";
import type { SanityArchiveItemPreview, SanityEventPreview, SanityFormatPreview } from "@/sanity/types";

function formatDate(locale: Locale, value: string): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "2-digit",
    month: locale === "de" ? "2-digit" : "long",
    year: "numeric",
  }).format(new Date(value));
}

function getEventKindLabel(locale: Locale, kind?: SanityEventPreview["kind"]): string {
  switch (kind) {
    case "exhibition":
      return text(locale, { de: "Ausstellung", en: "Exhibition" });
    case "concert":
      return text(locale, { de: "Konzert", en: "Concert" });
    case "club-night":
      return text(locale, { de: "Veranstaltung", en: "Event" });
    case "workshop":
      return text(locale, { de: "Workshop", en: "Workshop" });
    case "release-show":
      return text(locale, { de: "Release-Show", en: "Release show" });
    default:
      return text(locale, { de: "Event", en: "Event" });
  }
}

function getArchiveTypeLabel(locale: Locale, typeLabel?: SanityArchiveItemPreview["typeLabel"]): string {
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
  const kind = getEventKindLabel(locale, event.kind);

  if (event.dateStart && event.dateEnd) {
    return `${formatDate(locale, event.dateStart)} – ${formatDate(locale, event.dateEnd)}  •  ${kind}`;
  }

  if (event.dateStart) {
    return `${formatDate(locale, event.dateStart)}  •  ${kind}`;
  }

  return kind;
}

export function formatFormatMeta(locale: Locale, format: SanityFormatPreview): string {
  return format.status === "active"
    ? text(locale, { de: "Laufendes Format", en: "Ongoing format" })
    : text(locale, { de: "Format", en: "Format" });
}

export function formatArchiveMeta(locale: Locale, item: SanityArchiveItemPreview): string {
  const label = getArchiveTypeLabel(locale, item.typeLabel);

  if (item.date) {
    return `${formatDate(locale, item.date)}  •  ${label}`;
  }

  return label;
}
