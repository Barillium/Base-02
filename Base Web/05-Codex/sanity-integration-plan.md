# Sanity Integration Plan fuer The Base Website

## Ziel

Diese Notiz beschreibt, ob und wie `Sanity` sinnvoll in die bestehende Website von The Base e.V. integriert werden sollte.

Sie ist auf den aktuellen Projektstand zugeschnitten:

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Deployment auf Cloudflare Workers ueber OpenNext
- redaktionelle, inhaltsgetriebene Website mit Bereichen wie `Live`, `Archive`, `Talents`, `About`, `Label`, `Media`, `Shop`

## Kurzfazit

Ja, `Sanity` ist fuer dieses Projekt sehr gut geeignet, wenn die Rollen sauber getrennt bleiben:

- `Obsidian` bleibt das interne Wissenssystem
- `Sanity` wird das redaktionelle Backend fuer Inhalte, die wirklich auf die Website sollen
- die Website liest Inhalte aus `Sanity`, nicht aus Obsidian

Das ist fuer dieses Projekt sinnvoll, weil die Seite nicht nur aus statischem Code besteht, sondern aus:

- Ausstellungen
- Veranstaltungen
- wiederkehrenden Formaten
- Archivobjekten
- Personen und Kollektiven
- redaktionellen Seitentexten
- Bildern, Postern und Credits

## Warum Sanity hier gut passt

### 1. Die Inhalte sind strukturiert, aber nicht simpel

Die Website ist keine einfache Landingpage. Sie hat mehrere Inhaltstypen, die Beziehungen zueinander haben:

- ein Event hat ein Datum, einen Ort, Bilder, beteiligte Personen
- eine Ausstellung hat Laufzeit, Credits, Kontext und Material
- ein Artist kann in mehreren Formaten auftauchen
- ein Archivobjekt kann mit Events, Bildern und Personen verknuepft sein

Sanity ist stark, wenn Inhalte nicht nur Texte, sondern strukturierte Datensaetze mit Relationen sind.

### 2. Inhalte sollen sich aendern koennen, ohne dauernd in den Code zu muessen

Gerade `Live`, `Archive`, `Talents` und Teile von `About` profitieren davon, wenn Aenderungen nicht immer ueber manuelle Code-Edits laufen.

### 3. Redaktionslogik passt gut zu App Router

Sanity empfiehlt fuer Next.js die offizielle Integration ueber `next-sanity`. Die Integration ist auf Server Components, App Router, Revalidation und Live-Content-Workflows ausgelegt.

## Warum Obsidian trotzdem bleiben sollte

Obsidian und Sanity loesen nicht dasselbe Problem.

### Obsidian ist gut fuer:

- Kontext
- Notizen
- Entscheidungen
- Rohtexte
- Meeting-Notes
- offene Fragen
- interne Planung

### Sanity ist gut fuer:

- publizierte Inhalte
- strukturierte Datensaetze
- Bild- und Medienpflege
- Editorial Workflows
- Beziehungen zwischen Inhalten
- spaetere Erweiterbarkeit

## Empfohlene Rollentrennung

### Obsidian

Bleibt der interne Projektraum fuer:

- `00-Context`
- `01-Design`
- `02-Content`
- `03-UX`
- `04-Tasks`
- `05-Codex`
- `06-Decisions`
- `07-Meetings`

### Sanity

Wird nur fuer Website-Inhalte benutzt:

- aktuelle Ausstellung
- vergangene Veranstaltungen
- laufende Formate
- Artists / DJs / Mitwirkende
- Archivobjekte
- About-Inhalte
- ggf. spaeter Label / Media / Shop

## Was ich nicht empfehlen wuerde

### Kein 1:1 Sync zwischen Obsidian und Sanity

Warum nicht:

- Obsidian ist frei und notizhaft
- Sanity ist strukturiert und publikationsorientiert

Ein Vollsync fuehrt fast immer zu:

- chaotischen Datensaetzen
- inkonsistenten Feldern
- doppelter Pflege
- wenig redaktioneller Kontrolle

### Nicht alles in einem Schritt migrieren

Die Website ist bereits aufgebaut. Ein Big-Bang-Umbau waere unnoetig riskant.

## Empfohlene Einfuehrungsstrategie

Ich wuerde Sanity in sieben Phasen einfuehren.

