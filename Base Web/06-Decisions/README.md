# Decisions

## Zweck

Wichtige Entscheidungen mit kurzem Grund festhalten.

## Bisherige Entscheidungen

- Deployment ueber Cloudflare Workers mit OpenNext
- reduzierte, editorial geordnete Startseite statt vollstaendiger Bereichsuebersicht
- groessere Inhalte auf Unterseiten statt auf der Homepage verdichten
- gestalterische Zurueckhaltung statt klassischer Marketingstruktur
- Sanity wird schrittweise vorbereitet und zunaechst mit optionalem Client-Fallback integriert statt in einem grossen Komplettumbau
- das erste CMS-Setup folgt dem Plan ueber ein eingebettetes Studio im selben Repo statt ueber ein getrenntes Schwesterprojekt
- die ersten seedbaren Inhalte folgen den Plan-Prioritaeten: `homeQuickLink`, `event`, `format`, `archiveItem`
- bestehende fixe Routen wie `/live/events`, `/archive/poster` oder `/people/djs` bleiben vorerst bestehen; Sanity fuellt zuerst die Einstiegs-Cards und Uebersichtslogik statt sofort dynamische Detailrouten zu erzwingen
- fuer die aktuelle Vorbereitungsphase bleiben Event- und Archivseiten bewusst ohne eingetragene Beispielmotive; Bildpflege folgt erst mit echten CMS-Inhalten
- eingetragene Beispiel-Events und Archivbeispiele werden wieder entfernt, damit die Seiten neutral bleiben und kuenftig mit echten CMS-Datensaetzen statt Demo-Inhalten befuellt werden
- das Studio wird schon vor der eigentlichen Content-Pflege redaktionell geordnet, damit Feldlogik und Eingabereihenfolge spaeter nicht nebenbei unter Produktionsdruck korrigiert werden muessen
- beim Uebernehmen von Instagram-Inhalten werden nur klar lesbare Textsignale und Projektangaben in Sanity uebernommen; Bilder und uneindeutige Personen-/Projektzuordnungen bleiben zunaechst draussen
- fuer dieses Repo wurde ein eigenes neues Sanity-Projekt angelegt, damit Website-Struktur und redaktionelle Bearbeitung nicht versehentlich in eines der vorhandenen Test-/Altprojekte laufen
- die `Live`-Uebersicht zeigt fuer `Eventarchiv` und `Laufende Formate` bewusst Uebersichtslinks statt einzelner Beispielposts
- der aktuelle `Live`-Einstieg ist sprachlich von `Aktuelle Ausstellung` auf `Aktuelle Veranstaltung` verallgemeinert, damit auch Konzerte oder andere Formate sauber darunter fallen
- die Homepage liest kuratierte Schnellzugaenge, Milestones und `About`-Verweise bevorzugt aus `Sanity`, bleibt aber ueber Fallback-Texte editorial stabil
- `Media / Produktionen` und mehrere feste `About`-Seiten werden nicht als freie Seitenlogik modelliert, sondern als gezielte `mediaProject`- und `staticPage`-Inhalte gepflegt
- das Studio folgt in seiner Desk-Struktur bewusst den aktiven oeffentlichen Bereichen `Setup`, `Live`, `Archive`, `Media` und `About / Fixed Pages`
- Legacy-Routen bleiben vorerst im Code sichtbar, werden aber in Navigation, Scope und Vault klar von den aktiven Bereichen getrennt
- die Agentenstruktur des Projekts wird im Vault doppelt lesbar gehalten: als formaler `.codex`-Agent und als dokumentierte Rollen aus `AGENTS.md`

## Verwandte Notiz

- Projektverlauf: [projektchronik.md](</Users/stanynyssen/Documents/Base 002 3/Base Web/06-Decisions/projektchronik.md>)

## Eintragsformat

- Entscheidung
- Grund
- betroffene Dateien oder Bereiche
- Datum

## Graph-Verbindungen

- [[06-Decisions/projektchronik|Projektchronik]]
- [[05-Codex/sanity-integration-plan|Sanity Integration Plan]]
- [[04-Tasks/README|Tasks]]
