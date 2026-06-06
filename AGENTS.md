<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project
The Base e.V. website.
Stack: Next.js App Router, React, TypeScript, Tailwind CSS v4.

## Product intent
Keep the site editorial, restrained, direct, local, credible, and culturally literate.
Do not turn it into a generic startup site, marketing landing page, or app-like dashboard.

## Visual rules
- full-width layout
- no centered max-width page container unless explicitly requested
- off-white paper background
- black ink text
- restrained red accent
- condensed uppercase display typography
- hierarchy through spacing, type scale, and placement
- no divider-line-heavy layout
- cards are linked rows, not boxed cards
- hover states should be subtle but visible

## QA priority
Before proposing visual changes, inspect the current UI first.
Look for:
- overlapping text or elements
- horizontal overflow
- clipped CTA labels
- broken wrapping in long German headings
- header/nav collisions
- footer/newsletter layout issues
- weak focus-visible states
- console errors
- broken links
- layout regressions across routes

## Viewports to test
- mobile: 390x844
- tablet: 768x1024
- desktop: 1440x1200

## Routes to check
- /
- /live
- /archive
- /label
- /talents
- /media
- /shop
- /about

## Workflow
1. Inspect first.
2. Report bugs clearly.
3. Fix only confirmed issues.
4. Avoid unrelated refactors.
5. Preserve the existing editorial system.
6. After changes, run lint and build.

## Bug report format
For each issue include:
- severity
- route
- viewport
- reproduction steps
- expected behavior
- actual behavior
- likely component/file

## Implementation rules
- prefer mobile-first fixes
- use grid/flex/gap instead of absolute positioning for content layout
- avoid fixed heights for text containers
- use min-w-0 in flex/grid text columns where needed
- allow text to wrap safely
- prefer earlier one-column fallback over cramped multi-column layouts
- do not introduce hamburger navigation unless explicitly requested

## Files usually relevant
- src/app/page.tsx
- src/app/globals.css
- src/components/Header.tsx
- src/components/Navigation.tsx
- src/components/PageIntro.tsx
- src/components/SectionGrid.tsx
- src/components/Card.tsx
- src/components/Footer.tsx
