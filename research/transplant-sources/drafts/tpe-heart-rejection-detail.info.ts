// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-rejection-detail.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_REJECTION_DETAIL: InfoPage = {
  "id": "tpe-heart-rejection-detail",
  "title": "Rejection in a heart recipient: statements by type",
  "subtitle": "Recognition, symptomatic cellular, antibody-mediated, mixed and late rejection, ECG and biomarkers, and the stated gap",
  "sections": [
    {
      "heading": "Recognising rejection",
      "body": "\u2022 Not in the guideline: an emergency-department section for the late recipient. The statements on this page are the nearest it comes, and each is labelled with the section it comes from. [1]\n\u2022 Rejection often occurs in patients without symptoms. [1]\n\u2022 The intensity of immunosuppression and the need for hospitalization are guided by both the biopsy grade and by symptoms of congestion (shortness of breath, abdominal bloating, orthopnea) or low cardiac output (fatigue, low blood pressure, decreased urine output). [1]\n\u2022 LV or RV systolic dysfunction on echocardiography, even without symptoms, is typically treated as symptomatic rejection. [1]\n\u2022 After the first year, antibody-mediated rejection (AMR) is more commonly identified than acute cellular rejection and should be considered in a recipient with signs or symptoms of graft dysfunction (Class IIa, C). [1]\n\u2022 In any late rejection, check adherence, co-medications or supplements that interfere with immunosuppression, and triggers such as infections and GI disorders (Class IIa, B). [1]\n\u2022 In rejection surveillance, routine clinical use of ECG parameters for rejection monitoring is not recommended (Class III, C), and it is reasonable to integrate BNP and high-sensitivity troponin into a rejection monitoring strategy to identify higher-risk patients who may benefit from further evaluation for ACR, AMR or CAV (Class IIb, C). These are surveillance statements, not ED thresholds, and the guideline gives none. [1]"
    },
    {
      "heading": "Symptomatic acute cellular rejection",
      "body": "\u2022 Endomyocardial biopsy (EMB) should be done as early as possible if symptomatic rejection is suspected (Class I, C). [1]\n\u2022 A recipient with symptomatic acute cellular rejection should be hospitalized. With hemodynamic compromise (hypotension, low cardiac output, marked rise in wedge pressure), treat in an ICU or intermediate-care unit able to monitor continuously and give inotropes (Class I, C). [1]\n\u2022 High-dose IV corticosteroid is first-line for symptomatic acute cellular rejection irrespective of biopsy grade (Class I, C) (call the transplant team first). Anti-thymocyte antibodies are added if there is hemodynamic compromise, especially if there is no improvement within 12 to 24 hours (Class I, C). Not in the guideline: a dose for either. [1]\n\u2022 The same two drugs are named for antibody-mediated rejection (high-dose IV corticosteroid and cytolytic therapy (call the transplant team first), Class IIa, C) and for mixed rejection with hemodynamic compromise (\"aggressive therapy with high-dose IV CS, and cytolytic therapy is appropriate\" (call the transplant team first), ungraded). [1]\n\u2022 When high-dose steroid or cytolytic therapy is used for rejection, antimicrobial prophylaxis against opportunistic infection should be given (Class I, C). [1]\n\u2022 In low-grade acute cellular rejection with hemodynamic compromise, AMR and/or CAV should also be considered (Class I, C). [1]\n\u2022 Rejection section (Class I, C): IV inotropes and vasopressors should be used as necessary to maintain cardiac output and blood pressure until graft function recovers. [1]"
    },
    {
      "heading": "Late graft dysfunction of unknown cause",
      "body": "\u2022 After the first year with signs or symptoms of graft dysfunction, biopsy with ISHLT immunopathologic evaluation and measurement of circulating HLA donor-specific antibodies \"should be obtained before initiating treatment\" (Class IIa, C); the narrative says AMR evaluation comes \"before steroid treatment\". [1]\n\u2022 When AMR is suspected, serum samples should be drawn before therapy starts, to avoid assay interference from therapeutic agents (Class IIa, C). [1]\n\u2022 Not in the guideline: a rule for the unstable patient before a biopsy is possible, or who gives a first dose in an emergency. Nearest sourced fact: IV inotropes and vasopressors should be used as necessary to maintain cardiac output and blood pressure until graft function recovers (rejection section, Class I, C). [1]"
    },
    {
      "heading": "Related consults",
      "body": "Related consults: [Cardiogenic shock](#/tree/cardiogenic-shock) shock support; [Sepsis](#/tree/sepsis) fever infection; [Chest pain](#/tree/chest-pain-hub) chest pain."
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    }
  ]
};
