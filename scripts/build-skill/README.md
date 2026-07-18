# myMedKitt WingMan skill — build pipeline (Coordinator)

Generates the **`myMedKitt`** WingMan companion skill from the app's source of truth.
This is the first **Coordinator**-shape WingMan skill (vs. vertigo's Linear). It follows
the WingMan doctrine in `~/Desktop/_assets/kittech-wingman/STANDARDS.md` (rules 16–23).

## Commands (from repo root)

```bash
bun run build:skill         # generate dist/skill/myMedKitt/ + .skill + skill-meta.json
bun run build:skill:check   # release gate: build + structural assertions (gates CI/deploy)
bun run build:skill:eval    # behavioral eval (paid API; on-demand/nightly; needs ANTHROPIC_API_KEY)
```

## What it emits

```
dist/skill/myMedKitt/
├── SKILL.md                     # the router: disclaimer gate, universal safety gates, coordinate loop
└── references/
    ├── disclaimer.md            # from src/data/medical-disclaimer.ts
    ├── patient-refusal.md
    ├── disambiguation.md        # required safety gates + their source-node teaching
    ├── cross-references.md      # multi-consult interactions (src/data/skill-gates.ts)
    ├── citations.md
    ├── index.md                 # the consult CATALOG — the routing table
    └── consults/<id>.md         # one per registered consult (entry framing + critical-actions spine + citations)
```

## Source of truth (do not hand-edit generated files — edit source + rebuild)

| What | Source |
|---|---|
| Consult content | `src/data/trees/<id>.ts` (loaded per-file by id, like `supabase-push.mjs`) |
| Consult enumeration | `scripts/tree-registry.mjs` (`TREE_REGISTRY`) |
| Titles / specialties | `src/data/categories.ts` (`DEFAULT_CATEGORIES`) |
| Disclaimer | `src/data/medical-disclaimer.ts` ⚠️ **pending sign-off** |
| Safety gates + cross-refs | `src/data/skill-gates.ts` ⚠️ **gate/cross-ref wording pending sign-off** |

## Doctrine enforced (STANDARDS rules 16–23)

- **Fidelity (16):** baseline per consult = entry framing + **critical-actions spine** + citations + module structure (not entry-node-only). Deeper per-node carry is the consult-by-consult expansion; the build logs nothing silently (skipped consults recorded in `skill-meta.json`).
- **Disambiguation pattern (17) + derive-don't-restate (18):** gates live once in `skill-gates.ts`, referenced via `{{gate:<id>}}`; the required-disambiguation registry is keyed independently so deleting a gate fails coverage.
- **Release gate (19):** `build:skill:check` — coverage + content-safety + gate reachability + catalog completeness.
- **Eval + mutation (20):** `build:skill:eval` + `tests/regression.md`; gates have mutation proofs.
- **Atomic build + provenance (21):** staging → atomic promote; `skill-meta.json` carries contentHash + versions + skipped list.
- **Published-artifact security (22):** secret/PHI/local-path scan; in-app `#/...` link syntax normalized out.
- **Coordinator scale (23):** the router loads only the active consult (lazy), not all 307.

## Expansion (steady state)

When a consult's clinical content changes: edit `src/data/trees/<id>.ts`, then
`bun run build:skill:check`. To deepen a consult beyond baseline, add its key
decision nodes to a richer renderer, or tag safety disambiguations in `skill-gates.ts`.
New cross-consult interactions go in `CROSS_REFERENCES` (physician sign-off — new clinical IP).
