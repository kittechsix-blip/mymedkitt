// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-chronic-detail.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_CHRONIC_DETAIL: InfoPage = {
  "id": "tpe-heart-chronic-detail",
  "title": "Chronic problems in a heart recipient: detail",
  "subtitle": "Allograft vasculopathy, statins, kidney, skin cancer and PTLD",
  "sections": [
    {
      "heading": "Allograft vasculopathy (CAV)",
      "body": "\u2022 CAV remains highly prevalent and a leading cause of death after heart transplantation, and is a frequent cause of late graft dysfunction. [1]\n\u2022 CAV is assessed by coronary angiography graded by the 2010 ISHLT nomenclature (printed \"Class 1\", B); annual or biannual angiography should be considered (Class I, C). [1]\n\u2022 Sudden death risk within 2 years of a CAV diagnosis is \"as high as 8%\", particularly with cardiac dysfunction and prior rejection. [1]\n\u2022 Statins reduce CAV and improve long-term outcomes (Class I, A). Statin doses should generally be lower than for hyperlipidemia because of the CNI interaction (Class I, A), and creatine kinase and liver enzymes should be monitored (Class IIa, C). [1]"
    },
    {
      "heading": "Kidney and malignancy",
      "body": "\u2022 CNI is a major, but not the sole, cause of post-transplant chronic kidney disease. Acute CNI toxicities include vasoconstriction, toxic tubulopathy and, in some cases, thrombotic microangiopathy. [1]\n\u2022 Skin cancer is the most common post-transplant malignancy. Initial evaluation and plan for post-transplant lymphoproliferative disorder (PTLD) should be done at the transplant center by physicians familiar with transplant-associated malignancies (Class I, C). [1]"
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    }
  ]
};
