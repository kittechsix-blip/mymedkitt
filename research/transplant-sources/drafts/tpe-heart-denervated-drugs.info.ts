// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-denervated-drugs.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_DENERVATED_DRUGS: InfoPage = {
  "id": "tpe-heart-denervated-drugs",
  "title": "The denervated heart: each drug in the guideline",
  "subtitle": "Atropine, isoproterenol, adenosine, rate control and antiarrhythmics, vasoactive drugs, with the section each statement comes from",
  "sections": [
    {
      "heading": "Rate and the autonomic drugs",
      "body": "\u2022 Table 14 (special anaesthetic considerations for intercurrent surgery) says the transplanted heart is completely denervated, so drugs that work on the autonomic nervous system have minimal effect on it. [1]\n\u2022 In the anaesthesia recommendation of the intercurrent-surgery section (2010 text continued, Class I, C): the resting heart rate is usually higher, about 90/min in most and up to 130/min in some, which \"do not require treatment\". [1]\n\u2022 In the anaesthesia recommendation of the intercurrent-surgery section (2010 text continued, Class I, C): a relative, symptomatic bradycardia that requires treatment \"will not respond to atropine\". [1]\n\u2022 Table 14 (special anaesthetic considerations for intercurrent surgery): atropine and glycopyrrolate, and the reversal agents neostigmine and edrophonium, have no effect on the heart rate of the cardiac allograft, and neuromuscular reversal was safe in a large study with no instances of severe bradycardia or cardiac arrest. [1]\n\u2022 Same recommendation: \"Isoproterenol infusion and pacing are the usual modes of management of HT bradyarrhythmias\". Not in the guideline: an isoproterenol dose for bradycardia (it prints 1 to 10 mcg/min only as post-operative inotropic support). [1]\n\u2022 In the perioperative setting (early postoperative care table, Class I, B), isoproterenol, theophylline, terbutaline and albuterol can be used to increase heart rate; after transplant, temporary pacing is started for relative bradycardia to keep the rate above 90/min (Class I, B). [1]"
    },
    {
      "heading": "Adenosine",
      "body": "\u2022 Early postoperative care table (2023, new, Class IIb, C): [Adenosine](#/drug/adenosine/heart transplant) \"may be considered\" in heart transplant recipients with supraventricular tachyarrhythmias if they are closely monitored and low doses are administered (25 mcg/kg: 1.5 mg if \u226560 kg). The perioperative arrhythmia narrative gives the same figure for adenosine after transplant and adds that therapy is \"gradually increased\". [1]\n\u2022 Anaesthesia recommendation of the intercurrent-surgery section (2010 text continued, Class I, C): the denervated heart is highly sensitive to adenosine, and \"standard doses\" for atrial tachyarrhythmias \"may result in prolonged asystole\". [1]\n\u2022 Detail: the arrhythmia section narrative (ungraded) says adenosine \"may be considered\" but \"should only be administered with caution at low doses (e.g., 3 mg in adults) due to increased risk of severe bradycardia or asystole\"; 3 mg is given as an example of a low dose. [1]\n\u2022 Study behind the graded figure (cited by the guideline): 80 heart transplant recipients aged 6 months to 25 years, routine catheterization, adenosine given by central line, not in tachycardia; patients under 2 weeks after transplant were excluded. Doses were given in turn until AV block or clinically significant asystole: 0.8, 1.5, 3, 6 and 12 mg for those 60 kg or more (32 of the 80), weight-based steps for the rest. 25 mcg/kg or 1.5 mg was the first step of the escalation (AV block in 12% cumulative at that step); none of the 80 needed rescue ventricular pacing. [2]\n\u2022 The study authors state that adenosine was tested in healthy transplant patients in normal hemodynamic settings and that results in acutely ill, tachycardic patients have yet to be demonstrated, and that larger doses may be required when injected through smaller, more distant peripheral veins. [2]"
    },
    {
      "heading": "Rate control and antiarrhythmic drugs",
      "body": "\u2022 Non-dihydropyridine calcium channel blockers and beta-blockers may be used for rate control (early postoperative care table, Class IIa, B), and for rate control of atrial fibrillation with preserved ejection fraction (arrhythmia section, Class IIa, B). Table 5 lists diltiazem and verapamil as raising calcineurin inhibitor and mTOR inhibitor levels; those recommendations do not mention it. [1]\n\u2022 Arrhythmia section (2023, Class IIa, C): sotalol and amiodarone can be used for rhythm control, with close monitoring of immunosuppressive agents. Not in the guideline: an amiodarone dose. [1]\n\u2022 Anaesthesia recommendation of the intercurrent-surgery section (Class I, C): amiodarone \"is recommended as the drug of choice for atrial tachyarrhythmias in HT recipients\". [1]\n\u2022 Source conflict, not resolved here: sotalol and amiodarone \"have minimal interaction with immunosuppressive agents\" (early postoperative care table, 2010 wording continued, Class IIa, C, e19-e20), while \"Amiodarone and calcium antagonists can increase calcineurin inhibitor (CNI) levels. Therefore, CNI dose adjustment and level monitoring are required\" (perioperative arrhythmia narrative, e15) and Table 5 lists amiodarone as raising levels (e44). [1]"
    },
    {
      "heading": "Drugs for low blood pressure and low output",
      "body": "\u2022 Table 14 (anaesthetic considerations for intercurrent surgery): direct-acting agents (norepinephrine, epinephrine, isoproterenol, dopamine) are effective, although beta-adrenergic inotropic effects are attenuated early after transplant. Indirect-acting ephedrine is not very effective, and ketamine may not give hemodynamic stability in a recipient in extremis. [1]\n\u2022 Table 14: phosphodiesterase inhibitors increase inotropy in the transplanted heart. Phenylephrine's alpha-adrenergic response is effective, but reflex bradycardia is absent. [1]"
    },
    {
      "heading": "Related consults",
      "body": "Related consults: [Bradycardia](#/tree/bradycardic-arrest) pacing steps; [SVT](#/tree/svt) adenosine steps; [AF with RVR](#/tree/afib-rvr) rate control."
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    },
    {
      "num": 2,
      "text": "Flyer JN, et al. Prospective study of adenosine on atrioventricular nodal conduction in pediatric and young adult patients after heart transplant. Circulation. 2017;135(25):2485-2493. PMID 28450351"
    }
  ]
};
