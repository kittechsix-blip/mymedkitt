// myMedKitt — Adult Constipation, Fecal Impaction, Ileus & Ogilvie Syndrome
// ED approach to constipation spectrum in adults: Assessment → Red Flags →
// Impaction Management → Ileus/Pseudo-obstruction → Maintenance → Disposition.
// 38 nodes, 6 modules. Cross-listed: GI + Emergency Medicine.
// Primary sources:
//   - AGA-ACG Clinical Practice Guideline: Pharmacological Management of CIC (2023)
//   - Rao SSC. NEJM. 2017;377:869-881 — Constipation
//   - Bharucha AE, Lacy BE. Mayo Clin Proc. 2020;95(9):2022-36 — Constipation in adults
//   - Vaezi MF, et al. Am J Gastroenterol. 2016 — Fecal impaction management
//   - Saunders MD. NEJM. 2016;374:2364-8 — Acute colonic pseudo-obstruction
//   - Ponec RJ, et al. NEJM. 1999;341(3):137-141 — Neostigmine for ACPO (landmark trial)
//   - ASCRS/ASGE Clinical Practice Guidelines for ACPO (2020)

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CONSTIPATION_CRITICAL_ACTIONS = [
  { text: 'Exclude red flags: obstruction, perforation, volvulus, ischemia', nodeId: 'const-red-flags' },
  { text: 'Distinguish impaction vs ileus vs Ogilvie — treatment differs', nodeId: 'const-categorize' },
  { text: 'Fecal impaction: mineral oil enema → digital disimpaction → cleansing enema', nodeId: 'const-disimpaction-technique' },
  { text: 'Ogilvie: cecal diameter >12 cm or duration >6 days = perforation risk', nodeId: 'const-ogilvie-assess' },
  { text: 'Neostigmine 2 mg IV over 5 min for ACPO refractory to conservative Rx', nodeId: 'const-neostigmine' },
  { text: 'Have atropine 0.5 mg ready before giving neostigmine (for bradycardia)', nodeId: 'const-neostigmine' },
];

