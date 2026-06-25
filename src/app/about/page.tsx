import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { PageJsonLd } from "@/components/PageJsonLd";
import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  portableTextToTextLines,
  resolveLinkFieldHref,
  resolveLinkedDocumentHref,
  splitDisplayTitle,
} from "@/sanity/lib/content";
import type { SanityAboutPage, SanityTeaserCard } from "@/sanity/types";

const aboutPageMetadata = {
  title: "About The Base e.V. im BOA Bunker of Art Aachen",
  description:
    "About The Base e.V. Aachen: Kulturverein im BOA Bunker of Art mit Profil, Awareness, Engagement und Kontaktwegen.",
  path: "/about",
} as const;

export const metadata = pageMetadata(aboutPageMetadata);

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
  ctaLabel?: string;
};

function getBaseEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Profil und Geschichte", en: "Profile and history" }),
      href: "/about/the-base",
      description: text(locale, {
        de: "Zur Geschichte des Vereins und zur Entwicklung des ehemaligen Bunkers als Kulturort.",
        en: "Context for the association, its history, and the role of the former bunker as a cultural space.",
      }),
      meta: text(locale, { de: "Profil", en: "Profile" }),
    },
  ];
}

function getContributionEntries(locale: Locale): Entry[] {
  return [
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
      title: text(locale, { de: "Fördermitglied werden", en: "Become a supporting member" }),
      href: "/about/foerdermitgliedschaft",
      description: text(locale, {
        de: "Informationen zur Fördermitgliedschaft für Menschen und Organisationen, die die Arbeit des Vereins in Aachen regelmäßig unterstützen möchten.",
        en: "Information on support membership for people and organisations who want to support the association's work in Aachen on a recurring basis.",
      }),
      meta: text(locale, { de: "Unterstützen", en: "Support" }),
    },
  ];
}

function getAwarenessEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Code of Conduct", en: "Code of conduct" }),
      href: "/about/code-of-conduct",
      description: text(locale, {
        de: "Grundsätze für Awareness, respektvolle Räume und diskriminierungssensible Veranstaltungskultur.",
        en: "Principles for awareness, respectful spaces, and discrimination-sensitive event culture.",
      }),
      meta: text(locale, { de: "Leitfaden", en: "Guideline" }),
    },
  ];
}

function resolveTeaserCardEntry(card: SanityTeaserCard): Entry | null {
  const href = resolveLinkFieldHref(card.link) || resolveLinkedDocumentHref(card.linkedDocument) || "";

  if (!href) {
    return null;
  }

  return {
    title: card.title,
    href,
    description: card.description,
    meta: card.meta ?? "",
    ctaLabel: card.ctaLabel,
  };
}

function isEntry(entry: Entry | null): entry is Entry {
  return entry !== null;
}

