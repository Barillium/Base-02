import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { TALENT_ARTIST_QUERY, TALENT_CONTRIBUTOR_QUERY, TALENT_DJ_QUERY } from "@/sanity/lib/queries";
import type { SanityArtistPreview, SanityContributorPreview, SanityDjPreview } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Künstler:innen, DJs und Kultur-Netzwerk in Aachen",
  description:
    "Talents bei The Base e.V. Aachen: Künstler:innen, DJs, Kollektive, Produzent:innen und Mitwirkende aus dem BOA-Netzwerk.",
  path: "/people",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getArtists(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Profile und Positionen", en: "Profiles and positions" }),
      href: "/people/kuenstlerinnen",
      description: text(locale, {
        de: "Der Zugang zu künstlerischen Profilen aus Ausstellung, Installation, Performance und Produktion.",
        en: "Access to artistic profiles from exhibition, installation, performance, and production.",
      }),
      meta: text(locale, { de: "Artists", en: "Artists" }),
    },
  ];
}

function getDjs(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Sets und Kollektive", en: "Sets and collectives" }),
      href: "/people/djs",
      description: text(locale, {
        de: "Ein Überblick über musikalische Handschriften, Gäste, Residents und Kollektive.",
        en: "An overview of musical signatures, guests, residents, and collectives.",
      }),
      meta: text(locale, { de: "Sound", en: "Sound" }),
    },
  ];
}

function getContributors(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Netzwerk und Rollen", en: "Network and roles" }),
      href: "/mitmachen",
      description: text(locale, {
        de: "Rollen hinter dem Programm: Kuration, Produktion, Technik, Awareness, Nachbarschaft und freiwillige Arbeit.",
        en: "Roles behind the programme: curation, production, technical work, awareness, neighbourhood, and volunteering.",
      }),
      meta: text(locale, { de: "Community", en: "Community" }),
    },
  ];
}

async function getResolvedArtists(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getArtists(locale);
  const artist = await maybeSanityFetch<SanityArtistPreview>({
    query: TALENT_ARTIST_QUERY,
    tags: ["artist", "talents"],
    revalidate: 300,
  });

  if (!artist) {
    return fallbackEntries;
  }

  return [
    {
      title: artist.name,
      href: "/people/kuenstlerinnen",
      description: artist.summary,
      meta: text(locale, { de: "Artists", en: "Artists" }),
    },
  ];
}

async function getResolvedDjs(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getDjs(locale);
  const dj = await maybeSanityFetch<SanityDjPreview>({
    query: TALENT_DJ_QUERY,
    tags: ["dj", "talents"],
    revalidate: 300,
  });

  if (!dj) {
    return fallbackEntries;
  }

  return [
    {
      title: dj.name,
      href: "/people/djs",
      description: dj.summary,
      meta: text(locale, { de: "Sound", en: "Sound" }),
    },
  ];
}

async function getResolvedContributors(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getContributors(locale);
  const contributor = await maybeSanityFetch<SanityContributorPreview>({
    query: TALENT_CONTRIBUTOR_QUERY,
    tags: ["contributor", "talents"],
    revalidate: 300,
  });

  if (!contributor) {
    return fallbackEntries;
  }

  return [
    {
      title: contributor.name,
      href: "/mitmachen",
      description: contributor.summary ?? contributor.role,
      meta: text(locale, { de: "Community", en: "Community" }),
    },
  ];
}

export default async function PeoplePage() {
  const locale = await getLocale();
  const [artists, djs, contributors] = await Promise.all([
    getResolvedArtists(locale),
    getResolvedDjs(locale),
    getResolvedContributors(locale),
  ]);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Talents"
        title={text(locale, { de: "Künstler:innen, DJs und Mitwirkende", en: "Artists, DJs, and contributors" })}
        titleLines={[
          text(locale, { de: "Künstler:innen", en: "Artists" }),
          text(locale, { de: "DJs und", en: "DJs and" }),
          text(locale, { de: "Mitwirkende", en: "contributors" }),
        ]}
        description={text(locale, {
          de: "Talents zeigt die Menschen hinter den sichtbaren Formaten der Base: kuenstlerische Positionen aus Ausstellungen, DJs aus musikalischen Programmen und Teams, die den Ort in Aachen tragen.",
          en: "Talents shows the people behind the platform: artistic positions, DJs, producers, collectives, and teams developing the space in Aachen.",
        })}
        className="layout-people-intro"
        titleClassName="max-w-none text-[clamp(1.8rem,6.2vw,2.28rem)] md:max-w-none md:text-[clamp(2.08rem,5.4vw,2.56rem)] lg:max-w-[18.4ch] lg:text-[clamp(2.2rem,2.58vw,2.74rem)] xl:max-w-[19ch] xl:text-[clamp(2.42rem,2.82vw,2.96rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow="Artists"
        title={text(locale, { de: "Künstler:innen", en: "Artists" })}
        description={text(locale, {
          de: "Für künstlerische Beiträge, die in Ausstellungen wie Total Local oder \"The Roots of All That Exists\" öffentlich sichtbar werden.",
          en: "For artistic contributions that work with spaces, materials, and social situations in the bunker.",
        })}
        className="layout-people-section"
        titleClassName="max-w-none text-[clamp(1.58rem,5.2vw,2.12rem)] md:max-w-[14ch] lg:max-w-[15.4ch] xl:max-w-[16.2ch]"
        contentClassName="lg:pt-3"
      >
        {artists.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="DJs"
        title="DJs"
        description={text(locale, {
          de: "Fuer Sound-Profile aus b2b-Konstellationen, Gastbeitraegen und kollaborativen Musikformaten im Umfeld der Base.",
          en: "For sound profiles from club culture, experimental sets, and collaborative music formats.",
        })}
        className="layout-people-section"
        titleClassName="lg:max-w-[9.1ch] xl:max-w-[9.6ch]"
        contentClassName="lg:pt-3"
      >
        {djs.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Collective"
        title={text(locale, { de: "Mitwirkende", en: "Contributors" })}
        description={text(locale, {
          de: "Für alle Rollen, die Ausstellungen, Veranstaltungen, Awareness und Produktion möglich machen, aber nicht immer im Vordergrund stehen.",
          en: "For all roles that make cultural work possible but are not always on stage.",
        })}
        className="layout-people-section"
        titleClassName="lg:max-w-[9.1ch] xl:max-w-[9.6ch]"
        contentClassName="lg:pt-3"
      >
        {contributors.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