---

## Phase 1: Inhaltsmodell definieren

Noch nichts installieren. Zuerst in Ruhe das Modell festlegen.

### Ziel

Jeder Website-Bereich soll ein klarer Inhaltstyp werden.

### Empfohlene Document Types

#### 1. `siteSettings`

Fuer globale Inhalte:

- Seitentitel
- globale Meta Defaults
- Navigation Labels, falls spaeter noetig
- Footer-Texte oder Kontaktbasics, falls gewuenscht

#### 2. `homeQuickLink`

Fuer die drei Schnellzugaenge auf der Homepage:

- `label`
- `title`
- `href` oder Referenz
- `order`
- `isActive`

#### 3. `event`

Fuer einzelne Veranstaltungen:

- Titel
- Slug
- Kurztext
- Beschreibung
- Startdatum
- Enddatum
- Ort
- Status
- Bild
- Galerie
- Credits
- Externe Links
- Referenzen zu Artists / DJs / Formaten

#### 4. `format`

Fuer wiederkehrende Formate wie `Total Local`:

- Titel
- Slug
- Kurzbeschreibung
- Langbeschreibung
- Status
- Hero-Bild
- Referenzierte Events
- beteiligte Personen

#### 5. `exhibition`

Wenn ihr Ausstellungen getrennt von Events fuehren wollt:

- Titel
- Slug
- Laufzeit
- Kontexttext
- Credits
- Bild
- Beteiligte
- Archivbezug

Wenn ihr das einfacher halten wollt, kann eine Ausstellung auch ein spezieller `event` sein.

#### 6. `artist`

- Name
- Slug
- Kurzprofil
- Langprofil
- Rollen
- Bild
- Links
- beteiligte Projekte

#### 7. `dj`

- Name
- Slug
- Kurzprofil
- Rollen
- Bild
- Links
- verbundene Events

#### 8. `contributor`

Fuer Mitwirkende jenseits von Artist / DJ:

- Name
- Rolle
- Kurztext
- Links
- Bezug zu Programmbereichen

#### 9. `archiveItem`

Fuer Poster, Doku, Projektspuren, Archivmaterial:

- Titel
- Slug
- Typ
- Bild
- Beschreibung
- Datum
- Referenz zu Event / Format / Artist
- Credits

#### 10. `release`

Fuer Label-Inhalte:

- Titel
- Slug
- Release-Datum
- Typ
- Cover
- Credits
- Audio-/Streaming-Links
- Bezug zu Event oder Artists

#### 11. `pageAbout`

Fuer redaktionelle About-Inhalte:

- Intro
- Kurzprofil
- Sektionstexte
- CTA-relevante Felder

#### 12. `pageSectionText`

Optional fuer flexible redaktionelle Seitentexte:

- Bereich
- Titel
- Kurztext
- Langtext
- Sichtbarkeit

Das kann spaeter helfen, wenn nicht jede Copy hart im Code bleiben soll.

---

## Phase 2: Inhaltsmodell fuer diese Website priorisieren

Nicht jeder Typ muss sofort live gehen.

### Erste Prioritaet

1. `homeQuickLink`
2. `event`
3. `format`
4. `archiveItem`
5. `artist`
6. `dj`

### Zweite Prioritaet

7. `contributor`
8. `pageAbout`
9. `release`

### Dritte Prioritaet

10. `siteSettings`
11. komplexere Media- und Shop-Modelle

---

## Phase 3: Sanity technisch ins Projekt einhaengen

### Offizieller Startpunkt

Sanity empfiehlt fuer bestehende Next.js-Projekte die Integration ueber `next-sanity`.

Der offizielle Einstieg ist:

- `npx sanity@latest init`

Relevant dafuer:

- `next-sanity` ist die offizielle Next.js-Integration
- sie kann Client-Konfiguration, Studio-Setup und optionale Embedded-Studio-Routen scaffolden

### Empfehlung fuer dieses Projekt

Ich wuerde das Studio in einem kontrollierten Setup einhaengen:

#### Option A: Embedded Studio in derselben App

Vorteile:

- alles in einem Projekt
- einfache Wartung
- gleiche Deployment-Logik

Nachteile:

- die bestehende App wird etwas komplexer

