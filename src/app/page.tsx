import { Card } from "@/components/Card";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kulturzentrum in Aachen für Kunst, Musik und Workshops",
  description:
    "The Base e.V. im BOA Bunker of Art Aachen verbindet Ausstellungen, Konzerte, Workshops, Label, Archiv und Community-Arbeit.",
  path: "/",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getEventEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, {
        de: "Aktuelle Ausstellungen und Events",
        en: "Current / next event",
      }),
      href: "/live/aktuelle-ausstellung",
      description: text(locale, {
        de: "Laufende und kommende Programmpunkte im BOA Bunker of Art: Ausstellungen, Konzerte und Begegnungen in Aachen.",
        en: "Current and upcoming programme highlights at the BOA Bunker of Art: exhibitions, concerts, and encounters in Aachen.",
      }),
      meta: text(locale, { de: "Aktuell", en: "Current" }),
    },
    {
      title: text(locale, {
        de: "Laufende Formate",
        en: "Ongoing formats",
      }),
      href: "/live",
      description: text(locale, {
        de: "Total Local, Kunstroute, offene Sessions und wiederkehrende Kulturformate für die Aachener Szene.",
        en: "Total Local, Kunstroute, open sessions, and recurring cultural formats for the Aachen scene.",
      }),
      meta: text(locale, { de: "Aktuell", en: "Current" }),
    },
    {
      title: text(locale, {
        de: "Vergangene Events",
        en: "Past events",
      }),
      href: "/live/events",
      description: text(locale, {
        de: "Ausstellungen, Konzerte, Aftershows als editierter Rückblick",
        en: "Exhibitions, concerts, and aftershows as an edited retrospective",
      }),
      meta: text(locale, { de: "Chronik", en: "Chronicle" }),
    },
    {
      title: text(locale, {
        de: "Workshops",
        en: "Workshops",
      }),
      href: "/live/workshops",
      description: text(locale, {
        de: "Workshops zu Kunst, Musik, Fotografie, DJ-Kultur und Community-Praxis mit niedrigschwelligem Zugang.",
        en: "Workshops on art, music, photography, DJ culture, and community practice with low-threshold access.",
      }),
      meta: text(locale, { de: "Praxis", en: "Practice" }),
    },
  ];
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
        de: "Arbeiten, Texte und Projektspuren aus Ausstellungen im BOA Bunker of Art und der freien Kulturszene Aachen.",
        en: "Works, texts, and project traces from exhibitions since the early BOA years",
      }),
      meta: text(locale, { de: "Archiv", en: "Archive" }),
    },
    {
      title: text(locale, {
        de: "Poster",
        en: "Posters",
      }),
      href: "/archive/poster",
      description: text(locale, {
        de: "Plakate, visuelle Kampagnen und grafische Spuren vergangener Ausstellungen, Konzerte und Workshops.",
        en: "Posters, visual campaigns, and graphic traces of past exhibitions, concerts, and workshops.",
      }),
      meta: text(locale, { de: "Glossar", en: "Glossary" }),
    },
  ];
}

function getLabelEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "The Base Records", en: "The Base Records" }),
      href: "/label",
      description: text(locale, {
        de: "Elektronische Musik, Releases und Soundexperimente aus dem Umfeld des Bunker of Art.",
        en: "Electronic music, releases, and sound experiments from the Bunker of Art context.",
      }),
      meta: text(locale, { de: "Sound", en: "Sound" }),
    },
    {
      title: text(locale, { de: "Releases", en: "Releases" }),
      href: "/label/releases",
      description: text(locale, {
        de: "Aktuelle und bisherige Veröffentlichungen mit Credits, Kontext und Verbindung zum Live-Programm.",
        en: "Current and past releases with credits, context, and links to the live programme.",
      }),
      meta: text(locale, { de: "Produktion", en: "Production" }),
    },
  ];
}

function getTalentEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Künstler:innen", en: "Artists" }),
      href: "/people/kuenstlerinnen",
      description: text(locale, {
        de: "Positionen aus Ausstellung, Installation, Performance und interdisziplinärer Produktion.",
        en: "Positions from exhibition, installation, performance, and interdisciplinary production.",
      }),
      meta: text(locale, { de: "Artists", en: "Artists" }),
    },
    {
      title: "DJs",
      href: "/people/djs",
      description: text(locale, {
        de: "Resident- und Gast-DJs aus der elektronischen Szene rund um Aachen und darüber hinaus.",
        en: "Resident and guest DJs from the electronic scene around Aachen and beyond.",
      }),
      meta: text(locale, { de: "Sound", en: "Sound" }),
    },
    {
      title: text(locale, { de: "Mitwirkende", en: "Contributors" }),
      href: "/people",
      description: text(locale, {
        de: "Community-Arbeit, Kurator:innen, Technik und freiwillige Teams als Infrastruktur.",
        en: "Community work, curators, technical teams, and volunteers as infrastructure.",
      }),
      meta: text(locale, { de: "Collective", en: "Collective" }),
    },
  ];
}

