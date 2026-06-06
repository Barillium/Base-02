# Sanity Editorial Entry Order

## Zweck

Diese Notiz beschreibt die **konkrete Reihenfolge**, in der Inhalte in `Sanity` für die The Base Website eingepflegt werden sollten.

Sie folgt dem Plan aus [sanity-integration-plan.md](</Users/stanynyssen/Documents/Base 002 3/Base Web/05-Codex/sanity-integration-plan.md>) und dem aktuellen technischen Stand im Projekt:

- eingebettetes Studio ist vorbereitet
- Client, Queries und Revalidation sind angelegt
- Seiten sind neutral auf `Sanity` vorbereitet
- bestehende Beispielinhalte fuer `Live` und `Archive` wurden wieder entfernt

Das Ziel ist:

- **nicht alles auf einmal**
- zuerst die Inhalte pflegen, die sofort sichtbar und strukturell wichtig sind
- danach weitere Inhaltstypen schrittweise ergaenzen

---

## Grundregel

Erst die **kleinen, steuernden Inhalte**, dann die **oeffentlichen Programmdaten**, danach die **erweiterten Profile**.

Das bedeutet fuer dieses Projekt:

1. `siteSettings`
2. `homeQuickLink`
3. `event`
4. `format`
5. `archiveItem`
6. `artist`
7. `dj`
8. `contributor`
9. spaeter erst `About`-Texte, `Label`, `Media`, `Shop`

---

## Vor dem Einpflegen

Bevor Inhalte in `Sanity` eingetragen werden:

1. `.env.local` korrekt setzen
2. `npm run dev` oder den bestehenden Dev-Stand laufen lassen
3. `/studio` oeffnen
4. pruefen, dass das richtige `projectId` und `dataset` aktiv sind
5. falls noetig: `npm run sanity:seed` nur fuer die Basisdokumente ausfuehren

Wichtig:

- keine Demo-Events einpflegen, nur reale oder bewusst freigegebene Inhalte
- Titel und Kurztexte direkt in der finalen Tonalitaet schreiben
- nicht mit halbgaren Bildsammlungen starten

---

## Schritt 1: `siteSettings`

### Warum zuerst

Das ist das einfachste globale Dokument und eine gute erste Sanity-Probe, ohne dass gleich ganze Seitenlogik davon abhaengt.

### Einpflegen

In `Site Settings`:

- `Site Title`
- `SEO Description`
- `Contact Email`

### Empfehlung

Zuerst nur eine saubere Minimalfassung:

- `Site Title`: `The Base e.V.`
- `SEO Description`: knappe neutrale Beschreibung der Website
- `Contact Email`: zentrale Kontaktadresse

### Noch nicht noetig

- keine ausufernden globalen Textbloecke
- keine komplexen Footer- oder Nav-Systeme

---

## Schritt 2: `homeQuickLink`

### Warum so frueh

Die drei Schnellzugaenge auf der Homepage sind der sichtbarste und risikoaermste Sanity-Einstieg.

### Es werden genau 3 Dokumente angelegt

1. `AKTUELL`
2. `NAECHSTER TERMIN`
3. `LETZTES PROJEKT`

### Pro Dokument ausfuellen

- `Eyebrow / Label`
- `Title`
- `Internal Path`
- optional `Description`
- `Order`
- `Active`

### Empfohlene Werte zum Start

#### Quick Link 1

- `Eyebrow / Label`: `AKTUELL`
- `Title`: z. B. aktueller Ausstellungsname oder zunaechst `Aktuelle Ausstellung`
- `Internal Path`: `/live/aktuelle-ausstellung`
- `Order`: `0`
- `Active`: `true`

#### Quick Link 2

- `Eyebrow / Label`: `NAECHSTER TERMIN`
- `Title`: z. B. `Laufende Formate`
- `Internal Path`: `/live/laufende-formate`
- `Order`: `1`
- `Active`: `true`

#### Quick Link 3

