// myMedKitt — Myocarditis Decision Tree
// ED recognition → risk stratification → fulminant stabilization → diagnostics → etiology → disposition.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const MYOCARDITIS_CRITICAL_ACTIONS = [
  { text: 'Think myocarditis when chest pain, arrhythmia, syncope, or new HF follows viral illness, autoimmune disease, cardiotoxin, ICI therapy, or prior myocarditis', nodeId: 'myocarditis-start' },
  { text: 'ECG, troponin, and echo help triage, but normal early tests do not fully exclude myocarditis when suspicion is high', nodeId: 'myocarditis-initial-tests' },
  { text: 'Hemodynamic or electrical instability = Stage D / fulminant pathway: telemetry, norepi if shock, avoid delay, early advanced HF/ECMO-capable transfer', nodeId: 'myocarditis-fulminant' },
  { text: 'Do not treat myocarditis as routine ACS only; exclude ACS/dissection/PE, but persistent LV dysfunction, VT, or AV block changes the pathway', nodeId: 'myocarditis-mimics' },
  { text: 'Avoid strenuous exercise for 3-6 months in symptomatic myocarditis; return only after symptoms, biomarkers, imaging, rhythm monitoring, and stress testing clear', nodeId: 'myocarditis-return-exercise' },
  { text: 'NSAIDs/colchicine can help pericarditic chest pain, but avoid NSAIDs in symptomatic HF or LV dysfunction', nodeId: 'myocarditis-pain-control' },
];

