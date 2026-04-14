# myMedKitt Simplification PRD — "Need to Know" Architecture

> **Purpose:** This document captures every architectural and UX decision for the myMedKitt simplification initiative. It is the single source of truth for Claude Code sessions implementing these changes.
>
> **Origin:** Exhaustive design interrogation between Andy (EM physician, Dell Seton) and Claude, April 2026.
>
> **Scope:** Pure frontend simplification — code reduction, content restructuring, and rendering changes. No backend changes. No clinical content removal. All existing content is preserved but restructured for progressive disclosure.

---

## 1. Core Philosophy

**"All information accessible, but hidden by default."**

Every piece of clinical content in the app still exists. Nothing is deleted. But the default view is radically compressed: a title, a one-line summary, and decision buttons. Everything else is one tap away via inline accordion. The app serves two personas simultaneously through the same interface — experts fly through decisions, learners expand to go deeper.

### The Trifecta (All Three Are Required)

1. **Time to decision:** An attending reaches the treatment recommendation in under 30 seconds without reading a single paragraph.
2. **Visual calm:** Every card feels clean and uncluttered — a single clear question, not a wall of text.
3. **Screen economy:** Every decision fits on one mobile screen without scrolling. Buttons are always visible without scroll.

### Competitive Differentiator

myMedKitt wins on the combination of three things no single competitor offers:

