# Obsidian vs. Sanity

`Obsidian` und `Sanity` haben in diesem Projekt unterschiedliche Rollen.

## Bleibt in Obsidian

- Rohtexte und Langfassungen
- Recherchematerial und Kontextnotizen
- Versionen und Zwischenstaende
- interne Strukturentwuerfe
- Themencluster und Verbindungswissen
- offene Fragen, Abstimmungen und Redaktionsentscheidungen
- Archivnotizen zu vergangenen Projekten

## Geht nach Sanity

- freigegebene Website-Texte
- strukturierte Event-, Archiv-, Media- und Seiteninhalte
- Inhalte, die auf der Website gefiltert, gelistet oder referenziert werden muessen
- final geklaerte Credits, Slugs und publizierbare Kurzfassungen

## Sollte nicht doppelt gepflegt werden

- identische finale Webtexte in `Obsidian` und `Sanity`
- Frontend-spezifische Layoutlogik
- Live-Status von Cards, Hero-Bloecken oder Formularen
- CMS-Felder, die nur fuer Ausspielung oder Sortierung gebraucht werden

## Empfehlung fuer die Uebergabe

- In `Obsidian` entsteht die Denk- und Textarbeit.
- In `Sanity` landet nur die freigegebene, strukturierte Fassung.
- Nach erfolgreicher Uebergabe bekommt die Obsidian-Note den Status `transferredToSanity` oder `published`.
- Wenn `Sanity` spaeter geaendert wird, sollte die Obsidian-Note nur dann nachgezogen werden, wenn sie weiterhin als Arbeits- oder Wissensnotiz gebraucht wird.
