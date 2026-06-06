import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bisherige Medienproduktionen im BOA Bunker of Art",
  description:
    "Bisherige Medienproduktionen im BOA Bunker of Art: Video, Foto, Sessions, Mitschnitte und Referenzen von The Base e.V.",
  path: "/media/produktionen",
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
      title: text(locale, { de: "Fotodokumentation: The Roots of All That Exists", en: "Photo documentation: The Roots of All That Exists" }),
      href: "https://www.instagram.com/the.base.ev/p/DYcFhaxtS8G/",
      description: text(locale, {
        de: "Das Motiv zeigt, wie Ausstellungsankündigung und fotografische Autor:innenschaft bereits in einem einzigen Bild zusammenlaufen.",
        en: "This visual shows how exhibition announcement and photographic authorship already come together in a single image.",
      }),
      meta: text(locale, { de: "Foto", en: "Photo" }),
      image: {
        src: "/instagram/roots-of-all-that-exists.webp",
        alt: "Documentation image for The Roots of All That Exists",
      },
      external: true,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    },
    {
      title: text(locale, { de: "Posterdesign: Total Local", en: "Poster design: Total Local" }),
      href: "https://www.instagram.com/the.base.ev/p/DXe58xqjcgO/",
      description: text(locale, {
        de: "Die Ankündigung macht grafische Produktion als eigenen Teil der Arbeit sichtbar: Poster, Setzung, Wiedererkennung und Ausstellungskommunikation.",
        en: "The announcement makes graphic production visible as its own part of the work: poster, layout, recognisability, and exhibition communication.",
      }),
      meta: text(locale, { de: "Grafik", en: "Graphic" }),
      image: {
        src: "/instagram/total-local.jpg",
        alt: "Poster design for Total Local by The Base",
      },
      external: true,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    },
  ];
}

export default async function MediaProductionsPage() {
  const locale = await getLocale();
  const entries = getEntries(locale);

  return (
    <SimplePage
      eyebrow="Media"
      title={{
        de: "Arbeiten und Mitschnitte",
        en: "Works and recordings",
      }}
      titleLines={[
        { de: "Arbeiten", en: "Works" },
        { de: "und", en: "and" },
        { de: "Mitschnitte", en: "recordings" },
      ]}
      description={{
        de: "Eine Auswahl von Arbeiten, Mitschnitten und visuellen Spuren aus dem BOA, zwischen Dokumentation, Grafik und kurzer Form.",
        en: "A selection of works, recordings, and visual traces from the BOA, between documentation, graphics, and short form.",
      }}
      note={{
        de: "Im Profil werden diese Arbeiten nicht als Portfolio ausgestellt, sondern als Teil des laufenden Programms lesbar.",
        en: "On the profile, these works do not appear as a portfolio, but as part of the ongoing programme.",
      }}
      titleClassName="max-w-none text-[clamp(1.62rem,5.3vw,2rem)] md:max-w-none md:text-[clamp(1.9rem,4.8vw,2.38rem)] lg:max-w-[13.6ch] lg:text-[clamp(2.4rem,3vw,3rem)] xl:max-w-[14.4ch] xl:text-[clamp(2.66rem,3.24vw,3.28rem)]"
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Auswahl", en: "Selection" })}
        title={text(locale, { de: "Spuren im Bild", en: "Traces in image" })}
        description={text(locale, {
          de: "Zwei Motive aus dem Profil zeigen, wie Fotografie und Grafik im Programm nicht Beiwerk, sondern eigene Formen der Arbeit sind.",
          en: "Two images from the profile show how photography and graphics are not secondary, but forms of work in their own right within the programme.",
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
