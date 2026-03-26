# myMedKitt — Project Instructions

> Read this file at the start of every session working on this project.
> The PRD (`myMedKitt-PRD.md`) is the **single source of truth** for all UI/UX decisions.

---

## Project Overview

**What:** Complete UI/UX redesign of MedKitt — a mobile-first PWA for EM clinical decision trees. Pure frontend overhaul; backend, clinical content, and data models are unchanged.
**Who:** Andy, EM physician at Dell Seton Medical Center.
**Where:** `~/Desktop/myMedKitt/` (fork of MedKitt v1.36)
**Origin:** MedKitt v1.36 — 46 consults, 119 drugs, 7+ calculators
**Deploy:** GitHub Pages from `docs/` directory.
**Build:** `bunx tsc` (TypeScript compilation via Bun)

### Auto-Deploy Rule (MANDATORY)

**After every code change**, automatically run `/deploy` before asking Andy to review. Never ask Andy to test without deploying first — the app runs from GitHub Pages, not localhost.

The project-level deploy skill (`.claude/commands/deploy.md`) uses `deploy-cache-sync.mjs` which:
- Auto-detects changed data files via git diff
- Bumps `DATA_VERSION` in `src/services/cache-db.ts` + `docs/services/cache-db.js` → forces IndexedDB wipe
- Bumps `CACHE_NAME` in `docs/sw.js` → triggers service worker update
- Users get fresh content automatically — no manual cache clearing needed

### New Consult Build Pipeline (Autonomous)
1. Create tree file: `src/data/trees/<id>.ts` (use `CONSULT_TEMPLATE.md`)
2. Register in: `categories.ts`, `tree-service.ts`, `trees/index.ts`
3. Register in SQL generator: `scripts/generate-supabase-sql.mjs`
4. Compile: `bunx tsc --skipLibCheck --noUnusedLocals false`
5. Copy CSS: `cp src/views/style.css docs/style.css`
6. Cache sync: `node scripts/deploy-cache-sync.mjs` → recompile after
7. Add to SW cache: `docs/sw.js` ASSETS_TO_CACHE (alphabetical)
8. Generate SQL: `node scripts/generate-supabase-sql.mjs <id>`
9. Push to Supabase via REST API (see "Supabase API Deploy" section below)
10. Commit and push to GitHub

### Core Design Philosophy

> **"All information accessible, but hidden by default."**
> Experienced physicians fly through decisions; residents can expand everything to learn. Same app, serves both.

### The Problem Being Solved
- Current MedKitt dumps all information on screen at once
- Module progress bubbles create visual noise
- Too much scrolling through content that isn't needed in the moment
- Users report the app "doesn't flow well for quick reference"

---

## Key Files

| File | Purpose |
|------|---------|
| `myMedKitt-PRD.md` | **Source of truth** — full UX spec, color system, component architecture, deploy checklist |
| `src/` | TypeScript source code |
| `docs/` | GitHub Pages deployment directory (compiled app) |
| `src/views/style.css` | Design system CSS (custom properties, 3D buttons, layout) |
| `src/services/tree-engine.ts` | Decision tree state machine (**unchanged from MedKitt**) |
| `src/data/` | All clinical content (**unchanged from MedKitt**) |

---

## Design System — Pearl White + 3D Metallic

### Color Tokens (CSS Custom Properties)

#### Backgrounds & Surfaces
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FAFAF5` | Pearl white — ALL content backgrounds |
| `--color-surface-card` | `#FFFFFF` | Decision cards (raised, with shadow) |
| `--color-text-primary` | `#1A1A1A` | Crisp black — all body text on white |
| `--color-text-secondary` | `#5A5A5A` | Secondary labels and captions |

#### Accents
| Token | Value | Usage |
|-------|-------|-------|
| `--color-umber` | `#B87333` | Copper/bronze — splash screen, premium accents |
| `--color-decision-active` | `#3CB371` | Green — active decision, bottom tab highlight |
| `--color-danger` | `#ff4757` | Red — urgent/critical alerts |
| `--color-warning` | `#ffa502` | Orange — caution states |

