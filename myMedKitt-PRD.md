# myMedKitt — Product Requirements Document (PRD)

> **Version:** 1.0
> **Author:** Andy (EM Physician, Dell Seton Medical Center)
> **Date:** 2026-03-12
> **Status:** Design Specification — Ready for Claude Code Implementation
> **Origin:** Fork of MedKitt v1.36 (28 consults, 119 drugs, 7+ calculators)

---

## 1. Executive Summary

myMedKitt is a complete UI/UX redesign of MedKitt, an emergency medicine clinical decision support PWA. The backend (Supabase), clinical content (28 consults, 119 drugs, all calculators), and data models remain **unchanged**. This is a **pure frontend overhaul** driven by user feedback that the current app has too much information on screen and does not flow well for quick reference.

### Core Design Philosophy
> **"All information accessible, but hidden by default."**
> The app respects clinician expertise. Experienced physicians fly through decisions; residents can expand everything to learn. Same app, serves both.

### The Problem
- Current MedKitt dumps all information on screen at once
- Decision trees show progress bubbles that allow skipping but create visual noise
- Too much scrolling through content that isn't needed in the moment
- Users report the app "doesn't flow well for quick reference"

### The Solution: Progressive Disclosure Architecture
- **One decision at a time** — each step is a compact card with only the question and choice buttons
- **Vertical scroll flow** — answered cards stack above, scroll up to review your path
- **Expand on demand** — detailed info (dosing, contraindications, differentials, evidence) is hidden behind taps/hyperlinks
- **Contextual navigation** — bottom toolbar changes per consult with that consult's critical tools
- **Master search** — find anything in the app in 3 seconds from any screen

---

## 2. Design Language & Visual Identity

### 2.1 Overall Aesthetic
- **Premium, 3D, skeuomorphic** — glossy metallic buttons, raised cards, tactile feel
- Inspired by the dashboard.png aesthetic (3D color-coded specialty buttons)
- **NOT flat/material design** — this is intentionally premium and physical-feeling
- The myMedKitt logo (doctor bag with "my" script, copper/bronze trim) sets the tone

### 2.2 Color System

#### Background & Surfaces
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FAFAF5` | Pearl white — ALL content backgrounds |
| `--color-surface-card` | `#FFFFFF` | Decision cards (raised, with shadow) |
| `--color-text-primary` | `#1A1A1A` | Crisp black — all body text on white |
| `--color-text-secondary` | `#5A5A5A` | Secondary labels and captions |

#### Button States (3D Metallic)
| State | Style | Description |
|-------|-------|-------------|
| **Default/Unchosen** | Charcoal grey, glossy 3D | Metallic sheen, raised appearance, waiting for input |
| **Yes/Affirmative** | Green, glossy 3D | Confirms positive selection, stays green |
| **No/Negative** | Black, glossy 3D | Shows rejection of that path |
| **Disabled/Inactive** | Muted grey, flat | Not available in current context |

#### Specialty Colors (carried from MedKitt — used for dashboard buttons AND consult headers)
| Specialty | Hex | Notes |
|-----------|-----|-------|
| Anesthesia/Airway | `#3D4F5F` | Slate blue-grey |
| Cardiology | `#C62828` | Deep red |
| Critical Care | `#37474F` | Dark blue-grey |
| Emergency Medicine | `#1565C0` | Bold blue |
| Gastroenterology | `#6D4C41` | Warm brown |
| Heme/Onc | `#AD1457` | Deep magenta |
| Infectious Disease | `#2E7D32` | Forest green |
| Nephro/Rheum/Endo | `#4E342E` | Dark brown |
| Neurology | `#00695C` | Teal |
| OB/GYN | `#880E4F` | Dark rose |
| Ophthalmology | `#00838F` | Cyan |
| Orthopedics | `#455A64` | Steel grey |
| Pediatrics | `#1B5E20` | Dark green |
| Procedures | `#283593` | Indigo |
| Toxicology | `#9E9D24` | Olive |
| Trauma/Surg | `#E65100` | Deep orange |
| U/S-Rads | `#1A237E` | Navy |
| Urology | `#F57F17` | Gold |

