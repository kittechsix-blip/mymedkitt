// DRAFT info page for the CMV page of the transplant consult. Assembler registers it in INFO_PAGES.
import type { InfoPage } from '../../data/info-pages.js';

const PAGE: InfoPage = {
  id: "tpe-cmv-team",
  title: "CMV: immunosuppression, rejection, IVIG, secondary prophylaxis, letermovir",
  subtitle: "Detail behind the team node",
  sections: [
    { heading: "Reducing immunosuppression", body: "\u2022 Without concomitant rejection, reduction is suggested in severe CMV disease, inadequate clinical response, high viral loads, and cytopenia (weak, very low) (call the transplant team first). The guideline gives no amount or drug, and nothing for coexisting rejection. [1]" },
    { heading: "Prevention after rejection treatment", body: "\u2022 Treatment of rejection with lymphocyte-depleting antibodies in at-risk recipients should result in reinitiation of prophylaxis or preemptive therapy for 4 to 12 weeks (weak, moderate). [1]" },
    { heading: "IVIG or CMVIG", body: "\u2022 Not routinely recommended, but may be considered in severe disease, resistant or refractory disease, antiviral drug intolerance, or IgG below 400 mg/dL, especially in thoracic organ recipients (weak, low). [1]" },
    { heading: "Secondary prophylaxis: two positions", body: "\u2022 International guideline: routine use not recommended (weak, low), but suggested in high-risk situations such as increased immunosuppression, low lymphocyte count, repeated recurrences or inability to monitor (weak, low); weekly DNA for 1 to 3 months after stopping may be considered when recurrence risk is higher. [1]\n\u2022 Liver guideline: after viral load is undetectable, weekly monitoring for 4 weeks off therapy; secondary prophylaxis is not recommended (Strong, Level 1). [2]" },
    { heading: "Letermovir", body: "\u2022 Letermovir is not recommended for treatment; it does not cover herpes simplex or varicella-zoster, so acyclovir prophylaxis should be used where indicated; a dose reduction of letermovir is required during concomitant cyclosporine, and letermovir \"may lead to altered tacrolimus levels, so close monitoring is needed\". [1]" },
  ],
  citations: [
    { num: 1, text: "Kotton CN, Kumar D, Manuel O, Chou S, Hayden RT, Danziger-Isakov L, Asberg A, Tedesco-Silva H, Humar A; The Transplantation Society International CMV Consensus Group. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. https://pmc.ncbi.nlm.nih.gov/articles/PMC12180710/" },
    { num: 2, text: "Sharma P, et al. (AASLD/AST) Practice Guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications (Question 10, cytomegalovirus). Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785" },
  ],
};

export default PAGE;
