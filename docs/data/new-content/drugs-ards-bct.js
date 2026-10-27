// MedKitt - Drug entries for ARDS and blunt chest trauma.
// drug-store.ts merges DRUGS_ARDS_BCT into ALL_DRUGS and ADDITIONS_ARDS_BCT into the matching drug's dosing.
// Sources read 2026-10-27; each entry lists its citations.
//
// Source conflicts (show both, do not pick silently):
//  1. Cisatracurium ICU rate: label 3 mcg/kg/min (range 0.5-10.2) vs ACURASYS/ROSE fixed 37.5 mg/h.
//     At 70 kg the fixed rate = 8.9 mcg/kg/min; at 50 kg = 12.5 mcg/kg/min (above label top of 10.2).
//  2. Ropivacaine single-dose ceiling: review table 200 mg plain / 250 mg with epinephrine (3 mg/kg) vs
//     Naropin label major nerve block 0.75% up to 300 mg. weightCalc uses the LOWER ceiling.
//  3. ACURASYS dose and ROSE dose were confirmed from trial excerpts (see citations), not the full NEJM text.
// The same items are tracked in research/new-content/ards/signoff.md.
// -------------------------------------------------------------------
// New drug entries
// -------------------------------------------------------------------
const CISATRACURIUM = {
    id: 'cisatracurium',
    name: 'Cisatracurium (Nimbex)',
    genericName: 'Cisatracurium besylate',
    drugClass: 'Non-depolarizing neuromuscular blocker (intermediate-acting)',
    route: 'IV',
    indications: [
        'Adjunct to general anesthesia for tracheal intubation and skeletal muscle relaxation',
        'ICU mechanical ventilation (continuous infusion, adults)',
        'ARDS neuromuscular blockade (trial regimens only, not labeled)',
    ],
    dosing: [
        {
            indication: 'Tracheal intubation (label)',
            regimen: '**0.15-0.2 mg/kg IV bolus** (propofol or thiopental induction). Doses up to 0.4 mg/kg given safely. Maintenance bolus **0.03 mg/kg** starting 40-50 min after 0.15 mg/kg or 50-60 min after 0.2 mg/kg. Neuromuscular disease: max initial bolus **0.02 mg/kg**. Geriatric or ESRD: wait at least 1 min longer. Use a peripheral nerve stimulator.',
            weightCalc: [
                { dosePerKg: 0.15, unit: 'mg', label: 'Intubation start (low)' },
                { dosePerKg: 0.2, unit: 'mg', label: 'Intubation start (high)' },
            ],
        },
        {
            indication: 'ARDS neuromuscular blockade - ICU infusion (label)',
            regimen: '**Label ICU rate: 3 mcg/kg/min** (range 0.5-10.2 mcg/kg/min). Only after spontaneous recovery. After recovery it MAY be necessary to re-administer a bolus dose to re-establish blockade before starting the infusion (label). Titrate to peripheral nerve stimulation. Label table (0.1 mg/mL): 70 kg at 3 mcg/kg/min = 12.6 mg/h (126 mL/h). Label 14.3: infusion studied up to 6 days. No tachyphylaxis up to 3 h in label studies.\n\n**Conflict:** ACURASYS and ROSE used a FIXED 37.5 mg/h, not weight-based. See the trial-regimen row.',
        },
        {
            indication: 'ARDS neuromuscular blockade - ACURASYS trial regimen (not label)',
            regimen: '**Trial regimen, not labeled dosing.** **15 mg IV bolus, then 37.5 mg/h x 48 h.** Fixed dose: not weight-adjusted, not titrated to train-of-four (TOF prohibited to keep blinding). Deep sedation (Ramsay 6) established before the drug and kept throughout.\n\n**Rate check:** 37.5 mg/h = 625 mcg/min = **8.9 mcg/kg/min at 70 kg**, 12.5 at 50 kg, 6.25 at 100 kg. Under about 61 kg the fixed rate is above the label top rate of 10.2 mcg/kg/min. At 70 kg the label rate is 12.6 mg/h, so the trial rate is about 3x the label typical rate.\n\n**Result:** ACURASYS, n=340, early ARDS (<48 h, PaO2/FiO2 <150). 90-day in-hospital mortality 31.6% vs 40.7% crude (P=0.08). Adjusted HR 0.68 (95% CI 0.48-0.98, P=0.04). Barotrauma 5.1% vs 11.7%. Muscle strength not fully ascertained.',
        },
        {
            indication: 'ARDS neuromuscular blockade - ROSE trial regimen (not label)',
            regimen: '**Trial regimen, not labeled dosing.** Same 48 h cisatracurium regimen as ACURASYS (15 mg IV bolus, then 37.5 mg/h x 48 h) with deep sedation, compared with usual care and lighter sedation. ROSE (n=1006, moderate to severe ARDS). **90-day mortality 42.5% vs 42.8%** (P=0.93). ROSE stopped for futility at the second interim analysis.',
        },
    ],
    contraindications: [
        'Known hypersensitivity to cisatracurium (severe anaphylaxis reported)',
        '10 mL multiple-dose vials: contraindicated in infants <1 month and low birth-weight infants (benzyl alcohol)',
    ],
    cautions: [
        '**Paralysis without sedation:** a paralyzed patient cannot show neurologic change. Use appropriate sedation or anesthesia; label warns of distress (5.6)',
        '**Residual paralysis:** extubate only after recovery. Consider a reversal agent. Higher risk in myasthenia gravis, myasthenic syndrome and carcinomatosis',
        '**Potentiation:** inhalational anesthetics, aminoglycosides, tetracyclines, polymyxins, clindamycin, magnesium, lithium, local anesthetics, procainamide, quinidine. Acid-base and electrolyte derangement also potentiate',
        '**Resistance:** phenytoin and carbamazepine shorten block and raise infusion requirement',
        '**Malignant hyperthermia:** not studied in MH-susceptible patients',
        '**Prolonged ICU use:** ICU-acquired weakness and myopathy reported with neuromuscular blockers. ACURASYS and ROSE did not establish neuromuscular safety',
        '**Cardiovascular (ROSE):** more serious cardiovascular adverse events with routine blockade',
    ],
    monitoring: 'Train-of-four (TOF) on a peripheral nerve stimulator for label dosing. Sedation depth (Ramsay) and ventilator synchrony. Plateau pressure and dyssynchrony. Document the reason for blockade and a reassessment time. Reassess daily. Stop infusion and reassess when dyssynchrony is treated or the trial window (48 h) ends.',
    notes: '**Routine continuous blockade is NOT recommended for non-COVID ARDS** (ESICM 2023, strong recommendation against, moderate evidence). ACURASYS favored treatment on adjusted analysis, ROSE showed no mortality benefit and more cardiovascular events. The trials disagree. Treat dyssynchrony cause first (sedation, ventilator settings, patient effort). The ARDS consult node ards-nmb does not set a blockade dose; this entry documents the sources only.\n\nATS 2024 conditionally suggests blockade in early severe ARDS (low certainty). SCCM 2026 conditionally suggests blockade in adults with PaO2/FiO2 <150 who stay hypoxemic or miss ventilation targets despite sedation (low certainty). Both per secondary summary, not re-read in full.',
    citations: [
        'Nimbex (cisatracurium besylate) injection. AbbVie Inc. US Prescribing Information. Revised 10/2022, version 1496. DailyMed setid 3db3b76c-3e5a-456e-46a8-456fde1e6195 (newest set found 2026-10-27). Older set d90090b6-f8d6-ba32-018c-f4109ff43729 (revised 10/2019, version 10) has the same ICU infusion wording. Both sets carry marketing end dates (2021 and 2023): confirm local stock.',
        'Papazian L, Forel JM, Gacouin A, et al. Neuromuscular blockers in early acute respiratory distress syndrome (ACURASYS). N Engl J Med. 2010;363(12):1107-1116. doi:10.1056/NEJMoa1005372.',
        'Moss M, Huang DT, Brower RG, et al. Early neuromuscular blockade in the acute respiratory distress syndrome (ROSE). N Engl J Med. 2019;380(21):1997-2008. doi:10.1056/NEJMoa1901686.',
        'Grasselli G, Calfee CS, Camporota L, et al. ESICM guidelines on acute respiratory distress syndrome: definition, phenotyping and respiratory support strategies. Intensive Care Med. 2023;49(7):727-759. doi:10.1007/s00134-023-07050-7.',
        'Qadir N, Sahetya S, Munshi L, et al. An update on management of adult patients with acute respiratory distress syndrome: an official American Thoracic Society clinical practice guideline. Am J Respir Crit Care Med. 2024;209(1):24-36.',
        'Erstad BL, Cobas MA, Qadir N, et al. Society of Critical Care Medicine guidelines for the administration of neuromuscular blockade in adults with acute respiratory distress syndrome. Crit Care Med. 2026;54:634-643. doi:10.1097/CCM.0000000000007002.',
    ],
};
const ROPIVACAINE = {
    id: 'ropivacaine',
    name: 'Ropivacaine (Naropin)',
    genericName: 'Ropivacaine hydrochloride',
    drugClass: 'Amide local anesthetic (long-acting)',
    route: 'Epidural / perineural / infiltration',
    indications: [
        'Rib fracture regional anesthesia (chest wall block, off-label for named blocks)',
        'Rib fracture epidural analgesia (acute pain infusion)',
        'Surgical anesthesia (epidural, major nerve block, infiltration)',
        'Acute pain management (epidural infusion)',
    ],
    dosing: [
        {
            indication: 'Rib fracture regional block (chest wall)',
            regimen: '**Volume and concentration per local block protocol.** No primary-sourced volume for ESP, serratus or paravertebral blocks is set in this entry.\n\n**Default ceiling (use the lower value):**\n- Systemic: **3 mg/kg, max 200 mg plain** (250 mg with epinephrine). Review table (El-Boghdadly 2018).\n- Label (Naropin): major nerve block 0.5% 175-250 mg; 0.75% 75-300 mg. Field block 0.5% 5-200 mg. Infiltration 0.2% and 0.5% up to 200 mg. Label does NOT state a mg/kg limit.\n\n**Label maximum:** 300 mg per major nerve block (0.75%, Naropin label). The default above (200 mg plain, 250 mg with epinephrine) is the review-table value and is what weightCalc uses.\n\nFractional (incremental) doses. Test dose 3-5 mL of a short-acting LA with epinephrine before complete block (label, epidural). Aspirate.',
            weightCalc: [
                { dosePerKg: 3, unit: 'mg', maxDose: 200, label: 'Plain (review-table ceiling)' },
                { dosePerKg: 3, unit: 'mg', maxDose: 250, label: 'With epinephrine (review-table ceiling)' },
            ],
        },
        {
            indication: 'Rib fracture epidural analgesia (acute pain infusion; off-label extrapolation from postoperative labeling)',
            regimen: '**Label acute pain regimen (postoperative):** epidural 0.2% (2 mg/mL), infusion **6-14 mL/h (12-28 mg/h)**. Initial block 5-7 mL of 0.2% or bolus per label. Incremental top-up 10-15 mL/h (20-30 mg/h) in labor. Label: cumulative doses up to **770 mg per 24 h** (block plus infusion) were well tolerated in adults (postoperative use). Experience up to 72 h of infusion (label). Caution beyond 70 h in debilitated patients. Note: label infusion is mg/h, not mg/kg.',
        },
        {
            indication: 'Surgical anesthesia (label)',
            regimen: 'Label Table 1 ranges (adult, surgical anesthesia, by concentration): lumbar epidural 0.5% 75-150 mg; 0.75% 113-188 mg; 1% 150-200 mg. Thoracic epidural (cesarean) 0.5% 25-75 mg. Major nerve block 0.5% 175-250 mg; 0.75% 75-300 mg. Field block 0.5% 5-200 mg. Infiltration 0.2% 2-200 mg. Guidelines only; use the smallest effective dose.',
        },
    ],
    contraindications: [
        'Known hypersensitivity to ropivacaine or any amide-type local anesthetic',
    ],
    cautions: [
        '**LAST (local anesthetic systemic toxicity):** CNS signs first (tinnitus, perioral numbness, metallic taste, restlessness, twitching), then cardiovascular collapse. Stop at first sign. Oxygen and airway ready before any block (label 5.1)',
        '**Intravascular injection:** aspirate; inject incrementally; IV line in place before major block (label 5.1, 5.8)',
        '**Cardiovascular impairment:** higher risk with heart conduction block or severe cardiac disease (label 5.12)',
        '**Hepatic and renal impairment:** dose adjustment; plasma levels higher (label 8.6, 8.7)',
        '**Brachial plexus block:** 300 mg dose linked to systemic toxicity in label (5.7). Supraclavicular blocks higher serious-reaction rate',
        '**Methemoglobinemia** (label 5.4) and additive effects with other LAs (label 5.13)',
        '**Epidural:** test dose; epidural catheter displacement needs repeat test (label 2.1)',
        'Not for intra-articular infusion (chondrolysis, label 5.3)',
    ],
    monitoring: 'Continuous ECG and SpO2 during and after large or repeated blocks. Mental status after each injection and during infusion (label 5.1, 5.5). Limb motor and sensory checks in rib fracture blocks. Watch infusion rate, cumulative mg per 24 h, and catheter site. Watch for LAST after each injection and during infusion (label 5.5).',
    notes: '**LAST warning:** ropivacaine has a higher CC/CNS ratio than bupivacaine, so CNS signs come first. Label says symptomatic and supportive treatment only; no specific antidote. **Lipid rescue: follow the local LAST checklist (ASRA 2017).**\n\nThe BCT tree cites EAST 2016 for epidural analgesia (conditional), a volunteer MRI study for serratus spread (not a rib fracture study), and no trial for erector spinae blocks. Paravertebral, intrapleural and intercostal infusion: EAST rated very low quality, no recommendation. Opioid-sparing effect not established.',
    citations: [
        'Naropin (ropivacaine hydrochloride) injection, for epidural, perineural, or infiltration use. Fresenius Kabi USA, LLC. US Prescribing Information. Revised 7/2026 (label text also shows 5/2026). DailyMed setid cb6583ff-cde4-4280-aa5b-0bea2b844792.',
        'El-Boghdadly K, Pawa A, Chin KJ. Local anesthetic systemic toxicity: current perspectives. Local Reg Anesth. 2018;11:35-44. doi:10.2147/LRA.S154512. PMID 30122981. Table 1 (suggested maximum doses).',
        'The American Society of Regional Anesthesia and Pain Medicine checklist for managing local anesthetic systemic toxicity: 2017 version. Reg Anesth Pain Med. 2018;43(2):150-153. doi:10.1097/AAP.0000000000000726. (Title and PMID 29356775 confirmed; authors not verified. Lipid dose not taken from this source in this pass.)',
    ],
};
// -------------------------------------------------------------------
// Export: new drugs
// -------------------------------------------------------------------
export const DRUGS_ARDS_BCT = [
    CISATRACURIUM,
    ROPIVACAINE,
];
// -------------------------------------------------------------------
// Export: additive dosing rows for drugs that already exist in drug-store.ts
// -------------------------------------------------------------------
// Ketorolac: BCT link #/drug/ketorolac/acute pain does not match any existing dosing indication
// ("SCD pain crisis", "Migraine - IV NSAID"). This row makes the hint resolve.
const KETOROLAC_ACUTE_PAIN = {
    indication: 'Acute pain - short-term, opioid-level (adult, 5 days max)',
    regimen: '**Label (Hospira injection, rev 11/2024):** short-term (up to 5 days combined IV/IM plus oral) for moderately severe acute pain needing opioid-level analgesia. Not for minor or chronic pain. Start IV or IM, not oral.\n\n**Single dose:** <65 y: **30 mg IV** or **60 mg IM**. >=65 y, renal impairment or <50 kg: **15 mg IV** or **30 mg IM**.\n\n**Multiple dose (IV or IM):** <65 y: **30 mg q6h, max 120 mg/day**. >=65 y, renal impairment or <50 kg: **15 mg q6h, max 60 mg/day**. Do not increase for breakthrough pain; add opioid if needed.\n\n**BOXED WARNING:** GI bleeding and perforation, CV thrombotic events, renal risk, bleeding risk. Contraindicated with hypovolemia not corrected, labor and delivery, neuraxial or intraoperative use, aspirin or other NSAIDs, and prior aspirin or NSAID allergy. Check bleeding, renal function and anticoagulation before dosing (BCT tree).',
};
export const ADDITIONS_ARDS_BCT = [
    {
        drugId: 'ketorolac',
        dosing: [KETOROLAC_ACUTE_PAIN],
        indications: ['Acute pain - short-term, opioid-level (adult, 5 days max)'],
    },
];
