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
      title: text(locale, { de: "Aktuelle und bisherige Releases", en: "Current and past releases" }),
      href: "/label/releases",
      description: text(locale, {
        de: "Veröffentlichungen mit Track-Kontext, Credits und Bezug zu Release-Shows im BOA-Umfeld.",
        en: "Releases with track context, credits, and links to release shows in the BOA context.",
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
        de: "Profile von Musiker:innen und Produzent:innen, die Sound aus der Base in Veröffentlichungen übersetzen.",
        en: "Profiles of musicians and producers who translate sound from The Base into releases.",
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
        description={text(locale, {
          de: "The Base Records dokumentiert elektronische Musik aus Aachen und dem erweiterten Netzwerk: Releases, Artists, Release-Shows und Soundspuren aus dem Bunker.",
          en: "The Base Records documents electronic music from Aachen and the wider network: releases, artists, release shows, and sound traces from the bunker.",
        })}
      />

      <SectionGrid
        eyebrow={text(locale, { de: "Produktion", en: "Production" })}
        title="Releases"
        description={text(locale, {
          de: "Der Einstieg in veröffentlichte Tracks, EPs und dokumentierte Sound-Projekte.",
          en: "Entry point into published tracks, EPs, and documented sound projects.",
        })}
      >
        {releases.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Entourage"
        title={text(locale, { de: "Artists", en: "Artists" })}
        description={text(locale, {
          de: "Verbindung zu den Menschen hinter Produktionen, Sets und musikalischen Entscheidungen.",
          en: "Connection to the people behind productions, sets, and musical decisions.",
        })}
      >
        {artists.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

    </div>
  );
}
