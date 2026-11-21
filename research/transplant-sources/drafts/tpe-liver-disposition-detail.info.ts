// myMedKitt - Transplant Patient in the ED: info page draft (verified detail moved verbatim from the liver node bodies).
// Citation numbers are page-local. Lines starting "Editor note:" are not from a source.
import type { InfoPage } from '../info-pages.js';

export const TPE_LIVER_DISPOSITION_DETAIL_INFO: InfoPage = {
  id: "tpe-liver-disposition-detail",
  title: "Liver recipient: disposition detail",
  subtitle: "What the guideline does and does not say about calling, urgency, reporting",
  sections: [
    { heading: "WHAT THE GUIDELINES DO AND DO NOT SAY", body: "\u2022 Not in the guideline: an emergency-department section, or a statement of when a non-transplant clinician should call or transfer to the transplant center. [1]\n\u2022 Its closest statements: hepatic artery or portal vein stenosis or thrombosis should be managed in a timely fashion to prevent graft loss, particularly urgently when the hepatic artery is involved (Strong, Level 4); when hepatic artery thrombosis within 5 days of transplant leads to progressive liver failure, urgent re-transplantation is needed. [1]\n\u2022 Suspected donor-derived infection must be reported by the organ procurement organization and/or the transplant center within 24 hours; the transplant team secures residual donor and recipient blood samples and retains all relevant cultures. [2]\n\u2022 Recipients should not use herbal and dietary supplements without discussing them with their transplant providers (Strong, Level 4). [2]\nRelated consults: [CMV page](#/tree/transplant-patient-ed/node/tpe-cmv) (viral infection)." },
  ],
  citations: [{ num: 1, text: "Te H, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and management of graft-related complications. Liver Transpl. 2026;32(3):444-490 (online 2025-08-22). doi:10.1097/LVT.0000000000000715. https://doi.org/10.1097/LVT.0000000000000715" }, { num: 2, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. https://doi.org/10.1097/LVT.0000000000000785" }],
};
