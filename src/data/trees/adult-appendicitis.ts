// MedKitt — Adult Appendicitis (GI canonical + EM cross-list)
//
// 6 modules: Recognition → Alvarado/AAS Scoring → Workup → Imaging → Antibiotics + Surgical Decision → Disposition
// Sources: WSES 2020 Jerusalem Guidelines, EAST 2019, ACEP Clinical Policy, ACR Appropriateness Criteria 2018.
// Companion deep-dive of abdominal-pain-hub. Split deploys with hub batch (R8: split first, hub last).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ADULT_APPENDICITIS_CRITICAL_ACTIONS = [
  { text: 'Anchor on the classic sequence: anorexia → periumbilical pain → migration to RLQ → vomiting AFTER pain', nodeId: 'aa-start' },
  { text: 'Use AAS (or Alvarado) to risk-stratify — do NOT image every RLQ pain', nodeId: 'aa-aas-calc' },
  { text: 'Pregnant patient OR child <18 — image with US/MRI first; CT only if non-radiation imaging non-diagnostic', nodeId: 'aa-imaging-special' },
  { text: 'Preop antibiotics within 1 hour of decision to operate', nodeId: 'aa-antibiotics' },
  { text: 'Surgical consult ALL imaging-confirmed appendicitis and ALL high-likelihood AAS without imaging', nodeId: 'aa-surgical-consult' },
  { text: 'Discharge low-risk equivocal with strict 12-24 h recheck + written precautions ONLY after shared decision-making', nodeId: 'aa-dispo-discharge' },
  { text: 'Watch for atypical presentations: elderly (vague pain, low-grade fever), pregnant (RUQ as uterus enlarges), immunocompromised (blunted exam)', nodeId: 'aa-atypical' },
];

