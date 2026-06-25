# Obsidian Workspace

Dieser Ordner ist die projektbegleitende Wissensbasis fuer die The-Base-Website und als eigenstaendiger Obsidian-Vault vorbereitet.

## Zweck des Vaults

Der Vault soll drei Dinge gleichzeitig leisten:

1. Projektwissen festhalten, das nicht direkt im Code leben sollte
2. Inhalte, Seitenlogik und UI-Entscheidungen nachvollziehbar machen
3. kuenftige redaktionelle und technische Aenderungen in einen ruhigen Arbeitsfluss ueberfuehren

Der Vault ist bewusst nah am Projekt aufgebaut. Er dokumentiert nicht abstrakt, sondern entlang der echten Seiten, Komponenten und Entscheidungen.

## Arbeitsprinzip

- Die Website bleibt die Produktoberflaeche.
- Der Vault bleibt das Arbeitsgedaechtnis.
- Nach groesseren Layout-, Copy-, Routing- oder CMS-Aenderungen werden die passenden Notizen mit aktualisiert.
- Notizen sollen knapp, klar und pflegbar bleiben. Lieber viele kleine, brauchbare Notes als wenige zu breite Sammeldateien.

## Ordnerstruktur

- `00-Context/`  
  Projektkontext, Zielbild, Rahmen, Referenzen

- `01-Design/`  
  visuelle Prinzipien, Typografie, Editorial-Richtung, Layoutlogik

- `02-Content/`  
  Seiteninhalte, Seitennotizen, Quellen, Mapping von Themen auf Routen

- `03-UX/`  
  Nutzerfluss, UI/UX-Bausteine, Interaktionen, responsive Verhalten

- `04-Tasks/`  
  laufende Aufgaben, naechste Schritte, To-dos

- `05-Codex/`  
  technische Arbeitsnotizen, Integrationsplaene, Agenten-/Codex-bezogene Dokumentation

- `06-Decisions/`  
  getroffene Entscheidungen und ihre Begruendung

- `07-Meetings/`  
  Gespraeche, Abstimmungen, Feedback-Runden

- `99-Templates/`  
  wiederverwendbare Vorlagen fuer neue Notes

## Neue Detailstruktur

### Seiten

Unter `02-Content/Pages/` liegt jetzt eine eigene Notiz fuer jede relevante Route der Website. Diese Notes dokumentieren:

- Route
- zugehoerige Quelldatei
- Zweck der Seite
- redaktionelle Rolle
- wichtige Inhalte
- Verbindung zu anderen Seiten oder Komponenten

### UI- und UX-Elemente

Unter `03-UX/UI-Elements/` liegt jetzt eine eigene Notiz fuer die zentralen Oberflaechenelemente. Diese Notes dokumentieren:

- verantwortliche Komponente
- Aufgabe innerhalb des Systems
- Interaktionslogik
- responsive Verhalten
- typische Fehlerbilder oder Pflegehinweise

### Agentenstruktur

Unter `05-Codex/Agents/` liegt jetzt eine eigene Dokumentation fuer:

- formal eingerichtete Projekt-Agenten unter `.codex/agents/`
- aus `AGENTS.md` abgeleitete Projektrollen fuer wiederkehrende Arbeitsmodi
- Ursprungsprompts oder aus `AGENTS.md` verdichtete Promptfassungen

## Pflegeempfehlung

Nach einer Aenderung kann man sich grob an diesem Raster orientieren:

- Textaenderung auf einer Seite -> `02-Content/Pages/...`
- Layout- oder Interaktionsaenderung -> `03-UX/UI-Elements/...`
- groessere Richtungsentscheidung -> `06-Decisions/...`
- technische Integration oder Setup -> `05-Codex/...`
- neue offene Baustelle -> `04-Tasks/...`

## Einstieg

Am schnellsten findet man sich ueber diese Bereiche zurecht:

- [02-Content/Pages/](</Users/stanynyssen/Documents/Base 002 3/Base Web/02-Content/Pages>)
- [03-UX/UI-Elements/](</Users/stanynyssen/Documents/Base 002 3/Base Web/03-UX/UI-Elements>)
- [05-Codex/Agents/](</Users/stanynyssen/Documents/Base 002 3/Base Web/05-Codex/Agents>)
- [docs/obsidian-local-setup.md](/Users/stanynyssen/Documents/Base%20002%203/docs/obsidian-local-setup.md)

## Graph-Verbindungen

- [[02-Content/Pages/home|Home]]
- [[03-UX/UI-Elements/header|Header]]
- [[06-Decisions/projektchronik|Projektchronik]]
- [[05-Codex/sanity-integration-plan|Sanity Integration Plan]]
- [[05-Codex/Agents/README|Agents]]

**Aktive Hauptbereiche**

- `Startseite` → `/`
- `Live` → `/live`
- `Archive` → `/archive`
- `Media` → `/media` 
- `About` → `/about`

**Wichtige globale UI-Bausteine**
## 1. Allgemeine Bezeichnungen für Textbausteine

Diese Begriffe kannst du fast überall benutzen:

- `Eyebrow`  
    kleines Bereichslabel über einem Titel, z. B. „Aktuell“, „Rückblick“, „Media“
- `Haupttitel / Display Title / H1`  
    die große prägende Überschrift eines Seiten-Intros
- `Intro-Beschreibung / Lead`  
    der erste erklärende Absatz direkt neben oder unter dem Haupttitel
- `Intro-Note / Zweittext`  
    optionaler zweiter, etwas leiserer Einleitungstext
- `Section Eyebrow`  
    kleines Label innerhalb eines Seitenabschnitts
- `Section Title / H2`  
    großer Titel eines Abschnitts
- `Section Description`  
    kurzer erklärender Text zum Abschnitt
- `Card Meta`  
    kleine Zeile über dem Card-Titel
- `Card Title`  
    eigentlicher Titel einer Row/Card
- `Card Description`  
    kurzer Beschreibungstext in der Row/Card
- `Card CTA`  
    rechter Linktext, aktuell meist „Weiter“
- `Bullet-Liste / Milestones / Key Points`  
    Liste mit roten Punkten
- `Form Intro`  
    Einleitungstext vor einem Formular
- `Field Label`  
    Feldbezeichnung im Formular
- `Field Help Text`  
    kurzer erklärender Zusatz zu einem Feld
- `Submit Label`  
    Text auf dem Button

---

## 2. Startseite `/`

### Bereiche

- `Schnelleinstiege`
- `Hero-Bild`
- `schwarzes Intro-Panel`
- `About-Teaser-Sektion`

### Texte darin

**Schnelleinstiege**

- `Quick Entry Meta`
- `Quick Entry Title`
- `Quick Entry Link`

**Schwarzes Intro-Panel**

- `Home Intro Heading`
- `Home Intro Statement`
- `Home Intro Note`
- `Home Milestones`

**About-Teaser**

- `Section Eyebrow`
- `Section Title`
- `Section Description`
- darunter pro Eintrag:
    - `Card Meta`
    - `Card Title`
    - `Card Description`
    - `Card CTA`

---

## 3. Live `/live`

### Bereiche

- `Live PageIntro`
- `Aktuelle Veranstaltung`
- `Eventarchiv`
- `Laufende Formate`

### Texte darin

**PageIntro**

- `Live H1`
- `Live Intro Description`

**Section: Aktuelle Veranstaltung**

- `Section Eyebrow`
- `Section Title`
- `Section Description`
- `Current Event Card Meta`
- `Current Event Card Title`
- `Current Event Card Description`

**Section: Eventarchiv**

- `Archive Section Title`
- `Archive Section Description`
- `Past Events Card Title`
- `Past Events Card Description`

**Section: Laufende Formate**

