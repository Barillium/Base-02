import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { ARCHIVE_CATALOGUE_QUERY, ARCHIVE_POSTER_QUERY } from "@/sanity/lib/queries";
import type { SanityArchiveItemPreview } from "@/sanity/types";

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
      title: text(locale, { de: "Kunstkatalog", en: "Art catalogue" }),
      href: "/archive/kunstkatalog",
      description: text(locale, {
        de: "Arbeiten, Texte, Credits und Materialien, die einzelne Projekte in ihrem Zusammenhang lesbar machen.",
        en: "Works, texts, credits, and materials that make individual projects legible in their context.",
      }),
      meta: text(locale, { de: "Katalog", en: "Catalogue" }),
    },
  ];
}

function getPosterEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Posterarchiv", en: "Poster archive" }),
      href: "/archive/poster",
      description: text(locale, {
        de: "Grafische Spuren, Ankuendigungen und visuelle Arbeiten aus dem Umfeld der Base.",
        en: "Graphic traces, announcements, and visual works from the context of The Base.",
      }),
      meta: text(locale, { de: "Poster", en: "Poster" }),
    },
  ];
}

async function getResolvedCatalogEntries(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getCatalogEntries(locale);
  const catalogueItem = await maybeSanityFetch<SanityArchiveItemPreview>({
    query: ARCHIVE_CATALOGUE_QUERY,
    tags: ["archiveItem", "archive"],
    revalidate: 300,
  });

  if (!catalogueItem) {
    return fallbackEntries;
  }

  return [
    {
      title: catalogueItem.title,
      href: "/archive/kunstkatalog",
      description: catalogueItem.summary,
      meta: text(locale, { de: "Katalog", en: "Catalogue" }),
    },
  ];
}

async function getResolvedPosterEntries(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getPosterEntries(locale);
  const posterItem = await maybeSanityFetch<SanityArchiveItemPreview>({
    query: ARCHIVE_POSTER_QUERY,
    tags: ["archiveItem", "archive"],
    revalidate: 300,
  });

  if (!posterItem) {
    return fallbackEntries;
  }

  return [
    {
      title: posterItem.title,
      href: "/archive/poster",
      description: posterItem.summary,
      meta: text(locale, { de: "Poster", en: "Poster" }),
    },
  ];
}

export default async function ArchivePage() {
  const locale = await getLocale();
  const [catalogEntries, posterEntries] = await Promise.all([
    getResolvedCatalogEntries(locale),
    getResolvedPosterEntries(locale),
  ]);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Archive"
        title={text(locale, { de: "Archiv für Kunst, Poster und Projekte", en: "Archive for art, posters, and projects" })}
        titleLines={[
          text(locale, { de: "Archiv für Kunst,", en: "Archive for art," }),
          text(locale, { de: "Poster und", en: "posters and" }),
          text(locale, { de: "Projekte", en: "projects" }),
        ]}
        description={text(locale, {
          de: "Das Archiv versammelt Arbeiten, Spuren, Dokumentation und Rueckblicke aus Ausstellungen, Open Calls und anderen oeffentlichen Zusammenhaengen der Base.",
          en: "The archive gathers works, traces, documentation, and retrospectives from exhibitions, open calls, and other public contexts of The Base.",
        })}
        className="layout-editorial-intro"
        titleClassName="lg:max-w-[10.6ch] lg:text-[clamp(2.62rem,3.38vw,3.3rem)] xl:max-w-[11.5ch] xl:text-[clamp(2.88rem,3.58vw,3.6rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow={text(locale, { de: "Sammlung", en: "Collection" })}
        title={text(locale, { de: "Katalog", en: "Catalogue" })}
        description={text(locale, {
          de: "Arbeiten, Texte, Credits und Kontexte, die den Weg einzelner Projekte lesbar machen.",
          en: "Works, texts, credits, and contexts that make the path of individual projects legible.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.1ch] xl:max-w-[9.8ch]"
        contentClassName="lg:pt-3"
      >
        {catalogEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Projekte", en: "Projects" })}
        title={text(locale, { de: "Poster", en: "Posters" })}
        description={text(locale, {
          de: "Grafische Spuren, Ankuendigungen und visuelle Arbeiten aus dem Umfeld der Veranstaltungen und Ausstellungen.",
          en: "Graphic traces, announcements, and visual works from the context of events and exhibitions.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.1ch] xl:max-w-[9.8ch]"
        contentClassName="lg:pt-3"
      >
        {posterEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
