// myMedKitt — Pediatric Constipation & Fecal Disimpaction
// ED approach to constipation and fecal impaction in children: Assessment → Red Flags →
// Disimpaction → Maintenance → Disposition.
// 28 nodes, 5 modules. Cross-listed: Pediatrics.
// Primary sources:
//   - ESPGHAN/NASPGHAN Clinical Guideline: Evaluation and Treatment of Functional Constipation (2014, 2024 update protocol)
//   - NASPGHAN Refractory Constipation Recommendations (2025)
//   - Tabbers MM, et al. JPGN. 2014;58(2):258-274 — ESPGHAN/NASPGHAN Constipation Guidelines
//   - Bekkali NL, et al. Arch Dis Child. 2009;94(2):156-60 — Rectal enema vs PEG for disimpaction
//   - Miller MK, et al. Pediatr Emerg Care. 2012;28(12):1319-23 — Milk & molasses enema safety
//   - Nurko S, Zimmerman LA. Gastroenterol Clin N Am. 2014;43(4):779-784 — Pediatric constipation review

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDS_CONSTIPATION_CRITICAL_ACTIONS = [
  { text: 'Exclude red flags: bilious vomiting, abdominal distention, bloody stool, fever', nodeId: 'peds-const-red-flags' },
  { text: 'Confirm impaction: abdominal mass or rectal exam with hard stool', nodeId: 'peds-const-confirm-impaction' },
  { text: 'PEG 3350 is first-line for disimpaction: 1-1.5 g/kg/day (max 100g) × 3-6 days', nodeId: 'peds-const-peg-disimpaction' },
  { text: 'Enemas only if PEG fails or rapid clearance needed', nodeId: 'peds-const-enema-options' },
  { text: 'Start maintenance laxative AFTER disimpaction: PEG 0.4-0.8 g/kg/day', nodeId: 'peds-const-maintenance' },
  { text: 'Counsel: toilet sitting 5-10 min after meals, fluid/fiber, avoid withholding', nodeId: 'peds-const-behavioral' },
];