#### Specialty Colors (for dashboard buttons AND consult headers)
| Specialty | Hex |
|-----------|-----|
| Anesthesia/Airway | `#3D4F5F` |
| Cardiology | `#C62828` |
| Critical Care | `#37474F` |
| Emergency Medicine | `#1565C0` |
| Gastroenterology | `#6D4C41` |
| Heme/Onc | `#AD1457` |
| Infectious Disease | `#2E7D32` |
| Nephro/Rheum/Endo | `#4E342E` |
| Neurology | `#00695C` |
| OB/GYN | `#880E4F` |
| Ophthalmology | `#00838F` |
| Orthopedics | `#455A64` |
| Pediatrics | `#1B5E20` |
| Procedures | `#283593` |
| Toxicology | `#9E9D24` |
| Trauma/Surg | `#E65100` |
| U/S-Rads | `#1A237E` |
| Urology | `#F57F17` |

### Typography
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Body text | System sans-serif | 16px | 400 | `--color-text-primary` |
| Card question text | System sans-serif | 18px | 600 | `--color-text-primary` |
| Button text | System sans-serif | 16px | 600 | White (on colored buttons) |
| Dose highlights | SF Mono, Monaco, monospace | 14px | 400 | `--color-decision-active` |
| Expanded info text | System sans-serif | 15px | 400 | `--color-text-primary` |

### 3D Button Aesthetic (MANDATORY — Pure CSS, No Image Assets)
- **Premium, skeuomorphic** — glossy metallic buttons, raised cards, tactile feel
- **NOT flat/material design** — intentionally premium and physical-feeling
- **Techniques:** Linear gradients (metallic sheen), box-shadow (depth), border-radius (pill shape), text-shadow (embossed), `:active` press-down effect
- **States:** Charcoal grey (default/unchosen), Green (yes/affirmative), Black (no/negative), Muted grey flat (disabled)
- **Specialty buttons:** Each uses its specialty color as the gradient base
- Full CSS specs in PRD Section 7

---

## App Flow & Screen Architecture

### Splash Screen
- Fade in (0.5s) → Hold (1.5s) → Fade out (0.5s) → Dashboard
- myMedKitt logo centered on dark background
- Total duration: ~2.5 seconds

### Dashboard (Home Screen)
- myMedKitt logo centered at top
- Search icon (🔍) in subheader — taps to expand to full search bar
- 2-column grid of **3D glossy specialty buttons** in **alphabetical order**
- Each button: specialty color, category name, consult count badge
- **Bottom toolbar (dashboard only):** 🔬 Lab, ⚗️ Pharmacy, 🧮 Med-Calc

### Specialty View (Category Consult List)
- Header in **specialty color**: ← Back, title, 🏠 Home
- 🔍 Search icon (scope: this specialty)
- 3D consult buttons in specialty color, **alphabetical order**
- Consults sorted at render time (no need to maintain order in data)
- Categories with 3+ consults show search/filter input

### Consult View — Decision Card Flow (THE CORE UX)
- **Specialty-colored header:** ← Back (scroll up one card), ↺ Reset (first card), Title, 🏠 Home
- 🔍 Search icon (scope: this consult)
- **Pearl white background** with stacked **raised white decision cards**
- **Progressive disclosure:** one decision at a time, answered cards stack above
- **No module bubble bar** — removed (was visual noise)

#### Decision Card Behavior
1. First card centered on screen — bold black question text, charcoal 3D buttons
2. User taps option → selected button turns **GREEN** (yes/affirmative) or **BLACK** (no/negative)
3. Next card **instantly appears below**, screen auto-scrolls to center new card
4. Scroll up to review answered cards — color trail gives visual summary of path
5. Expandable inline content: "▸ Hemodynamic Criteria" expands below the link within the card
6. Dense reference material: sliding **pearl white overlay panel** with X dismiss
7. Calculators: **pop-up overlay**, stays open until user dismisses

#### Button Color Logic
- 2 options: first selected = green, second selected = black
- 3+ options: selected = green, others stay charcoal
- `urgency: 'critical'` overrides with red; `urgency: 'urgent'` with orange

### Contextual Bottom Toolbar (Per-Consult)
- Replaces global tab bar when inside a consult
- Configurable tools per consult + 🏠 Home + ••• (branch points overflow)
- "•••" opens scrollable list of major branch points (table of contents)

