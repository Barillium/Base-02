# Projektchronik

## Zweck

Diese Notiz sammelt die groesseren Aenderungen am Projekt in zeitlicher Reihenfolge.

Wichtig:
- Die Chronik ist **rekonstruiert** aus Git-Historie, Arbeitsverlauf und vorhandenen Projektdateien.
- Sie ist als Arbeitsgedaechtnis gedacht, nicht als juristisch exakte Release-Dokumentation.
- Wenn kuenftig groessere Aenderungen passieren, sollte diese Notiz mit Datum fortgefuehrt werden.

## Quellenbasis

- Git-Historie des Repos
- Codex-Arbeitsverlauf im Projekt
- vorhandene Dokumentationsnotizen im Vault

---

## 2026-05-21

### Initialer Website-Neuaufbau

- Grundlegender Neuaufbau der The-Base-Website im aktuellen Next.js-/Tailwind-Stack
- Uebernahme der bestehenden Informationsarchitektur in eine reduzierte, editorialere Website-Struktur
- Einbindung des Logos und Aufbau der zentralen Seiten

### Betroffene Bereiche

- Startseite
- Hauptnavigation
- globale Styles
- erste Bereichsseiten

### Git-Hinweis

- `596cdbb` - `Initial The Base site rebuild`

---

## 2026-05-23

### Editorialer Copy-Pass und Layout-Polish

- Straffung und Bereinigung redundanter Texte
- erste groessere Layout-Anpassungen fuer ruhigere Kanten und konsistentere Abstaende
- Aufbau einer kleinen projektbezogenen GitHub-CLI
- Einrichtung von GitHub-Remote, Login und erstem Draft-PR-Flow
- QA-Sammelcheck vorbereitet

### Betroffene Bereiche

- `/live` und Unterseiten
- globale Layoutstruktur
- GitHub-Workflow im Repo

### Git-Hinweis

- `9a48861` - `Polish site layout and add QA tooling`

---

## 2026-05-24

### Responsive Korrekturen und erste visuelle Nachschaerfung

- Korrekturen gegen Ueberlappungen in `Talents`, `Media` und `About`
- feinere Anpassungen an Intro- und Section-Layouts fuer Desktop
- mobile Navigation in eine horizontale Scroll-Zeile ueberfuehrt
- Playwright lokal eingerichtet
- `qa`-Script als Sammelpruefung angelegt

### Inhaltliche Korrekturen

- `Laufende Formate` als eigene Unterseite sauber eingefuehrt
- `RRADE x THE BASE` in vergangene Veranstaltungen verschoben
- erste strukturelle Trennung zwischen Homepage-Kuration und Unterseiten vertieft

### Deployment / Betrieb

- wiederholte Dev-Server-Korrekturen
- oeffentliche Live-Version auf Cloudflare aktualisiert

---

## 2026-05-27

### Sanity-Vorbereitung und CMS-Strategie

- Sanity-Client in die Website integriert
- eingebettetes Sanity Studio vorbereitet
- erste Schemas, Queries und Revalidate-Struktur angelegt
- Sanity schrittweise mit Fallback-Logik statt Big-Bang-Migration eingefuehrt

### Redaktionelle Modellierung

- Priorisierung von `homeQuickLink`, `event`, `format`, `archiveItem`
- Beispiel- und Instagram-Signale in strukturierte Inhalte uebersetzt
- spaeter einige Demo-/Beispielinhalte wieder neutralisiert, um echte CMS-Pflege sauber vorzubereiten

### Obsidian / Wissensbasis

- eigener Obsidian-Vault innerhalb des Projekts angelegt
- erste Sanity-Planungsnotizen und redaktionelle Arbeitsreihenfolge dokumentiert

### Homepage / Inhaltsstrategie

- Homepage mehrfach kuratiert und vereinfacht
- Bereiche wie `Label`, `Media`, `Shop` und spaeter auch `Live` von der Startseite entfernt
- Schnellzugriffe (`Aktuell`, `Naechster Termin`, `Letztes Projekt`) editorial ueberarbeitet

---

## 2026-06-02

### Sprachliche und inhaltliche Korrekturen

- taxonomische, CMS-hafte Sprache zugunsten kuratorischerer Formulierungen reduziert
- problematische Begriffe wie `Klubnacht`, `Clubnacht`, `Nachtformate` und verwandte Begriffe entfernt
- Inhalte an die offizielle Aussenwirkung des Vereins angepasst

### Responsive / Layout-Fixes

- mehrere Unterseiten auf Display-Headline-Umbrueche und Split-Layout-Probleme hin nachjustiert
- erste systematische Sweep-Phase gegen Ueberlappungen und harte Restumbrueche

---

## 2026-06-03

### Headline-Wrapping und Grid-System

- groessere Display-Titel auf Haupt- und Unterseiten gezielt beruhigt
- explizite Titelzeilen fuer kritische Ueberschriften eingesetzt
- `About`, `Live`, `Label`, `People`, `Archive`, `Shop` und Detailseiten auf Umbruch- und Spaltenprobleme geprueft

### Responsive Qualitaet

- fruehere Einspalten-/Stacking-Fallbacks fuer empfindliche Split-Layouts
- Korrekturen fuer gequetschte Zwischenzustande bei mittleren Desktop-Breiten
- Footer-/Newsletter-Layout robuster gemacht

### Dokumentation

- `AGENTS.md` mit gestalterischen und QA-Regeln erweitert

---

## 2026-06-04

### Sticky Shrinking Header

- Header auf sticky Verhalten mit subtiler Schrumpfung beim Scrollen umgestellt
- ruhigeres Scroll-Verhalten ohne laute Animation oder Layout-Jitter
- auf Mobile, Tablet und Desktop verifiziert

### Obsidian-Vault deutlich ausgebaut

- Vault-Struktur als echter Arbeitsraum weiterentwickelt
- Seitennotizen fuer alle relevanten Routen angelegt
- UI-/UX-Notizen fuer die zentralen Komponenten angelegt
- sichtbare Seitentexte in den Notizen erfasst
- Setup-Dokumentation an den echten Vault-Namen `Base Web` angepasst

---

## Fortfuehrung ab jetzt

Fuer kuenftige Eintraege empfiehlt sich dieses Format:

### YYYY-MM-DD

- Aenderung
- betroffene Bereiche
- ggf. Route, Komponente oder Infrastruktur
- falls relevant: Link zu Entscheidung, Task oder Meeting-Notiz
