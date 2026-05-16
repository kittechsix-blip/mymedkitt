// MedKitt - Pediatric Appendicitis (PAS-Based Pathway)
// EB Medicine Pediatric Appendicitis + Samuel 2002 (PAS validation) + WSES 2020 + EAST
// 6 modules: Recognition -> PAS Scoring -> Workup -> Imaging -> Antibiotics -> Disposition

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDS_APPENDICITIS_CRITICAL_ACTIONS = [
  { text: 'Calculate Pediatric Appendicitis Score (PAS) on every suspected case', nodeId: 'pa-pas-calc' },
  { text: 'Risk-stratify: PAS ≤3 low / 4-6 intermediate / ≥7 high', nodeId: 'pa-pas-stratify' },
  { text: 'CBC, CRP, urinalysis, bHCG (post-menarchal females)', nodeId: 'pa-workup' },
  { text: 'Imaging pathway: US first; MRI for equivocal; CT only as last resort', nodeId: 'pa-imaging-strategy' },
  { text: 'Preop antibiotics within 1 hour if appendicitis confirmed', nodeId: 'pa-antibiotics' },
  { text: 'Surgical consult for all PAS ≥7 and confirmed appendicitis on imaging', nodeId: 'pa-dispo' },
  { text: 'Discharge with 12-24h rapid recheck for low-risk equivocal cases (shared decision)', nodeId: 'pa-dispo-discharge' },
  { text: 'Maintain high suspicion in <5yo — atypical presentation, higher perforation rate', nodeId: 'pa-pitfalls' },
];

