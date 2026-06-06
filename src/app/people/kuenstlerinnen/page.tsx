import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { SimplePage } from "@/components/SimplePage";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Künstler:innen bei The Base e.V. Aachen",
  description:
    "Künstler:innen bei The Base e.V. Aachen: Profile, Positionen und Beiträge aus Ausstellung, Installation und Performance.",
  path: "/people/kuenstlerinnen",
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
      title: text(locale, { de: "Total Local", en: "Total Local" }),
      href: "https://www.instagram.com/the.base.ev/p/DXe58xqjcgO/",
      description: text(locale, {
        de: "Die Ausstellung markiert einen lokalen Fokus mit 18 Positionen und macht sichtbar, wie stark das Künstler:innen-Netzwerk im direkten Umfeld verankert ist.",
        en: "The exhibition marks a local focus with 18 positions and makes visible how strongly the artists network is rooted in the immediate surroundings.",
      }),
      meta: text(locale, { de: "Ausstellungskontext", en: "Exhibition context" }),
      image: {
        src: "/instagram/total-local.jpg",
        alt: "Total Local poster featuring artists at The Base",
      },
      external: true,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    },
    {
      title: text(locale, { de: "The Roots of All That Exists", en: "The Roots of All That Exists" }),
      href: "https://www.instagram.com/the.base.ev/p/DYcFhaxtS8G/",
      description: text(locale, {
        de: "Mehrtägige Ausstellung mit unterschiedlichen Positionen, die den künstlerischen Rahmen von The Base zwischen lokaler Szene und offenen Einladungen zeigt.",
        en: "Multi-day exhibition with different positions, showing The Base's artistic frame between local scene and open invitations.",
      }),
      meta: text(locale, { de: "Aktuelle Positionen", en: "Current positions" }),
      image: {
        src: "/instagram/roots-of-all-that-exists.webp",
        alt: "Poster for The Roots of All That Exists with participating artists",
      },
      external: true,
      ctaLabel: text(locale, { de: "Zum Post", en: "View post" }),
    },
  ];
}

export default async function KuenstlerinnenPage() {
  const locale = await getLocale();
  const entries = getEntries(locale);

  return (
    <SimplePage
      eyebrow="Talents"
      title={{ de: "Künstler:innen", en: "Artists" }}
      titleLines={[{ de: "Künstler:innen", en: "Artists" }]}
      description={{
        de: "Diese Übersicht macht Künstler:innen sichtbar, die bei The Base in Ausstellungen, Installationen, Performances oder interdisziplinären Projekten auftauchen - zuletzt etwa in Reihen wie Total Local oder \"The Roots of All That Exists\".",
        en: "This overview makes visible artists who appear at The Base through exhibitions, installations, performances, or interdisciplinary projects - most recently in series such as Total Local or “The Roots of All That Exists”.",
      }}
      note={{
        de: "Die Artist-Announcement-Posts zeigen dabei dieselbe Haltung wie die Seite: lokale und internationale Positionen werden nicht getrennt, sondern im Bunker als gemeinsamer Kontext zusammengebracht.",
        en: "The artist-announcement posts show the same attitude as this page: local and international positions are not separated, but brought together within the bunker as a shared context.",
      }}
      introClassName="layout-people-intro"
      titleClassName="max-w-none text-[clamp(1.54rem,5vw,1.94rem)] md:max-w-none md:text-[clamp(1.86rem,4.7vw,2.32rem)] lg:max-w-[15.6ch] lg:text-[clamp(2.22rem,2.72vw,2.78rem)] xl:max-w-[16.4ch] xl:text-[clamp(2.46rem,2.96vw,3rem)]"
    >
      <SectionGrid
        eyebrow={text(locale, { de: "Kontexte", en: "Contexts" })}
        title={text(locale, { de: "Wo Positionen sichtbar werden", en: "Where positions become visible" })}
        description={text(locale, {
          de: "Die Seite zeigt nicht nur ein Feld von Namen, sondern die konkreten Formate, in denen künstlerische Positionen bei The Base öffentlich auftauchen.",
          en: "The page shows not only a field of names, but the concrete formats in which artistic positions become public at The Base.",
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
