<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project
The Base e.V. website.

This is a Next.js App Router website for a cultural platform in Aachen at the BOA Bunker of Art.

Core intent:
- editorial
- restrained
- local
- credible
- culturally literate
- typography-led
- not generic
- not startup-like
- not marketing-heavy

The site should feel like a serious cultural producer / association, not like a product landing page, dashboard, or database UI.

---

## Current active website scope

### Active top-level sections
- Live
- Archive
- Media
- About

### Active routes to check
- `/`
- `/live`
- `/archive`
- `/media`
- `/about`

### Removed sections
The following sections are intentionally no longer part of the website:
- Label
- Talents
- Shop

Rules:
- do not restore them unless explicitly requested
- do not include them in navigation
- do not include them in homepage structure
- do not include them in QA route checks
- do not include them in CMS planning
- do not generate new content, links, cards, or metadata for them

---

## Tech stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- no CMS in current implementation
- Sanity is not currently integrated

Important files:
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/Header.tsx`
- `src/components/Navigation.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/components/Card.tsx`
- `src/components/PageIntro.tsx`
- `src/components/SectionGrid.tsx`
- `src/components/SimplePage.tsx`
- `src/components/Footer.tsx`
- `src/data/navigation.ts`

---

## Product and visual intent

### Keep this website:
- editorial
- calm
- spacious
- direct
- typographic
- credible
- culturally specific

### Do not turn this website into:
- a SaaS landing page
- a startup website
- a dashboard
- a boxed-card UI system
- a heavy marketing site
- a noisy event platform
- a generic CMS-driven content grid

---

## Design rules

### Visual system
- off-white paper background
- black ink text
- restrained red accent markers
- condensed uppercase display typography
- no divider-line-heavy rhythm
- hierarchy through spacing, scale, and placement
- full-width layout
- no central narrow max-width page container unless explicitly requested

### Cards
- cards are linked rows, not boxed cards
- hover states should be subtle but visible
- CTA must stay inside the intended layout
- do not let `Weiter` escape the row/grid
- keep desktop CTA alignment stable
- mobile CTA must remain clean and readable
- if a CTA is aligned right on desktop, keep the mobile behavior as close as possible without causing overlap or overflow

### Typography
- long German headings must wrap cleanly
- avoid ugly automatic display-title wraps
- for major H1/H2 display titles, prefer intentional line breaks when needed
- do not use negative letter spacing
- do not compress titles unnaturally
- do not introduce noisy display effects

### Navigation
- navigation should remain restrained but clear
- the active area should be identifiable
- no heavy tab styling
- no exaggerated underline animation
- keep hover/focus subtle and editorial
- active item may be slightly darker / stronger, but without obvious layout jump
- navigation should only represent the current active sections:
  - Live
  - Archive
  - Media
  - About

### Header
- sticky header behavior must remain calm and precise
- no flashy glassmorphism
- no heavy shadow
- no jitter while scrolling
- logo, nav, and language switcher must stay aligned

---

## UX and content rules

### Homepage
The homepage should feel curated, not exhaustive.
Avoid making it feel like a sitemap or database.

Prefer:
- curation
- hierarchy
- rhythm
- selected entry points
- current relevance where appropriate

Avoid:
- overlisting everything at once
- too many equal-weight cards in a row
- taxonomic, database-like presentation

### Language and tone
Use:
- direct
- credible
- calm
- editorial
- culturally literate language

Avoid:
- hype
- startup copy
- ad-like CTAs
- exaggerated claims
- keyword stuffing

---

## Implementation rules

### General
- prefer small, scoped diffs
- avoid unrelated refactors
- preserve existing route structure unless explicitly asked
- preserve the current design system unless explicitly asked
- always check mobile and desktop impact
- avoid horizontal overflow
- avoid overlap between text and UI elements

### Layout robustness
- prefer grid/flex/gap over absolute positioning for content layout
- avoid fixed heights on text containers
- use `min-w-0` in grid/flex text columns where needed
- allow long text to wrap safely
- prefer earlier one-column fallback over cramped multi-column layouts
- do not solve layout problems with fragile negative-margin hacks unless already part of the system and clearly intentional

### Reuse
- reuse existing components where possible
- do not create new components unless there is a clear repeated pattern
- if a pattern repeats across pages, fix it centrally rather than hardcoding page-by-page

### Shared logic
If a behavior appears across multiple pages, first look for the shared rendering point:
- `PageIntro`
- `SectionGrid`
- `Card`
- `Header`
- `Navigation`
- `Footer`

Prefer central fixes over route-specific patches.

---

## QA priorities

Before proposing or implementing visual changes, inspect the existing UI first.

Always look for:
- overlapping text or elements
- horizontal overflow
- CTA escaping its intended row/grid
- broken wrapping in long German headings
- accidental-looking display title line breaks
- header/nav collisions
- footer/newsletter layout issues
- weak focus-visible states
- route-specific layout drift
- inconsistencies between overview pages

Especially compare:
- `/live`
- `/archive`
- `/media`
- `/about`

If one route behaves differently, compare it against a working sibling page before changing shared components.

---

## Viewports to test
Use these as defaults:
- mobile: `390x844`
- tablet: `768x1024`
- desktop: `1440x1200`

When relevant, also sanity-check narrower mobile widths.

---

## Routes to check
- `/`
- `/live`
- `/archive`
- `/media`
- `/about`

If subroutes exist, keep the correct top-level section behavior consistent.

---

## Bug report format
When acting as a QA or audit agent, report each issue with:
- severity
- route
- viewport
- steps to reproduce
- expected behavior
- actual behavior
- likely component/file

If no issue is found, say so explicitly.

---

## Agent behavior guidelines

### Frontend/UI work
When implementing:
1. identify the affected files
2. explain the likely root cause briefly
3. make the smallest clean fix
4. verify affected routes
5. summarize what changed

### Visual QA work
When auditing:
- report only
- do not fix unless explicitly asked
- compare broken pages against working pages
- use screenshots or Playwright where possible

### Editorial polish work
When improving presentation:
- prefer curation over adding more UI
- preserve the restrained system
- use intentional line breaks for major display titles if automatic wrapping looks awkward
- reduce database feel without adding marketing tone

### CMS / Sanity work
If CMS integration is introduced later:
- Sanity owns content, not presentation
- keep layout in React
- do not build a freeform page builder
- map structured content only to the current active sections:
  - Live
  - Archive
  - Media
  - About

### SEO / accessibility work
- preserve editorial presentation
- prefer semantic HTML first
- do not add unnecessary ARIA
- improve focus, landmarks, headings, and metadata cleanly
- do not generate SEO structures for removed sections

---

## What not to do
Do not:
- redesign the whole site unless explicitly asked
- add boxed cards everywhere
- add divider lines to create rhythm
- add central narrow containers by default
- introduce loud animations
- solve editorial problems with generic UI kits
- turn the site into a feed, app, or dashboard
- make the copy sound promotional
- restore Label, Talents, or Shop unless explicitly requested

---

## Before finishing any implementation
Always:
- check affected routes on mobile and desktop
- verify no horizontal overflow
- verify no new wrapping regressions
- verify CTA alignment
- run `npm run lint`
- run `npm run build`

Then report:
- files changed
- what changed
- what was verified
- any caveats that remain