export const PEDS_APPENDICITIS_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Recognition
  // ===================================================================
  {
    id: 'pa-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Appendicitis Overview',
    body: 'See [Steps Summary](#/info/pa-steps-summary) for the rapid-action checklist.\n\n**Why it matters:** [1,2]\n- Most common surgical emergency in children\n- Lifetime incidence ~7%; peak age 10-14\n- Perforation rate in children ~30-40% overall, **>80% in kids <5yo** (delayed/atypical presentation)\n- Missed diagnosis is a top driver of pediatric ED malpractice claims\n\n**Classic presentation (older kids/teens):** [1,3]\n- Periumbilical pain → migration to RLQ (Carnett sign less reliable in kids)\n- Anorexia, nausea, vomiting (vomiting AFTER pain — reverse order suggests gastroenteritis)\n- Low-grade fever (≥38°C)\n- Pain with cough, percussion, or hopping (Markle sign)\n\n**Atypical in younger kids (<5yo):** [2,4]\n- Diffuse abdominal pain or "won\'t bear weight"\n- Diarrhea (mimics gastroenteritis)\n- Lethargy, irritability\n- May present with perforation/abscess at first ED visit\n- Always re-examine the abdomen — appearance evolves rapidly\n\n**Red flags suggesting perforation or complicated disease:**\n- Diffuse peritonitis, rebound, guarding\n- Fever ≥39°C\n- WBC >18k\n- Symptoms >48h\n- Hemodynamic instability',
    citation: [1, 2, 3, 4],
    calculatorLinks: [
      { id: 'peds-appendicitis-score', label: 'PAS Calculator' },
    ],
    next: 'pa-history-exam',
    summary: 'Most common peds surgical emergency; perforation rate 30-40% overall and >80% in <5yo; vomit-AFTER-pain is the classic sequence.',
  },
  {
    id: 'pa-steps-summary',
    type: 'info',
    module: 1,
    title: 'Steps Summary',
    body: '**Rapid-action checklist for suspected pediatric appendicitis:** [1,2,5]\n\n1. **History + exam** — migration, anorexia, vomiting after pain, fever, RLQ tenderness, pain with cough/hop\n2. **Calculate PAS** — 10-point score (use the [PAS Calculator](#/calculator/peds-appendicitis-score))\n3. **Stratify:**\n   - PAS **≤3** → low risk; consider discharge with return precautions or short observation\n   - PAS **4-6** → intermediate; imaging (US first)\n   - PAS **≥7** → high risk; surgical consult + confirmatory US\n4. **Labs** — CBC, CRP, UA (rule out UTI), bHCG in post-menarchal females\n5. **Imaging pathway** — graded compression US → MRI if equivocal → CT only as last resort\n6. **Antibiotics** — preop coverage (cefoxitin OR pip-tazo OR ceftriaxone + metronidazole)\n7. **Disposition** — OR vs admit for observation vs discharge with 12-24h recheck\n8. **Watch the <5yo group** — atypical presentation, higher perforation rate, lower threshold to image',
    citation: [1, 2, 5],
    next: 'pa-history-exam',
    skippable: true,
  },
  {
    id: 'pa-history-exam',
    type: 'info',
    module: 1,
    title: 'Focused History & Exam',
    body: '**History elements (each maps to PAS):** [5,6]\n- **Anorexia** — "would your kid normally eat their favorite food right now?"\n- **Nausea/vomiting** — sequence matters; vomit BEFORE pain → gastroenteritis more likely\n- **Migration** — periumbilical → RLQ over 12-24h\n- **Fever** — ≥38°C\n- **Duration** — >48h raises perforation risk\n\n**Exam:** [1,3]\n- General appearance: still/quiet vs writhing (peritoneal pain is positional)\n- **RLQ tenderness** — palpate gently, watch the face\n- **Pain with cough, percussion, or hopping** (Markle/heel-drop sign) — strongest physical exam finding in kids\n- **Rovsing**, **Psoas**, **Obturator** — supportive but less reliable in kids than adults\n- Rectal exam **NOT routinely needed** in modern practice (low yield, traumatic for child)\n- Always check for hernias, testicular exam in boys (torsion mimic)\n\n**Pitfalls in young children (<5):** [2,4]\n- Cannot reliably localize pain\n- Atypical presentation: diarrhea, refusal to walk, irritability\n- High perforation rate at presentation — have a low threshold for imaging\n- Reassess frequently — abdomen can change in 2-4 hours',
    citation: [1, 2, 3, 4, 5, 6],
    next: 'pa-pas-calc',
    summary: 'Migration, anorexia, vomiting-after-pain, fever, RLQ tenderness, pain with cough/hop; rectal exam not routine; <5yo presents atypically.',
  },

  // ===================================================================
  // MODULE 2: PAS Scoring
  // ===================================================================
  {
    id: 'pa-pas-calc',
    type: 'info',
    module: 2,
    title: 'Pediatric Appendicitis Score (PAS)',
    body: '**Samuel 2002 — 10-point validated score for kids 4-15.** Sensitivity ~88%, specificity ~50%; used to stratify imaging and disposition. [5,6]\n\n| Criterion | Points |\n|-----------|:------:|\n| RLQ tenderness | **2** |\n| Pain with cough, percussion, or hopping | **2** |\n| Migration of pain to RLQ | 1 |\n| Anorexia | 1 |\n| Nausea or vomiting | 1 |\n| Fever ≥38°C (100.4°F) | 1 |\n| Leukocytosis (WBC ≥10,000/μL) | 1 |\n| Neutrophilia (PMN >7,500/μL) | 1 |\n| **TOTAL** | **/10** |\n\n**Interpretation:** [5,6,7]\n- **PAS ≤3:** Low likelihood; ~2% appendicitis rate; consider discharge with return precautions\n- **PAS 4-6:** Equivocal; ~30% appendicitis rate; imaging indicated\n- **PAS ≥7:** High likelihood; ~80% appendicitis rate; surgical consult\n\n**Important caveats:** [6,7]\n- PAS does NOT replace clinical judgment — use as a stratification aid\n- Poor sensitivity in **<5yo** (limited validation in this age group)\n- Score updated by serial exams — the same child can move categories over 4-6 hours\n- A "low" PAS does NOT rule out appendicitis; the rate is low but not zero\n\n**Use the [PAS Calculator](#/calculator/peds-appendicitis-score) to compute and document.**',
    citation: [5, 6, 7],
    calculatorLinks: [
      { id: 'peds-appendicitis-score', label: 'PAS Calculator' },
    ],
    next: 'pa-pas-stratify',
    summary: 'PAS = 10-point score (Samuel 2002): tenderness/cough-pain 2 pts each, others 1 pt each; ≤3 low, 4-6 equivocal, ≥7 high; not validated in <5yo.',
  },
  {
    id: 'pa-pas-stratify',
    type: 'question',
    module: 2,
    title: 'PAS Risk Stratification',
    body: 'Based on the PAS calculation, select the risk band: [5,6,7]',
    citation: [5, 6, 7],
    options: [
      {
        label: 'PAS ≥7 — High risk',
        description: '~80% appendicitis rate; surgical consult + confirmatory imaging',
        next: 'pa-workup',
        urgency: 'critical',
      },
      {
        label: 'PAS 4-6 — Intermediate',
        description: '~30% appendicitis rate; imaging indicated (US first)',
        next: 'pa-workup',
        urgency: 'urgent',
      },
      {
        label: 'PAS ≤3 — Low risk',
        description: '~2% appendicitis rate; discharge with return precautions or short observation',
        next: 'pa-workup',
      },
    ],
  },

  // ===================================================================
  // MODULE 3: Workup
  // ===================================================================
  {
    id: 'pa-workup',
    type: 'info',
    module: 3,
    title: 'Laboratory Workup',
    body: '**Send labs on every suspected case before final imaging/dispo decision.** [1,2,7]\n\n**Core labs:**\n- **CBC** — WBC and PMN feed directly into PAS; WBC >18k or left shift suggests perforation\n- **CRP** — elevated CRP + leukocytosis has high specificity; **normal CRP + normal WBC** carries a strong negative predictive value, especially after 24h of symptoms [7,8]\n- **Urinalysis** — rule out UTI (pyuria mimicker); a few WBCs on UA is normal in appendicitis (ureter irritation)\n- **bHCG** — mandatory in **all post-menarchal females** (rule out ectopic, document pre-imaging)\n- **BMP** — only if vomiting/dehydration; not routine\n\n**Optional:**\n- **Lipase** — only if pancreatitis suspected\n- **Type and screen** — if going to OR\n\n**Pitfalls:** [1,7]\n- Normal WBC does **NOT** rule out appendicitis (15-20% have normal WBC)\n- Pyuria on UA does NOT rule out appendicitis — inflamed appendix can irritate adjacent ureter\n- Mild hyperglycemia, ketosis common from anorexia/vomiting',
    citation: [1, 2, 7, 8],
    next: 'pa-imaging-strategy',
    summary: 'CBC, CRP, UA, bHCG (post-menarchal); normal WBC does not rule out; pyuria does not rule out; CRP + WBC normal after 24h symptoms has strong NPV.',
  },

  // ===================================================================
  // MODULE 4: Imaging
  // ===================================================================
  {
    id: 'pa-imaging-strategy',
    type: 'info',
    module: 4,
    title: 'Imaging Pathway — US First, CT Last',
    body: '**Goal: minimize ionizing radiation in children.** Use a stepwise pathway. [9,10]\n\n**Step 1 — Graded Compression Ultrasound (first-line):** [9]\n- Sensitivity 85-95%, specificity 90-95% in experienced hands\n- **Diagnostic criteria:**\n  - Non-compressible blind-ending tubular structure ≥**6-7 mm** outer diameter\n  - Appendicolith\n  - Periappendiceal fluid/fat stranding\n  - Hyperemia on color Doppler\n- **Operator-dependent** — sensitivity drops sharply with inexperience or body habitus\n- US can also identify alternative diagnoses (ovarian pathology, intussusception)\n\n**Step 2 — MRI (preferred if US equivocal and MRI is available):** [9,10]\n- No radiation, sensitivity/specificity comparable to CT (>95%)\n- Limited availability and longer scan times; many centers cannot offer 24/7\n- Especially useful in pregnant teens and when US visualization is poor\n\n**Step 3 — CT abdomen/pelvis with IV contrast (last resort):** [10]\n- Sensitivity/specificity >95%\n- Reserve for: MRI unavailable AND US equivocal AND ongoing high suspicion\n- Use weight-based, low-dose pediatric protocols (ALARA)\n- A negative CT effectively rules out appendicitis\n\n**Practical workflow:** [9,10]\n- **PAS ≥7 + classic exam:** US to confirm + surgical consult; if US definitively shows appendicitis → OR\n- **PAS 4-6:** US first; if equivocal/inconclusive → MRI if available, otherwise observe with serial exams ± CT\n- **PAS ≤3:** imaging usually NOT needed; consider observation or discharge\n- **Pregnant adolescents:** US first, MRI if needed; **avoid CT**\n\n**Key principle:** A non-visualized appendix on US in a low-PAS child does **not** require CT — serial exams + repeat US in 6-12h is reasonable.',
    citation: [9, 10],
    next: 'pa-imaging-decision',
    summary: 'US first (≥6-7 mm non-compressible appendix); MRI if equivocal; CT only as last resort; pregnant adolescent: US/MRI, avoid CT.',
    safetyLevel: 'warning',
  },
  {
    id: 'pa-imaging-decision',
    type: 'question',
    module: 4,
    title: 'Imaging Result',
    body: 'Based on imaging findings, route the case: [9,10]',
    citation: [9, 10],
    options: [
      {
        label: 'Imaging POSITIVE for appendicitis',
        description: 'Non-compressible appendix ≥6-7 mm, appendicolith, periappendiceal stranding, hyperemia',
        next: 'pa-antibiotics',
        urgency: 'critical',
      },
      {
        label: 'Imaging EQUIVOCAL or appendix not visualized',
        description: 'Serial exams + repeat imaging vs MRI/CT vs admit for observation',
        next: 'pa-equivocal',
        urgency: 'urgent',
      },
      {
        label: 'Imaging NEGATIVE',
        description: 'Appendix visualized and normal, OR negative MRI/CT',
        next: 'pa-dispo-discharge',
      },
    ],
  },
  {
    id: 'pa-equivocal',
    type: 'info',
    module: 4,
    title: 'Equivocal Imaging Pathway',
    body: '**Non-visualized appendix on US is common — the algorithm depends on PAS and clinical trajectory.** [9,10]\n\n**Options:**\n\n1. **Serial exams in the ED (4-6h):** [10]\n   - Re-examine, re-trend WBC/CRP, recalculate PAS\n   - Many low-equivocal cases declare themselves (better or clearly worse)\n   - Document each reassessment\n\n2. **MRI:** [9,10]\n   - Preferred next step if available and clinical suspicion remains moderate-high\n   - Especially indicated in pregnant teens, prior abdominal surgery, obese kids where US visualization fails\n\n3. **CT abdomen/pelvis with IV contrast:** [10]\n   - Reserve for: MRI unavailable AND clinical suspicion remains high AND US non-diagnostic\n   - Use pediatric low-dose ALARA protocols\n\n4. **Admission for observation:** [10]\n   - Reasonable when imaging is equivocal but PAS is borderline (4-6)\n   - Surgical service or pediatric hospitalist with q4h reassessments\n   - Repeat imaging in 12-24h if no clinical improvement\n\n5. **Shared decision discharge:** [10]\n   - Low PAS (≤3) + equivocal US + reliable family\n   - Strict 12-24h recheck\n   - Clear return precautions\n\n**Avoid:**\n- Defaulting to CT without trying US/MRI first\n- Sending home without specific recheck plan when imaging non-diagnostic',
    citation: [9, 10],
    next: 'pa-dispo',
    summary: 'Non-visualized appendix: serial exams + MRI > CT > admit for observation; shared decision discharge with strict recheck only if low PAS + reliable family.',
  },

  // ===================================================================
  // MODULE 5: Antibiotics
  // ===================================================================
  {
    id: 'pa-antibiotics',
    type: 'info',
    module: 5,
    title: 'Preop Antibiotics',
    body: '**Administer broad-spectrum antibiotics within 1 hour of diagnosis.** [11,12]\n\n**Coverage required:**\n- Gram-negatives (E. coli, Klebsiella)\n- Anaerobes (Bacteroides fragilis)\n- Enterococcus (variable, often covered empirically in complicated cases)\n\n**First-line regimens (uncomplicated appendicitis):** [11,12]\n\n| Regimen | Pediatric Dose |\n|---------|----------------|\n| **Cefoxitin** (single-agent) | 40 mg/kg IV q6h (max 2 g/dose) |\n| **Ceftriaxone + Metronidazole** | Ceftriaxone 50-75 mg/kg IV q24h (max 2 g) + Metronidazole 10 mg/kg IV q8h (max 500 mg) |\n| **Ampicillin-Sulbactam** | 50 mg/kg ampicillin component IV q6h (max 3 g amp/dose) |\n\n**Complicated/perforated appendicitis or septic:** [11,12]\n\n| Regimen | Pediatric Dose |\n|---------|----------------|\n| **Piperacillin-tazobactam** | 100 mg/kg pip component IV q6-8h (max 4 g pip/dose) |\n| **Meropenem** (severe, MDR risk) | 20 mg/kg IV q8h (max 1 g/dose) |\n\n**Penicillin allergy (true IgE-mediated):**\n- Ciprofloxacin 10 mg/kg IV q12h (max 400 mg/dose) + Metronidazole 10 mg/kg IV q8h\n\n**Non-operative management (NOM):** [12,13]\n- Selected **uncomplicated** cases (no abscess, no perforation, no appendicolith) may be candidates for antibiotic-only therapy with delayed/avoided appendectomy\n- Discuss with pediatric surgery — institutional protocols vary\n- Higher recurrence rate (~30% at 1 year) — informed consent required\n- NOT appropriate for: complicated appendicitis, appendicolith on imaging, severe symptoms, immunocompromised',
    citation: [11, 12, 13],
    next: 'pa-dispo',
    summary: 'Cefoxitin OR ceftriaxone+metronidazole OR amp-sulbactam for uncomplicated; pip-tazo for complicated/perforated; NOM is an option for select uncomplicated cases.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 6: Disposition
  // ===================================================================
  {
    id: 'pa-dispo',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Select disposition based on imaging, PAS, and clinical trajectory: [10,11,12]',
    citation: [10, 11, 12],
    options: [
      {
        label: 'OR — appendectomy',
        description: 'Confirmed appendicitis on imaging, surgical service accepting',
        next: 'pa-dispo-or',
        urgency: 'critical',
      },
      {
        label: 'Admit for observation',
        description: 'Equivocal imaging + persistent symptoms, or NOM trial, or perforated awaiting OR',
        next: 'pa-dispo-admit',
        urgency: 'urgent',
      },
      {
        label: 'Discharge with rapid recheck',
        description: 'Low PAS + negative imaging OR low PAS + non-diagnostic US + reliable family',
        next: 'pa-dispo-discharge',
      },
    ],
  },
  {
    id: 'pa-dispo-or',
    type: 'result',
    module: 6,
    title: 'OR — Appendectomy',
    body: '**Laparoscopic appendectomy is the gold standard for confirmed pediatric appendicitis.** [11,12]\n\n**Pre-op:**\n- IV access, NPO, IVF maintenance\n- Antibiotics within 1 hour of diagnosis ([see Antibiotics](#/node/pa-antibiotics))\n- Type and screen if complicated/perforated\n- Pain control: IV opioids titrated (avoid masking exam until surgical decision made)\n- Antiemetic: ondansetron 0.15 mg/kg IV (max 8 mg)\n\n**Surgical consult:**\n- All confirmed cases\n- Complicated/perforated: pediatric surgery, not adult general surgery, when possible\n- Discuss timing — most go to OR same day; very early or stable cases sometimes deferred to morning\n\n**Post-op disposition (for the consulting team):**\n- Uncomplicated: discharge POD 1\n- Perforated/abscess: IV abx ≥3-5 days, may need drain placement',
    recommendation: 'Surgical consult for laparoscopic appendectomy. Administer preop antibiotics within 1 hour. NPO, IVF maintenance, antiemetic, opioid pain control.',
    confidence: 'definitive',
    citation: [11, 12],
  },
  {
    id: 'pa-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Admit for Observation',
    body: '**Admission criteria:** [10,12]\n- Equivocal imaging + ongoing symptoms\n- Non-operative management trial (selected uncomplicated cases)\n- Perforated appendicitis with planned interval appendectomy\n- Abscess requiring drainage\n- Failed outpatient management/return visit\n\n**Admission management:**\n- IV abx ([see Antibiotics](#/node/pa-antibiotics))\n- NPO until surgical decision finalized\n- IVF maintenance\n- Surgical team or pediatric hospitalist co-management\n- q4h abdominal exams\n- Repeat imaging in 12-24h if non-diagnostic at index visit\n\n**Escalation criteria → OR / PICU:**\n- Worsening peritoneal signs\n- New fever spike or tachycardia despite abx\n- Hemodynamic instability\n- Imaging progression (new abscess, free air, free fluid)',
    recommendation: 'Admit to surgical service or pediatric hospitalist. IV antibiotics, NPO, IVF, q4h abdominal exams, repeat imaging in 12-24h if needed.',
    confidence: 'recommended',
    citation: [10, 12],
  },
  {
    id: 'pa-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Rapid Recheck',
    body: '**Discharge criteria (shared decision-making):** [10,12]\n- PAS ≤3 with negative or non-diagnostic imaging, OR negative MRI/CT\n- Tolerating PO without vomiting\n- Adequate pain control with oral medications\n- Reliable family with transportation and phone\n- Live within 30-60 min of an ED capable of pediatric surgery\n- No language/communication barriers\n- Explicit return precautions verbalized back\n\n**Discharge plan:**\n- **Recheck within 12-24 hours** — PCP, surgical clinic, or ED return\n- Pain: weight-based ibuprofen 10 mg/kg PO q6h (max 600 mg) and/or acetaminophen 15 mg/kg PO q4-6h (max 1 g)\n- Avoid masking with strong opioids at home\n\n**Strict return precautions:**\n- Worsening or migrating pain\n- New or persistent fevers\n- Persistent vomiting (>2-3 episodes)\n- Inability to tolerate liquids\n- Lethargy, sleepy, "not acting right"\n- Bilious or bloody emesis\n- Pain with walking/jumping that wasn\'t there before\n\n**Document:**\n- Specific recheck plan with date/time\n- Return precautions reviewed with family\n- Shared decision-making conversation\n\n**Why this matters:** Pediatric appendicitis is a top driver of ED malpractice. A documented, time-bound recheck plan is your best defense against the inevitable presentation drift in 5-10% of low-risk cases.',
    recommendation: 'Discharge only if PAS ≤3, tolerating PO, reliable family, and explicit 12-24h recheck plan documented. Return precautions reviewed.',
    confidence: 'consider',
    citation: [10, 12],
  },
  {
    id: 'pa-pitfalls',
    type: 'info',
    module: 6,
    title: 'Pitfalls & Atypical Presentations',
    body: '**Don\'t miss these patterns.** [2,4,7]\n\n**Children <5 years old:** [2,4]\n- Cannot localize pain — present with diffuse abdominal pain, refusal to walk, irritability\n- May have **diarrhea** — easily misdiagnosed as gastroenteritis\n- Perforation rate at presentation **>80%**\n- Lower threshold to image (US first)\n- Re-examine frequently if observing\n\n**Retrocecal appendix:**\n- Pain more lateral, may radiate to flank\n- Less anterior tenderness; psoas sign more pronounced\n- US may miss it; consider MRI/CT if high suspicion\n\n**Pelvic appendix:**\n- Pain low, suprapubic; may have urinary symptoms and pyuria mimicking UTI\n- Tenesmus or diarrhea (rectal irritation)\n- Pelvic exam in adolescent females; consider transvaginal US\n\n**Perforated appendicitis:** [12]\n- Symptoms >48h, fever >39°C, WBC >18k\n- May have transient improvement after rupture, then worsening peritonitis\n- Imaging shows abscess, free fluid, or phlegmon\n- IV abx + possible drainage; interval appendectomy 6-8 weeks later\n\n**Pregnancy (adolescents):** [10]\n- Position shifts up and laterally with gestation\n- US first; MRI if equivocal — avoid CT\n- High maternal-fetal complication rate if missed\n\n**Immunocompromised children:**\n- Blunted inflammatory response — normal WBC and minimal exam findings\n- Lower threshold to image\n- Broader antibiotic coverage (pip-tazo or carbapenem)\n\n**Documentation pearls:**\n- PAS at presentation and after observation\n- Imaging modality chosen and rationale (especially CT vs MRI)\n- Surgical consultation timing\n- Shared decision-making for borderline disposition\n- Return precautions and recheck plan',
    citation: [2, 4, 7, 10, 12],
    next: 'pa-dispo',
    summary: '<5yo presents atypically with >80% perforation rate; retrocecal: flank pain, psoas sign; pelvic: urinary sx; pregnancy: avoid CT; immunocompromised: blunted response.',
    skippable: true,
  },
];

