# Ocular Trauma — Image Placeholders

Place final images at `/docs/images/ocular-trauma/{filename}` and they will be served by GitHub Pages at `/myMedKitt/images/ocular-trauma/{filename}`.

## Expected files

Andy can drop in his own clinical photos OR use the verified open-source images sourced during scout phase (see `attribution.md`).

| Filename | Used by | Notes |
|----------|---------|-------|
| `open-globe-peaked-pupil.jpg` | exam-rules / open-globe-suspect | Peaked/teardrop pupil = open globe |
| `seidel-test-positive.jpg` | exam-rules | Fluorescein streaming under cobalt blue |
| `hyphema-grade-microhyphema.jpg` | hyphema-mgmt | Microhyphema (RBCs only) |
| `hyphema-grade-half-chamber.jpg` | hyphema-mgmt | Grade II-III layered |
| `hyphema-grade-total-eight-ball.jpg` | hyphema-mgmt | Grade IV total |
| `hyphema-diagram.gif` | hyphema-mgmt | Schematic 4-grade comparison |
| `subconjunctival-hemorrhage.jpg` | subconj-hemorrhage | Bright red SCH |
| `lateral-canthotomy-step1.jpg` | ocs-cantholysis / oct-cantholysis | Anesthetize canthus |
| `lateral-canthotomy-step2.jpg` | oct-cantholysis | Hemostat crush |
| `lateral-canthotomy-step3.jpg` | oct-cantholysis | Horizontal cut to rim |
| `lateral-canthotomy-step4.jpg` | oct-cantholysis | Inferior cantholysis (tendon strum-and-cut) |
| `chemical-burn-limbal-ischemia.jpg` | chemical-irrigate / chemical-staging | White "porcelain" limbus |
| `orbital-blowout-fracture-ct.png` | orbital-fx | Coronal CT trapdoor |
| `pediatric-retinal-hemorrhage-aht.jpg` | peds-aht / oct-peds-nat | Multilayered retinal heme to ora serrata |

## Naming rules
- Use kebab-case, lowercase, no spaces.
- `.jpg` for clinical photos, `.png` for diagrams/CT, `.gif` only if animated.
- Keep < 500 KB per image when possible (resize/compress before commit).
- Always pair with descriptive `alt` text in info-pages.ts (it's required by the InfoPageImage interface).

## Attribution
Every CC-licensed image needs entry in `attribution.md` with:
- Original source URL
- License (CC0 / CC-BY / CC-BY-SA + version)
- Author / year
- Notes on any modifications

If Andy supplies his own clinical photos, mark "Original — Andy Kitlowski, MD, all rights reserved" in attribution.md.