#### Option B: Eigenes Studio im selben Repo oder als Schwesterprojekt

Vorteile:

- sauber getrennte Verantwortlichkeiten
- Frontend bleibt schlanker

Nachteile:

- etwas mehr organisatorischer Aufwand

### Fuer euren aktuellen Stand wuerde ich empfehlen

Start mit **einem Studio im selben Repo**, aber logisch klar getrennt.

Warum:

- schnellster Weg
- fuer dieses Projekt voellig ausreichend
- spaeter immer noch auslagerbar

---

## Phase 4: Client, Queries und Rendering aufsetzen

### Technische Basis

Die Website braucht:

- einen Sanity Client
- zentrale Query-Dateien
- ein Bild-Handling
- Caching-/Revalidation-Strategie

### Sanity Client

Der offizielle JS-Client ist `@sanity/client`.

Wichtige Konfigurationsfelder laut Docs:

- `projectId`
- `dataset`
- `apiVersion`
- `useCdn`
- optional `token`

### Empfohlene Struktur im Projekt

Zum Beispiel:

- `src/sanity/lib/client.ts`
- `src/sanity/lib/image.ts`
- `src/sanity/lib/queries.ts`
- `src/sanity/schema/`

### Query-Strategie

Ich wuerde Queries nicht in Seiten verstreuen, sondern sauber kapseln:

- `homeQueries`
- `liveQueries`
- `archiveQueries`
- `peopleQueries`
- `aboutQueries`

### Bilder

Fuer Sanity-Bilder solltet ihr den Bild-Builder bzw. die Next.js-kompatible Bildlogik verwenden.

---

## Phase 5: Migrationsreihenfolge fuer die Inhalte

Nicht alles auf einmal.

### Schritt 1: Homepage Schnellzugaenge

Warum zuerst:

- kleiner Umfang
- hoher sichtbarer Nutzen
- gute Einfuehrung in strukturierten Content

Sanity-Typ:

- `homeQuickLink`

Migration:

- aktuelle drei Schnellzugaenge in Sanity anlegen
- Homepage aus Sanity lesen
- Fallback im Code nur, solange noetig

### Schritt 2: `Live`

Sanity-Typen:

- `event`
- `format`
- optional `exhibition`

Migration:

- `aktuelle Ausstellung`
- `laufende Formate`
- `vergangene Veranstaltungen`

Das ist der groesste inhaltliche Hebel fuer die Seite.

### Schritt 3: `Archive`

Sanity-Typ:

- `archiveItem`

Migration:

- Kunstkatalog
- Poster
- Dokumentationsobjekte

### Schritt 4: `Talents`

Sanity-Typen:

- `artist`
- `dj`
- `contributor`

Migration:

- Artists
- DJs
- Mitwirkende

### Schritt 5: `About`

Sanity-Typ:

- `pageAbout`

Migration:

- Intro
- Kurzprofil
- Engagement
- Awareness
- Kontakttexte

### Schritt 6: `Label`

Sanity-Typ:

- `release`

### Schritt 7: `Media` und `Shop`

Nur wenn ihr merkt, dass diese Inhalte wirklich redaktionell gepflegt werden sollen.

---

## Phase 6: Caching und Aktualisierung

Sanity empfiehlt fuer Next.js zwei grundlegende Wege:

### Weg A: Live Content API

Vorteile:

- sehr editor-freundlich
- automatische Aktualisierung
- gute Vorschau-Workflows

Nachteile:

- fuer den Start etwas mehr Komplexitaet

### Weg B: klassische Revalidation mit Webhooks

Vorteile:

- einfacher Einstieg
- kontrollierbarer
- fuer diese Website wahrscheinlich voellig ausreichend am Anfang

Nachteile:

- weniger elegant als Live Content

### Empfehlung fuer dieses Projekt

Start mit:

- normalen Queries
- sauberer Next.js-Revalidation
- optional Webhooks fuer Inhaltsupdates

Spaeter:

- Live Content API
- Visual Editing

---

## Phase 7: Editorial Workflow definieren

Damit Sanity nicht nur technisch eingefuehrt, sondern sinnvoll gepflegt wird.

### Empfohlener Workflow

#### In Obsidian

- Rohideen
- Quellnotizen
- Copy-Entwuerfe
- Strukturueberlegungen
- Decisions
- Tasks