export const CONSTIPATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'const-start',
    type: 'info',
    module: 1,
    title: 'Adult Constipation Spectrum',
    body: '**Constipation** affects 15-20% of US adults, with higher prevalence in elderly and women. [1][2]\n\nThis consult covers the **ED approach** to the constipation spectrum:\n\n• **Simple constipation** — infrequent, hard stools without impaction\n• **Fecal impaction** — hard mass in rectum that cannot be evacuated\n• **Postoperative ileus (POI)** — transient GI dysmotility after surgery\n• **Acute colonic pseudo-obstruction (ACPO/Ogilvie syndrome)** — massive colonic dilation without mechanical obstruction\n\n**Modules:**\n1. Initial Assessment & Red Flags\n2. Categorization — Impaction vs Ileus vs Ogilvie\n3. Fecal Impaction Management\n4. Ileus & Ogilvie Syndrome\n5. Maintenance Therapy\n6. Disposition\n\n**Rome IV criteria for chronic constipation (≥3 months):** [1]\n• <3 spontaneous BMs/week\n• Straining, hard stools, incomplete evacuation, manual maneuvers in ≥25% of defecations\n• Loose stools rarely without laxatives',
    citation: [1, 2],
    next: 'const-history',
    summary: '15-20% prevalence. Spectrum: simple constipation → impaction → ileus → Ogilvie.',
    skippable: true,
  },

  {
    id: 'const-history',
    type: 'info',
    module: 1,
    title: 'Key History Elements',
    body: '**Stool Pattern:**\n• Last bowel movement (date, character)\n• Baseline frequency (normal varies: 3×/day to 3×/week)\n• Bristol Stool Scale type (1-2 = hard, 3-4 = normal, 5-7 = loose)\n• Straining, incomplete evacuation, digital maneuvers\n\n**Alarm Symptoms:**\n• Blood in stool (beyond hemorrhoid/fissure bleeding)\n• Unintentional weight loss\n• New-onset constipation age >50 without prior colonoscopy\n• Family history of colon cancer\n\n**Associated Symptoms:**\n• Abdominal pain, distention, nausea, vomiting\n• Fecal incontinence (overflow?)\n• Urinary retention (can coexist)\n\n**Context:**\n• Recent surgery (ileus risk)\n• Hospitalization, immobility\n• New medications (opioids #1 cause)\n• Diet changes, dehydration\n\n**Medications that cause constipation:**\n• Opioids, anticholinergics, calcium channel blockers\n• Iron supplements, antacids (aluminum/calcium)\n• Antidepressants (TCAs), antipsychotics\n• Antihistamines, diuretics',
    citation: [1, 2],
    next: 'const-red-flags',
    summary: 'Assess last BM, alarm symptoms, post-surgical status, constipating medications.',
  },

  {
    id: 'const-red-flags',
    type: 'question',
    module: 1,
    title: 'Red Flags Present?',
    body: '**Red flags requiring urgent evaluation:** [2][3]\n\n🚩 **Bowel Obstruction:**\n• Bilious vomiting\n• Complete obstipation (no gas or stool)\n• Severe cramping abdominal pain\n• High-pitched or absent bowel sounds\n• Distended, tympanic abdomen\n\n🚩 **Perforation/Peritonitis:**\n• Rigid abdomen, rebound tenderness\n• Fever, tachycardia, hypotension\n• Severe localized pain\n\n🚩 **Volvulus:**\n• Sudden severe pain with distention\n• "Coffee bean" sign on X-ray (sigmoid volvulus)\n\n🚩 **Ischemia:**\n• Pain out of proportion to exam\n• Bloody stool, elevated lactate\n• History of vascular disease, A-fib\n\n🚩 **Toxic Megacolon:**\n• Fever, tachycardia + colonic dilation\n• Often in IBD or C. diff colitis\n\n**If any red flags → immediate imaging and surgical consult.**',
    citation: [2, 3],
    options: [
      {
        label: 'Red flags present',
        description: 'Urgent workup needed',
        next: 'const-urgent-workup',
        urgency: 'critical',
      },
      {
        label: 'No red flags',
        description: 'Categorize type of constipation',
        next: 'const-categorize',
      },
    ],
    summary: 'Red flags: obstruction, perforation, volvulus, ischemia, toxic megacolon.',
  },

  {
    id: 'const-urgent-workup',
    type: 'info',
    module: 1,
    title: 'Urgent Evaluation',
    body: '**Immediate workup for red flags:**\n\n**Labs:**\n• CBC, BMP, lactate, lipase\n• Type & screen if surgical candidate\n• LFTs, coags if concern for ischemia\n\n**Imaging:**\n• **Abdominal X-ray** (upright + supine or decubitus)\n  - Look for: dilated loops, air-fluid levels, free air, fecal loading\n• **CT abdomen/pelvis with IV contrast** (preferred)\n  - Identifies obstruction level, transition point\n  - Evaluates for ischemia, perforation, volvulus\n\n**Initial management:**\n• NPO\n• IV fluid resuscitation\n• NG tube if vomiting or significant distention\n• Foley for strict I/O\n• Surgical consult early\n\n**Surgical emergencies:**\n• Closed-loop obstruction\n• Perforation\n• Ischemic bowel\n• Volvulus without decompression\n\n**After stabilization, if not a surgical emergency → proceed to categorize.**',
    citation: [2, 3],
    next: 'const-categorize',
    summary: 'XR or CT. NPO, IV fluids, NG if vomiting. Surgical consult if obstruction/perforation.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: CATEGORIZATION
  // =====================================================================

  {
    id: 'const-categorize',
    type: 'question',
    module: 2,
    title: 'Categorize the Problem',
    body: '**Distinguish the type — treatment differs significantly:**\n\n**Fecal Impaction:**\n• Hard stool mass palpable in rectum or on abdominal exam\n• May have overflow "diarrhea" around impaction\n• Colon not significantly dilated on imaging\n\n**Postoperative Ileus (POI):**\n• Recent surgery (typically <5-7 days)\n• Nausea, vomiting, abdominal distention\n• Diffuse mild dilation on X-ray (small bowel + colon)\n• Hypoactive or absent bowel sounds\n\n**Acute Colonic Pseudo-Obstruction (ACPO/Ogilvie):**\n• Massive colonic dilation (cecum >9-12 cm)\n• No mechanical obstruction on CT\n• Often in critically ill, hospitalized, or post-surgical patients\n• May have bowel sounds present\n\n**Simple Constipation:**\n• Infrequent hard stools without impaction\n• No significant abdominal distention\n• Responsive to oral laxatives\n\n**Select the category:**',
    citation: [3, 4, 5],
    options: [
      {
        label: 'Fecal impaction',
        description: 'Hard mass in rectum',
        next: 'const-impaction-assess',
      },
      {
        label: 'Postoperative ileus',
        description: 'Recent surgery, diffuse dilation',
        next: 'const-ileus-assess',
      },
      {
        label: 'ACPO / Ogilvie syndrome',
        description: 'Massive colonic dilation, no obstruction',
        next: 'const-ogilvie-assess',
      },
      {
        label: 'Simple constipation',
        description: 'No impaction or dilation',
        next: 'const-simple-treatment',
      },
    ],
    summary: 'Impaction = rectal mass. POI = post-op, diffuse dilation. ACPO = massive colonic dilation.',
  },

  // =====================================================================
  // MODULE 3: FECAL IMPACTION
  // =====================================================================

  {
    id: 'const-impaction-assess',
    type: 'info',
    module: 3,
    title: 'Fecal Impaction Assessment',
    body: '**Fecal impaction** = retained mass of hardened stool that cannot be evacuated voluntarily. [3][4]\n\n**Risk factors:**\n• Elderly, debilitated, immobile\n• Opioid use\n• Neurologic disease (stroke, Parkinson\'s, spinal cord injury)\n• Chronic constipation, dehydration\n• Psychiatric illness, cognitive impairment\n\n**Presentation:**\n• Abdominal discomfort, bloating, anorexia\n• Paradoxical "diarrhea" (liquid stool around impaction)\n• Urinary retention, recurrent UTIs\n• Nausea, vomiting (if prolonged)\n• Delirium in elderly (may be only sign!)\n\n**Diagnosis:**\n• **Rectal exam** — hard stool mass palpable\n• **Abdominal exam** — may feel fecal mass in LLQ\n• **X-ray** — significant stool burden, not grossly dilated\n\n**Complications:**\n• Stercoral ulceration (pressure necrosis → perforation)\n• Fecal incontinence\n• Rectal prolapse\n• Urinary retention/overflow',
    citation: [3, 4],
    next: 'const-disimpaction-prep',
    summary: 'Risk: elderly, opioids, immobility. Paradoxical diarrhea common. Can cause delirium in elderly.',
  },

  {
    id: 'const-disimpaction-prep',
    type: 'info',
    module: 3,
    title: 'Prepare for Disimpaction',
    body: '**Before manual disimpaction:**\n\n**Soften the stool first:**\n• **Mineral oil retention enema** (120-150 mL)\n• Administer 30-60 minutes before disimpaction\n• Lubricates and softens impacted mass\n• Reduces trauma during extraction\n\n**Provide analgesia/anxiolysis:**\n• Acetaminophen 1 g PO/PR or\n• Ketorolac 15-30 mg IV\n• Consider low-dose benzodiazepine for anxious patients\n• Severe cases: procedural sedation or pudendal nerve block\n\n**Position:**\n• Left lateral decubitus with knees to chest\n• Provides optimal access and comfort\n\n**Supplies needed:**\n• Gloves (double-glove preferred)\n• Water-soluble lubricant (generous amount)\n• Chux pads, bedpan\n• Saline for follow-up enema\n\n**Document baseline vitals** — vagal response possible during procedure.',
    citation: [3, 4],
    next: 'const-disimpaction-technique',
    summary: 'Soften with mineral oil enema first. Pre-medicate for pain. Left lateral position.',
  },

  {
    id: 'const-disimpaction-technique',
    type: 'info',
    module: 3,
    title: 'Manual Disimpaction Technique',
    body: '**Manual Digital Disimpaction:** [4]\n\n**Technique:**\n1. Lubricate gloved index finger generously\n2. Insert finger gently into rectum\n3. **Break up stool** using scissoring motion\n4. **Hook and extract** fragments with flexed finger\n5. Move finger in circular motion to loosen stool\n6. Remove fragments in small pieces\n7. **Stop if patient has significant pain or vagal symptoms**\n8. Repeat until rectum is empty\n\n**Duration:** 15-30 minutes typically required\n\n**Vagal precautions:**\n• Monitor for bradycardia, hypotension, diaphoresis\n• Stop immediately if symptomatic bradycardia\n• Have atropine 0.5 mg available\n• Avoid in patients with cardiac conduction abnormalities\n\n**After disimpaction:**\n• Administer **tap water or saline enema** (500-1000 mL) to clear remaining fragments\n• May need repeated enemas\n• Check post-void residual if urinary retention suspected',
    citation: [4],
    next: 'const-disimpaction-follow',
    summary: 'Scissoring + hook extraction. Stop if vagal symptoms. Follow with cleansing enema.',
  },

  {
    id: 'const-disimpaction-follow',
    type: 'info',
    module: 3,
    title: 'Post-Disimpaction Care',
    body: '**Cleansing enemas after manual disimpaction:**\n\n**Tap Water Enema:**\n• 500-1000 mL warm tap water\n• Safer than phosphate enemas\n• May repeat 2-3 times\n\n**Normal Saline Enema:**\n• 500-1000 mL warmed NS\n• Safest option, especially in elderly or renal impairment\n\n**Sodium Phosphate (Fleet\'s) — use with caution:**\n• Single dose only, 118 mL\n• **Avoid in:** elderly, renal impairment, heart failure, dehydration\n• Risk: fatal hyperphosphatemia, hypocalcemia [4]\n\n**If high impaction (above reach):**\n• May need whole-bowel irrigation (GoLYTELY via NG)\n• Consider GI consult for colonoscopic decompression\n\n**Signs of successful disimpaction:**\n✅ Rectum empty on exam\n✅ Soft abdomen\n✅ Passage of stool with enema\n✅ Patient comfort improved\n\n**Complications to watch for:**\n• Rectal bleeding (usually minor)\n• Vagal episode\n• Rarely: rectal perforation (pre-existing stercoral ulcer)',
    citation: [3, 4],
    next: 'const-maintenance',
    summary: 'Cleansing enema after manual disimpaction. Avoid phosphate enemas in elderly/renal disease.',
  },

  // =====================================================================
  // MODULE 4: ILEUS & OGILVIE SYNDROME
  // =====================================================================

  {
    id: 'const-ileus-assess',
    type: 'info',
    module: 4,
    title: 'Postoperative Ileus',
    body: '**Postoperative ileus (POI)** = transient impairment of GI motility after surgery. [5][6]\n\n**Expected duration by surgery type:**\n• Small bowel: 24-48 hours\n• Stomach: 24-48 hours\n• Colon: 3-5 days\n\n**Prolonged POI** = ileus beyond expected timeframe\n\n**Risk factors:**\n• Abdominal surgery (especially open, bowel manipulation)\n• Prolonged surgery, blood loss\n• Opioid use (major factor)\n• Electrolyte abnormalities (hypokalemia, hypomagnesemia)\n• Immobility\n• Perioperative complications\n\n**Presentation:**\n• Nausea, vomiting, abdominal distention\n• No passage of flatus or stool\n• Diffuse mild tenderness\n• Absent or hypoactive bowel sounds\n\n**Imaging:**\n• Diffuse gaseous distention of small bowel AND colon\n• Air-fluid levels\n• No transition point (unlike mechanical obstruction)\n\n**Always rule out mechanical obstruction with CT if uncertain.**',
    citation: [5, 6],
    next: 'const-ileus-treatment',
    summary: 'Expected 3-5 days post-colonic surgery. Opioids major contributor. Rule out mechanical SBO.',
  },

  {
    id: 'const-ileus-treatment',
    type: 'info',
    module: 4,
    title: 'Ileus Treatment',
    body: '**Conservative management (first-line):** [5][6]\n\n• **NPO** until bowel function returns\n• **NG tube** if vomiting or significant distention\n• **IV fluids** — avoid hypovolemia\n• **Correct electrolytes** — especially K+, Mg2+\n• **Minimize opioids** — use multimodal analgesia\n• **Early ambulation** — mobilize as soon as possible\n• **Gum chewing** — stimulates motility (evidence-based!) [6]\n\n**Pharmacologic options:**\n\n**Alvimopan (Entereg)** — peripheral mu-opioid antagonist [6][7]\n• 12 mg PO 30 min to 5 hours pre-op, then 12 mg BID\n• Max 15 doses or until discharge\n• Reduces time to GI recovery by ~12-24 hours\n• Only available via hospital EASE program\n• Not for patients on chronic opioids >7 days\n\n**Methylnaltrexone (Relistor):**\n• Limited evidence for POI specifically\n• More established for opioid-induced constipation\n\n**Avoid:** Metoclopramide (no proven benefit for POI)\n\n**Resolution signs:**\n• Passage of flatus\n• Bowel sounds return\n• Tolerate clear liquids → advance diet',
    citation: [5, 6, 7],
    next: 'const-ileus-escalation',
    summary: 'NPO, NG if vomiting, correct K+/Mg2+, minimize opioids, early ambulation, gum chewing.',
  },

  {
    id: 'const-ileus-escalation',
    type: 'info',
    module: 4,
    title: 'Refractory Ileus',
    body: '**If ileus persists >5-7 days:**\n\n**Re-evaluate:**\n• Repeat CT — rule out mechanical obstruction, abscess, leak\n• Check for infection (UTI, pneumonia, wound infection)\n• Review medications for contributing drugs\n• Check electrolytes again\n\n**Consider:**\n• Neostigmine (if features overlap with ACPO)\n• GI consult for colonoscopic evaluation\n• TPN if prolonged NPO expected\n\n**Surgical consult if:**\n• Concern for mechanical obstruction\n• Cecal dilation >12 cm (perforation risk)\n• Failure to improve despite optimal conservative care\n• Signs of ischemia or perforation\n\n**Transition to ACPO protocol if:**\n• Massive colonic dilation (cecum >9-12 cm)\n• Duration >6 days\n• No improvement with conservative measures',
    citation: [5, 6],
    next: 'const-maintenance',
    summary: 'If >5-7 days: repeat CT, check for infection, consult GI/surgery. Consider ACPO if cecum >9 cm.',
  },

  {
    id: 'const-ogilvie-assess',
    type: 'info',
    module: 4,
    title: 'ACPO / Ogilvie Syndrome',
    body: '**Acute Colonic Pseudo-Obstruction (ACPO/Ogilvie Syndrome)** [5][8]\n\nMassive colonic dilation WITHOUT mechanical obstruction. Named for Sir Heneage Ogilvie (1948).\n\n**Pathophysiology:**\n• Autonomic dysfunction — excess sympathetic, decreased parasympathetic tone\n• Results in functional obstruction at splenic flexure\n\n**Risk factors:**\n• Recent surgery (orthopedic, cardiac, obstetric, abdominal)\n• Critical illness, trauma, sepsis\n• Electrolyte abnormalities\n• Medications (opioids, anticholinergics, CCBs)\n• Neurologic disease (stroke, Parkinson\'s, spinal cord injury)\n\n**Presentation:**\n• Massive abdominal distention (often dramatic)\n• Nausea, vomiting, abdominal discomfort\n• **May still pass some flatus/stool** (unlike complete obstruction)\n• Bowel sounds may be present or absent\n\n**PERFORATION RISK:** [5][8]\n• Cecal diameter **>12 cm** OR duration **>6 days** = high risk\n• Cecal perforation mortality: 40-50%\n• Risk increases exponentially with diameter',
    citation: [5, 8],
    next: 'const-ogilvie-imaging',
    summary: 'Massive colonic dilation without obstruction. Cecum >12 cm or >6 days = high perforation risk.',
  },

  {
    id: 'const-ogilvie-imaging',
    type: 'info',
    module: 4,
    title: 'ACPO Imaging',
    body: '**Imaging to confirm ACPO:**\n\n**Abdominal X-ray:**\n• Massively dilated colon (cecum to splenic flexure)\n• Cecum often most dilated segment\n• **Measure cecal diameter** — critical for management\n  - <9 cm: lower risk\n  - 9-12 cm: moderate risk\n  - >12 cm: HIGH perforation risk\n• Haustral markings preserved (unlike toxic megacolon)\n\n**CT abdomen/pelvis WITH contrast:**\n• **Essential to rule out mechanical obstruction**\n• Look for: transition point, mass, volvulus, hernia\n• Evaluate for ischemia (bowel wall thickening, pneumatosis)\n• Assess for free air (perforation)\n\n**Water-soluble contrast enema:**\n• If CT not available or equivocal\n• Rules out distal mechanical obstruction\n• Therapeutic decompression possible\n\n**Key CT findings in ACPO:**\n• Dilated colon proximal to splenic flexure\n• No transition point\n• Decompressed distal colon/rectum\n• No obstructing lesion',
    citation: [5, 8],
    next: 'const-ogilvie-conservative',
    summary: 'Measure cecal diameter on XR. CT essential to rule out mechanical obstruction.',
  },

  {
    id: 'const-ogilvie-conservative',
    type: 'question',
    module: 4,
    title: 'ACPO Initial Management',
    body: '**Conservative management (24-72 hours):** [5][8][9]\n\n• **NPO** — complete bowel rest\n• **NG tube decompression** if vomiting or upper GI distention\n• **Rectal tube** — may provide modest decompression\n• **IV fluids** — correct dehydration\n• **Correct electrolytes** — K+ >4.0, Mg2+ >2.0\n• **D/C offending medications** — opioids, anticholinergics\n• **Treat underlying illness** — sepsis, infection, etc.\n• **Mobilize patient** — if possible\n• **Serial X-rays** every 12-24 hours — monitor cecal diameter\n\n**Conservative measures succeed in ~80% of cases** if:\n• Cecum <12 cm\n• Duration <4-6 days\n• No signs of ischemia\n\n**Criteria for escalation:**\n• Cecum >12 cm despite 24-48h conservative Rx\n• Cecum increasing despite conservative Rx\n• Duration >4-6 days\n• Signs of ischemia (peritonitis, fever, leukocytosis)\n• Failure to improve',
    citation: [5, 8, 9],
    options: [
      {
        label: 'Conservative measures — cecum <12 cm, stable',
        description: 'Continue supportive care',
        next: 'const-ogilvie-monitor',
      },
      {
        label: 'Escalate — cecum ≥12 cm, refractory, or >4-6 days',
        description: 'Proceed to neostigmine',
        next: 'const-neostigmine',
      },
    ],
    summary: 'Conservative Rx: NPO, NG, rectal tube, correct K+/Mg2+, stop offending meds. 80% respond.',
  },

  {
    id: 'const-ogilvie-monitor',
    type: 'info',
    module: 4,
    title: 'ACPO Monitoring',
    body: '**Monitoring during conservative management:**\n\n**Serial abdominal X-rays:**\n• Every 12-24 hours\n• Track cecal diameter\n• Watch for pneumatosis or free air\n\n**Clinical monitoring:**\n• Abdominal exam Q4-6 hours\n• Watch for peritoneal signs, increasing tenderness\n• Vitals for fever, tachycardia\n\n**Labs:**\n• Daily BMP — monitor K+, Mg2+\n• CBC — watch for leukocytosis (ischemia?)\n• Lactate if concern for ischemia\n\n**Expected timeline:**\n• Improvement typically seen within 24-72 hours\n• Colonic decompression may take 3-5 days\n• Recurrence rate ~15-20%\n\n**If improving:**\n• Slow diet advancement when flatus returns\n• Start PEG-based regimen to prevent recurrence [8]\n\n**If worsening or no improvement in 24-48h → escalate to neostigmine.**',
    citation: [5, 8],
    next: 'const-neostigmine',
    summary: 'Serial XR q12-24h, exam q4-6h, daily lytes. Expect improvement in 24-72h.',
  },

  {
    id: 'const-neostigmine',
    type: 'info',
    module: 4,
    title: 'Neostigmine for ACPO',
    body: '**Neostigmine — Pharmacologic Decompression** [8][9][10]\n\nAcetylcholinesterase inhibitor that enhances parasympathetic activity → colonic motility.\n\n**Indications:**\n• ACPO refractory to 24-72h conservative management\n• Cecum ≥12 cm\n• Duration >4-6 days\n• No contraindications\n\n**Contraindications:**\n• Mechanical bowel obstruction (must rule out first!)\n• Recent MI, severe cardiac disease\n• Active bronchospasm (asthma, COPD exacerbation)\n• Pregnancy\n• Renal failure (relative — Cr >3 mg/dL)\n\n**Pre-treatment:**\n✅ Continuous cardiac monitoring\n✅ IV access\n✅ Atropine 0.5 mg at bedside\n✅ Foley catheter in place\n✅ Rectal tube in place\n✅ Patient supine or left lateral\n\n**Efficacy:**\n• **91% initial response** in landmark NEJM trial [10]\n• Response typically within 30 minutes\n• ~10% need repeat dose\n• Superior to colonoscopic decompression as first-line',
    citation: [8, 9, 10],
    next: 'const-neostigmine-admin',
    summary: 'Neostigmine for refractory ACPO. 91% response rate. Need continuous monitoring + atropine ready.',
    safetyLevel: 'warning',
  },

  {
    id: 'const-neostigmine-admin',
    type: 'info',
    module: 4,
    title: 'Neostigmine Administration',
    body: '**Neostigmine Dosing Protocol:** [8][9][10]\n\n**Dose:** 2 mg IV over **5 FULL MINUTES** (REAL five minutes on the clock)\n• Do NOT give as rapid IV push\n• Consider 1 mg increments if cautious (1 mg, wait, then another 1 mg)\n\n**Monitoring during administration:**\n• Continuous ECG — watch for bradycardia\n• BP every 2-3 minutes\n• Stop immediately if symptomatic bradycardia\n\n**Give atropine 0.5 mg IV if:**\n• HR <60 with symptoms (dizziness, hypotension)\n• Asymptomatic HR <40\n\n**Expected response:**\n• Passage of flatus/stool within 10-30 minutes\n• Abdominal decompression visible on exam\n• X-ray improvement within 4-6 hours\n\n**"Killer Bees" — side effects to watch:**\n• **B**radycardia (most common, ~10%)\n• **B**ronchospasm\n• **B**ronchorrhea\n• Also: abdominal cramping, nausea, salivation\n\n**If no response in 3 hours:**\n• May repeat neostigmine 2 mg IV (max 3 doses total)\n• Half-life ~50 min, so can re-dose after 3 hours',
    citation: [8, 9, 10],
    next: 'const-ogilvie-escalation',
    summary: '2 mg IV over 5 min. Watch for bradycardia. Atropine 0.5 mg if symptomatic. Response in 10-30 min.',
  },

  {
    id: 'const-ogilvie-escalation',
    type: 'info',
    module: 4,
    title: 'ACPO: If Neostigmine Fails',
    body: '**If neostigmine fails (up to 3 doses):** [5][8]\n\n**Colonoscopic Decompression:**\n• GI consult for urgent colonoscopy\n• Success rate ~70-80%\n• Can place decompression tube\n• Risk of perforation (~2-3%), especially with ischemic bowel\n• May need to repeat\n\n**Percutaneous Cecostomy:**\n• IR-guided tube placement into cecum\n• Reserved for high surgical risk patients\n• Bridge to surgery or long-term decompression\n\n**Surgical Options:**\n• **Cecostomy** (tube placement)\n• **Colectomy** if ischemia or perforation\n• **Perioperative mortality ~25%** — avoid surgery if possible\n\n**Indications for immediate surgery:**\n• Perforation\n• Peritonitis\n• Frank ischemia/necrosis on imaging\n• Failure of all non-operative measures with persistent dilation\n\n**Post-decompression:**\n• Start PEG 17 g daily to prevent recurrence [8]\n• Recurrence rate without prophylaxis: ~33%\n• Recurrence rate with PEG: ~0%',
    citation: [5, 8],
    next: 'const-maintenance',
    summary: 'Colonoscopic decompression if neostigmine fails. Surgery mortality ~25%. PEG prevents recurrence.',
  },

  // =====================================================================
  // MODULE 5: MAINTENANCE & SIMPLE CONSTIPATION
  // =====================================================================

  {
    id: 'const-simple-treatment',
    type: 'info',
    module: 5,
    title: 'Simple Constipation Treatment',
    body: '**ED treatment for simple constipation (no impaction):** [1][2]\n\n**First-line (OTC):**\n\n**Osmotic Laxatives:**\n• **PEG 3350 (MiraLAX):** 17 g daily in 8 oz liquid\n  - Best evidence, AGA/ACG strongly recommended\n• **Magnesium citrate:** 150-300 mL PO × 1\n  - For rapid effect in ED\n  - Avoid in renal impairment\n• **Lactulose:** 15-30 mL PO daily\n  - Alternative if PEG not tolerated\n\n**Stimulant Laxatives:**\n• **Bisacodyl:** 5-10 mg PO or 10 mg PR\n• **Senna:** 2-4 tablets PO at bedtime\n• Safe for short-term use\n\n**Bulk-forming agents:**\n• **Psyllium (Metamucil):** 1-2 tbsp daily with water\n• Requires adequate fluid intake\n\n**If no BM in ED and patient stable:**\n• Prescribe PEG 17 g daily\n• Consider bisacodyl suppository before discharge\n• Follow-up with PCP if no BM in 48-72 hours\n\n**Avoid: docusate (stool softener) alone** — no better than placebo [1]',
    citation: [1, 2],
    next: 'const-maintenance',
    summary: 'PEG is first-line. Mag citrate for rapid effect. Avoid docusate alone — no better than placebo.',
  },

  {
    id: 'const-maintenance',
    type: 'info',
    module: 5,
    title: 'Maintenance Therapy',
    body: '**Maintenance regimen to prevent recurrence:** [1][2]\n\n**First-line: PEG 3350 (MiraLAX)**\n• 17 g daily (1 capful in 8 oz liquid)\n• Titrate for 1 soft BM daily\n• Safe for long-term use\n\n**Second-line options:**\n• **Lactulose:** 15-45 mL daily\n• **Magnesium oxide:** 400-800 mg daily\n• **Senna:** 2-4 tablets at bedtime (for stimulant-dependent patients)\n\n**Prescription options (if OTC fails):** [1]\n• **Linaclotide (Linzess):** 145-290 mcg daily\n• **Plecanatide (Trulance):** 3 mg daily\n• **Lubiprostone (Amitiza):** 24 mcg BID\n• **Prucalopride (Motegrity):** 2 mg daily\n\n**Behavioral measures:**\n• Adequate fluid intake (1.5-2 L/day)\n• Fiber: 25-30 g/day\n• Regular physical activity\n• Scheduled toilet time (after meals, utilize gastrocolic reflex)\n• Don\'t ignore urge to defecate\n\n**Medication review:**\n• Minimize opioids if possible\n• Switch or reduce constipating medications',
    citation: [1, 2],
    next: 'const-disposition',
    summary: 'PEG 17 g daily long-term. Rx options: linaclotide, prucalopride if OTC fails. Fiber + fluids.',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'const-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Determine appropriate disposition:**\n\n**Discharge home if:**\n• Simple constipation or mild impaction successfully treated\n• Tolerating oral intake\n• No red flags or complications\n• Reliable follow-up available\n\n**Observation/admit if:**\n• Moderate-severe impaction requiring repeated disimpaction\n• Dehydration requiring IV fluids\n• Elderly/frail with comorbidities\n• Unable to tolerate oral laxatives\n\n**Admit (floor or ICU) if:**\n• ACPO/Ogilvie syndrome\n• Postoperative ileus (already inpatient)\n• Concern for obstruction, ischemia, or perforation\n• Need for neostigmine or colonoscopic decompression\n• Unstable vitals\n\n**Select disposition:**',
    citation: [1, 2],
    options: [
      {
        label: 'Discharge home',
        description: 'Stable, treated, follow-up arranged',
        next: 'const-discharge',
      },
      {
        label: 'Admit',
        description: 'ACPO, ileus, refractory, or unstable',
        next: 'const-admit',
      },
    ],
    summary: 'Discharge: simple constipation treated. Admit: ACPO, ileus, refractory impaction, unstable.',
  },

  {
    id: 'const-discharge',
    type: 'info',
    module: 6,
    title: 'Discharge Instructions',
    body: '**Discharge prescriptions:**\n• PEG 3350 (MiraLAX): 17 g daily — 30-day supply\n• Consider bisacodyl 5 mg PRN if needed\n\n**Patient education:**\n1. Take PEG daily — don\'t stop when stools normalize\n2. Increase fiber (fruits, vegetables, whole grains)\n3. Drink 1.5-2 L water daily\n4. Stay active — daily walking helps motility\n5. Don\'t ignore the urge — go when you feel it\n\n**Follow-up:**\n• PCP within 1-2 weeks\n• GI referral if: chronic symptoms, failed OTC therapy, alarm symptoms\n\n**Return precautions:**\n🚩 No bowel movement × 3+ days despite treatment\n🚩 Severe abdominal pain or distention\n🚩 Nausea/vomiting\n🚩 Blood in stool (more than just on toilet paper)\n🚩 Fever\n🚩 Unable to tolerate oral intake\n\n**Age >50 with new constipation → ensure colonoscopy referral** (if not up to date)',
    citation: [1],
    next: undefined,
    summary: 'PEG daily, fiber/fluids, PCP follow-up. Return if no BM × 3 days, severe pain, vomiting.',
  },

  {
    id: 'const-admit',
    type: 'info',
    module: 6,
    title: 'Admission Orders',
    body: '**Admission orders for ACPO, ileus, or refractory impaction:**\n\n**Diet:** NPO\n\n**Activity:** OOB to chair, ambulate TID if able\n\n**IVF:** LR or NS at maintenance rate\n\n**Medications:**\n• D/C opioids if possible — use multimodal analgesia\n• D/C anticholinergics, CCBs if able\n• PPI if NPO prolonged\n• DVT prophylaxis\n\n**Tubes:**\n• NG tube to low intermittent suction if vomiting/distention\n• Rectal tube for ACPO\n• Foley for strict I/O\n\n**Labs:**\n• Daily BMP (K+, Mg2+)\n• CBC daily if concern for ischemia\n\n**Imaging:**\n• Serial KUB q12-24h for ACPO\n• Repeat CT if clinical worsening\n\n**Consults:**\n• GI — if ACPO, may need colonoscopic decompression\n• Surgery — if concern for obstruction, ischemia, perforation\n\n**Monitoring:**\n• Abdominal exam q4-6h\n• Vitals q4h, q1h if post-neostigmine',
    citation: [5, 8],
    next: undefined,
    summary: 'NPO, NG, rectal tube, serial KUB, correct lytes, ambulate, GI/surgery consult as needed.',
  },

];

