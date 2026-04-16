# Lessons Learned — myMedKitt

Rules and patterns extracted from mistakes. Review at session start.

---

## CRITICAL: Never Make Things Up (2026-04-16)

**Context:** Used a fake URL format (`#/calc/weight?dose=0.3&unit=units&drug=insulin-lispro`) for weight-based drug links that didn't exist in the codebase. Andy caught broken hyperlinks going to wrong places.

**Rule:** NEVER invent or assume code patterns, URL formats, routing schemes, or technical implementations in this medical app. Always verify against:
1. CLAUDE.md documentation (project instructions)
2. Existing code examples (grep/search the codebase for similar patterns)
3. Ask Andy if still uncertain

**Why this matters:** People's health is at risk. This is a clinical decision support tool used by physicians at the bedside. A broken link or wrong information could delay critical treatment or cause harm.

**The correct pattern was:** Drug links use `#/drug/drug-id/indication-hint` format, and weight-based calculations require `weightCalc` fields on drug dosing entries in `drug-store.ts`. This was documented and could have been discovered by searching the codebase.

**Prevention:** Before implementing any feature involving navigation, linking, or data formats:
- Search for existing examples: `grep -r "#/drug" src/` or `grep -r "weightCalc" src/`
- Read the relevant component code to understand the actual implementation
- If no clear example exists, ASK before inventing

---

## Add future lessons below
