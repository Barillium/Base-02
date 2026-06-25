# Live

## Verknuepfte Notizen

- [[00-Context/aktive-bereiche|Aktive Bereiche]]
- [[00-Context/Verbindungen/programm|Programm]]
- [[00-Context/Verbindungen/dokumentation|Dokumentation]]
- [[00-Context/Verbindungen/infrastruktur|Infrastruktur]]
- [[02-Content/Pages/live-aktuelle-veranstaltung|Aktuelle Veranstaltung]]
- [[02-Content/Pages/live-eventarchiv|Eventarchiv]]
- [[02-Content/Pages/live-laufende-formate|Laufende Formate]]
- [[02-Content/Pages/live-workshops|Workshops]]
- [[03-UX/UI-Elements/page-intro|Page Intro]]
- [[03-UX/UI-Elements/section-grid|Section Grid]]
- [[03-UX/UI-Elements/card-rows|Card Rows]]

## Route

- `/live`

## Quelldatei

- `src/app/live/page.tsx`

## Rolle der Seite

Uebersichtsseite fuer das laufende Programm. Sie fuehrt in aktuelle Veranstaltung, Eventarchiv und laufende Formate.

## Inhaltlicher Fokus

- aktueller Programmpunkt
- Rueckblicke auf vergangene Veranstaltungen
- wiederkehrende Formate

## Tonalitaet

Programmatisch, nicht datenbankhaft. Lieber kuratorische Einordnung als bloes Listing.

## Aktueller Implementierungsstand

- die aktuelle Veranstaltung wird ueber `LIVE_CURRENT_EVENT_QUERY` bevorzugt aus `Sanity` gelesen
- `Eventarchiv` und `Laufende Formate` bleiben auf der Uebersicht bewusst Wegweiser statt lange Listen
- die Seite ist kein Kalender, sondern eine kuratierte Einstiegsebene in das Live-Programm

## Unterseiten

- `live-aktuelle-veranstaltung.md`
- `live-eventarchiv.md`
- `live-laufende-formate.md`
- `live-workshops.md`

## Aktuell erfasste Seitentexte

Stand: aus dem aktuellen Seitencode abgeleitete sichtbare Texte in deutscher Sprache.
Hinweis: Einzelne Listen- oder Karteneintraege koennen zur Laufzeit aus `Sanity` kommen und diese Fallback-Texte teilweise ueberschreiben.

- Aktuelle Veranstaltung
- Hier steht jeweils die aktuelle Veranstaltung, egal ob Ausstellung, Konzert oder ein anderes Format.
- Aktuell
- Uebersicht vergangener Veranstaltungen
- Hier liegen Rueckblicke auf vergangene Veranstaltungen wie Total Local, 10 Jahre The Base oder Release-Shows im Umfeld des BOA.
- Archiv
- Laufende Formate
- Die Uebersicht buendelt wiederkehrende Reihen wie Total Local und die Beteiligung an der Aachener Kunstroute.
- Uebersicht
- Live-Programm in Aachen
- Live-Programm
- in Aachen
- Der Live-Bereich buendelt Ausstellungen, Veranstaltungen und wiederkehrende Formate im BOA Bunker of Art und macht aktuelle sowie vergangene Programmpunkte lesbar.
- Aktuelle
- Veranstaltung
- Hier landet jeweils die aktuelle Veranstaltung, ob Ausstellung, Konzert oder ein anderes Format im Programm.
- Rueckblick
- Eventarchiv
- Das Eventarchiv fuehrt zu einer Uebersicht vergangener Veranstaltungen und versammelt Rueckblicke auf Ausstellungen, Konzerte und Sonderformate.
- Laufend
- Laufende
- Formate
- Hier werden wiederkehrende Programmlinien wie Total Local oder die Beteiligung an der Aachener Kunstroute gebuendelt.
- Live
