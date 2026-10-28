// @bedside-search-engine 1.4.0
// @engine-sha256 7816d36307825b1e1a705ef1909f1349e5f5a4b1018081957881f6efd24bd2c5
// Vendored from ~/.claude/skills/bedside-search/engine. Do not edit here: change the canonical copy, then run bin/sync-engine.mjs.
/**
 * Question-aware search for the Home screen (pure, deterministic, offline).
 *
 * "what are risks for ectopic pregnancy" becomes the topic `ectopic pregnancy`
 * plus the intent `risk`. Filler words are dropped, intent words are lifted out
 * of the topic, bedside abbreviations are expanded, and every searchable piece of
 * the app (consults, decision nodes, info-page sections, drugs, calculators,
 * tricks) is scored on how well its title / context / text covers the topic.
 * Pieces whose own title answers the intent ("Major Risk Factors", "IV Dosing")
 * are lifted above pieces that merely mention the topic.
 *
 * Navigation vocabulary only: nothing here is clinical content, nothing is
 * generated, nothing touches the network. No imports, so the Node gold-set test
 * (scripts/search-gold.test.ts) runs the exact code the app ships.
 */

// ===================================================================
// Types
// ===================================================================

export type QKind = 'consult' | 'node' | 'info' | 'drug' | 'calc' | 'trick';

export interface QDoc {
  id: string;
  kind: QKind;
  title: string;
  /** where it lives: "In: ectopic pregnancy", the info page title, the drug class */
  subtitle: string;
  /** names, synonyms and ids: context words, never the answer text */
  keywords: string[];
  /** body text the answer is read from (also used for the preview) */
  text?: string;
  /** consult id for nodes and consults (its synonyms count weakly for every node inside) */
  consultId?: string;
  nodeId?: string;
  pageId?: string;
  anchor?: string;
  drugId?: string;
  calcId?: string;
  specialtyId?: string;
  /** node: the consult title; info section: the page title (the subtitle also carries it) */
  parentTitle?: string;
  /** node: the consult's own name for the section the node sits in ("Severe HyperK Rx"), matched as parent context */
  moduleLabel?: string;
  /** info section: the page's own subtitle ("Lidocaine Technique for Awake Intubation"), matched as parent context but never shown */
  parentSubtitle?: string;
  /** drug only: the dosing indications, used to scroll the pharmacy modal to the right card */
  doseIndications?: string[];
}

export interface QResult {
  doc: QDoc;
  score: number;
  /** drug only: dosing indication to scroll to */
  indication?: string;
  /** share of the question's required words this document carries (0-1); low means it merely shares a word or two */
  cov?: number;
  /** score breakdown (only when ranking with debug on) */
  why?: string;
}

// ===================================================================
// Text helpers
// ===================================================================

function fold(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[‐-―−]/g, '-')
    .toLowerCase();
}

export function words(s: string): string[] {
  return fold(s).split(/[^a-z0-9]+/).filter(Boolean);
}

/** Light plural folding so "risks" meets "risk" and "antibiotics" meets "antibiotic". */
export function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 3 && w.endsWith('s') && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
  return w;
}

const stems = (s: string) => words(s).map(stem);

