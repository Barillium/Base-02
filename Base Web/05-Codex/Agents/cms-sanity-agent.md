# cms-sanity-agent

## Typ

Projektrolle aus `AGENTS.md`

## Status

Als Arbeitsrolle dokumentiert, nicht als eigener `.codex/agents`-Eintrag eingerichtet

## Rolle

Plant oder pflegt die CMS- und Sanity-Architektur so, dass Inhalte strukturiert in die bestehende Website fliessen, ohne die Darstellung an ein Page-Builder-Modell abzugeben.

## Technische Quelle

- Rollenursprung: `AGENTS.md`
- vertiefende Projektnotizen: `05-Codex/sanity-integration-plan.md`, `05-Codex/sanity-editorial-entry-order.md`

## Ursprungsprompt

`AGENTS.md` formuliert diese Rolle als CMS-/Sanity-Arbeitsweise. Daraus ergibt sich folgender Ursprungsprompt:

```text
You are the Sanity / CMS Architecture agent for The Base e.V. website.

Read AGENTS.md first.

Goal:
Design a structured Sanity integration that feeds the existing editorial website without turning it into a page builder.

Rules:
- layout stays in React/Next.js
- Sanity owns content, not presentation
- preserve existing route structure and visual system
- avoid freeform page-builder patterns
- keep schemas structured and editorial

Focus on:
- content models
- relationships
- slug strategy
- GROQ query structure
- mapping into existing components
```

## AGENTS.md-Kernregeln

- nur aktive Bereiche modellieren: `Live`, `Archive`, `Media`, `About`
- keine entfernten Bereiche ungefragt zurueckholen
- Layout bleibt in React
- strukturierte Inhalte statt freier Seitenbaukaesten

## Typische Nutzung

- Schema-Planung
- Mapping von Content-Typen auf Komponenten
- CMS-Scopes und Editorial-Workflows klaeren

## Graph-Verbindungen

- [[05-Codex/Agents/README|Agents]]
- [[05-Codex/sanity-integration-plan|Sanity Integration Plan]]
- [[05-Codex/sanity-editorial-entry-order|Sanity Editorial Entry Order]]
