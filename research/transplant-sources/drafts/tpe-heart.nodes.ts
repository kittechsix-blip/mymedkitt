// Draft page: Transplant Patient in the ED - Heart transplant recipient (tpe-heart). Source: ISHLT 2023 heart recipient guideline only; review tier not written.
// Module numbers are 0 for the assembler. Literal array on purpose (regex gates read it): do not spread or generate into NODES.
// Import paths are those of src/data/trees/; the assembler places this file there. Info pages (#/info/tpe-heart-*) are separate files in the same folder: tpe-heart-*.info.ts.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-heart" },
  { text: "Relative, symptomatic bradycardia: \"will not respond to atropine\"; isoproterenol infusion and pacing \"usual modes of management\" (ISHLT anaesthesia section, I C).", nodeId: "tpe-heart-brady" },
  { text: "Adenosine may be considered, closely monitored, starting low: 25 mcg/kg (1.5 mg if 60 kg or more) (ISHLT 2023, IIb C).", nodeId: "tpe-heart-tachy" },
  { text: "New-onset heart failure: evaluate for acute cellular and antibody-mediated rejection; consider CAV (ISHLT graft failure narrative).", nodeId: "tpe-heart-compromise" },
  { text: "Compromising pericardial effusion: percutaneous or surgical drainage (ISHLT early postoperative care table, I C).", nodeId: "tpe-heart-compromise" },
  { text: "Suspected symptomatic acute rejection: biopsy as early as possible (I C). High-dose IV steroid first-line (call the transplant team first).", nodeId: "tpe-heart-rejection" },
  { text: "After the first year with graft dysfunction: biopsy and donor-specific antibodies before treatment (IIa C).", nodeId: "tpe-heart-rejection" },
  { text: "Adding or stopping a drug: amiodarone, diltiazem, verapamil, theophylline, clarithromycin, erythromycin, azoles raise levels; rifampin, phenytoin lower them (Table 5).", nodeId: "tpe-heart-drugs" },
  { text: "Report to the transplant centre: hospitalization, medication change, hypotension, rate rise, fever, syncope, chest pain (ISHLT call list, I C).", nodeId: "tpe-heart-dispo" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-heart",
    type: "question",
    module: 0,
    title: "Heart transplant recipient in the ED",
    safetyLevel: "warning",
    body: "\u2022 Not in the guideline: an emergency-department section for the late recipient. Nearest: the statements here and on the linked pages, each labelled with its section. [1]\n\u2022 The heart is denervated: autonomic drugs have minimal effect (ISHLT Table 14, anaesthesia). Resting rate is usually higher, about 90/min, up to 130/min, which \"do not require treatment\" (anaesthesia section, I C). [1]\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\nEditor note: ask the patient how to reach the transplant centre and which medicines they take.\nRelated consults: [Chest pain](#/tree/chest-pain-hub) chest pain; [Palpitations](#/tree/palpitations-hub) palpitations; [Sepsis](#/tree/sepsis) fever infection.\n[Denervated heart: each drug](#/info/tpe-heart-denervated-drugs)",
    options: [{"label": "Low blood pressure, new heart failure or effusion", "next": "tpe-heart-compromise", "urgency": "critical"}, {"label": "Slow heart rate or syncope", "next": "tpe-heart-brady", "urgency": "critical"}, {"label": "Fast or irregular rhythm", "next": "tpe-heart-tachy", "urgency": "critical"}, {"label": "Suspected rejection", "next": "tpe-heart-rejection", "urgency": "urgent"}, {"label": "Drug interactions: before you give a drug", "next": "tpe-heart-drugs"}, {"label": "Chronic problems to recognise", "next": "tpe-heart-chronic"}],
    summary: "Heart recipients (ISHLT): denervated heart; rejection often silent; biopsy as early as possible if symptomatic acute rejection is suspected (I C). Not in the guideline: an emergency-department section.",
    citation: [1],
  },

  {
    id: "tpe-heart-brady",
    type: "info",
    module: 0,
    title: "Slow heart rate or syncope",
    safetyLevel: "critical",
    body: "\u2022 A relative, symptomatic bradycardia that requires treatment \"will not respond to atropine\"; \"Isoproterenol infusion and pacing are the usual modes of management\" (ISHLT, anaesthesia section, 2010 text continued, I C). [1]\n\u2022 Not in the guideline: an isoproterenol dose for bradycardia. Nearest: in the perioperative setting (early postoperative care table, I B), isoproterenol, theophylline, terbutaline, albuterol can be used to increase heart rate; temporary pacing in relative bradycardia to maintain heart rates above 90/min (I B). [1]\n\u2022 Late bradyarrhythmia (arrhythmia section, 2023): permanent pacing regardless of symptoms for Mobitz II, high-grade or third-degree AV block (I B); marked first-degree or Mobitz I block with attributable symptoms, reasonable (IIa C). [1]\nEditor note: apply pacing pads early when a recipient is symptomatic with a slow rate.\nApp content: the Bradycardia consult's epinephrine-infusion node gives isoproterenol 2-10 mcg/min for denervated hearts.\nRelated consults: [Bradycardia](#/tree/bradycardic-arrest) pacing steps.\n[Rhythm and pacing detail](#/info/tpe-heart-rhythm-detail)\n[Related consults](#/info/tpe-heart-other-consults)",
    next: "tpe-heart-dispo",
    calculatorLinks: [{"id": "bradycardic-arrest", "label": "Bradycardia: transcutaneous pacing", "kind": "tree", "node": "brady-tcp"}],
    summary: "Heart recipients (anaesthesia section, I C): relative symptomatic bradycardia will not respond to atropine; isoproterenol infusion and pacing usual. Late high-grade AV block: permanent pacing (arrhythmia section, I B).",
    citation: [1],
  },

  {
    id: "tpe-heart-tachy",
    type: "info",
    module: 0,
    title: "Fast or irregular rhythm",
    safetyLevel: "critical",
    body: "\u2022 Atrial or ventricular arrhythmia: consider biopsy and coronary angiography to exclude rejection, assess for CAV (arrhythmia section, I B); sustained VT: both (early postoperative care table, I B). [1]\n\u2022 Adenosine may be considered, closely monitored, starting low: 25 mcg/kg (1.5 mg if 60 kg or more) (early postoperative care table, ISHLT 2023, IIb C). Study behind the figure: central line, not in tachycardia, ages 6 months to 25 years (detail: [denervated drugs](#/info/tpe-heart-denervated-drugs)). \"standard doses to treat atrial tachyarrhythmias may result in prolonged asystole\" (anaesthesia section, I C). [Adenosine](#/drug/adenosine/heart transplant) [1, 2]\n\u2022 Non-dihydropyridine calcium channel blockers, beta-blockers may be used for rate control (early postoperative care table, IIa B) and atrial fibrillation with preserved ejection fraction (arrhythmia section, IIa B). [1]\n\u2022 The guideline describes amiodarone as having minimal interaction with immunosuppressants in one place (IIa C); Table 5 lists amiodarone, diltiazem, verapamil as raising calcineurin and mTOR inhibitor levels. Guideline: monitor levels and adjust doses (call the transplant team first). [1]\nApp content: the SVT consult's critical action gives adenosine 6 mg then 12 mg; its adenosine node says 3 mg for a transplanted heart.\n[Detail](#/info/tpe-heart-rhythm-detail)",
    next: "tpe-heart-dispo",
    calculatorLinks: [{"id": "afib-rvr", "label": "Atrial Fibrillation with RVR", "kind": "tree"}, {"id": "svt", "label": "SVT", "kind": "tree"}, {"id": "ventricular-tachycardia", "label": "Ventricular Tachycardia", "kind": "tree"}],
    summary: "ISHLT, heart recipients: adenosine may be considered, closely monitored, low-dose 25 mcg/kg (1.5 mg if \u226560 kg; IIb C); standard doses to treat atrial tachyarrhythmias may result in prolonged asystole.",
    citation: [1, 2],
  },

  {
    id: "tpe-heart-compromise",
    type: "info",
    module: 0,
    title: "Low blood pressure, new heart failure or effusion",
    safetyLevel: "critical",
    body: "Related consults: [Cardiogenic shock](#/tree/cardiogenic-shock) shock support.\n\u2022 New-onset heart failure: evaluate for acute cellular and antibody-mediated rejection and consider CAV (ISHLT, graft failure narrative). In low-grade cellular rejection with compromise, consider AMR and/or CAV (I C). [1]\n\u2022 IV inotropes and vasopressors should be used as necessary to maintain cardiac output and blood pressure until graft function recovers (rejection section, I C). [1]\n\u2022 Table 14 (anaesthesia): norepinephrine, epinephrine, isoproterenol, dopamine are effective, although beta-adrenergic inotropic effects are attenuated early after transplant; ephedrine is not very effective; ketamine may not give stability in extremis; phenylephrine is effective, without reflex bradycardia. [1]\n\u2022 Pericardial effusion (early postoperative care table, I C): monitor by echo; percutaneous or surgical drainage when compromising. [1]\n\u2022 Intercurrent-surgery section (I C): blood products leukocyte poor; low-risk CMV red cells for CMV-seronegative recipients. [1]\nApp content: the cardiogenic shock consult says \"If must intubate: ketamine + push-dose epi ready\" and the sepsis consult says \"Consider ketamine for induction (hemodynamically stable)\"; Table 14 says \"ketamine may not display hemodynamic stability in heart transplant patients in extremis\".\n[Compromise detail](#/info/tpe-heart-compromise-detail)\n[Related consults](#/info/tpe-heart-other-consults)",
    next: "tpe-heart-dispo",
    calculatorLinks: [{"id": "cardiogenic-shock", "label": "Cardiogenic Shock", "kind": "tree"}, {"id": "right-heart-failure", "label": "Right Heart Failure", "kind": "tree"}, {"id": "chf-exacerbation", "label": "Acute Heart Failure", "kind": "tree"}],
    summary: "Heart recipients: new-onset heart failure, evaluate for rejection. Hypotension: inotropes and vasopressors as necessary (rejection section, I C); direct-acting agents effective (Table 14). Related consults: Cardiogenic Shock.",
    citation: [1],
  },

  {
    id: "tpe-heart-rejection",
    type: "info",
    module: 0,
    title: "Suspected rejection",
    safetyLevel: "warning",
    body: "\u2022 Rejection often occurs without symptoms; LV or RV systolic dysfunction on echo, even without symptoms, is typically treated as symptomatic rejection (ISHLT narrative). [1]\n\u2022 Biopsy as early as possible if symptomatic acute rejection is suspected (I C). Symptomatic acute cellular rejection: hospitalize; ICU or intermediate care if hemodynamic compromise (I C). High-dose IV corticosteroid is first-line (I C) (call the transplant team first). Not in the guideline: a dose for cellular rejection. [1]\n\u2022 After the first year, graft dysfunction: biopsy and donor-specific antibodies \"before initiating treatment\" (IIa C). [1]\n\u2022 Not in the guideline: a rule for the unstable patient before a biopsy is possible. Nearest: IV inotropes and vasopressors as necessary to maintain cardiac output and blood pressure until graft function recovers (rejection section, I C). [1]\nRelated consults: [Cardiogenic shock](#/tree/cardiogenic-shock) shock support; [Sepsis](#/tree/sepsis) fever infection.\n[Rejection by type, ECG and biomarkers](#/info/tpe-heart-rejection-detail)",
    next: "tpe-heart-dispo",
    calculatorLinks: [{"id": "cardiogenic-shock", "label": "Cardiogenic Shock", "kind": "tree"}, {"id": "sepsis", "label": "Sepsis", "kind": "tree"}],
    summary: "Heart recipients (I C): biopsy as early as possible if symptomatic acute rejection suspected; high-dose IV steroid first-line (call the transplant team first). Hospitalize symptomatic acute cellular rejection.",
    citation: [1],
  },

  {
    id: "tpe-heart-drugs",
    type: "info",
    module: 0,
    title: "Drug interactions: before you give a drug",
    safetyLevel: "warning",
    body: "\u2022 Adding or withdrawing a Table 5 drug: close monitoring of immunosuppressant levels and dose adjustment (ungraded). [1]\n\u2022 Raise levels (Table 5): amiodarone, diltiazem, verapamil, theophylline, clarithromycin, erythromycin, azoles. [1]\n\u2022 Lower levels: carbamazepine, phenytoin, phenobarbital, rifampin. [1]\n\u2022 Neurologic narrative: phenytoin, phenobarbital, carbamazepine, valproic acid \"should be avoided\"; fosphenytoin \"with caution\". [1]\n\u2022 Intercurrent-surgery section (I C): \"Immunosuppression should not be discontinued or modified without discussion with the HT team.\" [1]\n\u2022 Neurologic table (I C): for new seizures not due to stroke or structural brain disease the guideline says management should include reduction of CNI doses (taking into consideration the risk of inadequate immunosuppression) (call the transplant team first) and correction of hypomagnesemia, if present. PRES (I C): gradual blood pressure reduction and withdrawal or reduction of CNI, with substitution for an alternate agent or CNI (call the transplant team first). [1]\n\u2022 This sits beside the surgery-section instruction above; the guideline does not reconcile the two. [1]\nEditor note: before adding or stopping any drug, ask the transplant team or a transplant pharmacist whether it changes the immunosuppressant level.\n[Full lists, cautions](#/info/tpe-heart-interactions)",
    next: "tpe-heart-dispo",
    calculatorLinks: [{"id": "adrenal-insufficiency", "label": "Adrenal Insufficiency", "kind": "tree"}],
    summary: "Heart recipients (Table 5): amiodarone, diltiazem, verapamil, clarithromycin, erythromycin, azoles raise levels; rifampin, phenytoin lower them. Guideline: monitor levels and adjust doses (call the transplant team first).",
    citation: [1],
  },

  {
    id: "tpe-heart-chronic",
    type: "info",
    module: 0,
    title: "Chronic problems to recognise",
    safetyLevel: "warning",
    body: "\u2022 Allograft vasculopathy (CAV) is a leading cause of death and a frequent cause of late graft dysfunction (ISHLT narrative). Acute rejection and CAV are major risk factors for sudden death. [1]\n\u2022 CAV: coronary angiography graded by the 2010 ISHLT nomenclature (printed \"Class 1\", B); annual or biannual angiography should be considered (I C). Statins reduce CAV (I A); doses generally lower because of CNI (I A). [1]\n\u2022 CNI is a major, but not the sole, cause of CKD; acute toxicities include vasoconstriction, toxic tubulopathy and sometimes thrombotic microangiopathy. Skin cancer is the most common malignancy; PTLD evaluation at the transplant center (I C). [1]\n[Chronic problems detail](#/info/tpe-heart-chronic-detail)",
    next: "tpe-heart-dispo",
    summary: "Heart recipients: allograft vasculopathy (angiography, I C), lower statin doses with CNI (I A), CNI kidney injury, skin cancer; PTLD evaluated at the transplant center (I C).",
    citation: [1],
  },

  {
    id: "tpe-heart-dispo",
    type: "result",
    module: 0,
    title: "Tell the transplant team and decide disposition",
    safetyLevel: "critical",
    confidence: 'recommended',
    body: "\u2022 The guideline lists events to tell the transplant centre about (I C), including: hospitalization for any reason; any medication change including a new antibiotic, antifungal or antiviral; hypotension or systolic drop of 20 mm Hg or more; resting rate rise over 10/min; fever of 101\u00b0F (38\u00b0C) (2010 and 2023 wording differ); weight gain of 2 lb or more in a week; shortness of breath; pneumonia or respiratory infection; syncope; chest pain other than musculoskeletal; seizure or mental status change. [1]\n\u2022 Symptomatic acute cellular rejection is hospitalized; with hemodynamic compromise, ICU or intermediate care (I C). The patient and primary care physician should know how to reach the transplant center. [1]\n[The full list as printed](#/info/tpe-heart-call-list)\n[Related consults](#/info/tpe-heart-other-consults)\nEditor note: disposition is decided with the treating transplant team.",
    calculatorLinks: [{"id": "sepsis", "label": "Sepsis", "kind": "tree"}, {"id": "pneumonia", "label": "Pneumonia", "kind": "tree"}, {"id": "chest-pain-hub", "label": "Chest pain", "kind": "tree"}, {"id": "syncope", "label": "Syncope", "kind": "tree"}],
    summary: "Heart recipients (I C): report to the transplant centre hospitalization, medication change, hypotension, rate rise, fever, syncope, chest pain. Symptomatic acute cellular rejection is hospitalized.",
    recommendation: "**Events on the guideline's call-the-centre list (hospitalization, medication change, hypotension, rate rise, fever, syncope, chest pain) are reported to the transplant centre; symptomatic rejection is hospitalized, in an ICU or intermediate-care unit if hemodynamically compromised.** Editor note: disposition is decided with the treating transplant team.",
    citation: [1],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: 'Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015' },
  { num: 2, text: 'Flyer JN, et al. Prospective study of adenosine on atrioventricular nodal conduction in pediatric and young adult patients after heart transplant. Circulation. 2017;135(25):2485-2493. PMID 28450351' },
];
