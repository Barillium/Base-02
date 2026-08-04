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
      de: "Kulturplattform im ehemaligen Hochbunker an der Scheibenstraße 34 in Aachen.",
      en: "Cultural platform in the former air-raid bunker at Scheibenstraße 34 in Aachen.",
    }),
    text(locale, {
      de: "Seit 2015 aus kollektiver Praxis gewachsen und seit der Kunstroute 2020 im BOA verankert.",
      en: "Grown out of collective practice since 2015 and anchored in BOA since the 2020 Kunstroute.",
    }),
    text(locale, {
      de: "Verbindet Ausstellung, Konzert, Workshop, Film, Archiv und Nachbarschaftsprojekte statt enger Spartentrennung.",
      en: "Connects exhibitions, concerts, workshops, film, archive work, and neighbourhood projects instead of narrow categories.",
    }),
    text(locale, {
      de: "Arbeitet mit Künstler:innen, Musiker:innen, Studierenden, Initiativen und zivilgesellschaftlichen Partnern.",
      en: "Works with artists, musicians, students, initiatives, and civil-society partners.",
    }),
    text(locale, {
      de: "Behandelt den Bunker als historischen Ort und kulturelle Infrastruktur zugleich.",
      en: "Treats the bunker as a historical site and cultural infrastructure at the same time.",
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
      de: "The Base e.V. entwickelt den BOA Bunker of Art in Aachen seit der Kunstroute 2020 als Kulturplattform, in der Ausstellungen, Konzerte, Workshops, Film, Archivarbeit und Community zusammenlaufen.",
      en: "Since the Kunstroute in 2020, The Base e.V. has been developing the BOA Bunker of Art in Aachen as a cultural platform where exhibitions, concerts, workshops, film, archive work, and community converge.",
    });
  const note =
    page?.note ??
    text(locale, {
      de: "Aus improvisierten, nomadischen Jahren ist ein Ort entstanden, der kulturelle Praxis mit Stadtgeschichte, Nachbarschaft und dauerhafter Infrastruktur verbindet.",
      en: "Out of improvised, nomadic years, a site has emerged that links cultural practice with urban history, neighbourhood life, and durable infrastructure.",
    });
  return (
    <div className="editorial-fade page-flow-compact about-base-flow">
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

        <div className="min-w-0 pt-0 lg:pt-1">
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
                  de: "The Base entstand 2015 aus informellen, zunächst prekären Räumen und arbeitete danach mehrere Jahre nomadisch weiter. Reihen wie Voidspace, Kleinstadtecho, Parking:Art oder die Beteiligung an der Krachparade bauten Netzwerke auf und schärften das Interesse an dauerhaften Freiräumen in Aachen.",
                  en: "The Base emerged in 2015 from informal and initially precarious spaces and then continued nomadically for several years. Series such as Voidspace, Kleinstadtecho, Parking:Art, and the involvement in Krachparade built networks and sharpened the search for durable free spaces in Aachen.",
                })}
              </p>
              <p className="type-body max-w-[42rem] xl:max-w-[44rem]">
                {text(locale, {
                  de: "Mit dem Bunker an der Scheibenstraße fand der Verein 2020 einen Ort, an dem unterschiedliche Formate unter einem Dach zusammenkommen konnten. BOA ist seither Ausstellungsraum, Konzertort, Workshop- und Produktionskontext, Treffpunkt und Infrastruktur für jüngere Organisator:innen.",
                  en: "With the bunker on Scheibenstraße, the association found a place in 2020 where different formats could come together under one roof. Since then, BOA has served as exhibition space, concert venue, workshop and production context, meeting point, and infrastructure for younger organisers.",
                })}
              </p>
              <p className="type-body max-w-[42rem] xl:max-w-[44rem]">
                {text(locale, {
                  de: "Beispiele wie COMMON GROUND von Nathalie Bertrams, Viertelfoto, die DJ-Workshopreihe für Frauen, Concrete Garden / Odd Emotions oder Schutzraum mit der FH Aachen zeigen, wie künstlerische, soziale und bildungsbezogene Arbeit hier ineinandergreifen. Der Bunker wird dabei nicht überdeckt, sondern als historischer Ort bewusst mitgedacht.",
                  en: "Examples such as COMMON GROUND by Nathalie Bertrams, Viertelfoto, the DJ workshop series for women, Concrete Garden / Odd Emotions, or Schutzraum with FH Aachen show how artistic, social, and educational work overlap here. The bunker is not covered over in the process but consciously considered as a historical site.",
                })}
              </p>
              <p className="type-body max-w-[42rem] xl:max-w-[44rem]">
                {text(locale, {
                  de: "Die nächste Entwicklungsstufe betrifft deshalb weniger ein einzelnes Event als dauerhafte Bedingungen: Sicherheit, Technik, Lagerung, Luftqualität und eine rechtlich belastbare Nutzung. Aus viel Improvisation soll eine langfristig tragfähige kulturelle Infrastruktur werden.",
                  en: "The next stage therefore concerns not one single event but durable conditions: safety, technical equipment, storage, air quality, and a legally reliable mode of use. Years of improvisation are meant to become long-term cultural infrastructure.",
                })}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="ink-panel full-bleed-panel about-base-principles-panel px-6 py-8 md:px-8 md:py-10">
        <div className="content-grid layout-about-section gap-y-4">
          <p className="type-meta text-zinc-400 lg:pt-1">{text(locale, { de: "Leitlinien", en: "Principles" })}</p>
          <ul className="layout-copy-start grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle} className="type-body flex gap-3 text-zinc-200">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{principle}</span>
            </li>
          ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