- `Eyebrow / Label`: `LETZTES PROJEKT`
- `Title`: z. B. `Vergangene Veranstaltungen`
- `Internal Path`: `/live/events`
- `Order`: `2`
- `Active`: `true`

### Danach pruefen

- erscheinen die drei Links in der richtigen Reihenfolge?
- stimmen Gross-/Kleinschreibung und Tonalitaet?
- zeigen sie auf die richtigen internen Routen?

---

## Schritt 3: `event`

### Warum vor `format`

`event` ist der wichtigste operative Inhaltstyp fuer diese Website. Er speist:

- aktuelle Ausstellung
- vergangene Veranstaltungen
- spaeter weitere Live-Einstiege

### Zuerst nur 2 bis 4 echte Eintraege anlegen

Nicht gleich das gesamte Archiv. Lieber:

1. eine aktuelle oder kommende Ausstellung
2. ein vergangenes Event
3. optional ein weiteres vergangenes Event
4. optional eine Release-Show oder Clubnacht

### Pro Event ausfuellen

#### Pflichtfelder

- `Title`
- `Slug`
- `Summary`
- `Status`

#### Danach

- `Kind`
- `Start Date`
- `End Date` falls noetig
- `Location`
- `External URL`

#### Spaeter oder optional

- `Body`
- `Main Image`
- `Credits`

### Empfohlene Redaktionsregel fuer `Summary`

Die `Summary` soll:

- 1 bis 2 Saetze haben
- konkret sein
- nicht werblich klingen
- fuer Karten und Uebersichtsseiten funktionieren

Nicht gut:

- zu marketinghaft
- zu wolkig
- nur Name + Datum

Gut:

- Format
- Kontext
- Ort oder Programmcharakter

### Status-Regel

- `upcoming`: bevor es stattfindet
- `ongoing`: falls es gerade laeuft
- `past`: nach dem Abschluss

### Wichtig

Eine Ausstellung kann in eurem aktuellen Setup einfach ein `event` mit `kind = exhibition` sein. Dafuer braucht ihr **noch keinen eigenen `exhibition`-Typ**.

---

## Schritt 4: `format`

### Warum nach `event`

Formate sind bei euch wichtig, aber oft erst dann wirklich sinnvoll, wenn mindestens ein reales Event oder eine Reihe schon sauber erfasst wurde.

### Zuerst nur reale, wiederkehrende Formate anlegen

Also keine hypothetischen Reihen.

Beispiele waeren spaeter:

- wiederkehrende Ausstellungsreihe
- offenes Format
- laufende Programmlinie

### Pro Format ausfuellen

#### Pflichtfelder

- `Title`
- `Slug`
- `Summary`
- `Status`

#### Danach

- `External URL`
- `Related Events`

#### Spaeter oder optional

- `Body`
- `Hero Image`

### Status-Regel

- `active`: aktuell laufend oder weiterhin gueltig
- `paused`: vorerst nicht aktiv
- `archived`: abgeschlossen oder historisch

### Wichtig

Ein `format` soll nicht einfach ein einzelnes Event doppeln.  
Ein Format beschreibt die **wiederkehrende Linie**, nicht nur einen einzelnen Termin.

---

## Schritt 5: `archiveItem`

### Warum erst jetzt

Archivobjekte sind wertvoll, aber oft aufwendiger in der redaktionellen Pflege. Deshalb erst, wenn:

- Quick Links stehen
- erste Events stehen
- laufende Formate klarer sind

### Zuerst nur wenige saubere Archivobjekte anlegen

Zum Beispiel:

1. ein Katalogeintrag
2. ein Poster
3. ein Dokumentationsobjekt

### Pro `archiveItem` ausfuellen

#### Pflichtfelder

- `Title`
- `Slug`
- `Summary`

#### Danach

- `Type Label`
- `Date`
- `External URL`

#### Spaeter oder optional

- `Image`

### Typ-Regel