export const PEDS_CONSTIPATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'peds-const-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Constipation',
    body: '**Functional constipation** affects 3-5% of all pediatric visits and up to 30% of children at some point. [1][2]\n\nMost cases are **functional** (95%)—related to withholding behavior, dietary factors, or toilet training issues. Only ~5% have an organic cause. [1]\n\n**This consult covers:**\n\n• Module 1: Initial Assessment & Red Flags\n• Module 2: Confirming Impaction\n• Module 3: Disimpaction — PEG vs Enemas\n• Module 4: Maintenance Therapy\n• Module 5: Disposition & Follow-up\n\n**Rome IV Criteria for Functional Constipation (≥1 month, infants; ≥2 months, children):** [1]\n\n• ≤2 defecations/week\n• ≥1 episode fecal incontinence/week (after toilet trained)\n• History of retentive posturing or excessive volitional stool retention\n• History of painful or hard bowel movements\n• Large fecal mass in rectum\n• History of large-diameter stools that may obstruct toilet',
    citation: [1, 2],
    next: 'peds-const-history',
    summary: '3-5% of peds visits; 95% functional. Rome IV criteria for diagnosis.',
    skippable: true,
  },

  {
    id: 'peds-const-history',
    type: 'info',
    module: 1,
    title: 'Key History Elements',
    body: '**Stool Pattern:**\n• Frequency (normal varies by age—4×/day in newborns to 1×/day by age 4)\n• Consistency—hard, pellet-like, or large-caliber\n• Pain or straining with defecation\n• Blood on stool or toilet paper (anal fissure?)\n\n**Behavioral Clues:**\n• Withholding postures—tiptoeing, leg crossing, hiding\n• Fecal soiling/encopresis (overflow incontinence)\n• Toilet avoidance\n\n**Diet:**\n• Fluid intake, fiber intake\n• Recent dietary changes, cow\'s milk protein allergy\n\n**Onset & Triggers:**\n• Onset at weaning, toilet training, or school entry = functional\n• Onset in first weeks of life → think Hirschsprung disease\n• Recent illness, new medications, stress\n\n**Past History:**\n• Prior constipation episodes, previous disimpaction\n• Laxative use (type, duration, response)\n• Urinary symptoms (UTIs, enuresis—often coexist)',
    citation: [1],
    next: 'peds-const-red-flags',
    summary: 'Assess frequency, consistency, withholding behaviors, diet, onset timing.',
  },

  {
    id: 'peds-const-red-flags',
    type: 'question',
    module: 1,
    title: 'Red Flags Present?',
    body: '**Red flags for organic disease:** [1][2]\n\n🚩 **Hirschsprung Disease:**\n• Delayed meconium passage (>48h after birth)\n• Onset in first weeks of life\n• Failure to thrive\n• Explosive stool after rectal exam\n• Empty rectum on exam despite constipation\n\n🚩 **Bowel Obstruction:**\n• Bilious vomiting\n• Severe abdominal distention\n• Absent bowel sounds\n\n🚩 **Other Organic Causes:**\n• Fever (enterocolitis risk in Hirschsprung)\n• Bloody stool (beyond fissure bleeding)\n• Abnormal neurologic exam (spinal cord lesion)\n• Sacral dimple, tuft of hair, asymmetric gluteal cleft\n• Abnormal lower extremity reflexes\n• Significant weight loss\n• Thyroid abnormalities\n\n**If any red flags present → pursue workup before disimpaction.**',
    citation: [1, 2],
    options: [
      {
        label: 'Red flags present',
        description: 'Workup needed before treating',
        next: 'peds-const-organic-workup',
        urgency: 'urgent',
      },
      {
        label: 'No red flags — functional constipation',
        description: 'Proceed to confirm impaction',
        next: 'peds-const-confirm-impaction',
      },
    ],
    summary: 'Red flags: delayed meconium, bilious vomiting, distention, empty rectum, neuro findings.',
  },

  {
    id: 'peds-const-organic-workup',
    type: 'info',
    module: 1,
    title: 'Organic Cause Workup',
    body: '**If Hirschsprung suspected:**\n• Abdominal X-ray—dilated proximal colon, narrow rectum\n• Refer to pediatric surgery for suction rectal biopsy (gold standard)\n• **Do NOT give enemas in suspected Hirschsprung—risk of enterocolitis** [1]\n\n**If bowel obstruction suspected:**\n• Abdominal X-ray (flat + upright or decubitus)\n• Surgical consult\n• NPO, IV fluids, NG decompression if needed\n\n**If spinal cord pathology suspected:**\n• MRI lumbosacral spine\n• Neurology/neurosurgery referral\n\n**If hypothyroidism suspected:**\n• TSH, free T4\n\n**If celiac disease suspected:**\n• Tissue transglutaminase IgA + total IgA\n\n**Labs generally NOT needed for functional constipation.** [1] Routine X-rays are also not recommended unless diagnosis is uncertain or impaction unclear on exam.',
    citation: [1],
    next: 'peds-const-disposition-refer',
    summary: 'Hirschsprung: rectal biopsy. Obstruction: XR + surgery. Spinal: MRI. Labs rarely needed for functional.',
  },

  // =====================================================================
  // MODULE 2: CONFIRMING IMPACTION
  // =====================================================================

  {
    id: 'peds-const-confirm-impaction',
    type: 'question',
    module: 2,
    title: 'Confirm Fecal Impaction',
    body: '**Fecal impaction** = hard stool in the rectum that cannot be evacuated voluntarily. [1]\n\n**Physical Exam:**\n• **Abdominal exam:** palpable fecal mass in left lower quadrant (often midline, rubbery)\n• **Rectal exam (if tolerated):** hard stool in rectal vault\n  - Note: ESPGHAN/NASPGHAN recommends against routine rectal exam if diagnosis is clear from history + abdominal exam [1]\n\n**Abdominal X-ray:**\n• Not routinely recommended [1]\n• Consider if diagnosis uncertain or exam limited\n• Significant stool burden in colon supports diagnosis\n\n**Is fecal impaction confirmed?**',
    citation: [1],
    options: [
      {
        label: 'Yes — impaction confirmed',
        description: 'Proceed to disimpaction',
        next: 'peds-const-disimpaction-route',
      },
      {
        label: 'No impaction — mild constipation only',
        description: 'Skip to maintenance therapy',
        next: 'peds-const-maintenance',
      },
    ],
    summary: 'Impaction = hard stool in rectum. Confirm by abdominal mass or rectal exam. XR not routine.',
  },

  // =====================================================================
  // MODULE 3: DISIMPACTION
  // =====================================================================

  {
    id: 'peds-const-disimpaction-route',
    type: 'question',
    module: 3,
    title: 'Disimpaction: Oral vs Rectal',
    body: '**ESPGHAN/NASPGHAN recommends oral PEG as FIRST-LINE** for fecal disimpaction. [1][3]\n\nEvidence shows equal efficacy between oral PEG and rectal enemas, but oral PEG is:\n• Less invasive, less traumatic\n• Better tolerated by children\n• No risk of electrolyte disturbance (unlike sodium phosphate enemas)\n\n**Choose oral (PEG) if:**\n• Child can tolerate oral intake\n• No need for immediate clearance\n• Outpatient management feasible\n\n**Consider rectal (enema) if:**\n• PEG failed or not tolerated\n• Need rapid disimpaction (severe symptoms)\n• Significant abdominal distention or discomfort\n• Severe impaction with overflow incontinence\n\n**Never combine oral and rectal disimpaction simultaneously.**',
    citation: [1, 3],
    options: [
      {
        label: 'Oral disimpaction (PEG)',
        description: 'First-line, less invasive',
        next: 'peds-const-peg-disimpaction',
      },
      {
        label: 'Rectal disimpaction (enema)',
        description: 'PEG failed or rapid clearance needed',
        next: 'peds-const-enema-options',
      },
    ],
    summary: 'PEG is first-line. Enemas only if PEG fails or rapid clearance needed.',
  },

  {
    id: 'peds-const-peg-disimpaction',
    type: 'info',
    module: 3,
    title: 'PEG 3350 Disimpaction',
    body: '**Polyethylene Glycol 3350 (MiraLAX) — First-Line Disimpaction** [1][3][4]\n\n**Disimpaction Dose:**\n• **1-1.5 g/kg/day** (max 100 g/day)\n• Divide into 2-4 doses throughout the day\n• Mix in 10 mL water per gram of PEG\n• Continue for **3-6 days** until clear watery stools\n\n**Alternative rapid protocol:**\n• 6 mL/kg (up to 135 mL) of prepared solution\n• May repeat every 12-24 hours × 1-3 doses [3]\n\n**Palatability tips:**\n• Mix in juice, Gatorade, or flavored drink\n• Serve cold\n• PEG without electrolytes (MiraLAX) tastes better than PEG-ELS\n\n**Expected outcome:**\n• Frequent loose/watery stools within 24-48 hours\n• Some fecal incontinence is expected during disimpaction—warn family\n• Success rate: ~85-95%\n\n**If no stool output after 3 days → consider enema rescue.**',
    citation: [1, 3, 4],
    next: 'peds-const-disimpaction-success',
    summary: 'PEG 1-1.5 g/kg/day × 3-6 days. Mix in juice. Expect watery stools + incontinence.',
  },

  {
    id: 'peds-const-enema-options',
    type: 'question',
    module: 3,
    title: 'Enema Selection',
    body: '**Enema options for pediatric disimpaction:** [5][6]\n\n**Preferred options (safer):**\n\n• **Normal Saline Enema:**\n  - 5-10 mL/kg (max 500 mL)\n  - Safest option, minimal absorption risk\n  - Less effective than phosphate enemas\n\n• **Mineral Oil Retention Enema:**\n  - 15-30 mL/year of age (max 240 mL)\n  - Softens hard impaction\n  - Consider saline enema 1-3 hours after\n\n**Use with caution:**\n\n• **Milk and Molasses Enema (MME):**\n  - 1:1 mixture, warm\n  - 5-6 mL/kg (max 135 mL)\n  - 88% success rate [5]\n  - Rare hemodynamic complications reported\n\n**Avoid in young children:**\n\n• **Sodium Phosphate (Fleet\'s):**\n  - Avoid <2 years (some say <4 years) [1]\n  - Risk: hyperphosphatemia, hypocalcemia, hypokalemia\n  - If used in older children: single dose only\n\n**Select enema type:**',
    citation: [1, 5, 6],
    options: [
      {
        label: 'Normal saline enema',
        description: 'Safest, first choice',
        next: 'peds-const-saline-enema',
      },
      {
        label: 'Mineral oil enema',
        description: 'For hard impaction',
        next: 'peds-const-mineral-oil-enema',
      },
      {
        label: 'Milk & molasses enema',
        description: 'Effective but use caution',
        next: 'peds-const-mmm-enema',
      },
    ],
    summary: 'Saline or mineral oil safest. Avoid phosphate <2-4 years. M&M 88% effective but rare complications.',
  },

  {
    id: 'peds-const-saline-enema',
    type: 'info',
    module: 3,
    title: 'Normal Saline Enema',
    body: '**Normal Saline Enema — Technique** [6]\n\n**Dose:** 5-10 mL/kg (max 500 mL)\n\n**Preparation:**\n• Warm saline to body temperature\n• Use appropriate catheter size (8-12 Fr for children)\n\n**Administration:**\n• Position: left lateral decubitus, knees to chest\n• Lubricate catheter tip\n• Insert 2-4 inches (age-dependent)\n• Instill slowly over 5-10 minutes\n• Have child retain 5-15 minutes if possible\n\n**Expected response:**\n• Bowel movement within 15-30 minutes\n• May need to repeat × 2-3 if initial attempt unsuccessful\n\n**Advantages:**\n• Safest option—no electrolyte risk\n• Can be repeated\n\n**Disadvantages:**\n• Less effective than phosphate or M&M enemas\n• May require multiple administrations',
    citation: [6],
    next: 'peds-const-disimpaction-success',
    summary: 'NS 5-10 mL/kg, warm, left lateral, retain 5-15 min. Safest but may need repeating.',
  },

  {
    id: 'peds-const-mineral-oil-enema',
    type: 'info',
    module: 3,
    title: 'Mineral Oil Enema',
    body: '**Mineral Oil Retention Enema — Technique** [6]\n\n**Dose:** 15-30 mL/year of age (max 240 mL)\n• Age 2-6 years: ~60 mL (2 oz)\n• Age 6-12 years: ~120 mL (4 oz)\n\n**Administration:**\n• Position: left lateral decubitus\n• Instill slowly\n• **Retention enema:** Have child hold for 30-60 minutes\n• Follow with saline or warm water enema 1-3 hours later to flush softened stool\n\n**Best for:**\n• Very hard, impacted stool\n• Lubricates and softens before manual or enema clearance\n\n**Precautions:**\n• Avoid in patients at aspiration risk (mineral oil aspiration → lipoid pneumonia)\n• Do not give orally in young children or those with swallowing issues\n• May cause perianal leakage/irritation',
    citation: [6],
    next: 'peds-const-disimpaction-success',
    summary: 'Mineral oil 15-30 mL/year, retain 30-60 min, follow with saline enema. For hard impaction.',
  },

  {
    id: 'peds-const-mmm-enema',
    type: 'info',
    module: 3,
    title: 'Milk & Molasses Enema',
    body: '**Milk and Molasses Enema (MME)** [5]\n\n**Preparation:**\n• Mix 1:1 ratio of whole milk and molasses\n• Warm to body temperature (test on wrist)\n\n**Dose:** 5-6 mL/kg (max 135 mL) [5]\n\n**Mechanism:**\n• Osmotically active—draws water into colon\n• Softens and stimulates evacuation\n\n**Efficacy:**\n• 88% success rate in one ED study [5]\n• Comparable to sodium phosphate enemas\n\n**Administration:**\n• Left lateral decubitus position\n• Instill slowly\n• Have child retain 15-30 minutes\n\n**Cautions:**\n• Rare reports of hemodynamic compromise (one death reported) [5]\n• Use with monitoring in dehydrated or unstable patients\n• Avoid if suspected bowel perforation or obstruction\n\n**After successful disimpaction → proceed to maintenance therapy.**',
    citation: [5],
    next: 'peds-const-disimpaction-success',
    summary: 'M&M 1:1 ratio, 5-6 mL/kg, 88% success. Rare hemodynamic issues reported.',
  },

  {
    id: 'peds-const-disimpaction-success',
    type: 'question',
    module: 3,
    title: 'Disimpaction Successful?',
    body: '**Signs of successful disimpaction:**\n\n✅ Large volume stool output\n✅ Resolution of abdominal distention\n✅ Soft abdomen on palpation\n✅ Empty rectum on re-exam (if performed)\n✅ Relief of pain/discomfort\n✅ If using PEG: clear/watery stools\n\n**Signs disimpaction incomplete:**\n\n❌ Continued palpable fecal mass\n❌ Minimal stool output\n❌ Persistent abdominal distention\n❌ Ongoing discomfort\n\n**If incomplete:**\n• Continue PEG for additional 1-3 days, OR\n• Add rectal enema if not yet tried, OR\n• Consider admission for supervised disimpaction',
    citation: [1],
    options: [
      {
        label: 'Disimpaction successful',
        description: 'Proceed to maintenance',
        next: 'peds-const-maintenance',
      },
      {
        label: 'Disimpaction incomplete',
        description: 'Additional intervention needed',
        next: 'peds-const-incomplete',
      },
    ],
    summary: 'Success = large stool output, soft abdomen, empty rectum. If incomplete, continue PEG or add enema.',
  },

  {
    id: 'peds-const-incomplete',
    type: 'info',
    module: 3,
    title: 'Incomplete Disimpaction',
    body: '**If oral PEG incomplete after 3-6 days:**\n• Add rectal enema (saline or mineral oil)\n• May alternate daily enemas × 2-3 days\n\n**If enemas incomplete:**\n• Retry PEG at higher dose\n• Consider combination approach\n\n**Manual disimpaction:**\n• Rarely needed in children\n• Reserved for severe impaction with hard stool at anal verge\n• Requires sedation/analgesia\n• Consult pediatric surgery or GI if needed\n\n**Admission criteria:**\n• Severe impaction refractory to ED treatment\n• Significant dehydration\n• Electrolyte disturbances\n• Need for supervised bowel prep (whole-bowel irrigation)\n• Concern for organic pathology\n\n**Whole-bowel irrigation (if admitted):**\n• PEG-ELS via NG tube: 25 mL/kg/hr (max 1 L/hr)\n• Continue until clear rectal effluent\n• Requires monitoring for electrolyte shifts',
    citation: [1, 3],
    next: 'peds-const-maintenance',
    summary: 'Add enema if PEG fails. Manual disimpaction rare. Admit if refractory or unstable.',
  },

  // =====================================================================
  // MODULE 4: MAINTENANCE THERAPY
  // =====================================================================

  {
    id: 'peds-const-maintenance',
    type: 'info',
    module: 4,
    title: 'Maintenance Laxative Therapy',
    body: '**Start maintenance therapy AFTER successful disimpaction.** [1][7]\n\nMaintenance prevents re-impaction and recurrence (very common).\n\n**First-Line: PEG 3350 (MiraLAX)**\n• Dose: **0.4-0.8 g/kg/day** (start 0.4, titrate up)\n• Max: 17 g/day (one capful)\n• Mix in any liquid; give once daily\n• Continue minimum **2-3 months**, often 6-12 months [1]\n\n**Alternative: Lactulose**\n• Dose: 1-3 mL/kg/day divided BID\n• Use if PEG unavailable\n• More gas/bloating than PEG\n\n**Goal:** 1-2 soft stools per day, no withholding, no soiling\n\n**Titration:**\n• If stools too loose → decrease dose\n• If stools still hard or <1/day → increase dose\n• Adjust weekly until goal achieved\n\n**Duration:**\n• Minimum 2 months after symptoms resolve\n• Taper slowly (reduce by 25% every 2-4 weeks)\n• Relapse common if stopped too soon',
    citation: [1, 7],
    next: 'peds-const-behavioral',
    summary: 'PEG 0.4-0.8 g/kg/day. Continue 2-3+ months. Titrate for 1-2 soft stools/day.',
  },

  {
    id: 'peds-const-behavioral',
    type: 'info',
    module: 4,
    title: 'Behavioral Interventions',
    body: '**Toilet Training & Habits:** [1][7]\n\n• **Scheduled toilet sitting:** 5-10 minutes after meals (utilize gastrocolic reflex)\n• Use proper positioning: feet flat on stool, knees above hips\n• Positive reinforcement—sticker charts, rewards for sitting (not for producing stool)\n• Avoid punishment or shaming for accidents\n\n**Dietary Modifications:**\n\n• **Fiber intake:** Age + 5 g/day (e.g., 8-year-old = 13 g/day)\n• Fruits, vegetables, whole grains\n• **Adequate fluids:** encourage water throughout day\n• Limit excessive cow\'s milk (>24 oz/day associated with constipation)\n• Limit constipating foods: bananas, rice, applesauce, toast (BRAT)\n\n**Withholding Behavior:**\n\n• Explain to child that holding stool makes it bigger/harder\n• Address fear of pain—reassure stool will be soft with laxatives\n• Never force toilet sitting—creates negative association\n\n**Physical Activity:**\n• Encourage regular exercise\n• Reduces stool transit time',
    citation: [1, 7],
    next: 'peds-const-disposition-home',
    summary: 'Toilet sit after meals, fiber = age + 5 g, fluids, limit excess milk, positive reinforcement.',
  },

  // =====================================================================
  // MODULE 5: DISPOSITION
  // =====================================================================

  {
    id: 'peds-const-disposition-home',
    type: 'info',
    module: 5,
    title: 'Discharge Home',
    body: '**Discharge criteria:**\n• Successful disimpaction (or ongoing outpatient PEG plan)\n• Tolerating oral intake\n• Family understands maintenance plan\n• Follow-up arranged\n\n**Prescriptions:**\n• PEG 3350 (MiraLAX): 0.4-0.8 g/kg/day\n• Refills for 2-3 months minimum\n\n**Parent education:**\n1. This is a chronic condition—expect treatment for months\n2. Do NOT stop laxatives when stools normalize—taper slowly\n3. Soiling may persist initially—don\'t punish, it\'s overflow\n4. Call if: no stool × 3 days, severe abdominal pain, vomiting, fever\n\n**Follow-up:**\n• PCP within 2-4 weeks\n• Peds GI referral if: refractory despite compliance, concern for organic cause, or >6 months without improvement\n\n**Return precautions:**\n• Bilious vomiting, severe distention, bloody stool, fever\n• Inability to tolerate oral intake\n• Worsening despite treatment',
    citation: [1],
    next: undefined,
    summary: 'Discharge with PEG, education, PCP follow-up 2-4 weeks. GI if refractory >6 months.',
  },

  {
    id: 'peds-const-disposition-refer',
    type: 'info',
    module: 5,
    title: 'Specialist Referral',
    body: '**Refer to Pediatric GI if:**\n• Constipation refractory to 6 months of appropriate therapy\n• Suspected organic cause requiring further workup\n• Need for anorectal manometry or other motility testing\n• Consideration of biofeedback therapy\n• Severe fecal incontinence despite treatment\n\n**Refer to Pediatric Surgery if:**\n• Suspected Hirschsprung disease (for rectal biopsy)\n• Bowel obstruction\n• Consideration of antegrade continence enema (ACE/Malone) procedure for refractory cases\n\n**Refer to Neurology if:**\n• Suspected spinal cord pathology\n• Neurogenic bowel\n\n**Urgent admission if:**\n• Signs of bowel obstruction or perforation\n• Suspected Hirschsprung enterocolitis (fever + distention)\n• Severe dehydration\n• Electrolyte disturbances from enema complications',
    citation: [1],
    next: undefined,
    summary: 'GI if refractory >6 months. Surgery if Hirschsprung suspected. Admit if obstruction/enterocolitis.',
  },

];