#### Accent Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-umber` | `#B87333` | Copper/bronze — splash screen, premium accents |
| `--color-decision-active` | `#3CB371` | Green — active in decision tree (bottom tab highlight) |
| `--color-danger` | `#ff4757` | Red — urgent/critical alerts |
| `--color-warning` | `#ffa502` | Orange — caution states |

### 2.3 3D Button CSS Recreation (Pure CSS — No Image Assets)

All buttons must be recreated using CSS gradients, box-shadows, inner highlights, and subtle reflections to achieve the glossy, metallic, skeuomorphic look from dashboard.png and UX.png. Key techniques:

- **Linear gradients** for the metallic sheen (lighter at top, darker at bottom)
- **Box-shadow** for depth/lift (outer shadow + inner highlight)
- **Border-radius** for the rounded pill shape
- **Text-shadow** for subtle embossed text effect
- **:active state** — button "presses down" (reduce shadow, shift gradient)
- Each specialty button gets its unique color applied to the gradient base

### 2.4 Typography
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Body text | System sans-serif | 16px | 400 | `--color-text-primary` (black on white) |
| Card question text | System sans-serif | 18px | 600 | `--color-text-primary` |
| Button text | System sans-serif | 16px | 600 | White (on colored buttons) |
| Dose highlights | SF Mono, Monaco, monospace | 14px | 400 | `--color-decision-active` |
| Expanded info text | System sans-serif | 15px | 400 | `--color-text-primary` (black on white) |

---

## 3. App Flow & Screen Architecture

### 3.1 Splash Screen
- **Trigger:** App launch
- **Content:** myMedKitt logo (doctor bag) centered on dark background
- **Animation:** Fade in (0.5s) → Hold (1.5s) → Fade out (0.5s) → Dashboard
- **Total duration:** ~2.5 seconds

### 3.2 Dashboard (Home Screen)
```
┌─────────────────────────────────┐
│         myMedKitt Logo          │  ← centered at top
│            🔍                   │  ← search icon (tap to expand to search bar)
├─────────────────────────────────┤
│                                 │
│  ┌─────────┐  ┌─────────┐      │
│  │Anesthesia│  │Cardiology│     │  ← 3D glossy specialty buttons
│  │ /Airway  │  │          │     │     in ALPHABETICAL order
│  │ 0 consults│ │2 consults│     │     each in unique specialty color
│  └─────────┘  └─────────┘      │
│  ┌─────────┐  ┌─────────┐      │
│  │Critical │  │   EM    │      │
│  │  Care   │  │         │      │
│  └─────────┘  └─────────┘      │
│  ... (all specialties A-Z) ... │
│                                 │
├─────────────────────────────────┤
│  🔬        ⚗️         🧮       │  ← bottom toolbar (dashboard only)
│  Lab    Pharmacy    Med-Calc    │     Microscope, Mortar&Pestle, Calculator
└─────────────────────────────────┘
```

**Dashboard Behavior:**
- Specialty buttons are **alphabetically ordered**
- Each button shows **consult count**
- Each button styled with its **unique specialty color** in 3D glossy style
- **Search icon** in subheader — taps to expand into full search bar
- **Master search** — searches entire app (consults, drugs, calculators, etc.)
  - Example: typing "TBSA" navigates directly to Burns consult → TBSA calculator
  - Example: typing "Afib" navigates to Cardiology → Afib RVR consult
- **Bottom toolbar** (dashboard only): Microscope (Lab), Mortar & Pestle (Pharmacy), Calculator (Med-Calc)
  - These are aggregated views pulling tools from across all consults