/** True when `a` and `b` differ by at most `k` edits (insert, delete, substitute, adjacent swap). */
export function withinEdits(a: string, b: string, k: number): boolean {
  if (Math.abs(a.length - b.length) > k) return false;
  const d: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
    for (let j = 1; j <= b.length; j++) {
      if (i === 0) d[i][j] = j;
      else {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length] <= k;
}

// ===================================================================
// Intents
// ===================================================================

export type IntentId =
  | 'risk' | 'dose' | 'candidate' | 'contra' | 'diagnosis' | 'adverse' | 'workup' | 'presentation'
  | 'ddx' | 'treatment' | 'antidote' | 'followup' | 'procedure' | 'timing' | 'calc' | 'avoid';

interface IntentDef {
  id: IntentId;
  /** word sequences (stemmed on use) that name the intent; removed from the topic */
  triggers: readonly string[];
  /** a title that answers the intent */
  title: RegExp;
  /** how far a title match lifts a hit (lower score = better) */
  strength: number;
  /** the title names the intent outright ("Major Risk Factors"): an extra lift */
  tight?: RegExp;
  /** documents of this kind answer the intent whatever their title (a drug entry answers "dose") */
  kinds?: Partial<Record<QKind, number>>;
}

const TIGHT_BONUS = 0.12;
const STRONG = 0.5;
const MEDIUM = 0.38;
const WEAK = 0.15;

const INTENTS: readonly IntentDef[] = [
  { id: 'risk', strength: STRONG, tight: /risk factor/, title: /(?<!high |low )risk|predispos|red flag/, triggers: ['risk factor', 'risk', 'predisposing factor', 'predisposing', 'predispose', 'who is at risk', 'at risk'] },
  { id: 'dose', strength: STRONG, tight: /\bdos(e|ing|age)\b/, title: /\bdos(e|es|ing|age)\b|regimen|infusion|\bbolus\b|how much|\bmg\b/, kinds: { drug: 0.5 }, triggers: ['how much', 'how many mg', 'dose', 'dosing', 'dosage', 'mg kg', 'mg'] },
  { id: 'candidate', strength: STRONG, tight: /candidate|eligib|indication/, title: /candidate|eligib|indication|who /, triggers: ['who is a candidate', 'candidate', 'eligible', 'eligibility', 'qualify', 'qualifies', 'who gets', 'who needs', 'indication', 'indicated', 'when to'] },
  { id: 'contra', strength: MEDIUM, tight: /contraindicat|exclusion/, title: /contraindicat|exclusion|\bnot\b|avoid|never|hard stop|\bstop\b/, triggers: ['contraindication', 'contraindicated', 'exclusion', 'exclude', 'who should not', 'what not to do', 'not to do', 'cannot'] },
  { id: 'avoid', strength: MEDIUM, title: /^(do not|don t|never|stop)\b|\bdo not\b|avoid/, triggers: ['avoid', 'pitfall', 'mistake', 'dont', 'do not'] },
  { id: 'diagnosis', strength: WEAK, tight: /criteria|definition|\bconfirm\b/, title: /diagnos|criteria|definition|confirm|recogni|rule out|classif/, triggers: ['diagnose', 'diagnosis', 'diagnostic', 'criteria', 'definition', 'define', 'confirm', 'rule out', 'recognize', 'recognise'] },
  { id: 'adverse', strength: MEDIUM, title: /side effect|adverse|complication/, triggers: ['side effect', 'adverse', 'complication'] },
  { id: 'workup', strength: WEAK, title: /workup|work up|\blabs?\b|laborator|evaluation|assessment|interpret|result|level|test/, triggers: ['work up', 'workup', 'what to order', 'which labs', 'labs', 'investigation', 'evaluation', 'evaluate', 'interpret', 'interpretation'] },
  { id: 'presentation', strength: MEDIUM, tight: /\bsigns?\b|symptom/, title: /\bsigns?\b|symptom|presentation|findings?|recogni|clinical|clue|suspect|look/, triggers: ['sign', 'symptom', 'presentation', 'presents', 'clinical feature', 'feature', 'finding', 'clue', 'look like', 'looks like'] },
  { id: 'ddx', strength: STRONG, title: /differential|mimic|ddx/, triggers: ['ddx', 'differential', 'mimic', 'what else'] },
  { id: 'treatment', strength: WEAK, tight: /regimen|treatment/, title: /treatment|management|therapy|protocol|regimen|\btx\b|first.?line|second.?line|rescue/, triggers: ['treatment', 'treat', 'therapy', 'management', 'manage', 'managing', 'tx', 'regimen', 'first line', 'second line', 'what do i give', 'what should i give', 'what can i give', 'what to give', 'what do i do', 'what should i do', 'what to do', 'what do i start', 'what to start'] },
  { id: 'antidote', strength: STRONG, tight: /antidote|reversal/, title: /antidote|revers|rescue|counteract/, kinds: { drug: 0.1 }, triggers: ['antidote', 'reversal', 'reverse', 'reversing', 'counteract'] },
  { id: 'followup', strength: MEDIUM, tight: /follow|discharge|dispo/, title: /follow|discharge|dispo|admit|return|monitor|surveillance|repeat|observation/, triggers: ['follow up', 'followup', 'disposition', 'dispo', 'admit', 'discharge', 'return precaution', 'monitor', 'monitoring', 'recheck'] },
  { id: 'procedure', strength: MEDIUM, title: /procedure|technique|step by step|placement|insertion|how to|maneuver/, triggers: ['maneuver', 'how to place', 'how do i place', 'how to perform', 'how do i perform', 'how to do', 'how do i do', 'technique', 'procedure', 'step by step', 'placement', 'insert', 'insertion', 'perform'] },
  { id: 'timing', strength: 0.2, title: /\bwhen\b|timing|within|window|hours?|start/, triggers: ['how long', 'how soon', 'how often', 'timing', 'window'] },
  { id: 'calc', strength: STRONG, tight: /score|calculator|\brule\b/, title: /score|calculator|\brule\b|scale/, kinds: { calc: 0.45 }, triggers: ['calculate', 'calculator', 'calculation', 'score', 'scoring', 'scale', 'rule'] },
];

/** Dropped outright: words that make a sentence a question, not a topic. */
const FILLER: ReadonlySet<string> = new Set(
  "what whats what's are is the for of in how do does did i should which why can could would may might my to on at if it me you we about there any be was were will tell show please pls and or with vs versus from that this these those into by as so just am have has your our give gives need needed want use using get when where who whom whose doing best cheap cheaper cheapest easiest simplest quickest really actually basically".split(' '),
);

/** Kept, but never required for a match. */
const SOFT: ReadonlySet<string> = new Set(
  'after before during patient patients pt pts common okay option options no not without adult adults ed emergency components component elements element parts items details information info overview summary'.split(' '),
);

/**
 * Bedside abbreviations and words the content spells differently. Keys are folded
 * words. Each phrase is a stand-in: every word of one phrase must be present.
 */
const ALTS: Readonly<Record<string, readonly string[]>> = {
  sbp: ['systolic blood pressure', 'blood pressure'], bp: ['blood pressure'], map: ['mean arterial pressure'], goal: ['target'], target: ['goal'], targets: ['goal', 'target'],
  dka: ['diabetic ketoacidosis'], hhs: ['hyperosmolar hyperglycemic'], pe: ['pulmonary embolism'], dvt: ['deep vein thrombosis'],
  acs: ['acute coronary syndrome', 'nstemi', 'chest pain'], mi: ['myocardial infarction', 'stemi'], chf: ['heart failure'], htn: ['hypertension', 'hypertensive'],
  af: ['atrial fibrillation', 'afib'], afib: ['atrial fibrillation'], svt: ['supraventricular tachycardia'], vt: ['ventricular tachycardia'], vf: ['ventricular fibrillation'],
  tca: ['tricyclic antidepressant', 'tca'], inh: ['isoniazid'], apap: ['acetaminophen'], tylenol: ['acetaminophen'], paracetamol: ['acetaminophen'],
  asa: ['aspirin', 'salicylate'], bb: ['beta blocker'], ccb: ['calcium channel blocker'], nac: ['acetylcysteine'], sah: ['subarachnoid hemorrhage'],
  ich: ['intracerebral hemorrhage', 'intracranial hemorrhage'], sdh: ['subdural hematoma'], tbi: ['traumatic brain injury', 'head injury'],
  tpa: ['alteplase', 'thrombolysis', 'thrombolytic'], tnk: ['tenecteplase', 'thrombolysis'], ivt: ['thrombolysis'], gbs: ['guillain barre'], ttp: ['thrombotic thrombocytopenic purpura'],
  hit: ['heparin induced thrombocytopenia'], sjs: ['stevens johnson'], ten: ['toxic epidermal necrolysis'], nms: ['neuroleptic malignant'], etoh: ['alcohol', 'ethanol'],
  rsi: ['rapid sequence intubation', 'intubation'], ecmo: ['extracorporeal'], txa: ['tranexamic acid'], pcc: ['prothrombin complex'], kcentra: ['prothrombin complex'],
  ams: ['altered mental status'], sob: ['dyspnea', 'shortness of breath'], cp: ['chest pain'], abx: ['antibiotic'], antibiotic: ['antibiotic', 'ceftriaxone', 'vancomycin'],
  uti: ['urinary tract infection'], pna: ['pneumonia'], copd: ['chronic obstructive'], ards: ['acute respiratory distress'],
  dnr: ['code status'], ekg: ['ecg'], ecg: ['ekg'], us: ['ultrasound'], pocus: ['ultrasound'], norepi: ['norepinephrine'], epi: ['epinephrine'], pressors: ['vasopressor'], pressor: ['vasopressor'],
  ffp: ['plasma'], prbc: ['red blood cell'], mtp: ['massive transfusion'], dic: ['disseminated intravascular coagulation'], lp: ['lumbar puncture'], csf: ['cerebrospinal'],
  hcg: ['pregnancy'], pid: ['pelvic inflammatory disease'], pep: ['post exposure prophylaxis'], aki: ['acute kidney injury'], ckd: ['chronic kidney disease'],
  rosc: ['post cardiac arrest', 'return of spontaneous circulation'], gi: ['gastrointestinal'], ugib: ['upper gi bleed'], lgib: ['lower gi bleed'], iop: ['intraocular pressure'], aacg: ['angle closure glaucoma'],
  od: ['overdose', 'toxicity', 'poisoning'], overdose: ['toxicity', 'poisoning', 'ingestion', 'od'], toxicity: ['overdose', 'poisoning'], poisoning: ['toxicity', 'overdose'],
  bicarb: ['sodium bicarbonate'], mag: ['magnesium'], tpn: ['parenteral'], ibw: ['ideal body weight'], bmi: ['body mass'],
  seizure: ['status epilepticus', 'seizures'], seizures: ['seizure'], stroke: ['cva', 'ischemic'], cva: ['stroke'], febrile: ['fever'], fever: ['febrile'],
  bleeding: ['hemorrhage'], hemorrhage: ['bleeding'], hematoma: ['bleed'], kids: ['pediatric', 'peds'], child: ['pediatric', 'peds'], children: ['pediatric', 'peds'], infant: ['pediatric', 'neonate'],
  pregnant: ['pregnancy'], pregnancy: ['pregnant'], pediatric: ['peds'], peds: ['pediatric'], paeds: ['pediatric'],
  a1c: ['hemoglobin a1c'], hyperk: ['hyperkalemia'], hypok: ['hypokalemia'], hypona: ['hyponatremia'], hypernatremia: ['sodium'], cabg: ['bypass'],
  naloxone: ['narcan'], narcan: ['naloxone'], flumazenil: ['romazicon'], dilt: ['diltiazem'], dig: ['digoxin'],
};

export interface QuestionToken {
  word: string;
  soft: boolean;
  /** set after "in / during / after": scored, never required */
  context?: 'in' | 'after';
  /** the condition a lab or analyte reading implies ("K 2.1" -> hypokalemia): the subject of the question, weighted like a drug name */
  subject?: true;
}

export interface ParsedQuestion {
  /** the query is a question: fillers dropped or an intent found, and a topic is left */
  active: boolean;
  /** a long run of topic words that is not phrased as a question */
  wide: boolean;
  topic: string;
  tokens: QuestionToken[];
  intents: IntentId[];
  /** stemmed kept words in order (adjacent pairs reward a title that says them together) */
  sequence: string[];
}

interface Trigger {
  seq: string[];
  intent: IntentId;
}

const TRIGGERS: Trigger[] = INTENTS.flatMap((d) => d.triggers.map((t) => ({ seq: stems(t), intent: d.id }))).sort((a, b) => b.seq.length - a.seq.length);

const LONG_QUERY = 2;
const GENERIC: ReadonlySet<string> = new Set(['pregnancy', 'pregnant', 'patient', 'patients']);
const CONTEXT_WORDS: ReadonlySet<string> = new Set(['in', 'during']);

/** Two-word names rewritten to the words the content uses. */
const BIGRAMS: Readonly<Record<string, readonly string[]>> = {
  'blood thinner': ['anticoagulant'],
  'community acquired': ['cap'],
  'heart attack': ['stemi'],
  'low sugar': ['hypoglycemia'],
  'high potassium': ['hyperkalemia'],
  'low potassium': ['hypokalemia'],
  'low sodium': ['hyponatremia'],
  'high sodium': ['hypernatremia'],
  'low calcium': ['hypocalcemia'],
  'high calcium': ['hypercalcemia'],
  'low magnesium': ['hypomagnesemia'],
  'high magnesium': ['hypermagnesemia'],
  'low phosphate': ['hypophosphatemia'],
  'high phosphate': ['hyperphosphatemia'],
  'passed out': ['syncope'],
  'collapsed lung': ['pneumothorax'],
  'water on': ['effusion'],
};

function rewriteBigrams(ws: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < ws.length; i++) {
    const to = BIGRAMS[`${ws[i]} ${ws[i + 1]}`];
    if (to) {
      out.push(...to);
      i++;
    } else out.push(ws[i]);
  }
  return out;
}

