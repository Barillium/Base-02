import { PortableTextContent } from "@/components/PortableTextContent";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { STATIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityStaticPage } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "The Base e.V.: Kulturplattform im BOA Bunker of Art Aachen",
  description:
    "Profil von The Base e.V. Aachen: Kulturplattform im BOA Bunker of Art für Kunst, Musik, Archivarbeit und Community-Projekte.",
  path: "/about/the-base",
});

function getPrinciples(locale: Locale): string[] {
  return [
    text(locale, {
      de: "Kulturplattform im ehemaligen Bunker an der Scheibenstraße 34 in Aachen.",
      en: "Cultural platform in the former bunker at Scheibenstraße 34 in Aachen.",
    }),
    text(locale, {
      de: "Verbindet Kunst, Musik und kulturelle Praxis statt enger Spartentrennung.",
      en: "Connects art, music, and cultural practice beyond narrow category boundaries.",
    }),
    text(locale, {
      de: "Arbeitet mit Künstler:innen, Musiker:innen und Initiativen in offenen Formaten.",
      en: "Works with artists, musicians, and initiatives in open formats.",
    }),
    text(locale, {
      de: "Denkt den Raum als soziale Infrastruktur, nicht nur als Event-Location.",
      en: "Treats the space as social infrastructure, not only as an event location.",
    }),
    text(locale, {
      de: "Schafft Begegnung zwischen Menschen unterschiedlicher Hintergründe und kultureller Zusammenhänge.",
      en: "Creates encounters between people from different backgrounds and cultural contexts.",
    }),
  ];
}

export default async function TheBasePage() {
  const locale = await getLocale();
  const page = await maybeSanityFetch<SanityStaticPage>({
    query: STATIC_PAGE_QUERY,
    params: { locale, routeKey: "about-the-base" },
    tags: ["staticPage", "about"],
    revalidate: 300,
  });
  const principles = page?.keyPoints?.length ? page.keyPoints : getPrinciples(locale);
  const title = page?.title ?? "The Base";
  const titleLines = splitDisplayTitle(page?.displayTitle) ?? [title];
  const description =
    page?.description ??
    text(locale, {
      de: "The Base e.V. entwickelt den BOA Bunker of Art in Aachen als Kulturplattform, in der Ausstellungen, Konzerte, Workshops, Archiv und Community zusammenlaufen.",
      en: "The Base e.V. develops the BOA Bunker of Art in Aachen as a cultural platform where exhibitions, concerts, workshops, archive practice, and community converge.",
    });
  const note =
    page?.note ??
    text(locale, {
      de: "Im Mittelpunkt stehen die Förderung kultureller Projekte, offene Formate und die Begegnung unterschiedlicher Menschen und Szenen in Aachen.",
      en: "At the centre are the promotion of cultural projects, open formats, and the encounter of different people and scenes in Aachen.",
    });
  return (
    <div className="editorial-fade page-flow-compact">
      <section className="content-grid about-base-intro-grid">
        <div className="content-stack-tight min-w-0">
          <h1
            aria-label={titleLines.length > 1 ? title : undefined}
            className="type-display-hero max-w-[11ch] text-[var(--ink)] md:max-w-[12ch] lg:max-w-[9.6ch] lg:text-[clamp(2.34rem,2.92vw,2.88rem)] xl:max-w-[10.4ch] xl:text-[clamp(2.5rem,3.04vw,3.04rem)]"
          >
            {titleLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="about-base-copy-column content-stack-tight min-w-0 lg:max-w-[42rem] lg:pt-2 xl:max-w-[44rem]">
          <p className="type-body-lg max-w-[42rem] text-[var(--ink)] xl:max-w-[44rem]">{description}</p>
          <p className="type-body max-w-[42rem] text-[var(--muted)] xl:max-w-[44rem]">{note}</p>
        </div>

        <div className="min-w-0 pt-0.5 lg:pt-2">
          <p
            aria-label={text(locale, { de: "Seit der Kunstroute 2020 im BOA", en: "Since Kunstroute 2020 at BOA" })}
            className="type-title font-display max-w-[14ch] uppercase leading-[0.92] text-[var(--ink)] lg:max-w-[12.4ch] xl:max-w-[13.2ch]"
          >
            {(locale === "de"
              ? ["Seit der", "Kunstroute 2020", "im BOA"]
              : ["Since Kunstroute", "2020 at BOA"]
            ).map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="about-base-copy-column grid min-w-0 gap-4 text-[var(--ink)] md:gap-5 lg:max-w-[42rem] xl:max-w-[44rem]">
          {page?.body?.length ? (
            <PortableTextContent blocks={page.body} layout={page.bodyLayout} />
          ) : (
            <>
              <p className="type-body max-w-[42rem] xl:max-w-[44rem]">
                {text(locale, {
                  de: "Der geschichtsträchtige Bunker wird nicht überdeckt, sondern bewusst als realer Kontext genutzt. Die Gemeinschaft füllt den Ort mit Ausstellungen, Konzerten, Open Calls, Workshops und kollaborativen Produktionen.",
                  en: "The historical bunker is not concealed but intentionally used as a real context. The community fills the space with exhibitions, concerts, open calls, workshops, and collaborative productions.",
                })}
              </p>
              <p className="type-body max-w-[42rem] xl:max-w-[44rem]">
                {text(locale, {
                  de: "Ziel ist es, unterschiedliche kulturelle Positionen und Interessierte zusammenzubringen, Netzwerke zu stärken und kreative Impulse in eine langfristige kulturelle Infrastruktur zu überführen.",
                  en: "The goal is to bring together different cultural positions and interested people, strengthen networks, and turn creative impulses into long-term cultural infrastructure.",
                })}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="ink-panel full-bleed-panel about-base-principles-panel px-6 py-8 md:px-8 md:py-10 lg:mt-1">
        <p className="type-meta mb-4 text-zinc-400">{text(locale, { de: "Leitlinien", en: "Principles" })}</p>
        <ul className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle} className="type-body flex gap-3 text-zinc-200">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
