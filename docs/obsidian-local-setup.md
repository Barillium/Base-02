# Obsidian Local Setup

Der Projektordner [Base Web](</Users/stanynyssen/Documents/Base 002 3/Base Web>) ist jetzt als eigenstaendiger Obsidian-Vault vorbereitet.

## Was bereits eingerichtet ist

- Vault-Grundkonfiguration in `Base Web/.obsidian/`
- Markdown-Link-Verhalten fuer projektinterne Verweise
- Templates unter `Base Web/99-Templates/`
- bestehende Projektstruktur bleibt unveraendert

## Lokal in Obsidian verwenden

1. Obsidian oeffnen
2. `Open folder as vault` waehlen
3. Diesen Ordner auswaehlen:

   `/Users/stanynyssen/Documents/Base 002 3/Base Web`

Danach erscheint der bestehende Wissensbereich direkt als Vault im normalen Obsidian-Sidebar-Workflow.

## Enthaltene Templates

- `99-Templates/meeting-note.md`
- `99-Templates/decision-note.md`
- `99-Templates/task-note.md`

## Hinweis zu MCP

Falls der Vault spaeter auch ueber einen lokalen MCP-Server angebunden werden soll, ist der sinnvollste naechste Schritt ein kleiner Filesystem-MCP nur fuer diesen Vault. Die direkte Obsidian-Vault-Anbindung ist aber der stabilere erste Schritt, weil sie ohne Plugin- oder Netzwerkabhaengigkeit sofort auf diesem Rechner funktioniert.