export const ADULT_APPENDICITIS_NODES: DecisionNode[] = [
  // ===================================================================
  // Module 1 — Recognition
  // ===================================================================
  {
    id: 'aa-start',
    type: 'info',
    module: 1,
    title: 'Adult Appendicitis — Recognition',
    body: 'Open first:\n- [Steps Summary](#/info/aa-steps)\n- [Stop / Pitfalls](#/info/aa-stop)\n\n**Why it matters:** [1,2,3]\n- Lifetime incidence ~7%; peak age 10-30 but presents at every age\n- Perforation rate climbs sharply with delay: ~20% at 36 h of symptoms, >65% at 48 h\n- Missed appendicitis is a leading driver of EM malpractice payouts\n\n**Classic story (the one that should make you commit to imaging or surgical consult):** [1,4]\n- Anorexia (more sensitive than nausea — "would they normally eat right now?")\n- Periumbilical / epigastric dull pain → migrates to RLQ over 6-24 h\n- Nausea + vomiting AFTER pain onset (reverse order → think gastroenteritis)\n- Low-grade fever (≥38°C)\n- RLQ tenderness with guarding ± rebound\n\n**Atypical patterns (lower threshold to image): [3,4,5]**\n- **Elderly (>60):** vague pain, less fever, less leukocytosis — present later, perforate more\n- **Pregnant:** appendix migrates cephalad with gravid uterus → RUQ pain in 3rd trimester is common; nausea/vomiting may be attributed to pregnancy\n- **Immunocompromised / DM:** blunted inflammatory response, can present in shock from missed perforation\n- **Retrocecal appendix (~30%):** psoas sign, less prominent abdominal tenderness, may present with flank or back pain\n- **Pelvic appendix:** suprapubic pain, dysuria, diarrhea (irritation of bladder/rectum) — mimics UTI or PID\n\n**Red flags suggesting perforation or complicated disease:** [1,2]\n- Diffuse peritonitis (board-like abdomen, rebound throughout)\n- Fever ≥39°C, WBC >18k, lactate elevated\n- Symptoms >48 h\n- Sepsis physiology\n\n**Differential to keep alive while you commit (and links into the hub when relevant):**\n- Cecal diverticulitis, terminal ileitis (Crohn\'s), Meckel\'s\n- Ovarian torsion, ectopic, ruptured ovarian cyst, TOA — gyn workup in any reproductive-age female\n- Mesenteric adenitis (kids), yersiniosis\n- Ureteral colic (right side), UTI/pyelonephritis\n- [Mesenteric Ischemia](#/tree/mesenteric-ischemia) if pain out of proportion to exam',
    citation: [1, 2, 3, 4, 5],
    next: 'aa-history-exam',
    summary: 'Anorexia + periumbilical → RLQ migration + vomiting AFTER pain + low-grade fever. Elderly/pregnant/immunocompromised present atypically.',
    safetyLevel: 'critical',
  },
  {
    id: 'aa-history-exam',
    type: 'info',
    module: 1,
    title: 'Focused History & Exam',
    body: '**History elements (each maps to AAS or Alvarado scoring):** [4,5,6]\n- Migration of pain (periumbilical → RLQ)\n- Anorexia (better question: "would you normally want to eat right now?")\n- Nausea/vomiting sequence — AFTER pain onset is classic; BEFORE pain favors gastroenteritis\n- Fever — typically low-grade (38.0-38.5°C); ≥39°C suggests perforation\n- Duration of symptoms (>48 h dramatically raises perforation risk)\n- Prior appendectomy (rules it out unless stump appendicitis — rare but real)\n- LMP, sexual activity, pregnancy possibility (always)\n- Immunosuppression, DM, anticoagulation\n\n**Exam:** [1,4]\n- **General appearance** — still / quiet (peritoneal pain is positional) vs writhing (colic suggests stone/biliary)\n- **McBurney point tenderness** — 1/3 from ASIS to umbilicus\n- **Rebound + guarding** — voluntary vs involuntary\n- **Rovsing sign** — palpate LLQ → pain in RLQ\n- **Psoas sign** — RLQ pain with right hip extension (retrocecal appendix)\n- **Obturator sign** — RLQ pain with passive internal rotation of flexed right hip (pelvic appendix)\n- **Markle (heel-drop / cough) sign** — most reliable single physical exam finding\n- **Pelvic exam** — for any reproductive-age female with RLQ pain (ovarian, ectopic, TOA)\n- **Testicular exam** — male with RLQ pain (testicular torsion can refer)\n- **Rectal exam** — NOT routine; only if perirectal abscess, mass, or bleeding suspected\n\n**Vitals trend matters more than single snapshot** — tachycardia + rising temp + falling BP after fluid bolus = perforation / sepsis until proven otherwise.',
    citation: [1, 4, 5, 6],
    next: 'aa-atypical',
    summary: 'Migration, anorexia, vomit-after-pain, low-grade fever, McBurney tenderness, Markle/cough sign, Rovsing/psoas/obturator by appendix location. Pelvic exam in females, testicular in males.',
  },
  {
    id: 'aa-atypical',
    type: 'info',
    module: 1,
    title: 'Atypical Populations — Lower Threshold to Image',
    body: '**Elderly (≥60 yo):** [3]\n- Up to 50% lack classic migration\n- Fever and leukocytosis may be absent or mild\n- Mortality ~5-10% (vs <1% in young adults) — driven by delayed diagnosis and perforation\n- **Image early** — do not wait for the "classic" picture\n\n**Pregnancy:** [7]\n- Most common non-obstetric surgical emergency in pregnancy (~1 in 1,500)\n- Appendix migrates cephalad and laterally as uterus enlarges — 2nd trimester pain often at iliac crest, 3rd trimester often RUQ\n- Leukocytosis is physiologic (10-16k baseline)\n- Maternal mortality low if uncomplicated; FETAL loss climbs sharply with perforation (1-5% uncomplicated → 20-35% perforated)\n- **Imaging:** US first (operator-dependent, often inconclusive); **MRI without gadolinium** is the preferred next step; CT only if MRI unavailable and clinical concern remains high\n- Surgical consult low threshold — delay >24 h is the dominant driver of fetal loss\n\n**Immunocompromised / DM / transplant / chronic steroid:** [8]\n- Blunted inflammatory response — may have minimal pain, no fever, normal WBC\n- Can present in septic shock from missed perforation\n- CT early if any abdominal complaint\n\n**Post-bariatric / altered anatomy:** anatomy changes (especially after Roux-en-Y) alter pain pattern; surgical consult for any unexplained abdominal pain in this group.\n\n**Children <5 yo** — see [Pediatric Appendicitis](#/tree/peds-appendicitis). This tree is for adults; the peds tree uses PAS (not AAS/Alvarado) and a different imaging algorithm.',
    citation: [3, 7, 8],
    next: 'aa-aas-calc',
    summary: 'Elderly: image early, mortality 5-10%. Pregnant: appendix migrates cephalad, MRI no-gad preferred. Immunocompromised: blunted exam, CT early. Kids <18 use peds-appendicitis tree.',
    safetyLevel: 'warning',
  },

  // ===================================================================
  // Module 2 — Risk Stratification (AAS + Alvarado)
  // ===================================================================
  {
    id: 'aa-aas-calc',
    type: 'info',
    module: 2,
    title: 'Adult Appendicitis Score (AAS) — Sammalkorpi 2014',
    body: 'AAS outperforms Alvarado for ED stratification in adults (better discrimination, sex-specific). Use AAS as primary; Alvarado is an acceptable alternative if your shop is anchored on it. [9,10]\n\n**AAS — 16-point score:**\n\n| Variable | Points |\n|----------|:------:|\n| **Pain in RLQ** | 2 |\n| **Pain relocation** (from periumbilical to RLQ) | 2 |\n| **Pain intensity, mild-moderate** | 1 |\n| **Pain intensity, severe** | 3 |\n| **Tenderness on RLQ exam (women 16-49 yo)** | 1 |\n| **Tenderness on RLQ exam (men + women ≥50)** | 3 |\n| **Guarding, mild** | 2 |\n| **Guarding, moderate-severe** | 4 |\n| **WBC ≥7.2 and <10.9** | 1 |\n| **WBC ≥10.9 and <14.0** | 2 |\n| **WBC ≥14.0** | 3 |\n| **PMN ≥62% and <75%** | 2 |\n| **PMN ≥75%** | 3 |\n| **CRP, symptoms <24 h: ≥4 and <11** | 2 |\n| **CRP, symptoms <24 h: ≥11 and <25** | 3 |\n| **CRP, symptoms <24 h: ≥25 and <83** | 5 |\n| **CRP, symptoms <24 h: ≥83** | 1 |\n| **CRP, symptoms ≥24 h: ≥12 and <53** | 2 |\n| **CRP, symptoms ≥24 h: ≥53 and <152** | 2 |\n| **CRP, symptoms ≥24 h: ≥152** | 1 |\n\n**Interpretation:** [9,10]\n- **AAS <11:** Low probability (~7%) — consider discharge / observation with strict precautions\n- **AAS 11-15:** Intermediate (~50%) — imaging indicated (US or CT)\n- **AAS ≥16:** High probability (~93%) — surgical consult; imaging often confirmatory but not the gate to consult\n\n**Alvarado (MANTRELS, alternative — 10 points):**\n- Migration 1 | Anorexia 1 | Nausea/vomiting 1 | Tenderness RLQ 2 | Rebound 1 | Elevated temp ≥37.3°C 1 | Leukocytosis ≥10k 2 | Shift left (PMN >75%) 1\n- ≤4 low / 5-6 equivocal / 7-8 probable / 9-10 high\n\n**Use the calculators in the toolbar.**',
    citation: [9, 10],
    calculatorLinks: [
      { id: 'aas-score', label: 'AAS Calculator' },
      { id: 'alvarado', label: 'Alvarado Calculator' },
    ],
    next: 'aa-aas-stratify',
    summary: 'AAS (Sammalkorpi 2014): <11 low, 11-15 intermediate, ≥16 high. Alvarado MANTRELS alternative.',
  },
  {
    id: 'aa-aas-stratify',
    type: 'question',
    module: 2,
    title: 'AAS Risk Stratification',
    body: 'Based on the score, pick the band:',
    options: [
      {
        label: 'AAS ≥16 (or Alvarado 9-10) — high probability',
        description: 'Surgical consult now. Imaging confirms; do not delay surgical eval for it.',
        next: 'aa-high-risk',
        urgency: 'critical',
      },
      {
        label: 'AAS 11-15 (or Alvarado 5-8) — intermediate',
        description: 'Imaging is the decision point. US first in young/lean/female/pregnant; CT first in older/obese/equivocal.',
        next: 'aa-imaging-strategy',
        urgency: 'urgent',
      },
      {
        label: 'AAS <11 (or Alvarado ≤4) — low probability',
        description: 'Reassess after analgesia + fluids. Consider observation + serial exams ± imaging if persistent suspicion.',
        next: 'aa-low-risk',
      },
    ],
    citation: [9, 10],
  },
  {
    id: 'aa-high-risk',
    type: 'result',
    module: 2,
    title: 'High Probability — Surgical Consult Now',
    body: 'AAS ≥16 (or Alvarado 9-10 with classic picture) → **surgical consult before imaging completes**. Many centers will accept the case based on clinical pretest probability + AAS alone; some will request CT confirmation.\n\n**Parallel orders (do not wait sequentially):**\n- IV access × 2, NS 1-2 L bolus\n- CBC + CMP + lipase + lactate + UA (β-hCG if female)\n- Type and screen (preop)\n- [Antibiotics](#/node/aa-antibiotics) — give within 1 h of decision to operate\n- NPO\n- Analgesia (do NOT withhold — analgesia does not mask exam findings; this myth is debunked)\n- Antiemetic (ondansetron)\n- CT abdomen/pelvis WITH contrast if not yet done AND surgery wants confirmation (most pregnant patients get MRI; most peds get US first)\n\n**Surgical service handoff content:**\n- Time of symptom onset (drives perforation risk)\n- Vital signs trend\n- Exam findings (specifically: peritoneal signs?)\n- Lab values\n- Imaging status\n- Pregnancy status, last meal, anticoagulation, allergies, prior abdominal surgery',
    recommendation: 'Surgical consult NOW + parallel orders. Antibiotics within 1 h of OR decision. Analgesia does NOT mask the exam.',
    confidence: 'definitive',
    citation: [1, 2, 11],
    safetyLevel: 'critical',
  },
  {
    id: 'aa-low-risk',
    type: 'result',
    module: 2,
    title: 'Low Probability — Reassess and Decide',
    body: '**Reassess after:** analgesia (don\'t skip — it doesn\'t mask findings), 1 L NS, antiemetic.\n\n**Re-examine at 1-2 h:**\n- Pain pattern stable, improving, or escalating?\n- Migration developing?\n- Any new peritoneal signs?\n- Trend the WBC + CRP if drawn\n\n**Options:**\n1. **Improving + benign exam + reliable patient** → discharge with strict 12-24 h recheck + written return precautions ([Discharge bundle](#/node/aa-dispo-discharge))\n2. **Unchanged equivocal** → US first (if young/lean/female/pregnant) or CT (older/obese/equivocal exam) — proceed to [Imaging Strategy](#/node/aa-imaging-strategy)\n3. **Worsening, new peritoneal signs, or vitals trending wrong** → escalate to imaging now + surgical consult; do NOT discharge\n\n**Shared decision-making** is essential here. Walk the patient through: "your appendicitis score is low but not zero — here are the recheck options."',
    recommendation: 'Reassess after analgesia + fluids. Discharge with 12-24h recheck if improving. Image + consult if worsening.',
    confidence: 'recommended',
    citation: [1, 11],
  },

  // ===================================================================
  // Module 3 — Workup
  // ===================================================================
  {
    id: 'aa-workup',
    type: 'info',
    module: 3,
    title: 'Workup — Labs and Adjuncts',
    body: '**Standard labs:** [1,2,11]\n- **CBC with diff** — WBC ≥10k + PMN >75% is supportive but neither sens nor spec enough to rule in/out\n- **CRP** — kinetics matter; CRP rises slower than WBC. Combined elevation (WBC + CRP + PMN) has higher specificity than any single marker. A normal CRP + normal WBC + low AAS is the strongest single rule-out combination.\n- **CMP** — baseline for surgical clearance + look for dehydration / AKI from vomiting\n- **Lipase** — rule out pancreatitis (especially epigastric pain pattern; [Acute Pancreatitis consult](#/tree/acute-pancreatitis))\n- **UA** — rule out UTI / nephrolithiasis; sterile pyuria is common in appendicitis due to bladder irritation\n- **β-hCG** in any reproductive-age female (urine OR serum)\n- **Lactate** if any concern for sepsis / perforation / mesenteric ischemia\n- **Type and screen** if surgical consult requested\n- **Coags** if anticoagulated or surgery anticipated\n\n**Optional / context-driven:**\n- **Bilirubin / ALT / AST** if RUQ pain — overlap with [Gallbladder Disease](#/tree/gallbladder)\n- **Stool studies** only if diarrhea is prominent and infectious enteritis suspected\n\n**Pitfalls:** [1]\n- Normal WBC does NOT rule out appendicitis (up to 20% have normal WBC, especially early or elderly)\n- Sterile pyuria is common in appendicitis — do not attribute RLQ pain to UTI alone\n- Lipase elevation can be mild and nonspecific — do not use a "mild" elevation to rule out appendicitis if the story fits\n- β-hCG positive does NOT exclude appendicitis (concurrent pregnancy is common)',
    citation: [1, 2, 11],
    next: 'aa-imaging-strategy',
    summary: 'CBC + CRP + CMP + lipase + UA + β-hCG + lactate (if septic). Normal WBC does NOT rule out. Sterile pyuria is common in appendicitis.',
  },

  // ===================================================================
  // Module 4 — Imaging
  // ===================================================================
  {
    id: 'aa-imaging-strategy',
    type: 'question',
    module: 4,
    title: 'Imaging Strategy — Patient-Specific',
    body: 'Pick the patient profile. The modality matters more than the order:',
    options: [
      {
        label: 'Pregnant patient — any trimester',
        description: 'US first (operator-dependent); MRI without gadolinium next if non-diagnostic. CT only if both unavailable and concern persists.',
        next: 'aa-imaging-special',
        urgency: 'urgent',
      },
      {
        label: 'Adult, lean, young (under 40)',
        description: 'US first is reasonable. CT if US non-diagnostic + ongoing suspicion.',
        next: 'aa-imaging-us-first',
      },
      {
        label: 'Adult, obese, older (≥40), or equivocal exam',
        description: 'CT abdomen/pelvis with IV contrast first (oral contrast not required).',
        next: 'aa-imaging-ct-first',
      },
      {
        label: 'Patient <18 yo',
        description: 'Open the pediatric appendicitis pathway — different scoring (PAS) and US-first algorithm.',
        next: 'aa-imaging-peds-link',
      },
    ],
    citation: [12, 13],
  },
  {
    id: 'aa-imaging-special',
    type: 'result',
    module: 4,
    title: 'Imaging in Pregnancy',
    body: '**Order of preference (ACR Appropriateness Criteria 2018):** [13]\n1. **Graded compression US** — first-line in all trimesters. Sensitivity ~70-85% when appendix visualized; specificity ~95%. Non-visualization rate climbs in 2nd-3rd trimester (~30-50%) — that\'s a non-diagnostic study, not a negative one.\n2. **MRI abdomen/pelvis WITHOUT gadolinium** — if US non-diagnostic. Sensitivity ~94%, specificity ~97%. Safe in all trimesters. T2 single-shot fast spin echo + DWI is the standard protocol.\n3. **CT abdomen/pelvis with IV contrast** — if MRI unavailable and clinical concern persists. Single-pass low-dose CT delivers ~2-3 mGy to fetus — below the 50 mGy threshold for teratogenesis. **Iodinated contrast** is FDA Category B (no documented harm); avoid if possible in 1st trimester. **Do NOT delay diagnosis indefinitely** — perforation is the main driver of fetal loss.\n\n**Surgical consult low threshold** — delayed surgery is more dangerous to fetus than appendectomy itself.\n\n**Pre-emptive antibiotics** at the time of suspicion if surgery may be delayed for imaging — ceftriaxone + metronidazole or pip-tazo (pregnancy-safe).',
    recommendation: 'US first → MRI no-gad next → CT only if both unavailable. Do NOT delay surgical consult while imaging completes.',
    confidence: 'definitive',
    citation: [7, 13],
    safetyLevel: 'critical',
  },
  {
    id: 'aa-imaging-us-first',
    type: 'result',
    module: 4,
    title: 'Imaging — US First Pathway',
    body: '**Graded compression US** is reasonable first-line in young, lean adults: [12,13]\n- **Pros:** no radiation, fast, can identify ovarian pathology + free fluid, repeatable\n- **Cons:** operator-dependent; non-visualization rate is high (~20-40% in adults); cannot reliably exclude appendicitis\n- **Sensitivity:** ~70-85% when appendix visualized; **specificity** ~95%\n\n**A "non-diagnostic" US is NOT a negative US.** If clinical suspicion remains intermediate-high, proceed to CT or short observation with serial exams + repeat WBC/CRP at 4-6 h.\n\n**US findings supporting appendicitis:**\n- Appendix diameter >6-7 mm\n- Non-compressible\n- Periappendiceal fluid\n- Appendicolith\n- Hyperemia on color Doppler\n\n**Next step if US negative or non-diagnostic but suspicion remains:** CT abdomen/pelvis with IV contrast → [CT pathway](#/node/aa-imaging-ct-first)',
    recommendation: 'US first in young/lean. Non-diagnostic US = escalate to CT, not "ruled out."',
    confidence: 'recommended',
    citation: [12, 13],
  },
  {
    id: 'aa-imaging-ct-first',
    type: 'result',
    module: 4,
    title: 'Imaging — CT Abdomen/Pelvis',
    body: '**CT abdomen/pelvis with IV contrast** is the gold standard in non-pregnant adults: [12,13]\n- **Sensitivity** ~95-98%, **specificity** ~95%\n- **Oral contrast not required** for diagnosis of appendicitis (saves 1-2 h and increases vomiting risk)\n- **IV contrast** preferred; non-contrast is acceptable in renal-insufficient patients\n\n**CT findings supporting appendicitis:**\n- Appendix diameter >6-7 mm\n- Wall thickening\n- Periappendiceal fat stranding\n- Appendicolith\n- Free fluid in pelvis\n- Abscess / phlegmon (complicated appendicitis)\n\n**If CT confirms uncomplicated appendicitis:**\n- → Surgical consult + [Antibiotics + Surgical Decision](#/node/aa-antibiotics)\n\n**If CT shows complicated disease (perforation, abscess, phlegmon):**\n- → Surgical consult + IR consult for percutaneous drainage of abscess if ≥3 cm\n- → Antibiotics (broader: pip-tazo or ceftriaxone + metronidazole)\n- → Some surgeons opt for non-operative management with delayed interval appendectomy for contained abscess; many do early appendectomy. Defer to surgical service.\n\n**If CT is negative + symptoms persist or worsen:** consider gyn pathology, terminal ileitis, mesenteric adenitis, [Mesenteric Ischemia](#/tree/mesenteric-ischemia) (if pain out of proportion), or diverticulitis. Surgical reconsult at low threshold if exam evolves.',
    recommendation: 'CT abdomen/pelvis with IV contrast (no oral). Surgical consult for any positive CT. IR drain for abscess ≥3 cm.',
    confidence: 'definitive',
    citation: [12, 13],
    safetyLevel: 'warning',
  },
  {
    id: 'aa-imaging-peds-link',
    type: 'result',
    module: 4,
    title: 'Pediatric Pathway',
    body: 'Patients <18 yo use the dedicated pediatric pathway, which uses the **Pediatric Appendicitis Score (PAS, Samuel 2002)** rather than AAS, and US-first imaging is the standard.\n\n**Open:** [Pediatric Appendicitis](#/tree/peds-appendicitis)\n\n**Key differences from adult pathway:**\n- PAS uses tenderness + cough-pain as 2-point items (vs AAS\'s sex-stratified tenderness)\n- US is first-line in all kids — non-visualization rate is lower than in adults\n- MRI is preferred over CT for equivocal cases (radiation stewardship)\n- Higher perforation rate at presentation in <5 yo group — atypical presentation, low threshold to image',
    recommendation: 'Open peds-appendicitis tree. Different scoring + imaging algorithm.',
    confidence: 'definitive',
    citation: [14],
  },

  // ===================================================================
  // Module 5 — Antibiotics + Surgical Decision
  // ===================================================================
  {
    id: 'aa-antibiotics',
    type: 'info',
    module: 5,
    title: 'Antibiotics + Surgical Decision',
    body: '**Preop antibiotic regimens** (within 1 h of decision to operate): [1,2,15]\n\n**Uncomplicated appendicitis (no perforation, no abscess):**\n- **Cefoxitin 2 g IV** OR\n- **Cefazolin 2 g IV + Metronidazole 500 mg IV** OR\n- **Ceftriaxone 2 g IV + Metronidazole 500 mg IV**\n- Pip-tazo not required for uncomplicated disease\n\n**Complicated appendicitis (perforated, gangrenous, or abscess on imaging):**\n- **Piperacillin-tazobactam 4.5 g IV q6-8h** OR\n- **Ceftriaxone 2 g IV + Metronidazole 500 mg IV** OR\n- **Ertapenem 1 g IV** if pip-tazo not available\n- Continue ≥4-5 days post-source-control\n\n**Penicillin allergy (true anaphylaxis):**\n- **Clindamycin 600 mg IV + Gentamicin 5-7 mg/kg IV** OR\n- **Aztreonam 2 g IV + Metronidazole 500 mg IV**\n\n**Pregnancy:** ceftriaxone + metronidazole OR pip-tazo (avoid fluoroquinolones and tetracyclines).\n\n**Antibiotics-alone (NOTA) for uncomplicated appendicitis** [16]\n- **CODA trial (2020):** 70% antibiotic-treated patients avoided appendectomy at 90 days, ~46% at 1 year, ~50% at 4 years\n- **Selected patients only:** uncomplicated CT-confirmed appendicitis, no appendicolith (appendicolith → higher failure rate), able to return for follow-up\n- **Shared decision-making required** — patient must understand recurrence risk\n- **Not first-line in most US centers** — surgery remains the standard. Discuss with surgical service.\n- **Contraindications:** suspected perforation, abscess, pregnancy (controversial), appendicolith, immunocompromise, inability to return for follow-up',
    citation: [1, 2, 15, 16],
    next: 'aa-surgical-consult',
    summary: 'Cefoxitin OR ceftriaxone + flagyl uncomplicated. Pip-tazo for complicated/perforated. Antibiotics-alone option (CODA) for select uncomplicated without appendicolith — shared decision.',
    safetyLevel: 'warning',
  },
  {
    id: 'aa-surgical-consult',
    type: 'info',
    module: 5,
    title: 'Surgical Consult — What to Communicate',
    body: '**Get surgery involved EARLY** — pretest probability + AAS supports calling before CT in high-AAS cases. Many surgical services have an "appendicitis pathway" where the ED hands off based on clinical + score alone.\n\n**Handoff content (one-pass call):**\n1. **Time of symptom onset** — drives perforation risk\n2. **AAS / Alvarado score** + WBC + CRP\n3. **Exam:** peritoneal signs present or absent?\n4. **Imaging status:** US done? CT planned or done? findings?\n5. **Pregnancy status** (always state, even if male — closes the loop)\n6. **Anticoagulation, last meal, allergies, prior abdominal surgery**\n7. **Vital signs trend** (especially response to fluid bolus)\n\n**Decision points the surgical service will weigh:**\n- OR vs delayed appendectomy (interval) for abscess\n- Laparoscopic vs open (laparoscopic standard in most US centers; open for diffuse peritonitis or unstable patient)\n- IR drainage for abscess ≥3 cm before interval appendectomy\n- Antibiotics-alone trial (CODA-eligible patients only)\n\n**While waiting for surgery:**\n- NPO confirmed\n- Antibiotics given (document time)\n- Analgesia continued — do NOT withhold for "preserving the exam"\n- IV fluids titrated to UOP / vitals\n- Reassess every 30-60 min until OR\n- Re-examine if pain pattern changes — escalation suggests perforation\n- Trend lactate if any sepsis concern',
    citation: [1, 2, 11],
    next: 'aa-dispo',
    summary: 'Call surgery early. Standard handoff: onset time, score, exam, imaging, preg status, anticoag, vitals trend. Analgesia + antibiotics while waiting. Reassess every 30-60 min.',
  },

  // ===================================================================
  // Module 6 — Disposition
  // ===================================================================
  {
    id: 'aa-dispo',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Match disposition to imaging, surgical status, and reliability.',
    options: [
      {
        label: 'OR for appendectomy',
        description: 'Imaging-confirmed appendicitis OR high pretest + AAS with surgical accept',
        next: 'aa-dispo-or',
      },
      {
        label: 'Admit for IV antibiotics + delayed appendectomy',
        description: 'Complicated appendicitis with abscess / phlegmon planned for interval appendectomy',
        next: 'aa-dispo-admit',
        urgency: 'urgent',
      },
      {
        label: 'Observation / serial exams',
        description: 'Equivocal exam + intermediate AAS + non-diagnostic imaging, reliable patient',
        next: 'aa-dispo-observe',
      },
      {
        label: 'Discharge with strict 12-24 h recheck',
        description: 'Low AAS + improving + reliable patient + can return + shared decision',
        next: 'aa-dispo-discharge',
      },
    ],
    citation: [1, 11],
  },
  {
    id: 'aa-dispo-or',
    type: 'result',
    module: 6,
    title: 'Disposition — Operative',
    body: '**Standard OR pathway:**\n- Confirm NPO\n- Confirm antibiotics given within 1 h of decision (document time)\n- Type and screen sent\n- IV × 2, fluid resuscitation\n- Coags if anticoagulated\n- Reverse anticoagulation if indicated and surgical service requests (this depends on agent — DOACs may proceed without reversal in many centers; warfarin requires PCC or FFP if INR >1.5)\n- Surgical consent obtained by surgery (not by ED)\n- Anesthesia consult\n- OR booking confirmed\n\n**Laparoscopic appendectomy** is the standard in most US centers; **open** is reserved for diffuse peritonitis, hemodynamic instability, or where laparoscopic equipment / expertise unavailable.\n\n**For pregnant patients:** laparoscopic is safe in all trimesters with appropriate technique (lower abdominal entry, lower insufflation pressures). Delaying surgery > delaying laparoscopic for open conversion concerns.',
    recommendation: 'OR. Confirm NPO + antibiotics + T&S + reverse anticoag if needed. Lap appendectomy standard.',
    confidence: 'definitive',
    citation: [1, 2, 11],
  },
  {
    id: 'aa-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Disposition — Admit for Complicated Disease',
    body: '**Admit when:** [1,2]\n- Abscess or phlegmon on imaging — planned IR drainage or non-operative management with interval appendectomy in 4-8 weeks\n- Diffuse peritonitis with stabilization needed before OR (rare — usually goes straight to OR)\n- Sepsis from perforation requiring resuscitation prior to OR\n- Antibiotic-alone trial elected (CODA pathway) — admit for IV antibiotics 24-48 h then transition PO if tolerating\n\n**Standard admission orders:**\n- IV pip-tazo 4.5 g q6-8h (or ceftriaxone + metronidazole)\n- NPO initially, advance as tolerated when source-controlled\n- Surgical service primary\n- IR consult if abscess ≥3 cm\n- Pain control (no NSAIDs if surgical bleeding risk; IV opioid PRN)\n- Antiemetic\n- Lactate trend, CBC, CRP daily\n- Imaging follow-up (repeat CT at 48-72 h if not improving)',
    recommendation: 'Admit. IV antibiotics. Surgical service primary. IR drain ≥3 cm abscess. Interval appendectomy 4-8 weeks.',
    confidence: 'recommended',
    citation: [1, 2],
    safetyLevel: 'warning',
  },
  {
    id: 'aa-dispo-observe',
    type: 'result',
    module: 6,
    title: 'Disposition — ED Observation / Serial Exams',
    body: '**ED observation unit appropriate when:** [11]\n- Equivocal exam + intermediate AAS (11-15)\n- Non-diagnostic US, awaiting CT or repeat US\n- Pregnant with non-diagnostic US, awaiting MRI\n- Reliable patient with social support\n\n**Observation protocol:**\n- Serial exam every 2-4 h by same provider when possible\n- Repeat WBC + CRP at 4-6 h (trends matter — both rising = appendicitis until proven otherwise)\n- Continue IV fluids, analgesia, antiemetic\n- If exam evolves to peritoneal signs OR labs trend up OR persistent pain at 4-6 h → escalate (image / surgical consult)\n- If exam stable / improving + labs trending down at 6-12 h → discharge with strict 24 h recheck\n\n**Document the serial exam findings explicitly** — "abdomen unchanged at 4 h" is not enough; describe what you examined and what was/wasn\'t found.',
    recommendation: 'Obs unit + q2-4h serial exams + repeat labs at 4-6 h. Escalate if exam evolves; discharge with 24 h recheck if improving.',
    confidence: 'recommended',
    citation: [11],
  },
  {
    id: 'aa-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Disposition — Discharge with 12-24 h Recheck',
    body: '**Discharge appropriate ONLY if ALL of:** [1,11]\n- Low AAS (<11) or Alvarado ≤4\n- Improving exam after analgesia + fluids\n- Tolerating PO (gives confidence about gastritis / gastroenteritis)\n- No peritoneal signs, no hemodynamic concern\n- WBC trending down or normal + CRP normal\n- Reliable patient with transport + caregiver + ability to return\n- Shared decision-making documented\n\n**Pre-discharge checklist:**\n1. PO challenge completed\n2. Final exam documented (atraumatic, soft, mild tenderness or none)\n3. Vitals normal\n4. **Written return precautions** covering:\n   - Worsening pain (especially migration to RLQ)\n   - Fever ≥38°C or chills\n   - Persistent vomiting\n   - Abdominal rigidity\n   - Inability to walk normally\n   - Black stool / blood in stool\n   - Severe pain unresponsive to home Rx\n5. **12-24 h ED or PCP recheck scheduled** — booked, not just recommended\n6. Surgical follow-up phone number provided\n7. NSAIDs discouraged (mask perforation signs); acetaminophen acceptable\n\n**Do NOT discharge if:**\n- Pain pattern unclear or atypical\n- Any peritoneal sign on exam\n- WBC or CRP elevated and rising\n- Cannot return reliably for recheck\n- Pregnant (lower threshold to admit / OR observation)\n- Elderly with vague pain (mortality 5-10% if missed)\n- Immunocompromised\n\n**Counseling:** appendicitis can evolve over 6-24 h. A negative ED visit today does not rule out appendicitis tomorrow. The 12-24 h recheck is the safety net.',
    recommendation: 'Discharge only with: low AAS + improving + PO tolerated + reliable + 12-24 h recheck booked + written precautions.',
    confidence: 'recommended',
    citation: [1, 11],
    safetyLevel: 'warning',
  },
];

