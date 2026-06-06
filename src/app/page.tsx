import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import {
  ARCHIVE_CATALOGUE_QUERY,
  ARCHIVE_POSTER_QUERY,
  HOME_QUICK_LINKS_QUERY,
} from "@/sanity/lib/queries";
import type {
  SanityArchiveItemPreview,
  SanityHomeQuickLink,
} from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Kulturzentrum in Aachen für Kunst, Musik und Workshops",
  description:
    "The Base e.V. im BOA Bunker of Art Aachen verbindet Ausstellungen, Konzerte, Workshops, Archiv und Community-Arbeit.",
  path: "/",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getQuickEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Aktuelle Veranstaltung", en: "Current event" }),
      href: "https://www.instagram.com/p/DYcFhaxtS8G/",
      description: text(locale, {
        de: "Die naechste sichtbare Arbeit, Ausstellung oder musikalische Einladung im Programm.",
        en: "The next visible work, exhibition, or musical invitation in the programme.",
      }),
      meta: text(locale, { de: "Aktuell", en: "Current" }),
    },
    {
      title: text(locale, { de: "Laufende Formate", en: "Ongoing formats" }),
      href: "/live/laufende-formate",
      description: text(locale, {
        de: "Wiederkehrende Reihen und offene Programmlinien.",
        en: "Recurring series and open programme lines.",
      }),
      meta: text(locale, { de: "Nächster Termin", en: "Next date" }),
    },
    {
      title: text(locale, { de: "Vergangene Veranstaltungen", en: "Past events" }),
      href: "/live/events",
      description: text(locale, {
        de: "Rückblick auf dokumentierte Veranstaltungen und Projekte.",
        en: "Retrospective of documented events and projects.",
      }),
      meta: text(locale, { de: "Letztes Projekt", en: "Latest project" }),
    },
  ];
}

async function getResolvedQuickEntries(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getQuickEntries(locale);
  const quickLinks = await maybeSanityFetch<SanityHomeQuickLink[]>({
    query: HOME_QUICK_LINKS_QUERY,
    tags: ["homeQuickLink", "home"],
    revalidate: 300,
  });

  if (!quickLinks?.length) {
    return fallbackEntries;
  }

  return quickLinks.map((entry) => ({
    title: entry.title,
    href: entry.href,
    description: entry.description ?? "",
    meta: entry.meta,
  }));
}

function getArchiveEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, {
        de: "Kunstkatalog",
        en: "Art catalogue",
      }),
      href: "/archive/kunstkatalog",
      description: text(locale, {
        de: "Werke, Credits, Texte und Kontextmaterialien aus Ausstellungen und installativen Projekten im BOA.",
        en: "Works, texts, and project traces from exhibitions since the early BOA years",
      }),
      meta: text(locale, { de: "Recherche", en: "Research" }),
    },
    {
      title: text(locale, {
        de: "Poster",
        en: "Posters",
      }),
      href: "/archive/poster",
      description: text(locale, {
        de: "Plakate, Open Calls, Jubiläumsgrafiken und andere visuelle Spuren der öffentlichen Kommunikation.",
        en: "Posters, visual campaigns, and graphic traces of past exhibitions, concerts, and workshops.",
      }),
      meta: text(locale, { de: "Grafik", en: "Graphic" }),
    },
  ];
}

async function getResolvedArchiveEntries(locale: Locale): Promise<Entry[]> {
  const fallbackEntries = getArchiveEntries(locale);
  const [catalogueItem, posterItem] = await Promise.all([
    maybeSanityFetch<SanityArchiveItemPreview>({
      query: ARCHIVE_CATALOGUE_QUERY,
      tags: ["archiveItem", "archive", "home"],
      revalidate: 300,
    }),
    maybeSanityFetch<SanityArchiveItemPreview>({
      query: ARCHIVE_POSTER_QUERY,
      tags: ["archiveItem", "archive", "home"],
      revalidate: 300,
    }),
  ]);

  return [
    catalogueItem
      ? {
          title: fallbackEntries[0].title,
          href: "/archive/kunstkatalog",
          description: catalogueItem.summary,
          meta: fallbackEntries[0].meta,
        }
      : fallbackEntries[0],
    posterItem
      ? {
          title: fallbackEntries[1].title,
          href: "/archive/poster",
          description: fallbackEntries[1].description,
          meta: fallbackEntries[1].meta,
        }
      : fallbackEntries[1],
  ];
}

