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
    text(locale, {
      de: "Versteht Kultur explizit jenseits von Klassen- und Spartengrenzen.",
      en: "Understands culture explicitly beyond class and sector boundaries.",
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
          de: "The Base e.V. entwickelt den BOA Bunker of Art in Aachen als Kulturplattform, in der Ausstellungen, Konzerte, Workshops, Labelarbeit, Archiv und Community zusammenlaufen.",
          en: "The Base e.V. develops the BOA Bunker of Art in Aachen as a cultural platform where exhibitions, concerts, workshops, label work, archive practice, and community converge.",
        })}
        note={text(locale, {
          de: "Im Profil beschreibt sich der Verein selbst als Ort zur Foerderung von Kultur jenseits von Klassen- und Sektorgrenzen - genau daraus entsteht die Verbindung aus Ausstellung, Open Call und kollaborativer Produktion.",
          en: "On the profile the association describes itself as promoting culture beyond class and sector boundaries - precisely from that comes the connection between exhibition, open call, and collaborative production.",
        })}
        className="layout-editorial-intro"
        titleClassName="lg:max-w-[9.8ch] lg:text-[clamp(2.6rem,3.35vw,3.24rem)] xl:max-w-[10.6ch] xl:text-[clamp(2.82rem,3.5vw,3.5rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <section className="content-grid layout-editorial-section">
        <p className="type-display-card text-[var(--ink)] lg:max-w-[9.2ch] xl:max-w-[9.8ch]">
          {text(locale, { de: "Seit Kunstroute 2020", en: "Since Kunstroute 2020" })}
        </p>
        <div className="type-body-lg space-y-5 text-[var(--ink)] lg:max-w-[44rem] lg:pt-3">
          <p>
            {text(locale, {
              de: "Der geschichtsträchtige Bunker wird nicht überdeckt, sondern bewusst als realer Kontext genutzt. Die Gemeinschaft füllt den Ort mit Ausstellungen, Konzerten, Open Calls, Workshops, Release-Shows und kollaborativen Produktionen.",
              en: "The historical bunker is not concealed but intentionally used as a real context. The community fills the space with exhibitions, concerts, open calls, workshops, release shows, and collaborative productions.",
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
