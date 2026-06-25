import { MitmachenForm } from "@/components/MitmachenForm";
import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { STATIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityStaticPage } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Open Call bei The Base e.V.: Ausstellungen und Formate in Aachen",
  description:
    "Open Call bei The Base e.V. Aachen: Anfragen für Ausstellungen, ortsspezifische Arbeiten und andere Formate im BOA Bunker of Art.",
  path: "/mitmachen",
});

function getFormats(locale: Locale): string[] {
  return [
    text(locale, {
      de: "Ausstellungen und ortsspezifische Installationen",
      en: "Exhibitions and site-specific installations",
    }),
    text(locale, {
      de: "Konzerte, Live-Sets und Listening-Formate",
      en: "Concerts, live sets, and listening formats",
    }),
    text(locale, {
      de: "Workshops (z. B. Foto, Sound, Vermittlung, Community-Praxis)",
      en: "Workshops (e.g. photo, sound, mediation, community practice)",
    }),
    text(locale, {
      de: "Neue und experimentelle Positionen",
      en: "New and experimental positions",
    }),
  ];
}

export default async function MitmachenPage() {
  const locale = await getLocale();
  const page = await maybeSanityFetch<SanityStaticPage>({
    query: STATIC_PAGE_QUERY,
    params: { locale, routeKey: "mitmachen" },
    tags: ["staticPage", "about"],
    revalidate: 300,
  });
  const formats = page?.keyPoints?.length ? page.keyPoints : getFormats(locale);

  return (
    <div className="editorial-fade page-flow-compact">
      <PageIntro
        eyebrow={page?.eyebrow ?? "About"}
        title={page?.title ?? text(locale, { de: "Open Call", en: "Open call" })}
        titleLines={splitDisplayTitle(page?.displayTitle)}
        description={
          page?.description ??
          text(locale, {
            de: "Diese Seite bündelt Anfragen von Künstler:innen, Kollektiven und Produzent:innen, die Ausstellungen, ortsspezifische Arbeiten oder andere Formate im BOA-Kontext vorschlagen möchten.",
            en: "This page gathers inquiries from artists, collectives, and producers who want to propose exhibitions, site-specific works, or other formats in the BOA context.",
          })
        }
        note={
          page?.note ??
          text(locale, {
            de: "Gesucht sind klare Vorhaben, nachvollziehbare Kontexte und Formate, die den BOA Bunker of Art als offenen Kulturort ernst nehmen.",
            en: "We are looking for clear proposals, legible contexts, and formats that take the BOA Bunker of Art seriously as an open cultural site.",
          })
        }
        layout={page?.introLayout}
        className="layout-mitmachen-intro"
        titleClassName="lg:max-w-[10.2ch] lg:text-[clamp(2.46rem,3.14vw,3.06rem)] xl:max-w-[11ch] xl:text-[clamp(2.66rem,3.28vw,3.28rem)]"
        rightClassName="layout-mitmachen-right-edge lg:max-w-[43rem] lg:pt-4"
      />

      <section className="content-grid layout-about-section">
        <p className="layout-mitmachen-left-offset type-display-card text-[var(--ink)] lg:max-w-[9.4ch] xl:max-w-[10ch]">
          {text(locale, { de: "Programmformate", en: "Programme formats" })}
        </p>
        <ul className="editorial-bullet-list type-body-lg text-[var(--ink)] lg:max-w-[43rem] lg:pt-2">
          {formats.map((format) => (
            <li key={format} className="editorial-bullet-item">
              <span className="editorial-bullet-dot" />
              <span>{format}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-grid layout-about-section pt-2 md:pt-4">
        <div aria-hidden="true" className="hidden lg:block" />
        {page?.body?.length ? (
          <PortableTextContent
            blocks={page.body}
            layout={page.bodyLayout}
            className="layout-mitmachen-right-edge lg:max-w-[43rem] lg:pt-1"
          />
        ) : (
          <p className="layout-mitmachen-right-edge type-body-lg text-[var(--ink)] lg:max-w-[43rem] lg:pt-1">
            {text(locale, {
              de: "Wenn du eine Ausstellung, eine installative Arbeit, ein musikalisches Format oder einen anderen Vorschlag einreichen möchtest, melde dich mit kurzer Beschreibung, Bezug zum Ort und gewünschtem Zeitraum. Wichtig sind ein nachvollziehbares Vorhaben und Offenheit für Zusammenarbeit im kulturellen Kontext der Base.",
              en: "If you want to submit an exhibition, an installation, a musical format, or another proposal, send a short description, its connection to the site, and your preferred time frame. What matters is a legible proposal and openness to collaboration within The Base's cultural context.",
            })}
          </p>
        )}
      </section>

      <MitmachenForm locale={locale} />
    </div>
  );
}
