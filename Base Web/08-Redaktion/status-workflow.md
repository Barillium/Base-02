# Status-Workflow

Die Statuslogik soll Redaktionsarbeit sichtbar machen, ohne kuenstlich kompliziert zu werden.

## Statuswerte

- `idea`
  lose Idee, Themenfunke, Materialsammlung
- `draft`
  erste belastbare Fassung oder geordnete Rohnotiz
- `editing`
  aktiv in Bearbeitung, Rueckfragen oder Abstimmung laufen
- `approved`
  inhaltlich freigegeben, aber noch nicht nach `Sanity` uebertragen
- `transferredToSanity`
  redaktionell uebergeben und in strukturierter Form erfasst
- `published`
  auf der Website sichtbar oder als finale Webfassung bestaetigt

## Uebergangslogik

- `idea -> draft`
  sobald Inhalt eine klare Richtung oder Struktur hat
- `draft -> editing`
  sobald aktiv daran gearbeitet oder abgestimmt wird
- `editing -> approved`
  sobald Text, Fakten und Verantwortung geklaert sind
- `approved -> transferredToSanity`
  sobald die finale Website-Fassung in `Sanity` eingetragen wurde
- `transferredToSanity -> published`
  sobald der Inhalt wirklich online ist

## Wann etwas Sanity-ready ist

Ein Inhalt gilt erst dann als bereit fuer `Sanity`, wenn:

- Aussage und Ton geklaert sind
- offene Faktenfragen markiert oder geloest sind
- benoetigte Namen, Daten, Credits und Verweise vorhanden sind
- klar ist, auf welche Website-Seite oder welches Schema der Inhalt zielt
- kein interner Denktext mehr mit der finalen Fassung vermischt ist

## Archivierung

- alte Stufen nicht heimlich ueberschreiben, wenn Entscheidungsgeschichte wichtig ist
- bei Archivierung Ziel und Grund klar nennen
- Loeschen nur, wenn wirklich sicher ist, dass es Duplikat oder leerer Ballast ist