- **Guided decision flow** — walks you through step by step (vs. UpToDate's textbook format)
- **Instant speed** — 30-second consults (vs. WikEM's wiki browsing)
- **Offline-first** — works in the trauma bay with no WiFi (vs. everything else)

The simplification work directly reinforces all three.

---

## 2. User Personas

Both personas use the **same app, same flow, same screens.** The depth of engagement is the user's choice.

### The Expert (Attending Physician)
- Has seen 10,000 DKA cases
- Wants: Title → buttons → next card → treatment. Done.
- Interacts with: Compact cards, pill-trail of answered cards, skipped info nodes
- Never expands accordions unless something unexpected comes up
- Time budget: <30 seconds per consult

### The Learner (Resident Physician)
- Working through a case they've seen a few times
- Wants: Title → expand summary → read pearls → make informed decision
- Interacts with: Expanded accordions, clinical pearls, re-expanded answered cards
- Time budget: 1-3 minutes per consult

### Design Rule
> If a design decision serves one persona at the expense of the other, it is wrong. Both must be served by the same interface through progressive disclosure.

---

## 3. Data Model Changes

### New Fields on `DecisionNode`

Add these fields to the existing `DecisionNode` interface in `src/models/types.ts`:

```typescript
export interface DecisionNode {
  // ... all existing fields unchanged ...

  /**
   * One-line summary (~20 words max) shown by default on the compact card.
   * This is the ONLY body text visible before the user expands the accordion.
   * Must be clinically precise — not a teaser, but the key fact.
   *
   * Example (DKA start node):
   *   "Hyperglycemia + ketonemia + acidosis (pH <7.3 or HCO₃ <18)"
   *
   * If omitted, renderer falls back to showing the full `body` (backward compatible).
   */
  summary?: string;

  /**
   * When true, the tree engine auto-advances past this node without user interaction.
   * Used for info-only nodes that experts don't need to see.
   * The node still exists in the tree and appears in the answered-card trail.
   * Learners can re-expand the pill to see the full content.
   *
   * Only valid on nodes with type: 'info' and a `next` field.
   * Never set on question, input, or result nodes.
   */
  skippable?: boolean;

  /**
   * Safety classification for this node's content.
   * - 'critical': Contraindications, dangerous interactions, "Do NOT" items.
   *   ALWAYS visible on the card — never behind an accordion. Red banner.
   * - 'warning': Caution items, relative contraindications, edge cases.
   *   ALWAYS visible on the card — never behind an accordion. Orange banner.
   * - undefined/null: Normal content. Hidden behind accordion by default.
   *
   * RULE: Safety content is EXEMPT from progressive disclosure.
   */
  safetyLevel?: 'critical' | 'warning';
}
```

### Backward Compatibility

All three fields are optional. Existing consults without these fields render exactly as they do today (full body text visible). Migration is incremental — consults gain the compact behavior as `summary` fields are added.

### Migration Priority

When adding `summary` fields to existing consults:
1. Write the summary as if it's the ONLY thing an attending will read
2. It must contain the key clinical fact, not just a topic label
3. Bad: "This section covers DKA diagnosis" (topic label, useless)
4. Good: "Hyperglycemia + ketonemia + acidosis (pH <7.3 or HCO₃ <18)" (actionable clinical fact)
5. Maximum 20 words. Prefer 10-15.

---

## 4. Card Rendering — The New Default

### Active Card (Current Decision)

```
┌─────────────────────────────────┐
│  Title (bold, 18px)             │
│                                 │
│  ▸ Summary line (~20 words)     │  ← Tappable. Expands inline.
│                                 │
│  ⚠️ CRITICAL: Do NOT give...    │  ← Safety banner. Always visible.
│                                 │
│  ┌─────────────────────────┐    │
│  │  Option A (3D button)   │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │  Option B (3D button)   │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**When summary is tapped (accordion expands inline):**

```
┌─────────────────────────────────┐
│  Title (bold, 18px)             │
│                                 │
│  ▾ Summary line (~20 words)     │  ← Now expanded
│                                 │
│  Full body text (all existing   │
│  content from the node's body   │
│  field). Includes clinical      │
│  pearls as highlighted callouts.│
│  Citations as small tappable    │
│  reference numbers.             │
│                                 │
│  ⚠️ CRITICAL: Do NOT give...    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Option A (3D button)   │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │  Option B (3D button)   │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### Answered Card (Collapsed to Pill)

```
┌─────────────────────────────────┐
│ DKA Diagnosis → Confirmed DKA   │  ← Single line. Green/black color.
└─────────────────────────────────┘
```

- One line per answered card: `Title → Selected Option`
- Color coding: green background for affirmative/yes answers, dark/black for no/negative
- Info nodes that were auto-advanced: `Title ✓` (checkmark, muted style)
- **Tapping a pill re-expands it** to the full active-card view (read-only, can't change answer)

### Safety Banners (Never Hidden)

Nodes with `safetyLevel: 'critical'`:
```
┌─ RED BANNER ────────────────────┐
│ 🛑 Do NOT give diltiazem with   │
│ EF ≤40% — worsens CHF           │
└─────────────────────────────────┘
```

Nodes with `safetyLevel: 'warning'`:
```
┌─ ORANGE BANNER ─────────────────┐
│ ⚠️ Caution: Check K+ before     │
│ starting insulin — risk of       │
│ fatal hypokalemia                │
└─────────────────────────────────┘
```

These banners render directly on the card, above the buttons, regardless of whether the accordion is expanded. They are EXEMPT from progressive disclosure.

### Clinical Pearls (Inside Expanded Accordion)

When the accordion is expanded, pearls from the `pearls` field render as highlighted callouts:

```
┌─ PEARL ─────────────────────────┐
│ 💡 BOHB is the gold standard    │
│ — urine ketones miss euglycemic │
│ DKA presentations               │
└─────────────────────────────────┘
```

Style: subtle background tint (light green or light blue), left border accent. Visually distinct from body text but not as aggressive as safety banners.

---

## 5. Smart Skip (Auto-Advance for Experts)

### How It Works

When the tree engine encounters a node with `skippable: true`:
1. The node is added to the card stack as an answered pill (with ✓)
2. The engine immediately advances to the `next` node
3. No user interaction required — the info node is "acknowledged" automatically
4. The pill is tappable — experts can ignore it, learners can expand it

### Rules

- Only `type: 'info'` nodes with a `next` field can be skippable
- Never auto-skip `type: 'question'` nodes (require user decision)
- Never auto-skip `type: 'result'` nodes (the answer matters)
- Never auto-skip `type: 'input'` nodes (require form entry)
- Never auto-skip nodes with `safetyLevel: 'critical'` or `'warning'` — these must be seen

### Implementation

In `consult-flow-controller.ts` or wherever the card stack is built:

```typescript
function advanceToNextNode(nodeId: string): void {
  const node = getNode(nodeId);

  if (node.skippable && node.type === 'info' && node.next && !node.safetyLevel) {
    // Auto-advance: add to trail as acknowledged, move to next
    addToTrailAsPill(node, { autoAdvanced: true });
    advanceToNextNode(node.next); // recursive — skip chains of info nodes
  } else {
    // Normal: render as active card
    renderActiveCard(node);
  }
}
```

---

## 6. Code Removal — Dead Component Cleanup

### Components to DELETE

| Component | File | Why It Goes |
|-----------|------|-------------|
| Consult Wizard | `src/components/consult-wizard.ts` | Overlaps with consult-flow. Redundant. |
| Quick-Fire Mode | `src/components/quick-fire-mode.ts` | Replaced by smart-skip + pill trail. |
| Exit Intent | `src/components/exit-intent.ts` + `src/init-exit-intent.ts` | Friction, not safety. Users navigate intentionally. |
| Spotlight | `src/components/spotlight.ts` | Experimental search overlay. Standard search-bar is sufficient. |
| Shared Mode | `src/services/shared-mode.ts` | Unused feature. Can be re-added later if needed. |
| Sticky Dosing Header | `src/components/sticky-dosing-header.ts` | Visual clutter. Dosing stays in-flow on result cards. |
| Dosing Banner | `src/components/dosing-banner.ts` | Same — consolidate dosing to result cards only. |
| Sticky Patient Header | `src/components/sticky-patient-header.ts` | Unnecessary persistent UI element. |
| Critical Actions | `src/components/critical-actions.ts` | Replaced by safety banners on cards. |

### Services to Review (Possible Removal)

| Service | File | Status |
|---------|------|--------|
| `patient-context.ts` | `src/services/patient-context.ts` | Review — may be orphaned if sticky-patient-header is removed |
| `dosing-list.ts` | `src/services/dosing-list.ts` | Review — may be orphaned if dosing-banner is removed |
| `pwa-install.ts` | `src/services/pwa-install.ts` | Keep if still functional; review if dead |
| `kittmd-analytics.ts` | `src/services/kittmd-analytics.ts` | Keep — analytics are valuable |

### Cleanup Procedure

1. Remove component files
2. Remove all imports/references in `app.ts`, `main.ts`, `src/views/app.ts`, `router.ts`
3. Remove associated CSS classes from `style.css`
4. Remove any shared-mode logic from `dashboard.ts` and `specialty-view.ts`
5. Compile (`bunx tsc`) — fix any broken references
6. Test that all 200+ consults still render correctly

---

## 7. What Stays Unchanged

These elements are NOT part of the simplification. Do not modify:

- **Specialty grid dashboard** — primary entry point, 2-column 3D buttons, alphabetical
- **In-flow dosing** — drug doses stay embedded in decision cards where clinically relevant
- **Tree engine** (`tree-engine.ts`) — state machine is untouched
- **All clinical content** — no node deletion, no consult removal, no drug removal
- **3D button aesthetic** — glossy metallic CSS buttons remain the visual signature
- **Offline-first / service worker** — caching strategy unchanged
- **Overlay panels** — still used for dense reference material and calculators
- **Contextual toolbar** — per-consult bottom toolbar stays
- **Search** — context-aware search stays (may benefit from lighter rendering)
- **Drug store / Pharmacy modal** — unchanged
- **Calculator overlays** — unchanged
- **Stop pages** — "Do NOT" pages remain accessible from toolbar

---

## 8. Implementation Phases

### Phase 0: Data Model (Do First)

**Goal:** Add the three new fields to `DecisionNode` without breaking anything.

1. Add `summary?: string`, `skippable?: boolean`, `safetyLevel?: 'critical' | 'warning'` to `DecisionNode` in `src/models/types.ts`
2. Compile — should succeed with zero errors (all fields are optional)
3. No rendering changes yet

**Estimated scope:** 1 file changed, <10 lines.

### Phase 1: Card Renderer Update

**Goal:** `decision-card.ts` renders the new compact format when `summary` is present.

1. Update `renderActiveQuestion()`, `renderActiveInfo()`, `renderActiveResult()`:
   - If node has `summary`: show title + summary + accordion trigger + buttons
   - If node has no `summary`: render exactly as today (backward compatible)
2. Implement inline accordion expand/collapse:
   - Tapping summary line expands full `body` content below it
   - Tapping again collapses
   - Smooth CSS transition (max-height or similar)
3. Implement safety banner rendering:
   - If `safetyLevel === 'critical'`: red banner, always visible, above buttons
   - If `safetyLevel === 'warning'`: orange banner, always visible, above buttons
4. Update `renderAnsweredCard()`:
   - Default to pill format: `Title → Selected Option` (single line)
   - Tap to re-expand to full card (read-only)
5. Style the pearl callouts inside expanded body content

**Estimated scope:** `decision-card.ts` major refactor, `style.css` additions.

### Phase 2: Smart Skip

**Goal:** Info nodes with `skippable: true` auto-advance.

1. Update `consult-flow-controller.ts` to check `skippable` on each node
2. Auto-advance logic (skip info nodes, add to trail as pills)
3. Safety exemption: never skip nodes with `safetyLevel`
4. Test with DKA (will need Phase 3 data to test properly)

**Estimated scope:** `consult-flow-controller.ts`, ~20-30 lines of logic.

### Phase 3: Prove on DKA

**Goal:** Full migration of DKA consult to new format. This is the proof-of-concept.

1. Add `summary` to every DKA node (~45 nodes)
2. Mark appropriate info nodes as `skippable: true`
3. Add `safetyLevel: 'critical'` to contraindication/warning nodes
4. Add `pearls` to educational nodes
5. Test both personas: expert speed-run and learner deep-dive
6. Verify: no card requires scroll-to-see-buttons in compact mode
7. Verify: all safety content is always visible
8. Verify: pill trail is scannable and re-expandable

**Estimated scope:** `src/data/trees/dka.ts` content edits (every node gets a summary).

### Phase 4: Dead Code Removal

**Goal:** Remove the 8+ dead components identified in Section 6.

1. Delete component files
2. Remove imports and references throughout codebase
3. Clean up orphaned CSS
4. Clean up orphaned services
5. Compile and test
6. Verify bundle size reduction

**Estimated scope:** ~8 files deleted, ~20 files edited to remove imports.

### Phase 5: Scale to All Consults

**Goal:** Add `summary`, `skippable`, and `safetyLevel` to all 200+ consult trees.

1. Create a migration checklist per consult
2. For each consult:
   - Write `summary` for every node (20 words max, clinically precise)
   - Mark info-only nodes as `skippable` where appropriate
   - Flag safety-critical content with `safetyLevel`
   - Add `pearls` where educational value exists
3. Batch-compile and test after every 10-20 consults
4. Full regression test when complete

**Estimated scope:** 200+ tree files, each getting summary fields on every node. This is the largest phase and can be parallelized/batched.

### Phase 6: Polish & Deploy

1. Final CSS cleanup (remove dead styles from removed components)
2. Service worker cache update
3. Bundle size audit
4. Full deploy via `/deploy` skill
5. Verify on live site

---

## 9. Content Migration Template

When adding `summary` fields to a consult, follow this template for each node type:

### Question Nodes

```typescript
{
  id: 'dka-start',
  type: 'question',
  module: 1,
  title: 'Suspected DKA — Diagnosis',
  summary: 'Hyperglycemia + ketonemia + acidosis (pH <7.3 or HCO₃ <18)',
  body: '**DKA is a life-threatening metabolic emergency.** Defined by the 2024 consensus as: hyperglycemia (glucose >200 mg/dL, or known diabetes) + ketonemia (β-hydroxybutyrate >3 mmol/L or urine ketones 2+) + metabolic acidosis (pH <7.3 and/or bicarbonate <18 mEq/L). [1]\n\n...',
  // summary shown by default; body hidden behind accordion
  options: [
    { label: 'Confirmed DKA', next: 'dka-severity-assess', urgency: 'critical' },
    { label: 'Workup Needed', next: 'dka-workup-labs' },
    { label: 'Alternative Diagnosis', next: 'dka-exclude' },
  ],
}
```

### Info Nodes (Skippable)

```typescript
{
  id: 'dka-workup-labs',
  type: 'info',
  module: 1,
  title: 'Diagnostic Workup',
  summary: 'VBG, BMP, BOHB, CBC, lactate, UA, ECG, pregnancy test',
  body: '**Initial labs for suspected DKA:**\n\n...',
  skippable: true,  // Expert auto-advances past this
  next: 'dka-bohb-interpret',
}
```

### Result Nodes with Safety Content

```typescript
{
  id: 'dka-insulin-start',
  type: 'result',
  module: 5,
  title: 'Insulin Management',
  summary: 'Regular insulin 0.1 U/kg/hr IV after K+ confirmed ≥3.3',
  body: '**Insulin protocol:**\n\n...',
  safetyLevel: 'critical',  // "Check K+ first" warning always visible
  pearls: 'Starting insulin with K+ <3.3 can cause fatal hypokalemia. Always check and replace K+ BEFORE insulin.',
  treatment: {
    firstLine: { drug: 'Regular Insulin', dose: '0.1 units/kg/hr', route: 'IV infusion', ... },
    ...
  },
}
```

### Summary Writing Rules

1. **20 words maximum.** Prefer 10-15.
2. **Clinically actionable.** Not a topic label — the key clinical fact.
3. **Include the numbers.** Doses, thresholds, criteria values.
4. **No hedging.** "pH <7.3 or HCO₃ <18" not "consider checking acid-base status."
5. **No markdown formatting.** Plain text only in summary (formatting goes in body).
6. **Abbreviations OK.** Clinicians know BMP, VBG, BOHB, UA, ECG.

---

## 10. CSS Additions Required

### Accordion Styles

```css
/* Inline accordion for summary → body expansion */
.card-accordion {
  cursor: pointer;
  user-select: none;
}

.card-accordion__summary {
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.4;
  padding: 4px 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.card-accordion__indicator {
  font-size: 12px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-top: 3px;
}

.card-accordion--expanded .card-accordion__indicator {
  transform: rotate(90deg);
}

.card-accordion__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.card-accordion--expanded .card-accordion__body {
  max-height: 2000px; /* large enough for any content */
}
```

### Safety Banner Styles

```css
/* Safety banners — always visible, never behind accordion */
.safety-banner {
  border-radius: 8px;
  padding: 10px 14px;
  margin: 8px 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.safety-banner--critical {
  background: rgba(255, 71, 87, 0.12);
  border-left: 4px solid var(--color-danger);
  color: #c0392b;
}

.safety-banner--warning {
  background: rgba(255, 165, 2, 0.12);
  border-left: 4px solid var(--color-warning);
  color: #e67e22;
}
```

### Pearl Callout Styles

```css
/* Clinical pearl callouts inside expanded accordion */
.clinical-pearl {
  background: rgba(60, 179, 113, 0.08);
  border-left: 3px solid var(--color-decision-active);
  border-radius: 0 6px 6px 0;
  padding: 8px 12px;
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-primary);
}
```

### Answered Card Pill Styles

```css
/* Pill-style answered cards */
.decision-card--pill {
  background: var(--color-surface-card);
  border-radius: 20px;
  padding: 8px 16px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.decision-card--pill:active {
  transform: scale(0.98);
}

.decision-card--pill__title {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.decision-card--pill__arrow {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.decision-card--pill__answer {
  font-weight: 600;
  color: var(--color-text-primary);
}

.decision-card--pill--affirmative {
  border-left: 3px solid var(--color-decision-active);
}

.decision-card--pill--negative {
  border-left: 3px solid #2d3436;
}

.decision-card--pill--auto-advanced {
  border-left: 3px solid var(--color-text-secondary);
  opacity: 0.7;
}
```

---

## 11. Testing Checklist

After each phase, verify:

### Compact Card Tests
- [ ] Cards with `summary` show title + summary + buttons (no body text visible)
- [ ] Cards without `summary` render exactly as before (backward compatible)
- [ ] Tapping summary expands full body inline (accordion animation smooth)
- [ ] Tapping again collapses it
- [ ] Buttons are ALWAYS visible without scrolling on compact cards
- [ ] Safety banners render above buttons regardless of accordion state

### Pill Trail Tests
- [ ] Answered cards collapse to single-line pills
- [ ] Pills show: Title → Selected Answer
- [ ] Color coding: green left-border for affirmative, dark for negative
- [ ] Tapping a pill re-expands to full card (read-only)
- [ ] Auto-advanced info nodes show as muted pills with ✓

### Smart Skip Tests
- [ ] Info nodes with `skippable: true` auto-advance without user interaction
- [ ] Skipped nodes appear in the pill trail
- [ ] Nodes with `safetyLevel` are NEVER skipped regardless of `skippable`
- [ ] Question/result/input nodes are NEVER skipped regardless of `skippable`

### Safety Tests
- [ ] `safetyLevel: 'critical'` renders red banner, always visible
- [ ] `safetyLevel: 'warning'` renders orange banner, always visible
- [ ] Safety content is visible even when accordion is collapsed
- [ ] Safety nodes are never auto-skipped

### Regression Tests
- [ ] All 200+ consults still load and render
- [ ] All drug links still navigate correctly
- [ ] All calculators still open as overlays
- [ ] Contextual toolbar still works per-consult
- [ ] Search still works at all scope levels
- [ ] Offline mode still works
- [ ] Service worker caches all assets

---

## 12. Metrics to Track

After deployment, measure:

1. **Cards per consult that fit one screen** — target: 100% of compact cards (no scroll to buttons)
2. **Average answered-card height** — target: <40px (single-line pill)
3. **Bundle size reduction** — measure before/after dead code removal
4. **Time-to-first-decision** — how fast can you tap the first button after opening a consult
5. **Accordion expansion rate** — what % of users expand summaries (expert vs. learner signal)

---

## Appendix A: Decision Log

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| 1 | Primary user? | Both expert and learner equally | Same interface, different depth of engagement |
| 2 | Success metric? | Time to decision + visual calm + screen economy (all three) | The trifecta defines the UX |
| 3 | Default card view? | Title + 1-line summary + buttons | Summary is expandable via inline accordion |
| 4 | Expansion style? | Inline accordion | No context switches; card grows, buttons push down |
| 5 | Teaching depth? | Facts + clinical pearls | Practical without becoming a textbook |
| 6 | Large consult structure? | Smart skip via tree logic | Auto-advance past info nodes; same tree, two speeds |
| 7 | Dosing location? | Keep in-flow | Speed in emergencies outweighs DRY principle |
| 8 | Safety content? | Always visible, never hidden | Non-negotiable; exempt from progressive disclosure |
| 9 | Features to keep? | Core only | Remove 8+ experimental/unused components |
| 10 | Competitive differentiator? | Guided decisions + instant speed + offline-first | All three combined; no competitor has the triad |
| 11 | Answered card style? | Collapsible pill trail | Pills by default, tap to re-expand. Fast scan + deep review. |
| 12 | Dashboard entry point? | Keep specialty grid primary | Visual identity; doctors think in specialties |
| 13 | Rollout approach? | Content template first → prove on DKA → scale | Data model drives everything; one proof-of-concept first |
