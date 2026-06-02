# Tricks of the Trade v2 — Scannable directory + search

## Andy's ask
"In each category there should be a list of tricks by title with brief description of the
task it solves, with hyperlink to a more in-depth description, so I can quickly find what I
need. And everything is searchable globally and in the Tricks of the Trade screen — all
alphabetically organized."

## Current state (v1, shipped commit e31a194d)
- Dashboard hero card -> `/tricks` -> grid of 11 specialty cards.
- Tapping a specialty opens its InfoPage modal which dumps EVERY trick as a full section.
  Hard to scan; not in global search; not alphabetical.

## Design decision: derive the directory FROM the InfoPages (no duplicate data)
Each trick is already one `InfoSection` whose `heading` is the trick title and whose `body`
starts with `**Accomplishes:** <blurb>. [N]`. We will DERIVE the scannable list from that —
so there is ONE source of truth, and Grant's existing "append a section" workflow
automatically populates the directory AND global search with zero extra steps.

A small helper `getTrickList(infoPageId)` parses each page's sections into
`{ title, blurb, anchorId }[]`, sorted alphabetically by title. `anchorId` =
`slugify(heading)`.

## Changes

### 1. Section anchors in the info modal  (`src/components/info-page.ts`)
- Give each rendered `.info-page-section` an `id="trick-<slug(heading)>"`.
- Extend `showInfoModal(pageId, anchorId?)`: after render, if `anchorId` is passed,
  `scrollIntoView` that section + brief highlight (reuse the existing `cite-highlight`
  pattern). Default behaviour (no anchor) unchanged.

### 2. New trick-list helper  (`src/data/tricks-registry.ts`)
- `export function getTrickList(infoPageId): { title; blurb; anchorId }[]`
  - Reads `INFO_PAGES[infoPageId].sections`.
  - title = section.heading; blurb = text between `**Accomplishes:**` and the first `[N]`
    (fallback: first sentence of body); anchorId = `trick-<slug(heading)>`.
  - Skips the ortho placeholder ("being added daily").
  - Sorted alphabetically by title.
- Keeps `trickCount` accurate by deriving it (optional: `getTrickList(id).length`).

### 3. Per-specialty directory route  (`/tricks/:specialtyId`)
- `src/components/tricks-home.ts`: add `renderTricksSpecialty(container, specialtyId)`:
  - Header (back to `/tricks`), specialty title, in-screen search box.
  - Alphabetical list of rows: **bold title** + grey one-line blurb + chevron.
  - Row click -> `showInfoModal(infoPageId, anchorId)` (opens full detail at that trick).
  - Search box filters rows live (title + blurb, case-insensitive).
- `src/app.ts`: `router.on('/tricks/:specialtyId', handleTricksSpecialty)`.
- The specialty GRID cards (`/tricks`) now navigate to `/tricks/<id>` (the directory)
  instead of opening the modal directly. Cleaner drill-down.

### 4. In-screen search on the grid  (`/tricks`)
- Add a search box at the top of `renderTricksHome`. Typing filters ACROSS ALL specialties:
  shows matching trick rows (title + blurb + which specialty), each routing to its
  directory anchor. Empty query -> the specialty grid as today.

### 5. Global search  (`scripts/build-search-node-index.mjs` + `search-service.ts`)
- Extend the index builder to also scrape the 11 `TRICKS_*_PAGE` consts from
  `src/data/info-pages.ts` (regex on `sections: [ ... ]`, capture each `heading` + the
  `**Accomplishes:**` blurb). Emit as a new doc type `trick` with
  `{ id, infoPageId, title, blurb, specialtyLabel }`.
- `search-service.ts`: add `type: 'trick'` to `SearchDoc`/`SearchResult`; map to route
  `/tricks/<specialtyId>` (and open the anchor). Tricks now appear in global search,
  alphabetical with the rest.

### 6. Alphabetical everywhere
- Directory rows sorted by title.
- Specialty grid: leave in clinical-priority order OR sort alphabetically by label —
  **plan: keep specialty cards in current order** (airway/procedures first is intuitive),
  but sort the TRICKS within every list alphabetically. (If Andy wants the specialty cards
  themselves alphabetized too, one-line change.)

### 7. CSS  (`src/views/style.css`)
- `.tricks-search` (input), `.tricks-directory`, `.trick-row` (title/blurb/chevron),
  `.trick-row__title`, `.trick-row__blurb`. Touch targets >=44px.

## Deploy
Compile (`./node_modules/.bin/tsc --skipLibCheck`) -> `cp src/views/style.css docs/style.css`
-> lint -> `deploy-cache-sync.mjs` (regenerates search-node-index.json now WITH tricks;
bumps DATA_VERSION + SW) -> revert contaminated supabase-hotfix-update.sql -> recompile ->
(no Supabase info-page change needed unless content changed — it didn't, only structure) ->
stage explicitly (NO cervical-spine, NO hotfix SQL) -> git-via-tmp.sh -> verify Pages.

## Grant impact (update command later)
Grant's append-a-section workflow already populates the directory + search automatically.
The only addition: when he adds a trick, the blurb after `**Accomplishes:**` IS the
directory description, so he should keep it tight (<= ~12 words). Update tricks-scout.md
note. No structural change to his pipeline.

## Files touched
- src/components/info-page.ts (anchors + showInfoModal anchorId)
- src/data/tricks-registry.ts (getTrickList helper)
- src/components/tricks-home.ts (directory view + grid search)
- src/app.ts (/tricks/:specialtyId route)
- src/views/style.css (directory + search styles)
- scripts/build-search-node-index.mjs (scrape tricks pages)
- src/services/search-service.ts (trick doc type + route)