function getAboutEntries(locale: Locale): Entry[] {
  return [
    {
      title: "The Base",
      href: "/about/the-base",
      description: text(locale, {
        de: "Entstehung, Selbstverständnis und die Rolle des BOA als Kulturort und Infrastruktur.",
        en: "Origins, mission, and the connection between art, music, contemporary history, and community.",
      }),
      meta: text(locale, { de: "Profil", en: "Profile" }),
    },
    {
      title: text(locale, {
        de: "Zum Mitmachen",
        en: "Get involved",
      }),
      href: "/mitmachen",
      description: text(locale, {
        de: "Projektideen, Open Calls und freiwillige Mitarbeit für Ausstellungen, Formate und laufende Kulturarbeit.",
        en: "Artists and culture-interested people can build contacts here, present their work, and grow through exchange with others",
      }),
      meta: text(locale, { de: "Engagement", en: "Engagement" }),
    },
    {
      title: "Awareness",
      href: "/about/code-of-conduct",
      description: text(locale, {
        de: "Grundsätze für respektvolle Räume, diskriminierungssensible Praxis und gemeinsames Verhalten im BOA.",
        en: "Principles for respectful spaces, discrimination-sensitive cultural work, and shared conduct in the bunker.",
      }),
      meta: text(locale, { de: "Safe Space", en: "Safe Space" }),
    },
  ];
}

function getMilestones(locale: Locale): string[] {
  return [
    text(locale, {
      de: "Seit 2020 als offene Plattform im Bunker of Art aktiv",
      en: "Active as an open platform in the Bunker of Art since 2020",
    }),
    text(locale, {
      de: "Verbindet Ausstellung, Konzert, Veroeffentlichung und Archiv statt klassischer Spartentrennung",
      en: "Connects exhibition, concert, release, and archive instead of following traditional genre boundaries",
    }),
    text(locale, {
      de: "Macht lokale Kollaborationen, Open Calls und dokumentierte Formate öffentlich sichtbar",
      en: "Makes local collaborations, open calls, and documented formats publicly visible",
    }),
  ];
}

export default async function HomePage() {
  const locale = await getLocale();
  const [quickEntries, archiveEntries] = await Promise.all([
    getResolvedQuickEntries(locale),
    getResolvedArchiveEntries(locale),
  ]);
  const aboutEntries = getAboutEntries(locale);
  const milestones = getMilestones(locale);

  return (
    <div className="editorial-fade page-flow">
      <section className="grid grid-cols-1 gap-3 pb-2 pt-2 sm:grid-cols-2 sm:items-stretch sm:gap-4 md:pt-4 xl:grid-cols-3">
        {quickEntries.map((entry) => {
          const isExternal = /^https?:\/\//.test(entry.href);

          return (
          <a
            key={entry.href}
            href={entry.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="group grid min-w-0 gap-1.5 rounded-sm border border-[var(--line)]/65 px-3 py-3 transition-colors hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none md:h-full"
          >
            <p className="type-meta text-[var(--muted)]">{entry.meta}</p>
            <p className="type-title text-[var(--ink)] transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
              {entry.title}
            </p>
          </a>
          );
        })}
      </section>

      <section className="ink-panel content-grid rounded-sm px-4 py-5 sm:px-5 md:px-7 md:py-8">
        <div className="content-stack-tight">
          <Eyebrow className="text-zinc-300">The Base e.V.</Eyebrow>
          <h2 className="type-display-section max-w-[17ch] leading-[1.02] md:max-w-[17ch]">
            {text(locale, {
              de: "Plattform zwischen Ausstellung, Programm und lokaler Szene",
              en: "Platform between exhibition, programme, and local scene",
            })}
          </h2>
        </div>
        <div className="content-stack lg:max-w-4xl">
          <p className="type-body-lg max-w-4xl text-zinc-200">
            {text(locale, {
              de: "The Base versteht den ehemaligen Bunker nicht als Kulisse, sondern als aktiven sozialen und kulturellen Raum. Zwischen Ausstellungen wie Total Local, musikalischen Programmen und Release-Kontexten entsteht ein Ort, der Szenen, Teams und kuenstlerische Positionen in Aachen zusammenfuehrt.",
              en: "The Base does not treat the former bunker as a backdrop, but as an active social and cultural space. Between exhibitions such as Total Local, musical programmes, and release contexts, a place emerges that brings scenes, teams, and artistic positions together in Aachen.",
            })}
          </p>
          <ul className="type-body space-y-1.5 text-zinc-300">
            {milestones.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionGrid
        eyebrow={text(locale, { de: "Archive", en: "Archive" })}
        title={text(locale, { de: "Archiv", en: "Archive" })}
        description={text(locale, {
          de: "Arbeiten, Spuren, Dokumentation und Rueckblicke.",
          en: "Works, traces, documentation, and retrospectives.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.2ch] xl:max-w-[10ch]"
        contentClassName="lg:pt-3"
      >
        {archiveEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="About"
        title={text(locale, { de: "Verein, Awareness und Kontakt", en: "Association, awareness, and contact" })}
        titleLines={[
          text(locale, { de: "Verein, Awareness", en: "Association, awareness" }),
          text(locale, { de: "und Kontakt", en: "and contact" }),
        ]}
        description={text(locale, {
          de: "Geschichte, Selbstverständnis, Awareness und konkrete Wege in den Verein und den Kulturort hinein.",
          en: "History, position, awareness, ways to get involved, and direct contact paths.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[9.4ch] xl:max-w-[10.2ch]"
        contentClassName="lg:pt-3"
      >
        {aboutEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
