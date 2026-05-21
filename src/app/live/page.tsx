import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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
      title: text(locale, { de: "Zur aktuellen Ausstellung", en: "Current exhibition details" }),
      href: "/live/aktuelle-ausstellung",
      description: text(locale, {
        de: "Informationen zur laufenden oder nächsten Ausstellung: Termin, Beteiligte und Kontext im BOA Bunker of Art.",
        en: "Information on the current or next exhibition: dates, contributors, and context at the BOA Bunker of Art.",
      }),
      meta: text(locale, { de: "Ausstellung", en: "Exhibition" }),
    },
  ];
}

function getPastEvents(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Vergangene Konzerte und Events", en: "Past concerts and events" }),
      href: "/live/events",
      description: text(locale, {
        de: "Kuratierte Rückschau auf Konzerte, Shows, Ausstellungen und weitere Live-Formate der Base in Aachen.",
        en: "Curated retrospective of concerts, shows, exhibitions, and other live formats by The Base in Aachen.",
      }),
      meta: text(locale, { de: "Archiv", en: "Archive" }),
    },
  ];
}

function getWorkshops(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Aktuelle Workshops", en: "Current workshops" }),
      href: "/live/workshops",
      description: text(locale, {
        de: "Workshops zu Kunst, Musik, DJ-Kultur, Publishing und gemeinsamer Praxis.",
        en: "Workshops on art, music, DJ culture, publishing, and shared practice.",
      }),
      meta: text(locale, { de: "Praxis", en: "Practice" }),
    },
  ];
}

export default async function LivePage() {
  const locale = await getLocale();
  const currentAndUpcoming = getCurrentAndUpcoming(locale);
  const pastEvents = getPastEvents(locale);
  const workshops = getWorkshops(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Live"
        title={text(locale, {
          de: "Live-Programm in Aachen",
          en: "Live programme in Aachen",
        })}
        description={text(locale, {
          de: "Hier stehen aktuelle Ausstellungen, Konzerte, Workshops und offene Formate von The Base e.V. im BOA Bunker of Art im Überblick.",
          en: "This page brings together current exhibitions, concerts, workshops, and open formats by The Base e.V. at the BOA Bunker of Art.",
        })}
      />

      <SectionGrid
        eyebrow={text(locale, { de: "Aktuell", en: "Current" })}
        title={text(locale, {
          de: "Ausstellung",
          en: "Exhibition",
        })}
        description={text(locale, {
          de: "Aktuelle künstlerische Positionen, Termine und Kontext im BOA Bunker of Art.",
          en: "Current artistic positions, dates, and context at the BOA Bunker of Art.",
        })}
      >
        {currentAndUpcoming.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Rückblick", en: "Retrospective" })}
        title={text(locale, { de: "Eventarchiv", en: "Event archive" })}
        description={text(locale, {
          de: "Rückblicke auf vergangene Konzertabende, Ausstellungen und weitere öffentliche Formate der Base.",
          en: "Retrospectives on past concert nights, exhibitions, and other public formats by The Base.",
        })}
      >
        {pastEvents.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Praxis", en: "Practice" })}
        title={text(locale, { de: "Workshops und Praxis", en: "Workshops and practice" })}
        description={text(locale, {
          de: "Offene Formate zum Lernen, Austauschen und gemeinsamen Arbeiten.",
          en: "Open formats for learning, exchange, and shared practice.",
        })}
      >
        {workshops.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