### 3.3 Specialty View (Category Consult List)
```
┌─────────────────────────────────┐
│  ← Back    Cardiology      🏠  │  ← header in SPECIALTY COLOR
│                🔍               │  ← search icon (scope: this specialty)
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │  A-Fib RVR               │  │  ← 3D buttons in specialty color
│  │  Stability → Rate Control │  │     one per consult, ALPHABETICAL
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  NSTEMI Management        │  │
│  │  Diagnosis → Risk Strat   │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### 3.4 Consult View (Decision Tree Flow) — THE CORE UX

This is where the major redesign lives.

```
┌─────────────────────────────────┐
│ ← ↺    A-Fib RVR          🏠  │  ← SPECIALTY-COLORED header
│  Back Reset              Home   │     Back = scroll up one card
│                                 │     Reset = jump to first card
│                🔍               │     Home = dashboard
├─────────────────────────────────┤  ← search icon (scope: this consult)
│                                 │
│  PEARL WHITE BACKGROUND         │
│                                 │
│  ┌───────────────────────────┐  │  ← Decision Card (raised white card)
│  │                           │  │
│  │  Is patient              │  │  ← Question text (bold, black)
│  │  hemodynamically stable?  │  │
│  │                           │  │
│  │  ┌──────┐  ┌──────┐      │  │  ← 3D charcoal grey buttons
│  │  │ Yes  │  │  No  │      │  │     (default/unchosen state)
│  │  └──────┘  └──────┘      │  │
│  │                           │  │
│  │  ▸ Hemodynamic Criteria   │  │  ← expandable hyperlink (inline)
│  │                           │  │     taps to expand details below
│  └───────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│  ⚡  💊   🏠   •••            │  ← CONTEXTUAL bottom toolbar
│  NIHSS Dosing Home  BranchPts  │     (specific to this consult)
└─────────────────────────────────┘
```

#### Decision Card Behavior — Step by Step:

1. **First card appears centered on screen** — pearl white background, raised card with shadow, question in bold black text, charcoal grey 3D buttons

2. **User taps "Yes"** →
   - Yes button turns **GREEN** (3D glossy green)
   - No button stays charcoal grey (or fades slightly)
   - **Next card INSTANTLY appears below**, screen auto-scrolls to center the new card (feels like a new page)

3. **User taps "No"** →
   - No button turns **BLACK** (3D glossy black)
   - Yes button stays charcoal grey (or fades slightly)
   - Next card appears based on the "No" branch

4. **Scrolling up** — user can scroll up at any time to see their previous answered cards. The color trail (green = yes, black = no) gives an instant visual summary of the path taken.

5. **Expandable content** — inline hyperlinks like "▸ Hemodynamic Criteria" expand a section **below the link** within the card. This is for information that experienced clinicians already know but residents might need.

6. **Pop-up overlays** — denser reference material (e.g., "Contraindications to Thrombolysis") opens as a **sliding pearl white panel** with crisp black text and an **X button** to dismiss. These stay open until the user dismisses them.

7. **Calculators as overlays** — when a calculator is triggered (either from inline link or bottom toolbar), it appears as a **pop-up overlay** on top of the flow. It stays open until the user dismisses it. Critical calculators (like TBSA/Fluid for Burns) also live in the contextual bottom toolbar for one-tap access.

### 3.5 Contextual Bottom Toolbar (Per-Consult)

Each consult defines its own bottom toolbar with the most critical tools for that clinical scenario:

| Consult | Bottom Toolbar Items |
|---------|---------------------|
| Burns | TBSA Calc, Fluid Calc, 🏠 Home, ••• |
| Stroke | NIHSS, tPA Dosing, 🏠 Home, ••• |
| A-Fib RVR | Cardioversion, Anticoag, 🏠 Home, ••• |
| (default) | 🏠 Home, ••• |

The **"•••" overflow button** opens a **scrollable vertical list of major branch points** for that consult — like a table of contents. User can flick through and tap to jump directly to any major decision point.

### 3.6 Lab / Pharmacy / Med-Calc Views

These are **aggregated views** accessible only from the dashboard bottom toolbar. They collect tools from across all consults:

```
┌─────────────────────────────────┐
│  ← Back     Med-Calc       🏠  │  ← standard header
│                🔍               │  ← search icon (scope: this section)
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │  CHA₂DS₂-VASc           │  │  ← 3D buttons, alphabetical
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Corrected Calcium        │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Fluid Calculator         │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  NIHSS                    │  │
│  └───────────────────────────┘  │
│  ... (all calculators A-Z) ... │
│                                 │
└─────────────────────────────────┘
```

When a calculator is tapped, it opens as a **standalone overlay** (not embedded in a consult context).

### 3.7 Search Behavior

Search appears as an **icon** (magnifying glass) in the subheader of every screen. When tapped, it expands into a full search bar.

| Screen | Search Scope |
|--------|-------------|
| Dashboard | **Master search** — entire app (consults, drugs, calculators, branch points) |
| Specialty view | Scoped to that specialty's consults |
| Consult view | Scoped to that consult's content and branch points |
| Med-Calc / Lab / Pharmacy | Scoped to that section's tools |

**Master search navigation:** Results show what was matched and where. Tapping a result navigates directly to that item (e.g., searching "TBSA" from dashboard → opens Burns consult → TBSA calculator overlay).

---

## 4. Navigation Model

### 4.1 Top Header Bar (Universal — present on ALL screens except splash)
| Element | Position | Action |
|---------|----------|--------|
| Back button (←) | Left | Scrolls up one card (in consult) or goes back one screen |
| Reset button (↺) | Left (consult only) | Jumps to beginning of current consult |
| Screen title | Center | Displays current context (specialty name, consult name, etc.) |
| Home button (🏠) | Right | Returns to dashboard |
| Search icon (🔍) | Subheader | Taps to expand search bar |

**Header color:** Matches the **specialty color** when inside a consult or specialty view. Neutral/branded when on dashboard.

### 4.2 Bottom Toolbar Contexts
| Screen | Bottom Toolbar |
|--------|---------------|
| Dashboard | 🔬 Lab, ⚗️ Pharmacy, 🧮 Med-Calc |
| Specialty view | None |
| Consult view | Consult-specific tools + 🏠 Home + ••• (branch points) |
| Lab / Pharmacy / Med-Calc | None |

### 4.3 No Confirmation Dialogs
- All navigation is **instant** — no "are you sure?" prompts
- Home goes straight to dashboard
- Back scrolls up one card
- Reset goes to first card
- Fast, decisive, zero friction

---

## 5. Information Architecture

### 5.1 Two Levels of Expandable Content

**Level 1: Inline Expandable (Hyperlinks)**
- Lives within a decision card
- Shows as a clickable text link (e.g., "▸ Differential Diagnosis for AFib")
- Tapping expands a section **below the link** within the same card
- Tapping again collapses it
- Use case: Quick supplementary info (differentials, criteria lists, brief notes)

**Level 2: Pop-up Overlay (Sliding Panel)**
- Full sliding panel that covers the decision flow
- Pearl white background, crisp black text
- Has an **X button** to dismiss
- **Stays open until user dismisses** — no auto-close
- Use case: Dense reference material (contraindication lists, full dosing tables, citation details)

### 5.2 Calculators
- Always appear as **pop-up overlays** on top of the current flow
- **Stay open until user dismisses** — user is actively calculating for their patient
- Critical calculators for a consult also appear in the **contextual bottom toolbar**
- Calculator overlays have the same pearl white + black text styling

### 5.3 Drug References
- Drug hyperlinks in decision tree content open the **Pharmacy modal** (pop-up overlay)
- Must include **indication hints** so the modal scrolls to the correct dosing for the current clinical context (carried from MedKitt CLAUDE.md)
- Weight-based dose calculator is built into the Pharmacy modal (carried from MedKitt)

### 5.4 Citations/References
- Expandable citations use `renderInlineCitations()` pattern from MedKitt
- Appear as collapsible "References (N)" section within cards
- Full citation text with clickable URLs when expanded

---

## 6. Technical Architecture

### 6.1 Stack (Unchanged from MedKitt)
| Layer | Technology |
|-------|-----------|
| Language | Vanilla TypeScript |
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS (custom properties/design tokens) |
| Offline | Service Worker (cache-first) |
| Manifest | PWA (standalone, portrait-only) |
| Storage | LocalStorage (session state, preferences) |
| Routing | Hash-based SPA |
| Build | Bun |
| Deployment | GitHub Pages |
| Backend | Supabase (unchanged) |

### 6.2 Component Architecture (New)

The component structure must be redesigned to support the new UX patterns:

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
│   ├── calculator.ts          # Calculator overlay component
│   ├── drug-store.ts          # Pharmacy modal (carried from MedKitt)
│   ├── info-page.ts           # Info page overlays (carried from MedKitt)
│   ├── reference-table.ts     # Citation rendering (carried from MedKitt)
│   └── reference-link.ts      # Inline reference links (carried from MedKitt)
├── data/                      # ALL consult data carried from MedKitt unchanged
│   ├── categories.ts          # Category definitions with specialty colors
│   ├── drug-store.ts          # 119 drugs with indication-aware dosing
│   ├── info-pages.ts          # Info page content
│   └── trees/                 # All 28 consult decision trees
│       ├── index.ts
│       ├── afib-rvr.ts
│       ├── stroke.ts
│       ├── burns.ts
│       └── ... (all 28 trees)
├── models/
│   └── types.ts               # Type definitions (extended for new UX)
├── services/
│   ├── router.ts              # Hash-based routing (extended for new nav)
│   ├── tree-engine.ts         # Navigation, answer tracking, branching
│   ├── tree-service.ts        # Tree loading and management
│   ├── drug-service.ts        # Drug lookup and indication matching
│   ├── info-service.ts        # Info page management
│   ├── search-service.ts      # NEW — master search indexing and lookup
│   ├── storage.ts             # LocalStorage abstraction
│   ├── cache-db.ts            # Cache database
│   ├── supabase.ts            # Supabase client
│   └── shared-mode.ts         # Shared mode support
├── types/
│   └── consult-tree.ts        # Consult tree type definitions (unchanged)
└── views/
    ├── index.html             # App shell
    ├── style.css              # NEW design system (pearl white, 3D buttons)
    └── app.ts                 # View layer entry
```