| Consult | Bottom Toolbar Items |
|---------|---------------------|
| Burns | TBSA Calc, Fluid Calc, 🏠 Home, ••• |
| Stroke | NIHSS, tPA Dosing, 🏠 Home, ••• |
| A-Fib RVR | Cardioversion, Anticoag, 🏠 Home, ••• |
| (default) | 🏠 Home, ••• |

### Lab / Pharmacy / Med-Calc Views
- Aggregated views from dashboard bottom toolbar
- 3D buttons, alphabetical, search-scoped to section
- Calculators/drugs open as standalone overlays

### Search Behavior
- **Icon** (magnifying glass) in subheader of every screen — taps to expand
- Context-aware scoping:

| Screen | Search Scope |
|--------|-------------|
| Dashboard | **Master search** — entire app |
| Specialty view | Scoped to that specialty's consults |
| Consult view | Scoped to that consult's content and branch points |
| Med-Calc / Lab / Pharmacy | Scoped to that section's tools |

### Navigation Rules
- All navigation is **instant** — no confirmation dialogs
- Home → dashboard directly
- Back → scroll up one card (in consult) or back one screen
- Reset → first card of current consult
- Zero friction, fast, decisive

---

## Information Architecture — Two Levels of Expandable Content

### Level 1: Inline Expandable (Within Cards)
- Clickable text link: "▸ Differential Diagnosis"
- Tapping expands section **below the link** within the same card
- Tapping again collapses it
- Use case: Quick supplementary info clinicians already know

### Level 2: Pop-up Overlay (Sliding Panel)
- Full sliding panel covering decision flow
- Pearl white background, crisp black text, **X button** to dismiss
- **Stays open until user dismisses** — no auto-close
- Use case: Dense reference material (dosing tables, contraindication lists)

### Calculators
- Always **pop-up overlays** on top of flow
- **Stay open until dismissed** — user is actively calculating
- Critical calculators also in contextual bottom toolbar

---

## Technical Rules

### Carried from MedKitt (MANDATORY)
- **Vanilla TypeScript** — no frameworks, no npm runtime dependencies
- **CSS custom properties** — all colors from design tokens, never hardcode hex values
- **Mobile-first** — 44px minimum touch targets, safe areas, portrait orientation
- **Offline-first** — service worker caches everything, works without network
- **No innerHTML with user input** — use textContent or DOM APIs
- **No eval()** — no dynamic code execution
- **No external resources** — everything self-hosted, no CDN
- **No patient data stored** — decision inputs are ephemeral per session
- **CSP enforced** — via meta tag in index.html

### New Rules for myMedKitt
- **Portrait-only orientation** (enforced via manifest + CSS)
- **Pearl white content backgrounds** — never dark backgrounds in content areas
- **3D button aesthetic via CSS only** — no image assets for buttons
- **All overlays must have explicit dismiss** (X button) — no auto-close
- **Search indexed for instant results**
- **Contextual toolbar configurable per-consult** from data layer
- **Inline links use `<button>` with event delegation** (data-link-type/data-link-id), NOT `<a href="#">` — hash-routing conflicts on iOS Safari

---

## Component Architecture

