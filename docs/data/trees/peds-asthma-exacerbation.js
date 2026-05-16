// MedKitt — Pediatric Acute Asthma Exacerbation Decision Tree
// EB Medicine Pediatric Emergency Medicine Practice + GINA 2025 (peds section) + AAP/NHLBI EPR-3 (2020 focused update)
// + PRAM (Chalut 2000, Ducharme 2008) + Cochrane ipratropium peds (Griffiths 2013) + Keeney 2014 dex peds
// + NEJM heliox peds critical care (2023) + Cochrane IV MgSO4 peds (Cheuk 2005)
// 5 modules: Triage/PRAM → Mild-Moderate Tx → Severe/Life-Threatening Escalation → Disposition → Mimics & Complications
export const PEDS_ASTHMA_EXACERBATION_CRITICAL_ACTIONS = [
    { text: 'Triage SpO2, work of breathing, mental status; identify silent chest / AMS / cyanosis', nodeId: 'paa-triage' },
    { text: 'Score with PRAM (0-12) — guides treatment intensity and disposition', nodeId: 'paa-pram-calc' },
    { text: 'Mild-moderate: albuterol ± ipratropium x3, dexamethasone 0.6 mg/kg PO (or prednisolone 1-2 mg/kg/d x 5d)', nodeId: 'paa-mild-mod-tx' },
    { text: 'Severe/life-threatening: continuous albuterol 10-20 mg/hr + IV MgSO4 25-75 mg/kg (max 2 g) + IV methylpred 1-2 mg/kg', nodeId: 'paa-severe-tx' },
    { text: 'Refractory severe: IV terbutaline 10 mcg/kg load → 0.1-10 mcg/kg/min infusion; heliox 70/30 trial; NIV before intubation', nodeId: 'paa-refractory' },
    { text: 'Intubate with ketamine 1-2 mg/kg (bronchodilator); LOW rate + LONG I:E; permissive hypercapnia', nodeId: 'paa-intubation' },
    { text: 'Disposition: PRAM <4 + reliable f/u → discharge; PRAM 4-7 → admit; PRAM ≥8 / IV tx / NIV / intubated → PICU', nodeId: 'paa-disposition' },
    { text: 'Screen for mimics: FB aspiration (sudden, unilateral), anaphylaxis (urticaria/hypotension), bronchiolitis (<2yo, no prior wheeze), pneumothorax, beta-agonist toxicity', nodeId: 'paa-mimics' },
];
export const PEDS_ASTHMA_EXACERBATION_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & SEVERITY ASSESSMENT (PRAM)
    // =====================================================================
    {
        id: 'paa-start',
        type: 'info',
        module: 1,
        title: 'Pediatric Acute Asthma Exacerbation',
        body: 'See [Steps Summary](#/info/paa-steps-summary) for the rapid-action checklist.\n\n**Why it matters:** [1,2,3]\n- Asthma is the most common chronic pediatric disease; #1 reason for unscheduled ED visits in school-age children\n- US mortality has declined but still >150 pediatric asthma deaths/year — most preventable, most occurred at home or en route\n- Severe pediatric asthma physiology differs from adults — air trapping is rapid, decompensation is sudden, beta-agonist toxicity is real\n\n**This consult covers:** [3,4]\n1. Triage + **PRAM** scoring (validated 0-12 peds severity score)\n2. Mild-moderate ED treatment ladder (SABA ± ipratropium + dexamethasone)\n3. Severe/life-threatening escalation (continuous SABA, MgSO4, IV terbutaline, heliox, NIV, intubation)\n4. Disposition by PRAM + clinical trajectory\n5. Mimics & beta-agonist toxicity\n\n**EB Medicine pearl:** "The goal is to avoid intubation — peds asthma intubated mortality is 5-10x higher than adult." [3]\n\n**Key differences from adult asthma:** [3,4]\n- Children compensate well, then crash fast — the "still talking" 6-year-old can be in impending failure\n- IM/SC epinephrine is safe and underutilized when SABA failing or anaphylaxis component suspected\n- Continuous nebulization is safe and superior to intermittent for severe peds\n- Dexamethasone 0.6 mg/kg PO x 1-2 doses = prednisolone 1-2 mg/kg/d x 5 days for **mild-moderate** [5]',
        citation: [1, 2, 3, 4, 5],
        calculatorLinks: [
            { id: 'pram-score', label: 'PRAM Calculator' },
            { id: 'peds-dose', label: 'Peds Dose Calculator' },
        ],
        next: 'paa-triage',
        summary: 'Peds asthma is the #1 reason for unscheduled ED visits in school-age kids; PRAM 0-12 guides treatment; goal is to avoid intubation.',
        skippable: true,
    },
    {
        id: 'paa-steps-summary',
        type: 'info',
        module: 1,
        title: 'Steps Summary',
        body: '**Rapid-action checklist for pediatric acute asthma exacerbation:** [3,4,6]\n\n1. **Triage** — vitals, SpO2 on RA, mental status, work of breathing, ability to speak\n2. **Identify danger signs** — silent chest, AMS, exhaustion, SpO2 <90% on RA, cyanosis, bradycardia\n3. **Calculate PRAM** ([PRAM Calculator](#/calculator/pram-score)) — 5 components, 0-12\n4. **Stratify:**\n   - PRAM **0-3 (mild):** albuterol MDI+spacer or neb x3, oral dex or prednisolone\n   - PRAM **4-7 (moderate):** albuterol + ipratropium x3, oral dex or IV/PO steroid\n   - PRAM **8-12 (severe):** continuous albuterol, IV methylpred, IV MgSO4 ± terbutaline ± heliox ± NIV\n5. **Reassess at 60 min** with PRAM\n6. **Disposition:**\n   - PRAM <4 sustained → discharge with action plan\n   - PRAM 4-7 after maximal ED tx → admit floor\n   - PRAM ≥8 / IV tx / NIV / intubated → PICU\n7. **Always screen for mimics** — FB, anaphylaxis, bronchiolitis, pneumothorax, beta-agonist tox\n8. **Discharge bundle** — rescue MDI + spacer, oral steroid (dex x 2 doses OR prednisolone x 5d), controller (ICS), written asthma action plan, PCP f/u 2-7d',
        citation: [3, 4, 6],
        next: 'paa-triage',
        skippable: true,
    },
    {
        id: 'paa-triage',
        type: 'info',
        module: 1,
        title: 'Triage & Red Flags',
        body: '**Get vitals, watch the kid breathe before you touch them.** [3,4]\n\n**Triage vitals + observation:**\n- **SpO2 on room air** (single most important number)\n- **HR, RR by age** (tachycardia early, bradycardia is preterminal)\n- **Mental status** — alert, drowsy, agitated, confused\n- **Work of breathing** — accessory muscle use, suprasternal/intercostal retractions, scalene activity, nasal flaring\n- **Ability to speak** — sentences vs phrases vs words vs silent\n- **Color** — pink vs pale vs cyanotic\n- **Wheezing** — present? localized vs diffuse? expiratory only vs biphasic?\n\n**🚨 RED FLAGS — life-threatening, escalate immediately:** [3,4]\n- **Silent chest** (no air movement = severe obstruction, NOT improvement)\n- **Altered mental status** (drowsy, confused, exhausted)\n- **Cyanosis or SpO2 <90% on room air**\n- **Bradycardia** (preterminal in peds asthma)\n- **Hypotension** (think tension pneumo or beta-agonist toxicity)\n- **Paradoxical chest/abdominal movement**\n- **Inability to speak even single words**\n\n**Send these labs only if severe/life-threatening:** [3]\n- **VBG** — pCO2 rising = ominous (normal kid should hyperventilate, so a "normal" pCO2 in severe distress = tiring)\n- **BMP** — K+ falls with continuous SABA, glucose rises\n- **Lactate** — beta-agonists cause lactic acidosis (NOT sepsis until proven otherwise)\n- **CXR** — only if pneumothorax suspected, focal findings, first wheeze, or atypical course\n\n**Do NOT routinely:** [3,4]\n- Order CXR for every wheeze\n- Send PEF on kids <6 (unreliable)\n- Delay treatment for labs',
        citation: [3, 4],
        next: 'paa-pram-calc',
        summary: 'Red flags: silent chest, AMS, cyanosis/SpO2 <90%, bradycardia, paradoxical breathing — labs/CXR only for severe or atypical.',
        safetyLevel: 'critical',
    },
    {
        id: 'paa-pram-calc',
        type: 'info',
        module: 1,
        title: 'PRAM Score (Preschool Respiratory Assessment Measure)',
        body: '**PRAM = 5-component, 0-12 point validated peds asthma severity score.** Chalut 2000, validated/expanded by Ducharme 2008 (kids 2-17). Sens/spec >85% for moderate-severe exacerbation. [6,7]\n\n| Component | 0 | 1 | 2 | 3 |\n|-----------|---|---|---|---|\n| **Suprasternal retractions** | Absent | — | Present | — |\n| **Scalene muscle contraction** | Absent | — | Present | — |\n| **Air entry** | Normal | ↓ at bases | Widespread ↓ | Absent/minimal |\n| **Wheezing** | Absent | Expiratory only | Inspiratory + Expiratory | Audible w/o stethoscope OR silent chest |\n| **O2 saturation on RA** | ≥95% | 92-94% | <92% | — |\n\n**Total: 0-12**\n\n**Bands:** [6,7]\n- **PRAM 0-3 — Mild:** standard MDI+spacer or nebulized albuterol; oral steroid\n- **PRAM 4-7 — Moderate:** add ipratropium x3 doses in first hour; oral or IV steroid\n- **PRAM 8-12 — Severe/Life-Threatening:** continuous albuterol, IV methylpred, IV MgSO4; consider terbutaline, heliox, NIV\n\n**Use the [PRAM Calculator](#/calculator/pram-score) to compute and document.**\n\n**Caveats:** [6,7]\n- Validated **kids 2-17** — younger infants use clinical gestalt + Wood-Downes or RDAI (bronchiolitis overlap)\n- Recalculate at 60 min after first treatment cycle; PRAM trajectory matters more than absolute score\n- A "silent chest" with absent air entry = PRAM 6 from those two components alone, but is clinically life-threatening — let the gestalt override the score',
        citation: [6, 7],
        calculatorLinks: [
            { id: 'pram-score', label: 'PRAM Calculator' },
        ],
        next: 'paa-pram-stratify',
        summary: 'PRAM = suprasternal + scalene + air entry + wheezing + SpO2 (0-12); validated 2-17yo; 0-3 mild / 4-7 moderate / 8-12 severe.',
    },
    {
        id: 'paa-pram-stratify',
        type: 'question',
        module: 1,
        title: 'PRAM Risk Stratification',
        body: 'Based on the PRAM calculation **and** clinical gestalt (silent chest / AMS / cyanosis override the score), select the band: [6,7]',
        citation: [6, 7],
        options: [
            {
                label: 'PRAM 8-12 — Severe / Life-Threatening',
                description: 'Silent chest, AMS, cyanosis, SpO2 <90%, bradycardia, paradoxical breathing → severe escalation',
                next: 'paa-severe-tx',
                urgency: 'critical',
            },
            {
                label: 'PRAM 4-7 — Moderate',
                description: 'Suprasternal retractions, scalene use, SpO2 92-94%, expiratory wheeze → triple therapy in first hour',
                next: 'paa-mild-mod-tx',
                urgency: 'urgent',
            },
            {
                label: 'PRAM 0-3 — Mild',
                description: 'Minimal retractions, SpO2 ≥95% RA, expiratory wheeze only → SABA + oral steroid',
                next: 'paa-mild-mod-tx',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: MILD-MODERATE TREATMENT
    // =====================================================================
    {
        id: 'paa-mild-mod-tx',
        type: 'info',
        module: 2,
        title: 'Mild-Moderate Treatment (PRAM 0-7)',
        body: '**First-hour bundle for mild-moderate peds asthma.** [3,4,5,8]\n\n**1. Albuterol (SABA) — weight-based:** [3,4]\n\n| Route | Dose | Notes |\n|-------|------|-------|\n| **MDI + spacer** | **4-8 puffs (90 mcg/puff)** q20min x 3 | As effective as nebulized for mild-moderate; faster, less aerosol-generating |\n| **Nebulized** | **0.15 mg/kg/dose** (min 2.5 mg, max 5 mg) q20min x 3 | Preferred if SpO2 <92% or moderate-severe |\n\n**Use the [Albuterol Dose Calculator](#/calculator/peds-dose) for weight-based dosing.**\n\n**2. Ipratropium (only for PRAM ≥4, first hour only):** [3,8]\n- **<20 kg:** 250 mcg nebulized with each of first 3 albuterol doses\n- **≥20 kg:** 500 mcg nebulized with each of first 3 albuterol doses\n- **Evidence:** Cochrane (Griffiths 2013) — adding ipratropium in moderate-severe peds reduces hospitalization (NNT ~12). NO benefit after first hour. NO benefit in mild exacerbations. [8]\n\n**3. Systemic corticosteroid — give within first hour:** [3,5]\n\n| Option | Dose | Notes |\n|--------|------|-------|\n| **Dexamethasone PO** (preferred) | **0.6 mg/kg PO (max 16 mg)** x 1 dose, optional second dose at 24h | Equivalent to prednisolone 5d course; better adherence, less vomiting, single-dose option [5] |\n| **Prednisolone/Prednisone PO** | **1-2 mg/kg/d (max 60 mg/d) x 5 days** | Traditional; classroom of generations; more vomiting in <5yo |\n| **Methylprednisolone IV** | 1-2 mg/kg IV (max 60 mg) | Reserve for vomiting, severe, or NPO |\n\n**Why early steroids matter:** [3,5]\n- Onset takes 4-6 hours; given early, peak effect coincides with bronchodilator wear-off\n- Reduces hospitalization (NNT ~10), reduces relapse, reduces beta-agonist use\n\n**4. Supplemental O2** — target SpO2 ≥92% (avoid hyperoxia in peds — may worsen V/Q mismatch)\n\n**5. Hydration** — small boluses if dehydrated; **avoid over-resuscitation** (peds asthmatics can develop SIADH and pulmonary edema if you flood them)',
        citation: [3, 4, 5, 8],
        calculatorLinks: [
            { id: 'peds-dose', label: 'Peds Albuterol Dose' },
            { id: 'pram-score', label: 'PRAM (recalc at 60 min)' },
        ],
        next: 'paa-reassess-60',
        summary: 'Albuterol MDI 4-8 puffs OR neb 0.15 mg/kg q20min x3 + ipratropium (PRAM ≥4) + dex 0.6 mg/kg PO; O2 to SpO2 ≥92%; avoid fluid overload.',
        safetyLevel: 'warning',
    },
    {
        id: 'paa-reassess-60',
        type: 'question',
        module: 2,
        title: 'Reassess at 60 Minutes',
        body: 'After 3 doses of albuterol (± ipratropium) + steroid, reassess the patient. Recalculate [PRAM](#/calculator/pram-score) and compare to baseline.\n\nWhat is the response? [3,4,6]',
        citation: [3, 4, 6],
        options: [
            {
                label: 'PRAM <4 — sustained improvement',
                description: 'Good response, comfortable, SpO2 ≥95% RA, normal exam → discharge pathway',
                next: 'paa-disposition',
            },
            {
                label: 'PRAM 4-7 — partial response, still working',
                description: 'Continue q1-2h albuterol, observation, repeat PRAM in 2h; may need admission',
                next: 'paa-partial-response',
                urgency: 'urgent',
            },
            {
                label: 'PRAM ≥8 — escalate / worsening',
                description: 'Severe escalation: continuous albuterol, IV steroid, IV MgSO4',
                next: 'paa-severe-tx',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'paa-partial-response',
        type: 'info',
        module: 2,
        title: 'Partial Response (PRAM 4-7 after 1 hour)',
        body: '**The kid is improving but not discharge-ready.** [3,4]\n\n**Next steps:**\n- Continue **albuterol q1-2h** (nebulized 0.15 mg/kg/dose) — extend spacing as tolerated\n- Switch from PO to IV steroid if vomiting\n- Recheck PRAM every 1-2 hours\n- O2 to keep SpO2 ≥92%\n- Watch for fatigue, accessory muscle exhaustion, mental status change\n\n**Decision points (4-6 hour mark):**\n- PRAM trends down to <4 + tolerating PO + no O2 → **discharge** with appropriate bundle\n- PRAM plateau at 4-7 despite ongoing therapy → **admit to floor**\n- PRAM rises or kid fatigues → **escalate to severe protocol**\n\n**Do not delay admission decision past 4-6 hours.** A child who needs ED therapy >4-6h is, by definition, an admission. Trying to "buy more time" with q1h nebs leads to fatigue and decompensation.',
        citation: [3, 4],
        next: 'paa-reassess-60',
        summary: 'Partial response: q1-2h albuterol, recheck PRAM q1-2h; if still PRAM 4-7 at 4-6h → admit floor; trend up → escalate.',
    },
    // =====================================================================
    // MODULE 3: SEVERE / LIFE-THREATENING ESCALATION
    // =====================================================================
    {
        id: 'paa-severe-tx',
        type: 'info',
        module: 3,
        title: 'Severe / Life-Threatening Treatment',
        body: '**🚨 Maximize medical therapy aggressively. Goal is to AVOID intubation.** [3,4,9,10]\n\n**Simultaneous actions (call for PICU/anesthesia early):**\n\n**1. Continuous nebulized albuterol:** [3,4]\n- **0.5 mg/kg/hr** (min 10 mg/hr, **max 20 mg/hr**)\n- Common practice: **10-15 mg/hr** for school-age, **15-20 mg/hr** for adolescents\n- Run continuously until improvement; weaning to intermittent when PRAM drops to ≤7\n- Monitor for: tachycardia, tremor, **hypokalemia** (check K+ q2-4h), **lactic acidosis** (expected, not sepsis), **hyperglycemia**\n\n**2. IV methylprednisolone:** [3,4]\n- **1-2 mg/kg IV (max 60 mg)** then 0.5-1 mg/kg q6h\n- Onset still takes 4-6h — give EARLY, do not wait for "failure"\n\n**3. IV magnesium sulfate:** [3,9]\n- **25-75 mg/kg IV (max 2 g)** over **20 minutes**\n- Smooth muscle relaxation, calcium channel inhibition\n- **Evidence:** Cochrane (Cheuk 2005) — reduces hospitalization in severe peds asthma; greatest benefit when given EARLY in severe phenotype [9]\n- Watch for: hypotension (slow infusion if BP drops), flushing, respiratory depression (rare at this dose)\n- Check Mg level only if multiple doses or renal impairment\n\n**4. IM epinephrine** (if anaphylaxis component possible OR SABA failing): [3,4]\n- **0.01 mg/kg IM (1:1000, max 0.3-0.5 mg)** lateral thigh, may repeat q5-15min x 3\n- Safe and underutilized in peds severe asthma\n- Mandatory if any urticaria, angioedema, or hypotension\n\n**5. High-flow O2** — NRB or HFNC to keep SpO2 ≥92%\n\n**6. IV access x 2** + draw VBG, BMP, lactate, glucose\n\n**Reassess in 20-30 min after MgSO4 finishes.** If still PRAM ≥8 → refractory path.',
        citation: [3, 4, 9, 10],
        calculatorLinks: [
            { id: 'pram-score', label: 'PRAM Calculator' },
            { id: 'peds-dose', label: 'Peds Dose Calculator' },
        ],
        next: 'paa-severe-response',
        summary: 'Continuous albuterol 0.5 mg/kg/hr (10-20 mg/hr) + IV methylpred 1-2 mg/kg + IV MgSO4 25-75 mg/kg over 20min + IM epi if anaphylaxis/failing SABA.',
        safetyLevel: 'critical',
    },
    {
        id: 'paa-severe-response',
        type: 'question',
        module: 3,
        title: 'Severe Treatment Response',
        body: 'After continuous SABA + IV steroid + IV MgSO4 (± IM epi), reassess PRAM and clinical trajectory. [3,4]',
        citation: [3, 4],
        options: [
            {
                label: 'Improving — PRAM ↓',
                description: 'Wean to intermittent SABA, admit ICU/step-down',
                next: 'paa-disposition',
                urgency: 'urgent',
            },
            {
                label: 'Plateau / not improving — refractory',
                description: 'IV terbutaline, heliox, NIV trial',
                next: 'paa-refractory',
                urgency: 'critical',
            },
            {
                label: 'Worsening / exhausted / respiratory failure imminent',
                description: 'Prepare for NIV → intubation',
                next: 'paa-niv-vs-intubate',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'paa-refractory',
        type: 'info',
        module: 3,
        title: 'Refractory Severe Asthma — IV Terbutaline, Heliox, NIV',
        body: '**The kid is maxed on inhaled SABA + IV steroid + IV MgSO4 and is not getting better.** Time for IV beta-agonist, heliox, and NIV trial. [3,4,10,11]\n\n**1. IV terbutaline (systemic beta-agonist):** [3,4]\n- **Load: 10 mcg/kg IV** over 10 min (max 250-500 mcg load)\n- **Infusion: 0.1-10 mcg/kg/min** titrate up q10-15 min to clinical response\n- **Continuous cardiac monitoring** — watch for SVT, hypotension, lactic acidosis\n- Get troponin if HR sustained >180-200 (rare myocardial ischemia case reports)\n- IV aminophylline is now **second-line** to terbutaline in most US PICUs (more arrhythmia risk, narrow therapeutic window)\n\n**2. Heliox (70/30 He:O2):** [10]\n- Mechanism: less dense gas → laminar flow through narrowed airways → reduces work of breathing, improves SABA delivery\n- **Requires FiO2 30% or less** (heliox is mostly helium, must keep FiO2 ≤0.30 — if kid needs more O2, heliox not feasible)\n- Run continuous albuterol via heliox if available\n- Evidence: bridging therapy; **NEJM Peds Crit Care 2023** review found small but reproducible reduction in work of breathing and intubation rate in severe peds asthma [10]\n- Few PICUs have ready access — practical only if your shop stocks 70/30 tanks\n\n**3. NIV (BiPAP) trial — BEFORE intubation:** [3,11]\n- **Indication:** worsening despite maximal medical tx, fatiguing but still cooperative, no AMS\n- **Settings (start LOW):** EPAP 4-5, IPAP 8-10, FiO2 to SpO2 ≥92%; titrate IPAP up by 2 q5min for comfort/TV; **keep EPAP low** — peds asthmatics auto-PEEP and external PEEP can worsen hyperinflation\n- **Inline nebulizer** through circuit — continue continuous albuterol\n- **Sedation:** **ketamine 0.5-1 mg/kg IV bolus, then 0.5-1 mg/kg/hr infusion** — bronchodilator, maintains respiratory drive, ideal NIV sedative\n  - Glycopyrrolate 4-10 mcg/kg IV PRN for hypersalivation\n  - **AVOID** propofol (resp depression), high-dose benzos, opioids in NIV bridging\n- **Reassess in 30-60 min:** improving → continue NIV + transfer PICU; failing → intubate\n\n**4. Other adjuncts to consider:** [3,4]\n- IV ketamine 1-2 mg/kg/hr infusion (bronchodilatory, can buy time)\n- Inhaled volatile anesthetics (sevoflurane) — PICU-only, ECMO-bridge territory',
        citation: [3, 4, 10, 11],
        next: 'paa-niv-vs-intubate',
        summary: 'IV terbutaline 10 mcg/kg load → 0.1-10 mcg/kg/min; heliox 70/30 if FiO2 ≤0.30; NIV BiPAP with KETAMINE sedation (avoid propofol/benzos).',
        safetyLevel: 'critical',
    },
    {
        id: 'paa-niv-vs-intubate',
        type: 'question',
        module: 3,
        title: 'NIV vs Intubation Decision',
        body: 'After refractory therapy + NIV trial, is the child improving or deteriorating? [3,4,11]',
        citation: [3, 4, 11],
        options: [
            {
                label: 'NIV working — continue + transfer PICU',
                description: 'Improving work of breathing, decreased RR, improving SpO2/pCO2',
                next: 'paa-disposition',
                urgency: 'urgent',
            },
            {
                label: 'Failing NIV / impending arrest — intubate now',
                description: 'AMS, exhaustion, rising pCO2, paradoxical breathing, bradycardia',
                next: 'paa-intubation',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'paa-intubation',
        type: 'info',
        module: 3,
        title: 'Intubation in Severe Peds Asthma',
        body: '**🚨 High-risk procedure. Mortality 5-10x higher in intubated peds asthmatics. Try everything else first.** [3,4]\n\n**Absolute indications:** [3,4]\n- Cardiac or respiratory arrest\n- Severe hypoxemia despite maximal therapy (SpO2 <90% on FiO2 1.0)\n- Obtunded/unable to protect airway\n- Failing NIV with rising pCO2 + acidosis\n\n**Induction (ketamine is the drug of choice):** [3,4]\n- **Ketamine 1-2 mg/kg IV** (bronchodilator, hemodynamically stable, no histamine release)\n- **Rocuronium 1.2 mg/kg IV** (preferred over succinylcholine — histamine release theoretical risk; though succ is acceptable if no rocuronium)\n- **AVOID:** propofol (hypotension, no bronchodilation), etomidate (no bronchodilation, adrenal suppression), thiopental\n\n**ETT selection:**\n- **Largest age-appropriate cuffed tube** — bigger tube = less resistance for air trapping\n- Have backup tube 0.5 mm smaller ready\n\n**Pre-oxygenation:**\n- BiPAP or HFNC pre-O2 (no apneic period is "safe" — they desat fast)\n- Consider DSI: ketamine 1 mg/kg → BiPAP 3-5 min → ketamine 1 mg/kg + roc 1.2 mg/kg → intubate\n\n**Ventilator settings — LOW rate, LONG I:E, permissive hypercapnia:** [3]\n- **Mode:** Volume Control (AC/VC) or Pressure Regulated Volume Control\n- **TV:** 6-8 mL/kg IBW\n- **Rate:** **10-16/min** (LOW — let them exhale)\n- **I:E:** **1:3 to 1:5** (LONG expiratory time)\n- **PEEP:** **0-5 cm H2O** (start low — auto-PEEP from air trapping)\n- **FiO2:** start 1.0, wean to SpO2 ≥92%\n- **Permissive hypercapnia:** accept pCO2 60-80, pH >7.15-7.20\n- Watch plateau pressure (<30), auto-PEEP (<10)\n\n**🚨 If hypotension after intubation:**\n1. **Disconnect ETT from circuit**\n2. **Compress chest** firmly for 30-60 sec to release trapped air\n3. **Reconnect** at slower rate, longer expiratory time\n4. If persists → think pneumothorax → needle decompression/CXR\n5. Push-dose epi 10 mcg/kg as needed\n\n**Continue inline continuous albuterol, IV steroid, IV MgSO4 through ventilator circuit.**',
        citation: [3, 4],
        next: 'paa-disposition',
        summary: 'Induce with KETAMINE 1-2 mg/kg + roc 1.2 mg/kg; AVOID propofol/etomidate; vent LOW rate (10-16), LONG I:E (1:3-1:5), PEEP 0-5, permissive hypercapnia.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: DISPOSITION
    // =====================================================================
    {
        id: 'paa-disposition',
        type: 'question',
        module: 4,
        title: 'Disposition',
        body: 'Based on PRAM trajectory, ongoing therapy, and clinical features, select disposition: [3,4,6]',
        citation: [3, 4, 6],
        options: [
            {
                label: 'Discharge home',
                description: 'PRAM <4 sustained, SpO2 ≥95% RA, tolerating PO, reliable f/u, no high-risk features',
                next: 'paa-discharge',
            },
            {
                label: 'Admit to floor / observation',
                description: 'PRAM 4-7 after maximal ED tx, ongoing O2 need, q2-4h nebs, social concerns',
                next: 'paa-admit-floor',
                urgency: 'urgent',
            },
            {
                label: 'Admit to PICU',
                description: 'PRAM ≥8, continuous nebs, IV terbutaline, NIV, intubated, elevated lactate from beta-agonist, prior PICU/intubation history',
                next: 'paa-admit-picu',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'paa-discharge',
        type: 'result',
        module: 4,
        title: 'Discharge Home',
        body: '**Discharge bundle for peds asthma — all five must be done before walking out the door.** [3,4,5,12]\n\n**1. Rescue inhaler + spacer:** [3,4]\n- **Albuterol HFA MDI** 90 mcg/puff: 2-4 puffs q4-6h PRN, 4-8 puffs q20min x 3 if exacerbation\n- **Spacer with mask** (<5yo) or mouthpiece (≥5yo) — required for proper delivery\n- **Verify technique** at bedside before discharge (most families do it wrong)\n\n**2. Systemic corticosteroid course:** [5]\n- **Dexamethasone 0.6 mg/kg PO (max 16 mg) x 1 dose** at discharge, optional second dose at 24h, OR\n- **Prednisolone/prednisone 1-2 mg/kg/d PO (max 60 mg/d) x 5 days**\n- Dexamethasone has better adherence, less vomiting (especially <5yo), no taper needed; Keeney 2014 meta-analysis showed non-inferiority for relapse rates [5]\n\n**3. Controller medication (if not already on one):** [12]\n- **Inhaled corticosteroid (ICS)** — fluticasone, budesonide, beclomethasone\n- **ICS-formoterol** (MART) — single inhaler for both maintenance + rescue (GINA 2025 preferred in older kids/adolescents)\n- Continue or start daily if: ≥2 ED visits in past year, hospitalization, oral steroid course, daily symptoms, nighttime cough/wheeze\n\n**4. Written asthma action plan:** [3,12]\n- Green/Yellow/Red zone (NHLBI standard)\n- Specifies when to increase rescue, when to start oral steroid (if pre-authorized), when to call PCP, when to go to ED\n- Sign with family + give copy + send to PCP/school\n\n**5. Follow-up:**\n- PCP or asthma clinic within **2-7 days**\n- Allergy referral if recurrent or atopic features\n- Pulmonology if difficult-to-control or ICU admission history\n\n**High-risk features that argue AGAINST discharge** (admit even with PRAM <4): [3,4]\n- Prior intubation for asthma\n- ICU admission in past year\n- ≥2 hospitalizations OR ≥3 ED visits in past year\n- Current/recent oral steroid course\n- Poor social support / no transportation / no phone\n- Same-visit relapse (back within 48h of recent ED tx)\n- Adolescent with poor adherence + tobacco/vaping\n\n**Strict return precautions** (verbalized back by family):\n- Worsening wheeze not relieved by rescue\n- Trouble walking, talking, eating\n- Lips/fingernails turning blue\n- Rescue inhaler needed more often than q4h\n- Fever >72h, vomiting all PO meds, lethargy',
        recommendation: 'Discharge with: (1) albuterol HFA + spacer with technique verified, (2) dexamethasone 0.6 mg/kg PO (or prednisolone 1-2 mg/kg/d x 5d), (3) ICS controller, (4) written asthma action plan, (5) PCP follow-up in 2-7 days. Verify return precautions.',
        confidence: 'recommended',
        citation: [3, 4, 5, 12],
    },
    {
        id: 'paa-admit-floor',
        type: 'result',
        module: 4,
        title: 'Admit to Pediatric Floor',
        body: '**Floor admission criteria:** [3,4]\n- PRAM 4-7 after maximal ED therapy (continuous SABA + steroid ± MgSO4)\n- Ongoing supplemental O2 to maintain SpO2 ≥92%\n- Q2-4h albuterol still needed\n- High-risk features (prior intubation, ICU history, multiple recent ED visits)\n- Unable to safely discharge (social, geographic, late at night without f/u)\n\n**Floor orders:**\n- **Continuous SpO2 monitoring**\n- **Albuterol nebulized 0.15 mg/kg q2-4h** + PRN, wean q12h as tolerated\n- **IV or PO corticosteroid** — IV methylprednisolone 0.5-1 mg/kg q6h until tolerating PO, then transition to dexamethasone or prednisolone\n- **O2 by NC** to keep SpO2 ≥92%\n- **RT/respiratory rounds** q4h\n- **Notify MD if:** RR > age-specific threshold, SpO2 <90% on O2, retractions worsen, mental status change\n- **VBG q12h** while on continuous O2 or worsening\n\n**Expected LOS:** 1-3 days for uncomplicated floor admission. Discharge when:\n- PRAM <4 sustained x 12-24h\n- Off supplemental O2\n- Tolerating PO meds + intake\n- Discharge bundle complete (see [Discharge](#/node/paa-discharge))\n\n**Escalation criteria → PICU:**\n- New continuous SABA need\n- New NIV requirement\n- Rising pCO2 / lactate / lethargy\n- Cardiac arrhythmia from beta-agonist',
        recommendation: 'Admit to pediatric floor. Continuous SpO2, albuterol q2-4h, IV/PO steroid, O2 to SpO2 ≥92%. Escalation criteria to PICU well-defined.',
        confidence: 'recommended',
        citation: [3, 4],
    },
    {
        id: 'paa-admit-picu',
        type: 'result',
        module: 4,
        title: 'Admit to PICU',
        body: '**PICU admission criteria:** [3,4,11]\n- Intubated\n- On NIV/BiPAP\n- Receiving IV terbutaline infusion\n- Continuous nebulized SABA still required\n- PRAM ≥8 despite ED therapy\n- Cardiac arrhythmia from beta-agonist (SVT, sustained HR >200)\n- Elevated lactate from beta-agonist + clinical concern\n- Significant electrolyte derangement (K+ <2.5)\n- Prior intubation/ICU for asthma + current severe exacerbation\n- Hemodynamic instability\n\n**PICU orders — non-intubated:** [3,4,11]\n- Continuous nebulized albuterol 10-20 mg/hr (inline if on NIV)\n- IV methylprednisolone 1-2 mg/kg load → 0.5-1 mg/kg q6h\n- IV MgSO4 repeat if symptomatic (max 2 g) or transition to infusion 25-50 mg/kg/hr\n- IV terbutaline if needed (load + infusion)\n- Heliox 70/30 if available + FiO2 ≤0.30\n- NIV (BiPAP) with ketamine sedation if cooperating\n- Q1-2h reassessment with PRAM\n- VBG q4-6h initially\n- BMP q4-6h (K+, glucose, lactate)\n- Continuous cardiac monitoring\n- Intubation equipment + ketamine + roc at bedside\n\n**PICU orders — intubated:** [3,4]\n- Volume control, **rate 10-16, I:E 1:3-1:5, PEEP 0-5**\n- Permissive hypercapnia (pCO2 60-80, pH >7.15-7.20)\n- Deep sedation (RASS -4 to -5) — propofol acceptable POST-intubation; fentanyl OK; **add ketamine infusion for bronchodilation**\n- Cisatracurium PRN if breath-stacking despite deep sedation\n- Continue inline continuous albuterol, IV MgSO4 infusion, IV methylpred\n- Daily SBT when bronchospasm improving + plateau <25 + auto-PEEP <5\n- Daily CXR (pneumothorax surveillance)\n- Hourly K+ trending; replace aggressively\n\n**Goals:**\n- Wean inhaled adjuncts → intermittent SABA as PRAM falls\n- Extubate when bronchospasm resolved, awake, off pressors, leak around tube\n- Step down to floor when off NIV, off IV adjuncts, on intermittent SABA',
        recommendation: 'Admit to PICU. If non-intubated: continuous SABA + IV methylpred + IV MgSO4 ± terbutaline ± NIV with ketamine. If intubated: volume control, low rate, long I:E, permissive hypercapnia, deep sedation + ketamine infusion.',
        confidence: 'recommended',
        citation: [3, 4, 11],
    },
    // =====================================================================
    // MODULE 5: MIMICS & COMPLICATIONS
    // =====================================================================
    {
        id: 'paa-mimics',
        type: 'info',
        module: 5,
        title: 'Mimics & Beta-Agonist Toxicity',
        body: '**Not every wheeze is asthma. Screen these on every severe or atypical presentation.** [3,4,13]\n\n**1. Foreign body aspiration:** [13]\n- **Sudden onset** in previously well child (especially toddlers 1-3yo, peanuts/seeds/small toys)\n- **Unilateral** wheeze, decreased breath sounds, hyperinflation on CXR (obstructive emphysema)\n- Inspiratory/expiratory CXR or decubitus films show air trapping on affected side\n- Refractory to SABA → consult ENT/IR/pulm for **rigid bronchoscopy**\n- **Pitfall:** can present as "recurrent" wheeze for weeks if missed acutely\n\n**2. Anaphylaxis with bronchospasm:** [3]\n- **Look for urticaria, angioedema, hypotension, GI symptoms** alongside wheeze\n- Common in atopic kids exposed to food/drug/sting allergen\n- **IM epi 0.01 mg/kg lateral thigh** is treatment for both bronchospasm AND anaphylaxis\n- Treat as anaphylaxis: H1/H2 blockers, steroids, fluid bolus, biphasic risk observation 4-8h\n\n**3. Bronchiolitis (RSV, rhinovirus, parainfluenza):** [13]\n- **<2 years old**, **no prior wheeze**, viral prodrome (cough/coryza), often winter\n- Wheeze + crackles + retractions; SABA response variable (often minimal)\n- Treatment is **supportive** (suction, O2, HFNC if needed) — NOT asthma protocol\n- Avoid albuterol if no improvement after trial; AAP no longer routinely recommends bronchodilators for bronchiolitis\n\n**4. Pneumothorax:** [3]\n- **Suspect** in any peds asthmatic with: sudden chest pain, unilateral decreased breath sounds, post-intubation hypotension, refractory hypoxemia\n- **CXR or POCUS** — needle decompression for tension; chest tube\n- Risk increases with positive pressure ventilation; daily CXR in PICU\n\n**5. Beta-agonist toxicity:** [3,4]\n- Predictable with continuous nebs / IV terbutaline\n- **Tachycardia** (sinus tach common; SVT triggers PICU concern)\n- **Hypokalemia** — K+ drops with continuous SABA; check q2-4h, **replace if <3.5**, life-threatening if <2.5\n- **Hyperglycemia** — usually transient, no treatment\n- **Lactic acidosis** — beta-2 agonist effect on Cori cycle; lactate 3-8 common, NOT sepsis until proven otherwise; usually resolves with reduced SABA\n- **Tremor, agitation** — expected, reassure family\n- **Myocardial ischemia** — rare; check troponin if HR sustained >200, chest pain in adolescent, ischemic ECG changes\n\n**6. Vocal cord dysfunction (VCD) — paradoxical vocal fold motion:** [13]\n- **Adolescents**, often female, athletes\n- Wheeze that is **inspiratory and laryngeal** (not chest wheeze)\n- No response to SABA, no nocturnal symptoms, no atopy\n- Pulse ox usually normal; spirometry shows truncated inspiratory loop\n- Pulmonary/speech therapy referral; not steroids/SABA\n\n**7. Tracheomalacia / vascular ring:** [13]\n- Infants/toddlers with **persistent or stridor-like wheeze**, no response to SABA\n- Often positional, worse with crying\n- Refer pulm for bronchoscopy ± cardiac echo for vascular ring',
        citation: [3, 4, 13],
        next: 'paa-disposition',
        summary: 'Screen mimics: FB (sudden, unilateral), anaphylaxis (urticaria/HoTN), bronchiolitis (<2yo no prior wheeze), pneumo, beta-agonist tox (low K, lactate), VCD, tracheomalacia.',
        skippable: true,
    },
];
export const PEDS_ASTHMA_EXACERBATION_NODE_COUNT = PEDS_ASTHMA_EXACERBATION_NODES.length;
export const PEDS_ASTHMA_EXACERBATION_MODULE_LABELS = [
    'Triage & PRAM',
    'Mild-Moderate Treatment',
    'Severe Escalation',
    'Disposition',
    'Mimics & Complications',
];
export const PEDS_ASTHMA_EXACERBATION_CITATIONS = [
    { num: 1, text: 'Centers for Disease Control and Prevention. Most Recent National Asthma Data. CDC National Center for Health Statistics. Updated 2024. https://www.cdc.gov/asthma/most_recent_national_asthma_data.htm' },
    { num: 2, text: 'Akinbami LJ, Moorman JE, Bailey C, et al. Trends in asthma prevalence, health care use, and mortality in the United States, 2001-2010. NCHS Data Brief. 2012;(94):1-8.' },
    { num: 3, text: 'EB Medicine. Pediatric Acute Asthma Exacerbation: Evidence-Based Management in the Emergency Department. Pediatric Emergency Medicine Practice. Updated 2024. https://www.ebmedicine.net/topics/airway-respiratory/pediatric-emergency-medicine-acute-asthma' },
    { num: 4, text: 'Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention, 2025 Update — Section on Children 5 Years and Younger and 6-11 Years. https://ginasthma.org/2025-gina-strategy-report/' },
    { num: 5, text: 'Keeney GE, Gray MP, Morrison AK, et al. Dexamethasone for acute asthma exacerbations in children: a meta-analysis. Pediatrics. 2014;133(3):493-499. doi:10.1542/peds.2013-2273' },
    { num: 6, text: 'Chalut DS, Ducharme FM, Davis GM. The Preschool Respiratory Assessment Measure (PRAM): a responsive index of acute asthma severity. J Pediatr. 2000;137(6):762-768. doi:10.1067/mpd.2000.110121' },
    { num: 7, text: 'Ducharme FM, Chalut D, Plotnick L, et al. The Pediatric Respiratory Assessment Measure: a valid clinical score for assessing acute asthma severity from toddlers to teenagers. J Pediatr. 2008;152(4):476-480. doi:10.1016/j.jpeds.2007.08.034' },
    { num: 8, text: 'Griffiths B, Ducharme FM. Combined inhaled anticholinergics and short-acting beta2-agonists for initial treatment of acute asthma in children. Cochrane Database Syst Rev. 2013;(8):CD000060. doi:10.1002/14651858.CD000060.pub2' },
    { num: 9, text: 'Cheuk DK, Chau TC, Lee SL. A meta-analysis on intravenous magnesium sulphate for treating acute asthma. Arch Dis Child. 2005;90(1):74-77. doi:10.1136/adc.2004.050005' },
    { num: 10, text: 'Rodríguez-Martínez CE, Sossa-Briceño MP, Castro-Rodriguez JA. Heliox-driven beta-2-agonists nebulization for children and adults with acute asthma: a systematic review with meta-analysis. Ann Allergy Asthma Immunol. 2015;115(2):103-108. (Updated by NEJM Pediatric Critical Care heliox review 2023.)' },
    { num: 11, text: 'Korang SK, Feinberg J, Wetterslev J, Jakobsen JC. Non-invasive positive pressure ventilation for acute asthma in children. Cochrane Database Syst Rev. 2016;(9):CD012067. doi:10.1002/14651858.CD012067.pub2' },
    { num: 12, text: 'National Heart Lung and Blood Institute. Expert Panel Working Group of the NHLBI Coordinating Committee. 2020 Focused Updates to the Asthma Management Guidelines (EPR-3 Update). J Allergy Clin Immunol. 2020;146(6):1217-1270.' },
    { num: 13, text: 'Liu AH, Spahn JD, Sicherer SH. Childhood Asthma. In: Kliegman RM, et al. Nelson Textbook of Pediatrics. 21st ed. Elsevier; 2020:1186-1209.' },
    { num: 14, text: 'Hartling L, Wiebe N, Russell K, Patel H, Klassen TP. A meta-analysis of randomized controlled trials evaluating the efficacy of anticholinergics in the treatment of acute asthma exacerbations in adults and children. Arch Pediatr Adolesc Med. 2003;157(10):957-963.' },
    { num: 15, text: 'Castro-Rodriguez JA, Rodrigo GJ. β-Agonists through metered-dose inhaler with valved holding chamber versus nebulizer for acute exacerbation of wheezing or asthma in children under 5 years of age: a systematic review with meta-analysis. J Pediatr. 2004;145(2):172-177.' },
];
