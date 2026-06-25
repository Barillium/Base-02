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
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { ARCHIVE_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityArchivePage, SanityTeaserCard } from "@/sanity/types";

const archivePageMetadata = {
  title: "Archiv für Kunst, Poster und Projekte im BOA Bunker of Art",
  description:
    "Archiv von The Base e.V. Aachen mit Kunstkatalog, Poster-Archiv und Veranstaltungsdokumentation aus dem BOA Bunker of Art.",
  path: "/archive",
} as const;

export const metadata = pageMetadata(archivePageMetadata);

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
        de: "Grafische Spuren, Ankündigungen und visuelle Arbeiten aus dem Umfeld der Base.",
        en: "Graphic traces, announcements, and visual works from the context of The Base.",
      }),
      meta: text(locale, { de: "Poster", en: "Poster" }),
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
  };
}

function isEntry(entry: Entry | null): entry is Entry {
  return entry !== null;
}

export default async function ArchivePage() {
  const locale = await getLocale();
  const archivePage = await maybeSanityFetch<SanityArchivePage>({
    query: ARCHIVE_PAGE_QUERY,
    params: { locale },
    tags: ["archivePage", "archive"],
    revalidate: 300,
  });
  const catalogEntries =
    archivePage?.catalogueSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? getCatalogEntries(locale);
  const posterEntries =
    archivePage?.posterSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? getPosterEntries(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageJsonLd {...archivePageMetadata} pageType="CollectionPage" />

      <PageIntro
        eyebrow={archivePage?.eyebrow ?? "Archive"}
        title={archivePage?.title ?? text(locale, { de: "Archiv für Kunst, Poster und Projekte", en: "Archive for art, posters, and projects" })}
        titleLines={splitDisplayTitle(archivePage?.displayTitle) ?? [
          text(locale, { de: "Archiv für Kunst,", en: "Archive for art," }),
          text(locale, { de: "Poster und", en: "posters and" }),
          text(locale, { de: "Projekte", en: "projects" }),
        ]}
        description={archivePage?.description ?? text(locale, {
          de: "Das Archiv versammelt Arbeiten, Spuren, Dokumentation und Rückblicke aus Ausstellungen, Open Calls und anderen öffentlichen Zusammenhängen der Base.",
          en: "The archive gathers works, traces, documentation, and retrospectives from exhibitions, open calls, and other public contexts of The Base.",
        })}
        note={archivePage?.note}
        layout={archivePage?.introLayout}
        className="layout-overview-intro"
        titleClassName="lg:max-w-[10.6ch] lg:text-[clamp(2.36rem,3vw,2.94rem)] xl:max-w-[11.5ch] xl:text-[clamp(2.56rem,3.18vw,3.2rem)]"
        rightClassName="layout-overview-copy-start lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow={archivePage?.catalogueSection?.eyebrow ?? text(locale, { de: "Sammlung", en: "Collection" })}
        title={archivePage?.catalogueSection?.title ?? text(locale, { de: "Katalog", en: "Catalogue" })}
        titleLines={splitDisplayTitle(archivePage?.catalogueSection?.displayTitle)}
        description={archivePage?.catalogueSection?.description ?? text(locale, {
          de: "Arbeiten, Texte, Credits und Kontexte, die den Weg einzelner Projekte lesbar machen.",
          en: "Works, texts, credits, and contexts that make the path of individual projects legible.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[9.1ch] xl:max-w-[9.8ch]"
        contentClassName="lg:pt-3"
      >
        {catalogEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={archivePage?.posterSection?.eyebrow ?? text(locale, { de: "Projekte", en: "Projects" })}
        title={archivePage?.posterSection?.title ?? text(locale, { de: "Poster", en: "Posters" })}
        titleLines={splitDisplayTitle(archivePage?.posterSection?.displayTitle)}
        description={archivePage?.posterSection?.description ?? text(locale, {
          de: "Grafische Spuren, Ankündigungen und visuelle Arbeiten aus dem Umfeld der Veranstaltungen und Ausstellungen.",
          en: "Graphic traces, announcements, and visual works from the context of events and exhibitions.",
        })}
        className="layout-overview-section"
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
