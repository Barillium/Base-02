import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Datenschutz",
  description: "Datenschutzerklärung von The Base e.V. für die Website und Kontaktaufnahme.",
  path: "/datenschutz",
  noIndex: true,
});

export default function DatenschutzPage() {
  return (
    <div className="editorial-fade page-flow-compact">
      <section className="full-bleed-panel bg-[#1d1f24] px-6 py-8 text-zinc-100 md:px-10 md:py-12">
        <h1 className="type-display-hero">
          Datenschutz
        </h1>

        <div className="type-body mt-10 space-y-10 text-zinc-100 md:mt-11">
          <div className="space-y-3">
            <h3 className="type-title">1. Verantwortliche Stelle</h3>
            <p>
              The Base e. V.
              <br />
              Scheibenstraße 34
              <br />
              52070 Aachen
            </p>
            <p>
              E-Mail: info@thebase-ev.de
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">2. Erhebung und Speicherung personenbezogener Daten</h3>
            <p>
              Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch Informationen
              in sogenannten Server-Logfiles erfasst. Dazu gehören insbesondere IP-Adresse,
              Datum/Uhrzeit der Anfrage, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem.
            </p>
            <p>
              Diese Daten werden ausschließlich zur Gewährleistung eines störungsfreien Betriebs,
              zur Systemsicherheit sowie zur technischen Optimierung der Website verarbeitet.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">3. Kontaktaufnahme</h3>
            <p>
              Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten
              (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht) zur Bearbeitung Ihrer Anfrage
              gespeichert und verarbeitet.
            </p>
            <p>
              Die Verarbeitung erfolgt ausschließlich zweckgebunden zur Kommunikation mit Ihnen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">4. Rechtsgrundlagen der Verarbeitung</h3>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Webauftritt)
              sowie, sofern eine Kontaktaufnahme erfolgt, Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche/vertragliche Kommunikation) bzw. Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung, sofern eingeholt).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">5. Speicherdauer</h3>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen
              Verarbeitungszwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">6. Weitergabe von Daten</h3>
            <p>
              Eine Übermittlung personenbezogener Daten an Dritte erfolgt nur, wenn dies gesetzlich
              erlaubt ist, zur Vertragserfüllung erforderlich ist oder Sie ausdrücklich eingewilligt haben.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">7. Betroffenenrechte</h3>
            <p>
              Sie haben das Recht auf Auskunft über die bei uns gespeicherten personenbezogenen Daten,
              auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
              auf Widerspruch gegen die Verarbeitung.
            </p>
            <p>
              Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">8. Beschwerderecht bei einer Aufsichtsbehörde</h3>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
              Ihrer personenbezogenen Daten zu beschweren.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">9. Datensicherheit</h3>
            <p>
              Diese Website nutzt technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten
              gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen
              unbefugten Zugriff zu schützen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="type-title">10. Aktualität und Änderung dieser Datenschutzerklärung</h3>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: 14.05.2026.
              Durch die Weiterentwicklung der Website oder aufgrund geänderter gesetzlicher Vorgaben
              kann eine Anpassung dieser Erklärung erforderlich werden.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
