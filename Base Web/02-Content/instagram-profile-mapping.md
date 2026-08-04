# Instagram Profile Mapping

## Zweck

Diese Notiz sammelt, welche Inhalte aus dem oeffentlich sichtbaren Instagram-Profil `@the.base.ev` in die bestehende `Sanity`-Struktur uebernommen wurden.

Wichtig:

- keine Bilder wurden uebernommen
- es wurden nur Textsignale und klar erkennbare Projektinfos verwendet
- wo etwas nicht eindeutig genug war, wurde es nicht als Datensatz angelegt

## Vereinsinfo

Aus dem oeffentlichen Profil uebernommen:

- Name: `The Base`
- Selbstbeschreibung: `Association for the promotion of culture beyond class and sector`
- Kontakt: `info@thebase-ev.de`
- Kategorie: `Cultural Center`

Diese Informationen wurden in `siteSettings` abgebildet.

## In Sanity uebernommene Projekte / Programme

### `event`

- `The Roots of All That Exists`
- `Total Local`
- `The Base @ Open Ground`
- `The Base and Kreisstrich at AZ Aachen`
- `The Base is turning 10`
- `RRADE x THE BASE — Rhythmic Resonance EP Release Show`

### `format`

- `Total Local`

### `archiveItem`

- `Total Local — Artist Announcement Vol. 1`
- `Total Local — Artist Announcement Vol. 2`
- `Open Call for Exhibition at Bunker of Art`
- `The Base is turning 10 — Poster`

### `contributor`

- `Neutron Aung`
- `ranigerges`
- `treesmerx`

## Bewusst nicht uebernommen

Nicht als eigener Datensatz angelegt wurden zum Beispiel:

- Posts ohne ausreichend inhaltliche Beschreibung
- reine Medien- oder Kurzposts ohne klare Projektrolle
- Acts / Personen, wenn nur Namensnennungen vorlagen, aber kein tragfaehiger Profilkontext fuer `artist` oder `dj`

## Anschluss

Wenn spaeter weitere Profilinfos uebernommen werden:

1. zuerst pruefen, ob es `event`, `format`, `archiveItem`, `artist`, `dj` oder `contributor` ist
2. dann nur eindeutige Informationen uebernehmen
3. danach im Frontend pruefen, wo der Datensatz sichtbar wird