### 6.3 New Type Definitions Needed

```typescript
/** Per-consult contextual toolbar configuration */
interface ConsultToolbar {
  consultId: string;
  tools: ToolbarItem[];
}

interface ToolbarItem {
  id: string;
  label: string;
  icon: string;           // icon reference
  action: 'calculator' | 'overlay' | 'jump';
  target?: string;        // calculator ID, info page ID, or node ID
}

/** Branch point for overflow menu */
interface BranchPoint {
  nodeId: string;
  label: string;
  module?: string;        // optional module grouping
}

/** Search result */
interface SearchResult {
  type: 'consult' | 'drug' | 'calculator' | 'branch-point' | 'info-page';
  title: string;
  subtitle?: string;
  navigationTarget: string;  // hash route to navigate to
  specialty?: string;        // for color coding in results
}
```

### 6.4 Technical Rules (Carried from MedKitt + Extended)

**Carried Rules:**
- Vanilla TypeScript — no frameworks, no npm runtime dependencies
- CSS custom properties — all colors from design tokens, never hardcode hex values
- Mobile-first — 44px minimum touch targets, safe areas, portrait orientation
- Offline-first — service worker caches everything, works without network
- No innerHTML with user input — use textContent or DOM APIs
- No eval() — no dynamic code execution
- No external resources — everything self-hosted, no CDN
- No patient data stored — decision inputs are ephemeral per session
- CSP enforced via meta tag in index.html

