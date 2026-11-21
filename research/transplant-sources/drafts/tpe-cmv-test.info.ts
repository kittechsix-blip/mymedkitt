// DRAFT info page for the CMV page of the transplant consult. Assembler registers it in INFO_PAGES.
import type { InfoPage } from '../../data/info-pages.js';

const PAGE: InfoPage = {
  id: "tpe-cmv-test",
  title: "CMV testing: test, thresholds, organ-by-organ diagnosis",
  subtitle: "Detail behind the work-up node",
  sections: [
    { heading: "Test of choice", body: "\u2022 CMV DNA by quantitative nucleic acid testing (QNAT) calibrated to the WHO standard is the recommended test for diagnosis and for monitoring (strong, high). [1]\n\u2022 Plasma or whole blood are both acceptable (strong, high); specimen type should not be changed while monitoring, and the same assay should be used (strong, high). [1]\n\u2022 If QNAT is unavailable, antigenemia (pp65) may be considered as an alternative (strong, high). [1]\n\u2022 Not recommended: viral culture of blood, urine, stool or oral secretions (strong, high); QNAT on urine, stool or oral secretions (strong, low). Antibody testing has no role. [1]" },
    { heading: "Thresholds and significant change", body: "\u2022 **No universal viral-load threshold for starting or stopping treatment has been established**; centers should set their own assay-specific thresholds (strong, moderate). [1]\n\u2022 Significant change: only changes exceeding 0.5 log10 IU/mL (3-fold), or 0.7 log10 IU/mL (5-fold) for initial values below 3 log10 IU/mL (1000 IU/mL), should be considered significant (strong, low). [1]" },
    { heading: "Organ disease: blood is not enough", body: "\u2022 Proven tissue-invasive disease = characteristic cytopathic change plus CMV antigen on immunohistochemistry; histology with immunohistochemistry is recommended (strong, moderate); tissue QNAT or culture may add sensitivity. [1]\n\u2022 **Gut:** blood QNAT is sensitive in D+/R\u2212 patients, less so in R+ patients, who may have low or undetectable DNA. [1] Liver recipients: end-organ disease viremia may be below the limit of detection. [2]\n\u2022 **Lung:** low or undetectable blood DNA is seen rarely in lung recipients with CMV pneumonia; BAL QNAT may improve specificity, but thresholds are not standardised. [1]\n\u2022 **CSF:** CMV DNA in CSF (assuming no blood contamination) likely represents CMV disease needing treatment. [1]\n\u2022 **Eye:** diagnosis is by ophthalmologic examination; vitreous QNAT, biopsy or vitrectomy specimen may help confirm. Differential includes necrotizing retinitis from herpes simplex, varicella-zoster or Toxoplasma. [1]" },
  ],
  citations: [
    { num: 1, text: "Kotton CN, Kumar D, Manuel O, Chou S, Hayden RT, Danziger-Isakov L, Asberg A, Tedesco-Silva H, Humar A; The Transplantation Society International CMV Consensus Group. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. https://pmc.ncbi.nlm.nih.gov/articles/PMC12180710/" },
    { num: 2, text: "Sharma P, et al. (AASLD/AST) Practice Guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications (Question 10, cytomegalovirus). Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785" },
  ],
};

export default PAGE;