/**
 * Bedside lab shorthand ("K 6.8", "Na 118") names the condition the value implies. The value is a reading, not a topic word,
 * so it is replaced by the condition. Cut-offs are the usual definitions of the condition, used only to read the question.
 */
const LABS: readonly { name: RegExp; low?: [number, string]; high?: [number, string] }[] = [
  { name: /^(k|k\+|potassium)$/, low: [3.5, 'hypokalemia'], high: [5.0, 'hyperkalemia'] },
  { name: /^(na|na\+|sodium)$/, low: [135, 'hyponatremia'], high: [145, 'hypernatremia'] },
];

function rewriteLabs(raw: string): string {
  return raw.replace(/\b(k\+?|na\+?|potassium|sodium)\s*(?:of|is|was|at|=|:)?\s*(\d{1,3}(?:\.\d+)?)\b(?!\s*(?:mg|mcg|g|ml|%|mmol\/min))/gi, (all, analyte: string, num: string) => {
    const lab = LABS.find((l) => l.name.test(analyte.toLowerCase()));
    const v = Number(num);
    if (!lab || !Number.isFinite(v)) return all;
    if (lab.low && v < lab.low[0]) return lab.low[1];
    if (lab.high && v > lab.high[0]) return lab.high[1];
    return all;
  });
}

export function parseQuestion(raw: string): ParsedQuestion {
  const ws = rewriteBigrams(words(rewriteLabs(raw)));
  const sts = ws.map(stem);
  // words the rewrite introduced (the condition behind a number or a "low X" / "high X"), not words the asker typed
  const typed = new Set(words(raw));
  const intents = new Set<IntentId>();
  const tokens: QuestionToken[] = [];
  const sequence: string[] = [];
  let dropped = 0;
  let inContext: 'in' | 'after' | undefined;
  for (let i = 0; i < ws.length; ) {
    const hit = TRIGGERS.find((t) => t.seq.every((s, k) => sts[i + k] === s));
    // "mg" alone is the abbreviation for myasthenia gravis as often as a unit: it is a dose only after a number ("5 mg", "2 mg/kg")
    const bareMg = hit !== undefined && hit.seq.length === 1 && hit.seq[0] === 'mg' && !/^\d/.test(ws[i - 1] ?? '');
    if (hit && ws.length > hit.seq.length && !bareMg) {
      intents.add(hit.intent);
      sequence.push(...hit.seq);
      i += hit.seq.length;
      dropped++;
      continue;
    }
    if (FILLER.has(ws[i]) && ws.length > 1) {
      dropped++;
      if (CONTEXT_WORDS.has(ws[i]) && tokens.length > 0 && !GENERIC.has(ws[i + 1])) inContext = 'in';
    } else {
      if (ws[i] === 'after' && tokens.length > 0) inContext = 'after';
      const subject = !typed.has(ws[i]) ? { subject: true as const } : {};
      tokens.push({ word: ws[i], soft: SOFT.has(ws[i]) || (ws[i].length < 2 && !/\d/.test(ws[i])), ...(inContext ? { context: inContext } : {}), ...subject });
      if (!inContext) sequence.push(sts[i]);
    }
    i++;
  }
  const hard = tokens.filter((t) => !t.soft);
  const asked = tokens.length > 0 && dropped > 0 && (hard.length > 0 || intents.size > 0);
  const wide = !asked && hard.length >= LONG_QUERY;
  return { active: asked, wide, topic: tokens.map((t) => t.word).join(' '), tokens, intents: [...intents], sequence };
}

function intentLift(doc: QDoc, intents: readonly IntentId[]): number {
  if (!intents.length) return 0;
  const t = words(doc.title).concat(doc.moduleLabel ? words(doc.moduleLabel).map((w) => LABEL_SHORTHAND[w] ?? w) : []).join(' ');
  let best = 0;
  let n = 0;
  for (const id of intents) {
    const def = INTENTS.find((d) => d.id === id)!;
    const byTitle = def.title.test(t) ? def.strength + (def.tight?.test(t) ? TIGHT_BONUS : 0) : 0;
    const byKind = def.kinds?.[doc.kind] ?? 0;
    const lift = Math.max(byTitle, byKind);
    if (lift) {
      best = Math.max(best, lift);
      n++;
    }
  }
  return n ? best + 0.04 * (n - 1) : 0;
}

/** "Do NOT …" guard pages: the right answer to "what not to do", a distraction in a plain question. */
function isDoNot(title: string): boolean {
  const t = words(title).join(' ');
  return /^(never|stop)\b/.test(t) || /\b(do not|don t)\b/.test(t);
}

// ===================================================================
// Matcher
// ===================================================================

interface Prep {
  seq: string[];
  title: Set<string>;
  /** words of the page or consult the doc lives in (nodes, info sections) */
  parent: Set<string>;
  ctx: Set<string>;
  text: Set<string>;
  /** the page subtitle an info section lives under: completes a match, never lifts one */
  psub: Set<string>;
}

/** Shorthand the consult authors use in section names ("Severe HyperK Rx"), spelled the way people search. */
const LABEL_SHORTHAND: Readonly<Record<string, string>> = {
  hyperk: 'hyperkalemia', hypok: 'hypokalemia', hypona: 'hyponatremia', hyperna: 'hypernatremia', rx: 'treatment', tx: 'treatment', dx: 'diagnosis', ddx: 'differential', sx: 'symptoms', abx: 'antibiotic',
};
const labelStems = (label: string | undefined): string[] => (label ? words(label).map((w) => stem(LABEL_SHORTHAND[w] ?? w)) : []);

/** Abbreviations that mean different things in different consults (ACS: acute coronary vs acute chest syndrome): never expanded in a title. */
const AMBIGUOUS_ABBREV: ReadonlySet<string> = new Set(['acs', 'od', 'ten', 'hit', 'map', 'us']);

/** "A-Fib" is typed "afib", "Pre-eclampsia" is typed "preeclampsia": hyphenated parts also count joined. */
function titleStems(title: string, expandAbbrev = false): string[] {
  const out = stems(title);
  // "PE in Pregnancy" is asked as "pulmonary embolism in pregnancy": an upper-case abbreviation in a consult title also carries its spelled-out words
  // (not in node, section or calculator titles: there it lifted every "PEP" / "IVT" section, and "ICH Score" for "bleeding after thrombolysis", above the answer)
  for (const m of title.matchAll(/\b[A-Z][A-Z0-9]{1,5}\b/g)) {
    const key = m[0].toLowerCase();
    if (expandAbbrev && !AMBIGUOUS_ABBREV.has(key) && ALTS[key]) out.push(...stems(ALTS[key][0]));
  }
  for (const m of fold(title).matchAll(/([a-z0-9]+)-([a-z0-9]+)/g)) out.push(stem(m[1] + m[2]));
  return out;
}

