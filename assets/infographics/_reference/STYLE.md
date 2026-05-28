# myMedKitt Infographic Style Reference

Date created: 2026-05-28
Scope: Infographic Pipeline POC, deliverables = `exclusions` (vertical), `pathway` (horizontal), `donots` (square).
Audience: Emergency clinicians at the bedside. Glanceable in 5 seconds, readable in 30 seconds, defensible after 5 minutes of scrutiny.

This file is the single source of truth that the Prompt Architect agent (Block B) and the Generator agent will read. Do not generate any image until this file is approved.

---

## 1. Brand colors

These map to the existing myMedKitt brand. The Extractor wrote them into INTENT.json as `brand_palette`. Keep them stable across the three deliverables so the set reads as a family.

| Role | Hex | Purpose |
|------|------|---------|
| Primary navy | `#0F2A44` | Headings, frame, primary text |
| Accent amber | `#F5B600` | Jaundice motif (sclera, bile, skin) and module numbers |
| Accent red (critical) | `#C92A2A` | "Do NOT" cards, critical / time-sensitive cues only |
| Background | `#FFFFFF` | Clean white — no off-white, no cream, no gradient backgrounds |
| Muted text | `#4A5568` | Sub-labels, citation footnotes, low-priority body |

Color rules:
- Red is reserved for STOP signals (Do-NOTs, critical exclusions). Do not use red for general accent.
- Amber is the jaundice domain marker. Use it on the patient figure, biliary tree, and Module numbers.
- Navy is the structural color. Frames, headings, arrows, and chart lines are navy.
- One critical accent per visual. No "rainbow" infographics.

## 2. Typography

- Family: clean, modern sans-serif (Inter, Söhne, or Helvetica Neue substitute). One family across all three deliverables.
- Title: 56–72 pt, bold, navy. Sentence case. Never all-caps.
- Module / item number: 96–120 pt, bold, navy. Numbers are the anchor visual hierarchy.
- Imperative verb (Do-NOT and exclusion cards): 32–40 pt, semi-bold, navy. Keep to one short clause.
- Body / teaser: 18–22 pt, regular, muted text. Maximum 2 lines per teaser.
- Citation footnote: 12–14 pt, muted text, italic. Bottom right.

Typography rules:
- Imperative verbs first ("Send", "Confirm", "Skip", "Avoid"). No nouns-as-headings.
- Numbers always Arabic, never Roman.
- No keyword soup. One idea per line.

## 3. Layout grids per deliverable

### 3.1 Exclusions — vertical 1080×1620
- Outer margin: 64 px on all sides.
- Title bar top: 200 px tall, navy text on white, with a thin amber underline.
- Central patient figure: 280 × 360 px, centered horizontally at ~620 px from top. Stylized line drawing of a torso + head with amber-tinted sclera. Anatomically restrained, not realistic.
- 9 branch cards: 3 columns × 3 rows beneath the figure. Each card 280 × 260 px. Internal padding 20 px.
- Each card: number (top-left, navy), pattern (top), thin amber divider, killer action (bottom).
- Footer band: 80 px tall, white with thin navy rule. Citations + consult URL slug.

### 3.2 Pathway — horizontal 1920×1080
- Outer margin: 80 px.
- Title bar top: 160 px. Navy text on white, amber underline.
- 5 step boxes in a left-to-right row, each 320 × 560 px, with 80 px spacing between. Connecting arrows are navy chevrons.
- Each box: large module number (top), module name (middle), 2–3 short bullet labels (bottom). Bullets are amber circles, not check marks.
- Color-coding for urgency: Modules 1 and 2 carry a thin red top stripe (sick check + time-critical); Modules 3–5 carry a navy stripe.
- Footer: citations strip, 80 px.

### 3.3 Do-NOTs — square 1080×1080
- Outer margin: 48 px.
- Title bar: 140 px. Navy text on white with red underline (this set is the warning family).
- 2 × 5 grid of cards, each 392 × 132 px, 16 px gutter.
- Each card: large red number (left, 64 pt), imperative (top right, 28 pt, navy), one-line teaser (bottom right, 14 pt, muted).
- Card border: 2 px red rule on the left edge only. The rest is white card on white background, with a 1 px navy hairline frame.
- Footer: 60 px citation strip.

## 4. Reference images to seed Gemini (Block B input)

When Block B runs, it will need 3 reference frames to anchor the Generator's visual style. These are described here; the actual files will be hand-picked from myMedKitt screenshots and dropped into `_reference/teaching-style/` before Block B runs.

1. `ref-01-mymedkitt-consult-card.png` — an existing consult home tile from myMedKitt. Anchors brand color usage, sans-serif typography, and the navy+amber palette in a real product context.
2. `ref-02-medical-pictogram-set.png` — a clean medical pictogram set (e.g., a published medical-education poster). Anchors the "no clip-art, no stock photo" constraint with a positive example of stylized pictograms.
3. `ref-03-warning-card-grid.png` — any clean warning-card grid (e.g., a published patient-safety poster). Anchors the Do-NOTs aesthetic: red rule + numbered cards + short imperatives.

Andy should drop these three files into `_reference/teaching-style/` before Block B is invoked. If a slot is unfilled, Block B will warn but continue with text-only style guidance.

## 5. Critical anti-patterns to avoid

These are non-negotiable. If any generated variant violates one of these, the Critic agent must rank it last regardless of other quality signals.

- No stock photo people. No smiling doctors, no patient-and-clinician handshake imagery.
- No clip-art. No cartoon livers with eyes, no anthropomorphized organs.
- No gradients. Flat color only. (One thin amber gradient is acceptable on the patient figure's sclera if needed for jaundice cue, but not elsewhere.)
- No drop shadows. No glow effects. No 3D bevels.
- No purely decorative icons. Every glyph either earns its place by encoding clinical information or is removed.
- No keyword soup. Each card has one idea. If a card needs a sentence, it becomes a card.
- No abbreviations the reader has to expand. Do not use "APAP" without "(acetaminophen)" the first time it appears in a deliverable.
- No fabricated citations. The Generator must not invent journals, dates, or authors. All citation text comes verbatim from `INTENT.json.citations`.
- No fabricated dose values. The Generator must not invent or guess drug doses. Killer actions stay verbal ("blood cultures → antibiotics within 1 hour"), not numeric, unless the number came directly from `INTENT.json`.
- No "AI art" tells: no perfect-circle bokeh, no mirrored hands, no extra fingers, no melted text. The Critic agent's first pass is a hard reject on these.

## 6. Editability requirements (handed to Block C Vectorizer)

- Every piece of text in the final SVG must be a `<text>` node, not a vector blob. Potrace will lose this for bitmapped text; the post-processor in `vectorize.mjs` overlays editable text on top of the vectorized art.
- Color values must be applied via fill attributes that reference the brand palette by hex, so Andy can globally swap palette later by editing a single value.
- Font family declared at the SVG root once, inherited by all text nodes.

---

End of POC style reference. Update this file before scaling to the next consult.