export const MYOCARDITIS_NODES: DecisionNode[] = [
  {
    id: 'myocarditis-start',
    type: 'question',
    module: 1,
    title: 'Myocarditis — ED Recognition',
    body: '**Myocarditis is a syndrome, not one disease.** It can look like viral chest pain, STEMI/NSTEMI, heart failure, dysrhythmia, syncope, or cardiogenic shock. [1][2]\n\n**High-yield ED triggers:**\n• Recent viral syndrome, COVID/influenza-like illness, GI illness\n• Chest pain with troponin elevation and non-obstructive/atypical ACS pattern\n• New dyspnea, pulmonary edema, or cardiogenic shock without known CAD\n• Palpitations, VT, high-grade AV block, syncope\n• Autoimmune disease, sarcoid, eosinophilia, drug reaction\n• Immune checkpoint inhibitor therapy\n• Young male within days after mRNA/Novavax COVID vaccine: rare, usually improving by discharge, but still evaluate carefully [5]\n\n**ED mindset:** rule out immediate mimics, identify Stage D instability, and involve cardiology early.',
    citation: [1, 2, 5],
    options: [
      { label: 'Unstable: shock, VT, high-grade AV block, syncope, severe HF', next: 'myocarditis-fulminant', urgency: 'critical' },
      { label: 'Stable chest pain / troponin / viral prodrome', next: 'myocarditis-initial-tests' },
      { label: 'Predominant pericarditis symptoms', next: 'myocarditis-pain-control' },
      { label: 'ICI therapy or high-risk immune/drug trigger', next: 'myocarditis-ici', urgency: 'urgent' },
    ],
    summary: 'Suspect myocarditis with chest pain, arrhythmia, syncope, or HF after viral/immune/cardiotoxin exposure.',
    safetyLevel: 'warning',
  },

  {
    id: 'myocarditis-mimics',
    type: 'info',
    module: 1,
    title: 'Do Not Miss Mimics',
    body: '**Myocarditis is a diagnosis of suspicion plus exclusion. Do not anchor.** [1][2]\n\n**Immediate mimics to actively rule out:**\n• **ACS/STEMI/NSTEMI** — territorial ECG changes, coronary risk, dynamic troponin, wall-motion territory\n• **Aortic dissection** — tearing pain, pulse/BP difference, neuro deficit, widened mediastinum\n• **PE** — pleuritic pain, hypoxia, RV strain, DVT risk\n• **Takotsubo** — stress trigger, apical ballooning, modest troponin\n• **Sepsis/toxic shock** — distributive shock with myocardial dysfunction\n• **Pericarditis/myopericarditis** — positional pleuritic pain, diffuse ST/PR changes, preserved LV function\n• **Tachycardia-mediated or demand injury** — explain the troponin before labeling myocarditis\n\n**Practical rule:** if the ECG looks territorial or the story is ischemic, treat ACS until reasonably excluded.',
    citation: [1, 2],
    next: 'myocarditis-initial-tests',
    summary: 'Rule out ACS, dissection, PE, Takotsubo, sepsis, pericarditis, and demand injury before anchoring.',
  },

  {
    id: 'myocarditis-initial-tests',
    type: 'question',
    module: 1,
    title: 'Initial ED Tests',
    body: '**Minimum ED workup when myocarditis is on the table:** [1][2][5][6]\n\n• 12-lead ECG + repeat ECG if symptoms evolve\n• High-sensitivity troponin, repeat if early or changing symptoms\n• BNP/NT-proBNP if dyspnea/HF features\n• CBC with differential: eosinophilia matters\n• CMP/Mg/Phos, lactate if ill, TSH when indicated\n• CRP/ESR: supportive inflammation markers\n• Viral testing when clinically useful: SARS-CoV-2, influenza, respiratory panel\n• Pregnancy test when applicable\n• CXR if dyspnea/HF/alternative diagnosis\n• Bedside echo/POCUS early if abnormal vitals, dyspnea, syncope, or elevated troponin\n\n**Important:** ECG, troponin, and echo are useful for triage but normal tests do not fully rule out myocarditis when pretest suspicion is high. [1]',
    citation: [1, 2, 5, 6],
    images: [
      {
        src: 'images/myocarditis/pericarditis-myocarditis-ecg.jpg',
        alt: '12-lead ECG with diffuse ST elevation and PR depression pattern compatible with acute myopericarditis',
        caption: 'ECG pattern compatible with acute myopericarditis: diffuse ST elevation with PR depression. Use as a pattern-recognition aid only; ACS, PE, dissection, Takotsubo, and demand ischemia still need active exclusion. Wikimedia Commons, James Heilman MD, CC BY-SA 4.0.',
      },
    ],
    options: [
      { label: 'Abnormal ECG, elevated troponin, LV dysfunction, or arrhythmia', next: 'myocarditis-risk-stratify', urgency: 'urgent' },
      { label: 'All tests normal and low suspicion', next: 'myocarditis-low-risk' },
      { label: 'Shock or electrical instability develops', next: 'myocarditis-fulminant', urgency: 'critical' },
    ],
    summary: 'ECG + troponin + echo guide triage; normal early tests do not fully exclude high-suspicion myocarditis.',
  },

  {
    id: 'myocarditis-pocus-echo',
    type: 'info',
    module: 1,
    title: 'POCUS / Echo Identification',
    body: '**Echo cannot prove myocarditis, but it detects danger.** [1][2][3]\n\n**Look for:**\n• New LV systolic dysfunction: global or regional\n• RV dysfunction or biventricular failure: higher-risk phenotype\n• Pericardial effusion / tamponade physiology\n• Wall thickening from edema in fulminant myocarditis\n• IVC plethora, pulmonary edema, low forward flow\n• Exclude mimics: tamponade, severe valvular lesion, RV strain from PE\n\n**High-risk echo pattern:** biventricular dysfunction, reduced EF, pericardial effusion with instability, or low-output physiology.\n\n**Interpretation trap:** regional wall-motion abnormality can still be ACS. If ischemic pattern is plausible, ACS evaluation continues.',
    citation: [1, 2, 3],
    next: 'myocarditis-risk-stratify',
    summary: 'Echo detects danger: LV/RV dysfunction, effusion, low-output physiology, and mimics.',
  },

  {
    id: 'myocarditis-risk-stratify',
    type: 'question',
    module: 2,
    title: 'Risk Stratify: Stable vs Stage D',
    body: '**ACC staging maps well to ED disposition.** [1]\n\n**Stage C: symptomatic myocarditis**\n• Chest pain, dyspnea, palpitations, fatigue\n• Troponin/ECG/CMR/echo evidence\n• Hemodynamically stable, no sustained malignant rhythm\n\n**Stage D: advanced / fulminant myocarditis**\n• Hemodynamic instability needing inotropes, vasopressors, or temporary circulatory support\n• Electrical instability needing intervention: VT/VF, high-grade AV block, recurrent syncope\n• Severe acute HF, biventricular dysfunction, rising lactate, end-organ injury\n\n**ED danger markers:** syncope, VT, high-grade AV block, hypotension, lactate elevation, new EF reduction, biventricular dysfunction, ICI therapy, eosinophilia, suspected giant-cell myocarditis.',
    citation: [1],
    options: [
      { label: 'Stage D / fulminant features', next: 'myocarditis-fulminant', urgency: 'critical' },
      { label: 'Stable but abnormal ECG/troponin/echo', next: 'myocarditis-admit', urgency: 'urgent' },
      { label: 'Low-risk symptoms and normal initial tests', next: 'myocarditis-low-risk' },
      { label: 'Need CMR / biopsy decision', next: 'myocarditis-cmr-biopsy' },
    ],
    summary: 'Stage D = hemodynamic or electrical instability; stable abnormal tests still usually require monitored admission.',
    safetyLevel: 'warning',
  },

  {
    id: 'myocarditis-fulminant',
    type: 'info',
    module: 2,
    title: 'Fulminant Myocarditis — First 15 Minutes',
    body: '**Fulminant myocarditis is a time-to-center disease. Stabilize while arranging advanced HF/ECMO-capable care.** [1][3][4]\n\n**First 15 minutes:**\n1. Pads on, defib ready, continuous telemetry\n2. Large-bore IV/IO, arterial line if available, lactate/VBG/ABG\n3. POCUS: LV/RV function, effusion, IVC, lung edema\n4. **Norepinephrine** for hypotension/MAP support; add inotrope if low-output with adequate MAP\n5. Avoid large blind fluid boluses unless clearly hypovolemic\n6. Treat VT/VF/AV block per ACLS, but call cardiology/EP early\n7. Avoid unnecessary intubation delay? No. If needed, pre-resuscitate: pressor running, hemodynamic plan, gentle ventilation\n8. Early calls: cardiology, ICU, advanced HF/ECMO/transplant-capable center\n\n**Do not wait for CMR in a crashing patient.** Endomyocardial biopsy and etiology-directed therapy become inpatient/tertiary-center decisions.',
    citation: [1, 3, 4],
    options: [
      { label: 'Shock / low-output physiology', next: 'myocarditis-shock' },
      { label: 'VT/VF or high-grade AV block', next: 'myocarditis-arrhythmias' },
      { label: 'Need transfer/MCS trigger list', next: 'myocarditis-mcs-transfer' },
    ],
    summary: 'Pads, telemetry, POCUS, norepi for MAP, avoid blind fluids, early advanced HF/ECMO-capable transfer.',
    safetyLevel: 'critical',
  },

  {
    id: 'myocarditis-shock',
    type: 'info',
    module: 2,
    title: 'Shock Strategy',
    body: '**Goal: preserve coronary perfusion and forward flow while avoiding overload.** [3][4]\n\n**Vasoactive approach:**\n• Norepinephrine if hypotensive: supports MAP/RV-LV coronary perfusion\n• Add dobutamine or milrinone only with close BP monitoring when low-output persists\n• Epinephrine may be used peri-arrest, but watch lactate/arrhythmias\n• Avoid pure afterload reduction in shock\n\n**Fluids:**\n• Small test bolus only if IVC/cardiac windows support hypovolemia\n• Most fulminant myocarditis shock is pump failure, not fluid deficit\n\n**Ventilation:**\n• Intubation can precipitate collapse; pre-start pressors and avoid severe acidosis/hypoxia\n• Use lung-protective ventilation; avoid excessive PEEP when preload-sensitive\n\n**Escalation:** persistent hypoperfusion despite pressor/inotrope support = mechanical circulatory support discussion now.',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Norepinephrine',
        dose: 'Start 0.05-0.1 mcg/kg/min; titrate to MAP >=65 or patient-specific perfusion target',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Until shock resolves or advanced support started',
        notes: 'Use local protocol. Add inotrope if low-output persists after MAP supported.',
        confidence: 'critical',
      },
      monitoring: 'Telemetry, frequent BP/MAP, lactate, urine output, echo reassessment, early ICU/advanced HF consultation',
    },
    next: 'myocarditis-mcs-transfer',
    summary: 'Norepi for MAP, cautious inotrope if low-output, no blind large boluses, early MCS if hypoperfusion persists.',
    safetyLevel: 'critical',
  },

  {
    id: 'myocarditis-arrhythmias',
    type: 'info',
    module: 2,
    title: 'Electrical Instability',
    body: '**Electrical instability is Stage D until proven otherwise.** [1][3]\n\n**High-risk rhythms:**\n• Sustained VT/VF\n• Recurrent nonsustained VT with symptoms or LV dysfunction\n• High-grade AV block or complete heart block\n• Syncope with abnormal ECG/troponin/echo\n• Wide-complex tachycardia in suspected myocarditis\n\n**ED actions:**\n• Pads on; defib/cardioversion per ACLS\n• Correct K/Mg; avoid QT-prolonging meds when possible\n• Consider amiodarone for stable VT per local ACLS protocol\n• Temporary pacing for unstable high-grade AV block\n• Cardiology/EP + ICU admission\n\n**Pearl:** myocarditis rhythms can change quickly. A patient who looks like “viral chest pain” but has VT, AV block, or syncope is not low risk.',
    citation: [1, 3],
    next: 'myocarditis-mcs-transfer',
    summary: 'VT/VF, high-grade AV block, or syncope with abnormal myocarditis workup = Stage D risk and monitored admission.',
    safetyLevel: 'critical',
  },

  {
    id: 'myocarditis-mcs-transfer',
    type: 'result',
    module: 2,
    title: 'Transfer / Mechanical Support Triggers',
    body: '**Transfer early to an advanced HF / ECMO-capable center when any are present:** [1][3]\n\n• Persistent hypotension or rising lactate despite pressor/inotrope support\n• Biventricular dysfunction or rapidly falling EF\n• VT/VF storm, recurrent malignant arrhythmias, high-grade AV block\n• Need for temporary circulatory support: IABP, Impella, VA-ECMO, VAD evaluation\n• Suspected giant-cell, eosinophilic, sarcoid, or ICI myocarditis\n• End-organ injury: renal failure, hepatic injury, altered mental status\n• Need for endomyocardial biopsy to guide urgent immunosuppression\n\n**ED wording:** “Suspected fulminant myocarditis with hemodynamic/electrical instability; requesting advanced HF/ECMO-capable transfer and biopsy-capable cardiology evaluation.”',
    recommendation: 'Stage D myocarditis: stabilize locally but arrange early transfer to an advanced HF/ECMO-capable center.',
    confidence: 'definitive',
    citation: [1, 3],
  },

  {
    id: 'myocarditis-cmr-biopsy',
    type: 'question',
    module: 3,
    title: 'CMR vs Endomyocardial Biopsy',
    body: '**CMR is the key noninvasive test; biopsy is selective.** [1][2][7]\n\n**Cardiac MRI helps diagnose and risk-stratify:**\n• Myocardial edema: T2-based abnormalities\n• Non-ischemic injury/fibrosis: T1 mapping, extracellular volume, LGE\n• Myocarditis pattern: often subepicardial or mid-wall; not a coronary territory\n• Pericardial inflammation / myopericarditis\n\n**Endomyocardial biopsy is not routine for every suspected case. It matters when the result changes urgent therapy:**\n• Fulminant HF / shock\n• Ventricular arrhythmias or high-grade AV block\n• Failure to respond to usual care\n• Suspected giant-cell, eosinophilic, sarcoid, ICI, or unusual infectious myocarditis\n• Need to rule out mimics or guide immunosuppression\n\n**ED role:** admit/transfer the right patient; do not delay stabilization for MRI.',
    citation: [1, 2, 7],
    options: [
      { label: 'Stable but abnormal tests — inpatient CMR pathway', next: 'myocarditis-admit' },
      { label: 'Fulminant or arrhythmic — biopsy-capable center', next: 'myocarditis-mcs-transfer', urgency: 'critical' },
      { label: 'Need etiology framework', next: 'myocarditis-etiology' },
    ],
    summary: 'CMR is key noninvasive test; biopsy is selective when it changes urgent therapy.',
  },

  {
    id: 'myocarditis-etiology',
    type: 'question',
    module: 3,
    title: 'Etiology Framework',
    body: '**Most ED cases are treated supportively first, but etiology changes consultation and therapy.** [1][2]\n\n**Ask and look for:**\n• Viral/COVID/influenza-like illness\n• Recent vaccination with compatible timing\n• Immune checkpoint inhibitor therapy\n• Autoimmune disease, sarcoid, lupus, vasculitis\n• Drug reaction, eosinophilia, DRESS\n• Tick/travel/infectious exposure: Lyme, Chagas, HIV, TB, diphtheria depending context\n• Giant-cell clues: rapidly progressive HF, VT, AV block\n• Toxin/cardiotoxin: cocaine/amphetamine, anthracyclines, clozapine\n\n**Do not shotgun labs in every low-risk patient. Target the workup to the phenotype.**',
    citation: [1, 2],
    options: [
      { label: 'Likely viral / idiopathic', next: 'myocarditis-viral' },
      { label: 'Immune checkpoint inhibitor', next: 'myocarditis-ici', urgency: 'critical' },
      { label: 'Eosinophilic / giant-cell / sarcoid concern', next: 'myocarditis-immune-high-risk', urgency: 'urgent' },
      { label: 'Infectious or autoimmune clues', next: 'myocarditis-infectious-autoimmune' },
    ],
    summary: 'Target the etiology workup: viral, ICI, giant-cell/eosinophilic/sarcoid, infectious, autoimmune, toxin.',
  },

  {
    id: 'myocarditis-viral',
    type: 'info',
    module: 3,
    title: 'Likely Viral / Idiopathic Myocarditis',
    body: '**Common ED phenotype:** chest pain after viral syndrome, elevated troponin, nonischemic ECG pattern, stable vitals. [1][2]\n\n**Management:**\n• Admit or observe with telemetry if troponin/ECG abnormal or myocarditis is likely\n• Echo for LV/RV function and effusion\n• Cardiology consult for CMR timing\n• Supportive care; avoid strenuous activity\n• HF guideline-directed therapy if LV dysfunction\n• Avoid routine antibiotics or antivirals unless a treatable infection is suspected\n\n**Vaccine-associated myocarditis:** rare, most often adolescent/young adult males within 7 days after dose 2; most reported cases improve by discharge. Still evaluate for alternative causes and involve cardiology when suspected. [5]',
    citation: [1, 2, 5],
    next: 'myocarditis-treatment-stable',
    summary: 'Likely viral: supportive care, telemetry when abnormal tests, echo/CMR, no routine antivirals unless treatable infection suspected.',
  },

  {
    id: 'myocarditis-ici',
    type: 'info',
    module: 3,
    title: 'Immune Checkpoint Inhibitor Myocarditis',
    body: '**ICI myocarditis is uncommon but high mortality. Treat as high-risk until proven otherwise.** [1][8]\n\n**Clues:**\n• On PD-1/PD-L1/CTLA-4 therapy: pembrolizumab, nivolumab, ipilimumab, atezolizumab, etc.\n• Often early after starting therapy, but can occur later\n• Chest pain, dyspnea, weakness, myositis, myasthenia-like symptoms\n• Troponin elevation, conduction disease, VT, LV dysfunction\n\n**ED actions:**\n• Hold ICI therapy and contact oncology/cardiology urgently\n• Admit to monitored setting; ICU if arrhythmia/HF/shock\n• Check CK, LFTs, troponin trend, ECG, echo\n• High-dose corticosteroids are often started early by oncology/cardiology protocols when suspected\n• Transfer if unstable, malignant rhythm, or biopsy/advanced HF support needed\n\n**Do not discharge a symptomatic ICI patient with elevated troponin as “viral myocarditis.”**',
    citation: [1, 8],
    next: 'myocarditis-admit',
    summary: 'ICI myocarditis is high-risk: hold ICI, cardiology/oncology, telemetry, early steroids by specialist protocol.',
    safetyLevel: 'critical',
  },

  {
    id: 'myocarditis-immune-high-risk',
    type: 'info',
    module: 3,
    title: 'Giant-Cell / Eosinophilic / Sarcoid Concern',
    body: '**These are “do not miss” because urgent biopsy and immunosuppression may change outcome.** [1][2][7]\n\n**Giant-cell myocarditis clues:**\n• New HF over days-weeks\n• VT or high-grade AV block\n• Failure to improve with usual care\n• Autoimmune history\n\n**Eosinophilic myocarditis clues:**\n• Eosinophilia, rash, fever, DRESS/drug exposure\n• Asthma/EGPA phenotype\n• Hypersensitivity or parasitic context\n\n**Sarcoid myocarditis clues:**\n• AV block, VT, unexplained cardiomyopathy\n• Known pulmonary/systemic sarcoid\n\n**ED action:** cardiology early, admit/transfer to biopsy-capable center if unstable or progressive. Do not start casual outpatient management.',
    citation: [1, 2, 7],
    next: 'myocarditis-admit',
    summary: 'Giant-cell/eosinophilic/sarcoid patterns need cardiology and often biopsy-capable admission or transfer.',
    safetyLevel: 'critical',
  },

  {
    id: 'myocarditis-infectious-autoimmune',
    type: 'info',
    module: 3,
    title: 'Infectious / Autoimmune Clues',
    body: '**Target testing to exposure and phenotype.** [1][2][5]\n\n**Consider infectious workup when clinically indicated:**\n• SARS-CoV-2, influenza, respiratory viruses\n• HIV if risk/unknown status\n• Lyme in endemic exposure with AV block/myocarditis pattern\n• Chagas in compatible geography/exposure\n• Blood cultures if febrile/toxic/endocarditis concern\n• TB/fungal/parasitic studies only when history supports it\n\n**Consider autoimmune workup when indicated:**\n• ANA/ENA/complement/ESR/CRP if systemic autoimmune features\n• Sarcoid evaluation when conduction disease/VT/unexplained cardiomyopathy\n• Rheumatology input for lupus/vasculitis/EGPA phenotype\n\n**ED principle:** avoid broad low-yield panels in routine stable viral-like cases; escalate targeted testing for severe, recurrent, atypical, immunocompromised, or treatment-changing presentations.',
    citation: [1, 2, 5],
    next: 'myocarditis-treatment-stable',
    summary: 'Target infectious/autoimmune testing to exposure, severity, immune status, and treatment-changing clues.',
  },

  {
    id: 'myocarditis-treatment-stable',
    type: 'info',
    module: 4,
    title: 'Stable Myocarditis — Treatment',
    body: '**No magic ED antidote for routine viral myocarditis. Treat the syndrome and prevent deterioration.** [1][2]\n\n**Core management:**\n• Telemetry/observation or admission when abnormal ECG, elevated troponin, syncope, arrhythmia, or LV dysfunction\n• Treat HF with guideline-directed therapy when LV dysfunction exists\n• Avoid strenuous activity; give explicit exercise restriction\n• Avoid alcohol, cocaine/amphetamines, and cardiotoxins\n• Avoid routine antibiotics/antivirals unless a specific treatable infection is suspected\n• Cardiology follow-up and CMR planning when appropriate\n\n**Pain phenotype:** if pericarditic pain predominates and no HF/LV dysfunction, NSAID/colchicine can be used. Avoid NSAIDs if symptomatic HF or LV dysfunction. [1]',
    citation: [1, 2],
    options: [
      { label: 'LV dysfunction / HF symptoms', next: 'myocarditis-hf-care' },
      { label: 'Pericarditic pain phenotype', next: 'myocarditis-pain-control' },
      { label: 'Disposition decision', next: 'myocarditis-disposition' },
    ],
    summary: 'Stable myocarditis: monitor, treat HF if present, restrict exercise, avoid cardiotoxins, cardiology/CMR follow-up.',
  },

  {
    id: 'myocarditis-hf-care',
    type: 'info',
    module: 4,
    title: 'HF / LV Dysfunction Care',
    body: '**Treat myocarditis-associated HF like acute HF, with extra respect for rapid deterioration.** [1][2][3]\n\n**If congested but perfusing:**\n• Diuretics for pulmonary edema/volume overload\n• Oxygen/NIV if needed, but watch hemodynamics\n• Start/continue guideline-directed HF therapy with cardiology input when stable\n\n**If hypoperfused/shock:**\n• This is no longer routine HF: use fulminant pathway\n• Pressor/inotrope support and early advanced HF/ICU involvement\n\n**Avoid:**\n• Exercise clearance from the ED\n• NSAIDs in symptomatic HF or LV dysfunction\n• Discharging new LV dysfunction without a monitored plan\n\n**Follow-up:** repeat echo 2-4 weeks for Stage C/D, then further imaging/rhythm testing before exercise return. [1]',
    citation: [1, 2, 3],
    next: 'myocarditis-disposition',
    summary: 'LV dysfunction: diuretics/GDMT when stable; shock uses fulminant pathway; no discharge without monitored plan.',
    safetyLevel: 'warning',
  },

  {
    id: 'myocarditis-pain-control',
    type: 'info',
    module: 4,
    title: 'Pain Control: Myopericarditis vs Myocarditis',
    body: '**Pericarditic chest pain and myocarditis overlap. The treatment changes when HF/LV dysfunction is present.** [1][2]\n\n**Reasonable when pericarditic pain predominates AND no symptomatic HF/LV dysfunction:**\n• NSAID such as ibuprofen per pericarditis protocol\n• Colchicine if myopericarditis/pericarditis phenotype\n• PPI if GI-risk NSAID use\n\n**Avoid or discuss with cardiology when:**\n• New LV dysfunction\n• Symptomatic HF, pulmonary edema, shock\n• Renal failure, anticoagulation, GI bleeding risk\n\n**Analgesia alternative:** acetaminophen; opioid-sparing approach when possible.\n\n**Pearl:** Troponin elevation alone does not mean NSAIDs are forbidden, but symptomatic HF/LV dysfunction changes the risk-benefit.',
    citation: [1, 2],
    next: 'myocarditis-disposition',
    summary: 'NSAID/colchicine only for pericarditic phenotype without HF/LV dysfunction; avoid NSAIDs in symptomatic HF.',
  },

  {
    id: 'myocarditis-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: '**Most confirmed/suspected myocarditis with abnormal objective findings needs monitored care.** [1][2]\n\n**Admit/observe with telemetry if any:**\n• Elevated troponin with suspected myocarditis\n• Abnormal ECG beyond nonspecific changes\n• Arrhythmia, palpitations with concerning ECG, syncope\n• New LV/RV dysfunction or HF symptoms\n• Pericardial effusion with concern\n• ICI therapy, eosinophilia, autoimmune/systemic disease\n• Pediatric/adolescent myocarditis concern: lower threshold\n\n**Transfer/ICU if:** shock, VT/VF, high-grade AV block, rising lactate, severe EF reduction, biventricular failure, or suspected biopsy-changing etiology.\n\n**Discharge is only for low suspicion/normal objective testing with reliable return precautions and follow-up.**',
    citation: [1, 2],
    options: [
      { label: 'Telemetry admission / observation', next: 'myocarditis-admit' },
      { label: 'ICU / transfer needed', next: 'myocarditis-mcs-transfer', urgency: 'critical' },
      { label: 'Low suspicion and normal objective testing', next: 'myocarditis-low-risk' },
      { label: 'Return-to-exercise counseling', next: 'myocarditis-return-exercise' },
    ],
    summary: 'Abnormal troponin/ECG/echo, arrhythmia, syncope, HF, or high-risk etiology usually means monitored care.',
  },

  {
    id: 'myocarditis-admit',
    type: 'result',
    module: 5,
    title: 'Admit / Observe with Telemetry',
    body: '**Recommended for suspected myocarditis with objective abnormality or high-risk history.** [1][2]\n\n**Inpatient plan:**\n• Telemetry\n• Troponin/ECG trends as clinically indicated\n• Formal echocardiogram if not done\n• Cardiology consultation\n• CMR planning when stable/available\n• HF therapy if LV dysfunction\n• Etiology-directed testing for atypical/severe/high-risk cases\n• Clear exercise restriction on discharge\n\n**Document:** suspected myocarditis phenotype, instability markers absent/present, mimics considered, cardiology plan, and activity restriction.',
    recommendation: 'Admit or observe on telemetry. Obtain formal echo/cardiology input, trend objective abnormalities, and plan CMR/follow-up.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'myocarditis-low-risk',
    type: 'result',
    module: 5,
    title: 'Low Suspicion / Normal Objective Testing',
    body: '**Low suspicion is not “myocarditis ruled out forever.” It means no current objective evidence and no danger phenotype.** [1][5]\n\n**Possible discharge only if all are true:**\n• Normal vitals and well appearing\n• No syncope, sustained palpitations, HF symptoms, or exertional chest pain\n• ECG reassuring\n• Troponin normal with appropriate timing/repeat strategy\n• No concerning echo/POCUS findings if performed\n• No ICI therapy or high-risk immune/drug trigger\n• Reliable follow-up and return precautions\n\n**Return now for:** chest pain worse or exertional, dyspnea, syncope, palpitations, fever/toxic appearance, new edema, exercise intolerance.\n\n**Avoid strenuous exercise until symptoms resolve and clinician follow-up confirms no ongoing concern.**',
    recommendation: 'Discharge only if objective tests are reassuring, no danger features, and follow-up/return precautions are strong.',
    confidence: 'consider',
    citation: [1, 5],
  },

  {
    id: 'myocarditis-return-exercise',
    type: 'info',
    module: 5,
    title: 'Return to Exercise / Sports',
    body: '**Do not let active myocarditis exercise.** [1][9]\n\n**ACC pathway:** symptomatic Stage C/D myocarditis should avoid strenuous physical activity for **3-6 months**. Before return, reassess with cardiology and objective testing.\n\n**Typical clearance elements:**\n• Symptom resolution\n• Normalizing troponin/inflammatory markers\n• LV function recovered on echo/CMR\n• No active inflammation/high-risk LGE pattern on CMR when obtained\n• 24-hour rhythm monitoring without concerning arrhythmia\n• Exercise stress testing when appropriate\n\n**ED discharge phrase:** “No strenuous exercise, sports, heavy lifting, or intense cardio until cardiology clears you.”',
    citation: [1, 9],
    next: 'myocarditis-stop',
    summary: 'No strenuous activity for 3-6 months in symptomatic myocarditis; return only after cardiology clearance/testing.',
    safetyLevel: 'warning',
  },

  {
    id: 'myocarditis-stop',
    type: 'info',
    module: 5,
    title: 'Stop / Pitfalls',
    body: '**Do NOT:**\n\n• Do not discharge suspected myocarditis with VT, high-grade AV block, syncope, new LV dysfunction, shock, or ICI therapy.\n• Do not wait for CMR before stabilizing/transfer in fulminant myocarditis.\n• Do not give large blind fluid boluses to pump-failure shock.\n• Do not treat new myocarditis as “just anxiety/viral pain” if troponin, ECG, echo, syncope, or rhythm is abnormal.\n• Do not use NSAIDs casually in symptomatic HF or LV dysfunction.\n• Do not clear return to sports/exercise from the ED.\n• Do not forget ACS, PE, dissection, and Takotsubo mimics.\n\n**Safe default:** abnormal objective test + plausible myocarditis = telemetry/cardiology plan.',
    citation: [1, 2, 3],
    summary: 'Pitfalls: unsafe discharge, delayed transfer, blind fluids, NSAIDs in HF, missed ACS/PE/dissection, premature exercise clearance.',
    safetyLevel: 'critical',
  },
];