**New Rules:**
- Portrait-only orientation (enforced via manifest + CSS)
- Pearl white content backgrounds — never dark backgrounds in content areas
- 3D button aesthetic via CSS only — no image assets for buttons
- All overlays must have explicit dismiss (X button) — no auto-close
- Search must be indexed at build time for instant results
- Contextual toolbar must be configurable per-consult from data layer

### 6.5 Mandatory Clinical Content Rules (Carried from MedKitt CLAUDE.md)

All of the following rules from the MedKitt CLAUDE.md are **mandatory** and must be followed exactly:

1. **Weight-Based Dose Calculator** — every drug with mg/kg dosing MUST include a `weightCalc` field
2. **Indication-Aware Drug Links** — every drug hyperlink MUST include an indication hint suffix
3. **Steps Summary Info Pages** — every emergent/resuscitation consult MUST include a Steps Summary
4. **Expandable Citations** — every node with citations MUST use `renderInlineCitations()`
5. **Pediatric Weight Estimation** — built into calculator UI (< 1yr, 1-10yr, > 10yr formulas)

---

## 7. CSS Design System — 3D Premium Buttons

### 7.1 Base 3D Button (Charcoal Grey — Default/Unchosen)
```css
.btn-3d {
  /* Size & Shape */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 24px;
  border-radius: 24px;          /* pill shape */
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;

  /* 3D Metallic Gradient */
  background: linear-gradient(
    to bottom,
    #6a6a6a 0%,                 /* lighter top highlight */
    #4a4a4a 40%,                /* mid tone */
    #3a3a3a 60%,                /* darker lower */
    #2a2a2a 100%                /* darkest bottom */
  );

  /* Depth & Shadow */
  box-shadow:
    0 4px 8px rgba(0,0,0,0.4),          /* outer drop shadow */
    0 1px 0 rgba(255,255,255,0.15) inset, /* inner top highlight */
    0 -1px 0 rgba(0,0,0,0.3) inset;      /* inner bottom shadow */

  /* Text */
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);

  /* Transition */
  transition: all 0.1s ease;
}

.btn-3d:active {
  /* Press down effect */
  box-shadow:
    0 1px 3px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1) inset;
  transform: translateY(1px);
}
```

