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
import { MEDIA_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityMediaPage, SanityTeaserCard } from "@/sanity/types";

const mediaPageMetadata = {
  title: "Media bei The Base e.V.: Foto, Video und Mitschnitte",
  description:
    "Media bei The Base e.V.: Foto, Video, Mitschnitte und Anfragen rund um dokumentarische Produktionen im BOA Bunker of Art.",
  path: "/media",
} as const;

export const metadata = pageMetadata(mediaPageMetadata);

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  ctaLabel?: string;
};

function getProductionEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Medienproduktion buchen", en: "Book media production" }),
      href: "/media/buchung",
      description: text(locale, {
        de: "Informationen für Anfragen rund um Foto, Video, Mitschnitt und dokumentarische Formate im Zusammenhang mit dem Ort und seinem Programm.",
        en: "Information for enquiries around photo, video, recording, and documentary formats connected to the site and its programme.",
      }),
      meta: text(locale, { de: "Anfrage", en: "Enquiry" }),
    },
    {
      title: text(locale, { de: "Externe Medienprojekte", en: "External media projects" }),
      href: "/media/produktionen",
      description: text(locale, {
        de: "Filme, Sessions und dokumentarische Beiträge externer Teams, die im BOA gedreht wurden oder den Ort als Produktionskontext nutzen.",
        en: "Films, sessions, and documentary works by external teams that were shot at BOA or use the site as a production context.",
      }),
      meta: text(locale, { de: "Projekte", en: "Projects" }),
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
    ctaLabel: card.ctaLabel,
  };
}

function isEntry(entry: Entry | null): entry is Entry {
  return entry !== null;
}

export default async function MediaPage() {
  const locale = await getLocale();
  const mediaPage = await maybeSanityFetch<SanityMediaPage>({
    query: MEDIA_PAGE_QUERY,
    params: { locale },
    tags: ["mediaPage", "media"],
    revalidate: 300,
  });
  const productionEntries =
    mediaPage?.mainSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? getProductionEntries(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageJsonLd {...mediaPageMetadata} pageType="CollectionPage" />

      <PageIntro
        eyebrow={mediaPage?.eyebrow ?? "Media"}
        title={mediaPage?.title ?? text(locale, { de: "Medienproduktion im Bunker of Art", en: "Media production at the Bunker of Art" })}
        titleLines={splitDisplayTitle(mediaPage?.displayTitle) ?? [
          text(locale, { de: "Medienproduktion", en: "Media production" }),
          text(locale, { de: "im Bunker", en: "at the Bunker" }),
          text(locale, { de: "of Art", en: "of Art" }),
        ]}
        description={mediaPage?.description ?? text(locale, {
          de: "Klang, Raum, Zusammenarbeit und Dokumentation: Media bündelt die Arbeiten, die im BOA zwischen Fotografie, Grafik, Mitschnitt und Bewegtbild entstehen.",
          en: "Sound, space, collaboration, and documentation: Media gathers the works that emerge at the BOA between photography, graphics, recordings, and moving image.",
        })}
        note={mediaPage?.note ?? text(locale, {
          de: "Sichtbar werden diese Arbeiten vor allem dort, wo sie das laufende Programm begleiten, dokumentieren oder nach außen lesbar machen.",
          en: "These works become visible above all where they accompany, document, or make the ongoing programme legible outwardly.",
        })}
        layout={mediaPage?.introLayout}
        className="layout-overview-intro"
        titleClassName="media-overview-hero max-w-none text-[clamp(1.6rem,4.95vw,1.98rem)] md:max-w-[12.8ch] md:text-[clamp(1.8rem,4.08vw,2.22rem)] lg:max-w-[14.8ch] lg:text-[clamp(2rem,2.34vw,2.48rem)] xl:max-w-[15.4ch] xl:text-[clamp(2.16rem,2.54vw,2.64rem)]"
        rightClassName="layout-overview-copy-start lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow={mediaPage?.mainSection?.eyebrow ?? "Media"}
        title={mediaPage?.mainSection?.title ?? text(locale, { de: "Raum, Klang und Bild", en: "Space, sound, and image" })}
        titleLines={splitDisplayTitle(mediaPage?.mainSection?.displayTitle) ?? [
          text(locale, { de: "Raum, Klang", en: "Space, sound" }),
          text(locale, { de: "und Bild", en: "and image" }),
        ]}
        description={mediaPage?.mainSection?.description ?? text(locale, {
          de: "Ein Einstieg in den Ort als Produktionszusammenhang und in die Arbeiten, die dort bereits sichtbar geworden sind.",
          en: "An entry point into the space as a site of production and into the works that have already become visible there.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[9.8ch]"
        contentClassName="lg:pt-3"
      >
        {productionEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>
    </div>
  );
}
