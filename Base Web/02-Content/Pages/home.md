# Home

## Verknuepfte Notizen

- [[00-Context/aktive-bereiche|Aktive Bereiche]]
- [[00-Context/Verbindungen/orientierung|Orientierung]]
- [[02-Content/Pages/live|Live]]
- [[02-Content/Pages/archive|Archive]]
- [[02-Content/Pages/media|Media]]
- [[02-Content/Pages/about|About]]
- [[03-UX/UI-Elements/header|Header]]
- [[03-UX/UI-Elements/navigation|Navigation]]
- [[03-UX/UI-Elements/card-rows|Card Rows]]
- [[03-UX/UI-Elements/footer|Footer]]

## Route

- `/`

## Quelldatei

- `src/app/page.tsx`

## Rolle der Seite

Die Startseite ist ein kurzer, editorialer Einstieg in The Base e.V. Sie soll nicht alles erklaeren, sondern Orientierung geben und die wichtigsten Bereiche mit ruhiger Prioritaet oeffnen.

## Inhaltlicher Fokus

- Schnellzugriffe auf aktuelle oder priorisierte Inhalte
- ein knapper Kontextblock zur Rolle des Vereins
- kuratierte Einstiege in `Archive` und `About`

## Tonalitaet

Direkt, lokal, kulturell verortet. Keine Werbesprache.

## Pflegehinweis

Die Startseite sollte eher kuratieren als vollstaendig abbilden. Inhalte duerfen aus `Sanity` kommen, aber die Seite soll dabei nicht zur Sitemap oder Datenbankuebersicht werden.

## Aktueller Implementierungsstand

- Quick Links kommen bevorzugt aus `homePage.quickLinks`
- Statement, Note und Milestones kommen bevorzugt aus `homePage`
- die `About`-Cards koennen ueber `homePage.featuredAbout` kuratiert werden
- fuer `Archive` werden Katalog- und Poster-Einstiege ueber vorhandene `archiveEntry`-Queries angereichert
- wenn in `Sanity` nichts gepflegt ist, bleiben lokale Fallback-Texte aktiv

## Aktuell erfasste Seitentexte

Stand: aus dem aktuellen Seitencode abgeleitete sichtbare Texte in deutscher Sprache.
Hinweis: Einzelne Listen- oder Karteneintraege koennen zur Laufzeit aus `Sanity` kommen und diese Fallback-Texte teilweise ueberschreiben.

- Aktuelle Veranstaltung
- Die naechste sichtbare Arbeit, Ausstellung oder musikalische Einladung im Programm.
- Aktuell
- Laufende Formate
- Wiederkehrende Reihen und offene Programmlinien.
- Naechster Termin
- Vergangene Veranstaltungen
- Rueckblick auf dokumentierte Veranstaltungen und Projekte.
- Letztes Projekt
- Plattform zwischen Ausstellung, Programm und lokaler Szene
- The Base versteht den ehemaligen Bunker nicht als Kulisse, sondern als aktiven sozialen und kulturellen Raum. Zwischen Ausstellungen wie Total Local, musikalischen Programmen und Release-Kontexten entsteht ein Ort, der Szenen, Teams und kuenstlerische Positionen in Aachen zusammenfuehrt.
- Seit 2020 als offene Plattform im Bunker of Art aktiv
- Verbindet Ausstellung, Konzert, Veroeffentlichung und Archiv statt klassischer Spartentrennung
- Macht lokale Kollaborationen, Open Calls und dokumentierte Formate oeffentlich sichtbar
- Archiv
- Arbeiten, Spuren, Dokumentation und Rueckblicke.
- The Base
- Entstehung, Selbstverstaendnis und die Rolle des BOA als Kulturort und Infrastruktur.
- Open Call
- Anfragen fuer Ausstellungen, ortsspezifische Arbeiten und andere Formate im Kontext des BOA.
- Awareness
- Grundsaetze fuer respektvolle Raeume, diskriminierungssensible Praxis und gemeinsames Verhalten im BOA.
- Verein, Awareness und Kontakt
