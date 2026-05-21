import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Archiv für Kunst, Poster und Projekte im BOA Bunker of Art",
  description:
    "Archiv von The Base e.V. Aachen mit Kunstkatalog, Poster-Archiv und Veranstaltungsdokumentation aus dem BOA Bunker of Art.",
  path: "/archive",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getCatalogEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Zur Katalogübersicht", en: "Catalogue overview" }),
      href: "/archive/kunstkatalog",
      description: text(locale, {
        de: "Rechercheeinstieg zu Werken, Ausstellungstexten, Credits und künstlerischen Zusammenhängen.",
        en: "Research entry point for works, exhibition texts, credits, and artistic connections.",
      }),
      meta: text(locale, { de: "Katalog", en: "Catalogue" }),
    },
  ];
}

function getPosterEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Veranstaltungsarchiv", en: "Event archive" }),
      href: "/live/events",
      description: text(locale, {
        de: "Chronik der Formate, die das Programm im Bunker über einzelne Abende hinaus lesbar machen.",
        en: "Chronicle of formats that make the bunker programme readable beyond individual evenings.",
      }),
      meta: text(locale, { de: "Dokumentation", en: "Documentation" }),
    },
  ];
}

export default async function ArchivePage() {
  const locale = await getLocale();
  const catalogEntries = getCatalogEntries(locale);
  const posterEntries = getPosterEntries(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Archive"
        title={text(locale, { de: "Archiv für Kunst, Poster und Projekte", en: "Archive for art, posters, and projects" })}
        description={text(locale, {
          de: "Das Archiv erschließt Material aus Kunst, Musik und Community-Arbeit: als Katalog, visuelle Sammlung und Chronik bisheriger Projekte.",
          en: "The archive opens up material from art, music, and community work: as catalogue, visual collection, and chronology of previous projects.",
        })}
      />

      <SectionGrid
        eyebrow={text(locale, { de: "Sammlung", en: "Collection" })}
        title={text(locale, { de: "Katalog", en: "Catalogue" })}
        description={text(locale, {
          de: "Für alle, die Arbeiten, Künstler:innen, Texte und Projektkontexte gezielt wiederfinden möchten.",
          en: "For everyone who wants to find works, artists, texts, and project contexts deliberately.",
        })}
      >
        {catalogEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Projekte", en: "Projects" })}
        title={text(locale, { de: "Vergangene Events", en: "Past events" })}
        description={text(locale, {
          de: "Für Rückblicke auf Konzerte, Ausstellungen und kollaborative Formate im Bunker of Art.",
          en: "For retrospectives on concerts, exhibitions, and collaborative formats at the Bunker of Art.",
        })}
      >
        {posterEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