const HAS_PARENT: ReadonlySet<QKind> = new Set<QKind>(['node', 'info', 'trick']);

const TITLE_STOP = new Set(['the', 'a', 'an', 'of', 'in', 'for', 'and', 'to', 'or', 'with', 'is', 'are', 'on', 'your', 'not', 'do']);
const KIND_WORDS = new Set(['in', 'info', 'trick', 'consult']);
const PAIR_BONUS = 0.08;
const LOC_ALIAS = 0.3;
const LOC_TITLE = 1;
const LOC_PARENT = 0.85;
const LOC_CTX = 0.6;
const LOC_TEXT = 0.35;
const LOC_SUBTITLE = 0.3;
const MIN_COVERAGE = 0.6;
const FALLBACK_BELOW = 3;
const FALLBACK_COVERAGE = 0.3;
const COVERAGE_WEIGHT = 0.4;
const CONTEXT_BONUS = 0.12;
const RARE_WEIGHT = 4;
/** Ceiling for a typed word that only ever appears in body text (see match). */
const CHATTER_WEIGHT = 1.5;
const SUBJECT_WEIGHT = 1.8;

const TYPE_PENALTY: Readonly<Record<QKind, number>> = { consult: 0, calc: 0.03, drug: 0.04, info: 0.06, trick: 0.07, node: 0.08 };
const QUESTION_TYPE_SCALE = 0.4;
const QUESTION_CONSULT_PENALTY = 0.05;
/** The question asks for a facet ("treatment", "dose") and one of the consult's own nodes answers it: the overview row steps aside. */
const FACET_CONSULT_PENALTY = 0.15;
const EXTRA_WORD_PENALTY = 0.006;
const EXTRA_WORD_CAP = 6;
const DO_NOT_PENALTY = 0.15;
const LIFT_FROM_LOC = 0.25;
const LIFT_FULL_AT_LOC = 0.7;
const liftShare = (loc: number) => Math.min(1, Math.max(0, (loc - LIFT_FROM_LOC) / (LIFT_FULL_AT_LOC - LIFT_FROM_LOC)));
const CONSULT_IS_TOPIC_LOC = 0.95;
const WIDE_PENALTY = 0.03;
/** `answer` abstains unless the app knows at least this share of the question's content words, and a top result carries at least this share (see assess). */
const ANSWER_MIN_KNOWN = 0.5;
const ANSWER_MIN_MATCHED = 0.5;
const ANSWER_TOP = 5;
/** Candidates that get the full scoring pass. */
const POOL = 400;
/** A consult whose title carries every topic word is the topic's home: its own nodes outrank a foreign node with a nicer heading. */
const HOME_BONUS = 0.12;
/** When the topic has a home consult, a node of another consult is a detour: its heading counts for less. */
const FOREIGN_PENALTY = 0.08;
const FOREIGN_LIFT_SCALE = 0.5;
/** A whole info page whose title is the topic beats a section of another page that merely repeats it. */
const PAGE_TIE_BONUS = 0.01;
/** Pediatric-only cards yield a little unless the question says pediatric. */
const PEDS_PENALTY = 0.04;
/** A question that says pediatric / child / infant prefers the pediatric consult row over the adult one that shares its words. Consult rows only: giving it to nodes lifted them above info pages that carry the same answer. */
const PEDS_BONUS = 0.1;
/** A pediatric consult's id says so ("peds-dka", "neonatal-sepsis"): its nodes are pediatric cards even when a node title does not. */
const PEDS_CONSULT = /^(peds?|pediatric|paeds|neonat\w*)-/;
const PEDS_WORDS = /\b(pediatric|peds|paediatric|child|children|neonat\w*|infant|infants)\b/;

export interface QuestionIndex {
  readonly size: number;
  /** Ranked matcher results for a free-text query (best first). Empty unless the query is a question or a multi-word topic. */
  rank(query: string, limit?: number, debug?: boolean): { parsed: ParsedQuestion; results: QResult[] };
  /**
   * What the Home search shows. `mode` tells the caller whether the old
   * single-word path (Fuse) still has to run: only for 'plain' queries, or when nothing matched.
   */
  search(query: string, limit?: number, debug?: boolean): { parsed: ParsedQuestion; results: QResult[]; mode: 'question' | 'topic' | 'plain' };
  /** Ranked results for any non-empty text, including one word (which `rank` leaves to a legacy search). */
  lookup(query: string, limit?: number, debug?: boolean): { parsed: ParsedQuestion; results: QResult[] };
  /** `search`, plus the ranked lookup for plain queries: the whole Home search for an app with no legacy search. */
  find(query: string, limit?: number, debug?: boolean): { parsed: ParsedQuestion; results: QResult[]; mode: 'question' | 'topic' | 'plain' };
  /** `find`, but empty (covered = false) when nothing really answers the question. Use this for the Home search of an app that wants an honest "not covered here". */
  answer(query: string, limit?: number, debug?: boolean): { parsed: ParsedQuestion; results: QResult[]; mode: 'question' | 'topic' | 'plain'; covered: boolean };
}

const compact = (s: string) => fold(s).replace(/[^a-z0-9]+/g, '');

/** Title-start match, identical in meaning to the old alphabetical prefix search ("afib" meets "A-Fib RVR"). */
function titleStarts(title: string, query: string): boolean {
  const nt = compact(title);
  const nq = compact(query);
  if (nq && nt.startsWith(nq)) return true;
  return fold(title).split(/[-\s/\\]+/).some((w) => w.startsWith(fold(query)));
}

