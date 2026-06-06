import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { formatEventMeta } from "@/sanity/lib/presenters";
import { LIVE_CURRENT_EVENT_QUERY } from "@/sanity/lib/queries";
import type { SanityEventPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Live-Programm in Aachen: Ausstellungen, Konzerte und Workshops",
  description:
    "Das Live-Programm von The Base e.V. in Aachen bündelt Ausstellungen, Konzerte, Workshops und weitere Termine im BOA Bunker of Art.",
  path: "/live",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getCurrentAndUpcoming(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Aktuelle Veranstaltung", en: "Current event" }),
      href: "/live/aktuelle-ausstellung",
      description: text(locale, {
        de: "Hier steht jeweils die aktuelle Veranstaltung, egal ob Ausstellung, Konzert oder ein anderes Format.",
        en: "The current event appears here, whether it is an exhibition, concert, or another format.",
      }),
      meta: text(locale, { de: "Aktuell", en: "Current" }),
    },
  ];
}

function getPastEvents(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Übersicht vergangener Veranstaltungen", en: "Past events overview" }),
      href: "/live/events",
      description: text(locale, {
        de: "Hier liegen Rueckblicke auf vergangene Veranstaltungen wie Total Local, 10 Jahre The Base oder Release-Shows im Umfeld des BOA.",
        en: "This section gathers past events such as Total Local, 10 years of The Base, or release shows around the BOA.",
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
        de: "Die Übersicht bündelt wiederkehrende Reihen wie Total Local und die Beteiligung an der Aachener Kunstroute.",
        en: "This overview gathers recurring strands such as Total Local and the contribution to the Aachener Kunstroute.",
      }),
      meta: text(locale, { de: "Übersicht", en: "Overview" }),
    },
  ];
}

async function getResolvedCurrentAndUpcoming(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getCurrentAndUpcoming(locale);
  const currentEvent = await maybeSanityFetch<SanityEventPreview>({
    query: LIVE_CURRENT_EVENT_QUERY,
    tags: ["event", "live"],
    revalidate: 300,
  });

  if (!currentEvent) {
    return fallbackEntries;
  }

  return [
    {
      title: currentEvent.title,
      href: "/live/aktuelle-ausstellung",
      description: currentEvent.summary,
      meta: formatEventMeta(locale, currentEvent),
    },
  ];
}

export default async function LivePage() {
  const locale = await getLocale();
  const currentAndUpcoming = await getResolvedCurrentAndUpcoming(locale);
  const pastEvents = getPastEvents(locale);
  const ongoingFormats = getOngoingFormats(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Live"
        title={text(locale, {
          de: "Live-Programm in Aachen",
          en: "Live programme in Aachen",
        })}
        titleLines={[
          text(locale, { de: "Live-Programm", en: "Live programme" }),
          text(locale, { de: "in Aachen", en: "in Aachen" }),
        ]}
        description={text(locale, {
          de: "Der Live-Bereich wird als strukturierte redaktionelle Oberfläche für Ausstellungen, Veranstaltungen und wiederkehrende Formate vorbereitet. Einzelne Inhalte sollen künftig aus Sanity gepflegt werden statt fest im Code zu stehen.",
          en: "The live area is being prepared as a structured editorial surface for exhibitions, events, and recurring formats. Individual content will be maintained from Sanity instead of being fixed in code.",
        })}
        className="layout-editorial-intro"
        titleClassName="max-w-[13.6ch] md:max-w-[13.8ch] lg:max-w-[13.8ch] lg:text-[clamp(2.48rem,3vw,3.04rem)] xl:max-w-[14.6ch] xl:text-[clamp(2.7rem,3.2vw,3.28rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow={text(locale, { de: "Aktuell", en: "Current" })}
        title={text(locale, {
          de: "Aktuelle Veranstaltung",
          en: "Current event",
        })}
        titleLines={[
          text(locale, { de: "Aktuelle", en: "Current" }),
          text(locale, { de: "Veranstaltung", en: "event" }),
        ]}
        description={text(locale, {
          de: "Hier landet jeweils die aktuelle Veranstaltung, ob Ausstellung, Konzert oder ein anderes Format im Programm.",
          en: "This section highlights the current event, whether it is an exhibition, concert, or another programme format.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[15.4ch] lg:text-[clamp(1.48rem,2vw,1.92rem)] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {currentAndUpcoming.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Rückblick", en: "Retrospective" })}
        title={text(locale, { de: "Eventarchiv", en: "Event archive" })}
        titleLines={[text(locale, { de: "Eventarchiv", en: "Event archive" })]}
        description={text(locale, {
          de: "Das Eventarchiv führt zu einer Übersicht vergangener Veranstaltungen und versammelt Rückblicke auf Ausstellungen, Konzerte und Sonderformate.",
          en: "The event archive leads to an overview of past events and gathers retrospectives on exhibitions, concerts, and special formats.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[15.4ch] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {pastEvents.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Laufend", en: "Ongoing" })}
        title={text(locale, { de: "Laufende Formate", en: "Ongoing formats" })}
        titleLines={[
          text(locale, { de: "Laufende", en: "Ongoing" }),
          text(locale, { de: "Formate", en: "formats" }),
        ]}
        description={text(locale, {
          de: "Hier werden wiederkehrende Programmlinien wie Total Local oder die Beteiligung an der Aachener Kunstroute gebündelt.",
          en: "Recurring programme lines such as Total Local or the involvement in the Aachener Kunstroute are gathered here.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[15.4ch] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {ongoingFormats.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
