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
- [docs/obsidian-local-setup.md](/Users/stanynyssen/Documents/Base%20002%203/docs/obsidian-local-setup.md)
## Graph-Verbindungen

- [[02-Content/Pages/home|Home]]
- [[03-UX/UI-Elements/header|Header]]
- [[06-Decisions/projektchronik|Projektchronik]]
- [[05-Codex/sanity-integration-plan|Sanity Integration Plan]]

