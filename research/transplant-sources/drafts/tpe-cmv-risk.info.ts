// DRAFT info page for the CMV page of the transplant consult. Assembler registers it in INFO_PAGES.
import type { InfoPage } from '../../data/info-pages.js';

const PAGE: InfoPage = {
  id: "tpe-cmv-risk",
  title: "CMV: timing, presentation and related consults",
  subtitle: "Risk, when it happens, how it shows up (adult SOT recipients)",
  sections: [
    { heading: "Risk and prevention", body: "\u2022 Risk by donor (D) and recipient (R) CMV antibody status: **high = D+/R\u2212**; intermediate = D+/R+ or D\u2212/R+; low = D\u2212/R\u2212. [1]\n\u2022 Prophylaxis is given for a finite period, typically 3 to 12 months; or a center uses weekly blood monitoring with preemptive treatment. [1]" },
    { heading: "When it happens", body: "\u2022 Late-onset CMV (after prophylaxis ends) is associated with D+/R\u2212 status, shorter prophylaxis courses, higher immunosuppression, and allograft rejection. [1]\n\u2022 Observational studies show more CMV infection and tissue-invasive disease after treatment of acute rejection with lymphocyte-depleting antibodies, second-signal inhibitors such as belatacept, and desensitization protocols. [1]\n\u2022 Liver recipients: CMV infection typically occurs within 1 to 2 months of stopping prophylaxis, and within the first 3 months after transplant or rejection treatment. [2]\n\u2022 Breakthrough CMV on prophylaxis is uncommon with valganciclovir or letermovir; breakthrough is more likely when the valganciclovir dose was set below the manufacturer's recommendation for kidney function. [1]" },
    { heading: "How it shows up", body: "\u2022 Liver guideline: CMV can present at any time as asymptomatic viremia, CMV syndrome (fatigue, myalgias, fevers, neutropenia, and viremia), or end-organ disease, most commonly in the gastrointestinal tract including the liver. [2]\n\u2022 **Blood CMV DNA can be low or undetectable in gastrointestinal disease** (sensitivity can decrease in R+ patients) and, rarely, in lung recipients with CMV pneumonia. [1] Liver guideline: in end-organ disease viremia may be below the limit of detection and, if detectable, may not correlate well with disease severity. [2]\n\u2022 CMV retinitis is diagnosed by eye examination; blood DNA is rarely useful for predicting it. CMV disease of the central nervous system is extremely rare. [1]\n\u2022 Antibody (serology) testing has no role in diagnosing active CMV after transplant. [1]" },
    { heading: "Related consults and why", body: "\u2022 [Sepsis](#/tree/sepsis): for a recipient with fever, shock or organ dysfunction whose cause is not yet known.\n\u2022 [Pneumonia](#/tree/pneumonia): CMV pneumonia is a recognised lung presentation (lung recipients especially).\n\u2022 [Diarrhea](#/tree/diarrhea): the gastrointestinal tract is the most common site of CMV end-organ disease (liver guideline).\n\u2022 [Hepatitis](#/tree/hepatitis) and [Acute jaundice](#/tree/acute-jaundice-hub): CMV end-organ disease can involve the liver (liver guideline).\n\u2022 [Meningitis](#/tree/meningitis): for fever with headache or altered mentation; CMV in the CSF is rare but, if present, likely represents disease needing treatment." },
  ],
  citations: [
    { num: 1, text: "Kotton CN, Kumar D, Manuel O, Chou S, Hayden RT, Danziger-Isakov L, Asberg A, Tedesco-Silva H, Humar A; The Transplantation Society International CMV Consensus Group. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. https://pmc.ncbi.nlm.nih.gov/articles/PMC12180710/" },
    { num: 2, text: "Sharma P, et al. (AASLD/AST) Practice Guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications (Question 10, cytomegalovirus). Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785" },
  ],
};

export default PAGE;
