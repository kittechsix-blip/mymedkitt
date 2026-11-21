// myMedKitt - Transplant Patient in the ED (draft info page for the lung page tpe-lung). Scores are mean \u00B1 SD as printed in the source. Citation numbers are global and identical to tpe-lung.nodes.ts.
import type { InfoPage } from '../../data/info-pages.js';

export const INFO_PAGE: InfoPage = {
  id: "tpe-lung-other-consults",
  title: "Related consults: what they cover",
  subtitle: "Sepsis, Pneumonia, ECMO and pulmonary embolism consults, with the ALAD consensus statements that apply",
  sections: [
    { heading: "Related consults", body: "\u2022 [Sepsis](#/tree/sepsis): the general sepsis consult; its special-populations node has an \"Immunosuppressed\" line (broader empiric coverage; consider fungal, PJP, atypical organisms) and it adds MRSA cover through a risk-factor list.\n\u2022 [Pneumonia](#/tree/pneumonia): community-acquired, hospital-acquired or ventilator-associated, and complicated pneumonia; it adds Pseudomonas and MRSA cover through risk-factor lists. Neither Sepsis nor Pneumonia has a transplant branch.\n\u2022 [ECMO](#/tree/ecmo): candidacy, VV or VA selection and cannulation; its absolute contraindications include \"Irreversible underlying disease \u2014 no recovery possible, not a transplant candidate\" and its relative VV contraindications include \"Severe immunosuppression (varies by etiology)\"; it has no branch for existing recipients.\n\u2022 [Shortness of Breath hub](#/tree/dyspnea-hub) and [PE Treatment](#/tree/pe-treatment): general dyspnea, pulmonary embolism rule-in and rule-out, and therapy pathways." },
    { heading: "ALAD consensus statements that apply", body: "\u2022 Empiric antibiotic choice is guided by local microbiology surveillance and the patient's infection history, with particular consideration for resistant organisms such as Staphylococcus aureus and Pseudomonas aeruginosa; empiric therapy can be challenging or even contraindicated because of fungal colonization and infection and multidrug-resistant organisms. [1]\n\u2022 ECMO should be considered in severe ALAD (3.96 \u00b1 1.33, reached consensus): \"ECMO support may be considered in carefully selected individuals with severe ALAD, given rates of recoverability that approach 80%\". [1]\n\u2022 Pulmonary embolism is an important cause of acute deterioration in lung allograft function and should be considered in the evaluation; the consensus did not vote on it and gives no work-up. [1]" },
  ],
  citations: [
    { num: 1, text: "Juvet S, et al. ISHLT Consensus Statement on Acute Lung Allograft Dysfunction (ALAD): definition, etiology, diagnostic and therapeutic approaches, and research priorities. J Heart Lung Transplant 2026. doi:10.1016/j.healun.2026.02.1677. In press: the copy reviewed is the \"Article in press\" proof, which prints no volume or page numbers. Delphi consensus; items are cited by Box item number (Boxes 1-4) with printed mean \u00b1 SD." },
  ],
};
