// MedKitt - Pediatric STEC/HUS
// Shiga toxin-producing E. coli and Hemolytic Uremic Syndrome
// 5 modules: Recognition -> Workup -> Management -> HUS Treatment -> Disposition
// Based on AAP, CDC, and current pediatric nephrology guidelines

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const PEDS_STEC_HUS_CRITICAL_ACTIONS = [
  { text: 'Check labs: CBC, BMP, LDH, retic, haptoglobin', nodeId: 'stec-workup' },
  { text: 'Stool: Shiga toxin EIA (do NOT rely on culture alone)', nodeId: 'stec-workup' },
  { text: 'Monitor daily for HUS triad (MAHA, thrombocytopenia, AKI)', nodeId: 'stec-monitoring' },
  { text: 'Do NOT give antibiotics (may increase HUS risk)', nodeId: 'stec-abx-controversy' },
  { text: 'Do NOT give antimotility agents (contraindicated in bloody diarrhea)', nodeId: 'stec-abx-controversy' },
  { text: 'Aggressive IV fluids (maintain euvolemia to reduce HUS severity)', nodeId: 'stec-management' },
  { text: 'Dialysis if anuria >24h, K >6.5, severe acidosis, volume overload', nodeId: 'hus-dialysis' },
  { text: 'Consult nephrology early if HUS features developing', nodeId: 'hus-evolving' },
  { text: 'Monitor for CNS complications (seizures, AMS)', nodeId: 'hus-cns' },
  { text: 'Avoid platelet transfusion unless life-threatening bleeding', nodeId: 'hus-transfusion' },
];