```
src/
├── app.ts                     # App entry + splash screen
├── components/
│   ├── splash-screen.ts       # Fade-in/hold/fade-out logo animation
│   ├── dashboard.ts           # Home screen with specialty grid + bottom toolbar
│   ├── specialty-view.ts      # List of consults within a specialty
│   ├── consult-flow.ts        # THE CORE — vertical decision card flow
│   ├── decision-card.ts       # Individual decision card component
│   ├── expandable-section.ts  # Inline expand/collapse within cards
│   ├── overlay-panel.ts       # Sliding overlay for dense info + calculators
│   ├── search-bar.ts          # Expandable search with context-aware scoping
│   ├── contextual-toolbar.ts  # Per-consult bottom toolbar
│   ├── branch-point-list.ts   # "..." overflow scrollable branch menu
│   ├── button-3d.ts           # Reusable 3D glossy button component
│   ├── text-renderer.ts       # Shared renderBodyText + appendBoldAware
│   ├── calculator.ts          # Calculator overlay (carried from MedKitt)
│   ├── drug-store.ts          # Pharmacy modal (carried from MedKitt)
│   ├── info-page.ts           # Info page overlays (carried from MedKitt)
│   ├── reference-table.ts     # Citation rendering (carried from MedKitt)
│   └── reference-link.ts      # Inline reference links (carried from MedKitt)
├── data/                      # ALL unchanged from MedKitt
│   ├── categories.ts
│   ├── drug-store.ts
│   ├── info-pages.ts
│   ├── toolbar-configs.ts     # NEW — per-consult toolbar definitions
│   └── trees/                 # All 28 decision trees
├── models/
│   └── types.ts               # Type definitions (extended for new UX)
├── services/
│   ├── router.ts              # Hash-based SPA routing
│   ├── tree-engine.ts         # Tree traversal state machine (UNCHANGED)
│   ├── consult-flow-controller.ts  # NEW — TreeEngine wrapper for card stack
│   ├── search-service.ts      # NEW — centralized search indexing
│   ├── tree-service.ts        # Tree loading (3-tier fallback)
│   ├── drug-service.ts        # Drug lookup
│   ├── info-service.ts        # Info page management
│   ├── category-service.ts    # Category loading
│   ├── storage.ts             # LocalStorage abstraction
│   ├── cache-db.ts            # IndexedDB cache
│   ├── supabase.ts            # Supabase client
│   └── shared-mode.ts         # Shared consult mode
└── types/
    └── consult-tree.ts        # Consult tree types
```

### New Type Definitions

```typescript
/** Per-consult contextual toolbar configuration */
interface ConsultToolbar {
  consultId: string;
  tools: ToolbarItem[];
}

interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  action: 'calculator' | 'overlay' | 'jump';
  target?: string;
}

/** Branch point for overflow menu */
interface BranchPoint {
  nodeId: string;
  label: string;
  module?: string;
}

/** Search result */
interface SearchResult {
  type: 'consult' | 'drug' | 'calculator' | 'branch-point' | 'info-page';
  title: string;
  subtitle?: string;
  navigationTarget: string;
  specialty?: string;
}
```

---

## Clinical Content Rules (ALL MANDATORY — Carried from MedKitt)

### Weight-Based Dose Calculator (MANDATORY)

Every drug with mg/kg dosing MUST include a `weightCalc` field on its `DrugDose` entry. This powers an inline calculator in the Pharmacy modal.

```typescript
interface WeightCalc {
  dosePerKg: number;       // dose per kg (e.g., 0.6 for 0.6 mg/kg)
  unit: string;            // "mg", "mcg", "units", etc.
  maxDose?: number;        // max single dose cap
  dailyDivided?: number;   // if /day dose, divisions (3=q8h, 4=q6h, 2=BID)
  label?: string;          // optional label (e.g., "Low-dose alternative")
}
```

**Rules:**
- Single calc: `weightCalc: { dosePerKg: 0.6, unit: 'mg', maxDose: 16 }`
- Multiple calcs (array): `weightCalc: [{ dosePerKg: 0.25, unit: 'mg', label: 'Initial bolus' }, ...]`
- For `/day` regimens: set `dailyDivided` — calculator divides daily total by this number
- Always set `maxDose` when the regimen specifies one
- Use `label` for multiple calcs or partial regimens
- Skip drugs where mg/kg is a max ceiling for rate-titrated infusions

**Pediatric weight estimation (built into calculator UI):**
- < 1 year: (months × 0.5) + 3.5 kg
- 1–10 years: (years × 2) + 10 kg
- > 10 years: (years × 2) + 20 kg

### Indication-Aware Drug Links (MANDATORY)

Every drug hyperlink in a consult tree MUST include an indication hint so the Pharmacy modal scrolls to the correct dosing subcategory.

**Syntax:** `[DrugName](#/drug/drug-id/indication-hint)`

**Examples:**
- `[Ceftriaxone](#/drug/ceftriaxone/pediatric fever)` → "Pediatric Fever / Neonatal Sepsis" dosing
- `[Clopidogrel](#/drug/clopidogrel/acs)` → "ACS / NSTEMI" dosing
- `[Apixaban](#/drug/apixaban/atrial fibrillation)` → AF stroke prevention dosing

**Rules for every new consult:**
1. Every referenced drug MUST have a dosing entry in `drug-store.ts` matching the consult's use case
2. Every mg/kg dose MUST have a `weightCalc` field
3. Every `[Drug](#/drug/id)` link MUST include `/indication-hint` suffix
4. Hints are space-separated keywords matched case-insensitively against `data-indication`

