# Obsidian Agent Structure

## Zweck

Diese Notiz dokumentiert die projektlokale Agentenstruktur fuer den `Base Web`-Vault.

## Aktiver Agent

- `obsidian-knowledge-manager`

## Weitere dokumentierte Projektrollen

Aus `AGENTS.md` werden im Vault ausserdem diese wiederkehrenden Rollen dokumentiert:

- `frontend-ui-agent`
- `visual-qa-agent`
- `editorial-polish-agent`
- `cms-sanity-agent`
- `seo-accessibility-agent`

## Ordnerstruktur im Vault

- `05-Codex/Agents/README.md` als Index
- `05-Codex/Agents/obsidian-knowledge-manager.md` als Detailnote
- weitere Detailnoten fuer die aus `AGENTS.md` abgeleiteten Rollen

## Rolle des Agenten

Der Agent pflegt den bestehenden Obsidian-Vault `Base Web/` als Arbeitsgedaechtnis fuer:

- Projektkontext
- Statuszusammenfassungen
- MOCs und Index-Notizen
- Entscheidungen, naechste Schritte und offene Fragen
- interne Verlinkung und vorsichtige Aufraeumarbeiten

## Technische Verankerung

- Agentendefinition: `.codex/agents/obsidian-knowledge-manager.toml`
- begleitende Repo-Doku: `docs/obsidian-agent.md`
- Arbeitsbereich des Agenten: `Base Web/`

## Arbeitsprinzipien

- kleine, reversible Aenderungen
- bestehende Vault-Struktur vor Umbauten respektieren
- keine unnötigen Notizen, Tags oder Metadaten erzeugen
- wichtige Informationen nicht still loeschen
- Archivierungen nur mit explizitem Ziel und Grund
- Ambiguitaeten markieren statt Fakten zu erfinden

## Bezug zur Vault-Struktur

Der Agent soll bevorzugt mit bestehenden MOCs und README-Notizen arbeiten:

- [[00-Context/README|Context]]
- [[02-Content/README|Content]]
- [[03-UX/README|UX]]
- [[04-Tasks/README|Tasks]]
- [[05-Codex/README|Codex]]
- [[06-Decisions/README|Decisions]]

## Typische Nutzung

Der Agent ist dafuer gedacht,

- nach groesseren Website-Aenderungen die passenden Vault-Notizen nachzuziehen
- Status und Implementierungsstand knapp zu aktualisieren
- Seitennotizen mit aktiven Routen abzugleichen
- alte oder doppelte Notizen vorsichtig zu bereinigen

## Beispielaufruf

In Codex mit:

- `@obsidian-knowledge-manager Aktualisiere den Base Web Vault anhand des aktuellen Website- und Sanity-Stands und halte Entscheidungen, offene Fragen und betroffene Seitennotizen fest.`

## Pflegehinweis

Wenn weitere projektlokale Agenten oder klar benannte Rollen entstehen, sollten sie ebenfalls hier vermerkt und klar von Skill-, Plugin- oder allgemeinen Repo-Notizen unterschieden werden.

## Graph-Verbindungen

- [[05-Codex/README|Codex]]
- [[05-Codex/Agents/README|Agents]]
- [[05-Codex/Agents/frontend-ui-agent|frontend-ui-agent]]
- [[04-Tasks/README|Tasks]]
- [[06-Decisions/README|Decisions]]
