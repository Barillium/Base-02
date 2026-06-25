import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { withInstagramFallbackForEventPreview } from "@/sanity/lib/eventInstagramFallbacks";
import { LIVE_CURRENT_EVENT_QUERY } from "@/sanity/lib/queries";
import { formatEventMeta } from "@/sanity/lib/presenters";
import type { SanityEventPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Aktuelle Veranstaltung im BOA Bunker of Art Aachen",
  description:
    "Aktuelle Veranstaltung von The Base e.V. in Aachen mit Termin, Kontext und Beteiligten im BOA Bunker of Art.",
  path: "/live/aktuelle-ausstellung",
});

const THE_BASE_INSTAGRAM_URL = "https://www.instagram.com/the.base.ev/";

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  external?: true;
  ctaLabel: string;
};

async function getResolvedEntries(locale: Locale): Promise<Entry[]> {
  const currentEvent = await maybeSanityFetch<SanityEventPreview>({
    query: LIVE_CURRENT_EVENT_QUERY,
    params: { locale },
    tags: ["event", "live", "current-event"],
    revalidate: 300,
  });

  if (!currentEvent) {
    return [
      {
        title: text(locale, { de: "Aktuelle Veranstaltung", en: "Current event" }),
        href: THE_BASE_INSTAGRAM_URL,
        description: text(locale, {
          de: "Die aktuelle Veranstaltung wird über Instagram veröffentlicht und laufend aktualisiert.",
          en: "The current event is published and updated via Instagram.",
        }),
        meta: text(locale, { de: "Instagram", en: "Instagram" }),
        external: true,
        ctaLabel: text(locale, { de: "Zur Veranstaltung", en: "Open event" }),
      },
    ];
  }

  const resolvedEvent = withInstagramFallbackForEventPreview(locale, currentEvent);

  return [
    {
      title: resolvedEvent.title,
      href: resolvedEvent.externalUrl || THE_BASE_INSTAGRAM_URL,
      description: resolvedEvent.summary,
      meta: formatEventMeta(locale, resolvedEvent),
      external: true,
      ctaLabel: text(locale, { de: "Zur Veranstaltung", en: "Open event" }),
    },
  ];
}

export default async function AktuelleAusstellungPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);
  const note = entries.length
    ? {
        de: "Der aktuelle Eintrag bündelt Titel, Zeitraum und Kurzbeschreibung an einem Ort und führt direkt zur Instagram-Veröffentlichung der Veranstaltung.",
        en: "The current entry brings title, date range, and summary together in one place and leads directly to the event's Instagram publication.",
      }
    : {
        de: "Solange noch kein aktueller Eintrag veröffentlicht ist, bleibt diese Seite bewusst reduziert.",
        en: "As long as no current entry has been published yet, this page intentionally stays reduced.",
      };

  return (
    <SimplePage
      eyebrow="Live"
      title={{
        de: "Aktuelle Veranstaltung",
        en: "Current event",
      }}
      introClassName="layout-live-intro"
      description={{
        de: "Diese Seite bündelt die jeweils aktuelle Veranstaltung mit Titel, Zeitraum, Kontext und weiterführendem Link.",
        en: "This page brings together the current event with title, date range, context, and supporting link.",
      }}
      note={note}
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Event", en: "Event" })}
        title={text(locale, { de: "Eintrag", en: "Entry" })}
        description={text(locale, {
          de: "Sobald ein aktueller Eintrag veröffentlicht ist, erscheint er hier mit Kurzbeschreibung und weiterführendem Verweis.",
          en: "As soon as a current entry is published, it will appear here with summary and supporting reference.",
        })}
        className="layout-live-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[10ch]"
        contentClassName="lg:pt-3"
      >
        {entries.length ? (
          entries.map((entry) => <Card key={entry.href} locale={locale} {...entry} />)
        ) : (
          <div className="border border-[var(--line)]/70 px-4 py-4 text-[var(--muted)] md:px-5">
            <p className="type-meta">{text(locale, { de: "Noch kein Eintrag", en: "No entry yet" })}</p>
            <p className="type-body mt-2">
              {text(locale, {
                de: "Die aktuelle Veranstaltung wird hier sichtbar, sobald ein entsprechender Eintrag veröffentlicht ist.",
                en: "The current event will appear here once a matching entry has been published.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
