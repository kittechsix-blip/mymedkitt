// MedKitt - Hypoglycemia
// Adult ED pathway for stabilization, differential diagnosis, rebound risk, and disposition.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

interface Citation {
  num: number;
  text: string;
}

export const HYPOGLYCEMIA_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Treat symptomatic, altered, seizing, or unable-to-swallow hypoglycemia immediately. Do not delay dextrose for confirmatory labs.', nodeId: 'hypoglycemia-start' },
  { text: 'Recheck glucose every 15 minutes after treatment until corrected, then continue serial checks based on rebound risk.', nodeId: 'hypoglycemia-recheck' },
  { text: 'For recurrent sulfonylurea or meglitinide hypoglycemia, use dextrose plus octreotide and observe or admit.', nodeId: 'hypoglycemia-sulfonylurea' },
  { text: 'Do not discharge recurrent hypoglycemia, sulfonylurea exposure, long-acting insulin overdose, critical illness, renal failure, poor oral intake, or unsafe follow-up.', nodeId: 'hypoglycemia-disposition' },
];

export const HYPOGLYCEMIA_NODES: DecisionNode[] = [
  {
    id: 'hypoglycemia-start',
    type: 'question',
    module: 1,
    title: 'Hypoglycemia - Stabilize First',
    body: '[Hypoglycemia steps](#/info/hypoglycemia-steps) | [Treatment calculator](#/calculator/hypo-treatment)\n\n**Confirm the problem, but treat the patient.**\n\n**Definitions:** [1]\n- Level 1: glucose <70 mg/dL and >=54 mg/dL\n- Level 2: glucose <54 mg/dL\n- Level 3: severe event with altered mental or physical function requiring assistance, regardless of exact glucose value\n\n**Immediate actions:**\n1. Check POC glucose.\n2. If symptomatic, altered, seizing, or unable to swallow, treat immediately.\n3. If IV access is present, give IV dextrose.\n4. If no IV access, give glucagon while access is obtained.\n5. Draw a plasma glucose and critical sample before dextrose only if this does not delay treatment.\n\n**Safety frame:** correction is not the endpoint. The ED question is: why did this happen, will it recur, and can the patient safely maintain glucose after treatment?',
    citation: [1, 2, 3],
    options: [
      { label: 'Altered, seizure, unsafe swallow, or severe symptoms', description: 'Treat with IV/IM medication now', next: 'hypoglycemia-iv-im-treatment', urgency: 'critical' },
      { label: 'Alert and able to swallow', description: 'Oral carbohydrate route appropriate', next: 'hypoglycemia-oral-treatment', urgency: 'urgent' },
      { label: 'Glucose corrected already', description: 'Move directly to differential and rebound risk', next: 'hypoglycemia-differential', urgency: 'routine' },
    ],
    calculatorLinks: [
      { id: 'hypo-treatment', label: 'Treatment' },
      { id: 'hypoglycemia-rebound-risk', label: 'Rebound Risk' },
    ],
    summary: 'Treat immediately when symptomatic or unsafe to swallow, then determine cause and recurrence risk.',
    safetyLevel: 'critical',
  },
  {
    id: 'hypoglycemia-differential',
    type: 'question',
    module: 2,
    title: 'Differential Diagnosis Early',
    body: '[Differential guide](#/info/hypoglycemia-differential-guide)\n\n**Do this before disposition.** Most ED hypoglycemia is medication or nutrition-related, but recurrent or unexplained hypoglycemia should trigger a structured differential.\n\n**Common ED buckets:** [2,3]\n- Diabetes medication mismatch: insulin, sulfonylurea, meglitinide, dosing error, pump error\n- Poor intake or increased use: missed meal, vomiting, exercise, alcohol, frailty\n- Reduced clearance: renal failure, missed dialysis, hepatic failure\n- Critical illness: sepsis, shock, hypothermia, malnutrition\n- Endocrine: adrenal insufficiency, hypopituitarism\n- Non-diabetic hyperinsulinemia: insulinoma, accidental or surreptitious insulin, non-islet cell tumor\n- Post-prandial or post-bariatric hypoglycemia\n- Artifact: delayed sample processing, leukocytosis, erythrocytosis, poor peripheral perfusion\n\n**High-yield split:** medication-exposed diabetics need recurrence risk and medication adjustment. Patients without diabetes, or diabetics with unexplained recurrent episodes, need Whipple triad thinking and possible critical sample.',
    citation: [2, 3],
    options: [
      { label: 'Medication exposure likely', description: 'Insulin, sulfonylurea, meglitinide, oral diabetes meds, pump error', next: 'hypoglycemia-medication-risk', urgency: 'urgent' },
      { label: 'No diabetes or unexplained recurrent episodes', description: 'Evaluate Whipple triad and critical sample needs', next: 'hypoglycemia-critical-sample', urgency: 'urgent' },
      { label: 'Critical illness or organ failure', description: 'Sepsis, liver failure, renal failure, adrenal crisis, malnutrition', next: 'hypoglycemia-critical-illness', urgency: 'critical' },
      { label: 'Corrected, clear benign trigger, stable intake', description: 'Assess disposition safety', next: 'hypoglycemia-disposition', urgency: 'routine' },
    ],
    summary: 'Place the differential early so treatment does not hide a recurrent or dangerous cause.',
  },
  {
    id: 'hypoglycemia-iv-im-treatment',
    type: 'info',
    module: 3,
    title: 'Severe Hypoglycemia Treatment',
    body: '[Treatment calculator](#/calculator/hypo-treatment)\n\n**If altered, seizing, or unsafe to swallow:** [1,4]\n\n**IV access:**\n- D50W 25 g IV push, usually 50 mL of D50W\n- Alternative: D10W 100-250 mL IV, titrated to mental status and glucose response\n- D10W is often smoother peripherally and avoids large osmotic bolus when time allows\n\n**No IV access:**\n- Glucagon 1 mg IM/SC, or intranasal glucagon 3 mg if available\n- Continue attempts at IV/IO access if severe or not rapidly improving\n\n**Adjuncts:**\n- Thiamine 100 mg IV/IM before or with dextrose if severe malnutrition, alcohol use disorder, or high Wernicke risk\n- Airway positioning, aspiration precautions, seizure management if needed\n\n**Next step:** correction must be verified and durable.',
    citation: [1, 4],
    next: 'hypoglycemia-recheck',
    calculatorLinks: [
      { id: 'hypo-treatment', label: 'Treatment' },
    ],
    summary: 'Use IV dextrose when unsafe to swallow; glucagon is a bridge when access is unavailable.',
    safetyLevel: 'critical',
  },
  {
    id: 'hypoglycemia-oral-treatment',
    type: 'info',
    module: 3,
    title: 'Oral Treatment Route',
    body: '**If alert, cooperative, and able to swallow:** [1]\n\n- Give 15-20 g fast-acting carbohydrate.\n- Recheck glucose in 15 minutes.\n- Repeat 15-20 g carbohydrate if still <70 mg/dL.\n- Once corrected and patient can eat, give a longer-acting carbohydrate or meal, especially if insulin or sulfonylurea remains active.\n\n**Do not use oral treatment if:** altered mental status, active seizure, aspiration risk, vomiting, or inability to protect airway.\n\n**Examples:** glucose tabs or gel, juice, regular soda, sugar packet dissolved in water. Avoid relying on chocolate or high-fat foods for rapid correction.',
    citation: [1],
    next: 'hypoglycemia-recheck',
    calculatorLinks: [
      { id: 'hypo-treatment', label: 'Treatment' },
    ],
    summary: 'Use 15-20 g fast carbohydrate only if the patient is awake and can swallow safely.',
  },
  {
    id: 'hypoglycemia-recheck',
    type: 'question',
    module: 3,
    title: 'Recheck and Durability',
    body: '[Rebound risk calculator](#/calculator/hypoglycemia-rebound-risk)\n\n**After any treatment:**\n- Recheck glucose in 15 minutes.\n- Repeat therapy until glucose is >70 mg/dL and symptoms improve.\n- Continue serial glucose checks based on cause and half-life.\n- Do not let one normal glucose drive discharge.\n\n**If recurrent:** start a dextrose infusion while identifying the cause.\n\n**Typical infusion:** D10W titrated to maintain glucose generally >100 mg/dL while definitive cause is addressed. Higher concentration dextrose may require central access if large ongoing requirements.',
    citation: [1, 4, 5],
    options: [
      { label: 'Persistent or recurrent hypoglycemia', description: 'Needs infusion and rebound workup', next: 'hypoglycemia-recurrent', urgency: 'critical' },
      { label: 'Corrected and stable so far', description: 'Move to differential and rebound risk', next: 'hypoglycemia-differential', urgency: 'routine' },
    ],
    calculatorLinks: [
      { id: 'hypoglycemia-rebound-risk', label: 'Rebound Risk' },
    ],
    summary: 'Recheck at 15 minutes, repeat treatment if needed, and prove the correction is durable.',
  },
  {
    id: 'hypoglycemia-recurrent',
    type: 'question',
    module: 4,
    title: 'Recurrent Hypoglycemia',
    body: '**Recurrent hypoglycemia is not simple hypoglycemia.**\n\n**Stabilize:**\n- Start D10W infusion and titrate.\n- Check glucose q15-30 min until stable, then q1h or per protocol.\n- Check potassium, magnesium, phosphate, renal function, liver panel, lactate, ethanol when clinically relevant.\n- Review EMS glucose, ED doses, timing of meals, insulin type, pump status, pill access, and renal function.\n\n**Danger causes to actively seek:** [3-5]\n- Sulfonylurea or meglitinide exposure\n- Long-acting insulin or concentrated insulin overdose\n- Renal failure reducing insulin clearance\n- Sepsis, liver failure, adrenal crisis, malnutrition, alcohol-related fasting hypoglycemia\n- Intentional overdose or unsafe access to medication',
    citation: [3, 4, 5],
    options: [
      { label: 'Sulfonylurea or meglitinide possible', description: 'Add octreotide after dextrose correction', next: 'hypoglycemia-sulfonylurea', urgency: 'critical' },
      { label: 'Long-acting insulin, pump, or insulin overdose', description: 'Prolonged dextrose and electrolyte monitoring', next: 'hypoglycemia-insulin-overdose', urgency: 'critical' },
      { label: 'Critical illness or endocrine cause possible', description: 'Treat underlying illness and consider stress steroids', next: 'hypoglycemia-critical-illness', urgency: 'critical' },
      { label: 'Cause still unclear', description: 'Draw critical sample if recurrent and glucose low', next: 'hypoglycemia-critical-sample', urgency: 'urgent' },
    ],
    calculatorLinks: [
      { id: 'hypoglycemia-rebound-risk', label: 'Rebound Risk' },
    ],
    summary: 'Recurrent lows require infusion, medication review, and a cause-specific plan.',
    safetyLevel: 'critical',
  },
  {
    id: 'hypoglycemia-medication-risk',
    type: 'question',
    module: 4,
    title: 'Medication Cause and Rebound Risk',
    body: '[Rebound risk calculator](#/calculator/hypoglycemia-rebound-risk)\n\n**Medication review:**\n- Insulin: rapid, regular, NPH, basal, concentrated insulin, pump, accidental duplicate dose\n- Sulfonylureas: glyburide, glipizide, glimepiride\n- Meglitinides: repaglinide, nateglinide\n- Combination pills or medication access by household members\n- Renal dysfunction, older age, missed meals, alcohol, recent dose changes\n\n**Key distinction:**\n- Insulin overdose is managed with carbohydrate, dextrose infusion, time, and electrolyte monitoring.\n- Sulfonylurea and meglitinide hypoglycemia often recurs because dextrose stimulates more insulin release. Use octreotide when recurrent or high-risk.',
    citation: [4, 5],
    options: [
      { label: 'Sulfonylurea or meglitinide likely', description: 'Recurrent or high-risk insulin secretagogue exposure', next: 'hypoglycemia-sulfonylurea', urgency: 'critical' },
      { label: 'Insulin overdose, pump issue, or long-acting insulin', description: 'Prepare for prolonged glucose support', next: 'hypoglycemia-insulin-overdose', urgency: 'critical' },
      { label: 'Medication mismatch, now stable', description: 'Proceed to disposition and med adjustment', next: 'hypoglycemia-disposition', urgency: 'routine' },
    ],
    summary: 'Separate insulin effect from insulin secretagogue effect because sulfonylurea recurrence needs octreotide.',
  },
  {
    id: 'hypoglycemia-sulfonylurea',
    type: 'result',
    module: 4,
    title: 'Sulfonylurea or Meglitinide Hypoglycemia',
    body: '**Suspect when:** recurrent hypoglycemia after dextrose, older diabetic patient, renal dysfunction, glyburide/glipizide/glimepiride exposure, unknown pill ingestion, pediatric exploratory ingestion, or household medication access. [4,5]\n\n**Management:**\n1. Correct initial hypoglycemia with oral carbohydrate or IV dextrose.\n2. If recurrent or high-risk exposure, give octreotide.\n3. Start D10W infusion only as needed to maintain safe glucose.\n4. Avoid chasing recurrence with repeated D50 alone.\n5. Call poison center for overdose, pediatric exposure, intentional ingestion, or unclear formulation.\n\n**Adult octreotide:**\n- 50-100 mcg SC or IV every 6 hours\n- Continue until glucose remains stable after dextrose is weaned and secretagogue effect has passed\n\n**Disposition:** observe or admit. Do not discharge after a single corrected glucose.',
    recommendation: 'Treat with dextrose for immediate correction, add octreotide for recurrent or high-risk sulfonylurea/meglitinide exposure, and observe or admit.',
    citation: [4, 5],
    confidence: 'recommended',
    next: 'hypoglycemia-disposition',
    summary: 'Sulfonylurea recurrence is driven by persistent insulin secretion; octreotide prevents recurrent lows.',
    safetyLevel: 'critical',
  },
  {
    id: 'hypoglycemia-insulin-overdose',
    type: 'result',
    module: 4,
    title: 'Insulin Overdose or Pump Error',
    body: '**High-risk clues:** large insulin dose, basal or long-acting insulin, concentrated insulin, pump malfunction, duplicate dose, intentional overdose, renal failure, or poor oral intake. [4]\n\n**Management:**\n- Oral carbohydrate if awake and able to eat.\n- D10W infusion titrated to glucose trend.\n- Consider higher concentration dextrose through central access if large ongoing requirements.\n- Monitor potassium, magnesium, phosphate, and volume status.\n- Remove or suspend pump if overdose or malfunction suspected.\n- Psychiatric safety evaluation if intentional.\n\n**Disposition:** prolonged observation or admission. Duration depends on insulin type, dose, renal function, food tolerance, and glucose stability after dextrose is weaned.',
    recommendation: 'Use titrated dextrose support, electrolyte monitoring, pump control if relevant, and prolonged observation or admission.',
    citation: [4],
    confidence: 'recommended',
    next: 'hypoglycemia-disposition',
    summary: 'Long-acting insulin or overdose can recur for many hours and needs monitored glucose support.',
    safetyLevel: 'critical',
  },
  {
    id: 'hypoglycemia-critical-illness',
    type: 'result',
    module: 4,
    title: 'Critical Illness, Organ Failure, or Endocrine Cause',
    body: '**Hypoglycemia can be a severity marker.** [2,3]\n\n**Look for:**\n- Sepsis or shock\n- Liver failure or acute hepatic injury\n- Renal failure or missed dialysis\n- Starvation, malnutrition, alcohol-related fasting hypoglycemia\n- Adrenal crisis: hypotension, hyponatremia, hyperkalemia, steroid withdrawal, adrenal disease\n- Hypopituitarism or adrenal suppression\n\n**Management:**\n- Treat hypoglycemia while treating the underlying illness.\n- Start dextrose infusion if recurrent or poor intake.\n- If adrenal crisis is plausible, do not delay hydrocortisone for cortisol testing.\n- Send cortisol/ACTH if feasible before steroids, but treatment takes priority in shock.\n\n**Disposition:** admission unless a clearly reversible, low-risk cause is identified and durable correction is demonstrated.',
    recommendation: 'Treat glucose and underlying illness in parallel; admit most critical illness, organ failure, adrenal, and poor-intake patients.',
    citation: [2, 3],
    confidence: 'recommended',
    next: 'hypoglycemia-disposition',
    summary: 'Critical illness hypoglycemia is rarely dischargeable from the ED after one normal glucose.',
    safetyLevel: 'critical',
  },
  {
    id: 'hypoglycemia-critical-sample',
    type: 'info',
    module: 5,
    title: 'Whipple Triad and Critical Sample',
    body: '[Critical sample guide](#/info/hypoglycemia-critical-sample)\n\n**Use this when hypoglycemia is unexplained, recurrent, non-diabetic, or discordant with the history.** [2,3]\n\n**Whipple triad:**\n1. Symptoms or signs compatible with hypoglycemia\n2. Low plasma glucose documented during symptoms\n3. Symptom improvement after glucose correction\n\n**Critical sample during hypoglycemia, ideally before dextrose if no delay:**\n- Plasma glucose\n- Insulin\n- C-peptide\n- Proinsulin\n- Beta-hydroxybutyrate\n- Sulfonylurea/meglitinide screen\n- Cortisol when adrenal insufficiency is plausible\n- Ethanol, renal function, liver panel, lactate, sepsis workup as indicated\n\n**Interpretation frame:** high insulin with high C-peptide suggests endogenous insulin or secretagogue. High insulin with low C-peptide suggests exogenous insulin. Suppressed ketones during hypoglycemia supports hyperinsulinemia.',
    citation: [2, 3],
    next: 'hypoglycemia-disposition',
    summary: 'Critical samples are most useful when drawn during the low glucose episode.',
  },
  {
    id: 'hypoglycemia-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Safety Check',
    body: '[Rebound risk calculator](#/calculator/hypoglycemia-rebound-risk)\n\n**Discharge is reasonable only when all are true:**\n- Clear reversible cause identified\n- Patient is eating reliably\n- Serial glucose checks remain stable after treatment\n- No sulfonylurea/meglitinide exposure\n- No long-acting insulin overdose or pump malfunction concern\n- No renal failure, liver failure, sepsis, adrenal crisis, hypothermia, frailty, or malnutrition driving the low\n- Medication plan adjusted and patient has supplies, food access, and follow-up\n- Safe home setting and no intentional overdose concern\n\n**Observe or admit if any are present:** recurrent low, Level 3 event, secretagogue exposure, long-acting insulin overdose, poor PO, renal/hepatic failure, critical illness, elderly/frail patient, pregnancy, intentional overdose, unreliable follow-up, or unclear cause.',
    citation: [1, 2, 4, 5],
    options: [
      { label: 'Meets discharge safety criteria', description: 'Durable correction, eating, reversible cause, safe plan', next: 'hypoglycemia-discharge', urgency: 'routine' },
      { label: 'Any rebound, medication, illness, or safety concern', description: 'Observation or admission', next: 'hypoglycemia-admit', urgency: 'urgent' },
    ],
    calculatorLinks: [
      { id: 'hypoglycemia-rebound-risk', label: 'Rebound Risk' },
    ],
    summary: 'Disposition depends on durable correction, cause, medication half-life, oral intake, and safety.',
  },
  {
    id: 'hypoglycemia-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Plan',
    body: '**Discharge bundle:**\n- Document cause and serial glucose stability.\n- Provide meal plan before leaving if insulin or diabetes medication remains active.\n- Reduce or hold culprit medication when appropriate.\n- Ensure access to glucose testing supplies and fast carbohydrate.\n- Prescribe or confirm glucagon for patients on insulin at risk for severe events.\n- Arrange timely PCP/endocrine follow-up.\n- Give return precautions for recurrent symptoms, poor intake, vomiting, medication confusion, fever, or inability to check glucose.\n\n**Do not simply write \"hypoglycemia resolved\" if the underlying cause is not addressed.**',
    recommendation: 'Discharge only after durable correction, stable oral intake, medication adjustment, safe follow-up, and clear return precautions.',
    citation: [1, 2],
    confidence: 'recommended',
    summary: 'Safe discharge requires a corrected glucose plus a corrected reason for the low.',
  },
  {
    id: 'hypoglycemia-admit',
    type: 'result',
    module: 6,
    title: 'Observation or Admission',
    body: '**Observation/admission triggers:**\n- Recurrent glucose <70 mg/dL after treatment\n- Level 3 event, seizure, prolonged altered mental status, or aspiration risk\n- Sulfonylurea or meglitinide exposure\n- Long-acting insulin, concentrated insulin, pump malfunction, or intentional overdose\n- Need for dextrose infusion\n- Renal failure, hepatic failure, sepsis, adrenal crisis, hypothermia, pregnancy, frailty, or poor oral intake\n- Unsafe home setting, unreliable medication access, or poor follow-up\n\n**Monitoring:** serial glucose, electrolytes, medication reconciliation, nutrition plan, and cause-directed therapy.',
    recommendation: 'Observe or admit for recurrent, medication-driven, unclear, critical illness, unsafe, or infusion-requiring hypoglycemia.',
    citation: [1, 2, 4, 5],
    confidence: 'recommended',
    summary: 'Admission is for recurrence risk, high-risk medication exposure, illness severity, or unsafe outpatient correction.',
    safetyLevel: 'critical',
  },
];

