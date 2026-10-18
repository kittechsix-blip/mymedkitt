# Unused MRI image, parked outside docs/

`metastatic-cord-compression.jpg` (Hellerhoff, CC BY-SA 4.0, Wikimedia Commons) was taken out of the
MRI for Dummies gallery on 2026-10-17 (c2408c3e) because the case mixes several causes. It is
not shown anywhere in the app.

On 2026-10-18 it was moved here from `docs/images/mri/` so GitHub Pages stops serving a CC BY-SA
file without credit, and so the image-license validator passes. It was not deleted. Its manifest
entry is in `MANIFEST.json` next to it. Images are not in the `docs/sw.js` precache list, so there
was nothing to remove there.

To use it again: move it back into `docs/images/mri/`, put its manifest entry back with
`"attribution_exception": "Andy 2026-10-18: keep with full credit"`, and add it to the
`mri-image-credits` page.
