# Right Heart Failure — Image Placeholders

Drop image files into this folder with the exact filenames below. They are referenced by inline links in the right-heart-failure decision tree and info pages via `[caption](#/image/rhf/<filename>)`.

## Expected files

| Filename | Used in | Description |
|----------|---------|-------------|
| `tapse-mmode.jpg` | rhf-pocus, rhf-pocus-criteria | M-mode at lateral tricuspid annulus showing TAPSE measurement (cutoff 17 mm) |
| `mcconnell-a4c.jpg` | rhf-pocus, rhf-pocus-criteria | Apical 4-chamber view showing McConnell sign — RV free-wall akinesis with preserved apical contraction |
| `d-sign-psax.jpg` | rhf-pocus, rhf-pocus-criteria | Parasternal short-axis view showing systolic septal flattening (D-sign) of pressure-overloaded RV |
| `plethoric-ivc.jpg` | rhf-pocus, rhf-pocus-criteria | Subcostal IVC view showing dilated (>2.1 cm), non-collapsing IVC indicating elevated CVP |
| `ivc-respiratory-variation.gif` | rhf-pocus-criteria | Optional animated subcostal IVC clip showing respiratory variation |
| `s1q3t3-ecg.jpg` | rhf-trigger-id, rhf-pe-pathway | 12-lead ECG showing classic S1Q3T3 pattern of acute right heart strain |
| `inferior-mi-ecg.jpg` | rhf-rvmi-mgmt | Inferior STEMI 12-lead with right-sided V4R lead showing >1 mm ST elevation (RV infarction) |
| `pe-rbbb-ecg.jpg` | rhf-pe-pathway | 12-lead ECG showing new RBBB and right-axis deviation in acute PE |

## Naming rules

- Lowercase, hyphenated, no spaces.
- Use `.jpg` for stills; `.gif` only if motion is essential.
- Keep file size < 300 KB per image (compress to ≤ 1200 px wide).
- All images must be open-source / public domain / CC-BY licensed. Add attribution to `attribution.md` in this folder for each image you drop in.

## Adding attribution

Create `attribution.md` alongside the images:

```markdown
| File | Source | License | Attribution |
|------|--------|---------|-------------|
| tapse-mmode.jpg | Wikimedia Commons | CC BY-SA 4.0 | Author Name, "Title" |
```
