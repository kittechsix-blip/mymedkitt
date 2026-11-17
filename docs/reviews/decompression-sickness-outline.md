# Decompression Sickness: ED consult proposal

Status: Proposed clinical content for approval. No app integration or deployment.
Category: Emergency Medicine. Tree ID: `decompression-sickness`. Entry: `dcs-start`.

## Clinical priority

**New weakness, sensory level, ataxia, or bladder dysfunction after diving is possible neurological decompression illness. Start high-concentration oxygen and activate hyperbaric consultation/transfer immediately. Recompression is definitive treatment; routine MRI is not a prerequisite and must not delay treatment.** [1,4,5]

Necessary investigation or stabilization for a competing emergency remains appropriate. Suspected pneumothorax requires rapid assessment and drainage when indicated before chamber treatment. This is a targeted safety exception, not an MRI-first pathway. [4,5]

## Proposed pathway: six modules, 22 cards

### 1. Recognition and triage

1. `dcs-start` **Decompression sickness / diving emergency**. Define decompression illness (DCI) as DCS plus arterial gas embolism (AGE). Show urgent treatment sequence immediately. [1,2]
2. `dcs-triage` **Neurological, cardiopulmonary, or progressive symptoms?** Route these directly to urgent recompression coordination; stable pain/skin symptoms still require diving-medicine assessment. [2,3]
3. `dcs-phenotypes` **DCS versus AGE**. DCS includes musculoskeletal, skin, spinal, cerebral, vestibular and pulmonary manifestations. Abrupt neurological symptoms around ascent suggest AGE; distinguishing the two must not hold up initial treatment. A seemingly compliant dive does not exclude DCI. [1,2]
4. `dcs-history` **Dive history**. Capture dive computer/log, gas, depth, duration, repeat dives, ascent/decompression problems, symptom timing, altitude exposure, and response to oxygen. Obtain buddy observations. [2]

### 2. Immediate stabilization

5. `dcs-oxygen` **Oxygen now**. Deliver oxygen as close to 100% as feasible using an appropriate high-concentration system; continue during transfer. A normal saturation is not a reason to withhold treatment. [3]
6. `dcs-support` **ABC and supportive care**. Protect airway, monitor circulation, obtain vascular access and bedside glucose. Use isotonic crystalloid guided by perfusion, avoiding indiscriminate loading in respiratory compromise. Avoid routine glucose-containing resuscitation fluid; treat actual hypoglycemia. [3,6]
7. `dcs-position` **Position and temperature**. Horizontal when tolerated, recovery position for an unconscious spontaneously breathing patient; prioritize airway/respiratory needs. Avoid Trendelenburg, exertion, overheating and further diving. [3]
8. `dcs-pneumothorax` **Pulmonary barotrauma safety**. Rapid ultrasound/chest imaging when pneumothorax is suspected; treat tension pneumothorax immediately. A confirmed pneumothorax requires specialist-coordinated pleural drainage before recompression. [4,5]

### 3. Focused evaluation

9. `dcs-neuro-exam` **Serial neurological examination**. Record mentation, cranial nerves, motor power, sensory distribution/level, coordination, safe gait testing and bladder symptoms. Timestamp baseline and changes. Do not force an unstable patient to walk. [2,5,6]
10. `dcs-spinal` **Spinal cord syndrome after diving**. Highlight leg weakness, sensory changes and urinary retention. Urgent recompression pathway; a negative acute MRI cannot exclude spinal DCS. [4,6]
11. `dcs-investigations` **Tests without treatment delay**. Clinical diagnosis; labs assess complications and mimics. Tailor glucose, blood count, electrolytes/renal function, blood gas, ECG and chest investigations to severity. Routine CT/MRI does not establish clearance for recompression. [4,6]
12. `dcs-differential` **Competing and coexisting disease**. Pulmonary barotrauma, immersion pulmonary edema, aspiration, inner-ear barotrauma, contaminated gas/CO exposure, trauma, hypoglycemia and conventional stroke. Avoid assuming every post-dive symptom is DCS. [1,6]

### 4. Definitive treatment and transfer

13. `dcs-recompression` **Definitive treatment: urgent hyperbaric recompression**. Neurological/serious DCI or suspected AGE requires urgent specialist-directed treatment. Improvement on surface oxygen does not cancel referral; late presentation is not automatic futility. [2,4,5]
14. `dcs-transfer` **Call and transport**. Contact local emergency/hyperbaric services and DAN emergency consultation: **+1-919-684-9111**. Confirm an accepting service capable of treating the patient's acuity, not merely a listed chamber address. [1]
15. `dcs-handoff` **Transfer checklist**. Send dive records, time course, serial examination, oxygen exposure, interventions and suspected barotrauma. Maintain adequate oxygen supply and monitoring. Coordinate aircraft/cabin altitude with retrieval and diving specialists; avoid unnecessary altitude exposure. [2,3,5]
16. `dcs-chamber` **Chamber course**. Hyperbaric physician selects treatment table and repeat sessions. This consult must not become a self-directed chamber protocol or an in-water recompression instruction. [3,5]

### 5. Reassessment and pitfalls