- `Formats Section Title`
- `Formats Section Description`
- `Formats Card Title`
- `Formats Card Description`

---

## 4. Archive `/archive`

### Bereiche

- `Archive PageIntro`
- `Katalog`
- `Poster`

### Texte darin

**PageIntro**

- `Archive H1`
- `Archive Intro Description`

**Section: Katalog**

- `Catalog Eyebrow`
- `Catalog Section Title`
- `Catalog Section Description`
- `Catalog Card Meta`
- `Catalog Card Title`
- `Catalog Card Description`

**Section: Poster**

- `Poster Eyebrow`
- `Poster Section Title`
- `Poster Section Description`
- `Poster Card Meta`
- `Poster Card Title`
- `Poster Card Description`

---

## 5. Media `/media`

### Bereiche

- `Media PageIntro`
- `Raum, Klang und Bild`

### Texte darin

**PageIntro**

- `Media H1`
- `Media Intro Description`
- `Media Intro Note`

**Section**

- `Media Section Eyebrow`
- `Media Section Title`
- `Media Section Description`

**Cards**

- `Booking Card Meta`
- `Booking Card Title`
- `Booking Card Description`
- `Productions Card Meta`
- `Productions Card Title`
- `Productions Card Description`

---

## 6. About `/about`

### Bereiche

- `About PageIntro`
- `Kurzprofil`
- `The Base`
- `Anfragen`
- `Awareness`

### Texte darin

**PageIntro**

- `About H1`
- `About Intro Description`
- `About Intro Note`

**Kurzprofil**

- `Profile Eyebrow`
- `Profile Title`
- `Profile Paragraph 1`
- `Profile Paragraph 2`
- `Profile Paragraph 3`

**Section: The Base**

- `Base Section Eyebrow`
- `Base Section Title`
- `Base Section Description`
- `Base Card Title`
- `Base Card Description`

**Section: Anfragen**

- `Inquiry Section Eyebrow`
- `Inquiry Section Title`
- `Inquiry Section Description`
- `Open Call Card`
- `Support Membership Card`

**Section: Awareness**

- `Awareness Section Eyebrow`
- `Awareness Section Title`
- `Awareness Section Description`
- `Awareness Card Title`
- `Awareness Card Description`

---

## 7. Unterseiten in About

### `/about/the-base`

- `The Base H1`
- `The Base Intro Description`
- `The Base Intro Note`
- `Since Kunstroute Title`
- `Body Paragraphs`
- `Leitlinien Panel`
- `Principles List Items`

### `/about/kontakt`

- `Kontakt H1`
- `Kontakt Intro Description`
- `Adresse Block`
- `Kontakt Block`
- `Hinweis Block`

### `/about/code-of-conduct`

- `Awareness H1`
- `Awareness Intro`
- `Awareness Body`

### `/about/foerdermitgliedschaft`

- `Fördermitgliedschaft H1`
- `Fördermitgliedschaft Intro`
- `Support Form`

### `/mitmachen`

- `Open Call H1`
- `Open Call Intro`
- `MitmachenForm`

---

## 8. Unterseiten in Media

### `/media/buchung`

- `Booking H1`
- `Booking Intro Description`
- `Booking Note`
- `MediaBookingForm`

### `/media/produktionen`

- `Productions H1`
- `Productions Intro`
- `Production Entries`

---

## 9. Formulare: wie du die Texte benennen kannst

### `MediaBookingForm`

- `Form Section Title`
- `Form Intro`
- `Field Label`
- `Field Placeholder`
- `Field Help Text`
- `Required Field Note`
- `Submit Button Label`
- `Success / Error Message`

### `NewsletterForm`

- `Newsletter Label`
- `Newsletter Description`
- `Email Placeholder`
- `Submit Label`

### `MitmachenForm` / `SupportMembershipForm`

- gleiches Schema:
    - `Form Title`
    - `Form Intro`
    - `Field Label`
    - `Help Text`
    - `Submit Label`