export const MYOCARDITIS_MODULE_LABELS = [
  'Recognition',
  'Risk / Fulminant',
  'Diagnostics / Etiology',
  'Treatment',
  'Disposition',
];

export const MYOCARDITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Drazner MH, Bozkurt B, Cooper LT, et al. 2024 ACC Expert Consensus Decision Pathway on Strategies and Criteria for the Diagnosis and Management of Myocarditis. J Am Coll Cardiol. 2024. DOI: 10.1016/j.jacc.2024.10.080.' },
  { num: 2, text: 'Schulz-Menger J, Imazio M, Collini V, et al. 2025 ESC Guidelines for the Management of Myocarditis and Pericarditis. Eur Heart J. 2025;46(40):3952-4044. DOI: 10.1093/eurheartj/ehaf192.' },
  { num: 3, text: 'Kociol RD, Cooper LT, Fang JC, et al. Recognition and Initial Management of Fulminant Myocarditis: A Scientific Statement From the American Heart Association. Circulation. 2020;141(6):e69-e92. PMID: 31902242.' },
  { num: 4, text: 'Farkas J. Acute myocarditis and evaluation of newly discovered HFrEF. EMCrit/IBCC. Updated 2024.' },
  { num: 5, text: 'CDC. Clinical Considerations: Myocarditis and Pericarditis after Receipt of COVID-19 Vaccines Among Adolescents and Young Adults. Last reviewed Oct 10, 2023.' },
  { num: 6, text: 'Ravi V, et al. Acute Myocarditis. StatPearls. Updated 2025. NCBI Bookshelf.' },
  { num: 7, text: 'Ferreira VM, Schulz-Menger J, Holmvang G, et al. Cardiovascular Magnetic Resonance in Nonischemic Myocardial Inflammation: Expert Recommendations. J Am Coll Cardiol. 2018;72(24):3158-3176.' },
  { num: 8, text: 'Zamami Y, Niimura T, Okada N, et al. Factors Associated With Immune Checkpoint Inhibitor-Related Myocarditis. JAMA Oncol. 2019;5(11):1635-1637.' },
  { num: 9, text: 'Pelliccia A, Solberg EE, Papadakis M, et al. Recommendations for Participation in Competitive and Leisure Time Sport in Athletes With Cardiomyopathies, Myocarditis, and Pericarditis. Eur J Prev Cardiol. 2019;26(8):819-829.' },
];
