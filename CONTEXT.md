# Project Context

## Purpose

This repo contains the website for **The Base e.V.**, a cultural platform in Aachen at the **BOA Bunker of Art**.

The site presents The Base as an open cultural infrastructure for:

- exhibitions
- concerts
- workshops
- electronic music and label work
- archive work
- artists, DJs, collectives, contributors
- media production at the BOA Bunker of Art
- prints, merch, vinyl and small editions
- participation, awareness and community work

Keep the site editorial, direct, local, credible and culturally literate. Avoid generic marketing language, exaggerated claims and keyword stuffing.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4 through `@import "tailwindcss"`
- No CMS is currently used
- Sanity is not part of the current implementation

Important paths:

- `src/app/page.tsx`: home page
- `src/app/layout.tsx`: global metadata, root layout, JSON-LD injection
- `src/app/globals.css`: visual system, typography scale, layout shell, header sizing
- `src/lib/seo.ts`: SEO helpers, canonical URLs, site metadata
- `src/components/SiteJsonLd.tsx`: Organization and WebSite structured data
- `src/app/sitemap.ts`: sitemap route
- `src/app/robots.ts`: robots route
- `src/data/navigation.ts`: main navigation and child routes
- `src/components/Header.tsx`: sticky header
- `src/components/Navigation.tsx`: top-level nav links
- `src/components/Card.tsx`: repeated linked teaser rows for subpages
- `src/components/PageIntro.tsx`: shared page H1 intro
- `src/components/SectionGrid.tsx`: shared section layout
- `src/components/SimplePage.tsx`: compact wrapper for simple detail pages

## Current Design System

The visual system is restrained, editorial and typography-led.

## Rebuild Goal

This file should now be treated as a **rebuild specification**, not only as background context.

If Codex is asked to recreate this website from scratch, the goal is:

- reproduce the same information architecture
- preserve the same visual hierarchy
- preserve the same fonts, spacing logic and grid structure
- preserve the same hover behavior and navigation behavior
- preserve the same page purposes and SEO intent
- stay as close as possible to the current live implementation before inventing anything new

When there is any ambiguity, the current codebase is the source of truth, especially:

- `src/app/globals.css`
- `src/components/Header.tsx`
- `src/components/Navigation.tsx`
- `src/components/Card.tsx`
- `src/components/PageIntro.tsx`
- `src/components/SectionGrid.tsx`
- `src/data/navigation.ts`
- route files in `src/app/**/page.tsx`

Rebuild priority order:

1. exact route structure and page hierarchy
2. exact visual system and layout behavior
3. exact typography scale and font roles
4. exact interaction patterns
5. close copy and SEO behavior

Anything not explicitly improved by the user should be copied, not reinterpreted.

### Design Tokens

The global CSS tokens live in `src/app/globals.css`:

```css
:root {
  --ink: #111111;
  --paper: #f2f1ed;
  --muted: #3f3f3f;
  --line: #bdb9b1;
  --accent: #c7352a;
  --accent-soft: #e26c63;
  --font-body: "IBM Plex Sans";
  --font-display: "Barlow Condensed";
}
```

Token usage:

- `--paper` is the site background and should remain the dominant surface.
- `--ink` is the primary text and black-panel contrast color.
- `--muted` is for meta labels, supporting copy and inactive navigation.
- `--accent` is used sparingly for red marker dots and key visual accents.
- `--line` still exists for form controls and subtle component borders, but section divider lines have intentionally been removed.

### Fonts And Typographic Roles

Body font:

- `IBM Plex Sans`
- fallback: `"Segoe UI", Helvetica, Arial, sans-serif`
- used for paragraphs, notes, descriptions, form fields and general UI body copy

Display font:

- `Barlow Condensed`
- fallback: `"Arial Narrow", "Helvetica Neue", sans-serif`
- used for brand title, H1/H2/H4 display text and compact uppercase titles

Global type classes:

- `.type-meta`
  - uppercase micro-labels
  - `font-size: clamp(0.58rem, 1.4vw, 0.68rem)`
  - `letter-spacing: 0.16em`
  - use for eyebrows, labels, metadata and CTA labels like `Weiter`