#### In Sanity

- freigegebene Inhalte
- finale Bilder
- Referenzen
- strukturierte Datensaetze

#### In der Website

- Rendering
- Layoutlogik
- Komponenten
- Fallbacks
- technische Regeln

---

## Konkrete Arbeitsschritte

### Schritt 1

Sanity-Projekt anlegen:

- neues Sanity-Projekt
- Dataset `production`
- optional spaeter `staging`

### Schritt 2

`next-sanity` in bestehendes Projekt integrieren.

### Schritt 3

Sanity Studio einrichten.

### Schritt 4

Schemas fuer diese Typen bauen:

- `homeQuickLink`
- `event`
- `format`
- `archiveItem`
- `artist`
- `dj`
- `contributor`

### Schritt 5

Client- und Query-Layer im Projekt anlegen.

### Schritt 6

Homepage-Schnellzugaenge zuerst auf Sanity umstellen.

### Schritt 7

`Live` auf Sanity umstellen.

### Schritt 8

`Archive` auf Sanity umstellen.

### Schritt 9

`Talents` auf Sanity umstellen.

### Schritt 10

`About` auf Sanity umstellen.

### Schritt 11

Revalidation oder Webhook-Handling einbauen.

### Schritt 12

Editorial Pflegeprozess festlegen:

- wer pflegt was
- wann ist etwas Entwurf
- wann ist etwas live
- wie werden Bilder und Credits gepflegt

---

## Was wir aus dem Code in Sanity ziehen wuerden

### Homepage

- Schnellzugaenge

### Live

- aktuelle Ausstellung
- vergangene Veranstaltungen
- laufende Formate

### Talents

- Artists
- DJs
- Mitwirkende

### Archive

- Katalogeintraege
- Poster-Eintraege
- Dokumentation

### About

- Kurzprofil
- Intro
- Engagement
- Awareness

Nicht alles muss sofort migriert werden. Vieles kann schrittweise aus dem bestehenden Code in strukturierte Inhalte ueberfuehrt werden.

---

## Risiken und typische Fehler

### 1. Zu viele Inhaltstypen sofort

Fuehrt zu:

- unnoetig komplexem Studio
- Pflegefrust
- schlechter Akzeptanz

### 2. Zu freies Modell

Wenn alles nur Rich Text ist, verliert ihr die Vorteile von Sanity.

### 3. Zu starres Modell

Wenn jede Kleinigkeit ein eigener Datentyp wird, wird Pflege unnoetig schwer.

### 4. Obsidian und Sanity doppelt pflegen

Deshalb klar trennen:

- Obsidian = intern
- Sanity = publizierbar

### 5. Zu frueh alles live umstellen

Besser:

- klein anfangen
- bewaehrte Bereiche zuerst
- Schritt fuer Schritt migrieren

---

## Empfehlung fuer den Start in diesem Projekt

Wenn wir das wirklich umsetzen, waere meine konkrete Startreihenfolge:

1. Sanity-Projekt anlegen
2. `next-sanity` integrieren
3. `homeQuickLink` Schema bauen
4. Homepage-Schnellzugaenge aus Sanity lesen
5. `event` + `format` bauen
6. `Live` migrieren
7. `archiveItem` bauen
8. `Archive` migrieren
9. `artist` / `dj` / `contributor` bauen
10. `Talents` migrieren

Das ist die kleinste sinnvolle Einfuehrung mit dem groessten Nutzen.

---

## Quellen

Offizielle Dokumentation:

- Sanity + Next.js: https://www.sanity.io/docs/nextjs/introduction
- Sanity JS Client: https://www.sanity.io/docs/apis-and-sdks/js-client-getting-started
- Sanity Next.js Integrationsuebersicht: https://www.sanity.io/docs/nextjs
- Sanity Webhooks / Revalidation: https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs
- Obsidian Datenspeicherung: https://help.obsidian.md/data-storage

---

## Naechste sinnvolle Fortsetzung

Wenn wir weitergehen, sollte die naechste Datei in Obsidian sein:

- `05-Codex/sanity-schema-blueprint.md`

Darin wuerden wir konkret festlegen:

- exakte Document Types
- alle Felder
- Feldtypen
- Relationen
- Validierungsregeln
- welche Website-Seite welche Query braucht