### 7.2 Yes/Affirmative State (Green)
```css
.btn-3d.selected-yes {
  background: linear-gradient(
    to bottom,
    #5cb85c 0%,
    #449d44 40%,
    #398439 60%,
    #2d6a2d 100%
  );
  box-shadow:
    0 4px 8px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.2) inset,
    0 -1px 0 rgba(0,0,0,0.2) inset;
}
```

### 7.3 No/Negative State (Black)
```css
.btn-3d.selected-no {
  background: linear-gradient(
    to bottom,
    #3a3a3a 0%,
    #2a2a2a 40%,
    #1a1a1a 60%,
    #0a0a0a 100%
  );
  box-shadow:
    0 4px 8px rgba(0,0,0,0.5),
    0 1px 0 rgba(255,255,255,0.05) inset;
}
```

### 7.4 Specialty Color Buttons (Dashboard)
Each specialty button uses its color as the gradient base:
```css
.btn-3d-specialty[data-specialty="cardiology"] {
  background: linear-gradient(
    to bottom,
    #e53935 0%,           /* lighter version of #C62828 */
    #C62828 40%,          /* base color */
    #b71c1c 60%,          /* darker */
    #8e0000 100%          /* darkest */
  );
}
/* ... repeat pattern for each specialty */
```

---

## 8. Implementation Plan

### Phase 1: Foundation (Sprint 1)
1. Create myMedKitt project as fork of MedKitt
2. Set up new CLAUDE.md with all inherited knowledge
3. Implement splash screen with fade-in/hold/fade-out
4. Redesign CSS design system (pearl white bg, 3D buttons, specialty colors)
5. Build `button-3d.ts` reusable component
6. Build new dashboard layout with alphabetical specialty buttons

