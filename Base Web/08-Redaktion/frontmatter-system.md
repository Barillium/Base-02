# Frontmatter-System

Das Frontmatter soll leichtgewichtig bleiben. Es dient der redaktionellen Orientierung, nicht der Simulation eines CMS.

## Kernfelder

- `status`
  `idea | draft | editing | approved | transferredToSanity | published`
- `contentType`
  z. B. `pageDraft`, `eventDraft`, `artistProfile`, `projectProfile`, `aboutText`, `pressText`
- `pageTarget`
  Zielseite oder Zielbereich wie `/live`, `/archive`, `/media`, `/about`
- `slug`
  nur ausfuellen, wenn ein sinnvoller Website-Bezug existiert
- `language`
  meist `de` oder `en`
- `relatedPeople`
  Liste relevanter Personen, Kollektive oder Rollen
- `relatedProjects`
  Liste relevanter Formate, Projekte oder Reihen
- `publishToSanity`
  `true` oder `false`
- `updatedAt`
  Datum der letzten inhaltlichen Pflege im Format `YYYY-MM-DD`

## Optional nur bei echtem Bedarf

- `sourceNotes`
  wenn mehrere interne Notes in eine Zielnotiz einfliessen
- `archiveReason`
  nur bei Archivierung
- `sanityDocumentType`
  nur wenn die Uebergabe bereits klar ist

## Beispiel

```yaml
---
status: draft
contentType: pageDraft
pageTarget: /about
slug: the-base
language: de
relatedPeople: []
relatedProjects: []
publishToSanity: true
updatedAt: 2026-07-02
---
```

## Hinweise

- Nicht jedes Feld muss in jeder Note vorkommen.
- Wenn ein Feld keinen echten Nutzen hat, bleibt es weg.
- `publishToSanity: false` ist der Standard fuer reine Arbeits- oder Wissensnotizen.