function getShopEntries(locale: Locale): Entry[] {
  return [
    {
      title: "Prints",
      href: "/shop/prints",
      description: text(locale, {
        de: "Poster, Editionen und Publikationen aus dem visuellen Archiv von The Base.",
        en: "Posters, editions, and publications from the visual archive of The Base.",
      }),
      meta: "Print",
    },
    {
      title: "Merch",
      href: "/shop/merch",
      description: text(locale, {
        de: "Textilien und Objekte aus Kollaborationen, Veranstaltungen und Community-Formaten.",
        en: "Textiles and objects from collaborations, events, and community formats.",
      }),
      meta: text(locale, { de: "Objekt", en: "Object" }),
    },
    {
      title: "Vinyl",
      href: "/shop/vinyl",
      description: text(locale, {
        de: "Physische Releases, Pressungen und Sondereditionen aus dem Label-Umfeld.",
        en: "Physical releases, pressings, and special editions from the label context.",
      }),
      meta: "Audio",
    },
    {
      title: text(locale, { de: "Diverses", en: "Misc" }),
      href: "/shop/diverses",
      description: text(locale, {
        de: "Zines, Sonderobjekte und experimentelle Editionen außerhalb fester Kategorien.",
        en: "Zines, special objects, and experimental editions beyond fixed categories.",
      }),
      meta: text(locale, { de: "Open", en: "Open" }),
    },
  ];
}

function getAboutEntries(locale: Locale): Entry[] {
  return [
    {
      title: "The Base",
      href: "/about/the-base",
      description: text(locale, {
        de: "Entstehung, Leitbild und die Verbindung von Kunst, Musik, Zeitgeschichte und Community.",
        en: "Origins, mission, and the connection between art, music, contemporary history, and community.",
      }),
      meta: "Base",
    },
    {
      title: text(locale, {
        de: "Zum Mitmachen",
        en: "Get involved",
      }),
      href: "/mitmachen",
      description: text(locale, {
        de: "Open Calls, Projektideen und freiwilliges Engagement für Kunst, Musik und Kulturarbeit in Aachen.",
        en: "Artists and culture-interested people can build contacts here, present their work, and grow through exchange with others",
      }),
      meta: text(locale, { de: "Engagement", en: "Engagement" }),
    },
    {
      title: text(locale, {
        de: "Förderer werden",
        en: "Become a supporter",
      }),
      href: "/about/mitmachen",
      description: text(locale, {
        de: "Unterstütze unsere Vorhaben mit einem kleinen oder regelmäßigen Beitrag",
        en: "Support our projects with a small one-time or recurring contribution",
      }),
      meta: text(locale, { de: "Unterstützen", en: "Support" }),
    },
    {
      title: text(locale, { de: "Kontakt", en: "Contact" }),
      href: "/about/kontakt",
      description: text(locale, {
        de: "Adresse, Ansprechpartner:innen und direkte Wege für Programm, Presse und Kooperationen.",
        en: "Address, contact persons, and direct paths for programme, press, and collaborations.",
      }),
      meta: text(locale, { de: "Direct", en: "Direct" }),
    },
  ];
}

function getMediaEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Medienproduktion buchen", en: "Book media production" }),
      href: "/media/buchung",
      description: text(locale, {
        de: "Der Bunker of Art als Ort für Video, Foto, Livestreams, Sessions und hybride Produktionen.",
        en: "The Bunker of Art as a site for video, photo, livestreams, sessions, and hybrid productions.",
      }),
      meta: text(locale, { de: "Booking", en: "Booking" }),
    },
    {
      title: text(locale, { de: "Bisherige Produktionen", en: "Past productions" }),
      href: "/media/produktionen",
      description: text(locale, {
        de: "Ausgewählte Medienarbeiten, Mitschnitte, Sessions und Produktionen aus dem BOA-Kontext.",
        en: "Selected media works, recordings, sessions, and productions from the BOA context.",
      }),
      meta: text(locale, { de: "Portfolio", en: "Portfolio" }),
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
      de: "Verbindet diverse Kulturformen statt klassischer Spartentrennung",
      en: "Connects diverse cultural forms instead of following traditional genre boundaries",
    }),
    text(locale, {
      de: "Bietet Raum für Experimente, Vernetzung und kulturellen Austausch",
      en: "Creates space for experimentation, networking, and cultural exchange",
    }),
  ];
}

