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
