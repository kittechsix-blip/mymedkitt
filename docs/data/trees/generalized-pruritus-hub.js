// MedKitt — Acute Generalized Pruritus / Itching Front Door (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / painless-scrotal-swelling-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to prur-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging / Labs
//   5. Disposition
//
// EBM-only citations. qSOFA (sepsis / DRESS screen) lives in the bottom toolbar.
// Consult gaps handled as plain-text result nodes: DRESS / early SJS-TEN, systemic-driver workup.
export const GENERALIZED_PRURITUS_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'prur-sick-check',
        type: 'info',
        module: 1,
        title: 'Generalized Itching — Sick Check First',
        body: '**Itching is a symptom, not a diagnosis.** Most generalized pruritus is benign, but a handful of causes are time-critical: itching can be the *prodrome* of anaphylaxis, the herald of a life-threatening drug eruption, or the surface sign of biliary obstruction/cholangitis. Screen for those before you reach for an antihistamine.\n\n**⚠️ 4 DO-NOT-MISS diagnoses**\n1. **Anaphylaxis prodrome** — urticaria/flushing/itching PLUS any airway (throat tightness, stridor, hoarseness), respiratory (wheeze, SOB), GI (crampy pain, vomiting), or hemodynamic (lightheadedness, hypotension) sign. Treat as anaphylaxis, not "hives."\n2. **Severe drug eruption (DRESS / early SJS-TEN)** — fever, facial edema, mucosal involvement, skin pain/tenderness, target or dusky lesions, or a new high-risk drug in the last 2–8 weeks. A dermatologic emergency.\n3. **Cholestatic pruritus / cholangitis** — itching with jaundice, dark urine, pale stools, or RUQ pain/fever; can signal biliary obstruction and ascending infection.\n4. **Angioedema / mast-cell activation** — deep, non-pitting swelling of lips, tongue, face, or airway ± itching; airway threat.\n\n**First 60 seconds:** vitals (fever/hypotension → screen with qSOFA in the toolbar), look at the **skin AND the mucous membranes**, ask about a **new drug in the last 2–8 weeks**, and screen for airway/GI/hemodynamic symptoms. **Any airway or hemodynamic sign → treat as anaphylaxis now.**',
        citation: [1],
        next: 'prur-triage',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out
    // ============================================================
    {
        id: 'prur-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Pick the Thread',
        body: 'Work the dangerous causes first, then the systemic and benign ones. Each branch runs a tight clinical gate to an explicit verdict; excluded branches return here for the next differential.',
        options: [
            { label: '🔴 Itching + airway / wheeze / GI / hypotension', description: 'Anaphylaxis prodrome', next: 'prur-anaphylaxis-entry', urgency: 'critical' },
            { label: '🔴 Fever / facial edema / mucosal or skin pain / new high-risk drug', description: 'DRESS / early SJS-TEN', next: 'prur-dress-entry', urgency: 'critical' },
            { label: 'Deep non-pitting swelling of lips / tongue / face', description: 'Angioedema', next: 'prur-angioedema-entry', urgency: 'urgent' },
            { label: 'Jaundice / dark urine / pale stools / RUQ pain', description: 'Cholestatic pruritus / biliary obstruction', next: 'prur-chole-entry', urgency: 'urgent' },
            { label: 'Wheals that come and go, no systemic signs', description: 'Acute urticaria', next: 'prur-urticaria-entry', urgency: 'routine' },
            { label: 'No rash / chronic / systemic clues (weight loss, renal, B-sx)', description: 'Systemic-driver itch', next: 'prur-systemic-entry', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Six-branch triage: anaphylaxis / DRESS-SJS-TEN / angioedema / cholestatic / urticaria / systemic-driver.',
    },
    // -------------------- ANAPHYLAXIS PRODROME --------------------
    {
        id: 'prur-anaphylaxis-entry',
        type: 'question',
        module: 2,
        title: 'Anaphylaxis — Systemic-Involvement Gate',
        body: '**Itching/urticaria with ANY second organ system involved is anaphylaxis until proven otherwise.** Apply the criteria: acute onset of skin/mucosal signs PLUS at least one of — respiratory compromise (dyspnea, wheeze, stridor, hypoxemia), reduced BP/end-organ symptoms (collapse, syncope, incontinence), or severe GI symptoms after a likely allergen. Hypotension after a known allergen alone also qualifies. **Do NOT wait for full-blown shock — early epinephrine saves lives.**',
        options: [
            { label: 'Skin/mucosal signs + airway / respiratory / BP / GI involvement', description: 'Treat as anaphylaxis NOW', next: 'prur-anaphylaxis-verdict', urgency: 'critical' },
            { label: 'Itching / hives only, no other organ system involved', description: 'Not anaphylaxis \u2014 move on', next: 'prur-anaphylaxis-excluded', urgency: 'routine' },
        ],
        citation: [2],
        summary: 'Skin + any second system = anaphylaxis; give IM epinephrine immediately, do not wait for shock.',
        safetyLevel: 'critical',
    },
    {
        id: 'prur-anaphylaxis-verdict',
        type: 'result',
        module: 2,
        title: 'Anaphylaxis — IM Epinephrine Now',
        body: 'Open [Anaphylaxis](#/tree/anaphylaxis) for the full pathway.\n\n**Next steps (do not delay):**\n- **IM epinephrine 0.3–0.5 mg (1 mg/mL) into the anterolateral thigh immediately** — repeat every 5–15 min as needed. This is the first and most important drug.\n- Position supine (or left lateral if pregnant/vomiting), high-flow O2, large-bore IV, IV fluids for hypotension.\n- Adjuncts (do NOT substitute for epinephrine): H1/H2 antihistamines for cutaneous symptoms, inhaled beta-agonist for bronchospasm; steroids do not treat the acute event.\n- **Refractory:** epinephrine infusion; glucagon if on a beta-blocker.\n- Observe for biphasic reaction; prescribe an epinephrine auto-injector and refer to allergy.',
        recommendation: 'IM epinephrine immediately + repeat PRN, O2, IV fluids; antihistamines/beta-agonist are adjuncts only; observe for biphasic and prescribe auto-injector.',
        citation: [2],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'prur-anaphylaxis-excluded',
        type: 'result',
        module: 2,
        title: 'Anaphylaxis — Excluded (for now)',
        body: 'Itching or hives with no airway, respiratory, GI, or hemodynamic involvement is not anaphylaxis right now. **It can evolve fast** — if any second organ system develops (throat tightness, wheeze, vomiting, lightheadedness), give IM epinephrine immediately.\n\nReturn to the hub for the next differential.',
        recommendation: 'Isolated hives/itch is not anaphylaxis; counsel and re-treat as anaphylaxis the moment a second system is involved.',
        citation: [2],
        next: 'prur-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- DRESS / EARLY SJS-TEN (consult gap: plain-text) --------------------
    {
        id: 'prur-dress-entry',
        type: 'question',
        module: 2,
        title: 'Severe Drug Eruption — DRESS / Early SJS-TEN Gate',
        body: '**A new drug + fever + a spreading eruption is a red-flag combination.** DRESS: 2–8 weeks after a culprit drug (allopurinol, aromatic anticonvulsants, sulfonamides, vancomycin) with fever, facial edema, diffuse rash, lymphadenopathy, eosinophilia, and organ involvement (hepatitis, nephritis). **SJS-TEN:** skin pain/tenderness, dusky or target lesions, mucosal erosions (eyes, mouth, genitals), a positive Nikolsky sign, and skin detachment. **Skin pain, mucosal involvement, or a positive Nikolsky sign is an emergency.**',
        options: [
            { label: 'Fever + facial edema / mucosal erosions / skin pain / Nikolsky+ / organ involvement', description: 'Treat as DRESS / SJS-TEN', next: 'prur-dress-verdict', urgency: 'critical' },
            { label: 'No fever, no mucosal/skin pain, no organ signs', description: 'Severe drug eruption unlikely \u2014 move on', next: 'prur-dress-excluded', urgency: 'routine' },
        ],
        citation: [3],
        summary: 'New drug + fever + mucosal/skin pain/Nikolsky+ = DRESS/SJS-TEN; stop the drug, dermatology, supportive care.',
        safetyLevel: 'critical',
    },
    {
        id: 'prur-dress-verdict',
        type: 'result',
        module: 2,
        title: 'DRESS / SJS-TEN — Stop the Drug + Emergent Dermatology',
        body: '**Severe cutaneous adverse reaction** (no dedicated DRESS deep-dive yet — manage here). If the picture is frank SJS-TEN, open [SJS-TEN](#/tree/sjs-ten) for the full pathway.\n\n**Next steps:**\n- **Immediately STOP the suspected culprit drug** — this is the single most important intervention and improves survival.\n- **Emergent dermatology consult**; **SCORTEN** to prognosticate TEN. Involve ophthalmology, urology, and burn/ICU for extensive mucocutaneous disease.\n- **Supportive care is the backbone:** fluid/electrolyte management, temperature control, meticulous wound/skin care, infection surveillance, and analgesia — burn-unit-level care for extensive detachment.\n- **DRESS:** check CBC (eosinophilia), LFTs, renal function; systemic steroids are commonly used for organ involvement (specialist-guided).\n- Screen for organ involvement and complications; document the culprit and add a drug allergy.\n- (Consult gap for DRESS — managed in-hub.)',
        recommendation: 'Stop the culprit drug now, emergent dermatology, SCORTEN + supportive burn-level care; steroids for DRESS organ involvement (specialist-guided).',
        citation: [3],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'prur-dress-excluded',
        type: 'result',
        module: 2,
        title: 'Severe Drug Eruption — Unlikely',
        body: 'No fever, no mucosal involvement, no skin pain/Nikolsky sign, and no organ dysfunction makes DRESS/SJS-TEN unlikely right now. **These can evolve over days** — if a patient on a new high-risk drug develops fever, facial swelling, mucosal erosions, or skin pain, stop the drug and escalate immediately.\n\nReturn to the hub for the next differential.',
        recommendation: 'Severe drug eruption unlikely without systemic/mucosal signs; give strict return precautions to anyone on a new high-risk drug.',
        citation: [3],
        next: 'prur-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- ANGIOEDEMA --------------------
    {
        id: 'prur-angioedema-entry',
        type: 'question',
        module: 2,
        title: 'Angioedema — Airway + Mechanism Gate',
        body: '**Angioedema is deep dermal/subcutaneous swelling — lips, tongue, face, larynx — and threatens the airway.** Distinguish the mechanisms: **histaminergic/allergic** (itchy, urticarial, responds to epinephrine/antihistamines/steroids) vs **bradykinin-mediated** (ACE-inhibitor–induced or hereditary/C1-inhibitor deficiency — NOT itchy, often no hives, poorly responsive to the allergic cocktail). The key ED question is **is the airway involved or at risk?**',
        options: [
            { label: 'Tongue / floor-of-mouth / laryngeal swelling, voice change, stridor', description: 'Airway threat \u2014 secure it', next: 'prur-angioedema-verdict', urgency: 'critical' },
            { label: 'Lip / facial swelling only, airway clearly protected', description: 'Treat by mechanism, observe', next: 'prur-angioedema-verdict', urgency: 'urgent' },
            { label: 'No deep swelling \u2014 only superficial wheals', description: 'Not angioedema \u2014 move on', next: 'prur-angioedema-excluded', urgency: 'routine' },
        ],
        citation: [4],
        summary: 'Angioedema = airway assessment first; separate histaminergic (treat allergic) from bradykinin (ACE-I/HAE) pathways.',
        safetyLevel: 'critical',
    },
    {
        id: 'prur-angioedema-verdict',
        type: 'result',
        module: 2,
        title: 'Angioedema — Airway First, Then Treat by Mechanism',
        body: 'Open [Angioedema](#/tree/angioedema) for the full pathway.\n\n**Next steps:**\n- **Airway is priority one.** Tongue/laryngeal involvement, voice change, or stridor → prepare for early, controlled intubation (awake/fiberoptic) with a double set-up and surgical airway backup. Do not wait for total obstruction.\n- **Histaminergic/allergic angioedema (itchy, hives):** treat like anaphylaxis — IM epinephrine, antihistamines, steroids.\n- **ACE-inhibitor / hereditary (bradykinin, not itchy):** stop the ACE inhibitor permanently; the allergic cocktail often fails. HAE/C1-INH targeted therapies (C1-inhibitor concentrate, icatibant) where available; supportive airway care.\n- Observe; disposition by airway risk and response.',
        recommendation: 'Secure the airway early if involved; treat histaminergic angioedema like anaphylaxis; stop ACE-I for bradykinin type and use HAE-directed therapy when applicable.',
        citation: [4],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'prur-angioedema-excluded',
        type: 'result',
        module: 2,
        title: 'Angioedema — Excluded',
        body: 'Only superficial itchy wheals without deep lip/tongue/facial/laryngeal swelling — this is urticaria, not angioedema. Reassess the airway if deep swelling develops.\n\nReturn to the hub for the next differential.',
        recommendation: 'No deep swelling → angioedema excluded; work the urticaria branch and re-check the airway if deep swelling appears.',
        citation: [4],
        next: 'prur-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- CHOLESTATIC PRURITUS / BILIARY OBSTRUCTION --------------------
    {
        id: 'prur-chole-entry',
        type: 'question',
        module: 2,
        title: 'Cholestatic Pruritus — Obstruction + Infection Gate',
        body: '**Itching with jaundice, dark urine, or pale stools points to cholestasis** — bile acids deposited in the skin. The ED job is to find **obstruction** (stone, stricture, mass) and rule out **ascending cholangitis**: Charcot triad (RUQ pain, fever, jaundice) ± Reynolds pentad (+ hypotension, confusion). **Cholangitis is a septic emergency.** Also consider cholestasis of pregnancy in a pregnant patient (fetal risk).',
        options: [
            { label: 'Jaundice + fever + RUQ pain (\u00B1 hypotension/confusion)', description: 'Cholangitis \u2014 septic emergency', next: 'prur-chole-verdict', urgency: 'critical' },
            { label: 'Cholestasis signs, no fever/sepsis (obstruction or pregnancy)', description: 'Work up obstruction / OB', next: 'prur-chole-verdict', urgency: 'urgent' },
            { label: 'No jaundice / normal LFTs / no cholestasis', description: 'Cholestatic itch unlikely \u2014 move on', next: 'prur-chole-excluded', urgency: 'routine' },
        ],
        citation: [5],
        summary: 'Cholestatic itch → find obstruction + rule out cholangitis (Charcot/Reynolds); pregnancy cholestasis carries fetal risk.',
        safetyLevel: 'warning',
    },
    {
        id: 'prur-chole-verdict',
        type: 'result',
        module: 2,
        title: 'Cholestasis — Image the Biliary Tree + Treat Infection',
        body: 'Open [Acute Jaundice](#/tree/acute-jaundice-hub) for the full workup of the jaundiced patient.\n\n**Next steps:**\n- **RUQ ultrasound** first (ductal dilation, stones); CT/MRCP as indicated.\n- **Cholangitis (Charcot/Reynolds):** this is a septic emergency — resuscitate on the [Sepsis](#/tree/sepsis) pathway (IV fluids, blood cultures, lactate; qSOFA in the toolbar), **broad-spectrum antibiotics**, and **urgent biliary decompression (ERCP)**. Consult GI/surgery early.\n- **LFTs, bilirubin, GGT/ALP** to confirm the cholestatic pattern; lipase if pain.\n- **Symptomatic itch relief for cholestasis:** bile-acid sequestrants (cholestyramine); treat the underlying obstruction definitively.\n- **Pregnant + cholestasis:** intrahepatic cholestasis of pregnancy carries fetal risk — check bile acids and involve OB.',
        recommendation: 'RUQ US + LFTs; cholangitis → sepsis resuscitation + broad-spectrum abx + urgent ERCP; cholestyramine for itch; OB involvement if pregnant.',
        citation: [5],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'prur-chole-excluded',
        type: 'result',
        module: 2,
        title: 'Cholestatic Itch — Unlikely',
        body: 'No jaundice, normal LFTs, and no cholestatic features make biliary obstruction an unlikely driver of the itch. Keep it on the list if the picture changes (new jaundice, dark urine, RUQ pain).\n\nReturn to the hub for the next differential.',
        recommendation: 'Cholestasis unlikely with normal LFTs/no jaundice; revisit if jaundice or RUQ symptoms develop.',
        citation: [5],
        next: 'prur-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- ACUTE URTICARIA --------------------
    {
        id: 'prur-urticaria-entry',
        type: 'question',
        module: 2,
        title: 'Acute Urticaria — Isolated vs Systemic Gate',
        body: '**Acute urticaria = transient, migratory, intensely itchy wheals**, each individual lesion lasting <24 h and blanching, with no scarring. Most is idiopathic or post-viral; triggers include foods, drugs, and infections. **The essential safety check is that there is NO systemic involvement** (no airway/GI/BP signs — that would be anaphylaxis) and **no angioedema or drug-eruption red flags.**',
        options: [
            { label: 'Isolated itchy wheals, no systemic signs, no red flags', description: 'Treat as simple urticaria', next: 'prur-urticaria-verdict', urgency: 'routine' },
            { label: 'Individual lesions >24 h / painful / bruise-like / systemic', description: 'Not simple urticaria \u2014 reassess', next: 'prur-urticaria-excluded', urgency: 'urgent' },
        ],
        citation: [1],
        summary: 'Simple urticaria = migratory itchy wheals <24 h, no systemic signs; fixed/painful lesions → reconsider vasculitis/drug eruption.',
    },
    {
        id: 'prur-urticaria-verdict',
        type: 'result',
        module: 2,
        title: 'Acute Urticaria — Antihistamines + Trigger Avoidance',
        body: '**Simple acute urticaria** (no dedicated consult — manage here):\n\n- **Second-generation H1 antihistamines are first-line** (e.g., cetirizine, loratadine, fexofenadine), up-dosed as needed; add an H2 blocker for incomplete response.\n- A short steroid course for severe or refractory flares (limited evidence, use judiciously).\n- **Identify and remove triggers** (new drugs, foods, infections); most acute urticaria is self-limited.\n- **Strict return precautions:** any throat tightness, wheeze, vomiting, or lightheadedness → treat as anaphylaxis and return/call EMS.\n- Refer to allergy/dermatology if lesions persist >6 weeks (chronic urticaria).',
        recommendation: '2nd-gen H1 antihistamines first-line (± H2), short steroid for severe flares, remove triggers, anaphylaxis return precautions.',
        citation: [1],
        next: 'prur-disposition',
        confidence: 'recommended',
    },
    {
        id: 'prur-urticaria-excluded',
        type: 'result',
        module: 2,
        title: 'Not Simple Urticaria — Reassess',
        body: 'Fixed lesions lasting >24 h, painful or burning wheals, bruise-like/residual pigmentation, or any systemic feature argue against simple urticaria — consider **urticarial vasculitis**, a **drug eruption**, or an evolving systemic process. Re-run the DRESS/SJS-TEN and anaphylaxis gates and consider dermatology.\n\nReturn to the hub for the next differential.',
        recommendation: 'Fixed/painful/bruising lesions are not simple urticaria — reconsider vasculitis/drug eruption and re-screen the emergent branches.',
        citation: [1],
        next: 'prur-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- SYSTEMIC-DRIVER ITCH (consult gap: plain-text) --------------------
    {
        id: 'prur-systemic-entry',
        type: 'question',
        module: 2,
        title: 'Itch Without a Rash — Systemic-Driver Gate',
        body: '**Generalized itch with little or no primary rash points to a systemic driver.** Key categories: **renal** (uremic pruritus in CKD/dialysis), **hepatic/cholestatic** (already screened), **hematologic/malignancy** (polycythemia vera — itch after a hot shower; Hodgkin lymphoma with B-symptoms — weight loss, night sweats, fever), **endocrine** (thyroid disease, diabetes), **drug-induced** (opioids), and **pregnancy** (cholestasis, PUPPP). Look for **B-symptoms and clues of organ disease.**',
        options: [
            { label: 'Systemic clues: CKD, weight loss, night sweats, aquagenic itch, B-sx', description: 'Work up the systemic cause', next: 'prur-systemic-verdict', urgency: 'urgent' },
            { label: 'No systemic clues \u2014 likely dermatologic / xerosis', description: 'Treat symptomatically', next: 'prur-systemic-excluded', urgency: 'routine' },
        ],
        citation: [6],
        summary: 'Itch without rash → screen renal/hepatic/heme-malignancy/endocrine drivers; aquagenic itch + B-sx are red flags.',
    },
    {
        id: 'prur-systemic-verdict',
        type: 'result',
        module: 2,
        title: 'Systemic-Driver Itch — Targeted Workup + Referral',
        body: '**Systemic pruritus** (no dedicated consult — manage here). If a hematologic malignancy is suspected, [Oncological Emergencies](#/tree/oncological-emergencies) covers acute complications.\n\n**Screening labs when itch has no rash:** CBC with differential (eosinophilia, polycythemia — high Hgb/Hct suggests PV), renal function (uremic itch), LFTs (cholestasis), TSH, glucose/HbA1c, and — if B-symptoms/lymphadenopathy — LDH and imaging for lymphoma.\n\n- **Uremic pruritus:** optimize dialysis; symptomatic agents (gabapentinoids, topical emollients, UVB) via nephrology.\n- **Polycythemia vera / lymphoma:** refer to hematology-oncology; aquagenic pruritus + high Hct or B-symptoms is a red flag.\n- Manage the underlying disease; symptomatic relief with emollients and antihistamines is adjunctive.\n- (Consult gap — managed in-hub.)',
        recommendation: 'No-rash itch → CBC/renal/LFT/TSH/glucose ± LDH+imaging for B-sx; treat the driver (renal, PV/lymphoma, endocrine) and refer.',
        citation: [6],
        next: 'prur-disposition',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'prur-systemic-excluded',
        type: 'result',
        module: 2,
        title: 'Likely Dermatologic / Xerosis',
        body: 'No systemic clues and no primary lesions point to a dermatologic cause — most commonly **xerosis (dry skin)**, especially in older adults and in dry/cold climates, or a low-grade dermatitis/scabies. Treat symptomatically and refer to dermatology if it persists.\n\nProceed to disposition.',
        recommendation: 'Likely xerosis/dermatitis — emollients, gentle skin care, antihistamines for symptom relief, dermatology referral if persistent.',
        citation: [6],
        next: 'prur-disposition',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Initial Bundle / Reassess
    // ============================================================
    {
        id: 'prur-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle',
        body: '**The generalized-pruritus work-up bundle (scale to acuity):**\n- **Screen for the emergencies first:** airway/hemodynamic check (anaphylaxis), a full skin AND mucous-membrane exam (drug eruption, Nikolsky), and a medication reconciliation for new drugs in the last 2–8 weeks.\n- **Vitals + qSOFA** if febrile/toxic (DRESS, cholangitis, sepsis).\n- **Targeted labs for itch without rash:** CBC with differential, renal function, LFTs/bilirubin, TSH, glucose; add LDH + imaging if B-symptoms.\n- **Symptom relief that does not mask danger:** second-generation antihistamines and emollients; give epinephrine (not just antihistamines) the moment anaphylaxis criteria are met.\n- Document the suspected culprit drug and add an allergy where relevant.',
        citation: [1],
        next: 'prur-reassess',
    },
    {
        id: 'prur-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After the Bundle',
        body: 'After the emergency screen, skin/mucosal exam, and initial labs — where does the patient stand?',
        options: [
            { label: 'Anaphylaxis / DRESS-SJS-TEN / airway angioedema / cholangitis', description: 'Escalate: treat + admit', next: 'prur-imaging', urgency: 'critical' },
            { label: 'Stable, cause identified, benign or treatable', description: 'Move to disposition', next: 'prur-disposition', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Anaphylaxis/severe drug eruption/airway angioedema/cholangitis → escalate + admit; stable + diagnosed → disposition.',
    },
    // ============================================================
    // Module 4 — Imaging / Labs
    // ============================================================
    {
        id: 'prur-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging / Labs',
        body: '**Match the study to the question:**\n- **RUQ ultrasound / MRCP** — cholestatic pruritus with jaundice (ductal dilation, stones, mass); the key study for suspected biliary obstruction/cholangitis.\n- **CBC with differential** — eosinophilia (DRESS), polycythemia (PV), cytopenias (lymphoma/hematologic disease).\n- **Renal/hepatic panels, TSH, glucose** — systemic-driver itch without a rash.\n- **LDH + CT chest/abdomen/pelvis** — B-symptoms/lymphadenopathy suggesting lymphoma (usually outpatient unless a mass causes an oncologic emergency).\n- **Skin biopsy** — dermatology-directed for an atypical or severe eruption; not an ED study.\n- Imaging is generally NOT needed for simple acute urticaria or clear xerosis.',
        citation: [1],
        next: 'prur-disposition',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'prur-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Where does this patient go?',
        options: [
            { label: 'Anaphylaxis / DRESS-SJS-TEN / airway angioedema / cholangitis', description: 'Admit (ICU/burn as needed)', next: 'prur-dispo-admit', urgency: 'critical' },
            { label: 'Treated but needs monitoring / biphasic-risk / borderline', description: 'Observe in the ED', next: 'prur-dispo-observe', urgency: 'urgent' },
            { label: 'Simple urticaria / xerosis / benign systemic itch', description: 'Discharge with follow-up', next: 'prur-dispo-discharge', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Admit the emergencies (ICU/burn as needed); observe biphasic-risk/borderline; discharge benign with follow-up.',
    },
    {
        id: 'prur-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: '**Admit** the dangerous causes.\n\n- **Refractory anaphylaxis** → ICU (epinephrine infusion, airway).\n- **DRESS / SJS-TEN** → dermatology + burn unit/ICU for extensive disease; stop the culprit drug, supportive care, specialist co-management.\n- **Airway angioedema** → monitored/ICU setting until swelling resolves; HAE-directed therapy as needed.\n- **Cholangitis** → admit for antibiotics + urgent ERCP/biliary decompression; ICU if septic shock.\n- Ongoing resuscitation, specialty involvement, and monitoring appropriate to the diagnosis.',
        recommendation: 'Admit anaphylaxis/DRESS-SJS-TEN/airway angioedema/cholangitis to the appropriate level (ICU/burn); stop culprit drugs, involve specialists.',
        citation: [1],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'prur-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe in the ED',
        body: '**Observation** for the borderline patient — e.g., treated anaphylaxis watched for a biphasic reaction, resolving allergic angioedema, or an uncertain evolving eruption.\n\n- Serial airway/vital checks; repeat exam if the picture changes.\n- Ensure symptoms are controlled and the airway is stable before discharge; specialist input if uncertain.\n- Provide a prescription (auto-injector after anaphylaxis) and explicit return precautions before disposition.',
        recommendation: 'Short ED observation for biphasic/airway risk with serial checks, then discharge with an auto-injector + return precautions or admit.',
        citation: [1],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'prur-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge',
        body: '**Discharge** the well patient with a clear plan.\n\n- **Simple urticaria:** scheduled 2nd-gen antihistamines, trigger avoidance, allergy/derm referral if >6 weeks; **anaphylaxis return precautions**.\n- **Xerosis/dermatitis:** emollients, gentle skin care, dermatology follow-up if persistent.\n- **Benign systemic itch:** outpatient workup of the identified driver (renal, hepatic, endocrine, heme) with the appropriate specialist.\n- Written return precautions and a named follow-up; explicit red-flag counseling (airway symptoms, fever + rash, jaundice, skin pain/blistering → return immediately).',
        recommendation: 'Discharge benign/treated patients with symptom control, outpatient driver workup, specialist referral, and explicit airway/severe-eruption return precautions.',
        citation: [1],
        confidence: 'recommended',
    },
];
export const GENERALIZED_PRURITUS_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick Check first — itching can be an anaphylaxis prodrome, a severe drug eruption, or cholestasis/cholangitis', nodeId: 'prur-sick-check' },
    { text: 'Skin/mucosal signs + any second organ system → anaphylaxis: IM epinephrine now, do not wait for shock', nodeId: 'prur-anaphylaxis-entry' },
    { text: 'New drug + fever + facial edema / mucosal erosions / skin pain / Nikolsky+ → DRESS/SJS-TEN: stop the drug + emergent dermatology', nodeId: 'prur-dress-entry' },
    { text: 'Jaundice + fever + RUQ pain → cholangitis: sepsis resuscitation + broad-spectrum abx + urgent ERCP', nodeId: 'prur-chole-entry' },
];
export const GENERALIZED_PRURITUS_HUB_CITATIONS = [
    { num: 1, text: 'Reamy BV, Bunt CW, Fletcher S. A Diagnostic Approach to Pruritus. Am Fam Physician. 2011;84(2):195-202; Tintinalli\u2019s Emergency Medicine, Generalized Pruritus/Dermatologic Emergencies chapters, 9th ed.' },
    { num: 2, text: 'Shaker MS, Wallace DV, Golden DBK, et al. Anaphylaxis\u20142020 Practice Parameter Update. J Allergy Clin Immunol. 2020;145(4):1082-1123; Cardona V, et al. World Allergy Organization Anaphylaxis Guidance 2020. World Allergy Organ J. 2020;13(10):100472.' },
    { num: 3, text: 'Kardaun SH, et al. DRESS syndrome (RegiSCAR). Br J Dermatol. 2013;169(5):1071-1080; Schneider JA, Cohen PR. Stevens-Johnson Syndrome and Toxic Epidermal Necrolysis: A Concise Review. Adv Ther. 2017;34(6):1235-1244.' },
    { num: 4, text: 'Cicardi M, et al. Classification, diagnosis, and approach to treatment for angioedema: consensus report. Allergy. 2014;69(5):602-616; Bernstein JA, et al. Angioedema in the Emergency Department. J Allergy Clin Immunol Pract. 2017;5(5):1402-1409.' },
    { num: 5, text: 'Kiesewetter H, et al. Pruritus in cholestasis. In: Tintinalli\u2019s Emergency Medicine (Jaundice), 9th ed; Kimmel M, et al. Chronic kidney disease-associated and cholestatic pruritus. Nephrol Dial Transplant. 2016. TG13/Tokyo Guidelines for acute cholangitis, J Hepatobiliary Pancreat Sci. 2018.' },
    { num: 6, text: 'Weisshaar E, et al. European S2k Guideline on Chronic Pruritus. Acta Derm Venereol. 2019;99(5):469-506; Fett N, et al. Pruritus as a sign of systemic disease. Am Fam Physician. 2011.' },
];
export const GENERALIZED_PRURITUS_HUB_NODE_COUNT = GENERALIZED_PRURITUS_HUB_NODES.length;
export const GENERALIZED_PRURITUS_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Initial Bundle / Reassess',
    'Imaging / Labs',
    'Disposition',
];
