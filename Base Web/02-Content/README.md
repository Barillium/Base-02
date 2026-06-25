# Content

## Zweck

Textliche Ausrichtung, redaktionelle Tonalitaet, Inhaltslogik und programmatische Schwerpunkte.

Dieser Bereich sammelt nicht nur Rohtexte, sondern die inhaltliche Logik der Website.

## Tonaet

- knapp
- konkret
- lokal verankert
- kulturell glaubwuerdig
- keine generische Broschueren-Sprache

## Inhaltliche Schwerpunkte

- Ausstellungen und Veranstaltungen im BOA Bunker of Art
- laufende Formate wie `Total Local`
- dokumentierte Veranstaltungen und Archive
- Medienproduktion, Mitschnitt und visuelle Spuren
- Vereinskontext, Mitmachen, Awareness und soziale Infrastruktur

## Juengste inhaltliche Anpassungen

- Homepage-Copy gestrafft
- Schnellzugaenge auf aktuelle Orientierung reduziert
- Cards in mehreren Bereichen inhaltlich deutlicher voneinander getrennt
- Copy naeher an realen Formaten und Programmsignalen ausgerichtet
- gemeinsame Annahmen auf die aktiven Website-Bereiche `Live`, `Archive`, `Media` und `About` reduziert

## Aktueller Implementierungsstand

- die Homepage liest Schnellzugaenge, Milestones, Statement und kuratierte `About`-Verweise bevorzugt aus `Sanity`
- `Live` nutzt `Sanity` bereits fuer aktuelle Veranstaltung, vergangene Events und laufende Formate
- `Archive` nutzt `Sanity` fuer Katalog- und Poster-Eintraege
- `Media / Produktionen` nutzt `Sanity` optional fuer `mediaProject`-Eintraege, faellt aber auf kuratierte lokale Referenzen zurueck
- feste Seiten wie `About / The Base`, `Code of Conduct`, `Kontakt`, `Mitmachen` und `Media / Buchung` sind als `staticPage`- oder `siteSettings`-Inhalte vorbereitet
- Legacy-Bereiche wie `Label`, `Talents` und `Shop` bleiben als Dokumentations- oder Code-Relikte vorhanden, sind aber nicht Teil des aktiven oeffentlichen Scopes

## Enthalten

- Quellhinweise und externe Referenzen
- Mapping von Themen auf Seiten
- Einzelnnotizen fuer alle relevanten Routen unter `Pages/`

## Wie die Seiten-Notes gedacht sind

Jede Seitennotiz beantwortet moeglichst schnell:

- Wofuer ist diese Seite da?
- Welche Inhalte gehoeren hier wirklich hin?
- Wie spricht die Seite?
- Welche Unterseiten oder Komponenten sind mit ihr verknuepft?

## Seitenverzeichnis

### Aktiv oeffentlich eingebunden

- `home.md`
- `live.md`
- `live-aktuelle-veranstaltung.md`
- `live-eventarchiv.md`
- `live-laufende-formate.md`
- `live-workshops.md`
- `archive.md`
- `archive-kunstkatalog.md`
- `archive-poster.md`
- `media.md`
- `media-buchung.md`
- `media-produktionen.md`
- `about.md`
- `about-the-base.md`
- `about-kontakt.md`
- `about-mitmachen.md`
- `about-awareness.md`
- `mitmachen-landing.md`
- `impressum.md`
- `datenschutz.md`

### Legacy / derzeit nicht oeffentlich eingebunden

- `label.md`
- `label-releases.md`
- `talents.md`
- `talents-kuenstlerinnen.md`
- `talents-djs.md`
- `shop.md`
- `shop-prints.md`
- `shop-merch.md`
- `shop-vinyl.md`
- `shop-diverses.md`

## Graph-Verbindungen

- [[02-Content/Pages/home|Home]]
- [[02-Content/Pages/live|Live]]
- [[02-Content/Pages/media|Media]]
- [[02-Content/Pages/about|About]]
- [[03-UX/UI-Elements/section-grid|Section Grid]]
