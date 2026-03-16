// MedKitt — Adrenal Insufficiency (Crisis → Classification → Diagnostics → Maintenance → Disposition)
// Initial Assessment → Crisis Treatment → Type Classification → Diagnostic Workup → Maintenance & Stress Dosing → Disposition
// 6 modules: Initial Assessment → Crisis Treatment → Type Classification → Diagnostic Workup → Maintenance & Stress Dosing → Disposition
// 27 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ADRENAL_INSUFFICIENCY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'ai-start',
    type: 'question',
    module: 1,
    title: 'Adrenal Insufficiency — Presentation',
    body: '[Adrenal Insufficiency Steps Summary](#/info/ai-summary)\n\n**Adrenal crisis is a medical emergency.** Defined as acute hemodynamic deterioration (SBP ≤100 mmHg or ≥20 mmHg below baseline) that resolves within 1-2 hours of parenteral hydrocortisone. Mortality rate: 0.5 per 100 patient-years in known AI patients. [2][4]\n\nAdrenal crisis can be the first presentation of previously undiagnosed AI in up to 50% of cases. Maintain high clinical suspicion in unexplained shock refractory to fluids and vasopressors.',
    citation: [2, 4, 7],
    calculatorLinks: [
      { id: 'bsa', label: 'BSA Calculator' },
    ],
    options: [
      {
        label: 'Suspected Adrenal Crisis',
        description: 'Hemodynamic instability, shock refractory to fluids/pressors',
        next: 'ai-crisis-confirm',
        urgency: 'critical',
      },
      {
        label: 'Known AI — Acute Illness',
        description: 'Established diagnosis requiring stress dosing',
        next: 'ai-stress-dose',
      },
      {
        label: 'Suspected Chronic AI — New Diagnosis',
        description: 'Fatigue, weight loss, hyperpigmentation, electrolyte abnormalities',
        next: 'ai-type-classify',
      },
    ],
  },

  {
    id: 'ai-crisis-confirm',
    type: 'question',
    module: 1,
    title: 'Confirm Crisis Features',
    body: '**Classic adrenal crisis presentation:**\n• Hemodynamic collapse — SBP ≤100 mmHg or ≥20 mmHg below baseline\n• Hyponatremia (84% of cases)\n• Hypoglycemia\n• Hyperkalemia (PAI only — mineralocorticoid deficiency)\n• Unexplained fever, abdominal pain, nausea/vomiting\n• Altered mental status, confusion, lethargy\n• Hypercalcemia (rare but described)\n\n**Common precipitants:**\n• Infection (#1 cause — viral in children, bacterial in adults)\n• Trauma or surgery without stress dosing\n• Abrupt steroid withdrawal\n• CYP3A4 inducers (rifampin, phenytoin, carbamazepine)\n• GI illness with vomiting preventing oral steroid intake\n\n[Precipitating Factors & Differential Diagnosis](#/info/ai-precipitants)',
    citation: [2, 3, 7],
    options: [
      {
        label: 'Crisis Confirmed — Treat Immediately',
        next: 'ai-crisis-fluids',
        urgency: 'critical',
      },
      {
        label: 'Not in Crisis — Evaluate for Chronic AI',
        next: 'ai-type-classify',
      },
    ],
  },

  {
    id: 'ai-crisis-fluids',
    type: 'info',
    module: 1,
    title: 'Immediate Resuscitation',
    body: '**Simultaneous actions — do NOT delay treatment for diagnostics.**\n\n**IV Access + Fluids:**\n• **Adults:** 1L NS bolus, repeat PRN. Add D5 (or D50 bolus) if hypoglycemic.\n• **Pediatrics:** 20 mL/kg NS bolus, repeat PRN up to 60 mL/kg in first hour. D10 2-5 mL/kg for hypoglycemia.\n\n**Draw crisis labs BEFORE steroids if possible — but do NOT delay treatment:**\n• Random cortisol (most important single test)\n• ACTH level (distinguishes primary vs secondary)\n• BMP (Na, K, glucose, Cr)\n• CBC with differential\n• Lactate\n• Renin and aldosterone\n\n[Lab Findings by AI Type](#/info/ai-lab-findings)\n\n**KEY:** A random cortisol drawn during acute physiologic stress that is <18 μg/dL is highly suggestive of AI. A level <10 μg/dL during crisis is virtually diagnostic. [1][2]',
    citation: [1, 2, 7],
    next: 'ai-crisis-steroid',
  },

  {
    id: 'ai-crisis-steroid',
    type: 'info',
    module: 1,
    title: 'Emergency Steroid Replacement',
    body: '**Hydrocortisone — first-line for adrenal crisis:**\n\n**Adults:**\n• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 100 mg IV/IM bolus immediately\n• Then 200 mg/24h as continuous infusion (preferred) or 50 mg IV q6h\n• Taper to oral over 1-3 days as hemodynamics stabilize\n\n**Pediatrics:**\n• [Hydrocortisone](#/drug/hydrocortisone/pediatric adrenal crisis) 50 mg/m² IV bolus (max 100 mg)\n• Then 50-100 mg/m²/day divided q6-8h\n• BSA required → use toolbar BSA calculator\n\n**If hydrocortisone unavailable:**\n• [Dexamethasone](#/drug/dexamethasone/adrenal crisis) 4 mg IV — does NOT interfere with cortisol assay (advantage if diagnosis uncertain)\n• [Methylprednisolone](#/drug/methylprednisolone/adrenal crisis) 40 mg IV\n\n**KEY:** At hydrocortisone doses ≥50 mg/day, mineralocorticoid activity is sufficient — fludrocortisone is NOT needed during acute crisis management. [1][2]',
    citation: [1, 2, 5, 6],
    next: 'ai-crisis-response',
  },

  {
    id: 'ai-crisis-response',
    type: 'question',
    module: 1,
    title: 'Response Assessment (1-2 Hours)',
    body: '**Adrenal crisis should show hemodynamic improvement within 1-2 hours of parenteral hydrocortisone.** [2]\n\n**Expected response:**\n• Blood pressure improves\n• Mental status clears\n• Vasopressor requirements decrease\n• Glucose stabilizes\n\n**If no improvement:**\n• Reassess diagnosis — is this truly adrenal crisis?\n• Ensure adequate volume resuscitation\n• Consider other shock etiologies (septic, cardiogenic, hypovolemic)\n• Random cortisol >18 μg/dL during acute stress makes AI very unlikely',
    citation: [2, 7],
    options: [
      {
        label: 'Improving — Continue Crisis Management',
        next: 'ai-crisis-ongoing',
      },
      {
        label: 'No Improvement — Reassess Diagnosis',
        next: 'ai-crisis-refractory',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: CRISIS TREATMENT
  // =====================================================================

  {
    id: 'ai-crisis-ongoing',
    type: 'info',
    module: 2,
    title: 'Ongoing Crisis Management',
    body: '**Continue first 24-48 hours:**\n• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 200 mg/24h (continuous infusion preferred, or 50 mg IV q6h) [5]\n• Aggressive IV fluids — NS ± dextrose\n• Monitor glucose q1-2h (hypoglycemia common)\n• Treat precipitating cause aggressively\n\n**Tapering (day 2-3):**\n• Once hemodynamically stable, halve hydrocortisone dose daily\n• Transition to oral when tolerating PO\n• Resume maintenance dose + fludrocortisone (if PAI) once at baseline\n\n**Electrolytes:**\n• Na and K normalize with hydrocortisone at stress doses (mineralocorticoid effect adequate at ≥50 mg/day)\n• Avoid aggressive potassium correction in PAI — K will drop with steroid replacement [2][6]',
    citation: [2, 5, 6],
    next: 'ai-precipitant-workup',
  },

  {
    id: 'ai-crisis-refractory',
    type: 'result',
    module: 2,
    title: 'Refractory Shock — Broaden Differential',
    body: '**If hemodynamics do not improve within 1-2 hours of hydrocortisone 100 mg IV + aggressive fluids:**\n\n**Reassess for alternative diagnoses:**\n• Septic shock (most common crisis precipitant — may need independent treatment)\n• Hypovolemic shock (hemorrhage, GI losses)\n• Cardiogenic shock\n• Other endocrine emergency (thyroid storm, myxedema coma)\n\n**Management:**\n• Vasopressors — norepinephrine first-line\n• Broad-spectrum antibiotics if infection cannot be excluded\n• Check TSH for concomitant hypothyroidism (polyglandular autoimmune syndrome)\n\n**Diagnostic clue:** Random cortisol >18 μg/dL drawn during acute physiologic stress makes adrenal insufficiency very unlikely as the primary cause of shock. [2][7]',
    recommendation: 'ICU admission mandatory. Continue stress-dose steroids while investigating alternative diagnoses. Endocrine consultation.',
    citation: [2, 4, 7],
  },

  {
    id: 'ai-precipitant-workup',
    type: 'question',
    module: 2,
    title: 'Identify & Treat Precipitant',
    body: '**Infection is the #1 trigger** — viral in children, bacterial in adults. [Precipitating Factors & Differential Diagnosis](#/info/ai-precipitants)\n\n**Common triggers:**\n• Infection/sepsis (most common)\n• GI illness with vomiting (cannot take oral steroids)\n• Trauma or surgery without stress dosing\n• Abrupt steroid discontinuation\n• CYP3A4 inducers (rifampin, phenytoin, carbamazepine)\n• Adrenal hemorrhage (anticoagulation, meningococcemia)\n\n~10% of crises have no identifiable precipitant. [3][7]',
    citation: [2, 3, 7],
    options: [
      {
        label: 'Infection / Sepsis',
        next: 'ai-crisis-infection',
      },
      {
        label: 'Medication-Related',
        description: 'Steroid withdrawal, CYP3A4 inducers, checkpoint inhibitors',
        next: 'ai-med-related',
      },
      {
        label: 'Other / Unknown — Stabilized',
        next: 'ai-type-classify',
      },
    ],
  },

  {
    id: 'ai-crisis-infection',
    type: 'info',
    module: 2,
    title: 'Infection-Precipitated Crisis',
    body: '**Treat BOTH the infection AND the crisis simultaneously.**\n\n• Continue stress-dose [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) throughout active infection\n• Broad-spectrum antibiotics per sepsis protocol\n• Blood and urine cultures, CXR, procalcitonin\n• Do NOT taper steroids until infection is controlled\n• Stress-dose steroids may mask fever — monitor WBC and procalcitonin trends instead\n\n**Waterhouse-Friderichsen syndrome:**\n• Bilateral adrenal hemorrhage in meningococcal sepsis\n• Also seen with DIC, heparin-induced thrombocytopenia, antiphospholipid syndrome\n• CT abdomen shows enlarged hemorrhagic adrenals\n• Irreversible PAI — lifelong glucocorticoid + mineralocorticoid replacement required [2][7]',
    citation: [2, 4, 7],
    next: 'ai-disposition',
  },

  // =====================================================================
  // MODULE 3: TYPE CLASSIFICATION
  // =====================================================================

  {
    id: 'ai-type-classify',
    type: 'question',
    module: 3,
    title: 'AI Type Classification',
    body: '**Classification guides workup and long-term management.** [Lab Findings by AI Type](#/info/ai-lab-findings)\n\n**Primary AI (PAI):** Direct adrenal gland destruction — autoimmune (Addison disease, 80% in developed countries), infectious (TB #1 worldwide), hemorrhagic, infiltrative, bilateral adrenalectomy.\n\n**Secondary AI (SAI):** Pituitary ACTH deficiency — tumors, surgery, radiation, Sheehan syndrome, immune checkpoint inhibitors.\n\n**Tertiary AI (TAI):** HPA axis suppression from exogenous steroids — **most common cause of AI overall.** Any patient on ≥prednisone 5 mg/day (or equivalent) for ≥3 weeks. [1][5]',
    citation: [1, 2, 5],
    options: [
      {
        label: 'Primary AI (Addison\'s)',
        description: 'Hyperpigmentation, hyperkalemia, high ACTH',
        next: 'ai-pai-workup',
      },
      {
        label: 'Secondary AI (Pituitary)',
        description: 'No hyperpigmentation, no hyperK, pituitary deficits',
        next: 'ai-sai-workup',
      },
      {
        label: 'Tertiary AI (Steroid-Induced)',
        description: 'History of chronic exogenous steroid use',
        next: 'ai-tai-workup',
      },
      {
        label: 'Unknown — Need Diagnostic Workup',
        next: 'ai-diagnostic-labs',
      },
    ],
  },

  {
    id: 'ai-pai-workup',
    type: 'info',
    module: 3,
    title: 'Primary AI (Addison\'s Disease)',
    body: '**Hallmarks distinguishing PAI from other types:**\n• **Hyperpigmentation** — ACTH-driven melanocyte stimulation. Look for palmar creases, buccal mucosa, scars, areolae, sun-exposed areas.\n• **Hyperkalemia** — aldosterone deficiency (unique to PAI)\n• Salt craving, postural hypotension, weight loss\n• Low cortisol + elevated ACTH (>2× upper limit of normal)\n\n**Etiologic workup:**\n• 21-hydroxylase antibodies (positive in ~85% of autoimmune PAI)\n• CT adrenals — TB: calcified/enlarged; hemorrhage: enlarged with high density; metastases\n• If antibodies negative: TB testing (PPD/IGRA), fungal (histoplasmosis, coccidioidomycosis), HIV, metastatic disease (lung, breast, melanoma)\n\n**Polyglandular autoimmune syndromes:**\n• **Type 1 (APS-1):** AI + hypoparathyroidism + chronic mucocutaneous candidiasis (AIRE gene mutation)\n• **Type 2 (Schmidt syndrome):** AI + autoimmune thyroid disease ± type 1 diabetes\n• → Check TSH in all PAI patients\n\n**CRITICAL:** Treat cortisol BEFORE thyroxine — levothyroxine accelerates cortisol clearance and can precipitate adrenal crisis in untreated AI. [1][5][8]',
    citation: [1, 5, 8, 9],
    next: 'ai-maintenance',
  },

  {
    id: 'ai-sai-workup',
    type: 'info',
    module: 3,
    title: 'Secondary AI (Pituitary)',
    body: '**Key differences from PAI:**\n• **No hyperpigmentation** (ACTH is LOW, not high)\n• **No hyperkalemia** (aldosterone preserved — RAAS axis intact)\n• May have other pituitary hormone deficiencies (TSH, LH/FSH, GH, prolactin)\n\n**Common causes:**\n• Pituitary adenoma (most common structural cause)\n• Post-pituitary surgery or radiation\n• Sheehan syndrome (postpartum pituitary necrosis — history of severe postpartum hemorrhage)\n• Lymphocytic hypophysitis\n• Immune checkpoint inhibitors: ipilimumab (anti-CTLA-4) > pembrolizumab/nivolumab (anti-PD-1) [5][9]\n\n**Workup:**\n• MRI pituitary with contrast\n• Full anterior pituitary panel: LH/FSH, TSH/fT4, GH/IGF-1, prolactin\n• Low or inappropriately normal ACTH + low cortisol confirms SAI\n\n**Fludrocortisone is NOT needed** in SAI — mineralocorticoid pathway (RAAS) is intact. [1][5]',
    citation: [1, 5, 9],
    next: 'ai-maintenance',
  },

  {
    id: 'ai-tai-workup',
    type: 'info',
    module: 3,
    title: 'Tertiary AI (Steroid-Induced)',
    body: '**Most common form of adrenal insufficiency overall.** [Corticosteroid Equivalency & Alternatives](#/info/ai-steroid-equivalency)\n\n**Risk factors for HPA suppression:**\n• ≥Prednisone 5 mg/day (or equivalent) for ≥3 weeks\n• Any dose for ≥3 weeks with Cushingoid features\n• Repeated high-potency inhaled, topical, or intra-articular steroids\n  — Meta-analysis: 4.2% intranasal, 6.8% inhaled, 52.2% intra-articular [11]\n• Chronic opioid use — prevalence of AI ~15% among chronic opioid users [12]\n\n**Recovery timeline:**\n• HPA axis recovery takes 6-12 months after steroid discontinuation\n• During recovery period: stress dosing still needed for illness/surgery\n\n**Taper guidance:**\n• Reduce to physiologic replacement (hydrocortisone 15-20 mg/day) first\n• Then slow taper: reduce by 1-2.5 mg prednisone equivalent every 1-2 weeks\n• Check AM cortisol after holding replacement for 24 hours — if >18 μg/dL, HPA axis has recovered\n\n[Special Populations](#/info/ai-special-populations) [1][11][12][13]',
    citation: [1, 11, 12, 13],
    next: 'ai-maintenance',
  },

  // =====================================================================
  // MODULE 4: DIAGNOSTIC WORKUP
  // =====================================================================

  {
    id: 'ai-diagnostic-labs',
    type: 'info',
    module: 4,
    title: 'Diagnostic Laboratory Evaluation',
    body: '[Lab Findings by AI Type](#/info/ai-lab-findings)\n\n**Step 1 — Morning Cortisol + ACTH (draw at 8-9 AM):**\n• AM cortisol <3 μg/dL → AI virtually confirmed\n• AM cortisol >15 μg/dL → AI unlikely (some guidelines use 18 μg/dL)\n• AM cortisol 3-15 μg/dL → indeterminate, needs cosyntropin stimulation test\n\n**Step 2 — ACTH level distinguishes type:**\n• ACTH >2× upper limit of normal → Primary AI\n• ACTH low or inappropriately normal → Secondary or Tertiary AI\n\n**Additional labs:**\n• BMP: hyponatremia (84%), hyperkalemia (PAI only), hypoglycemia\n• Renin + aldosterone: elevated renin + low aldosterone = PAI\n• TSH, anti-TPO antibodies: screen for polyglandular autoimmune syndrome\n• 21-hydroxylase antibodies if PAI suspected\n• DHEA-S: low in both PAI and SAI (not useful for distinguishing type) [1][5][8]',
    citation: [1, 5, 8],
    next: 'ai-cosyntropin',
  },

  {
    id: 'ai-cosyntropin',
    type: 'info',
    module: 4,
    title: 'Cosyntropin (ACTH) Stimulation Test',
    body: '**Gold standard for diagnosing PRIMARY AI.**\n\n**Protocol:**\n1. Draw baseline cortisol\n2. Administer cosyntropin 250 μg IV or IM\n3. Draw cortisol at 30 and 60 minutes\n\n**Interpretation:**\n• Peak cortisol ≥18 μg/dL → normal response, rules out PAI\n• Peak cortisol <18 μg/dL → confirms adrenal insufficiency\n\n**Limitations:**\n• Does NOT reliably detect SAI or recent-onset PAI (adrenals may still respond to supraphysiologic exogenous ACTH early in secondary disease)\n• If SAI suspected with normal stimulation test → endocrine referral for insulin tolerance test (ITT) or metyrapone test\n\n**ED tip:** If adrenal crisis is suspected, draw cortisol + ACTH, then give hydrocortisone immediately. Pre-treatment cortisol + ACTH are usually sufficient for diagnosis. Formal stimulation test can be done after stabilization.\n\n**Dexamethasone advantage:** Does NOT cross-react with cortisol immunoassays — allows meaningful cortisol measurement during active treatment. [1][14]',
    citation: [1, 5, 14],
    next: 'ai-cosyntropin-result',
  },

  {
    id: 'ai-cosyntropin-result',
    type: 'question',
    module: 4,
    title: 'Stimulation Test Result',
    body: 'What was the peak cortisol after cosyntropin administration?',
    citation: [1, 14],
    options: [
      {
        label: 'Peak ≥18 μg/dL — Normal Response',
        description: 'PAI excluded. If SAI still suspected → endocrine referral',
        next: 'ai-stim-normal',
      },
      {
        label: 'Peak <18 μg/dL — Abnormal',
        description: 'Adrenal insufficiency confirmed — classify type',
        next: 'ai-type-classify',
      },
    ],
  },

  {
    id: 'ai-stim-normal',
    type: 'result',
    module: 4,
    title: 'Normal Stimulation Test',
    body: 'A normal cosyntropin stimulation test **excludes primary AI** but does NOT exclude secondary AI (especially early or partial).\n\n**If clinical suspicion for SAI remains high:**\n• Endocrine referral for insulin tolerance test (ITT) or metyrapone test\n• ITT is the gold standard for SAI diagnosis but contraindicated in patients with seizure history, cardiovascular disease, or elderly\n\n**If low clinical suspicion:**\n• No further AI workup needed\n• Consider alternative diagnoses: hypothyroidism, depression, chronic fatigue syndrome, anemia, fibromyalgia [1][14]',
    recommendation: 'Normal cosyntropin stimulation test excludes primary AI. If secondary AI still suspected, refer to endocrinology for insulin tolerance test.',
    citation: [1, 14],
  },

  // =====================================================================
  // MODULE 5: MAINTENANCE & STRESS DOSING
  // =====================================================================

  {
    id: 'ai-maintenance',
    type: 'info',
    module: 5,
    title: 'Maintenance Replacement Therapy',
    body: '[Corticosteroid Equivalency & Alternatives](#/info/ai-steroid-equivalency)\n\n**Glucocorticoid replacement (ALL types):**\n• [Hydrocortisone](#/drug/hydrocortisone/maintenance) 15-25 mg PO daily, divided BID or TID\n• Give 2/3 of dose AM upon waking, 1/3 early afternoon\n• Last dose >6 hours before bedtime to avoid insomnia\n• Typical regimen: 15 mg AM + 5 mg at 2 PM [1]\n• Alternatives: [Prednisolone](#/drug/prednisolone/adrenal maintenance) 3-5 mg PO daily, [Dexamethasone](#/drug/dexamethasone/adrenal maintenance) 0.25-0.5 mg PO daily\n\n**Pediatrics:**\n• [Hydrocortisone](#/drug/hydrocortisone/pediatric maintenance) 6-10 mg/m²/day divided TID (preferred — shortest half-life, least growth suppression)\n\n**Mineralocorticoid (PAI ONLY):**\n• [Fludrocortisone](#/drug/fludrocortisone/adrenal maintenance) 50-200 μg PO daily\n• NOT needed in SAI or TAI (RAAS axis intact)\n• Monitor BP, K+, and plasma renin activity to guide dosing\n\n**Dose adjustment clues:**\n• Underdosing: fatigue, hypotension, nausea, salt craving, hyponatremia\n• Overdosing: weight gain, hyperglycemia, osteoporosis, Cushingoid features [1][5][6]',
    citation: [1, 5, 6],
    next: 'ai-stress-dose',
  },

  {
    id: 'ai-stress-dose',
    type: 'info',
    module: 5,
    title: 'Sick-Day Rules & Stress Dosing',
    body: '**The #1 cause of adrenal crisis is failure to increase steroids during physiologic stress.** [3]\n\n[Sick-Day Rules & Stress Dosing Guide](#/info/ai-sick-day-rules)\n\n**Minor illness (cold, mild gastroenteritis):**\n• **Double** oral hydrocortisone dose if fever >38°C (100.4°F)\n• **Triple** oral hydrocortisone dose if fever >39°C (102.2°F)\n• Continue increased dose until recovery, then resume baseline\n\n**Moderate illness/injury:**\n• [Hydrocortisone](#/drug/hydrocortisone/stress dose) 50 mg PO BID (or equivalent)\n• Taper over 2-3 days as illness resolves\n\n**Major surgery / critical illness:**\n• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 100 mg IV preop → 200 mg/24h → taper to maintenance over 2-3 days\n\n**Vomiting / unable to take PO:**\n• Emergency IM injection — [Hydrocortisone](#/drug/hydrocortisone/emergency IM) 100 mg IM → come to ED immediately\n• All AI patients must carry an emergency injection kit\n\n**Pediatric stress dosing:**\n• Illness: 30-50 mg/m²/day divided q6-8h\n• Major surgery: 50-100 mg/m² IV bolus → 50-100 mg/m²/day [1][15]',
    citation: [1, 2, 3, 15],
    next: 'ai-prevention',
  },

  {
    id: 'ai-med-related',
    type: 'info',
    module: 5,
    title: 'Medication-Related Crisis',
    body: '**Abrupt steroid withdrawal:**\n• Most common cause of TAI crisis\n• Risk with ≥prednisone 5 mg/day for ≥3 weeks\n• Management: resume steroids at previous dose, then taper slowly\n\n**CYP3A4 inducers** (accelerate cortisol metabolism):\n• Rifampin, phenytoin, carbamazepine, phenobarbital, St. John\'s wort\n• May need to double hydrocortisone maintenance dose while on CYP3A4 inducer [11]\n\n**CYP3A4 inhibitors** (can mask AI, then crisis when stopped):\n• Ketoconazole, itraconazole, fluconazole, ritonavir\n\n**Immune checkpoint inhibitors:**\n• Ipilimumab (anti-CTLA-4) → hypophysitis → SAI (highest risk)\n• Pembrolizumab/nivolumab (anti-PD-1) → primary adrenalitis → PAI\n• Usually irreversible — lifelong replacement needed\n• Do NOT hold cancer therapy for AI — treat AI and continue immunotherapy [9]\n\n**Chronic opioids:**\n• Suppress hypothalamic CRH → TAI\n• Prevalence ~15% of chronic opioid users\n• Higher risk with higher doses and longer duration\n• No patient on <20 MME/day developed opioid-induced AI in meta-analysis [12]\n• Screen with AM cortisol if unexplained fatigue or hypotension',
    citation: [9, 11, 12, 13],
    next: 'ai-maintenance',
  },

  {
    id: 'ai-prevention',
    type: 'info',
    module: 5,
    title: 'Crisis Prevention & Patient Education',
    body: '**Every AI patient must have ALL of the following:** [16]\n\n**1. Medical Alert Identification**\n• MedicAlert bracelet or necklace stating: "Adrenal Insufficiency — Requires Stress-Dose Steroids"\n\n**2. Emergency Injection Kit**\n• Hydrocortisone 100 mg for IM self-injection (lateral thigh)\n• Patient AND family/caregivers trained in injection technique\n• Replace before expiration date\n• In a study, only 44% of patients in adrenal emergency received their emergency injection before arriving at a medical facility [15]\n\n**3. Steroid Emergency Card**\n• Wallet card with diagnosis, medications, dosing, emergency contact, and instructions for first responders\n\n**4. Written Sick-Day Action Plan**\n• [Sick-Day Rules & Stress Dosing Guide](#/info/ai-sick-day-rules)\n\n**5. Education Topics:**\n• Never stop steroids abruptly\n• Increase dose when ill (sick-day rules)\n• Use IM injection if unable to keep oral steroids down\n• Go to ED immediately after IM injection\n• Inform ALL healthcare providers of diagnosis\n• Wear medical alert identification at all times\n\nGroup education sessions improved patient confidence in emergency injection from 68% to 91%. [16]',
    citation: [1, 15, 16],
    next: 'ai-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'ai-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Disposition depends on clinical severity, treatment response, and ability to tolerate oral medications.',
    citation: [2, 7],
    options: [
      {
        label: 'Adrenal Crisis / Hemodynamic Instability',
        next: 'ai-dispo-icu',
        urgency: 'critical',
      },
      {
        label: 'Acute Illness with Known AI',
        description: 'Cannot tolerate PO, needs IV steroids, or new diagnosis',
        next: 'ai-dispo-admit',
      },
      {
        label: 'Mild Presentation / Stable',
        description: 'Tolerating PO, hemodynamically stable, controlled symptoms',
        next: 'ai-dispo-discharge',
      },
    ],
  },

  {
    id: 'ai-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission criteria:**\n• Active adrenal crisis requiring IV hydrocortisone and vasopressors\n• Persistent hemodynamic instability despite fluid resuscitation\n• Altered mental status\n• Precipitating illness requiring ICU-level care (sepsis, major surgery)\n\n**ICU orders:**\n• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 200 mg/24h — continuous infusion preferred or 50 mg IV q6h\n• Aggressive IV fluids — NS ± D5\n• Glucose monitoring q1-2h (hypoglycemia common)\n• Electrolyte monitoring q4-6h (Na, K)\n• Treat precipitating cause\n• Endocrine consultation\n\nIn-hospital adrenal crisis mortality is <1% with prompt treatment, but rises significantly with delayed recognition. [2][4]',
    recommendation: 'Admit to ICU. Hydrocortisone 200 mg/24h continuous or 50 mg IV q6h. Treat precipitant. Endocrine consultation. Taper steroids as hemodynamics stabilize.',
    citation: [2, 4, 7],
  },

  {
    id: 'ai-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Admit to Floor',
    body: '**Floor admission criteria:**\n• Known AI with acute illness preventing oral intake\n• New AI diagnosis requiring inpatient workup\n• Stress-dose steroids needed but hemodynamically stable\n\n**Floor orders:**\n• [Hydrocortisone](#/drug/hydrocortisone/stress dose) 50 mg IV/PO q8h, taper to maintenance over 2-3 days\n• IV fluids until tolerating PO\n• Treat precipitating illness\n• Endocrine consultation for all new diagnoses\n• Education before discharge: sick-day rules, emergency injection kit, MedicAlert identification [1][2]',
    recommendation: 'Admit to floor. Stress-dose hydrocortisone with taper to maintenance. Endocrine consultation if new diagnosis. Ensure patient education and crisis prevention kit before discharge.',
    citation: [1, 2, 7],
  },

  {
    id: 'ai-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Follow-Up',
    body: '**ALL criteria must be met for discharge:**\n• Hemodynamically stable\n• Tolerating oral medications and fluids\n• Precipitating illness resolved or stable\n• Adequate steroid supply at home\n• Emergency injection kit available (or prescribed)\n• Patient understands sick-day rules\n\n**Discharge plan:**\n• Resume [Hydrocortisone](#/drug/hydrocortisone/maintenance) at maintenance dose (or increase to stress dose if illness ongoing)\n• [Fludrocortisone](#/drug/fludrocortisone/adrenal maintenance) if PAI (continue home dose)\n• Written sick-day action plan — [Sick-Day Rules & Stress Dosing Guide](#/info/ai-sick-day-rules)\n• Endocrine follow-up within 1-2 weeks\n• MedicAlert bracelet ordered if not already worn\n• Emergency hydrocortisone injection kit prescribed\n\n**Return precautions:**\n• Fever not responding to sick-day dosing\n• Persistent vomiting (>2 episodes — cannot take oral steroids)\n• Dizziness or lightheadedness despite increased steroid dose\n• Confusion or altered mental status\n• Inability to take oral steroids for any reason [1][15]',
    recommendation: 'Discharge on maintenance steroids with sick-day rules handout. Ensure emergency injection kit. Endocrine follow-up in 1-2 weeks.',
    citation: [1, 15, 16],
  },

  {
    id: 'ai-adrenal-hemorrhage',
    type: 'info',
    module: 6,
    title: 'Adrenal Hemorrhage',
    body: '**Waterhouse-Friderichsen syndrome:**\n• Bilateral adrenal hemorrhage, classically with meningococcal sepsis\n• Also seen with DIC, antiphospholipid syndrome, heparin-induced thrombocytopenia\n• CT abdomen: enlarged adrenals with hemorrhage (high-density on non-contrast CT)\n• Irreversible PAI — lifelong glucocorticoid + mineralocorticoid replacement\n\n**Anticoagulation-associated adrenal hemorrhage:**\n• Risk factors: heparin (including LMWH), HIT, warfarin, DOACs + critical illness\n• Presents as unexplained hemodynamic instability, flank/abdominal/back pain\n• CT abdomen is diagnostic\n• Management: hold or reverse anticoagulation if possible\n• Immediate [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 100 mg IV\n• Often bilateral → permanent PAI requiring lifelong replacement [2][4]',
    citation: [2, 4, 7],
    next: 'ai-disposition',
  },

  {
    id: 'ai-polyglandular',
    type: 'info',
    module: 6,
    title: 'Polyglandular Autoimmune Syndromes',
    body: '**Screen all autoimmune PAI patients for associated conditions:**\n\n**Type 1 (APS-1 / APECED):**\n• AI + hypoparathyroidism + chronic mucocutaneous candidiasis\n• AIRE gene mutation, childhood onset\n• Check: calcium, PTH, oral exam for candidiasis\n\n**Type 2 (Schmidt syndrome — most common polyglandular syndrome):**\n• AI + autoimmune thyroid disease (Hashimoto or Graves — most common association)\n• ± Type 1 diabetes, vitiligo, pernicious anemia, celiac disease, premature ovarian failure\n• Check: TSH, anti-TPO, HbA1c, vitamin B12\n\n**CRITICAL:** Treat cortisol BEFORE thyroid hormone — starting levothyroxine in untreated AI precipitates adrenal crisis because thyroxine accelerates cortisol clearance. Always establish glucocorticoid replacement first, then add levothyroxine. [1][5][8]',
    citation: [1, 5, 8],
    next: 'ai-maintenance',
  },

];

export const ADRENAL_INSUFFICIENCY_MODULE_LABELS = [
  'Initial Assessment',
  'Crisis Treatment',
  'Type Classification',
  'Diagnostic Workup',
  'Maintenance & Stress Dosing',
  'Disposition',
];

export const ADRENAL_INSUFFICIENCY_CITATIONS: Citation[] = [
  { num: 1, text: 'Bornstein SR, Allolio B, Arlt W, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2016;101(2):364-389.' },
  { num: 2, text: 'Rushworth RL, Torpy DJ, Falhammar H. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.' },
  { num: 3, text: 'Hahner S, Spinnler C, Fassnacht M, et al. High Incidence of Adrenal Crisis in Educated Patients With Chronic Adrenal Insufficiency: A Prospective Study. J Clin Endocrinol Metab. 2015;100(2):407-416.' },
  { num: 4, text: 'Puar TH, Stikkelbroeck NM, Smans LC, et al. Adrenal Crisis: Still a Deadly Event in the 21st Century. Am J Med. 2016;129(3):339.e1-339.e9.' },
  { num: 5, text: 'Husebye ES, Pearce SH, Krone NP, Kämpe O. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629.' },
  { num: 6, text: 'Vaidya A, Findling J, Bancos I. Adrenal Insufficiency in Adults. JAMA. 2025;334(8):714-725.' },
  { num: 7, text: 'Lentz S, Collier KC, Willis G, et al. Diagnosis and Management of Adrenal Insufficiency and Adrenal Crisis in the Emergency Department. J Emerg Med. 2022;63(2):212-220.' },
  { num: 8, text: 'Dong J, Hahner S, Bancos I, Tomlinson JW. Clinical Features, Investigation, and Management of Addison\'s Disease. Lancet Diabetes Endocrinol. 2026;S2213-8587(25)00393-6.' },
  { num: 9, text: 'Hahner S, Ross RJ, Arlt W, et al. Adrenal Insufficiency. Nat Rev Dis Primers. 2021;7(1):19.' },
  { num: 10, text: 'Simpson H, Tomlinson J, Wass J, et al. Guidance for the Prevention and Emergency Management of Adult Patients With Adrenal Insufficiency. Clin Med (Lond). 2020;20(4):371-378.' },
  { num: 11, text: 'Broersen LH, Pereira AM, Jorgensen JO, Dekkers OM. Adrenal Insufficiency in Corticosteroid Use: Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2015;100(6):2171-2180.' },
  { num: 12, text: 'de Vries F, Bruin M, Lobatto DJ, et al. Opioids and Their Endocrine Effects: A Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2020;105(3):1020-1029.' },
  { num: 13, text: 'Beuschlein F, Else T, Bancos I, et al. European Society of Endocrinology and Endocrine Society Joint Clinical Guideline: Diagnosis and Therapy of Glucocorticoid-Induced Adrenal Insufficiency. J Clin Endocrinol Metab. 2024;109(7):1657-1683.' },
  { num: 14, text: 'Ospina NS, Al Nofal A, Bancos I, et al. ACTH Stimulation Tests for the Diagnosis of Adrenal Insufficiency: Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2016;101(2):427-434.' },
  { num: 15, text: 'Burger-Stritt S, Kardonski P, Pulzer A, et al. Management of Adrenal Emergencies in Educated Patients With Adrenal Insufficiency — A Prospective Study. Clin Endocrinol (Oxf). 2018;89(1):22-29.' },
  { num: 16, text: 'Burger-Stritt S, Eff A, Quinkler M, et al. Standardised Patient Education in Adrenal Insufficiency: A Prospective Multi-Centre Evaluation. Eur J Endocrinol. 2020;183(2):119-127.' },
  { num: 17, text: 'Bosch NA, Teja B, Law AC, et al. Comparative Effectiveness of Fludrocortisone and Hydrocortisone vs Hydrocortisone Alone Among Patients With Septic Shock. JAMA Intern Med. 2023;183(5):451-459.' },
  { num: 18, text: 'Mosteller RD. Simplified Calculation of Body-Surface Area. N Engl J Med. 1987;317(17):1098.' },
];
