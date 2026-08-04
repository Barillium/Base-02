import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { SupportMembershipForm } from "@/components/SupportMembershipForm";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { STATIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityStaticPage } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Fördermitgliedschaft bei The Base e.V. in Aachen",
  description:
    "Fördermitgliedschaft bei The Base e.V. Aachen: Informationen zur unterstützenden Mitgliedschaft und Anfrageformular für Menschen und Organisationen, die die Arbeit des Vereins tragen möchten.",
  path: "/about/foerdermitgliedschaft",
});

function getMembershipPoints(locale: Locale): string[] {
  return [
    text(locale, {
      de: "Fördermitglied können volljährige natürliche Personen und juristische Personen werden.",
      en: "Support membership is open to adult natural persons and legal entities.",
    }),
    text(locale, {
      de: "Die Unterstützung erfolgt über einen regelmäßigen Beitrag, wahlweise monatlich oder jährlich.",
      en: "Support is provided through a recurring contribution, either monthly or yearly.",
    }),
    text(locale, {
      de: "Die Höhe des Förderbeitrags ist frei bestimmbar; für Beiträge an den gemeinnützigen Verein kann eine Zuwendungsbestätigung ausgestellt werden.",
      en: "The amount of the support contribution can be chosen freely; a donation receipt can be issued for contributions to the non-profit association.",
    }),
    text(locale, {
      de: "Mit der Aufnahme werden Satzung und Ordnungen in ihrer jeweils gültigen Fassung anerkannt.",
      en: "Admission includes acceptance of the statutes and regulations in their current version.",
    }),
    text(locale, {
      de: "Eine Fördermitgliedschaft beinhaltet kein Stimm- und Wahlrecht; dieses ist laut Satzung aktiven Mitgliedern und Vorstandsmitgliedern vorbehalten.",
      en: "Support membership does not include voting rights; according to the statutes, these are reserved for active members and board members.",
    }),
  ];
}

export default async function SupportMembershipPage() {
  const locale = await getLocale();
  const page = await maybeSanityFetch<SanityStaticPage>({
    query: STATIC_PAGE_QUERY,
    params: { locale, routeKey: "about-foerdermitgliedschaft" },
    tags: ["staticPage", "about"],
    revalidate: 300,
  });
  const membershipPoints = page?.keyPoints?.length ? page.keyPoints : getMembershipPoints(locale);

  return (
    <div className="editorial-fade page-flow-compact">
      <PageIntro
        eyebrow={page?.eyebrow ?? "About"}
        title={page?.title ?? text(locale, { de: "Fördermitglied werden", en: "Become a supporting member" })}
        titleLines={splitDisplayTitle(page?.displayTitle) ?? [
          text(locale, { de: "Fördermitglied", en: "Become a" }),
          text(locale, { de: "werden", en: "supporting member" }),
        ]}
        description={
          page?.description ??
          text(locale, {
            de: "Diese Seite richtet sich an Menschen und Organisationen, die die Arbeit von The Base e.V. in Aachen als Fördermitglied dauerhaft mittragen möchten.",
            en: "This page is for people and organisations who want to support the work of The Base e.V. in Aachen as supporting members over time.",
          })
        }
        note={
          page?.note ??
          text(locale, {
            de: "Die Angaben orientieren sich an der Satzung des Vereins und bündeln die grundlegenden Schritte für eine Anfrage zur Fördermitgliedschaft.",
            en: "The information follows the association's statutes and outlines the basic steps for a support membership request.",
          })
        }
        layout={page?.introLayout}
        className="layout-about-intro"
        titleClassName="max-w-[14ch] md:max-w-[14.4ch] lg:max-w-[11.2ch] lg:text-[clamp(2.42rem,3.04vw,3rem)] xl:max-w-[12ch] xl:text-[clamp(2.62rem,3.18vw,3.16rem)]"
        rightClassName="lg:max-w-[44rem] lg:pt-4"
      />

      <section className="content-grid layout-about-section pt-1 md:pt-3">
        <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
          <p className="type-display-card max-w-[10.4ch] text-[var(--ink)] md:max-w-[11.2ch] lg:max-w-[8.9ch]">
            {text(locale, { de: "Satzungsrahmen", en: "Statutory basis" })}
          </p>
        </div>
        <div className="content-stack min-w-0 lg:max-w-[44rem] lg:pt-2">
          <ul className="editorial-bullet-list type-body-lg text-[var(--ink)]">
            {membershipPoints.map((point) => (
              <li key={point} className="editorial-bullet-item">
                <span className="editorial-bullet-dot" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          {page?.body?.length ? (
            <PortableTextContent
              blocks={page.body}
              layout={page.bodyLayout}
            />
          ) : (
            <p className="type-body text-[var(--muted)]">
              {text(locale, {
                de: "Wenn du eine Fördermitgliedschaft anfragen möchtest, nutze das Formular. Wir melden uns anschließend mit den formalen nächsten Schritten und den relevanten Unterlagen.",
                en: "If you want to request a support membership, use the form below. We will then get back to you with the formal next steps and relevant documents.",
              })}
            </p>
          )}
        </div>
      </section>

      <SupportMembershipForm locale={locale} />
    </div>
  );
}
