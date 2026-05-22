import { Card } from "@/components/Card";
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
        description={text(locale, {
          de: "About erklärt, wie The Base e.V. den BOA Bunker of Art in Aachen als Kulturort organisiert: Verein, Haltung, Awareness, Engagement und direkte Kontaktwege.",
          en: "About explains how The Base e.V. organises the BOA Bunker of Art as a cultural site: association, position, awareness, engagement, and direct contact paths.",
        })}
        className="lg:grid-cols-[minmax(22rem,0.95fr)_minmax(0,1.35fr)] xl:grid-cols-[minmax(24rem,0.88fr)_minmax(0,1.48fr)]"
        titleClassName="lg:max-w-[11ch] lg:text-[clamp(2.75rem,4vw,3.55rem)] xl:max-w-[12ch] xl:text-[clamp(3rem,4.3vw,3.9rem)]"
        rightClassName="lg:pt-4"
      />

      <section className="content-grid pt-2 md:pt-4 lg:grid-cols-[minmax(22rem,0.95fr)_minmax(0,1.35fr)] xl:grid-cols-[minmax(24rem,0.88fr)_minmax(0,1.48fr)]">
        <div className="content-stack-tight">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kurzprofil", en: "Profile" })}</p>
          <h2 className="type-display-section max-w-[14ch] text-[var(--ink)] lg:max-w-[11ch] xl:max-w-[12ch]">
            {text(locale, { de: "Kulturort, Verein und Infrastruktur", en: "Site, association, and infrastructure" })}
          </h2>
        </div>
        <div className="content-stack lg:max-w-3xl">
          <p className="type-body-lg max-w-3xl text-[var(--ink)]">
            {text(locale, {
              de: "The Base e.V. versteht den BOA Bunker of Art seit der Kunstroute 2020 als lebendige Kulturinfrastruktur in Aachen: ein Ort, an dem Ausstellungen, Konzerte, Workshops, Labelarbeit und Archiv zusammenlaufen.",
              en: "Since Kunstroute 2020, The Base e.V. sees the BOA Bunker of Art as a living cultural infrastructure in Aachen: a place where exhibitions, concerts, workshops, label work, and archive practices converge.",
            })}
          </p>
          <p className="type-body max-w-3xl text-[var(--muted)]">
            {text(locale, {
              de: "Im Mittelpunkt stehen Kollaboration, Sichtbarkeit für nicht etablierte Stimmen und eine Community, die den Raum gemeinsam weiterentwickelt.",
              en: "At its core are collaboration, visibility for emerging voices, and a community that develops the space together.",
            })}
          </p>
        </div>
      </section>

      <SectionGrid
        eyebrow="Base"
        title="The Base"
        description={text(locale, {
          de: "Für alle, die verstehen wollen, warum der Bunker als soziale und kulturelle Infrastruktur weiterlebt.",
          en: "For everyone who wants to understand why the bunker continues as social and cultural infrastructure.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {baseEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="About"
        title={text(locale, { de: "Engagement", en: "Engagement" })}
        description={text(locale, {
          de: "Für konkrete Wege, selbst Teil der Plattform zu werden oder sie zu unterstützen.",
          en: "For concrete ways to become part of the platform or support it.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {contributionEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Safe Space"
        title="Awareness"
        description={text(locale, {
          de: "Für Grundsätze, die Veranstaltungen, Teams und Publikum im gemeinsamen Raum orientieren.",
          en: "For principles that orient events, teams, and audience within the shared space.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {awarenessEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>

      <SectionGrid
        eyebrow="Direct"
        title={text(locale, { de: "Kontakt", en: "Contact" })}
        description={text(locale, {
          de: "Für schnelle Orientierung zu Adresse, Mailkontakt, Social Links und passenden Anliegen.",
          en: "For quick orientation around address, email contact, social links, and the right enquiry type.",
        })}
        className="lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.7fr)] xl:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.82fr)]"
        contentClassName="lg:pt-2"
      >
        {contactEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
