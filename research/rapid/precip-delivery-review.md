# Precipitous Delivery RAPID draft review

2026-11-18. Requested by Andy. Branch feat/precip-delivery-rapid.

Seven tiles: call help; support head/check nuchal cord; shoulders; cord clamping; newborn assessment; placenta; oxytocin.

Verification: RAPID checker HARD 0; 30 review flags retained; all eight existing critical-action source nodes represented. TypeScript compiled. Full test suite: 529 passed, zero failed. All seven tiles fit a 390x844 phone and expand/collapse. Independent AI-assisted extraction review performed, not physician approval or clinical clearance.

Do not activate this draft yet. Existing clinical sources require separate correction/reconciliation:

1. Oxytocin timing: tree and drug entry say after placenta. WHO 2025 recommends immediately after the baby/babies, preferably within one minute. Proposed correction is timing only; regimen still requires clinician review. Source: https://www.ncbi.nlm.nih.gov/books/NBK619233/
2. Placenta: source describes counter-pressure on the uterine fundus; clarify uterine counter-traction technique and trained-operator scope before promoting it in RAPID.
3. Nuchal cord: delivery source goes directly to clamp-and-cut for tight cord, while cord-emergencies includes a somersault pathway. Reconcile the sources and include loose/tight cord actions before activation.

Recorded omissions: uterine tone/massage, placental completeness, maternal monitoring, hemorrhage treatment and loose/tight nuchal management. Neonatal assessment is immediate and simultaneous, never delayed for a clamping timer or APGAR. Full critical actions remain accessible.

The review proof is generated locally at rapid-proof/precip-delivery.html. Preview at http://localhost:8791/app.html?rapid-preview=1#/tree/precip-delivery . Approvals unchanged. No tree/drug edits, no Supabase writes, no deployment.

## Approved reconciliation and activation, 2026-11-18

Andy approved correcting the source issues and activating this named card. The original findings above record the draft state, not the final guidance.

- Replaced delayed prophylaxis and the non-equivalent 5 U/hour infusion with WHO 10 units IM or diluted IV over 1–2 minutes after birth of all babies, preferably within 1 minute. Removed the incorrect 83 mL/hour conversion and separated prophylaxis from hemorrhage escalation.
- Corrected placental technique to upward uterine counter-traction above the pubic symphysis, contracted uterus, trained clinician, stop if no descent.
- Added loose-cord reduction and somersault-first intact-cord delivery when feasible. Clamp/cut remains a last resort. Tight-cord delivery routes directly to immediate newborn assessment.
- Newborn assessment precedes clamping and explicitly must not wait for a timer or APGAR. Maternal prophylaxis occurs concurrently. Summary and live drug entry aligned.
- Independent AI-assisted clinical review verified these corrections and caught a nonexistent PPH link, replaced with explicit urgent OB/institutional hemorrhage-protocol escalation. No claim of separate physician signoff.

Evidence: WHO2025 PPH recommendations (https://www.ncbi.nlm.nih.gov/books/NBK619233/); WHO2015 third-stage technique (https://www.ncbi.nlm.nih.gov/books/NBK326674/); Mercer2005 nuchal cord article (doi:10.1016/j.jmwh.2005.04.023); AHA/AAP2025 neonatal resuscitation (https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation).

Verification before publication: 531 tests passed, zero failed; TypeScript and critical-action/citation/image/calculator/cross-link gates passed (two pre-existing cross-link exceptions remain). Seven tiles fit390x844. HARD0,28 reviewed contextual/face flags. Exact strip approval recorded through rapid-approve.ts; all43 approved strips remain eligible against local source. Production sync and verification follow.