export function createQuestionIndex(docs: readonly QDoc[]): QuestionIndex {
  const prep: Prep[] = docs.map((d) => {
    const sub = stems(d.subtitle).filter((w) => !KIND_WORDS.has(w));
    const kw = d.keywords.filter((k) => k.length <= 80).flatMap(stems);
    return {
      seq: stems(d.title),
      title: new Set(titleStems(d.title, d.kind === 'consult')),
      parent: new Set(HAS_PARENT.has(d.kind) ? [...sub, ...(d.parentTitle ? titleStems(d.parentTitle) : []), ...labelStems(d.moduleLabel)] : []),
      ctx: new Set([...(HAS_PARENT.has(d.kind) ? [] : sub), ...kw].filter((w) => !KIND_WORDS.has(w))),
      text: new Set(d.text ? stems(d.text) : []),
      psub: new Set((d.parentSubtitle ? stems(d.parentSubtitle) : []).filter((w) => !KIND_WORDS.has(w))),
    };
  });

  const postings = new Map<string, number[]>();
  /** stem -> docs carrying it at each level: title, parent, context, text */
  const byLevel: Map<string, number[]>[] = [new Map(), new Map(), new Map(), new Map(), new Map()];
  const byConsult = new Map<string, number[]>();
  prep.forEach((x, i) => {
    [x.title, x.parent, x.ctx, x.text, x.psub].forEach((set, k) => {
      for (const w of set) {
        // the subtitle level only completes matches: it must not shift word-frequency weights or the vocabulary
        if (k < 4) {
          const list = postings.get(w);
          if (!list) postings.set(w, [i]);
          else if (list[list.length - 1] !== i) list.push(i);
        }
        const lv = byLevel[k].get(w);
        if (!lv) byLevel[k].set(w, [i]);
        else lv.push(i);
      }
    });
    const c = docs[i].consultId;
    if (c) {
      const l = byConsult.get(c);
      if (l) l.push(i);
      else byConsult.set(c, [i]);
    }
  });
  const vocabSorted = [...postings.keys()].sort();
  const byShape = new Map<string, string[]>();
  for (const w of vocabSorted) {
    const key = w[0] + w.length;
    const l = byShape.get(key);
    if (l) l.push(w);
    else byShape.set(key, [w]);
  }
  const lowerBound = (prefix: string) => {
    let lo = 0;
    let hi = vocabSorted.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (vocabSorted[mid] < prefix) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  /** A consult's synonyms ("afib", "rate control", "heart attack") name the whole consult: every node inside covers them, weakly. */
  const aliasConsults = new Map<string, Set<string>>();
  /** Initials of a consult title ("DKA" for Diabetic Ketoacidosis) count like its title. */
  const acronymConsults = new Map<string, Set<string>>();
  docs.forEach((d) => {
    if (d.kind !== 'consult' || !d.consultId) return;
    const initials = words(d.title).filter((w) => !TITLE_STOP.has(w) && w.length > 1).map((w) => w[0]).join('');
    for (const k of d.keywords) {
      if (k.length > 40) continue;
      if (initials.length >= 2 && words(k).join('') === initials) {
        const set = acronymConsults.get(initials) ?? new Set<string>();
        set.add(d.consultId);
        acronymConsults.set(initials, set);
      }
      for (const w of stems(k)) {
        if (w.length < 2 || TITLE_STOP.has(w)) continue;
        const set = aliasConsults.get(w) ?? new Set<string>();
        set.add(d.consultId);
        aliasConsults.set(w, set);
      }
    }
  });
  const consultsOf = (e: Set<string>, from: Map<string, Set<string>>): Set<string> => {
    const out = new Set<string>();
    for (const w of e) for (const c of from.get(w) ?? []) out.add(c);
    return out;
  };

  /** Drug words: a drug in the question is its subject ("labetalol dose"), so it counts for more. */
  const drugWords = new Set<string>();
  const drugNames = new Map<string, string[]>();
  docs.forEach((d) => {
    if (d.kind !== 'drug') return;
    for (const w of stems(d.title)) drugWords.add(w);
    const names = new Set<string>();
    const add = (n: string) => {
      const t = n.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
      if (t) names.add(t.toLowerCase());
    };
    add(d.title);
    for (const m of d.title.matchAll(/\(([^)]+)\)/g)) names.add(m[1].toLowerCase());
    if (d.keywords[0]) add(d.keywords[0]);
    for (const n of [...names]) {
      const first = words(n)[0];
      if (words(n).length > 1 && first && first.length >= 5) names.add(first);
    }
    for (const n of names) {
      if (words(n).length !== 1) continue;
      const w = stem(words(n)[0]);
      drugNames.set(w, [...new Set([...(drugNames.get(w) ?? []), ...[...names].filter((o) => o !== n)])]);
    }
  });

  function expand(word: string, literal = false): Set<string> {
    const s = stem(word);
    if (literal && s.length <= 3) return new Set([s]);
    const out = new Set<string>([s]);
    const known = postings.has(s);
    const k = known ? 0 : s.length >= 9 ? 2 : s.length >= 5 ? 1 : 0;
    if (s.length >= 3) for (let i = lowerBound(s); i < vocabSorted.length && vocabSorted[i].startsWith(s); i++) out.add(vocabSorted[i]);
    // noun and adjective forms: hyponatremia / hyponatremic, ischemia / ischemic
    const root = s.length >= 8 ? s.replace(/(emia|emic)$/, 'emi') : s;
    if (root !== s) for (let i = lowerBound(root); i < vocabSorted.length && vocabSorted[i].startsWith(root); i++) out.add(vocabSorted[i]);
    if (k) {
      for (let len = s.length - k; len <= s.length + k; len++) {
        for (const v of byShape.get(s[0] + len) ?? []) if (v !== s && withinEdits(s, v, k)) out.add(v);
      }
    }
    return out;
  }

  function alternatives(word: string): Set<string>[][] {
    const phrases = [...(ALTS[word] ?? ALTS[stem(word)] ?? []), ...(drugNames.get(stem(word)) ?? [])];
    return phrases.map((phrase) => stems(phrase).map((w) => expand(w, true)));
  }

  const LEVEL_LOC = [LOC_TITLE, LOC_PARENT, LOC_CTX, LOC_TEXT];

  /** Docs carrying any of the stems at a level (or at any level when k < 0). */
  function docsWith(e: Set<string>, k: number): Set<number> {
    const out = new Set<number>();
    for (const w of e) {
      if (k >= 0) {
        for (const i of byLevel[k].get(w) ?? []) out.add(i);
      } else {
        for (const i of postings.get(w) ?? []) out.add(i);
      }
    }
    return out;
  }

  /** For every doc, how well one typed word is found in it (0 = absent): title 1, parent .85, context .6, text .35. */
  function locations(e: Set<string>, alts: Set<string>[][], viaAlias: Set<string>, viaAcronym: Set<string>): Float32Array {
    const n = docs.length;
    const out = new Float32Array(n);
    for (let k = 0; k < 4; k++) {
      const v = LEVEL_LOC[k];
      for (const w of e) for (const i of byLevel[k].get(w) ?? []) if (v > out[i]) out[i] = v;
      for (const phrase of alts) {
        let acc: Set<number> | undefined;
        for (const pe of phrase) {
          const here = docsWith(pe, k);
          acc = acc ? new Set([...acc].filter((i) => here.has(i))) : here;
          if (!acc.size) break;
        }
        if (acc) for (const i of acc) if (v > out[i]) out[i] = v;
      }
    }
    // a phrase split across levels still counts as context
    for (const phrase of alts) {
      let acc: Set<number> | undefined;
      for (const pe of phrase) {
        const here = docsWith(pe, -1);
        acc = acc ? new Set([...acc].filter((i) => here.has(i))) : here;
        if (!acc.size) break;
      }
      if (acc) for (const i of acc) if (out[i] === 0) out[i] = LOC_CTX;
    }
    for (const c of viaAcronym) for (const i of byConsult.get(c) ?? []) if (out[i] < LOC_CTX) out[i] = LOC_CTX;
    for (const c of viaAlias) for (const i of byConsult.get(c) ?? []) if (out[i] < LOC_ALIAS) out[i] = LOC_ALIAS;
    return out;
  }

  /** Docs whose page subtitle carries the word (info sections only). Used only to complete a match, see match(). */
  function subtitleLocations(e: Set<string>): Float32Array {
    const out = new Float32Array(docs.length);
    for (const w of e) for (const i of byLevel[4].get(w) ?? []) out[i] = LOC_SUBTITLE;
    return out;
  }

  function extraTitleWords(x: Prep, exps: { e: Set<string>; alts: Set<string>[][] }[]): number {
    let extra = 0;
    for (const w of x.title) {
      if (TITLE_STOP.has(w) || w.length < 2) continue;
      if (!exps.some((p) => p.e.has(w) || p.alts.some((phrase) => phrase.some((pe) => pe.has(w))))) extra++;
    }
    return extra;
  }

  function pairs(x: Prep, seq: readonly string[]): number {
    let n = 0;
    for (let i = 0; i + 1 < seq.length; i++) for (let j = 0; j + 1 < x.seq.length; j++) if (x.seq[j] === seq[i] && x.seq[j + 1] === seq[i + 1]) n++;
    return n;
  }

  interface Hit {
    index: number;
    base: number;
    loc: number;
    cov: number;
    extra: number;
  }

  function match(q: ParsedQuestion, named: ReadonlySet<string>): Hit[] {
    let toks = q.tokens.filter((t) => !t.soft);
    if (!toks.length) toks = q.tokens;
    if (!toks.length) return [];
    const required = toks.map((t) => !t.context);
    const exps = toks.map((t) => {
      const e = expand(t.word);
      return { e, alts: alternatives(t.word), viaAlias: consultsOf(e, aliasConsults), viaAcronym: consultsOf(e, acronymConsults) };
    });
    const n = docs.length;
    const locArr = exps.map((p) => locations(p.e, p.alts, p.viaAlias, p.viaAcronym));
    const subArr = exps.map((p) => subtitleLocations(p.e));
    const weight = exps.map((p, ti) => {
      let df = 0;
      for (const w of p.e) df += (postings.get(w) ?? []).length;
      df = Math.min(df, n);
      if (df === 0) for (let i = 0; i < n; i++) if (locArr[ti][i] > 0) df++;
      const subject = drugWords.has(stem(toks[ti].word)) || toks[ti].subject ? SUBJECT_WEIGHT : 1;
      const w = df === 0 ? 0 : Math.log(1 + n / df) * (toks[ti].context ? 1 : subject);
      // A word no title, heading, parent or keyword in the app ever uses ("doing", "cheapest") is chatter, not a topic:
      // being rare in body text must not make it count for more than an ordinary word, or it sinks every page that lacks it.
      const named = [...p.e].some((x) => byLevel[0].has(x) || byLevel[1].has(x) || byLevel[2].has(x)) || p.alts.length > 0 || p.viaAlias.size > 0 || p.viaAcronym.size > 0;
      return named || subject > 1 ? w : Math.min(w, CHATTER_WEIGHT);
    });
    toks.forEach((t, ti) => {
      if (t.context === 'in' && weight[ti] >= RARE_WEIGHT) required[ti] = true;
    });
    if (!required.some(Boolean)) required.fill(true);
    const total = weight.reduce((a, b, ti) => a + (required[ti] ? b : 0), 0);
    const ctxTotal = weight.reduce((a, b, ti) => a + (required[ti] ? 0 : b), 0);
    if (total === 0) return [];
    const out: Hit[] = [];
    const weak: Hit[] = [];
    for (let index = 0; index < n; index++) {
      let any = false;
      // the page subtitle may complete a section whose own heading already matches a typed word, never start a match
      let titleHit = false;
      for (let ti = 0; ti < locArr.length; ti++) {
        const l = locArr[ti][index];
        if (l > 0) any = true;
        if (l >= LOC_TITLE) titleHit = true;
      }
      if (!any) continue;
      let cov = 0;
      let loc = 0;
      let ctxLoc = 0;
      for (let ti = 0; ti < locArr.length; ti++) {
        const v = titleHit ? Math.max(locArr[ti][index], subArr[ti][index]) : locArr[ti][index];
        if (!required[ti]) ctxLoc += weight[ti] * v;
        else {
          if (v > 0) cov += weight[ti];
          loc += weight[ti] * v;
        }
      }
      cov /= total;
      loc /= total;
      ctxLoc = ctxTotal ? ctxLoc / ctxTotal : 0;
      const inNamed = docs[index].consultId !== undefined && named.has(docs[index].consultId!);
      if (cov < FALLBACK_COVERAGE && !inNamed) continue;
      const hit: Hit = { index, base: 0.34 - 0.3 * loc - CONTEXT_BONUS * ctxLoc + COVERAGE_WEIGHT * (1 - cov), loc, cov, extra: 0 };
      (cov < MIN_COVERAGE && !inNamed ? weak : out).push(hit);
    }
    if (out.length < FALLBACK_BELOW) out.push(...weak);
    // the phrase bonus and the unasked-title-word penalty are only worth computing for the best candidates
    out.sort((a, b) => a.base - b.base);
    const pool = out.slice(0, POOL);
    for (const h of pool) {
      h.base -= PAIR_BONUS * Math.min(pairs(prep[h.index], q.sequence), 2);
      h.extra = extraTitleWords(prep[h.index], exps);
    }
    return pool;
  }

  /**
   * A section whose own heading answers the intent ("Major Risk Factors") is a more precise
   * landing than the info page that contains it: it moves directly above its page.
   */
  function preferSections(list: QResult[], q: ParsedQuestion): QResult[] {
    if (!q.intents.length) return list;
    const out = [...list];
    for (let i = 0; i < out.length; i++) {
      const sec = out[i].doc;
      if (sec.kind !== 'info' || !sec.anchor) continue;
      const lift = intentLift(sec, q.intents);
      if (!lift) continue;
      const pi = out.findIndex((r, j) => j < i && r.doc.kind === 'info' && !r.doc.anchor && r.doc.pageId === sec.pageId);
      if (pi >= 0 && lift >= intentLift(out[pi].doc, q.intents)) {
        const [moved] = out.splice(i, 1);
        out.splice(pi, 0, moved);
      }
    }
    return out;
  }

  /** The dosing indication that shares the most query words (drug entries only). */
  function pickIndication(doc: QDoc, q: ParsedQuestion): string | undefined {
    if (!doc.doseIndications?.length) return undefined;
    const own = new Set(stems(doc.title + ' ' + doc.keywords.slice(0, 2).join(' ')));
    const want = q.tokens.filter((t) => !t.soft).map((t) => stem(t.word)).filter((w) => !own.has(w));
    if (!want.length) return undefined;
    let best: string | undefined;
    let bestN = 0;
    for (const ind of doc.doseIndications) {
      const have = new Set(stems(ind));
      const nHit = want.filter((w) => have.has(w) || [...have].some((h) => h.startsWith(w) && w.length >= 4)).length;
      if (nHit > bestN) {
        bestN = nHit;
        best = ind;
      }
    }
    return best;
  }

  /** Each consult's title split into alternative names ("Meningitis/Encephalitis" is Meningitis or Encephalitis). */
  const consultNames = docs
    .filter((d) => d.kind === 'consult')
    .map((d) => ({
      id: d.consultId!,
      // "A-Fib RVR" is [afib, rvr] or [a, fib, rvr]; "Meningitis/Encephalitis" is either name
      parts: d.title
        .split(/\s*[/\u2014]\s*|\s+-\s+/)
        .flatMap((t) => [stems(t), stems(t.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, '$1$2'))])
        .map((p) => p.filter((w) => !TITLE_STOP.has(w)))
        .filter((p) => p.length),
    }));

  function namedConsults(q: ParsedQuestion): string[] {
    const have = new Set<string>();
    for (const t of q.tokens) {
      if (t.soft) continue;
      have.add(stem(t.word));
      for (const phrase of ALTS[t.word] ?? ALTS[stem(t.word)] ?? []) for (const w of stems(phrase)) have.add(w);
    }
    return consultNames.filter((c) => c.parts.some((p) => p.every((w) => have.has(w)))).map((c) => c.id);
  }

  function rank(query: string, limit = 40, debug = false, force = false): { parsed: ParsedQuestion; results: QResult[] } {
    const parsed = parseQuestion(query);
    if (!parsed.active && !parsed.wide && !force) return { parsed, results: [] };
    const results: QResult[] = [];
    const named = new Set<string>(namedConsults(parsed));
    const hits = match(parsed, named);
    // The consults the question names: a title that is covered by the topic ("pneumonia" in "antibiotics for community acquired pneumonia"),
    // or whose title carries every topic word. Their nodes are the topic's own cards.
    const home = new Set<string>(named);
    for (const h of hits) if (docs[h.index].kind === 'consult' && h.loc >= CONSULT_IS_TOPIC_LOC) home.add(docs[h.index].consultId!);
    // consults with a node whose heading answers the asked-for facet and that covers the question well
    const answered = new Set<string>();
    if (parsed.active && parsed.intents.length) {
      for (const h of hits) {
        const d = docs[h.index];
        if (d.kind === 'node' && d.consultId && h.cov >= MIN_COVERAGE && intentLift(d, parsed.intents) > 0) answered.add(d.consultId);
      }
    }
    const askedPeds = PEDS_WORDS.test(fold(query)) || parsed.tokens.some((t) => PEDS_WORDS.test(t.word));
    const homeIds = [...home];
    const belongs = (doc: QDoc) =>
      !!doc.consultId && home.has(doc.consultId) || (!!doc.pageId && homeIds.some((c) => doc.pageId === c || doc.pageId!.startsWith(c + '-')));
    for (const h of hits) {
      const doc = docs[h.index];
      let score = h.base + (parsed.active ? 0 : WIDE_PENALTY) + TYPE_PENALTY[doc.kind] * (parsed.active ? QUESTION_TYPE_SCALE : 1);
      const inHome = belongs(doc);
      const foreign = !inHome && home.size > 0 && (doc.kind === 'node' || doc.kind === 'info' || doc.kind === 'trick');
      if (inHome) score -= HOME_BONUS * Math.min(1, Math.max(0, (h.loc - 0.5) / 0.5));
      else if (foreign) score += FOREIGN_PENALTY;
      if (doc.kind === 'info' && !doc.anchor && h.loc >= CONSULT_IS_TOPIC_LOC) score -= PAGE_TIE_BONUS;
      if (!askedPeds && (PEDS_WORDS.test(fold(doc.title)) || PEDS_CONSULT.test(doc.consultId ?? ''))) score += PEDS_PENALTY;
      else if (askedPeds && doc.kind === 'consult' && PEDS_CONSULT.test(doc.consultId ?? '')) score -= PEDS_BONUS;
      if (isDoNot(doc.title) && !parsed.intents.includes('contra') && !parsed.intents.includes('avoid') && !/\b(not|avoid|never|dont|pitfall)\b/.test(fold(query))) score += DO_NOT_PENALTY;
      if (parsed.active) {
        score += EXTRA_WORD_PENALTY * Math.min(h.extra, EXTRA_WORD_CAP);
        if (doc.kind === 'consult' && h.loc < CONSULT_IS_TOPIC_LOC) score += QUESTION_CONSULT_PENALTY;
        if (doc.kind === 'consult' && doc.consultId && answered.has(doc.consultId)) score += FACET_CONSULT_PENALTY;
        const lift = intentLift(doc, parsed.intents) * (foreign ? FOREIGN_LIFT_SCALE : 1);
        if (lift) score -= lift * liftShare(h.loc) * Math.min(1, h.cov / MIN_COVERAGE) ** 2;
      }
      const r: QResult = { doc, score, cov: h.cov };
      if (debug) r.why = `base=${h.base.toFixed(3)} loc=${h.loc.toFixed(2)} cov=${h.cov.toFixed(2)} extra=${h.extra} home=${inHome} foreign=${foreign} lift=${intentLift(doc, parsed.intents).toFixed(2)}`;
      if (doc.kind === 'drug') r.indication = pickIndication(doc, parsed);
      results.push(r);
    }
    results.sort((a, b) => a.score - b.score || TYPE_PENALTY[a.doc.kind] - TYPE_PENALTY[b.doc.kind] || a.doc.title.localeCompare(b.doc.title));
    return { parsed, results: preferSections(results, parsed).slice(0, limit) };
  }

  /** Consults, drugs and calculators whose title starts with the query, alphabetical (the old prefix path). */
  const named = docs.map((d, i) => ({ d, i })).filter(({ d }) => d.kind === 'consult' || d.kind === 'drug' || d.kind === 'calc');
  function prefixResults(query: string): QResult[] {
    const q = fold(query).trim();
    if (!q) return [];
    return named
      .filter(({ d }) => titleStarts(d.title, q) || (d.kind === 'consult' && d.consultId!.startsWith(q)))
      .map(({ d }) => ({ doc: d, score: 0 }))
      .sort((a, b) => a.doc.title.localeCompare(b.doc.title));
  }

  function search(query: string, limit = 40, debug = false) {
    const { parsed, results } = rank(query, limit, debug);
    const prefix = prefixResults(query);
    const mode = parsed.active ? 'question' : parsed.wide ? 'topic' : 'plain';
    if (mode === 'plain') return { parsed, results: prefix.slice(0, limit), mode } as const;
    // a topic typed as a title ("pelvic inflammatory disease") keeps the old title-first order
    // a query that IS a title ("Hypertension in Pregnancy") still opens that title first
    const exact = prefix.filter((r) => compact(r.doc.title) === compact(query));
    const merged = mode === 'topic' ? [...prefix, ...results] : [...exact, ...results, ...prefix];
    const seen = new Set<QDoc>();
    const out = merged.filter((r) => (seen.has(r.doc) ? false : (seen.add(r.doc), true)));
    return { parsed, results: out.slice(0, limit), mode } as const;
  }

  const docIndex = new Map<QDoc, number>(docs.map((d, i) => [d, i]));

  /**
   * Does anything in the top results answer the question, or do they only share a word with it? Coverage cannot tell: it is measured over
   * words the app knows, so a question full of words found nowhere in the app can score 1.00 on one stray word. Answer only when
   *   (a) the app knows at least half of the question's content words (a question of words found nowhere in the app is out of scope), and
   *   (b) some top result carries at least half of them AND names at least one in a title, parent or context, not only in passing in body text.
   * Calibrated on 59 real questions and 16 out-of-scope ones (my-vertigo-app): 0 of 16 answered, 2 of 59 abstained (both already weak).
   */
  function assess(q: ParsedQuestion, results: readonly QResult[]): boolean {
    const hard = q.tokens.filter((t) => !t.soft);
    const toks = hard.length ? hard : q.tokens;
    if (!toks.length) return results.length > 0;
    const per = toks.map((t) => ({ e: expand(t.word), alts: alternatives(t.word), exact: stem(t.word), short: t.word.length <= 5, subject: t.subject ? stem(t.word) : '' }));
    let known = 0;
    for (const p of per) {
      let df = 0;
      // a short word is known only as itself: a typo match ("reset" one edit from "rest") is not knowledge of the word
      for (const w of p.short ? [p.exact] : p.e) df += (postings.get(w) ?? []).length;
      if (df > 0 || p.alts.length > 0) known++;
    }
    if (known / toks.length < ANSWER_MIN_KNOWN) return false;
    for (const r of results.slice(0, ANSWER_TOP)) {
      const i = docIndex.get(r.doc);
      if (i === undefined) continue;
      const x = prep[i];
      const named = new Set<string>([...x.title, ...x.parent, ...x.ctx]);
      const anywhere = new Set<string>([...named, ...x.text, ...x.psub]);
      const hasAlt = (phrases: Set<string>[][], where: Set<string>) => phrases.some((ph) => ph.every((es) => [...es].some((w) => where.has(w))));
      let matched = 0;
      let exactMatched = 0;
      let names = 0;
      for (const p of per) {
        const inNamed = [...p.e].some((w) => named.has(w)) || hasAlt(p.alts, named);
        const inText = [...p.e].some((w) => anywhere.has(w)) || hasAlt(p.alts, anywhere);
        // a lab reading names its condition: a top result that carries that exact condition in its own text is about it ("K 2.1" -> hypokalemia).
        // Exact stems only: a typo match would name "hypocalcemia" for "high calcium" (two edits apart) and answer the opposite condition.
        if (inNamed || (p.subject && anywhere.has(p.subject))) names++;
        if (inNamed || inText) matched++;
        if (anywhere.has(p.exact) || hasAlt(p.alts, anywhere)) exactMatched++;
      }
      if (matched / toks.length >= ANSWER_MIN_MATCHED && names > 0) return true;
      // a result whose own text carries every content word of a multi-word question answers it
      if (toks.length >= 2 && exactMatched === toks.length) return true;
    }
    return false;
  }

  /**
   * `find`, but an honest one: when nothing in the app really answers the question the result list is empty and `covered` is false,
   * so a UI can say "not covered here" instead of showing cards that merely share a word. Title-prefix hits (a pathway typed by name) always count.
   */
  function answer(query: string, limit = 40, debug = false) {
    const first = find(query, limit, debug);
    if (first.results.some((r) => r.cov === undefined)) return { ...first, covered: first.results.length > 0 };
    const covered = assess(first.parsed, first.results);
    return { ...first, results: covered ? first.results : [], covered };
  }

  /** Ranked results for any non-empty text, including a single word ("yacovino") that `rank` leaves to a legacy search. */
  function lookup(query: string, limit = 40, debug = false) {
    return rank(query, limit, debug, true);
  }

  /**
   * The whole Home search for an app with no legacy search of its own: `search`, and for a plain query (one word or a title
   * prefix) the prefix hits first, then the ranked lookup. Same result shape as `search`.
   */
  function find(query: string, limit = 40, debug = false) {
    const first = search(query, limit, debug);
    if (first.mode !== 'plain') return first;
    const seen = new Set<QDoc>(first.results.map((r) => r.doc));
    const more = lookup(query, limit, debug).results.filter((r) => !seen.has(r.doc));
    return { ...first, results: [...first.results, ...more].slice(0, limit) };
  }

  return { size: docs.length, rank, search, lookup, find, answer };
}

