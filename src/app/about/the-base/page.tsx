import { PageIntro } from "@/components/PageIntro";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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
      de: "Verbindet Kunst, Musik und Zeitgeschichte statt klassischer Spartentrennung.",
      en: "Connects art, music, and contemporary history beyond traditional category boundaries.",
    }),
    text(locale, {
      de: "Arbeitet mit lokalen und internationalen Künstler:innen in offenen Formaten.",
      en: "Works with local and international artists in open formats.",
    }),
    text(locale, {
      de: "Denkt den Raum als soziale Infrastruktur, nicht nur als Event-Location.",
      en: "Treats the space as social infrastructure, not only as an event location.",
    }),
  ];
}

export default async function TheBasePage() {
  const locale = await getLocale();
  const principles = getPrinciples(locale);

  return (
    <div className="editorial-fade page-flow-compact">
      <PageIntro
        eyebrow="About"
        title="The Base"
        description={text(locale, {
          de: "The Base e.V. entwickelt den BOA Bunker of Art in Aachen als Kulturplattform, in der Ausstellungen, Konzerte, Workshops, Labelarbeit und Archiv zusammenlaufen.",
          en: "The Base e.V. develops the BOA Bunker of Art in Aachen as a cultural platform where exhibitions, concerts, workshops, label work, and archive practice converge.",
        })}
        note={text(locale, {
          de: "Wichtig ist der Verein nicht als reine Veranstaltungsstruktur, sondern als Infrastruktur für Begegnung, Produktion und Sichtbarkeit.",
          en: "The association matters not merely as an event structure, but as infrastructure for encounter, production, and visibility.",
        })}
      />

      <section className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <p className="type-display-card text-[var(--ink)]">{text(locale, { de: "Seit Kunstroute 2020", en: "Since Kunstroute 2020" })}</p>
        <div className="type-body-lg space-y-5 text-[var(--ink)]">
          <p>
            {text(locale, {
              de: "Der geschichtsträchtige Bunker wird nicht überdeckt, sondern bewusst als realer Kontext genutzt. Die neue Gemeinschaft füllt den Ort mit Ausstellungen, Konzerten, Workshops und kollaborativen Produktionen.",
              en: "The historical bunker is not concealed but intentionally used as a real context. A new community fills the space with exhibitions, concerts, workshops, and collaborative productions.",
            })}
          </p>
          <p>
            {text(locale, {
              de: "Ziel ist es, etablierte und nicht etablierte Kunstschaffende, DJs, Produzent:innen und Kulturinteressierte zusammenzubringen, Netzwerke zu stärken und kreative Impulse in eine langfristige kulturelle Infrastruktur zu überführen.",
              en: "The goal is to bring together established and emerging cultural workers, strengthen networks, and turn creative impulses into long-term cultural infrastructure.",
            })}
          </p>
        </div>
      </section>

      <section className="ink-panel rounded-sm px-6 py-8 md:px-8 md:py-10">
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