export const HYPOGLYCEMIA_NODE_COUNT = HYPOGLYCEMIA_NODES.length;

export const HYPOGLYCEMIA_MODULE_LABELS = [
  'Stabilize',
  'Differential',
  'Treatment',
  'Rebound',
  'Critical Sample',
  'Disposition',
];

export const HYPOGLYCEMIA_CITATIONS: Citation[] = [
  { num: 1, text: 'American Diabetes Association Professional Practice Committee. 6. Glycemic Goals, Hypoglycemia, and Hyperglycemic Crises: Standards of Care in Diabetes - 2026. Diabetes Care. 2026;49(Suppl 1):S132-S149.' },
  { num: 2, text: 'Cryer PE, Axelrod L, Grossman AB, et al. Evaluation and Management of Adult Hypoglycemic Disorders: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2009;94(3):709-728.' },
  { num: 3, text: 'Endotext. Non-Diabetic Hypoglycemia. NCBI Bookshelf. Updated review of fasting, post-prandial, endocrine, organ failure, and medication causes.' },
  { num: 4, text: 'Klein-Schwartz W, Stassinos GL, Isbister GK. Treatment of sulfonylurea and insulin overdose. Br J Clin Pharmacol. 2016;81(3):496-504.' },
  { num: 5, text: 'EMCrit Project, Internet Book of Critical Care. Hypoglycemia. Practical ED/ICU approach to dextrose, recurrent hypoglycemia, sulfonylurea exposure, and octreotide.' },
];