export default async function HomePage() {
  const locale = await getLocale();
  const eventEntries = getEventEntries(locale);
  const archiveEntries = getArchiveEntries(locale);
  const labelEntries = getLabelEntries(locale);
  const talentEntries = getTalentEntries(locale);
  const mediaEntries = getMediaEntries(locale);
  const shopEntries = getShopEntries(locale);
  const aboutEntries = getAboutEntries(locale);
  const milestones = getMilestones(locale);

  return (
    <div className="editorial-fade page-flow">
      <header className="grid gap-2 pb-5 pt-2 md:gap-2.5 md:pb-6 md:pt-4">
        <p className="type-meta text-[var(--muted)]">
          {text(locale, { de: "Kulturzentrum in Aachen", en: "Cultural center in Aachen" })}
        </p>
        <h1 className="type-display-hero max-w-none text-[var(--ink)]">
          {text(locale, {
            de: "Ausstellungen, Konzerte und Workshops im Bunker of Art",
            en: "Exhibitions, concerts, and workshops at the Bunker of Art",
          })}
        </h1>
        <p className="type-body-lg max-w-none text-[var(--ink)]">
          {text(locale, {
            de: "The Base e.V. ist eine offene Kulturplattform in Aachen für zeitgenössische Kunst, elektronische Musik, Archivarbeit und Community-Formate.",
            en: "The Base e.V. is an open cultural platform in Aachen for contemporary art, electronic music, archive work, and community formats.",
          })}
        </p>
      </header>

      <section className="ink-panel grid gap-5 rounded-sm px-4 py-5 sm:px-5 md:px-7 md:py-8 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.35fr)]">
        <div className="space-y-2">
          <p className="type-meta text-zinc-300">The Base e.V.</p>
          <h2 className="type-display-section max-w-[15ch] leading-[1.02] md:max-w-[17ch]">
            {text(locale, {
              de: "Plattform für die Aachener Kunstszene und internationale Positionen",
              en: "Platform for the Aachen art scene and beyond",
            })}
          </h2>
        </div>
        <div className="space-y-3">
          <p className="type-body-lg max-w-4xl text-zinc-200">
            {text(locale, {
              de: "The Base versteht den ehemaligen Bunker nicht als Kulisse, sondern als aktiven sozialen und kulturellen Raum. Zwischen Ausstellungen, Konzerten, Workshops und Labelarbeit entsteht ein Ort, der Menschen, Szenen und Ideen in Aachen zusammenführt.",
              en: "The Base does not treat the former bunker as a backdrop, but as an active social and cultural space. Between exhibitions, concerts, and workshops, a place emerges that brings people and scenes together",
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
        eyebrow={text(locale, { de: "Live", en: "Live" })}
        title={text(locale, { de: "Events", en: "Events" })}
        description={text(locale, {
          de: "Aktuelle Ausstellungen, kommende Konzerte, Workshops und dokumentierte Veranstaltungen in Aachen.",
          en: "Next event, ongoing formats, and past events",
        })}
      >
        {eventEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={text(locale, { de: "Archive", en: "Archive" })}
        title={text(locale, { de: "Archiv", en: "Archive" })}
        description={text(locale, {
          de: "Kunstkatalog, Poster-Archiv und Projekttexte als digitales Gedächtnis der Base.",
          en: "Curated material. Project traces, posters, and project texts",
        })}
      >
        {archiveEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Label"
        title="The Base Records"
        description={text(locale, {
          de: "Releases, Artists und Sound-Dokumentation aus dem Netzwerk von The Base.",
          en: "Releases, artists, and sound documentation from The Base network.",
        })}
      >
        {labelEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Talents"
        title={text(locale, { de: "Künstler:innen, DJs und Mitwirkende", en: "Artists, DJs, and contributors" })}
        description={text(locale, {
          de: "Profile, Sets und Rollen der Menschen, die den Ort bespielen und weiterentwickeln.",
          en: "Profiles, sets, and roles of the people who activate and develop the space.",
        })}
      >
        {talentEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Media"
        title={text(locale, { de: "Medienproduktion im Bunker of Art", en: "Media production at the Bunker of Art" })}
        description={text(locale, {
          de: "Raum, Atmosphäre und Infrastruktur für Produktionen sowie dokumentierte Medienarbeiten.",
          en: "Space, atmosphere, and infrastructure for productions plus documented media work.",
        })}
      >
        {mediaEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Shop"
        title={text(locale, { de: "Prints, Merch, Vinyl und Editionen", en: "Prints, merch, vinyl, and editions" })}
        description={text(locale, {
          de: "Editionen und Objekte aus Kunst, Musik, Archiv und Community.",
          en: "Editions and objects from art, music, archive, and community.",
        })}
      >
        {shopEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="About"
        title={text(locale, { de: "Verein, Engagement und Kontakt", en: "Association, engagement, and contact" })}
        description={text(locale, {
          de: "Geschichte, Haltung, Mitmachmöglichkeiten und direkte Wege zur Base.",
          en: "History, position, ways to get involved, and direct contact paths.",
        })}
      >
        {aboutEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

    </div>
  );
}
