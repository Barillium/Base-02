import { PageIntro } from "@/components/PageIntro";
import { SocialLinks } from "@/components/SocialLinks";
import { getLocale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt zu The Base e.V. in Aachen",
  description:
    "Kontakt zu The Base e.V. Aachen: Adresse, E-Mail, Presse, Kooperationen, Programmfragen und Raumanfragen im BOA Bunker of Art.",
  path: "/about/kontakt",
});

export default async function KontaktPage() {
  const locale = await getLocale();

  return (
    <div className="editorial-fade page-flow-compact">
      <PageIntro
        eyebrow="About"
        title={text(locale, { de: "Kontakt", en: "Contact" })}
        description={text(locale, {
          de: "Diese Seite sammelt die direkten Kontaktwege für Programmfragen, Presse, Kooperationen, Workshops, Raumanfragen und Besuch im BOA Bunker of Art Aachen.",
          en: "This page brings together direct contact paths for programme questions, press, collaborations, workshops, space requests, and visits to the BOA Bunker of Art Aachen.",
        })}
        className="layout-editorial-intro"
        titleClassName="lg:max-w-[9.8ch] lg:text-[clamp(2.58rem,3.32vw,3.2rem)] xl:max-w-[10.6ch] xl:text-[clamp(2.8rem,3.46vw,3.44rem)]"
        rightClassName="lg:max-w-[44rem] lg:pt-4"
      />

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3 pt-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Adresse", en: "Address" })}</p>
          <p className="type-body-lg text-[var(--ink)]">BOA / Bunker of Art</p>
          <p className="type-body-lg text-[var(--ink)]">Scheibenstraße 34, 52070 Aachen</p>
        </div>

        <div className="space-y-3 pt-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontakt", en: "Contact" })}</p>
          <p className="type-body-lg text-[var(--accent)]">info@thebase-ev.de</p>
          <p className="type-body text-[var(--muted)]">Instagram + Facebook</p>
          <SocialLinks />
        </div>

        <div className="space-y-3 pt-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Hinweis", en: "Note" })}</p>
          <p className="type-body-lg text-[var(--ink)]">
            {text(locale, {
              de: "Öffnungszeiten sind programmabhängig und werden laufend über Live, Archive und Social Updates veröffentlicht.",
              en: "Opening hours depend on the programme and are published continuously via Live, Archive, and social updates.",
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
