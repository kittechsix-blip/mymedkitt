# myMedKitt — Hyperlink Audit Followup Report

Generated: 2026-04-27

## Status

**Phase A complete.** All broken hyperlinks have been demoted to plain bold text so users no longer encounter dead-tap UX. The following IDs reference content that was never created — each one is an opportunity to either (a) build the missing target and re-promote the bold text back to a link, or (b) confirm the link isn't needed and leave it as bold prose.

---

## 1. Missing Cross-Consult Links (3)

These are aspirational cross-references to consults that don't exist yet. Each could become a future build target.

- **pregnancy-bleeding** — referenced from existing consult; no tree exists
- **physiologically-difficult-airway** — referenced from existing consult; no tree exists
- **neutropenic-fever** — referenced from existing consult; no tree exists

## 2. Missing Calculators (7)

- **pef-predicted**
- **shapiro**
- **wells-dvt**
- **electrolyte-replacement**
- **ecmo-recirculation**
- **ecmo-harlequin**
- **ecmo-troubleshooting**

## 3. Missing Drug Entries (44)

These drugs are referenced in consults but have NO entry in `src/data/drug-store.ts`. Each missing drug means clinicians can't tap to see dosing.

### Cardiovascular (14)
- adenosine
- andexanet
- heparin
- enalaprilat
- isosorbide-dinitrate
- lisinopril
- enalapril
- losartan
- spironolactone
- carvedilol
- txa
- kcentra
- rhogam
- prostaglandin-e1

### Antibiotics (9)
- cefotaxime
- ceftazidime
- nafcillin
- levofloxacin
- trimethoprim-sulfamethoxazole
- valacyclovir
- pip-tazo
- piptazo
- tetanus-immune-globulin

### Pain/Anti-inflammatory (8)
- naproxen
- indomethacin
- colchicine
- gabapentin
- pregabalin
- cyclobenzaprine
- baclofen
- tizanidine

### Toxicology (6)
- deferoxamine
- box-jellyfish-antivenom
- stonefish-antivenom
- sea-snake-antivenom
- intralipid-20
- ascorbic-acid

### Critical Care (4)
- mannitol
- terlipressin
- insulin-regular
- bromocriptine

### Other (3)
- omeprazole
- dutasteride
- bethanechol

## 4. Missing Info Pages (90)

Most are aspirational `*-summary`, `*-overview`, and step-summary pages referenced from consult start nodes. Worth building the high-traffic ones.

### ear (8)
- ear-aom-criteria
- ear-aom-watchful
- ear-oe-overview
- ear-moe-overview
- ear-moe-abx
- ear-fungal-overview
- ear-mastoid-overview
- ear-mastoid-abx

### dig (5)
- dig-steps-summary
- dig-acute-chronic
- dig-drug-interactions
- dig-ecg
- dig-arrhythmia

### iron (5)
- iron-summary
- iron-stages-detail
- iron-gi-decon
- iron-wbi-protocol
- iron-dfo-protocol

### rhogam (5)
- rhogam-practice-change
- rhogam-rh-interpretation
- rhogam-weak-d-genotype
- rhogam-ga-reference
- rhogam-kb-dosing

### aortic (3)
- aortic-summary
- aortic-add-rs
- aortic-surgery

### chd (3)
- chd-hyperox
- chd-vitals
- chd-pge1

### ecmo (3)
- ecmo-steps-summary
- ecmo-vv-circuit
- ecmo-va-circuit

### misfits (3)
- misfits-mnemonic
- misfits-workup
- misfits-hsv

### shunt (3)
- shunt-series
- shunt-infection
- shunt-tap-procedure

### xyl (3)
- xyl-quick-ref
- xyl-withdrawal-comparison
- xyl-wound-antibiotics

### bb (2)
- bb-steps-summary
- bb-agent-guide

### co (2)
- co-overview
- co-hbo-overview

### dsi (2)
- dsi-reassess
- dsi-intubation

### ft (2)
- ft-ob-history
- ft-miscarriage-communication

### fuo (2)
- fuo-severe-malaria
- fuo-advanced-workup

### lbp (2)
- lbp-infection-workup
- lbp-radiculopathy-rx

### methb (2)
- methb-overview
- methb-agents

### ppcm (2)
- ppcm-summary
- ppcm-prognosis

### ap (1)
- ap-summary

### bcs (1)
- bcs-stewardship-2024

### bot (1)
- bot-summary

### brady (1)
- brady-steps-summary

### breech (1)
- breech-ecv-note

### brugada (1)
- brugada-summary

### ca (1)
- ca-steps-summary

### ccb (1)
- ccb-steps-summary

### chf (1)
- chf-ntg-protocol

### cric (1)
- cric-video

### cvst (1)
- cvst-summary

### duke (1)
- duke-criteria

### gbs (1)
- gbs-summary

### hd (1)
- hd-summary

### ile (1)
- ile-summary

### hemo (1)
- hemo-abcde

### pea (1)
- pea-steps-summary

### osteo (1)
- osteo-quick-ref

### submersion (1)
- submersion-summary

### peds (1)
- peds-trauma-summary

### prep (1)
- prep-info

### rosc (1)
- rosc-steps-summary

### pdp (1)
- pdp-summary

### ss (1)
- ss-summary

### shoulder (1)
- shoulder-summary

### pvr (1)
- pvr-interpretation

### cauda (1)
- cauda-equina-red-flags

### retention (1)
- retention-meds

### catheter (1)
- catheter-sizing

### vt (1)
- vt-steps-summary

### vp (1)
- vp-shunt-overview

### icp (1)
- icp-crisis

### naloxone (1)
- naloxone-dosing

---

## Recommended next actions

1. **High-priority drugs** — Adenosine, heparin, mannitol, naproxen, valacyclovir, txa, kcentra, andexanet, intralipid-20 are referenced from emergency consults. Adding entries to `drug-store.ts` will instantly re-light dozens of buttons.
2. **Steps Summary info pages** — Many consults reference `<consult>-steps-summary`, `<consult>-summary`, or `<consult>-overview` from their start node (e.g., `ap-summary`, `bot-summary`, `ca-steps-summary`). These are mandatory per CLAUDE.md for emergent consults — building them is high-value.
3. **Calculators** — `shapiro`, `wells-dvt`, `pef-predicted` are well-known clinical calculators with simple scoring; quick wins.
4. **Cross-consult links** — `pregnancy-bleeding`, `physiologically-difficult-airway`, `neutropenic-fever` would each warrant their own consult builds.