- `.type-display-hero`
  - H1-level display type
  - mobile: `clamp(1.85rem, 9.5vw, 2.35rem)`
  - desktop: `clamp(3.15rem, 5.4vw, 4.25rem)`
  - uppercase, condensed, no negative letter spacing
- `.type-display-section`
  - H2-level section type
  - mobile: `clamp(1.55rem, 8vw, 2.1rem)`
  - desktop: `clamp(2.05rem, 4vw, 3rem)`
  - use for section titles in `SectionGrid`
- `.type-display-card`
  - linked teaser/card title type
  - mobile: `clamp(1.2rem, 6vw, 1.55rem)`
  - desktop: `clamp(1.45rem, 2.25vw, 1.85rem)`
  - use for subpage teaser titles
- `.type-title`
  - smaller display title utility
  - useful for compact headings where a full section heading is too large
- `.type-body-lg`
  - larger intro/body copy
  - mobile: `clamp(0.95rem, 3.4vw, 1.08rem)`
  - desktop: `clamp(1rem, 1.25vw, 1.12rem)`
- `.type-body`
  - standard body copy
  - mobile: `clamp(0.88rem, 3vw, 0.98rem)`
  - desktop: `clamp(0.92rem, 1.05vw, 1rem)`

Typography rules:

- Do not use viewport-width-only font scaling; use `clamp()`.
- Do not use negative letter spacing.
- Keep display text uppercase and condensed.
- Use hierarchy through scale, weight, spacing and placement instead of separator lines.
- Long German headings should be allowed to wrap naturally. Avoid forcing them into narrow columns unless it is intentional and tested on mobile.

Current visual rules:

- off-white paper background
- black ink text
- red accent markers
- condensed uppercase display typography
- no section divider lines between content blocks
- hierarchy should come from type size, spacing and layout, not horizontal rules
- full-width layout with small responsive side padding
- cards are simple linked rows, not nested UI cards
- hover states should be subtle but visible

Current layout notes:

- `site-shell` uses the full browser width with small side padding.
- Header content also uses the full width.
- Section grids use wider right columns on desktop.
- Mobile and desktop have been checked for horizontal overflow.
- Avoid adding back central max-width containers unless the user explicitly asks for a narrower editorial measure.

Current interaction notes:

- `Card` hover: the row area becomes slightly darker, meta/body copy becomes darker, and the `Weiter`/`More` label moves farther right.
- Navigation hover: the targeted top-level nav text turns black.
- Keep focus-visible states aligned with hover states.

### Page Layout And Arrangement

Global shell:

- The site is full width, not centered in a narrow max-width container.
- `site-shell`:
  - `display: flex`
  - `min-height: 100vh`
  - `width: 100%`
  - side padding: `clamp(0.9rem, 2vw, 1.75rem)`
- Main content in `src/app/layout.tsx` currently uses:
  - `main.flex-1`
  - `pb-10`
  - `pt-5 md:pt-7`

Page vertical rhythm:

- `.page-flow`
  - stacked flex column
  - gap: `clamp(1.7rem, 6vw, 2.5rem)`
  - use for main overview pages
- `.page-flow-compact`
  - stacked flex column
  - gap: `clamp(1.35rem, 5vw, 1.9rem)`
  - use for shorter detail pages
- Do not add separator borders to create rhythm; use `gap`, `pt`, `pb`, font scale and column layout.

### Header Arrangement

Header component:

- file: `src/components/Header.tsx`
- sticky at top
- background: `bg-[var(--paper)]/95`
- backdrop blur enabled
- no bottom border

Header shell:

- `.header-bar`
  - full width
  - mobile padding: `1rem clamp(0.9rem, 2vw, 1.75rem)`
  - desktop padding: `0.72rem clamp(0.9rem, 2vw, 1.75rem)`
- `.header-inner`
  - full width
  - mobile grid:
    - columns: `1fr auto`
    - rows: `auto auto`
    - brand on row 1 left
    - language switcher on row 1 right
    - navigation spans row 2
  - desktop grid from `768px`:
    - `grid-template-columns: minmax(15rem, auto) minmax(0, 1fr) auto`
    - brand left, navigation center, language switcher right

Brand:

- logo uses `/the-base-logo.svg`
- `.header-logo`
  - mobile: `clamp(2.15rem, 9vw, 2.75rem)`
  - desktop: `clamp(2.75rem, 4.5vw, 3.15rem)`
- `.header-title`
  - display font
  - uppercase
  - mobile: `clamp(1.25rem, 7vw, 1.65rem)`
  - desktop: `clamp(1.75rem, 2.6vw, 2.15rem)`
  - nowrap only on desktop

Navigation:

- file: `src/components/Navigation.tsx`
- layout: flex wrap with small gaps
- header passes:
  - mobile text: `0.7rem`
  - desktop text: `0.72rem`
  - tracking: `0.14em`
  - gap: `gap-x-3.5`, `md:gap-x-4`, `xl:gap-x-5`
- link default: `text-[var(--muted)]`
- link hover/focus: `text-[var(--ink)]`

Language switcher:

- file: `src/components/LanguageSwitcher.tsx`
- compact two-button inline group
- active language uses black background and paper text
- keep it compact so it does not collide with navigation on desktop or brand on mobile

### Intro And Section Arrangement

`PageIntro`:

- file: `src/components/PageIntro.tsx`
- used for most non-home pages
- grid with no separator line
- mobile: one column, title block then description block
- desktop from `lg`:
  - `grid-template-columns: minmax(0,1.55fr) minmax(20rem,0.9fr)`
  - left column: eyebrow + H1
  - right column: description and optional note
- H1 max width:
  - mobile `15ch`
  - medium `18ch`
  - extra large `22ch`
- description/note max width: `max-w-3xl`

`SectionGrid`:

- file: `src/components/SectionGrid.tsx`
- used for repeated overview sections with one explanatory left column and linked rows on the right
- mobile: one column
- desktop from `lg`:
  - `grid-template-columns: minmax(15rem,0.7fr) minmax(0,1.8fr)`
- extra large:
  - `grid-template-columns: minmax(18rem,0.62fr) minmax(0,1.95fr)`
- left column contains:
  - optional `.type-meta` eyebrow
  - `.type-display-section` H2
  - `.type-body` description, `max-w-xl`
- right column contains `Card` rows

Home page arrangement:

- Home has a custom full-width hero, not `PageIntro`.
- Home H1 is full width (`max-w-none`) and currently reads:
  - `Ausstellungen, Konzerte und Workshops im Bunker of Art`
- Home includes a dark `ink-panel` intro block:
  - background `#0d0d0d`
  - text `#f8f8f8`
  - red marker dots
  - desktop grid: `minmax(18rem,0.85fr) minmax(0,1.35fr)`
- Home sections should remain separate major areas:
  - Live
  - Archive
  - Label
  - Talents
  - Media
  - Shop
  - About

### Cards And Linked Rows

`Card`:

- file: `src/components/Card.tsx`
- used for all subpage teaser links
- not a boxed/nested card
- appears as a row with generous vertical padding
- uses negative horizontal margins to let hover fill extend slightly into the page gutter:
  - mobile: `-mx-3 px-3`
  - desktop: `md:-mx-4 md:px-4`
- row padding: `py-4`
- inner grid:
  - mobile: single column
  - desktop: `minmax(0,1fr) auto`
  - CTA label aligns at the end on desktop

Card content:

- meta: `.type-meta`, muted, optional
- title: `.type-display-card`, black
- description: `.type-body`, muted, `max-w-2xl`
- CTA: `.type-meta`, black, default label `Weiter` / `More`

Card hover/focus:

- row background: `hover:bg-black/[0.055]`
- focus-visible uses the same darkened background and removes default outline
- meta and description become black
- CTA translate:
  - mobile: `group-hover:translate-x-2`
  - desktop: `md:group-hover:translate-x-4`

### Panels, Markers And Controls

`ink-panel`:

- black content panel utility
- background: `#0d0d0d`
- text: `#f8f8f8`
- use for important editorial contrast blocks, not for every section
- currently used on the home intro block and The Base principle panel

Red markers:

- use `--accent`
- mostly small rounded dots in list items
- should remain sparse; do not turn the palette into a red-heavy theme

Controls/forms:

- form borders and language switcher border may still use `--line`
- section separators should not use `--line`
- visible UI should stay sharp, editorial and compact

### Exact Visual Character

If recreating the site, match these visual qualities closely:

- The page should feel like an editorial culture site, not a SaaS app and not a marketing landing page.
- Most surfaces stay flat and quiet; contrast comes from typography and spacing rather than decorative containers.
- The overall page is wide and airy, but the actual content blocks remain organized through clear left/right column behavior.
- The header should feel compact and infrastructural, not large or hero-like.
- The home hero should feel dominant primarily because of the H1 scale, not because of artwork or oversized decorative devices.
- Black panels such as `.ink-panel` should be used sparingly as emphasis blocks.
- Link rows should feel like calm editorial listings, not cards with shadows or rounded UI framing.
- Hover behavior should be subtle, quick and directional rather than flashy.

### Exact Interaction Spec

Header/nav:

- Header remains sticky.
- Navigation is always visible; there is no burger menu in the current implementation.
- On mobile, navigation wraps beneath the brand and language switcher.
- On desktop, navigation sits centered between brand and locale switcher.
- Hovering a nav item changes its text from muted to black.

Cards:

- The entire row is clickable.
- On hover/focus, the row background darkens slightly.
- Meta text and description darken toward `--ink`.
- The CTA (`Weiter` / `More`) shifts farther right than a minimal nudge.
- The hover fill extends slightly beyond the text block by using negative horizontal margins.

Language switcher:

- Compact two-button segmented control
- Active state: black fill on paper background
- Inactive state: paper fill with muted text

Motion:

- There is a single soft page-enter animation via `.editorial-fade`.
- Avoid adding additional ornamental motion unless explicitly requested.

## Language And Locale

The site is German-first with English fallbacks through:

```ts
text(locale, { de, en })
```

The language switcher uses a cookie through:

- `src/app/api/locale/route.ts`

Most pages should keep German content as the primary editorial source and maintain concise English equivalents.

## Global Navigation

Top-level navigation:

- Live: `/live`
- Archive: `/archive`
- Label: `/label`
- Talents: `/people`
- Media: `/media`
- Shop: `/shop`
- About: `/about`

Navigation children:

- Live
  - `/live/aktuelle-ausstellung`: Nächstes / aktuelles Event
  - `/live/events`: Vergangene Events
  - `/live/workshops`: Workshops
- Archive
  - `/archive/kunstkatalog`: Kunstkatalog
  - `/archive/poster`: Poster
- Label
  - `/label/releases`: Releases
- Talents
  - `/people/kuenstlerinnen`: Künstler:innen
  - `/people/djs`: DJs
- Media
  - `/media/buchung`: Medienproduktion
  - `/media/produktionen`: Produktionen
- Shop
  - `/shop/prints`: Prints
  - `/shop/merch`: Merch
  - `/shop/vinyl`: Vinyl
  - `/shop/diverses`: Diverses
- About
  - `/about/the-base`: The Base
  - `/about/code-of-conduct`: Awareness
  - `/mitmachen`: Mitmachen
  - `/about/kontakt`: Kontakt

Legal/footer routes:

- Impressum: `/impressum`
- Datenschutz: `/datenschutz`

SEO utility routes:

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## Site Structure And Current Content Direction

## Exact Reconstruction Checklist

If Codex needs to recreate this site without relying on the current implementation, the reconstruction should satisfy all of the following:

- full-width layout with small responsive side padding
- sticky full-width header
- logo left, nav center/right flow, language switcher right
- German-first locale behavior with English fallback
- home page with:
  - full-width H1
  - one dark intro panel
  - seven major sections: Live, Archive, Label, Talents, Media, Shop, About
- all section separators created through spacing only, not lines
- repeated overview sections built as left explanatory column plus right linked rows
- detail pages built through `PageIntro` or `SimplePage`
- no decorative gradients, no blobs, no hero illustration, no oversized cards
- the current hover behavior for cards and navigation
- all routes listed in this file and in `src/app/sitemap.ts`
- page copy tuned to page purpose instead of duplicated boilerplate
- local SEO signals anchored in Aachen / BOA Bunker of Art / The Base e.V. / The Base Records

