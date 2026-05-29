// myMedKitt — Medical-Legal Disclaimer (single source of truth)
//
// NEW FILE (additive — does not change any existing clinical content). Until now
// the disclaimer text lived only in docs/index.html + docs/legal-banner.js with
// NO versioned, auto-extractable constant. The WingMan companion skill needs one
// (so the skill's disclaimer gate + version stamp derive from a single source and
// can never drift). This constant MIRRORS the deployed legal banner's four
// acknowledgments — it introduces no new legal language.
//
// SIGN-OFF LOG (Andy Kitlowski, EM physician + product owner):
//   2026-05-29 — APPROVED: DISCLAIMER_VERSION v1.0, effective 2026-05-29, and the
//   four acknowledgments below (reproduced from the deployed banner in
//   docs/index.html; no new legal language). The app's legal-banner could later
//   read FROM this constant so the banner and the skill share one source — a
//   separate task, Andy's call.

export const DISCLAIMER_VERSION = "v1.0"; // signed 2026-05-29
export const DISCLAIMER_EFFECTIVE_DATE = "2026-05-29"; // signed 2026-05-29
export const DISCLAIMER_STORAGE_VALUE = `${DISCLAIMER_VERSION}-${DISCLAIMER_EFFECTIVE_DATE}`;

export interface DisclaimerAcknowledgment {
  title: string;
  text: string;
}

export const DISCLAIMER_COPY = {
  intro:
    "myMedKitt is a clinical decision-support tool for licensed healthcare professionals. By proceeding, you acknowledge and agree to the following:",
  acknowledgments: [
    {
      title: "Not a Medical Device",
      text: "I understand that myMedKitt is NOT an FDA-cleared medical device and has not been reviewed or approved by the U.S. Food and Drug Administration. The content is intended to support, not replace, my ability to independently review the basis for any recommendation.",
    },
    {
      title: "Not a Substitute for Professional Judgment",
      text: "I understand that myMedKitt is for informational and educational purposes only and does NOT replace my clinical judgment, training, physical-examination findings, or the advice of qualified consulting specialists. I will verify any medication dosing against a primary reference and adjust for patient-specific factors.",
    },
    {
      title: "Licensed Healthcare Provider",
      text: "I confirm that I am a licensed healthcare professional, or a medical student/resident under direct supervision, and that I will use this tool only within my scope of practice and licensure. I will not provide this tool or its output directly to patients outside a clinician-mediated encounter.",
    },
    {
      title: "Assumption of Risk & Liability",
      text: "I understand that I assume full responsibility for any clinical decisions made using information from myMedKitt. The creators, developers, licensors, and affiliates of myMedKitt assume no liability for patient outcomes, errors, omissions, or any damages arising from use of this tool.",
    },
  ] as DisclaimerAcknowledgment[],
  banner: {
    text: "NOT FDA CLEARED — for licensed clinician use only. Decision support, not a substitute for clinical judgment.",
  },
} as const;