### Phase 2: Core Decision Flow (Sprint 2)
7. Build `decision-card.ts` component (question + charcoal grey buttons)
8. Build `consult-flow.ts` — vertical scroll container with instant card appearance + auto-scroll-to-center
9. Implement button state changes (green for yes, black for no)
10. Build `expandable-section.ts` for inline expand/collapse
11. Build `overlay-panel.ts` for sliding panels with X dismiss

### Phase 3: Navigation (Sprint 3)
12. Build specialty-colored header bar with Back, Reset, Home, and consult title
13. Build `contextual-toolbar.ts` for per-consult bottom navigation
14. Build `branch-point-list.ts` for "..." overflow menu
15. Build `search-bar.ts` with icon-to-expand behavior
16. Implement `search-service.ts` with master indexing

### Phase 4: Integration (Sprint 4)
17. Wire up all existing consult data to new consult-flow component
18. Configure contextual toolbar for each consult
19. Wire calculator overlays (stay open until dismissed)
20. Wire drug reference modals with indication-aware links
21. Wire Lab / Pharmacy / Med-Calc aggregated views

### Phase 5: Polish & Deploy (Sprint 5)
22. Responsive testing (iPhone primary, tablet, desktop)
23. Accessibility audit (WCAG 2.1 AA)
24. Performance testing (load time, scroll smoothness)
25. Service worker update for new assets
26. Deploy to GitHub Pages
27. Deploy checklist verification

---

## 9. Deploy Checklist

**Pre-deployment verification (run before every deploy):**

- [ ] All 28 consults load and render correctly in new flow
- [ ] Decision card buttons change color correctly (green = yes, black = no)
- [ ] Auto-scroll-to-center works on new card appearance
- [ ] Scroll-up reveals answered cards with correct color states
- [ ] All expandable sections expand/collapse correctly
- [ ] All overlay panels slide in and dismiss with X
- [ ] All calculators open as overlays and stay open until dismissed
- [ ] Contextual bottom toolbar shows correct tools per consult
- [ ] "..." overflow shows correct branch points per consult
- [ ] Search works at all scope levels (master, specialty, consult, section)
- [ ] Master search navigates correctly to deep targets
- [ ] Splash screen plays correctly on app launch
- [ ] Dashboard shows all specialties alphabetically with correct colors
- [ ] Specialty headers change color when entering different specialties
- [ ] Lab / Pharmacy / Med-Calc views render correctly
- [ ] All drug links include indication hints and navigate correctly
- [ ] Weight-based calculator works in Pharmacy modal
- [ ] All citations render with expandable references
- [ ] Portrait-only orientation enforced
- [ ] Service worker caches all new assets
- [ ] Offline mode works (airplane mode test)
- [ ] 44px minimum touch targets on all interactive elements
- [ ] Safe area insets applied (iPhone notch/home indicator)
- [ ] No console errors in production build
- [ ] CSP meta tag is present and correct
- [ ] PWA manifest updated with new theme colors

---

## 10. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|---------------|
| Time to answer | < 3 taps to reach a treatment recommendation | User testing |
| Information density | Max 1 question + 2-3 buttons visible per card | Visual audit |
| Quick reference | Find any item via search in < 3 seconds | Stopwatch test |
| Scroll performance | 60fps smooth scrolling on iPhone 12+ | Performance profiling |
| Offline reliability | 100% functionality without network | Airplane mode test |
| User satisfaction | "It flows" — no more "too much info" feedback | User interviews |

---

## 11. Future Considerations (Post-Launch)

- **Native app migration** (React Native or Flutter) when consults > 100
- Data layer separation ensures Supabase backend + consult data carries straight over
- Only the view/component layer needs rebuilding for native
- 3D button aesthetic can be replicated in native UI frameworks
- Search service architecture is framework-agnostic

---

*This PRD is the single source of truth for the myMedKitt UI/UX redesign. All implementation decisions should reference this document. Clinical content is unchanged from MedKitt v1.36.*
