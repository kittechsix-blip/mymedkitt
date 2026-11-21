// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-call-list.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_CALL_LIST: InfoPage = {
  "id": "tpe-heart-call-list",
  "title": "Telling the transplant centre: the guideline list as printed",
  "subtitle": "The call-the-centre list, the fever wording difference and admission",
  "sections": [
    {
      "heading": "The list",
      "body": "\u2022 The guideline lists these events for local clinicians to tell the transplant centre about (Class I, C, e91), quoted as printed: \"(1) hospitalization for any reason; (2) change in medication, including the addition of any antibiotic, anti-fungal, or anti-viral therapy for confirmed or presumed infection; (3) hypotension or an unexplained drop in systolic blood pressure \u2265 20 mm Hg from baseline; (4) increase in resting heart rate > 10 beats/min over baseline; (5) fever \u2265 101\u02daF (38\u02daC) or any unexplained fever \u2265 101\u02da-F (38\u02daC) for \u2265 48 hours; (6) \u2265 2-pound weight gain in 1 week (i.e., 900 g or more); (7) unexplained weight loss of > 5 pounds (i.e., 2.3 kg); (8) elective surgery; (9) increased shortness of breath; (10) pneumonia or any respiratory infection; (11) syncope; (12) chest pain other than musculoskeletal symptoms; (13) decline > 10% in forced expiratory volume in 1 second; (14) abdominal pain; (15) nausea, vomiting or diarrhea; (16) cerebral vascular event, seizure, or mental status changes; (17) suspicion/diagnosis of pregnancy; (18) epidemiologic exposure to a contagious infectious agent.\" [1]\n\u2022 Source conflict, not resolved here (e91): the 2023 column prints the fever item as \"\u2265 101\u02daF (38\u02daC) or any unexplained fever \u2265 101\u02da-F (38\u02daC) for \u2265 48 hours\"; the 2010 column printed \"any unexplained fever \u2265 100.5\u00b0F for \u2265 48 hours\". Both print 38\u00b0C. [1]\n\u2022 The patient and primary care physician should know how to reach the transplant center in an emergency. [1]"
    },
    {
      "heading": "Admission",
      "body": "\u2022 A recipient with symptomatic acute cellular rejection should be hospitalized; with hemodynamic compromise, use an ICU or intermediate-care unit able to monitor continuously and give inotropes (Class I, C). [1]"
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    }
  ]
};
