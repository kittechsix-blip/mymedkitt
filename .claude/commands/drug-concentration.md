# Drug Concentration & Volume Calculator

Add concentration-based volume (mL) display to weight-based drug entries in myMedKitt. Nurses draw up medications by volume, not milligrams — this skill ensures the calculator shows exactly how many mL to draw from which concentration.

## When to Use

- Adding a new drug that comes in specific concentrations (e.g., epinephrine, ketamine, midazolam, phenylephrine)
- Auditing existing drugs to ensure concentration/volume info is present
- Any drug where "draw up X mL" is more actionable than "give X mg"

## The `concentration` Field

Add to any `WeightCalc` entry in `src/data/drug-store.ts`:

```typescript
weightCalc: {
  dosePerKg: 0.01,
  unit: 'mg',
  maxDose: 0.5,
  label: 'Pediatric IM',
  concentration: {
    amount: 1,          // mg (or mcg) per mL — must match the unit field
    perMl: 1,           // always 1
    displayName: '1:1,000 (1 mg/mL)'  // what the vial/amp says
  }
}
```

### How Volume is Calculated

`volume (mL) = dose (mg) / concentration.amount (mg/mL)`

The calculator renders: `→ Draw up X mL of [displayName]`
Styled with red left border + background for high visibility.

## Common Concentrations Reference

| Drug | Concentration | amount | displayName |
|------|--------------|--------|-------------|
| Epinephrine (IM/SQ) | 1:1,000 | 1 | `1:1,000 (1 mg/mL)` |
| Epinephrine (IV/IO) | 1:10,000 | 0.1 | `1:10,000 (0.1 mg/mL)` |
| Epinephrine (push dose) | 10 mcg/mL | 10 | `10 mcg/mL (diluted)` |
| Atropine | 0.1 mg/mL | 0.1 | `0.1 mg/mL` |
| Ketamine (IV) | 50 mg/mL or 100 mg/mL | 50 or 100 | `50 mg/mL` or `100 mg/mL` |
| Midazolam (IV) | 1 mg/mL or 5 mg/mL | 1 or 5 | `1 mg/mL` or `5 mg/mL` |
| Phenylephrine (push dose) | 100 mcg/mL | 100 | `100 mcg/mL (diluted)` |
| Succinylcholine | 20 mg/mL | 20 | `20 mg/mL` |
| Rocuronium | 10 mg/mL | 10 | `10 mg/mL` |
| Fentanyl (IV) | 50 mcg/mL | 50 | `50 mcg/mL` |
| Morphine | 10 mg/mL or 2 mg/mL | 10 or 2 | `10 mg/mL` |
| Adenosine | 3 mg/mL | 3 | `3 mg/mL` |
| Amiodarone | 50 mg/mL | 50 | `50 mg/mL (from vial)` |

## Steps

1. **Identify the drug** — user provides drug name or you're auditing existing entries
2. **Find the entry** in `src/data/drug-store.ts` — search by drug ID or name
3. **For each dosing entry with `weightCalc`:**
   - Determine the standard concentration used for that route/indication
   - Add the `concentration` field to the `weightCalc` object
   - If `weightCalc` is an array, add concentration to each element (they may use different concentrations)
4. **Verify the unit matches** — if `unit: 'mg'`, then `amount` is mg/mL. If `unit: 'mcg'`, then `amount` is mcg/mL.
5. **Compile and deploy:**
   ```
   bunx tsc --skipLibCheck --noUnusedLocals false
   cp src/views/style.css docs/style.css
   node scripts/deploy-cache-sync.mjs
   bunx tsc --skipLibCheck --noUnusedLocals false  # recompile after version bump
   ```
6. **Commit and push**

## Audit Mode

To find all weight-based drugs missing concentration info:

```bash
# In the project root:
node -e "
const fs = require('fs');
const content = fs.readFileSync('src/data/drug-store.ts', 'utf8');
const wcMatches = [...content.matchAll(/weightCalc:\s*\{[^}]+\}/g)];
const withConc = wcMatches.filter(m => m[0].includes('concentration'));
const without = wcMatches.filter(m => !m[0].includes('concentration'));
console.log('With concentration:', withConc.length);
console.log('Without concentration:', without.length);
"
```

Not every drug needs concentration — skip rate-titrated infusions where the nurse mixes a drip bag (e.g., norepinephrine, vasopressin). Focus on drugs given as direct push/IM/IO doses where "draw up X mL" is the actionable instruction.

## Key Files

- `src/data/drug-store.ts` — WeightCalc interface + all drug data
- `src/components/drug-store.ts` — `renderDoseResults()` renders the volume line
- `src/views/style.css` — `.dose-calc-result-volume` styling (red left border)

## Important Notes

- The `amount` field MUST match the `unit` field on the WeightCalc. If unit is 'mcg', amount is mcg/mL.
- `displayName` should match what's printed on the vial/amp — this is what the nurse looks for.
- For drugs with multiple concentrations per route (e.g., midazolam 1 mg/mL vs 5 mg/mL), use the most common EM concentration or add separate weightCalc entries with labels.
- The volume line only appears in calculator results, not in the static regimen text (regimen text should already mention concentration inline).
