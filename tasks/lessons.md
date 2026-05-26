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

---

## CRITICAL: Do Not Use git-via-tmp for Surgical Commits (2026-05-26)

**Context:** The EDEADLK helper `~/Desktop/claude-brain/bin/git-via-tmp.sh` runs `git add -A` on the fast path. Even if specific files were staged first, the helper will sweep every dirty file in the worktree into the commit.

**Rule:** For scoped work in a dirty myMedKitt tree, do not use `git-via-tmp.sh` unless the intended commit is explicitly "commit everything currently dirty." Use normal `git commit` after staging exact files. Reserve `git-via-tmp.sh` for true Desktop/iCloud git deadlock fallback only.

**Prevention:** Before committing:
- Run `git status --short` and identify unrelated dirty files.
- Stage exact files only.
- Run `git diff --cached --stat`.
- Commit with `git commit -m "..."; git push`.
- If Desktop git fails with EDEADLK, then discuss fallback rather than calling the helper reflexively.