export default async function AboutPage() {
  const locale = await getLocale();
  const aboutPage = await maybeSanityFetch<SanityAboutPage>({
    query: ABOUT_PAGE_QUERY,
    params: { locale },
    tags: ["aboutPage", "about"],
    revalidate: 300,
  });
  const baseEntries =
    aboutPage?.baseTeaserSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? getBaseEntries(locale);
  const awarenessEntries =
    aboutPage?.awarenessTeaserSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? getAwarenessEntries(locale);
  const contributionEntries =
    aboutPage?.inquiryTeaserSection?.cards?.map(resolveTeaserCardEntry).filter(isEntry) ?? getContributionEntries(locale);
  const introDescription =
    aboutPage?.description ??
    text(locale, {
      de: "The Base e.V. ist ein gemeinnütziger Kulturverein und interdisziplinäres Kollektiv in Aachen. Im BOA Bunker of Art organisiert der Verein einen sozialen und kulturellen Raum für Austausch, künstlerische Praxis und öffentliche Formate.",
      en: "The Base e.V. is a non-profit cultural association and interdisciplinary collective in Aachen. It organises the BOA Bunker of Art as a social and cultural space for exchange, artistic practice, and public formats.",
    });
  const introNote = aboutPage?.note;
  const profileParagraphs = portableTextToTextLines(aboutPage?.profileText).length
    ? portableTextToTextLines(aboutPage?.profileText)
    : [
        text(locale, {
          de: "The Base e.V. wurde 2015 in Aachen gegründet und arbeitet als Kollektiv junger Kulturarbeiter:innen, Gestalter:innen und Organisator:innen mit dem Ziel, unabhängige kulturelle Strukturen vor Ort zu stärken.",
          en: "The Base e.V. was founded in Aachen in 2015 and works as a collective of young cultural practitioners, creatives, and organisers with the aim of strengthening independent cultural structures locally.",
        }),
        text(locale, {
          de: "Ein zentrales Projekt ist BOA, ein seit September 2020 entwickelter Kulturraum in einem ehemaligen Hochbunker, in dem regionale, nationale und internationale Positionen sowie junge und etablierte Praktiker:innen aufeinandertreffen.",
          en: "A central project is BOA, a cultural space developed since September 2020 inside a former bunker, where regional, national, and international positions meet alongside emerging and established practitioners.",
        }),
        text(locale, {
          de: "Im Mittelpunkt stehen offene, niedrigschwellige Formate an der Schnittstelle von Kunst, Musik, Design und sozialer Praxis; der Bunker wird dabei nicht nur genutzt, sondern als historisch und städtisch geprägter Ort bewusst weitergedacht.",
          en: "At its core are open, low-threshold formats at the intersection of art, music, design, and social practice; the bunker is not merely used as a venue, but consciously developed further as a historically and urbanly marked place.",
        }),
      ];

  return (
    <div className="editorial-fade page-flow">
      <PageJsonLd {...aboutPageMetadata} pageType="AboutPage" />

      <PageIntro
        eyebrow={aboutPage?.eyebrow ?? "About"}
        title={aboutPage?.title ?? "The Base e.V. im BOA Bunker of Art"}
        titleLines={splitDisplayTitle(aboutPage?.displayTitle) ?? [
          text(locale, { de: "The Base e.V.", en: "The Base e.V." }),
          text(locale, { de: "im BOA", en: "at the BOA" }),
          text(locale, { de: "Bunker", en: "Bunker" }),
          text(locale, { de: "of Art", en: "of Art" }),
        ]}
        description={introDescription}
        note={introNote}
        layout={aboutPage?.introLayout}
        className="layout-overview-intro"
        titleClassName="about-overview-hero max-w-[11.8ch] md:max-w-[12.6ch] lg:max-w-[15.2ch] lg:text-[clamp(2.28rem,2.74vw,2.82rem)] xl:max-w-[16.2ch] xl:text-[clamp(2.44rem,2.9vw,2.96rem)]"
        rightClassName="layout-overview-copy-start lg:max-w-[46rem] lg:pt-4"
      />

      <section className="content-grid layout-overview-section pt-2 md:pt-4">
        <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
          <Eyebrow>{aboutPage?.profileEyebrow ?? text(locale, { de: "Kurzprofil", en: "Profile" })}</Eyebrow>
          <h2
            aria-label={aboutPage?.profileTitle ?? text(locale, { de: "Kulturort, Verein und Infrastruktur", en: "Site, association, and infrastructure" })}
            className="type-display-section max-w-[14.8ch] text-[clamp(1.18rem,4.06vw,1.56rem)] text-[var(--ink)] md:max-w-[15.4ch] md:text-[clamp(1.48rem,2.82vw,1.88rem)] lg:max-w-[16.8ch] lg:text-[clamp(2.04rem,2.24vw,2.48rem)] xl:max-w-[17.2ch]"
          >
            {(splitDisplayTitle(aboutPage?.profileTitle) ?? [
              text(locale, { de: "Kulturort,", en: "Site," }),
              text(locale, { de: "Verein und", en: "association and" }),
              text(locale, { de: "Infrastruktur", en: "infrastructure" }),
            ]).map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="layout-overview-copy-start content-stack lg:max-w-[44rem] lg:pt-3">
          {aboutPage?.profileText?.length ? (
            <PortableTextContent
              blocks={aboutPage.profileText}
              layout={aboutPage.profileTextLayout}
            />
          ) : (
            profileParagraphs.map((paragraph) => (
              <p key={paragraph} className="type-body-lg max-w-3xl text-[var(--ink)]">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </section>

      <SectionGrid
        eyebrow={aboutPage?.baseTeaserSection?.eyebrow ?? "Base"}
        title={aboutPage?.baseTeaserSection?.title ?? "The Base"}
        titleLines={splitDisplayTitle(aboutPage?.baseTeaserSection?.displayTitle) ?? [text(locale, { de: "The Base", en: "The Base" })]}
        description={aboutPage?.baseTeaserSection?.description ?? text(locale, {
          de: "Zur Geschichte des Vereins und zur Rolle des Bunkers als kulturelle und soziale Infrastruktur in Aachen.",
          en: "For everyone who wants to understand why the bunker continues as social and cultural infrastructure.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {baseEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={aboutPage?.inquiryTeaserSection?.eyebrow ?? "About"}
        title={aboutPage?.inquiryTeaserSection?.title ?? text(locale, { de: "Anfragen", en: "Inquiries" })}
        titleLines={splitDisplayTitle(aboutPage?.inquiryTeaserSection?.displayTitle) ?? [text(locale, { de: "Anfragen", en: "Inquiries" })]}
        description={aboutPage?.inquiryTeaserSection?.description ?? text(locale, {
          de: "Für Ausstellungsvorschläge, andere Formate und Menschen, die den Ort ideell oder finanziell unterstützen möchten.",
          en: "For exhibition proposals, artistic formats, open calls, and people who want to support the site ideologically or financially.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {contributionEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow={aboutPage?.awarenessTeaserSection?.eyebrow ?? "Safe Space"}
        title={aboutPage?.awarenessTeaserSection?.title ?? "Awareness"}
        titleLines={splitDisplayTitle(aboutPage?.awarenessTeaserSection?.displayTitle) ?? [text(locale, { de: "Awareness", en: "Awareness" })]}
        description={aboutPage?.awarenessTeaserSection?.description ?? text(locale, {
          de: "Für Grundsätze, die Publikum, Teams und Beteiligten im gemeinsamen Raum Orientierung geben.",
          en: "For principles that orient events, teams, and audience within the shared space.",
        })}
        className="layout-overview-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {awarenessEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} ctaLabel={entry.ctaLabel} />
        ))}
      </SectionGrid>
    </div>
  );
}
