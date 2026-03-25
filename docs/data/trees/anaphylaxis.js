// MedKitt — Anaphylaxis (Recognition → Epinephrine → Resuscitation → Refractory/Special → Adjunctive → Disposition)
// Recognition & Diagnosis → Epinephrine → Resuscitation → Refractory & Special Populations → Adjunctive Therapies → Disposition & Discharge
// 6 modules: Recognition & Diagnosis → Epinephrine → Resuscitation → Refractory & Special Populations → Adjunctive Therapies → Disposition & Discharge
// 27 nodes total.
export const ANAPHYLAXIS_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & DIAGNOSIS
    // =====================================================================
    {
        id: 'anaph-start',
        type: 'info',
        module: 1,
        title: 'Anaphylaxis Management',
        body: '[Anaphylaxis Steps Summary](#/info/anaph-summary)\n\n**[Epinephrine](#/drug/epinephrine/anaphylaxis) is the ONLY first-line treatment for anaphylaxis.** There are NO absolute contraindications to epinephrine in anaphylaxis — the risk of NOT giving it always exceeds the risk of giving it.\n\n**Causes of anaphylaxis:**\n• Medications — 34%\n• Food — 31%\n• Insect stings — 20%\n• Environmental — 7.5%\n• Exercise — 1.2%\n• Idiopathic — 11% [1][3]',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'anaphylaxis-criteria', label: 'Anaphylaxis Criteria' },
            { id: 'epi-infusion', label: 'Epi Infusion Calculator' },
        ],
        next: 'anaph-diagnosis',
    },
    {
        id: 'anaph-diagnosis',
        type: 'question',
        module: 1,
        title: 'Does This Meet Anaphylaxis Criteria?',
        body: '**WAO 2020 Diagnostic Criteria — either criterion:**\n\n**Criterion 1:** Skin/mucosal involvement (urticaria, flushing, angioedema) PLUS at least one of:\n• Respiratory compromise (dyspnea, wheeze, stridor, hypoxemia)\n• Hypotension or end-organ dysfunction (syncope, incontinence, collapse)\n• Severe GI symptoms (crampy abdominal pain, repetitive vomiting)\n\n**Criterion 2:** After exposure to a **known or likely allergen**, TWO or more of:\n• Skin/mucosal involvement\n• Respiratory compromise\n• Hypotension/end-organ dysfunction\n• Persistent GI symptoms\n\n[Differential Diagnosis](#/info/anaph-ddx)\n\n**Onset timing:** IV medications <30 min, insect stings ~15 min, food minutes to hours. [1][3]',
        citation: [1, 3],
        options: [
            {
                label: 'Yes — Anaphylaxis criteria met',
                next: 'anaph-source-control',
                urgency: 'critical',
            },
            {
                label: 'Isolated urticaria / mild allergic reaction',
                next: 'anaph-mild',
            },
            {
                label: 'Uncertain — monitor and reassess',
                next: 'anaph-uncertain',
            },
        ],
    },
    {
        id: 'anaph-mild',
        type: 'result',
        module: 1,
        title: 'Mild Allergic Reaction — Not Anaphylaxis',
        body: 'Isolated urticaria without respiratory compromise, hypotension, or multi-organ involvement.\n\n**Treatment:**\n• [Diphenhydramine](#/drug/diphenhydramine/anaphylaxis) 25-50 mg PO/IV\n• [Famotidine](#/drug/famotidine/anaphylaxis) 20 mg PO/IV\n• Observe 2-4 hours\n\n**LOW threshold to give epinephrine** — if any concern for progression, treat as anaphylaxis. [1][3]',
        recommendation: 'Mild allergic reaction. Treat with antihistamines, observe 2-4 hours. Reclassify if symptoms progress.',
        confidence: 'recommended',
        citation: [1, 3],
    },
    {
        id: 'anaph-uncertain',
        type: 'info',
        module: 1,
        title: 'Uncertain — Active Monitoring',
        body: 'Aggressive monitoring with low threshold to treat:\n\n• Establish IV access immediately\n• Have [Epinephrine](#/drug/epinephrine/anaphylaxis im) drawn up at bedside (0.5 mL of 1 mg/mL)\n• Reassess every 5-10 minutes\n• Monitor for progression to multi-organ involvement\n• **Low threshold to treat as anaphylaxis** — early epinephrine improves outcomes [1][3]',
        citation: [1, 3],
        next: 'anaph-source-control',
    },
    // =====================================================================
    // MODULE 2: EPINEPHRINE
    // =====================================================================
    {
        id: 'anaph-source-control',
        type: 'info',
        module: 2,
        title: 'Source Control & IM Epinephrine',
        body: '**SIMULTANEOUS actions:**\n\n**Source control:**\n• Stop all infusions/transfusions\n• Remove insect stinger (scrape, do not squeeze)\n• Sugammadex 16 mg/kg for rocuronium-induced\n\n**IM Epinephrine — FIRST LINE:**\n• [Epinephrine](#/drug/epinephrine/anaphylaxis im) **0.5 mg IM** (0.5 mL of 1 mg/mL) into **anterolateral thigh**\n• Pediatric: **0.01 mg/kg IM** (max 0.5 mg)\n• Repeat every 5 minutes, up to 3 doses\n\n**Do NOT delay for:**\n• IV access\n• Antihistamines\n• Steroids\n\nAnterolateral thigh achieves faster peak levels than deltoid or subcutaneous injection (Simons 2001). [1][2][3][4]',
        citation: [1, 2, 3, 4],
        next: 'anaph-epi-response',
    },
    {
        id: 'anaph-epi-response',
        type: 'question',
        module: 2,
        title: 'Response After IM Epinephrine?',
        body: 'Assess 5 minutes after each dose.\n\n**Good response:** Improved blood pressure, reduced wheeze/stridor, improved skin perfusion.\n**Poor response:** Persistent hypotension, worsening respiratory distress, no clinical improvement.\n\nUp to 3 IM doses before escalating to IV epinephrine. [1][4]',
        citation: [1, 4],
        options: [
            {
                label: 'Good response after IM epi',
                next: 'anaph-post-epi-stable',
            },
            {
                label: 'Partial response — still symptomatic',
                next: 'anaph-iv-access',
                urgency: 'urgent',
            },
            {
                label: 'No response / worsening after 2-3 doses',
                next: 'anaph-iv-access',
                urgency: 'critical',
            },
            {
                label: 'Peri-arrest / cardiovascular collapse',
                next: 'anaph-peri-arrest',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'anaph-post-epi-stable',
        type: 'info',
        module: 2,
        title: 'Good Response to IM Epinephrine',
        body: 'Continue monitoring — patient responding to IM epinephrine.\n\n• Continuous cardiac monitoring + SpO2\n• Vitals every 5-15 minutes\n• Maintain IV access\n• Proceed to adjunctive therapies now that epinephrine has been given [1][3]',
        citation: [1, 3],
        next: 'anaph-fluids',
    },
    {
        id: 'anaph-iv-access',
        type: 'question',
        module: 2,
        title: 'IV Access for Epinephrine Infusion',
        body: 'IM epinephrine inadequate after 2-3 doses — escalate to **IV epinephrine infusion**.\n\n[IV Epi PK Rationale](#/info/anaph-iv-epi-pk)\n\nConfirm IV access (large bore or central line, IO if needed).\n\n**CRITICAL SAFETY:** Do NOT give cardiac arrest dose (1 mg IV push) to a patient with a pulse — this represents a **61-fold dosing error** compared to IM dosing. IV bolus epinephrine in non-arrest patients causes hypertensive crisis, arrhythmias, and death. [2][3][4]',
        citation: [2, 3, 4],
        options: [
            {
                label: 'IV/IO established — start infusion',
                next: 'anaph-epi-infusion',
                urgency: 'critical',
            },
            {
                label: 'No IV access — continue IM + IO attempt',
                next: 'anaph-source-control',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'anaph-epi-infusion',
        type: 'info',
        module: 2,
        title: 'IV Epinephrine Infusion',
        body: '[Epinephrine](#/drug/epinephrine/anaphylaxis iv infusion) infusion protocol (PulmCrit approach): [4]\n\n**Mixing:** 1 mg epinephrine in 100 mL NS = **10 mcg/mL**\n\n**Protocol:**\n1. **Loading:** 20 mcg/min x 2 minutes (~40 mcg total)\n2. **Maintenance:** 10 mcg/min (= 60 mL/hr)\n3. **Titrate** up or down based on clinical response\n4. **AGGRESSIVELY WEAN** after resolution\n\nBrown et al 2004: 19 patients treated with 5-15 mcg/min IV epinephrine — all responded within 5 minutes. [10]\n\n**Peri-arrest:** [Epinephrine](#/drug/epinephrine/anaphylaxis push dose) 20-50 mcg IV push (push-dose epi).\n\nStop infusion ~30 minutes after symptom resolution. [1][3][4]',
        citation: [1, 3, 4, 10],
        calculatorLinks: [
            { id: 'epi-infusion', label: 'Epi Infusion Calculator' },
        ],
        next: 'anaph-fluids',
    },
    // =====================================================================
    // MODULE 3: RESUSCITATION
    // =====================================================================
    {
        id: 'anaph-peri-arrest',
        type: 'info',
        module: 3,
        title: 'Peri-Arrest / Cardiovascular Collapse',
        body: '[Epinephrine](#/drug/epinephrine/anaphylaxis push dose) **20-50 mcg IV push**, repeat every 1-2 minutes.\n\nIf no IV access: IM 0.5 mg every 5 minutes + emergent IO access.\n\n**Position:** Lay flat, elevate legs — up to **35% of plasma volume** extravasates within minutes during anaphylaxis. [1]\n\n**If cardiac arrest:**\n• Standard ACLS with epinephrine 1 mg IV every 3-5 minutes\n• **Prolonged resuscitation** — this is a reversible pathology\n• Consider VA-ECMO if available [1][2]',
        citation: [1, 2, 4],
        next: 'anaph-fluids',
    },
    {
        id: 'anaph-fluids',
        type: 'info',
        module: 3,
        title: 'IV Fluid Resuscitation',
        body: '**Distributive shock** — up to 35% of intravascular volume extravasates within minutes. [1]\n\n**Adults:**\n• 500-1000 mL NS/LR bolus, repeat aggressively\n• May need several liters in first hour [3]\n\n**Pediatrics:**\n• 20-30 mL/kg bolus, repeat to 60 mL/kg+\n• IO access if no IV [2]\n\n**POCUS-guided fluid management:**\n• IVC collapse = volume responsive → more fluid\n• Hyperdynamic + empty chambers = more fluid\n• Adequate filling + persistent hypotension = uptitrate epinephrine\n\nLR preferred for large-volume resuscitation. [1]',
        citation: [1, 2, 3],
        next: 'anaph-airway',
    },
    {
        id: 'anaph-airway',
        type: 'question',
        module: 3,
        title: 'Airway Assessment',
        body: 'Airway edema can progress rapidly in anaphylaxis.\n\n**Signs of upper airway involvement:**\n• Stridor, hoarseness, voice change\n• Tongue/lip swelling\n• Drooling, difficulty swallowing\n• Accessory muscle use\n\n**Angioedema WITHOUT urticaria** → consider:\n• ACE-inhibitor angioedema (bradykinin-mediated — epinephrine ineffective)\n• Hereditary angioedema (C1-esterase inhibitor deficiency) [3]',
        citation: [1, 3],
        options: [
            {
                label: 'Airway stable — no upper airway signs',
                next: 'anaph-adjunctive-start',
            },
            {
                label: 'Wheezing / bronchospasm only',
                next: 'anaph-bronchospasm',
                urgency: 'urgent',
            },
            {
                label: 'Stridor / upper airway edema',
                next: 'anaph-airway-critical',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'anaph-airway-critical',
        type: 'info',
        module: 3,
        title: 'Critical Airway — Intubation Preparation',
        body: '**Prepare for difficult airway** — call anesthesia/ENT early.\n\n**Equipment:**\n• Video laryngoscopy (first attempt)\n• Smaller ETT than usual (edema narrows the airway)\n• Surgical airway kit at bedside\n\n**Temporizing:** Nebulized epinephrine — [racemic epinephrine](#/drug/racemic-epinephrine/anaphylaxis) 0.5 mL of 2.25% in 4.5 mL NS OR L-epinephrine 5 mL of 1:1000 (1 mg/mL). [1]\n\n**Do NOT delay intubation** if patient is deteriorating — airway edema worsens rapidly.\n\n**Post-intubation:** Continue epinephrine infusion, IV fluids, and adjunctive therapies. [1]',
        citation: [1],
        next: 'anaph-adjunctive-start',
    },
    // =====================================================================
    // MODULE 4: REFRACTORY & SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'anaph-adjunctive-start',
        type: 'question',
        module: 4,
        title: 'Refractory or Special Population?',
        body: 'Before standard adjunctive therapies, identify refractory anaphylaxis or special populations requiring modified management.\n\n**Refractory anaphylaxis:** <0.5% of cases — persistent hemodynamic instability or respiratory compromise despite adequate epinephrine + IV fluids. [1]',
        citation: [1, 3],
        options: [
            {
                label: 'Responding to treatment — standard adjuncts',
                next: 'anaph-antihistamines',
            },
            {
                label: 'Beta-blocker patient — poor epi response',
                next: 'anaph-beta-blocked',
                urgency: 'critical',
            },
            {
                label: 'Refractory despite adequate epi + fluids',
                next: 'anaph-refractory',
                urgency: 'critical',
            },
            {
                label: 'Isolated bronchospasm despite epi',
                next: 'anaph-bronchospasm',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'anaph-beta-blocked',
        type: 'info',
        module: 4,
        title: 'Beta-Blocked Patient',
        body: 'Blunted epinephrine response due to beta-adrenergic blockade. [1][3]\n\n**Management:**\n• Higher epinephrine doses (may need more frequent/larger IM doses)\n• Additional beta-2 agonism: [Albuterol](#/drug/albuterol-neb/anaphylaxis) nebulizer + [Terbutaline](#/drug/terbutaline/anaphylaxis) 0.25 mg SQ\n• [Methylene Blue](#/drug/methylene-blue/anaphylaxis) 1-2 mg/kg IV over 5-10 min (guanylate cyclase inhibitor — blocks NO-mediated vasodilation) [1]\n\n**Glucagon — DISCOURAGED by Farkas:**\n• Weak evidence, only bypasses beta-1 (not beta-2 — does not help bronchospasm)\n• Causes emesis (aspiration risk)\n• [Glucagon](#/drug/glucagon/anaphylaxis) — last resort only [1][2]',
        citation: [1, 2, 3],
        next: 'anaph-antihistamines',
    },
    {
        id: 'anaph-refractory',
        type: 'info',
        module: 4,
        title: 'Refractory Anaphylaxis',
        body: 'Persistent despite adequate epinephrine + IV fluids (<0.5% of cases). [1]\n\n**Escalation ladder:**\n1. Maximize epinephrine infusion rate\n2. Aggressive POCUS-guided volume resuscitation\n3. [Methylene Blue](#/drug/methylene-blue/anaphylaxis) 1-2 mg/kg IV (blocks NO-mediated vasodilation — case reports only) [1]\n4. Vasopressin infusion\n5. VA-ECMO\n\n**Re-evaluate the diagnosis:**\n• Is this truly anaphylaxis? [Differential Diagnosis](#/info/anaph-ddx)\n• Missed ongoing exposure?\n• Underlying mastocytosis?\n• Serum tryptase level (peak ~90 min, draw within 3 hours) [3]',
        citation: [1, 3],
        next: 'anaph-antihistamines',
    },
    {
        id: 'anaph-bronchospasm',
        type: 'info',
        module: 4,
        title: 'Bronchospasm Management',
        body: 'Persistent wheezing despite adequate epinephrine — especially in patients with asthma overlap. [1]\n\n• [Albuterol](#/drug/albuterol-neb/anaphylaxis) 2.5-5 mg nebulizer, continuous if severe\n• [Terbutaline](#/drug/terbutaline/anaphylaxis) 0.25 mg SQ (systemic beta-2 agonist)\n• Nebulized epinephrine for combined upper + lower airway symptoms\n• Ensure adequate epinephrine infusion (epinephrine is a bronchodilator via beta-2 receptors) [1][2]',
        citation: [1, 2],
        next: 'anaph-antihistamines',
    },
    {
        id: 'anaph-exercise',
        type: 'info',
        module: 4,
        title: 'Exercise-Induced Anaphylaxis',
        body: '**Food-dependent exercise-induced anaphylaxis (FDEIA):**\n• Triggered by exercise within 1-4 hours of eating specific foods (wheat, celery most common)\n• Neither food NOR exercise alone causes symptoms\n• Often misdiagnosed [3]\n\n**ED management:** Same as standard anaphylaxis protocol.\n\n**Discharge counseling:**\n• Avoid exercise 4-6 hours after eating trigger food\n• Carry EpiPen at all times during exercise\n• Allergist referral mandatory [3]',
        citation: [3],
        next: 'anaph-disposition-assess',
    },
    // =====================================================================
    // MODULE 5: ADJUNCTIVE THERAPIES
    // =====================================================================
    {
        id: 'anaph-antihistamines',
        type: 'info',
        module: 5,
        title: 'Antihistamines (H1 + H2)',
        body: '**Second-line only — NEVER delay epinephrine for antihistamines.** [1][3]\n\n**H1 blocker:** [Diphenhydramine](#/drug/diphenhydramine/anaphylaxis) 50 mg IV every 6 hours\n**H2 blocker:** [Famotidine](#/drug/famotidine/anaphylaxis) 20 mg IV every 12 hours\n\nH1 + H2 combination is superior to H1 alone for cutaneous symptoms. [2][3]\n\n**What antihistamines DO:**\n• Reduce urticaria, flushing, pruritus\n• May reduce mucosal edema\n\n**What antihistamines do NOT do:**\n• Treat hypotension\n• Treat bronchospasm\n• Prevent biphasic reactions\n\nAntihistamines are primarily cosmetic. [1]',
        citation: [1, 2, 3],
        next: 'anaph-steroids',
    },
    {
        id: 'anaph-steroids',
        type: 'info',
        module: 5,
        title: 'Corticosteroids',
        body: '**Controversial — no randomized controlled trials.** [1][2][3]\n\n**If giving (pick one):**\n• [Dexamethasone](#/drug/dexamethasone/anaphylaxis) 10 mg IV x1\n• [Methylprednisolone](#/drug/methylprednisolone/anaphylaxis) 60 mg IV x1\n\n**Consider if:**\n• Refractory to 2+ IM epinephrine doses\n• Known asthma\n• History of biphasic reactions [1]\n\n**Evidence:**\n• Do NOT prevent biphasic reactions [2]\n• May reduce length of stay in hospitalized patients [2]\n• No benefit on acute symptoms (onset 4-6 hours)\n• **NOT needed for discharge** [1]',
        citation: [1, 2, 3],
        next: 'anaph-tryptase',
    },
    {
        id: 'anaph-tryptase',
        type: 'info',
        module: 5,
        title: 'Tryptase & Diagnostics',
        body: '**Serum tryptase:**\n• Peak ~90 minutes after onset, draw within 3 hours\n• Less useful for food-triggered anaphylaxis (may be normal) [3]\n• Elevated level supports anaphylaxis diagnosis\n• Persistently elevated baseline → suspect mastocytosis\n\n**Other labs:**\n• CBC, BMP, lactate (shock assessment)\n• Troponin if hemodynamic compromise (Kounis syndrome — allergic coronary spasm)\n\n**Tryptase is NOT required** to diagnose or treat anaphylaxis — it is confirmatory and prognostic. [3]',
        citation: [3],
        next: 'anaph-disposition-assess',
    },
    {
        id: 'anaph-monitoring',
        type: 'info',
        module: 5,
        title: 'Monitoring & Weaning',
        body: '**Epinephrine infusion weaning:**\n• After symptom resolution, begin weaning over ~30 minutes\n• **AGGRESSIVELY WEAN** — reluctance to stop the infusion is the greatest weakness [4]\n• If symptoms recur during wean, uptitrate and try again in 1-2 hours\n\n**Monitoring parameters:**\n• Continuous cardiac monitoring + SpO2\n• Vitals every 15 minutes for first hour, then every 30 minutes\n\n[Biphasic Reaction Risk Factors](#/info/anaph-biphasic) [1][2][3][4]',
        citation: [1, 2, 3, 4],
        next: 'anaph-disposition-assess',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION & DISCHARGE
    // =====================================================================
    {
        id: 'anaph-disposition-assess',
        type: 'question',
        module: 6,
        title: 'Disposition Assessment',
        body: '[Biphasic Reaction Risk Factors](#/info/anaph-biphasic)\n\n**Biphasic reactions:** ~5-20% of cases, majority occur within 8-10 hours. No deaths have been reported from biphasic reactions. [1][2][3]\n\n**Risk factors for biphasic reaction:**\n• Multiple epinephrine doses required\n• IV fluid bolus needed\n• Delayed initial epinephrine\n• Inhaled beta-agonist required\n• Unknown trigger\n• Initial hypotension\n• Severe initial presentation [2]',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Mild, rapid response to 1 IM epi dose',
                next: 'anaph-dispo-4hr',
            },
            {
                label: 'Required multiple epi doses or IV epi',
                next: 'anaph-dispo-admit',
                urgency: 'urgent',
            },
            {
                label: 'Required intubation / ICU-level care',
                next: 'anaph-dispo-icu',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'anaph-dispo-4hr',
        type: 'result',
        module: 6,
        title: 'Observe 4-6 Hours — Discharge',
        body: '**Standard observation:** 4-6 hours from peak reaction. [1][2][3]\n\n[Discharge Instructions](#/info/anaph-discharge)\n\n**Requirements before discharge:**\n• Symptom-free for minimum 4 hours\n• Tolerating oral intake\n• Understands EpiPen use and return indications',
        recommendation: 'Observe 4-6 hours post peak reaction. Discharge with EpiPen prescription, allergen avoidance education, and allergist referral.',
        confidence: 'recommended',
        citation: [1, 2, 3],
    },
    {
        id: 'anaph-dispo-admit',
        type: 'result',
        module: 6,
        title: 'Admit — Observation/Telemetry',
        body: 'Admit when biphasic risk factors present or delayed/incomplete response. [1]\n\n**Admission criteria:**\n• Required >1 dose epinephrine\n• Severe initial reaction\n• History of asthma\n• Late evening presentation\n• Unknown trigger\n\n**Monitoring:**\n• Telemetry\n• Vitals every 1-2 hours\n• Anaphylaxis kit at bedside\n\n[Discharge Instructions](#/info/anaph-discharge) at hospital discharge.',
        recommendation: 'Admit for extended observation (12-24h). Multiple risk factors for biphasic reaction.',
        confidence: 'recommended',
        citation: [1, 2, 3],
    },
    {
        id: 'anaph-dispo-icu',
        type: 'result',
        module: 6,
        title: 'ICU Admission',
        body: '**ICU criteria:**\n• IV epinephrine infusion required\n• [Glucagon](#/drug/glucagon/anaphylaxis) or methylene blue administered\n• Intubation or surgical airway\n• Stridor with ACE-inhibitor angioedema\n• Persistent hemodynamic instability\n• Refractory anaphylaxis (>4 hours) [1][3]\n\n**ICU management:**\n• Continue epinephrine infusion with aggressive weaning\n• POCUS-guided fluid resuscitation\n• Monitor for biphasic reaction\n• Serum tryptase\n• Allergist consult',
        recommendation: 'ICU admission for ongoing vasopressor support, airway management, or refractory anaphylaxis.',
        confidence: 'recommended',
        citation: [1, 3],
    },
    {
        id: 'anaph-discharge-rx',
        type: 'info',
        module: 6,
        title: 'Discharge Prescriptions & Education',
        body: '[Discharge Instructions](#/info/anaph-discharge)\n\n**Mandatory:**\n• **EpiPen x2** (prescribe — ensure patient demonstrates use)\n• Allergist referral within 2-4 weeks [2][3]\n• Allergen avoidance education\n• Medical ID bracelet recommended\n\n**Optional short-course (symptomatic relief):**\n• [Diphenhydramine](#/drug/diphenhydramine/angioedema) 25-50 mg PO every 6 hours PRN x 3-5 days\n• [Famotidine](#/drug/famotidine/angioedema) 20 mg PO BID x 3-5 days\n\n**Steroids NOT needed for discharge** — no evidence supports outpatient steroid taper. [1] EB Medicine adult review notes optional 3-5 day course, no taper needed. [3]\n\n**Return precautions:** Any symptom recurrence → use EpiPen immediately + call 911. [2][3]',
        citation: [1, 2, 3],
    },
];
export const ANAPHYLAXIS_MODULE_LABELS = [
    'Recognition & Diagnosis',
    'Epinephrine',
    'Resuscitation',
    'Refractory & Special Populations',
    'Adjunctive Therapies',
    'Disposition & Discharge',
];
export const ANAPHYLAXIS_CITATIONS = [
    { num: 1, text: 'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025.' },
    { num: 2, text: 'Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients: Early Recognition and Treatment Are Critical for Best Outcomes. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24.' },
    { num: 3, text: 'Singer E, Zodda D. Allergy and Anaphylaxis: Principles of Acute Emergency Management. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24.' },
    { num: 4, text: 'Farkas J. PulmCrit — How to use IV epinephrine for anaphylaxis. EMCrit/PulmCrit. August 26, 2019.' },
    { num: 5, text: 'Golden DBK, Wang J, et al. Anaphylaxis: A 2023 Practice Parameter Update. Ann Allergy Asthma Immunol. 2024;132(2):124-176.' },
    { num: 6, text: 'Dodd A, Hughes A, Sargant N, et al. Evidence update for the treatment of anaphylaxis. Resuscitation. 2021;163:86-96.' },
    { num: 7, text: 'McHugh K, Repanshek Z. Anaphylaxis: Emergency Department Treatment. Emerg Med Clin North Am. 2022;40(1):19-32.' },
    { num: 8, text: 'Gorham NP. Anaphylaxis: After the Emergency Department. Emerg Med Clin North Am. 2022;40(1):33-37.' },
    { num: 9, text: 'Long B, Gottlieb M. Emergency medicine updates: Anaphylaxis. Am J Emerg Med. 2021;49:35-39.' },
    { num: 10, text: 'Brown SGA, Blackman KE, Stenlake V, Heddle R. Insect sting anaphylaxis; prospective evaluation of treatment with intravenous adrenaline and volume resuscitation. Emerg Med J. 2004;21(2):149-154.' },
    { num: 11, text: 'Krishnaswamy G. Critical Care Management of the Patient With Anaphylaxis: A Concise Definitive Review. Crit Care Med. 2021;49(5):838-857.' },
    { num: 12, text: 'Pumphrey RS. Lessons for management of anaphylaxis from a study of fatal reactions. Clin Exp Allergy. 2000;30(8):1144-50.' },
];
