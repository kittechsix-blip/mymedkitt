// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-other-consults.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_OTHER_CONSULTS: InfoPage = {
  "id": "tpe-heart-other-consults",
  "title": "Related consults for a heart transplant recipient",
  "subtitle": "What each linked consult covers, with the heart guideline fact beside it",
  "sections": [
    {
      "heading": "Bradycardia: pacing and drugs for slow rhythms",
      "body": "Related consults: [Bradycardia](#/tree/bradycardic-arrest) is pacing-first and covers atropine and infusions. App content: its atropine step lists transplanted hearts as denervated; its epinephrine infusion step gives isoproterenol 2-10 mcg/min for denervated hearts. Heart guideline: a relative, symptomatic bradycardia that requires treatment \"will not respond to atropine\"; \"Isoproterenol infusion and pacing are the usual modes of management\" (anaesthesia section, 2010 text continued, Class I, C); no isoproterenol dose is printed for bradycardia. [1]"
    },
    {
      "heading": "SVT: vagal manoeuvres, adenosine, rate control",
      "body": "Related consults: [SVT](#/tree/svt). App content: its critical action gives adenosine 6 mg then 12 mg; its adenosine step says 3 mg for a transplanted heart. Heart guideline: adenosine \"may be considered\" in heart transplant recipients with supraventricular tachyarrhythmias if closely monitored at low doses (25 mcg/kg: 1.5 mg if \u226560 kg; early postoperative care table, Class IIb, C). The arrhythmia narrative gives \"e.g., 3 mg in adults\" as an example of a low dose (ungraded). [1]"
    },
    {
      "heading": "AF with RVR: rate and rhythm control",
      "body": "Related consults: [AF with RVR](#/tree/afib-rvr). App content: the consult lists diltiazem with no note on immunosuppressant levels. Heart guideline: non-dihydropyridine calcium channel blockers and beta-blockers may be used for rate control (early postoperative care table, Class IIa, B; atrial fibrillation with preserved ejection fraction, arrhythmia section, Class IIa, B); Table 5 lists diltiazem and verapamil as raising calcineurin and mTOR inhibitor levels, with monitoring of levels and dose adjustment. [1]"
    },
    {
      "heading": "Ventricular tachycardia and wide-complex tachycardia",
      "body": "Related consults: [Ventricular tachycardia](#/tree/ventricular-tachycardia) and [wide-complex tachycardia](#/tree/wide-complex-tachycardia). App content: neither consult mentions transplant. Heart guideline: sustained ventricular tachycardia should be evaluated with both an angiogram and an endomyocardial biopsy (early postoperative care table, Class I, B). [1]"
    },
    {
      "heading": "Shock and heart failure",
      "body": "Related consults: [Cardiogenic shock](#/tree/cardiogenic-shock), [Right heart failure](#/tree/right-heart-failure), [Acute heart failure](#/tree/chf-exacerbation). App content: the cardiogenic shock consult says \"If must intubate: ketamine + push-dose epi ready\"; these consults mention transplant only as bridge, candidacy or evaluation. Heart guideline: Table 14 (anaesthesia) says \"ketamine may not display hemodynamic stability in heart transplant patients in extremis\"; for new-onset heart failure, evaluate for acute cellular and antibody-mediated rejection and consider CAV; it is unclear how well general heart failure guidelines apply after transplant. [1]"
    },
    {
      "heading": "Infection, chest pain and syncope",
      "body": "Related consults: [Sepsis](#/tree/sepsis), [Pneumonia](#/tree/pneumonia), [Chest pain](#/tree/chest-pain-hub), [Syncope](#/tree/syncope). App content: none of these consults mentions transplant; the Sepsis consult says \"Consider ketamine for induction (hemodynamically stable)\". Heart guideline: the events to tell the transplant centre about include any new antibiotic, antifungal or antiviral, fever, pneumonia or respiratory infection, chest pain other than musculoskeletal, and syncope (Class I, C). [1]"
    },
    {
      "heading": "Adrenal crisis",
      "body": "Related consults: [Adrenal insufficiency](#/tree/adrenal-insufficiency). Heart guideline: etomidate in patients at risk for adrenal suppression and crisis should be carefully considered, and any steroid stress dose individualized to the patient's steroid history (intercurrent-surgery section, Class I, C); Table 14 says a single induction dose lowers cortisol for at least 24 hours but \"this has not been shown to be clinically relevant\". [1]"
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    }
  ]
};
