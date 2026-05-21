import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von The Base e.V. in Aachen.",
  path: "/impressum",
  noIndex: true,
});

export default function ImpressumPage() {
  return (
    <div className="editorial-fade page-flow-compact">
      <section className="rounded-sm bg-[#1d1f24] px-6 py-8 text-zinc-100 md:px-10 md:py-12">
        <h1 className="type-display-hero">
          Impressum
        </h1>

        <div className="type-body mt-10 space-y-10 text-zinc-100 md:mt-11">
          <div className="space-y-3">
            <h3 className="type-title">Angaben gemäß § 5 TMG</h3>
            <p>
              The Base e. V.
              <br />
              Scheibenstraße 34
              <br />
              52070 Aachen
            </p>
            <p>
              Vereinsregister: VR – 5538
              <br />
              Registergericht: Amtsgericht Aachen
            </p>
            <p>
              Vertreten durch den Vorstand:
              <br />
              Samuel Danner (Vorsitz),
              <br />
              Kat Mertens (Stellvertreterin),
              <br />
              Jonas Heinen (Kassenwart),
              <br />
              Lucas Gollers (Schriftführer)
            </p>
            <p>
              Kontakt:
              <br />
              E-Mail: info@thebase-ev.de
            </p>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              <br />
              201/5917/4042
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
              entfernen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
              Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
              Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
              nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