### Home: `/`

Purpose:

- First screen should immediately communicate The Base e.V., Aachen, Bunker of Art, exhibitions, concerts, workshops and community platform.
- The H1 currently uses the full width and says: `Ausstellungen, Konzerte und Workshops im Bunker of Art`.
- Do not re-add `BOA` before `Bunker of Art` in this visible H1 unless requested.

Current home sections:

- Live / Events
- Archive / Archiv
- Label / The Base Records
- Talents / Künstler:innen, DJs und Mitwirkende
- Media / Medienproduktion im Bunker of Art
- Shop / Prints, Merch, Vinyl und Editionen
- About / Verein, Engagement und Kontakt

The home page should show each major area individually instead of grouping `Label, Talents, Shop und Verein` into one generic section.

### Live: `/live`

Current direction:

- Eyebrow: `Present`
- H1: `Aktuelles / kommendes Event`
- Intro purpose: current and upcoming programme in the BOA Bunker of Art.

Sections:

- Exhibition / Nächste / aktuelle Ausstellung
- Concerts / Nächstes / aktuelles Konzert
- Practice / Workshops

The Live page is program-oriented. Avoid making it sound like an archive page.

Detail pages:

- `/live/aktuelle-ausstellung`: current exhibition or event, with site-specific BOA context
- `/live/events`: event archive for concerts, exhibitions, release shows and aftershows
- `/live/workshops`: practical learning formats around art, music, photography, DJ culture, publishing and community practice

### Archive: `/archive`

Current direction:

- H1: `Archiv für Kunst, Poster und Projekte`
- The archive opens up material from art, music and community work as catalogue, visual collection and project chronology.

Sections:

- Sammlung / Katalog
- Projekte / Vergangene Events

Detail pages:

- `/archive/kunstkatalog`: research-oriented art catalogue with works, texts, credits, artists and project contexts
- `/archive/poster`: visual archive for posters, typography and campaigns around events and exhibitions

### Label: `/label`

Current direction:

- H1: `The Base Records`
- Label work documents electronic music from Aachen and the wider BOA/Base network.

Sections:

- Produktion / Releases
- Entourage / Artists

Detail pages:

- `/label/releases`: tracks, EPs, recordings, release shows and credits from The Base Records

### Talents: `/people`

Current direction:

- H1: `Künstler:innen, DJ’s und Mitwirkende`
- People-focused overview for artists, DJs, producers, collectives and teams.

Sections:

- Artists / Künstler:innen
- DJs / DJs
- Collective / Mitwirkende

Detail pages:

- `/people/kuenstlerinnen`: artists, positions and contributions from exhibition, installation, performance and interdisciplinary production
- `/people/djs`: DJs, live acts, collectives and sound formats from Aachen and the BOA network

### Media: `/media`

Current direction:

- H1: `Medienproduktion im Bunker of Art`
- Media is for production companies, artists, labels and collectives that want to use the BOA Bunker of Art as a location for image, sound and live documentation.

Sections:

- Production / Raum, Klang und Bild

Detail pages:

- `/media/buchung`: booking / enquiry information for photo, video, livestream, interviews, sessions and media production in the BOA Bunker of Art
- `/media/produktionen`: previous productions, shoots, recordings, sessions and media references that show the space as a production environment

SEO intent:

- BOA Bunker of Art als Medienproduktionsstandort in Aachen
- Foto Location Aachen
- Video Produktion Aachen
- Livestream / Sessions / Interviews
- Referenzen bisheriger Produktionen

### Shop: `/shop`

Current direction:

- H1: `Prints, Merch, Vinyl und Editionen`
- Shop content should feel like selected traces of the programme, not generic commerce copy.

Sections:

- Print / Prints
- Wear / Merch
- Record / Vinyl
- Open / Diverses

Detail pages:

- `/shop/prints`: limited prints, posters and publications from exhibitions, concerts and visual archive work
- `/shop/merch`: textiles, wearable objects and small series from collaborations and community moments
- `/shop/vinyl`: physical releases and pressings from The Base Records and the electronic scene around Aachen
- `/shop/diverses`: zines, small objects and experimental editions from workshops, archive work or spontaneous collaborations