export const ADULT_APPENDICITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Di Saverio S, Podda M, De Simone B, et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15(1):27.' },
  { num: 2, text: 'Bhangu A, Søreide K, Di Saverio S, et al. Acute appendicitis: modern understanding of pathogenesis, diagnosis, and management. Lancet. 2015;386(10000):1278-1287.' },
  { num: 3, text: 'Storm-Dickerson TL, Horattas MC. What have we learned over the past 20 years about appendicitis in the elderly? Am J Surg. 2003;185(3):198-201.' },
  { num: 4, text: 'Howell JM, Eddy OL, Lukens TW, et al. Clinical policy: Critical issues in the evaluation and management of emergency department patients with suspected appendicitis. Ann Emerg Med. 2010;55(1):71-116. (ACEP)' },
  { num: 5, text: 'Wagner JM, McKinney WP, Carpenter JL. Does this patient have appendicitis? JAMA. 1996;276(19):1589-1594.' },
  { num: 6, text: 'Andersson RE. Meta-analysis of the clinical and laboratory diagnosis of appendicitis. Br J Surg. 2004;91(1):28-37.' },
  { num: 7, text: 'Brown JJS, Wilson C, Coleman S, Joypaul BV. Appendicitis in pregnancy: an ongoing diagnostic dilemma. Colorectal Dis. 2009;11(2):116-122.' },
  { num: 8, text: 'Chamisa I. A clinicopathological review of 324 appendices removed for acute appendicitis in patients of various ages. S Afr J Surg. 2009;47(4):117-119.' },
  { num: 9, text: 'Sammalkorpi HE, Mentula P, Leppäniemi A. A new adult appendicitis score improves diagnostic accuracy of acute appendicitis — a prospective study. BMC Gastroenterol. 2014;14:114. (AAS)' },
  { num: 10, text: 'Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med. 1986;15(5):557-564. (MANTRELS)' },
  { num: 11, text: 'Andersson RE. The natural history and traditional management of appendicitis revisited: spontaneous resolution and predominance of prehospital perforations imply that a correct diagnosis is more important than an early diagnosis. World J Surg. 2007;31(1):86-92.' },
  { num: 12, text: 'Doria AS, Moineddin R, Kellenberger CJ, et al. US or CT for diagnosis of appendicitis in children and adults? A meta-analysis. Radiology. 2006;241(1):83-94.' },
  { num: 13, text: 'American College of Radiology. ACR Appropriateness Criteria: Right Lower Quadrant Pain — Suspected Appendicitis. J Am Coll Radiol. 2018;15(11S):S373-S387.' },
  { num: 14, text: 'Samuel M. Pediatric appendicitis score. J Pediatr Surg. 2002;37(6):877-881.' },
  { num: 15, text: 'Solomkin JS, Mazuski JE, Bradley JS, et al. Diagnosis and management of complicated intra-abdominal infection in adults and children: guidelines by the Surgical Infection Society and the Infectious Diseases Society of America. Clin Infect Dis. 2010;50(2):133-164.' },
  { num: 16, text: 'CODA Collaborative; Flum DR, Davidson GH, Monsell SE, et al. A randomized trial comparing antibiotics with appendectomy for appendicitis. N Engl J Med. 2020;383(20):1907-1919.' },
];

export const ADULT_APPENDICITIS_NODE_COUNT = ADULT_APPENDICITIS_NODES.length;
export const ADULT_APPENDICITIS_MODULE_LABELS = [
  'Recognition',
  'AAS / Alvarado',
  'Workup',
  'Imaging',
  'Antibiotics + Surgical Decision',
  'Disposition',
];
