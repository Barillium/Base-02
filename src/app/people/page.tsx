import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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

export default async function PeoplePage() {
  const locale = await getLocale();
  const artists = getArtists(locale);
  const djs = getDjs(locale);
  const contributors = getContributors(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Talents"
        title={text(locale, { de: "Künstler:innen, DJs und Mitwirkende", en: "Artists, DJs, and contributors" })}
        description={text(locale, {
          de: "Talents zeigt die Menschen hinter der Plattform: künstlerische Positionen, DJs, Produzent:innen, Kollektive und Teams, die den Ort in Aachen weiterentwickeln.",
          en: "Talents shows the people behind the platform: artistic positions, DJs, producers, collectives, and teams developing the space in Aachen.",
        })}
        className="lg:grid-cols-[minmax(22rem,0.95fr)_minmax(0,1.35fr)] xl:grid-cols-[minmax(24rem,0.88fr)_minmax(0,1.48fr)]"
        titleClassName="lg:max-w-[11ch] lg:text-[clamp(2.75rem,4vw,3.55rem)] xl:max-w-[12ch] xl:text-[clamp(3rem,4.3vw,3.9rem)]"
        rightClassName="lg:pt-4"
      />

      <SectionGrid
        eyebrow="Artists"
        title={text(locale, { de: "Künstler:innen", en: "Artists" })}
        description={text(locale, {
          de: "Für künstlerische Beiträge, die Räume, Materialien und soziale Situationen im Bunker bearbeiten.",
          en: "For artistic contributions that work with spaces, materials, and social situations in the bunker.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {artists.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="DJs"
        title="DJs"
        description={text(locale, {
          de: "Für Sound-Profile aus Clubkultur, experimentellen Sets und kollaborativen Musikformaten.",
          en: "For sound profiles from club culture, experimental sets, and collaborative music formats.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {djs.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Collective"
        title={text(locale, { de: "Mitwirkende", en: "Contributors" })}
        description={text(locale, {
          de: "Für alle Rollen, die Kulturarbeit möglich machen, aber nicht immer auf der Bühne stehen.",
          en: "For all roles that make cultural work possible but are not always on stage.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {contributors.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