- `catalogue`: fuer Katalogeintraege
- `poster`: fuer Poster, Grafik, visuelle Kommunikation
- `documentation`: fuer Doku-/Projektspuren
- `other`: nur wenn es wirklich in keine Kategorie passt

### Redaktionsregel

Archivtexte sollen nicht wie Eventteaser klingen.  
Sie sollen eher beschreiben, **was dieses Objekt im Archiv darstellt**.

---

## Schritt 6: `artist`

### Erst dann

Artists sind sinnvoll, sobald klar ist:

- welche Personen wirklich eigenstaendige Profile brauchen
- welche nur in Event- oder Formatkontexten genannt werden

### Pro Artist ausfuellen

- `Name`
- `Slug`
- `Summary`
- optional `Body`
- optional `Image`
- optionale `Links`

### Redaktionsregel

Nur Profile anlegen, die fuer die Website wirklich einen dauerhaften Mehrwert haben.

---

## Schritt 7: `dj`

Gleiche Logik wie `artist`, aber fuer DJ- und Soundprofile.

### Nur anlegen, wenn

- die Person / das Kollektiv wirklich wiederkehren soll
- oder als eigenstaendiger Teil von `Talents` relevant ist

### Pro DJ ausfuellen

- `Name`
- `Slug`
- `Summary`
- optional `Body`
- optional `Image`
- optionale `Links`

---

## Schritt 8: `contributor`

### Erst spaeter

`contributor` ist wichtig, aber nicht der erste Hebel fuer die oeffentliche Website.

### Sinnvoll fuer

- Awareness
- Produktion
- Technik
- Kuration
- Organisation
- Vereinsrollen

### Pro Contributor ausfuellen

- `Name`
- `Role`
- optional `Summary`
- optionale `Links`

---

## Was ihr bewusst noch nicht zuerst pflegen solltet

Nicht gleich am Anfang:

- alle historischen Events
- alle denkbaren Archivobjekte
- komplette Artist-Landschaften
- `Label`, `Media`, `Shop`
- grosse About-Textmigration

Der Grund:

- zu viel Stoff auf einmal
- hohe Inkonsistenzgefahr
- das Modell soll erst im echten kleinen Betrieb beweisen, dass es traegt

---

## Konkrete empfohlene Reihenfolge fuer die ersten zwei Sessions

## Session 1

1. `siteSettings` befuellen
2. 3 `homeQuickLink`-Dokumente anlegen
3. 1 echtes `event` fuer aktuelle Ausstellung anlegen
4. 1 echtes `event` fuer ein vergangenes Event anlegen
5. im Frontend pruefen, ob `/`, `/live`, `/live/aktuelle-ausstellung`, `/live/events` reagieren

## Session 2

1. 1 echtes `format` anlegen
2. 1 bis 2 `archiveItem`-Dokumente anlegen
3. `Live` und `Archive` erneut im Frontend pruefen
4. erst danach erste `artist`- oder `dj`-Profile anlegen

---

## Feldqualitaet vor Menge

Lieber:

- 2 gute `event`-Eintraege
- 1 gutes `format`
- 1 sauberer `archiveItem`

als:

- 15 halbe Dokumente
- inkonsistente Titel
- unklare Statuswerte
- zufaellige Links

---

## Pflege-Regel fuer dieses Projekt

Wenn neue Inhalte kommen:

1. zuerst inhaltlich klaeren, **was der Inhaltstyp ist**
2. dann in `Sanity` einpflegen
3. dann Frontend pruefen
4. danach wichtige Entscheidungen kurz in `Obsidian` notieren

---

## Naechster sinnvoller Anschluss

Wenn diese erste Eingabereihenfolge funktioniert, sollte als naechste Notiz entstehen:

- `sanity-field-guide.md`

Mit:

- Tonalitaetsregeln fuer `summary`
- Titelkonventionen
- Datumslogik
- Linkregeln
- wann `event` vs. `format` vs. `archiveItem`
