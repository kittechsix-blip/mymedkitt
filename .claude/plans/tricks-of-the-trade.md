# Tricks of the Trade — New Top-Level Section

## Goal
Add a new top-level section "Tricks of the Trade" sitting **right next to** the Chief
Complaint Hubs hero card on the myMedKitt dashboard. Organized by specialty (Ortho,
Ophtho, ENT, Urology, Derm, Airway, Procedures, etc). Each "trick" = a clever,
often-not-well-known way to accomplish a patient-care task. For each: what it
accomplishes (efficient explanation), how to do it (simple step-by-step), equipment
needed, and a photo of equipment where relevant.

Seed content: all of Dr. David Carr's tricks from the most recent EMCrit episode
(EMCrit 426) + ALiEM "Tricks of the Trade" series. ~36 tricks researched and verified.

Then: a daily 12pm cron where subagent **Grant** searches the web for ~5 new tricks/day
to add.

## Content Model Decision
"Tricks of the Trade" is **NOT a decision tree** — it is reference content. Best fit is
the existing **InfoPage** type (already supports headings, body markdown, images,
citations). Mirror the dashboard hero-card + dedicated grid-page pattern (like
`/hubs` → `renderHubsHome`).

- **One InfoPage per specialty**, e.g. `tricks-ortho`, `tricks-ophtho`, `tricks-ent`,
  `tricks-urology`, `tricks-derm`, `tricks-airway`, `tricks-procedures`,
  `tricks-cardiology`, `tricks-neuro`, `tricks-tox`, `tricks-general`.
- Inside each page: one `InfoSection` per trick (heading = trick title; body =
  **Accomplishes** / **How to** / **Equipment** / source attribution; optional `image`).
- A registry of specialties drives the grid page + which info pages exist.

This makes Grant's job trivial: to add a trick he appends one `InfoSection` to the right
specialty's InfoPage (or creates a new specialty page), recompiles, pushes the info page
to Supabase. No tree plumbing.

## New / Edited Files

### New
1. `src/data/tricks-registry.ts` — single source of truth: array of
   `{ specialtyId, label, icon, infoPageId }`. Drives the grid page and Grant's cron.
2. `src/components/tricks-home.ts` — `renderTricksHome(container)`: header + specialty
   grid (mirrors hubs-home.ts). Each card → `router.navigate('/info/<infoPageId>')`
   (opens the specialty trick page as a modal) OR a dedicated `/tricks/:specialty` view.
   **Decision:** cards open the specialty InfoPage modal directly (simplest, reuses
   existing info-page renderer; no new route needed beyond `/tricks`).
3. `docs/images/tricks/<specialty>/...` — CC-licensed equipment photos where relevant.

### Edited
4. `src/data/info-pages.ts` — add the ~11 specialty InfoPages + register in INFO_PAGES.
5. `src/components/dashboard.ts` — add a `dashboard-tricks-card` hero card immediately
   after the Chief Complaint Hubs card (before MedKitt Learn). Navigates to `/tricks`.
6. `src/views/style.css` — add `.dashboard-tricks-card` styles (clone hubs-card, new
   accent color) + `.tricks-home` grid styles (clone hubs-home).
7. `src/app.ts` — register route `router.on('/tricks', handleTricksHome)` + handler.
8. `src/services/router.ts` — no change (parametric router already supports `/tricks`).

## Deploy
- Compile via `./node_modules/.bin/tsc --skipLibCheck` (NOT the stale deploy.md form).
- Copy CSS to docs.
- `deploy-cache-sync.mjs` (bumps DATA_VERSION + SW cache, rebuilds search index + SW
  asset list). Will pick up new images for SW precache.
- Push the ~11 new info pages to Supabase:
  `node scripts/supabase-push.mjs <anchor> --info-pages tricks-ortho,tricks-ophtho,...`
  (info pages are pushed independently of trees; need an anchor consult id arg — use a
  no-op/existing id, or push via `--info-pages` only path). Verify dry-run first.
- Stage ONLY these files (NOT the cervical-spine draft). Commit via git-via-tmp.sh.
- Verify Pages build + live 200s.

## Grant Daily Cron (12pm)
- New skill or scheduled prompt: subagent `grant` searches the web for ~5 new tricks/day
  (ALiEM back-catalog, EMCrit, Life in the Fast Lane, ortho/ophtho/ENT sources).
- For each: pick specialty, write Accomplishes/How-to/Equipment, find a CC image if the
  trick is physical/procedural, dedupe against existing tricks (read tricks-registry +
  info-pages), append InfoSection(s), recompile, push info page to Supabase, deploy,
  notify Andy.
- Tracking state file (like eb-med-scout-state.json) to prevent dupes:
  `~/Desktop/claudeclaw/tricks-scout-state.json` listing added trick titles + sources.
- Schedule: `0 12 * * *` via claudeclaw schedule-cli. Honor 5-min stagger rule
  (12:00 is currently empty — OK).

## Open Questions (decided, no user input per workflow)
- Cards open specialty InfoPage modal directly (not a separate per-specialty route).
- Seed ~36 researched tricks across the specialties that have content; create specialty
  pages only where there is ≥1 trick (Ortho seed may be empty from these 2 sources —
  Grant will fill it; still create the Ortho card so it's discoverable).
- Images: only download a handful of clearly CC-licensed equipment photos for the most
  photo-worthy tricks in this first pass; Grant adds more over time.