export const PEDS_STEC_HUS_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Recognition & Risk Assessment
  // ===================================================================
  {
    id: 'stec-start',
    type: 'info',
    module: 1,
    title: 'STEC/HUS Overview',
    body: '**Shiga toxin-producing E. coli (STEC)** is a leading cause of acute kidney injury in children. [1]\n\n**Key epidemiology:**\n- Peak incidence: children <5 years old\n- Most common serotype: O157:H7 (but non-O157 increasing)\n- Seasonal peak: summer months (May-September)\n- 5-15% of STEC cases progress to HUS [1,2]\n\n**HUS Triad:** [2]\n1. **Microangiopathic hemolytic anemia** (MAHA)\n2. **Thrombocytopenia** (<150,000/µL)\n3. **Acute kidney injury** (oliguria, elevated Cr)\n\n**Timeline:**\n- Prodromal diarrhea: Day 0\n- Bloody diarrhea: Days 1-3\n- HUS onset: Days 5-10 (typically Day 7)\n\n**Risk factors for HUS progression:** [1,3]\n- Age <5 years\n- Bloody diarrhea\n- Fever\n- Elevated WBC (>13,000)\n- Antibiotic or antimotility use',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'corrected-na', label: 'Corrected Na Calculator' },
    ],
    next: 'stec-clinical',
  },
  {
    id: 'stec-clinical',
    type: 'info',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Prodromal phase (STEC colitis):** [1,2]\n- Watery diarrhea → bloody diarrhea (60-90%)\n- Severe abdominal cramping\n- Nausea/vomiting\n- Low-grade or no fever (distinguishes from other bacterial causes)\n- Duration: 3-8 days\n\n**HUS phase:** [2,3]\n- Pallor, fatigue (anemia)\n- Petechiae, bruising (thrombocytopenia)\n- Decreased urine output (AKI)\n- Edema, hypertension\n- Irritability, lethargy\n\n**Severe HUS features (poor prognosis):** [3]\n- Anuria >24 hours\n- WBC >20,000\n- Hematocrit <23%\n- Need for RBC transfusion within 4 days\n- CNS involvement (seizures, altered mental status)\n- Bowel necrosis/perforation\n\n**Key point:** HUS can occur without preceding diarrhea in ~10% of cases (atypical presentation).',
    citation: [1, 2, 3],
    next: 'stec-exposure',
  },
  {
    id: 'stec-exposure',
    type: 'info',
    module: 1,
    title: 'Exposure Sources',
    body: '**Common exposure sources:** [1,4]\n\n**Food-borne (most common):**\n- Undercooked ground beef (hamburger disease)\n- Raw/unpasteurized milk and cheese\n- Raw vegetables (lettuce, spinach, sprouts)\n- Apple cider (unpasteurized)\n- Contaminated water\n\n**Animal contact:**\n- Petting zoos\n- Farm visits\n- Direct cattle/livestock exposure\n\n**Person-to-person:**\n- Daycare outbreaks\n- Household contacts\n- Fecal-oral transmission (very low inoculum needed: 10-100 organisms)\n\n**Incubation period:** 2-10 days (median 3-4 days) [1]\n\n**Public health consideration:**\n- STEC is reportable to public health\n- Contact investigation may be needed\n- Childcare exclusion until 2 negative stool cultures ≥24h apart [4]',
    citation: [1, 4],
    next: 'stec-branch',
  },
  {
    id: 'stec-branch',
    type: 'question',
    module: 1,
    title: 'Current Presentation',
    body: 'What is the current clinical presentation? [2,3]',
    citation: [2, 3],
    options: [
      {
        label: 'Bloody diarrhea, no HUS features',
        description: 'Prodromal STEC colitis without evidence of hemolysis or AKI',
        next: 'stec-workup',
      },
      {
        label: 'HUS triad present',
        description: 'MAHA + thrombocytopenia + AKI - established HUS',
        next: 'hus-severity',
        urgency: 'urgent',
      },
      {
        label: 'Evolving/early HUS',
        description: 'Some HUS features developing (day 5-10 of illness)',
        next: 'hus-evolving',
        urgency: 'urgent',
      },
    ],
  },

  // ===================================================================
  // MODULE 2: Diagnostic Workup
  // ===================================================================
  {
    id: 'stec-workup',
    type: 'info',
    module: 2,
    title: 'STEC Diagnostic Workup',
    body: '**Essential labs:** [1,5]\n\n**Stool studies:**\n- Stool culture on sorbitol-MacConkey agar (O157)\n- **Shiga toxin EIA** (detects Stx1 and Stx2) - MOST IMPORTANT\n- Stool PCR for Shiga toxin genes (if available)\n\n**Blood work (baseline for HUS monitoring):**\n- CBC with smear (look for schistocytes)\n- BMP (creatinine, BUN, electrolytes)\n- LDH (elevated in hemolysis)\n- Reticulocyte count\n- Haptoglobin (decreased in hemolysis)\n- Direct Coombs (negative in MAHA)\n- Urinalysis (hematuria, proteinuria)\n\n**Key points:** [5]\n- Shiga toxin EIA is most sensitive (order on ALL bloody diarrhea in children)\n- Culture alone misses 50% of STEC (non-O157 strains)\n- Continue monitoring labs q12-24h during high-risk window (days 5-10)\n\n**Not recommended:** [1]\n- Fecal lactoferrin, fecal calprotectin (not useful)\n- Abdominal imaging (unless surgical concern)',
    images: [{ src: 'images/peds-stec-hus/schistocytes.jpg', alt: 'Peripheral blood smear showing schistocytes (fragmented red blood cells and helmet cells) in microangiopathic hemolytic anemia', caption: 'Schistocytes on blood smear — hallmark of microangiopathic hemolytic anemia (MAHA) in HUS. Fragmented RBCs indicate intravascular shearing from fibrin strands. (CC0)' }],
    citation: [1, 5],
    next: 'stec-monitoring',
  },
  {
    id: 'stec-monitoring',
    type: 'info',
    module: 2,
    title: 'HUS Monitoring Protocol',
    body: '**All confirmed/suspected STEC cases require close monitoring for HUS development.** [2,3]\n\n**High-risk monitoring schedule (days 5-10 post-diarrhea onset):**\n\n| Day | Labs | Clinical Check |\n|-----|------|----------------|\n| Daily | CBC, BMP, LDH, retic | Urine output, weight, BP |\n\n**Early HUS warning signs:** [3]\n- Hemoglobin drop >2 g/dL\n- Platelet drop >50% or <150,000\n- LDH rising (>2x normal)\n- Creatinine rising\n- Haptoglobin <10\n- Schistocytes on smear\n- Oliguria (<0.5 mL/kg/hr)\n\n**When to intensify monitoring:**\n- Age <5 years\n- Bloody diarrhea\n- WBC >13,000\n- Any lab trend toward HUS\n\n**Outpatient vs inpatient:** [2]\n- Admit if: dehydration, unable to tolerate PO, any lab abnormality, age <2 years\n- Close outpatient follow-up acceptable for well-appearing older children with normal labs',
    citation: [2, 3],
    next: 'stec-management',
  },
  {
    id: 'hus-evolving',
    type: 'info',
    module: 2,
    title: 'Evolving HUS Workup',
    body: '**Patient with early/evolving HUS features requires aggressive workup.** [2,3]\n\n**Confirm HUS triad:**\n1. **Anemia:** Hgb <10, with schistocytes on smear, elevated LDH, low haptoglobin\n2. **Thrombocytopenia:** Platelets <150,000\n3. **AKI:** Creatinine elevated above baseline for age\n\n**Additional workup:** [5]\n- Coagulation studies (PT/INR, PTT, fibrinogen) - usually normal in typical HUS\n- Complement studies (C3, C4, AH50, CH50) - if atypical HUS suspected\n- ADAMTS13 activity - rule out TTP (usually >10% in typical HUS)\n- Blood type and screen (anticipate transfusion)\n\n**Distinguish typical vs atypical HUS:** [5]\n\n| Feature | Typical (STEC-HUS) | Atypical (aHUS) |\n|---------|-------------------|------------------|\n| Diarrhea prodrome | Yes (90%) | No |\n| Shiga toxin | Positive | Negative |\n| Complement | Normal | Often low C3 |\n| Recurrence | Rare | Common |\n| Age | <5 years | Any age |\n\n**Atypical HUS requires eculizumab - consult nephrology urgently.**',
    citation: [2, 3, 5],
    next: 'hus-severity',
  },

  // ===================================================================
  // MODULE 3: STEC Management (Pre-HUS)
  // ===================================================================
  {
    id: 'stec-management',
    type: 'info',
    module: 3,
    title: 'STEC Colitis Management',
    body: '**Management goals:** [1,2]\n- Supportive care\n- Avoid interventions that increase HUS risk\n- Close monitoring for HUS development\n\n**Fluid management:**\n- Aggressive IV fluid resuscitation\n- Maintain euvolemia (key to reducing HUS severity)\n- Goal: UOP 1-2 mL/kg/hr\n- D5NS or D5LR at 1.5x maintenance\n\n**Diet:**\n- NPO initially if severe vomiting\n- Advance to clear liquids → bland diet as tolerated\n- Avoid lactose during acute illness\n\n**Antiemetics:**\n- Ondansetron PRN for nausea/vomiting\n- Avoid promethazine (CNS effects confuse assessment)\n\n**Pain management:**\n- Acetaminophen for cramping\n- Avoid NSAIDs (renal risk, bleeding risk)\n- Avoid opioids if possible (ileus risk)',
    citation: [1, 2],
    next: 'stec-abx-controversy',
  },
  {
    id: 'stec-abx-controversy',
    type: 'info',
    module: 3,
    title: 'The Antibiotic Controversy',
    body: '**CRITICAL: Antibiotics for STEC are CONTROVERSIAL and generally NOT recommended.** [1,2,6]\n\n**Why avoid antibiotics:** [6]\n- Meta-analyses show antibiotics may INCREASE HUS risk\n- Bacterial lysis releases more Shiga toxin\n- Quinolones and TMP-SMX most associated with risk\n- Even bactericidal antibiotics at sub-MIC can induce toxin\n\n**2024 AAP/IDSA position:** [1]\n- **Do NOT routinely give antibiotics for suspected STEC**\n- Hold antibiotics until stool Shiga toxin results known\n- If already started antibiotics, consider stopping if STEC confirmed\n\n**When antibiotics MAY be considered:** [2,6]\n- Septic-appearing child\n- Immunocompromised patient\n- Confirmed non-STEC bacterial pathogen\n\n**Antimotility agents (loperamide, diphenoxylate):** [1]\n- **CONTRAINDICATED** in bloody diarrhea\n- Associated with increased HUS risk and prolonged illness\n- Toxic megacolon risk\n\n**Bottom line:** Supportive care only. No antibiotics, no antimotility agents.',
    citation: [1, 2, 6],
    next: 'stec-disposition-pre',
  },
  {
    id: 'stec-disposition-pre',
    type: 'question',
    module: 3,
    title: 'STEC Disposition',
    body: 'Based on clinical assessment, determine disposition for STEC colitis without current HUS features: [2]',
    citation: [2],
    options: [
      {
        label: 'Admit for monitoring',
        description: 'High-risk features, unable to tolerate PO, lab abnormalities',
        next: 'stec-admit',
      },
      {
        label: 'Discharge with close follow-up',
        description: 'Well-appearing, tolerating PO, normal labs, reliable family',
        next: 'stec-discharge',
      },
    ],
  },
  {
    id: 'stec-admit',
    type: 'info',
    module: 3,
    title: 'Admission for STEC Monitoring',
    body: '**Admit for:**\n- IV fluids and close monitoring\n- Daily CBC, BMP, LDH, reticulocyte count\n- Strict I/O with urine output tracking\n- Serial weights\n\n**Nursing instructions:**\n- Contact precautions\n- Notify MD immediately if: UOP <0.5 mL/kg/hr, new pallor, new petechiae/bruising, altered mental status, seizure\n\n**Anticipated length of stay:**\n- Minimum 5-7 days (through HUS risk window)\n- Longer if HUS develops\n\n**Consults to consider:**\n- Pediatric nephrology (early if any renal concerns)\n- Pediatric GI (if severe colitis)\n- Infectious disease (for atypical cases)',
    citation: [2, 3],
    next: 'hus-severity',
  },
  {
    id: 'stec-discharge',
    type: 'result',
    module: 3,
    title: 'Discharge with Follow-up',
    body: '**Discharge criteria:** [2]\n- Tolerating adequate oral fluids\n- Normal or stable hemoglobin\n- Normal platelets\n- Normal creatinine\n- Normal urine output\n- Reliable family with transportation\n\n**Discharge instructions:**\n- Return precautions: decreased urination, blood in urine, increased pallor, confusion, seizure, worsening abdominal pain\n- Strict hand hygiene\n- No school/daycare until cleared by health department\n\n**Follow-up schedule:**\n- Labs (CBC, BMP) in 24-48 hours\n- Daily phone check-in with clinic\n- Return immediately if any concerning symptoms\n- Monitor through Day 10-14 post-diarrhea onset\n\n**Public health:**\n- Report confirmed STEC to local health department\n- Provide exposure counseling',
    recommendation: 'Discharge with strict return precautions and daily lab monitoring through HUS risk window (Day 10-14).',
    confidence: 'consider',
    citation: [2],
  },

  // ===================================================================
  // MODULE 4: HUS Treatment
  // ===================================================================
  {
    id: 'hus-severity',
    type: 'info',
    module: 4,
    title: 'HUS Severity Assessment',
    body: '**Assess HUS severity to guide management intensity.** [3,7]\n\n**Mild HUS:**\n- Platelets 100,000-150,000\n- Creatinine <2x upper normal for age\n- Preserved urine output (>0.5 mL/kg/hr)\n- No hypertension\n- No CNS symptoms\n\n**Moderate HUS:**\n- Platelets 50,000-100,000\n- Creatinine 2-4x upper normal\n- Oliguria but responsive to fluids\n- Mild hypertension\n- No CNS symptoms\n\n**Severe HUS:**\n- Platelets <50,000\n- Anuria or need for dialysis\n- Severe hypertension requiring multiple agents\n- CNS involvement (seizures, encephalopathy)\n- Pancreatitis\n- Cardiac involvement\n\n**Poor prognostic indicators:** [3]\n- WBC >20,000 at presentation\n- Anuria >24 hours\n- Need for dialysis in first 48 hours\n- CNS involvement\n- Age <2 years',
    citation: [3, 7],
    next: 'hus-fluids',
  },
  {
    id: 'hus-fluids',
    type: 'info',
    module: 4,
    title: 'HUS Fluid Management',
    body: '**Fluid management is critical in HUS.** [2,7]\n\n**Early/oliguric phase:**\n- Aggressive volume expansion may improve outcomes if given early (pre-anuric phase)\n- Goal: maintain euvolemia, support renal perfusion\n- 20 mL/kg NS boluses as needed for dehydration\n- Once euvolemic: maintenance + insensible losses\n\n**Anuric phase:**\n- Strict fluid restriction (insensible losses only: 300-400 mL/m²/day)\n- Daily weights critical\n- Avoid fluid overload (pulmonary edema, hypertension)\n\n**Key principle:** [7]\n- **Early aggressive fluids BEFORE anuria may prevent dialysis**\n- Once anuric, minimize fluids to prevent volume overload\n\n**Electrolyte management:**\n- Hyperkalemia common → cardiac monitor, ECG, kayexalate/insulin-glucose PRN\n- Hyponatremia → usually dilutional, restrict fluids\n- Hypocalcemia → correct if symptomatic\n- Acidosis → usually corrected with dialysis if severe',
    citation: [2, 7],
    next: 'hus-transfusion',
  },
  {
    id: 'hus-transfusion',
    type: 'info',
    module: 4,
    title: 'Transfusion Guidelines',
    body: '**RBC transfusion:** [2,7]\n- Transfuse for symptomatic anemia or Hgb <7 g/dL\n- Use irradiated, leukoreduced PRBCs\n- Transfuse slowly (2-4 hours) to avoid volume overload\n- Target Hgb 8-9 g/dL (avoid overtransfusion)\n\n**Platelet transfusion:** [7]\n- **Generally AVOID in typical HUS**\n- Platelets may worsen microvascular thrombosis\n- Consider ONLY if:\n  - Active life-threatening bleeding\n  - Planned invasive procedure with platelets <50,000\n  - CNS hemorrhage\n\n**FFP:**\n- Not indicated in typical STEC-HUS\n- May be harmful (provides more substrate for microangiopathy)\n- Reserved for atypical HUS or TTP\n\n**Special considerations:**\n- Avoid platelet transfusion unless critical\n- Document discussion with hematology if platelets given\n- CMV-negative blood products if possible',
    citation: [2, 7],
    next: 'hus-htn',
  },
  {
    id: 'hus-htn',
    type: 'info',
    module: 4,
    title: 'Hypertension Management',
    body: '**Hypertension is common in HUS and requires treatment.** [3,7]\n\n**Causes:**\n- Volume overload\n- Renal failure with RAAS activation\n- Microangiopathic damage to renal vasculature\n\n**Treatment approach:**\n\n**First-line (volume-dependent):**\n- Fluid restriction\n- Dialysis/ultrafiltration if fluid overloaded\n\n**Antihypertensive agents:** [7]\n\n| Agent | Dose | Notes |\n|-------|------|-------|\n| Amlodipine | 0.1-0.5 mg/kg/day PO | First-line oral |\n| Isradipine | 0.05-0.1 mg/kg/dose q6-8h | Short-acting, good for titration |\n| Nicardipine | 0.5-3 mcg/kg/min IV | Hypertensive emergency |\n| Labetalol | 0.2-1 mg/kg/dose IV | Alternative for emergency |\n| Hydralazine | 0.1-0.2 mg/kg IV q4-6h | Adjunct |\n\n**Avoid:**\n- ACE inhibitors/ARBs acutely (hyperkalemia risk in AKI)\n\n**Goals:**\n- Reduce BP to <95th percentile for age/height\n- Avoid rapid drops (risk of stroke in setting of thrombotic microangiopathy)',
    citation: [3, 7],
    next: 'hus-dialysis',
  },
  {
    id: 'hus-dialysis',
    type: 'info',
    module: 4,
    title: 'Dialysis Indications',
    body: '**~50-70% of children with STEC-HUS require dialysis.** [3,7]\n\n**Dialysis indications:** [7]\n- Anuria >24 hours\n- Severe hyperkalemia (K >6.5 or ECG changes)\n- Severe acidosis (pH <7.1, HCO3 <10)\n- Volume overload with pulmonary edema\n- Uremic encephalopathy\n- Severe hypertension refractory to medications\n- BUN >80-100 mg/dL\n\n**Modality:** [7]\n- **Peritoneal dialysis** often preferred in young children\n  - Gentler hemodynamics\n  - No anticoagulation needed\n  - Can do at bedside\n- **Hemodialysis** for severe hyperkalemia, rapid correction needed\n- **CRRT** if hemodynamically unstable\n\n**Duration:**\n- Typically 1-2 weeks\n- Most children recover renal function\n- ~25% may need long-term dialysis\n\n**Avoid heparin anticoagulation if possible** (bleeding risk with low platelets)',
    citation: [3, 7],
    next: 'hus-cns',
  },
  {
    id: 'hus-cns',
    type: 'info',
    module: 4,
    title: 'CNS Complications',
    body: '**CNS involvement occurs in 20-30% of HUS and is the major cause of mortality.** [3,8]\n\n**CNS manifestations:**\n- Irritability, lethargy\n- Seizures (most common)\n- Altered mental status, coma\n- Stroke (ischemic or hemorrhagic)\n- Cortical blindness\n- Hemiparesis\n\n**Pathophysiology:**\n- Microangiopathic thrombosis in cerebral vessels\n- Direct Shiga toxin neurotoxicity\n- Hypertensive encephalopathy\n- Uremic encephalopathy\n\n**Management:** [8]\n- Urgent neuroimaging (MRI preferred, CT if unstable)\n- Seizure management: lorazepam → levetiracetam (renally adjust)\n- Control hypertension aggressively\n- Correct metabolic derangements\n- ICU admission\n- Consider eculizumab for severe neurologic HUS (off-label but emerging evidence)\n\n**Prognosis:**\n- CNS involvement increases mortality to 3-5%\n- Most survivors recover, but some have long-term neurologic sequelae',
    citation: [3, 8],
    next: 'hus-eculizumab',
  },
  {
    id: 'hus-eculizumab',
    type: 'info',
    module: 4,
    title: 'Eculizumab in HUS',
    body: '**Eculizumab is FDA-approved for atypical HUS, NOT typical STEC-HUS.** [5,8]\n\n**What is eculizumab:**\n- Monoclonal antibody against complement C5\n- Blocks terminal complement activation\n- Highly effective in atypical HUS (complement-mediated)\n\n**Use in STEC-HUS:** [8]\n- NOT standard of care\n- Shiga toxin activates complement, providing theoretical rationale\n- Case reports/series of benefit in severe STEC-HUS\n- Consider in:\n  - Severe CNS involvement\n  - Rapidly progressive multiorgan failure\n  - Atypical features or uncertain diagnosis\n\n**Before eculizumab:** [5]\n- Meningococcal vaccination required (or prophylactic antibiotics)\n- Complement studies (C3, C4, AH50) sent first\n- ADAMTS13 to rule out TTP\n\n**Dosing:**\n- Weight-based per manufacturer guidelines\n- Requires close coordination with hematology/nephrology\n\n**Bottom line:** Discuss with nephrology for severe HUS; not routine for typical STEC-HUS.',
    citation: [5, 8],
    next: 'hus-complications',
  },
  {
    id: 'hus-complications',
    type: 'info',
    module: 4,
    title: 'Other HUS Complications',
    body: '**Monitor for and treat additional complications:** [3,7]\n\n**Cardiac:**\n- Myocardial dysfunction (Shiga toxin effect)\n- Pericardial effusion\n- Arrhythmias (electrolyte-related)\n- Consider echo if hemodynamically unstable\n\n**GI:**\n- Colonic necrosis/perforation (surgical emergency)\n- Intussusception\n- Rectal prolapse\n- Pancreatitis (check lipase)\n- Hepatitis\n\n**Hematologic:**\n- Severe bleeding (rare)\n- DIC (usually not true DIC in HUS)\n\n**Endocrine:**\n- New-onset diabetes (pancreatic islet damage) - may be transient or permanent\n- Monitor glucose closely\n\n**Surgical consultation:**\n- Worsening abdominal pain\n- Peritoneal signs\n- Free air on imaging\n- Colonic perforation mortality is high',
    citation: [3, 7],
    next: 'hus-dispo',
  },

  // ===================================================================
  // MODULE 5: Disposition & Prognosis
  // ===================================================================
  {
    id: 'hus-dispo',
    type: 'question',
    module: 5,
    title: 'HUS Disposition',
    body: 'Determine appropriate level of care for HUS patient: [3,7]',
    citation: [3, 7],
    options: [
      {
        label: 'PICU admission',
        description: 'Severe HUS, dialysis required, CNS involvement, unstable',
        next: 'hus-icu',
        urgency: 'critical',
      },
      {
        label: 'Floor with nephrology',
        description: 'Mild-moderate HUS, stable, close monitoring',
        next: 'hus-floor',
      },
    ],
  },
  {
    id: 'hus-icu',
    type: 'result',
    module: 5,
    title: 'PICU Admission',
    body: '**PICU admission criteria:** [3,7]\n- Dialysis required or anticipated\n- Severe hypertension requiring IV antihypertensives\n- CNS involvement (seizures, altered mental status)\n- Respiratory distress/pulmonary edema\n- Hemodynamic instability\n- Need for frequent blood products\n- Severe anemia (Hgb <6)\n- Surgical complications (bowel necrosis)\n\n**PICU management:**\n- Continuous cardiac monitoring\n- Arterial line for BP monitoring if labile\n- Central access for dialysis if needed\n- Strict I/O and daily weights\n- Nephrology co-management\n- Serial labs q6-12h initially\n\n**Expected course:**\n- Peak illness: Days 7-14\n- Platelet recovery: first sign of improvement\n- Renal recovery: may lag weeks-months\n- Average PICU stay: 1-2 weeks',
    recommendation: 'Admit to PICU with nephrology and hematology consultation. Monitor for multiorgan complications.',
    confidence: 'definitive',
    citation: [3, 7],
  },
  {
    id: 'hus-floor',
    type: 'result',
    module: 5,
    title: 'Floor Admission',
    body: '**Floor admission criteria:** [2,7]\n- Stable vital signs\n- No dialysis indication (yet)\n- Manageable hypertension with oral agents\n- No CNS symptoms\n- Maintaining some urine output\n\n**Floor management:**\n- Strict I/O with q1h urine output\n- Daily weights\n- Cardiac monitor\n- Labs q12-24h (CBC, BMP, LDH, retic)\n- Nephrology consultation\n\n**Escalation criteria (call rapid/transfer to PICU):**\n- Anuria >12 hours\n- K >6.0\n- Severe hypertension (>99th percentile)\n- New neurologic symptoms\n- Respiratory distress\n- Hemodynamic instability\n\n**Family counseling:**\n- Most children recover completely\n- 70-85% full renal recovery\n- Long-term follow-up with nephrology required\n- Monitor for proteinuria, hypertension for years',
    recommendation: 'Admit to floor with nephrology consultation and strict monitoring. Low threshold for PICU escalation.',
    confidence: 'consider',
    citation: [2, 7],
  },
  {
    id: 'hus-prognosis',
    type: 'info',
    module: 5,
    title: 'HUS Prognosis & Follow-up',
    body: '**Outcomes of STEC-HUS:** [3,7,8]\n\n**Short-term:**\n- Mortality: 1-3% (higher with CNS involvement)\n- Dialysis required: 50-70%\n- RBC transfusion required: 80%+\n\n**Long-term renal outcomes:**\n- Complete recovery: 70-85%\n- CKD: 10-25%\n- ESRD: 3-5%\n- Hypertension: 10-20%\n- Proteinuria: 15-30%\n\n**Risk factors for poor renal outcome:**\n- Anuria >2 weeks\n- Dialysis >4 weeks\n- Age <2 years\n- Severe CNS disease\n\n**Long-term follow-up required:** [7]\n- Nephrology follow-up at 1 month, 3 months, 6 months, annually\n- Monitor: BP, urinalysis, creatinine, urine protein\n- Consider renal biopsy if persistent abnormalities\n\n**Recurrence:**\n- Typical STEC-HUS: very low recurrence (<1%)\n- Atypical HUS: high recurrence (50%+)',
    citation: [3, 7, 8],
    next: 'hus-dispo',
  },
];

