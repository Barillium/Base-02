# Tasks

## Zweck

Offene, laufende und erledigte Aufgaben in knapper Form sammeln.

## Aktuell erledigt

- Obsidian-Bereich im Projekt angelegt
- Kategorien fuer Kontext, Design, Content, UX, Tasks, Codex, Decisions und Meetings angelegt
- Homepage zuletzt kuratiert und reduziert
- Sanity-Client-Grundlage im Projekt integriert
- Revalidate-Endpoint fuer spaetere Sanity-Webhooks vorbereitet
- eingebettetes Sanity Studio unter `/studio` vorbereitet
- erste Seed-Grundlage fuer `Home`, `Live` und `Archive` angelegt
- `Live`, `Archive`, `Media` und `About` sind die derzeit oeffentlich aktiven Website-Bereiche
- gemeinsame Guidance, Navigation und Smoke-Checks wurden auf den aktiven Umfang `Live / Archive / Media / About` reduziert
- Detailseiten fuer `Live` und `Archive` lesen ihre Listeninhalte jetzt optional aus Sanity und zeigen dabei weiter lokale Fallbacks
- bestehende Beispielinhalte fuer Veranstaltungen und Archivobjekte aus Seed und Seitenlogik entfernt; Seiten sind jetzt neutral fuer echte Sanity-Pflege vorbereitet
- Sanity-Schemas redaktionell nachgeschaerft: klarere Feldreihenfolge, Beschreibungen, Gruppen und sinnvollere Validierungen im Studio
- oeffentliche Vereins- und Projektinfos aus dem Instagram-Profil in `siteSettings`, `event`, `format`, `archiveItem` und `contributor` fuer den Seed uebernommen, ohne Bilder
- neues Sanity-Projekt fuer diese Website angelegt und mit den vorbereiteten Vereins-, Projekt- und Archivdatensaetzen befuellt
- `Live`-Uebersicht als redaktionelle Wegweiser-Seite geschaerft: aktueller Eintrag, Eventarchiv und laufende Formate zeigen jetzt die passenden Uebersichten statt Einzelposts
- `Laufende Formate` in Sanity um die Aachener Kunstroute ergaenzt, damit neben `Total Local` mindestens ein zweites wiederkehrendes Format gepflegt ist
- Homepage liest kuratierte Schnellzugaenge, Statement, Milestones und `About`-Verweise bevorzugt aus `Sanity`
- `Archive` liest Katalog- und Poster-Eintraege aus `Sanity`, `Media / Produktionen` kann `mediaProject`-Eintraege aus `Sanity` nutzen
- `About / Kontakt` liest Kontaktbasis aus `siteSettings`, weitere feste Seiten sind als `staticPage` im Studio vorbereitet
- Vault-MOCs und aktive Seitennotizen wurden auf den aktuellen Website- und CMS-Stand nachgezogen
- eigener Agentenordner unter `05-Codex/Agents/` angelegt
- formaler Vault-Agent und die in `AGENTS.md` beschriebenen Projektrollen im Vault dokumentiert

## Laufende Pflege

Nach groesseren Aenderungen hier kurz notieren:

- was wurde geaendert
- welche Seite oder Komponente war betroffen
- ob die Aenderung live deployed wurde

## Offene Fragen / naechste Schritte

- klaeren, ob Legacy-Routen wie `label`, `people` und `shop` nur intern bestehen bleiben oder kuenftig technisch entfernt werden sollen
- aktive Seitennotizen weiter an die tatsaechlich sichtbaren `Sanity`-Inhalte angleichen, sobald reale Redaktionstexte die Fallbacks ersetzen
- entscheiden, ob auch die `Media`-Uebersicht selbst spaeter aus `Sanity` gesteuert werden soll oder bewusst statisch kuratiert bleibt
- entscheiden, ob die aus `AGENTS.md` abgeleiteten Rollen spaeter auch als formale `.codex/agents`-Definitionen angelegt werden sollen
