import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop für Prints, Merch, Vinyl und Editionen",
  description:
    "Shop von The Base e.V. Aachen mit Prints, Merch, Vinyl, Zines und Editionen aus Kunst, Musik, Archiv und Community.",
  path: "/shop",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getPrints(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Editionen und Poster", en: "Editions and posters" }),
      href: "/shop/prints",
      description: text(locale, {
        de: "Plakate und Publikationen, die einzelne Ausstellungen, Konzertreihen und visuelle Kampagnen sammelbar machen.",
        en: "Posters and publications that make exhibitions, concert series, and visual campaigns collectible.",
      }),
      meta: "Print",
    },
  ];
}

function getMerch(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Textil und Objekte", en: "Textiles and objects" }),
      href: "/shop/merch",
      description: text(locale, {
        de: "Kleine textile Serien und Objekte mit Bezug zu Kollaborationen, Teams und konkreten Momenten der Base.",
        en: "Small textile series and objects connected to collaborations, teams, and specific moments at The Base.",
      }),
      meta: text(locale, { de: "Objekt", en: "Object" }),
    },
  ];
}

function getVinyl(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Pressungen und Editions", en: "Pressings and editions" }),
      href: "/shop/vinyl",
      description: text(locale, {
        de: "Tonträger aus dem Label-Umfeld, die Clubnächte, Release-Shows und Soundexperimente physisch fortschreiben.",
        en: "Records from the label context that carry club nights, release shows, and sound experiments into physical form.",
      }),
      meta: "Audio",
    },
  ];
}

function getDiverses(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Sonderformate", en: "Special formats" }),
      href: "/shop/diverses",
      description: text(locale, {
        de: "Zines, Objektstudien und Sonderformate, die aus Workshops, Archivarbeit oder spontanen Produktionssituationen entstehen.",
        en: "Zines, object studies, and special formats emerging from workshops, archive work, or spontaneous production situations.",
      }),
      meta: text(locale, { de: "Diverses", en: "Misc" }),
    },
  ];
}

export default async function ShopPage() {
  const locale = await getLocale();
  const prints = getPrints(locale);
  const merch = getMerch(locale);
  const vinyl = getVinyl(locale);
  const diverses = getDiverses(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Shop"
        title={text(locale, { de: "Prints, Merch, Vinyl und Editionen", en: "Prints, merch, vinyl, and editions" })}
        description={text(locale, {
          de: "Der Shop macht ausgewählte Spuren des Programms zugänglich: Drucksachen, kleine Objektserien, Tonträger und Editionen aus dem Umfeld der Base.",
          en: "The shop makes selected traces of the programme accessible: printed matter, small object series, records, and editions from The Base context.",
        })}
      />

      <SectionGrid
        eyebrow="Print"
        title="Prints"
        description={text(locale, {
          de: "Gedruckte Arbeiten aus visueller Kommunikation, Ausstellungspraxis und Archiv.",
          en: "Printed works from visual communication, exhibition practice, and archive.",
        })}
      >
        {prints.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Wear"
        title="Merch"
        description={text(locale, {
          de: "Tragbare und materielle Zeichen der Community, ohne klassische Massenware.",
          en: "Wearable and material signs of the community, without standard mass merchandise.",
        })}
      >
        {merch.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Record"
        title="Vinyl"
        description={text(locale, {
          de: "Physische Musikformate aus dem Umfeld von The Base Records.",
          en: "Physical music formats from the context of The Base Records.",
        })}
      >
        {vinyl.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Open"
        title={text(locale, { de: "Diverses", en: "Misc" })}
        description={text(locale, {
          de: "Offene Kategorie für Zines, Sonderobjekte und experimentelle Kleinauflagen.",
          en: "Open category for zines, special objects, and experimental small editions.",
        })}
      >
        {diverses.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