export const PEDS_STEC_HUS_NODE_COUNT = PEDS_STEC_HUS_NODES.length;

export const PEDS_STEC_HUS_MODULE_LABELS = [
  'Recognition',
  'Workup',
  'STEC Management',
  'HUS Treatment',
  'Disposition',
];

export const PEDS_STEC_HUS_CITATIONS: Citation[] = [
  { num: 1, text: 'Freedman SB, et al. Shiga toxin-producing Escherichia coli infection, antibiotics, and risk of developing hemolytic uremic syndrome: a meta-analysis. Clin Infect Dis. 2016;62(10):1251-1258.' },
  { num: 2, text: 'Mody RK, et al. Infections in pediatric postdiarrheal hemolytic uremic syndrome: factors associated with identifying shiga toxin-producing Escherichia coli. Arch Pediatr Adolesc Med. 2012;166(10):902-909.' },
  { num: 3, text: 'Tarr PI, et al. Shiga-toxin-producing Escherichia coli and haemolytic uraemic syndrome. Lancet. 2005;365(9464):1073-1086.' },
  { num: 4, text: 'Centers for Disease Control and Prevention. Shiga toxin-producing E. coli (STEC). CDC.gov. Updated 2024.' },
  { num: 5, text: 'Fakhouri F, et al. Haemolytic uraemic syndrome. Lancet. 2017;390(10095):681-696.' },
  { num: 6, text: 'Wong CS, et al. The risk of the hemolytic-uremic syndrome after antibiotic treatment of Escherichia coli O157:H7 infections. N Engl J Med. 2000;342(26):1930-1936.' },
  { num: 7, text: 'Spinale JM, et al. Update on Streptococcus pneumoniae-associated hemolytic uremic syndrome. Curr Opin Pediatr. 2013;25(2):203-208.' },
  { num: 8, text: 'Keir LS, et al. Shigatoxin-associated hemolytic uremic syndrome: current molecular mechanisms and future therapies. Drug Des Devel Ther. 2012;6:195-208.' },
];
