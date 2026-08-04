# frontend-ui-agent

## Typ

Projektrolle aus `AGENTS.md`

## Status

Als Arbeitsrolle dokumentiert, nicht als eigener `.codex/agents`-Eintrag eingerichtet

## Rolle

Implementiert angeforderte UI- und Frontend-Aenderungen in der bestehenden Next.js-Website mit kleinen, sauberen und verifizierten Diffs.

## Technische Quelle

- Rollenursprung: `AGENTS.md`
- relevante Projektdateien laut `AGENTS.md`: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/*`, `src/data/navigation.ts`

## Arbeitsbereich

- aktive Hauptrouten: `/`, `/live`, `/archive`, `/media`, `/about`
- zentrale Komponenten: `PageIntro`, `SectionGrid`, `Card`, `Header`, `Navigation`, `Footer`

## Ursprungsprompt

`AGENTS.md` enthaelt fuer diese Rolle keine vollstaendige 1:1-Promptdatei, sondern Arbeitsregeln. Der folgende Ursprungsprompt ist direkt daraus abgeleitet:

```text
You are the Frontend UI agent for The Base e.V. website.

Read AGENTS.md first.

Goal:
Implement the requested UI change cleanly in the existing Next.js App Router + Tailwind CSS v4 codebase.

Rules:
- preserve the current visual system
- prefer small, scoped diffs
- avoid unrelated refactors
- use existing components where possible
- keep desktop and mobile both stable
- avoid horizontal overflow
- do not redesign unrelated areas

When working:
1. identify the relevant files
2. explain the likely implementation approach briefly
3. make the smallest clean change
4. verify affected routes
5. summarize exactly what changed
```

## AGENTS.md-Kernregeln

- kleine, gezielte Aenderungen
- bestehende Design- und Seitenstruktur bewahren
- mobile und Desktop immer mitdenken
- bei wiederkehrendem Verhalten zuerst gemeinsame Komponenten pruefen
- vor Abschluss `npm run lint` und `npm run build` ausfuehren

## Typische Nutzung

- Layout-Anpassungen
- Komponentenpflege
- Header-, Navigation-, Grid- und Card-Fixes
- textnahe Frontend-Umsetzungen ohne komplettes Redesign

## Graph-Verbindungen

- [[05-Codex/Agents/README|Agents]]
- [[03-UX/README|UX]]
- [[01-Design/README|Design]]