// ===================================================================
// Answer preview: 1-2 lines of the app's own text
// ===================================================================

/**
 * The sentence(s) of `text` that carry the most query words, copied verbatim.
 * Never generated: when nothing matches, the opening of the text is used.
 */
export function previewFor(text: string | undefined, parsed: ParsedQuestion, maxLen = 170, requireMatch = false): string {
  if (!text) return '';
  const flat = text.replace(/\s+/g, ' ').trim();
  if (!flat) return '';
  const want = new Set<string>();
  for (const t of parsed.tokens) if (!t.soft) want.add(stem(t.word));
  for (const w of parsed.sequence) want.add(w);
  const pieces = flat.split(/(?<=[.!?:;])\s+|\s+[•—]\s+|\s-\s/).filter((p) => p.length > 2);
  let best = 0;
  let bestScore = -1;
  pieces.forEach((p, i) => {
    const have = new Set(stems(p));
    let s = 0;
    for (const w of want) if (have.has(w)) s++;
    if (s > bestScore) {
      bestScore = s;
      best = i;
    }
  });
  if (requireMatch && bestScore <= 0) return '';
  let out = pieces[best] ?? flat;
  if (out.length < maxLen * 0.6 && pieces[best + 1]) out += ' ' + pieces[best + 1];
  if (out.length > maxLen) out = out.slice(0, maxLen - 1).replace(/\s+\S*$/, '') + '…';
  return out;
}