**Audit checklist for new consults:**
- Does each referenced drug have a dosing entry for THIS clinical context?
- Does each mg/kg entry have `weightCalc`?
- Does each drug link include the right indication hint?

### Steps Summary Info Page (MANDATORY for Emergent/Resuscitation Consults)

Every consult involving an emergent procedure, resuscitation, or time-critical protocol MUST include a Steps Summary info page.

**When to include:** Emergent deliveries, resuscitations (NRP, cardiac arrest), hemorrhage protocols, emergency procedures, any consult where clinicians need to mentally rehearse steps under time pressure.

**Implementation:**
1. Create `InfoPage` with sectioned bullet points, each bullet a `[step description](#/node/node-id)` link
2. Cross-consult links use `[text](#/tree/tree-id)` format
3. Register in `INFO_PAGES` map
4. Add as **first line** of start node body: `[Consult Title Steps Summary](#/info/page-id)`

**Technical:**
- `#/node/node-id` dispatches `medkitt-jump-node` custom event → `TreeEngine.jumpToNode()`
- `#/tree/tree-id` uses `window.location.hash` navigation
- Overlay closes automatically before navigation

### Expandable Citations on All Node Types (MANDATORY)

Every node type (question, info, result) with a `citation` array MUST render expandable citation references using `renderInlineCitations()` from `reference-table.ts`.

**Rules:**
1. Every node referencing evidence MUST include `citation: [N]` array
2. Never render citations as plain text — always use expandable `<details>` widget
3. Tree's `citations` array must include all referenced numbers with full bibliographic text
4. URLs in citations are auto-linked and tappable

---

## Data Layer (ALL UNCHANGED from MedKitt)

### Three-Tier Fallback Architecture
All data services follow: **Supabase → IndexedDB → Hardcoded Fallback**
- `tree-service.ts` — loads tree nodes on-demand by tree ID
- `drug-service.ts` — synchronous drug lookup with in-memory cache
- `info-service.ts` — info page loading by ID
- `category-service.ts` — category + tree associations, `mergeHardcodedConsults()` for new consults

### Supabase Push (No Copy-Paste)
Use `scripts/supabase-push.mjs` to push data directly via REST API. No SQL editor needed.
```bash
node scripts/supabase-push.mjs <tree-id>           # New consult (full insert)
node scripts/supabase-push.mjs <tree-id> --update   # Update existing nodes
node scripts/supabase-push.mjs <tree-id> --dry-run  # Preview without pushing
node scripts/supabase-push.mjs <tree-id> --drugs insulin-regular,kcl  # Include new drugs
```
Service role key in `.env` (gitignored). Tables: `decision_trees`, `category_trees`, `tree_citations`, `decision_nodes`.
New consults must be added to `TREE_REGISTRY` in both `generate-supabase-sql.mjs` AND `supabase-push.mjs`.
**This replaces the manual TextEdit → Cmd+A → Cmd+C → Supabase paste workflow.**

### Medical Source Research
Two paths depending on context:

**Cowork / Claude in Chrome (interactive sessions with Andy):**
Navigate directly to paywalled sources in Chrome — Andy's login sessions are shared. No scripts needed.
- EBMedicine: `https://www.ebmedicine.net/topics/<category>/<topic>`
- UpToDate: `https://www.uptodate.com/contents/<topic-slug>`
- EMCrit/IBCC: `https://emcrit.org/ibcc/<topic>/`
Use `javascript_tool` or `get_page_text` to extract content. 80K+ chars of full article content available.

**ClaudeClaw / headless autonomous builds:**
Use `scripts/fetch-medical-source.mjs` (Playwright with persistent browser profile + credentials in `.env`):
```bash
node scripts/fetch-medical-source.mjs "https://emcrit.org/ibcc/dka/"
node scripts/fetch-medical-source.mjs "https://www.ebmedicine.net/topics/endocrine/diabetes"
node scripts/fetch-medical-source.mjs "https://www.uptodate.com/contents/diabetic-ketoacidosis-in-adults-treatment"
```
First run logs in and caches session. Subsequent runs use persistent profile.

