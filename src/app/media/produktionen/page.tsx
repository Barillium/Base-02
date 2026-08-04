import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { MEDIA_PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { SanityMediaProjectPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Externe Medienprojekte im BOA Bunker of Art",
  description:
    "Externe Medienprojekte im BOA Bunker of Art: Filme, Sessions, Dokumentationen und weitere Produktionen, die im BOA entstanden oder dort gedreht wurden.",
  path: "/media/produktionen",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  image?: {
    src: string;
    alt: string;
  };
  external: true;
  ctaLabel: string;
};

function getEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Leo Kaminski - Nie im Club", en: "Leo Kaminski - Nie im Club" }),
      href: "https://www.youtube.com/watch?v=mruAhsHw8Rg",
      description: text(locale, {
        de: "Musikvideo von Leo Kaminski, das im BOA Bunker of Art gedreht wurde.",
        en: "Music video by Leo Kaminski, shot at the BOA Bunker of Art.",
      }),
      meta: text(locale, { de: "Video", en: "Video" }),
      external: true,
      ctaLabel: text(locale, { de: "Zum Video", en: "Watch video" }),
    },
  ];
}

async function getResolvedEntries(locale: Locale): Promise<Entry[]> {
  const projects = await maybeSanityFetch<SanityMediaProjectPreview[]>({
    query: MEDIA_PROJECTS_QUERY,
    params: { locale },
    tags: ["mediaProject", "media"],
    revalidate: 300,
  });

  if (!projects?.length) {
    return getEntries(locale);
  }

  const mappedEntries = projects
    .filter((project) => Boolean(project.externalUrl))
    .map((project) => {
      const imageUrl = urlForImage(project.image)?.width(480).height(600).fit("fill").url();

      return {
        title: project.title,
        href: project.externalUrl as string,
        description: project.summary,
        meta: getMediaTypeLabel(locale, project.mediaType),
        image: imageUrl
          ? {
              src: imageUrl,
              alt: project.imageAlt || project.title,
            }
          : undefined,
        external: true as const,
        ctaLabel: text(locale, { de: "Zum Beitrag", en: "View post" }),
      };
    });

  return mappedEntries.length ? mappedEntries : getEntries(locale);
}

function getMediaTypeLabel(locale: Locale, mediaType?: SanityMediaProjectPreview["mediaType"]) {
  switch (mediaType) {
    case "photo":
      return text(locale, { de: "Foto", en: "Photo" });
    case "poster":
      return text(locale, { de: "Grafik", en: "Graphic" });
    case "video":
      return text(locale, { de: "Video", en: "Video" });
    case "livestream":
      return text(locale, { de: "Livestream", en: "Livestream" });
    case "recording":
      return text(locale, { de: "Mitschnitt", en: "Recording" });
    case "documentation":
      return text(locale, { de: "Dokumentation", en: "Documentation" });
    default:
      return text(locale, { de: "Projekt", en: "Project" });
  }
}

export default async function MediaProductionsPage() {
  const locale = await getLocale();
  const entries = await getResolvedEntries(locale);

  return (
    <SimplePage
      eyebrow="Media"
      introClassName="layout-media-intro"
      title={{
        de: "Im BOA gedreht",
        en: "Shot at BOA",
      }}
      titleLines={[
        { de: "Im BOA", en: "Shot at" },
        { de: "gedreht", en: "BOA" },
      ]}
      description={{
        de: "Diese Seite versammelt Medienprojekte externer Teams, die im BOA Bunker of Art entstanden sind oder den Ort als Dreh- und Produktionskontext genutzt haben.",
        en: "This page gathers media projects by external teams that were produced at the BOA Bunker of Art or used the site as a filming and production context.",
      }}
      titleClassName="max-w-none text-[clamp(1.54rem,5vw,1.92rem)] md:max-w-none md:text-[clamp(1.8rem,4.45vw,2.24rem)] lg:max-w-[13.6ch] lg:text-[clamp(2.26rem,2.78vw,2.84rem)] xl:max-w-[14.4ch] xl:text-[clamp(2.48rem,3vw,3.04rem)]"
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Externe Projekte", en: "External projects" })}
        title={text(locale, { de: "Filme und Formate", en: "Films and formats" })}
        titleLines={[
          text(locale, { de: "Filme und", en: "Films and" }),
          text(locale, { de: "Formate", en: "formats" }),
        ]}
        description={text(locale, {
          de: "Hier erscheinen Projekte externer Produzent:innen, Kollektive und Medienformate, die im BOA gedreht oder entwickelt wurden.",
          en: "This is where projects by external producers, collectives, and media formats shot or developed at BOA appear.",
        })}
        className="layout-media-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[10ch]"
        contentClassName="lg:pt-3"
      >
        {entries.length ? (
          entries.map((entry) => <Card key={entry.href} locale={locale} {...entry} />)
        ) : (
          <div className="content-stack lg:max-w-[42rem]">
            <p className="type-body-lg text-[var(--ink)]">
              {text(locale, {
                de: "Aktuell sind auf der Website noch keine externen Medienprojekte aus dem BOA veröffentlicht.",
                en: "There are currently no external media projects from BOA published on the website.",
              })}
            </p>
            <p className="type-body text-[var(--muted)]">
              {text(locale, {
                de: "Sobald freigegebene Filme, Sessions oder Dokumentationen vorliegen, werden sie hier gesammelt.",
                en: "As soon as approved films, sessions, or documentaries are available, they will be collected here.",
              })}
            </p>
          </div>
        )}
      </SectionGrid>
    </SimplePage>
  );
}