// ===================================================================
// Document builder (shared by the app and the Node test)
// ===================================================================

/** Markdown and citation markers out, whitespace collapsed (the search text is plain). */
export function plain(text: string | undefined): string {
  return String(text ?? '')
    .replace(/\[([^\]]+)\]\(#?[^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s*\[\d+(?:\s*[,\u2013-]\s*\d+)*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** A drug entry (drug-store.ts shape) as search input. */
export function drugInput(d: { id: string; name: string; genericName: string; drugClass: string; indications?: string[]; dosing?: { indication: string; regimen: string }[]; contraindications?: string[] }, synonyms: string[] = []): BuildInput['drugs'][number] {
  return {
    id: d.id,
    n: d.name,
    g: d.genericName,
    c: d.drugClass,
    ind: d.indications ?? [],
    dose: (d.dosing ?? []).map((x) => ({ i: x.indication, r: plain(x.regimen).slice(0, 400) })),
    contra: (d.contraindications ?? []).map(plain).slice(0, 12),
    synonyms,
  };
}

export interface BuildInput {
  consults: { id: string; title: string; subtitle: string; synonyms: string[] }[];
  nodes: { id: string; treeId: string; title: string; summary: string; body: string; recommendation: string; /** the consult's section name for this node ("Severe HyperK Rx") */ ml?: string }[];
  tricks: { id: string; infoPageId: string; specialtyId: string; specialtyLabel: string; anchorId: string; title: string; blurb: string }[];
  info: { p: string; a: string; h: string; pt: string; t: string }[];
  pages?: { p: string; t: string; s: string; x: string }[];
  drugs: { id: string; n: string; g: string; c: string; ind: string[]; dose: { i: string; r: string }[]; contra: string[]; synonyms: string[] }[];
  calcs: { id: string; title: string; subtitle: string }[];
}

export function buildQuestionDocs(input: BuildInput): QDoc[] {
  const docs: QDoc[] = [];
  const treeTitle = new Map<string, string>();
  for (const c of input.consults) {
    treeTitle.set(c.id, c.title);
    docs.push({ id: c.id, kind: 'consult', title: c.title, subtitle: c.subtitle, keywords: [c.id, ...c.synonyms], consultId: c.id });
  }
  for (const n of input.nodes) {
    docs.push({
      id: `${n.treeId}/${n.id}`,
      kind: 'node',
      title: n.title || n.id,
      subtitle: `In: ${treeTitle.get(n.treeId) ?? n.treeId.replace(/-/g, ' ')}`,
      parentTitle: treeTitle.get(n.treeId),
      moduleLabel: n.ml,
      keywords: [],
      text: [n.summary, n.body, n.recommendation].filter(Boolean).join(' '),
      consultId: n.treeId,
      nodeId: n.id,
    });
  }
  for (const t of input.tricks) {
    docs.push({ id: `${t.infoPageId}#${t.anchorId}`, kind: 'trick', title: t.title, subtitle: `Trick — ${t.specialtyLabel}`, keywords: [], text: t.blurb, specialtyId: t.specialtyId, anchor: t.anchorId, pageId: t.infoPageId });
  }
  const trickKeys = new Set(input.tricks.map((t) => `${t.infoPageId}#${t.anchorId}`));
  const pageSubtitle = new Map((input.pages ?? []).map((g) => [g.p, g.s]));
  for (const s of input.info) {
    if (trickKeys.has(`${s.p}#${s.a}`)) continue; // a trick is already a doc with its own landing
    docs.push({ id: `${s.p}#${s.a}`, kind: 'info', title: s.h, subtitle: s.pt, parentTitle: s.pt, parentSubtitle: pageSubtitle.get(s.p), keywords: [], text: s.t, pageId: s.p, anchor: s.a });
  }
  for (const g of input.pages ?? []) {
    docs.push({ id: `page:${g.p}`, kind: 'info', title: g.t, subtitle: g.s, keywords: [], text: g.x, pageId: g.p });
  }
  for (const d of input.drugs) {
    const text = [
      ...d.dose.map((x) => `${x.i}: ${x.r}`),
      d.contra.length ? `Contraindications: ${d.contra.join('; ')}` : '',
    ].filter(Boolean).join(' \u2022 ');
    docs.push({
      id: d.id, kind: 'drug', title: d.n, subtitle: d.c,
      keywords: [d.g, d.c, ...d.synonyms, ...d.ind],
      text, drugId: d.id, doseIndications: d.dose.map((x) => x.i),
    });
  }
  for (const c of input.calcs) docs.push({ id: c.id, kind: 'calc', title: c.title, subtitle: c.subtitle, keywords: [c.id], calcId: c.id });
  return docs;
}

/**
 * Per-kind route builders. Each app passes the routes its own router understands; anything not given falls back to
 * DEFAULT_ROUTES (myMedKitt's hash routes), so an app only overrides the kinds whose URLs differ.
 */
export type RouteMap = Partial<Record<QKind, (doc: QDoc) => string>>;

export const DEFAULT_ROUTES: Required<RouteMap> = {
  consult: (d) => `/tree/${d.consultId}`,
  node: (d) => `/tree/${d.consultId}/node/${d.nodeId}`,
  info: (d) => (d.anchor ? `/info/${d.pageId}/at/${d.anchor}` : `/info/${d.pageId}`),
  trick: (d) => `/tricks/${d.specialtyId}/trick/${d.anchor}`,
  drug: () => '/drugs',
  calc: (d) => `/calculator/${d.calcId}`,
};

/** The route a result opens. */
export function routeFor(doc: QDoc, routes: RouteMap = {}): string {
  return (routes[doc.kind] ?? DEFAULT_ROUTES[doc.kind])(doc);
}

/** Pin keys a result satisfies (see scripts/search-heldout.ts). */
export function keysFor(doc: QDoc): string[] {
  switch (doc.kind) {
    case 'consult': return [`tree:${doc.consultId}`];
    case 'node': return [`node:${doc.consultId}/${doc.nodeId}`, `tree:${doc.consultId}`];
    case 'info': return doc.anchor ? [`info:${doc.pageId}`, `sec:${doc.pageId}#${doc.anchor}`] : [`info:${doc.pageId}`];
    case 'trick': return [`info:${doc.pageId}`, `sec:${doc.pageId}#${doc.anchor}`];
    case 'drug': return [`drug:${doc.drugId}`];
    case 'calc': return [`calc:${doc.calcId}`];
  }
}