### About: `/about`

Current direction:

- H1: `The Base e.V. im BOA Bunker of Art Aachen`
- About explains association, position, awareness, engagement and contact paths.

Sections:

- Base / The Base
- Safe Space / Awareness
- About / Engagement
- Direct / Kontakt

Detail pages:

- `/about/the-base`: profile of The Base e.V. as a cultural platform in BOA Bunker of Art Aachen
- `/about/code-of-conduct`: awareness, respectful coexistence, discrimination-sensitive event culture
- `/mitmachen`: canonical participation route for open calls, workshops, project ideas and volunteering
- `/about/mitmachen`: reuses the Mitmachen page component
- `/about/kontakt`: address, email, press, programme, cooperation and space request contact

### Legal

`/impressum`

- noIndex
- provider/legal information

`/datenschutz`

- noIndex
- privacy information

## SEO Strategy

Primary local/entity signals:

- The Base e.V.
- The Base Records
- BOA Bunker of Art
- Bunker of Art
- Aachen
- Scheibenstraße 34, 52070 Aachen
- Kulturzentrum Aachen
- Ausstellungen Aachen
- Konzerte Aachen
- Workshops Aachen
- elektronische Musik Aachen
- Medienproduktion Aachen
- Foto Location Aachen
- Video Produktion Aachen
- Kunstkatalog
- Poster-Archiv
- Veranstaltungsarchiv
- Künstler:innen, DJs, Kollektive, Community

SEO rules:

- Every important route should have metadata via `pageMetadata`.
- Page titles should be descriptive and end up branded as `... | The Base e.V.`.
- Each page should have exactly one visible H1.
- Use H2 for main sections.
- Legal pages should stay `noIndex`.
- Canonical URLs are based on `NEXT_PUBLIC_SITE_URL`, falling back to `https://thebase-ev.de`.
- Avoid repeating the same description across overview pages and detail pages.
- Overview page teasers should explain why to click; detail pages should explain the page’s concrete purpose.
- Keep local/entity signals natural. Do not stuff keyword lists into visible copy.

## Content Tone

Preferred tone:

- editorial
- precise
- culturally literate
- local to Aachen
- direct
- community-focused
- concrete enough for SEO without sounding machine-written

Avoid:

- generic startup/landing-page language
- exaggerated claims
- stock marketing phrases
- repeated boilerplate such as “clear credits and context” everywhere
- visible keyword lists
- overly long page intros

## Current Implementation Notes

- The app uses a sticky header without separator line.
- The layout intentionally uses full width with small side spacing.
- Section separator lines were removed; do not reintroduce them casually.
- Repeated page links use `Card`.
- `Card` receives `locale` from the page instead of reading cookies itself.
- `Card` hover darkens the row and moves the CTA label farther right.
- `Navigation` hover turns the targeted link black.
- Simple detail pages use `SimplePage` to reduce repeated boilerplate.
- `sitemap.xml` and `robots.txt` are generated by Next metadata routes.
- `SiteJsonLd` adds Organization and WebSite structured data globally.
- `/about/mitmachen` re-exports `/mitmachen`; `/mitmachen` is the canonical participation route.

## Verification

Use these checks after meaningful changes:

```bash
npm run lint
npx tsc --noEmit
npx next build --webpack
```

The default `npm run build` uses the normal Next build command. In this Codex environment, prefer:

```bash
npx next build --webpack
```

The local dev server has been running on:

```text
http://localhost:3003
```

Port `3002` was previously in use, so `3003` is the current preview port.

Browser checks already performed during recent work:

- Desktop and mobile without horizontal overflow
- Full-width shell with small side padding
- Navigation contains Media
- Shop hover cards do not create overflow
- Main route checks for `/`, `/live`, `/archive`, `/label`, `/people`, `/about`, `/media`, `/shop`

## Working With Codex

For future work:

- Ask Codex to read this file first.
- Reference specific files when possible.
- Prefer scoped tasks such as “update Media SEO copy” or “check mobile header”.
- Keep long-term decisions in this file.
- After major visual changes, verify desktop and mobile with the in-app browser.
- After copy or SEO changes, run lint, TypeScript and the Webpack build.
