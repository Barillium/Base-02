import { MitmachenForm } from "@/components/MitmachenForm";
import { PageIntro } from "@/components/PageIntro";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mitmachen bei The Base e.V.: Open Calls und Kulturarbeit in Aachen",
  description:
    "Mitmachen bei The Base e.V. Aachen: Open Calls, Workshops, Ausstellungen, DJ-Formate und freiwillige Kulturarbeit im BOA.",
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
      de: "Workshops (z. B. Foto, DJ, Publishing, Community-Praxis)",
      en: "Workshops (e.g. photo, DJ, publishing, community practice)",
    }),
    text(locale, {
      de: "Open calls für neue und experimentelle Positionen",
      en: "Open calls for new and experimental positions",
    }),
  ];
}

export default async function MitmachenPage() {
  const locale = await getLocale();
  const formats = getFormats(locale);

  return (
    <div className="editorial-fade page-flow-compact">
      <PageIntro
        eyebrow="About"
        title={text(locale, { de: "Mitmachen", en: "Get involved" })}
        description={text(locale, {
          de: "Mitmachen bündelt Wege für Künstler:innen, DJs, Kollektive, Workshop-Leiter:innen und freiwillige Teams, die eigene Ideen in Aachen einbringen wollen.",
          en: "Get involved brings together entry points for artists, DJs, collectives, workshop hosts, and volunteer teams who want to contribute ideas in Aachen.",
        })}
        note={text(locale, {
          de: "Gesucht sind klare Vorschläge, kooperative Energie und Formate, die den BOA Bunker of Art als offenen Kulturraum ernst nehmen.",
          en: "We are looking for clear proposals, collaborative energy, and formats that take the BOA Bunker of Art seriously as an open cultural space.",
        })}
        className="layout-editorial-intro"
        titleClassName="lg:max-w-[10.2ch] lg:text-[clamp(2.6rem,3.35vw,3.24rem)] xl:max-w-[11ch] xl:text-[clamp(2.82rem,3.5vw,3.5rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <section className="content-grid layout-editorial-section">
        <p className="type-display-card text-[var(--ink)] lg:max-w-[9.4ch] xl:max-w-[10ch]">
          {text(locale, { de: "Programmformate", en: "Programme formats" })}
        </p>
        <ul className="type-body-lg space-y-3 text-[var(--ink)] lg:max-w-[44rem] lg:pt-3">
          {formats.map((format) => (
            <li key={format} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{format}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-8">
        <p className="type-body-lg max-w-3xl text-[var(--ink)]">
          {text(locale, {
            de: "Wenn du ein Projekt, eine Idee, einen Workshop oder ein kollektives Format einbringen willst, melde dich mit kurzer Beschreibung, Referenzen und gewünschtem Zeitraum. Wichtig ist nicht institutionelle Routine, sondern eine klare Haltung und Lust auf Zusammenarbeit.",
            en: "If you want to contribute a project, idea, or collective format, send a short description, references, and your preferred time frame. What matters is not institutional routine but a clear position and willingness to collaborate.",
          })}
        </p>
      </section>

      <MitmachenForm locale={locale} />
    </div>
  );
}