### Category System
- 18 specialties + 2 tool categories (Pharmacy, Med-Calc)
- Tool categories route to `/drugs` and `/calculators` instead of category view
- `CATEGORY_COLORS` map: `{ card, iconBg }` for each category
- Consults sorted alphabetically at render time — no need to maintain order in data

### Tree Engine (UNCHANGED)
- State machine: `startTree()`, `selectOption()`, `continueToNext()`, `goBack()`, `jumpToNode()`, `goToEntry()`
- Session persistence: LocalStorage key `em-tree-session`
- `getAnswerHistory()` returns `{ nodeId, nodeTitle, answer }[]`
- `getSession()` exposes `history[]` (ordered node IDs) + `answers{}` (nodeId → optionLabel)

### ConsultFlowController (NEW — wraps TreeEngine)
- Maintains `cardStack[]` array for rendering all answered + current cards
- Reconstructs card stack from engine session on restore
- Does NOT modify TreeEngine — pure rendering adapter

---

## Service Worker Strategy

- **Network-first** for JS/HTML/CSS (always fresh when online)
- **Cache-first** for images (large, rarely change)
- `controllerchange` listener auto-reloads page when new SW activates
- **Bump `CACHE_NAME` version on every deploy** — user never needs to clear cache manually
- `client.navigate(client.url)` in activate handler force-reloads open tabs

---

## Deploy Checklist (Run Before Every Deploy)

- [ ] `bunx tsc` compiles clean
- [ ] `git status docs/` — compiled output matches source (no stale files)
- [ ] All 28 consults load and render correctly in card flow
- [ ] Decision card buttons change color correctly (green = yes, black = no)
- [ ] Auto-scroll-to-center works on new card appearance
- [ ] Scroll-up reveals answered cards with correct color states
- [ ] All expandable sections expand/collapse correctly
- [ ] All overlay panels slide in and dismiss with X
- [ ] All calculators open as overlays and stay open until dismissed
- [ ] Contextual bottom toolbar shows correct tools per consult
- [ ] "•••" overflow shows correct branch points per consult
- [ ] Search works at all scope levels
- [ ] Splash screen plays correctly on app launch
- [ ] Dashboard shows all specialties alphabetically with correct 3D colors
- [ ] Specialty headers change color per specialty
- [ ] Lab / Pharmacy / Med-Calc views render correctly
- [ ] All drug links include indication hints and navigate correctly
- [ ] Weight-based calculator works in Pharmacy modal
- [ ] All citations render with expandable references
- [ ] Portrait-only orientation enforced
- [ ] Service worker caches all new assets, `CACHE_NAME` bumped
- [ ] Offline mode works (airplane mode test)
- [ ] 44px minimum touch targets on all interactive elements
- [ ] Safe area insets applied (iPhone notch/home indicator)
- [ ] No console errors in production build
- [ ] CSP meta tag is present and correct
- [ ] PWA manifest updated with pearl white theme colors

---

## Shared Mode

- `src/services/shared-mode.ts` — share individual consults via `#/share/{treeId}` URLs
- Recipients see only received consults, accumulating over time
- Full-access users see all
- localStorage keys: `medkitt-shared-consults`, `medkitt-full-access`
- "Unlock All Consults" button on dashboard
- Dashboard and specialty views filter to shared consults in shared mode

---

## Current Status

**myMedKitt v0.1** — Fork of MedKitt v1.36. UI/UX redesign in progress.

Content carried from MedKitt (all unchanged):
- 28 consults across 18 specialties
- 119 drugs with indication-aware dosing
- 7+ calculators (PESI, sPESI, CHA₂DS₂-VASc, NIHSS, TIMI, BAS, FWD, 5 burns calcs, CSF Correction)
- 20 category icons (duotone PNGs)

Implementation phases:
- [ ] Phase 0: CSS design system migration (dark → pearl white + 3D buttons)
- [ ] Phase 1: Foundation components (button-3d, splash, overlay-panel, expandable-section, text-renderer)
- [ ] Phase 2: Core decision flow (consult-flow-controller, decision-card, consult-flow)
- [ ] Phase 3: Dashboard & navigation (dashboard, specialty-view, contextual-toolbar, search)
- [ ] Phase 4: Integration & wiring (app.ts routes, reused component adaptation)
- [ ] Phase 5: Polish & cleanup (remove dead code, CSS cleanup, SW update, deploy)