17. `dcs-complications` **Deterioration**. Reassess neurological function, respiratory failure, shock, urinary retention and concurrent aspiration/barotrauma. Escalate critical care support with hyperbaric coordination. [1,6]
18. `dcs-mild` **Apparently mild disease**. No unsupervised discharge based on pain-only symptoms or oxygen response. Specialist assessment is needed to exclude significant neurological involvement and select treatment/observation. [2,3]
19. `dcs-pitfalls` **Stop panel**. No routine MRI-first delay; no false reassurance from normal imaging or dive computer. No routine steroids or empiric antithrombotic treatment solely for DCI: these are not substitutes for recompression. Separate indications require separate assessment. [3,4,6]

### 6. Disposition and prevention

20. `dcs-disposition` **Disposition with accepting specialist**. Ongoing deficits or cardiopulmonary instability require appropriate monitored admission; continued care and repeat recompression depend on response. [5,6]
21. `dcs-return-precautions` **Recurrence precautions**. Document residual findings; provide explicit instructions for recurrent neurological, breathing or bladder symptoms and direct emergency reassessment. [2]
22. `dcs-return-diving` **Return to diving / flying**. No further diving until reviewed and cleared by a diving-medicine physician. Post-DCI flying advice must be individualized; routine healthy-diver no-fly intervals are not a clearance rule after an injury. [2,5]

## Toolbar proposal

Six focused shortcuts, with no unvalidated severity score or dosing calculator:

- **Steps**: immediate oxygen, specialist contact, stabilization, transfer/recompression.
- **Recompress**: jump to `dcs-recompression`.
- **Oxygen**: jump to `dcs-oxygen`.
- **Neuro exam**: jump to `dcs-neuro-exam`.
- **Transfer**: jump to `dcs-transfer`, including phone and handoff checklist.
- **Stop**: `dcs-pitfalls`, with a link to `dcs-differential`.

## Search and existing-pathway integration

Index: decompression sickness, decompression illness, DCS, DCI, diving, scuba, rapid ascent, fast ascent, bends, caisson disease, diver paralysis, spinal decompression sickness, arterial gas embolism, AGE, recompression, hyperbaric oxygen. Match AGE only in a diving/gas-embolism context, not the ordinary word age. Do not reroute unrelated altitude, sedation or urology questions.

Add a diving-exposure exception to relevant spinal-cord diagnostic cards, linking this consult before routine MRI-first guidance. Preserve urgent imaging for traumatic/compressive emergencies when clinically indicated.

Acceptance checks: the exact query **decompression sickness definitive treatment** returns this consult/recompression first; **weakness urinary retention after scuba rapid ascent** reaches neurological DCI; pulmonary barotrauma warnings remain visible; every shortcut resolves; all paths have a disposition.

## Verified references

1. CDC Yellow Book 2026. Chimiak J, Nord DA. Scuba Diving: Decompression Illness and Other Dive-Related Injuries. Includes DAN emergency number and AGE emergency recompression. https://www.cdc.gov/yellow-book/hcp/environmental-hazards-risks/scuba-diving-decompression-illness-and-other-dive-related-injuries.html
2. Divers Alert Network. Decompression Illness. Definitive recompression, symptom spectrum, oxygen response, examination/history and return-to-diving considerations. https://dan.org/health-medicine/health-resources/diseases-conditions/decompression-illness-what-is-it-and-what-is-the-treatment/
3. Mitchell SJ, Bennett MH, Bryson P, et al. Pre-hospital management of decompression illness: expert review of key principles and controversies. Diving Hyperb Med. 2018;48(1):45-55. DAN-initiated international consensus developed through the UHMS workshop. https://pmc.ncbi.nlm.nih.gov/articles/PMC6467826/
4. Undersea and Hyperbaric Medical Society. Decompression Sickness. Imaging must not determine whether suspected DCS requires HBOT; selected chest imaging to identify pneumothorax. https://uhms.org/5-decompression-sickness.html
5. Jüttner B, et al. S2k guideline for diving accidents. GMS Ger Med Sci. 2023;21:Doc01. Routine imaging unnecessary; investigate suspected pneumothorax; urgent HBOT for severe symptoms and benefit possible despite delayed treatment. https://pmc.ncbi.nlm.nih.gov/articles/PMC10073983/
6. Mitchell SJ. Decompression illness: a comprehensive overview. Diving Hyperb Med. 2024. Acute spinal MRI limitations, examination/investigations and differential diagnosis. https://pmc.ncbi.nlm.nih.gov/articles/PMC11168797/

Evidence qualification: recommendations draw mainly on specialist consensus and observational evidence. Recompression protocols, treatment duration and individual disposition remain hyperbaric-specialist decisions. No new image is proposed.

## Exact proposed exception for existing MRI-first guidance

Location: `transverse-myelitis.ts`, `tm-start`, `tm-mri-gate`, and the MRI-first critical action. Add the same concise exception wherever unconditional sequencing appears:

> **Recent diving or rapid ascent?** New myelopathy may represent spinal decompression illness. Start high-concentration oxygen and contact hyperbaric/diving medicine immediately. Do not delay indicated recompression for routine spinal MRI. Suspected traumatic or compressive pathology still requires urgent targeted evaluation in parallel. [UHMS DCS; S2k diving-accident guideline]

This exception does not remove the existing MRI pathway for suspected compressive myelopathy or transverse myelitis without a compatible diving exposure.