export const PEDS_APPENDICITIS_NODE_COUNT = PEDS_APPENDICITIS_NODES.length;

export const PEDS_APPENDICITIS_MODULE_LABELS = [
  'Recognition',
  'PAS Scoring',
  'Workup',
  'Imaging',
  'Antibiotics',
  'Disposition',
];

export const PEDS_APPENDICITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Bundy DG, Byerley JS, Liles EA, et al. Does this child have appendicitis? JAMA. 2007;298(4):438-451. doi:10.1001/jama.298.4.438' },
  { num: 2, text: 'Rothrock SG, Pagane J. Acute appendicitis in children: emergency department diagnosis and management. Ann Emerg Med. 2000;36(1):39-51.' },
  { num: 3, text: 'Becker T, Kharbanda A, Bachur R. Atypical clinical features of pediatric appendicitis. Acad Emerg Med. 2007;14(2):124-129.' },
  { num: 4, text: 'Marzuillo P, Germani C, Krauss BS, Barbi E. Appendicitis in children less than five years old: a challenge for the general practitioner. World J Clin Pediatr. 2015;4(2):19-24.' },
  { num: 5, text: 'Samuel M. Pediatric appendicitis score. J Pediatr Surg. 2002;37(6):877-881. doi:10.1053/jpsu.2002.32893' },
  { num: 6, text: 'Goldman RD, Carter S, Stephens D, et al. Prospective validation of the pediatric appendicitis score. J Pediatr. 2008;153(2):278-282.' },
  { num: 7, text: 'Saucier A, Huang EY, Emeremni CA, Pershad J. Prospective evaluation of a clinical pathway for suspected appendicitis. Pediatrics. 2014;133(1):e88-95.' },
  { num: 8, text: 'Yu CW, Juan LI, Wu MH, et al. Systematic review and meta-analysis of the diagnostic accuracy of procalcitonin, C-reactive protein and white blood cell count for suspected acute appendicitis. Br J Surg. 2013;100(3):322-329.' },
  { num: 9, text: 'Doria AS, Moineddin R, Kellenberger CJ, et al. US or CT for diagnosis of appendicitis in children and adults? A meta-analysis. Radiology. 2006;241(1):83-94.' },
  { num: 10, text: 'EB Medicine. Pediatric Appendicitis: Diagnosis and Management in the Emergency Department. Pediatr Emerg Med Pract. Updated 2024. https://www.ebmedicine.net/topics/abdominal/pediatric-appendicitis' },
  { num: 11, text: 'Di Saverio S, Podda M, De Simone B, et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15(1):27. doi:10.1186/s13017-020-00306-3' },
  { num: 12, text: 'Lee SL, Islam S, Cassidy LD, Abdullah F, Arca MJ; American Pediatric Surgical Association Outcomes and Clinical Trials Committee. Antibiotics and appendicitis in the pediatric population: an American Pediatric Surgical Association Outcomes and Clinical Trials Committee systematic review. J Pediatr Surg. 2010;45(11):2181-2185.' },
  { num: 13, text: 'Minneci PC, Hade EM, Lawrence AE, et al. Association of nonoperative management using antibiotic therapy vs laparoscopic appendectomy with treatment success and disability days in children with uncomplicated appendicitis. JAMA. 2020;324(6):581-593.' },
];
