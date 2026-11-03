# Original procedure app integration

2026-11-03

Requested: bring the original A-Line, ChestTube and ResusThoracotomy applications from the Pumpkin Patch into myMedKitt Procedures, retaining their existing appearance.

The two existing chest procedure IDs now open their bundled original screens. Node-specific routes retain the original myMedKitt reference pathways. Arterial Line is registered as a consult, searchable and linked from vascular access, sepsis and cardiogenic shock. Existing chest-tube/traumatic-arrest/blunt-chest links remain valid.

Source copies and hashes are recorded in `docs/procedures/sources.json`. Clinical prose and original styles were not edited. Hosting adaptations disable independent service workers, remove separate install manifests, update sharing URLs and QR codes, and avoid fetching missing optional A-Line photographs while retaining their original placeholders. Source repositories and their retirement/access settings are untouched.

The host supplies Back, Procedures and Reference pathway navigation. Originals load as bundled first-party documents; no dependency on the retired Vercel addresses. myMedKitt's service worker owns updates and offline caching.

Validation: TypeScript; critical-action, calculator, image, citation and cross-link gates; 48 application tests; 5 integration checks. Phone browser opened/closed 29 bottom tools and navigated each original screen. Tablet verification checks each step and return routes.

Brand audit: the current v4 checker reports 21 app-wide style findings against the existing myMedKitt styles. This task explicitly requests the original apps' exact UI. No site-wide rebrand is included, and these preserved designs are not represented as v4-conformant.

A-Line's optional clinical photograph slots were already unfilled in the source. Original SVG diagrams are bundled. This integration does not constitute a fresh clinical evidence audit of the three source applications.
