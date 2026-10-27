# anticoag-reversal: andexanet update — SIGN-OFF (HELD, nothing applied)

**Status:** draft only. `src/data/trees/anticoag-reversal.ts` is NOT edited. `src/components/andexanet-regimen.ts` and `src/data/new-content/anticoag-reversal-andexanet-nodes.ts` exist as unwired drafts (not imported anywhere); `patch.md` holds the proposed edits.

## STOP item for Andy (patient-safety tier)
The research found that andexanet alfa US sales ended **12/22/2025** (FDA-reported; verify against the FDA notice and the manufacturer letter). The LIVE app still presents andexanet as an active option: consult node `acr-xa-critical` and CRITICAL_ACTIONS, the drug-store andexanet entry, `info-pages.ts`, and the existing calculator text (calculator.ts ~line 34658, "First-line: andexanet alfa ... ANNEXA-I 2024 supports andexanet").
Decision needed: rewrite those live recommendations (PCC as the available option; andexanet noted as withdrawn), or keep as is. This changes a live recommendation clinicians act on, so it is yours (and Dr. Kitlowski's), not an auto-fix.

## Open items
- ANNEXA-I intracranial hemorrhage results and thrombotic-event rates: confirm figures from the primary paper (Connolly, NEJM 2024) before any text uses them.
- Regimen calculator (low vs high dose by agent / dose / timing) drafted from ANNEXA-4 and the label; every number must be re-checked against the FDA label before wiring. Not registered in calculator.ts.
- Existing DOAC reversal doses unchanged; any conflict with primary sources is listed in patch.md.

## Checklist
- [ ] Andy: decide on the andexanet withdrawal rewrite (live content)
- [ ] Andy: approve or discard the regimen calculator and ANDEXANET_NODES drafts
- [ ] Dr. Kitlowski: audit after any wiring
