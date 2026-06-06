import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About The Base e.V. im BOA Bunker of Art Aachen",
  description:
    "About The Base e.V. Aachen: Kulturverein im BOA Bunker of Art mit Profil, Awareness, Engagement und Kontaktwegen.",
  path: "/about",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getBaseEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Profil und Geschichte", en: "Profile and history" }),
      href: "/about/the-base",
      description: text(locale, {
        de: "Einordnung des Vereins, seiner Geschichte und der Rolle des ehemaligen Bunkers als Kulturraum.",
        en: "Context for the association, its history, and the role of the former bunker as a cultural space.",
      }),
      meta: text(locale, { de: "Profil", en: "Profile" }),
    },
  ];
}

function getContributionEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Zum Mitmachen", en: "Get involved" }),
      href: "/mitmachen",
      description: text(locale, {
        de: "Wege für Projektideen, Open Calls, Workshops und freiwilliges Engagement bei The Base.",
        en: "Paths for project ideas, open calls, workshops, and voluntary engagement at The Base.",
      }),
      meta: text(locale, { de: "Engagement", en: "Engagement" }),
    },
    {
      title: text(locale, { de: "Förderer werden", en: "Become a supporter" }),
      href: "/about/mitmachen",
      description: text(locale, {
        de: "Informationen für Menschen, die Kulturarbeit in Aachen finanziell oder ideell unterstützen möchten.",
        en: "Information for people who want to support cultural work in Aachen financially or ideologically.",
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

function getContactEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Ansprechpersonen und Wege", en: "Contacts and access" }),
      href: "/about/kontakt",
      description: text(locale, {
        de: "Kontakt für Programm, Presse, Kooperationen, Raumfragen und allgemeine Anliegen.",
        en: "Contact for programme, press, collaborations, space requests, and general enquiries.",
      }),
      meta: text(locale, { de: "Kontakt", en: "Contact" }),
    },
  ];
}

export default async function AboutPage() {
  const locale = await getLocale();
  const baseEntries = getBaseEntries(locale);
  const awarenessEntries = getAwarenessEntries(locale);
  const contributionEntries = getContributionEntries(locale);
  const contactEntries = getContactEntries(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="About"
        title="The Base e.V. im BOA Bunker of Art"
        titleLines={[
          text(locale, { de: "The Base e.V.", en: "The Base e.V." }),
          text(locale, { de: "im BOA Bunker", en: "at the BOA Bunker" }),
          text(locale, { de: "of Art", en: "of Art" }),
        ]}
        description={text(locale, {
          de: "About erklärt, wie The Base e.V. den BOA Bunker of Art als Verein, Kulturort und soziale Infrastruktur organisiert: mit Haltung, Awareness, Engagement und direkten Kontaktwegen.",
          en: "About explains how The Base e.V. organises the BOA Bunker of Art as a cultural site: association, position, awareness, engagement, and direct contact paths.",
        })}
        className="layout-editorial-intro"
        titleClassName="max-w-[13.6ch] md:max-w-[13.8ch] lg:max-w-[15.2ch] lg:text-[clamp(2.52rem,3.06vw,3.08rem)] xl:max-w-[16.2ch] xl:text-[clamp(2.74rem,3.28vw,3.3rem)]"
        rightClassName="lg:max-w-[46rem] lg:pt-4"
      />

      <section className="content-grid layout-editorial-section pt-2 md:pt-4">
        <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
          <Eyebrow>{text(locale, { de: "Kurzprofil", en: "Profile" })}</Eyebrow>
          <h2
            aria-label={text(locale, { de: "Kulturort, Verein und Infrastruktur", en: "Site, association, and infrastructure" })}
            className="type-display-section max-w-[14.8ch] text-[clamp(1.24rem,4.3vw,1.64rem)] text-[var(--ink)] md:max-w-[15.4ch] md:text-[clamp(1.58rem,3.05vw,2rem)] lg:max-w-[16.8ch] lg:text-[clamp(2.18rem,2.42vw,2.7rem)] xl:max-w-[17.2ch]"
          >
            <span className="block whitespace-nowrap">{text(locale, { de: "Kulturort,", en: "Site," })}</span>
            <span className="block whitespace-nowrap">{text(locale, { de: "Verein und", en: "association and" })}</span>
            <span className="block whitespace-nowrap">{text(locale, { de: "Infrastruktur", en: "infrastructure" })}</span>
          </h2>
        </div>
        <div className="content-stack lg:max-w-[44rem] lg:pt-3">
          <p className="type-body-lg max-w-3xl text-[var(--ink)]">
            {text(locale, {
              de: "The Base e.V. versteht den BOA Bunker of Art seit der Kunstroute 2020 als lebendige Kulturinfrastruktur in Aachen: ein Ort, an dem Ausstellungen, Konzerte, Workshops, Labelarbeit und Archiv zusammenlaufen.",
              en: "Since Kunstroute 2020, The Base e.V. sees the BOA Bunker of Art as a living cultural infrastructure in Aachen: a place where exhibitions, concerts, workshops, label work, and archive practices converge.",
            })}
          </p>
          <p className="type-body max-w-3xl text-[var(--muted)]">
            {text(locale, {
              de: "Im Mittelpunkt stehen Kollaboration, Sichtbarkeit fuer nicht etablierte Stimmen und ein Verstaendnis von Kultur, das Ausstellung, musikalisches Programm, Labelarbeit und Community nicht voneinander trennt.",
              en: "At its core are collaboration, visibility for emerging voices, and a community that develops the space together.",
            })}
          </p>
        </div>
      </section>

      <SectionGrid
        eyebrow="Base"
        title="The Base"
        titleLines={[text(locale, { de: "The Base", en: "The Base" })]}
        description={text(locale, {
          de: "Für alle, die verstehen wollen, warum der Bunker als soziale und kulturelle Infrastruktur weiterlebt.",
          en: "For everyone who wants to understand why the bunker continues as social and cultural infrastructure.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {baseEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="About"
        title={text(locale, { de: "Engagement", en: "Engagement" })}
        titleLines={[text(locale, { de: "Engagement", en: "Engagement" })]}
        description={text(locale, {
          de: "Für konkrete Wege, sich mit Projektideen, Open Calls, freiwilliger Arbeit oder finanzieller Unterstützung einzubringen.",
          en: "For concrete ways to become part of the platform or support it.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {contributionEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Safe Space"
        title="Awareness"
        titleLines={[text(locale, { de: "Awareness", en: "Awareness" })]}
        description={text(locale, {
          de: "Für Grundsätze, die Veranstaltungen, Teams und Publikum im gemeinsamen Raum orientieren.",
          en: "For principles that orient events, teams, and audience within the shared space.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {awarenessEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Direct"
        title={text(locale, { de: "Kontakt", en: "Contact" })}
        titleLines={[text(locale, { de: "Kontakt", en: "Contact" })]}
        description={text(locale, {
          de: "Für schnelle Orientierung zu Adresse, Mailkontakt, Social Links und passenden Anliegen.",
          en: "For quick orientation around address, email contact, social links, and the right enquiry type.",
        })}
        className="layout-editorial-section"
        titleClassName="lg:max-w-[13.2ch] xl:max-w-[14ch]"
        contentClassName="lg:pt-3"
      >
        {contactEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
