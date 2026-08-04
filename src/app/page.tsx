import Image from "next/image";

import { Card } from "@/components/Card";
import { HomeSections } from "@/components/HomeSections";
import { PageJsonLd } from "@/components/PageJsonLd";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import {
  portableTextToTextLines,
  resolveLinkedDocumentHref,
  resolveStaticPageHref,
} from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import {
  getCurrentInstagramEventFallback,
  resolveCurrentInstagramAwareEvent,
} from "@/sanity/lib/eventInstagramFallbacks";
import { HOME_PAGE_QUERY, LIVE_CURRENT_EVENT_QUERY } from "@/sanity/lib/queries";
import type { SanityEventPreview, SanityHomePage } from "@/sanity/types";

const homePageMetadata = {
  title: "Kulturzentrum in Aachen für Kunst, Musik und Workshops",
  description:
    "The Base e.V. im BOA Bunker of Art Aachen verbindet Ausstellungen, Konzerte, Workshops, Archiv und Community-Arbeit.",
  path: "/",
} as const;

export const metadata = pageMetadata(homePageMetadata);

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function orderAboutEntries(entries: Entry[]): Entry[] {
  const preferredOrder = [
    "/about/the-base",
    "/about/code-of-conduct",
    "/mitmachen",
    "/about/foerdermitgliedschaft",
    "/about/kontakt",
  ];

  return [...entries].sort((left, right) => {
    const leftIndex = preferredOrder.indexOf(left.href);
    const rightIndex = preferredOrder.indexOf(right.href);

    if (leftIndex === -1 && rightIndex === -1) {
      return 0;
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
}

function getQuickEntries(locale: Locale, currentEvent?: Pick<Entry, "title" | "href">): Entry[] {
  const instagramCurrentEvent = getCurrentInstagramEventFallback(locale);

  return [
    {
      title: currentEvent?.title ?? instagramCurrentEvent.title,
      href: currentEvent?.href ?? instagramCurrentEvent.externalUrl ?? "",
      description: text(locale, {
        de: "Die nächste sichtbare Arbeit, Ausstellung oder musikalische Einladung im Programm.",
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
      meta: text(locale, { de: "Letzte Projekte", en: "Latest projects" }),
    },
  ];
}

function getResolvedQuickEntries(
  locale: Locale,
  homePage: SanityHomePage | null,
  currentEvent: SanityEventPreview | null,
): Entry[] {
  const currentMeta = text(locale, { de: "Aktuell", en: "Current" });
  const genericCurrentTitle = text(locale, { de: "Aktuelle Veranstaltung", en: "Current event" });
  const latestProjectsMeta = text(locale, { de: "Letzte Projekte", en: "Latest projects" });
  const resolvedCurrentEvent = resolveCurrentInstagramAwareEvent(locale, currentEvent);
  const fallbackCurrentEvent = {
    title: resolvedCurrentEvent.title,
    href: resolvedCurrentEvent.externalUrl ?? "",
  };
  const fallbackEntries = getQuickEntries(locale, fallbackCurrentEvent);

  const quickLinks = homePage?.quickLinks
    ?.map((entry) => ({
      title:
        entry.meta === currentMeta
          ? resolvedCurrentEvent.title || (entry.title === genericCurrentTitle ? fallbackCurrentEvent.title : entry.title)
          : entry.title,
      href:
        entry.meta === currentMeta
          ? resolvedCurrentEvent.externalUrl || entry.externalUrl || fallbackCurrentEvent.href
          : entry.externalUrl || entry.internalPath || resolveLinkedDocumentHref(entry.linkedDocument) || "",
      description:
        entry.meta === currentMeta
          ? resolvedCurrentEvent.summary || entry.description || ""
          : entry.description ?? "",
      meta: entry.meta === text(locale, { de: "Letztes Projekt", en: "Latest project" }) ? latestProjectsMeta : entry.meta,
    }))
    .filter((entry) => Boolean(entry.href));

  if (!quickLinks?.length) {
    return fallbackEntries;
  }

  return quickLinks;
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
      title: "Awareness",
      href: "/about/code-of-conduct",
      description: text(locale, {
        de: "Grundsätze für respektvolle Räume, diskriminierungssensible Praxis und gemeinsames Verhalten im BOA.",
        en: "Principles for respectful spaces, discrimination-sensitive cultural work, and shared conduct in the bunker.",
      }),
      meta: text(locale, { de: "Safe Space", en: "Safe Space" }),
    },
    {
      title: text(locale, { de: "Open Call", en: "Open call" }),
      href: "/mitmachen",
      description: text(locale, {
        de: "Anfragen für Ausstellungen, ortsspezifische Arbeiten und andere Formate im BOA-Kontext.",
        en: "Inquiry for exhibitions, site-specific works, and other formats that could be developed or presented in the BOA context.",
      }),
      meta: text(locale, { de: "Open Call", en: "Open call" }),
    },
    {
      title: text(locale, { de: "Kontakt aufnehmen", en: "Get in touch" }),
      href: "/about/kontakt",
      description: text(locale, {
        de: "Direkte Kontaktwege für Anfragen, Austausch und organisatorische Abstimmungen rund um Verein und Kulturort.",
        en: "Direct contact paths for enquiries, exchange, and organisational coordination around the association and the cultural site.",
      }),
      meta: text(locale, { de: "Kontakt", en: "Contact" }),
    },
    {
      title: text(locale, { de: "Fördermitglied werden", en: "Become a supporting member" }),
      href: "/about/foerdermitgliedschaft",
      description: text(locale, {
        de: "Informationen für Menschen und Organisationen, die die Arbeit des Vereins regelmäßig unterstützen möchten.",
        en: "Information for people and organisations who want to support the association's work on a recurring basis.",
      }),
      meta: text(locale, { de: "Unterstützen", en: "Support" }),
    },
  ];
}

function getResolvedAboutEntries(locale: Locale, homePage?: SanityHomePage | null): Entry[] {
  const fallbackEntries = getAboutEntries(locale);
  const entries = homePage?.featuredAbout
    ?.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    ?.map((entry) => ({
      title: entry.title,
      href: resolveStaticPageHref(entry.routeKey) || "",
      description: entry.description ?? "",
      meta:
        entry.routeKey === "about-the-base"
          ? text(locale, { de: "Profil", en: "Profile" })
          : entry.routeKey === "about-code-of-conduct"
            ? text(locale, { de: "Safe Space", en: "Safe Space" })
            : entry.routeKey === "about-kontakt"
              ? text(locale, { de: "Kontakt", en: "Contact" })
            : entry.routeKey === "about-foerdermitgliedschaft"
              ? text(locale, { de: "Unterstützen", en: "Support" })
              : text(locale, { de: "Open Call", en: "Open call" }),
    }))
    .filter((entry) => Boolean(entry.href));

  if (!entries?.length) {
    return orderAboutEntries(fallbackEntries);
  }

  const mergedEntries = [...entries];

  for (const fallbackEntry of fallbackEntries) {
    if (!mergedEntries.some((entry) => entry.href === fallbackEntry.href)) {
      mergedEntries.push(fallbackEntry);
    }
  }

  return orderAboutEntries(mergedEntries);
}

function HomeAboutSection({ locale, entries }: { locale: Locale; entries: Entry[] }) {
  return (
    <SectionGrid
      eyebrow="About"
      title={text(locale, { de: "Verein, Awareness und Kontakt", en: "Association, awareness, and contact" })}
      titleLines={[
        text(locale, { de: "Verein,", en: "Association," }),
        text(locale, { de: "Awareness", en: "awareness" }),
        text(locale, { de: "und Kontakt", en: "and contact" }),
      ]}
      description={text(locale, {
        de: "Geschichte, Selbstverständnis, Awareness und konkrete Wege in den Verein und den Kulturort hinein.",
        en: "History, position, awareness, and direct ways into the association and the cultural site.",
      })}
      className="layout-editorial-section home-about-section"
      titleClassName="home-about-title lg:max-w-[10.2ch] xl:max-w-[10.8ch]"
      descriptionClassName="home-about-description"
      contentClassName="home-about-content"
    >
      {entries.map((entry) => (
        <Card key={entry.href} locale={locale} {...entry} />
      ))}
    </SectionGrid>
  );
}

function getMilestones(locale: Locale): string[] {
  return [
    text(locale, {
      de: "Seit 2020 als offene Plattform im Bunker of Art aktiv",
      en: "Active as an open platform in the Bunker of Art since 2020",
    }),
    text(locale, {
      de: "Verbindet Ausstellung, Konzert, Veröffentlichung und Archiv statt klassischer Spartentrennung",
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
  const [homePage, currentEvent] = await Promise.all([
    maybeSanityFetch<SanityHomePage>({
      query: HOME_PAGE_QUERY,
      params: { locale },
      tags: ["homePage", "home"],
      revalidate: 300,
    }),
    maybeSanityFetch<SanityEventPreview>({
      query: LIVE_CURRENT_EVENT_QUERY,
      params: { locale },
      tags: ["event", "live", "current-event"],
      revalidate: 300,
    }),
  ]);
  const aboutEntries = getResolvedAboutEntries(locale, homePage);

  if (homePage?.sections?.length) {
    return (
      <div className="editorial-fade page-flow page-flow-home">
        <PageJsonLd {...homePageMetadata} pageType="WebPage" />
        <HomeSections sections={homePage.sections} locale={locale} currentEvent={currentEvent} />
        <HomeAboutSection locale={locale} entries={aboutEntries} />
      </div>
    );
  }

  const quickEntries = getResolvedQuickEntries(locale, homePage, currentEvent);
  const milestones = portableTextToTextLines(homePage?.milestones).length
    ? portableTextToTextLines(homePage?.milestones)
    : getMilestones(locale);
  const introTitleLines = [
    text(locale, { de: "Plattform", en: "Platform" }),
    text(locale, { de: "zwischen", en: "between" }),
    text(locale, { de: "Ausstellung,", en: "exhibition," }),
    text(locale, { de: "Programm und", en: "programme and" }),
    text(locale, { de: "lokaler Szene", en: "local scene" }),
  ];
  const statement =
    homePage?.statement ??
    text(locale, {
      de: "The Base e.V. ist ein 2015 in Aachen gegründeter Kulturverein und ein interdisziplinäres Kollektiv junger Kulturarbeiter:innen, Gestalter:innen und Organisator:innen. Der Verein entwickelt zugängliche Formate zwischen Kunst, Musik, Design und sozialer Praxis und stärkt unabhängige kulturelle Strukturen in der Stadt.",
      en: "The Base e.V. is a cultural association founded in Aachen in 2015 and an interdisciplinary collective of young cultural workers, designers, and organisers. The association develops accessible formats between art, music, design, and social practice and strengthens independent cultural structures in the city.",
    });
  const note = homePage?.note;
  const fallbackNote = text(locale, {
    de: "Im Mittelpunkt stehen ungenutzte urbane Räume, neue kulturelle Allianzen und Formate, die unterschiedliche Publika in Aachen zusammenbringen.",
    en: "At the centre are unused urban spaces, new cultural alliances, and formats that bring different publics together in Aachen.",
  });

  return (
    <div className="editorial-fade page-flow page-flow-home">
      <PageJsonLd {...homePageMetadata} pageType="WebPage" />

      <section
        aria-labelledby="home-entry-points-heading"
        className="-mx-[var(--site-gutter)] -mb-[clamp(1.15rem,3.5vw,1.95rem)] pt-0"
      >
        <h2 id="home-entry-points-heading" className="sr-only">
          {text(locale, { de: "Ausgewählte Einstiege", en: "Selected entry points" })}
        </h2>
        <div className="grid grid-cols-1 border-y border-[var(--line)]/70 lg:grid-cols-3">
          {quickEntries.map((entry, index) => {
            const isExternal = /^https?:\/\//.test(entry.href);
            const dividerClasses =
              index === 0
                ? ""
                : "border-t border-[var(--line)]/55 lg:border-l lg:border-t-0";

            return (
              <a
                key={entry.href}
                href={entry.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                className={`home-quick-link group grid min-w-0 px-[var(--site-gutter)] transition-colors hover:bg-black/[0.025] focus-visible:bg-black/[0.025] focus-visible:outline-none ${dividerClasses}`}
              >
                <p className="type-meta text-[var(--muted)]">{entry.meta}</p>
                <p className="home-quick-link-title font-display text-[var(--ink)] transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                  {entry.title}
                </p>
                {isExternal ? (
                  <span className="sr-only">
                    {text(locale, { de: "Öffnet in einem neuen Tab", en: "Opens in a new tab" })}
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
      </section>

      <section className="-mx-[var(--site-gutter)]">
        <div
          aria-label={text(locale, {
            de: "Ausstellungsraum im BOA Bunker of Art",
            en: "Exhibition space at the BOA Bunker of Art",
          })}
          className="relative aspect-[6/5] w-full overflow-hidden sm:aspect-[16/11] lg:aspect-[1901/700]"
        >
          <Image
            src="/home/Firefly.jpg"
            alt="Innenraum im BOA Bunker of Art"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          aria-labelledby="home-introduction-heading"
          className="ink-panel px-[var(--site-gutter)] py-8 md:py-10"
        >
          <div className="content-grid">
            <div className="content-stack lg:max-w-[24.5rem]">
              <h1
                id="home-introduction-heading"
                aria-label={text(locale, {
                  de: "Plattform zwischen Ausstellung, Programm und lokaler Szene",
                  en: "Platform between exhibition, programme, and local scene",
                })}
                className="home-intro-heading font-display text-[2.16rem] leading-[1.04] tracking-[0.026em] text-[#f8f8f8] uppercase md:text-[2.68rem] lg:max-w-[24.5rem] lg:text-[clamp(2.78rem,2.9vw,3.72rem)]"
              >
                {introTitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <div className="content-stack home-intro-copy lg:pt-1">
              <p className="type-body-lg max-w-[48rem] text-zinc-200">{statement}</p>
              <p className="type-body-lg max-w-[48rem] text-zinc-300">{note ?? fallbackNote}</p>
              <ul className="type-body max-w-[48rem] space-y-1.5 text-zinc-300">
                {milestones.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HomeAboutSection locale={locale} entries={aboutEntries} />
    </div>
  );
}
