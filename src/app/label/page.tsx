import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Label für elektronische Musik, Releases und Sound aus Aachen",
  description:
    "The Base Records: Label für elektronische Musik, Releases, Artists und Sound-Dokumentation aus Aachen und dem BOA-Kontext.",
  path: "/label",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getReleases(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Tracks, Pressungen und Kontexte", en: "Tracks, pressings, and contexts" }),
      href: "/label/releases",
      description: text(locale, {
        de: "Veröffentlichungen, Credits und die Momente, in denen Klang, Pressung und Aufführung zusammenkommen.",
        en: "Releases, credits, and the moments where sound, pressing, and performance come together.",
      }),
      meta: text(locale, { de: "Sound", en: "Sound" }),
    },
  ];
}

function getArtists(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Künstlerprofile", en: "Artist profiles" }),
      href: "/people/kuenstlerinnen",
      description: text(locale, {
        de: "Profile von Musiker:innen, Produzent:innen und Live-Acts, die zwischen Release, Performance und Zusammenarbeit arbeiten.",
        en: "Profiles of musicians, producers, and live acts working between release, performance, and collaboration.",
      }),
      meta: text(locale, { de: "Talents", en: "Talents" }),
    },
  ];
}

export default async function LabelPage() {
  const locale = await getLocale();
  const releases = getReleases(locale);
  const artists = getArtists(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Label"
        title={text(locale, { de: "The Base Records", en: "The Base Records" })}
        titleLines={[
          text(locale, { de: "The Base", en: "The Base" }),
          text(locale, { de: "Records", en: "Records" }),
        ]}
        description={text(locale, {
          de: "The Base Records verbindet Klang aus Aachen mit den Räumen und Programmen der Base: Pressungen, Videos, Release-Shows und Spuren, die nicht getrennt vom übrigen Programm entstehen.",
          en: "The Base Records connects sound from Aachen with the rooms and programmes of The Base: pressings, videos, release shows, and traces that do not emerge separately from the rest of the programme.",
        })}
        className="layout-label-intro"
        titleClassName="lg:max-w-[13.2ch] lg:text-[clamp(2.5rem,3.04vw,3.1rem)] xl:max-w-[14ch] xl:text-[clamp(2.72rem,3.22vw,3.3rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow={text(locale, { de: "Klang", en: "Sound" })}
        title={text(locale, { de: "Veröffentlichungen", en: "Releases" })}
        titleLines={[text(locale, { de: "Veröffentlichungen", en: "Releases" })]}
        description={text(locale, {
          de: "Ein Einstieg in Veröffentlichungen, Pressungen, Videos und die Kontexte, in denen sie öffentlich werden.",
          en: "An entry point into releases, pressings, videos, and the contexts in which they become public.",
        })}
        className="layout-label-section"
        titleClassName="max-w-none text-[clamp(1.42rem,4.5vw,1.9rem)] md:max-w-none md:text-[clamp(1.58rem,3.15vw,1.82rem)] lg:max-w-[23ch] lg:text-[clamp(1.56rem,1.9vw,1.9rem)] xl:max-w-[24ch]"
        contentClassName="lg:pt-3"
      >
        {releases.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Entourage"
        title={text(locale, { de: "Artists", en: "Artists" })}
        titleLines={[text(locale, { de: "Artists", en: "Artists" })]}
        description={text(locale, {
          de: "Die Menschen hinter Klang, Zusammenarbeit und musikalischen Entscheidungen im Umfeld des Labels.",
          en: "The people behind sound, collaboration, and musical decisions around the label.",
        })}
        className="layout-label-section"
        titleClassName="lg:max-w-[14.2ch] xl:max-w-[15ch]"
        contentClassName="lg:pt-3"
      >
        {artists.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

    </div>
  );
}