export const PEDS_CONSTIPATION_MODULE_LABELS = [
  'Initial Assessment',
  'Confirming Impaction',
  'Disimpaction',
  'Maintenance Therapy',
  'Disposition',
];

export const PEDS_CONSTIPATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Tabbers MM, DiLorenzo C, Berger MY, et al. Evaluation and Treatment of Functional Constipation in Infants and Children: Evidence-Based Recommendations From ESPGHAN and NASPGHAN. J Pediatr Gastroenterol Nutr. 2014;58(2):258-274. https://pubmed.ncbi.nlm.nih.gov/24345831/' },
  { num: 2, text: 'Nurko S, Zimmerman LA. Evaluation and Treatment of Constipation in Children and Adolescents. Am Fam Physician. 2014;90(2):82-90. https://www.aafp.org/pubs/afp/issues/2014/0715/p82.html' },
  { num: 3, text: 'Bekkali NL, van den Berg MM, Dijkgraaf MG, et al. Rectal Fecal Impaction Treatment in Childhood Constipation: Enemas Versus High Doses Oral PEG. Pediatrics. 2009;124(6):e1108-15. https://pubmed.ncbi.nlm.nih.gov/19948617/' },
  { num: 4, text: 'Youssef NN, Peters JM, Henderson W, et al. Dose Response of PEG 3350 for the Treatment of Childhood Fecal Impaction. J Pediatr. 2002;141(3):410-4. https://pubmed.ncbi.nlm.nih.gov/12219064/' },
  { num: 5, text: 'Miller MK, Dowd MD, Friesen CA, Walsh-Kelly CM. Safety and Efficacy of Milk and Molasses Enemas Compared With Sodium Phosphate Enemas for the Treatment of Constipation in a Pediatric Emergency Department. Pediatr Emerg Care. 2012;28(12):1319-23. https://pubmed.ncbi.nlm.nih.gov/22134228/' },
  { num: 6, text: 'Candy D, Belsey J. Macrogol (polyethylene glycol) laxatives in children with functional constipation and faecal impaction: a systematic review. Arch Dis Child. 2009;94(2):156-160. https://pubmed.ncbi.nlm.nih.gov/19019879/' },
  { num: 7, text: 'ESPGHAN and NASPGHAN 2024 Protocol for Paediatric Functional Constipation Treatment Guidelines (Standard Operating Procedure). Eur J Pediatr. 2025. https://pubmed.ncbi.nlm.nih.gov/39904543/' },
];