export const CONSTIPATION_MODULE_LABELS = [
  'Initial Assessment',
  'Categorization',
  'Fecal Impaction',
  'Ileus & Ogilvie',
  'Maintenance',
  'Disposition',
];

export const CONSTIPATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Chang JY, Locke GR, Schleck CD, et al. AGA-ACG Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation. Gastroenterology. 2023;165(4):1086-1100. https://www.gastrojournal.org/article/S0016-5085(23)00513-9/fulltext' },
  { num: 2, text: 'Bharucha AE, Lacy BE. Mechanisms, Evaluation, and Management of Chronic Constipation. Gastroenterology. 2020;158(5):1232-1249. https://pubmed.ncbi.nlm.nih.gov/31945360/' },
  { num: 3, text: 'Rao SSC. Constipation: Evaluation and Treatment of Colonic and Anorectal Motility Disorders. Gastroenterol Clin North Am. 2007;36(3):687-711. https://pubmed.ncbi.nlm.nih.gov/17950444/' },
  { num: 4, text: 'Obokhare I. Fecal Impaction: A Cause for Concern? Clin Colon Rectal Surg. 2012;25(1):53-58. https://pmc.ncbi.nlm.nih.gov/articles/PMC3348737/' },
  { num: 5, text: 'Saunders MD. Acute Colonic Pseudo-Obstruction. Best Pract Res Clin Gastroenterol. 2007;21(4):671-687. https://pubmed.ncbi.nlm.nih.gov/17643908/' },
  { num: 6, text: 'Bragg D, El-Sharkawy AM, Psaltis E, et al. Postoperative Ileus: Recent Developments in Pathophysiology and Management. Clin Nutr. 2015;34(3):367-376. https://pubmed.ncbi.nlm.nih.gov/25819420/' },
  { num: 7, text: 'Behm B, Stollman N. Postoperative Ileus: Etiologies and Interventions. Clin Gastroenterol Hepatol. 2003;1(2):71-80. https://pubmed.ncbi.nlm.nih.gov/15017498/' },
  { num: 8, text: 'ASCRS/ASGE Clinical Practice Guidelines for Management of Acute Colonic Pseudo-Obstruction. Dis Colon Rectum. 2020;63(8):1044-1053. https://journals.lww.com/dcrjournal/fulltext/2020/08000/clinical_practice_guidelines_for_the.3.aspx' },
  { num: 9, text: 'Saunders MD, Kimmey MB. Systematic Review: Acute Colonic Pseudo-Obstruction. Aliment Pharmacol Ther. 2005;22(10):917-925. https://pubmed.ncbi.nlm.nih.gov/16268966/' },
  { num: 10, text: 'Ponec RJ, Saunders MD, Kimmey MB. Neostigmine for the Treatment of Acute Colonic Pseudo-Obstruction. N Engl J Med. 1999;341(3):137-141. https://www.nejm.org/doi/full/10.1056/NEJM199907153410301' },
];
