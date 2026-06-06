import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "DJs, Live-Acts und Sound-Formate in Aachen",
  description:
    "DJs und Live-Acts bei The Base e.V. Aachen: elektronische Sets, Sound-Formate und Kollektive aus dem BOA-Netzwerk.",
  path: "/people/djs",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  image: {
    src: string;
    alt: string;
  };
  external: true;
  ctaLabel: string;
};

function getEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "The Base @ Open Ground", en: "The Base @ Open Ground" }),
      href: "https://www.instagram.com/the.base.ev/p/DXFJJbajTgY/",
      description: text(locale, {
        de: "Oeffentlicher Veranstaltungskontext, in dem die DJ- und Live-Acts der Base in einen ueberregionalen musikalischen Zusammenhang treten.",
        en: "A public event context in which The Base's DJs and live acts enter a wider musical setting.",
      }),
      meta: text(locale, { de: "Gastspiel", en: "Guest appearance" }),
      image: {
        src: "/instagram/open-ground.jpg",
        alt: "Open Ground event visual with The Base",
      },
      external: true,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    },
    {
      title: text(locale, { de: "Programm im AZ Aachen", en: "Programme at AZ Aachen" }),
      href: "https://www.instagram.com/the.base.ev/p/DVxon7TDVeS/",
      description: text(locale, {
        de: "Mehrere b2b-Sets und kollektive musikalische Arbeit zwischen The Base und Kreisstrich als konkreter Blick auf das lokale DJ-Feld.",
        en: "Several b2b sets and collective musical work between The Base and Kreisstrich as a concrete look at the local DJ field.",
      }),
      meta: text(locale, { de: "B2B-Programm", en: "B2B programme" }),
      image: {
        src: "/instagram/az-aachen.jpg",
        alt: "Event poster for The Base and Kreisstrich at AZ Aachen",
      },
      external: true,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    },
  ];
}

export default async function DJsPage() {
  const locale = await getLocale();
  const entries = getEntries(locale);

  return (
    <SimplePage
      eyebrow="Talents"
      title="DJs"
      description={{
        de: "Diese Seite sammelt DJs, Live-Acts und Kollektive, die elektronische und experimentelle Musikprogramme bei The Base praegen - von Gastspielen bis zu lokalen Kollaborationen.",
        en: "This page collects DJs, live acts, and collectives shaping electronic and experimental music programmes at The Base - from guest appearances to local collaborations.",
      }}
      note={{
        de: "Auf Instagram werden diese Konstellationen bereits konkret: b2b-Formate und Sets zwischen Electro, Breaks und hypnotischem Techno.",
        en: "On Instagram these constellations already become concrete: b2b formats and sets between electro, breaks, and hypnotic techno.",
      }}
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Musikprogramme", en: "Music programmes" })}
        title={text(locale, { de: "Konkrete Formate", en: "Concrete formats" })}
        description={text(locale, {
          de: "Die DJ-Seite verweist nicht nur allgemein auf Sound, sondern zeigt die konkreten Programme, in denen diese Acts auftreten.",
          en: "The DJ page does not point only generally to sound, but shows the concrete programmes in which these acts appear.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[10ch]"
        contentClassName="lg:pt-3"
      >
        {entries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </SimplePage>
  );
}
