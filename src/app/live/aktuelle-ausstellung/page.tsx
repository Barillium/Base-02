import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { LIVE_CURRENT_EVENT_QUERY } from "@/sanity/lib/queries";
import { formatEventMeta } from "@/sanity/lib/presenters";
import type { SanityEventPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Aktuelle Veranstaltung im BOA Bunker of Art Aachen",
  description:
    "Aktuelle Veranstaltung von The Base e.V. in Aachen mit Termin, Kontext und Beteiligten im BOA Bunker of Art.",
  path: "/live/aktuelle-ausstellung",
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
  const currentEvent = await maybeSanityFetch<SanityEventPreview>({
    query: LIVE_CURRENT_EVENT_QUERY,
    tags: ["event", "live", "current-event"],
    revalidate: 300,
  });

  if (!currentEvent?.externalUrl) {
    return [];
  }

  return [
    {
      title: currentEvent.title,
      href: currentEvent.externalUrl,
      description: currentEvent.summary,
      meta: formatEventMeta(locale, currentEvent),
      external: true,
      ctaLabel: text(locale, { de: "Mehr dazu", en: "Learn more" }),
    },
  ];
}

export default async function AktuelleAusstellungPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);
  const note = entries.length
    ? {
        de: "Der aktuelle Eintrag verweist auf die externe Ankündigung. Titel, Zeitraum und Kurzbeschreibung werden aus Sanity gezogen.",
        en: "The current entry points to the external announcement. Title, date range, and summary are pulled from Sanity.",
      }
    : {
        de: "Solange im CMS noch kein aktueller Eintrag angelegt ist, bleibt diese Seite bewusst reduziert und zeigt nur ihre strukturelle Rolle.",
        en: "As long as no current entry exists in the CMS yet, this page intentionally stays reduced and only shows its structural role.",
      };

  return (
    <SimplePage
      eyebrow="Live"
      title={{
        de: "Aktuelle Veranstaltung",
        en: "Current event",
      }}
      description={{
        de: "Diese Seite ist für die jeweils aktuelle Veranstaltung vorbereitet. Titel, Termine, Kontext und weiterführende Links werden hier aus Sanity gepflegt.",
        en: "This page is prepared for the current event. Title, dates, context, and supporting links are maintained here from Sanity.",
      }}
      note={note}
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Event", en: "Event" })}
        title={text(locale, { de: "Eintrag", en: "Entry" })}
        description={text(locale, {
          de: "Sobald ein Eintrag im CMS angelegt ist, erscheint er hier als strukturierter Datensatz statt als fest eingetragener Seiteninhalt.",
          en: "Once an entry exists in the CMS, it will appear here as a structured dataset instead of fixed page content.",
        })}
        className="layout-editorial-section"
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
                de: "Die aktuelle Veranstaltung kann hier eingepflegt werden, sobald in Sanity ein entsprechendes `event`-Dokument mit Status und Verlinkung angelegt ist.",
                en: "The current event can be added here once a matching `event` document with status and link has been created in Sanity.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
