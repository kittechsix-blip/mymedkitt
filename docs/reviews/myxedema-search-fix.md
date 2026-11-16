# Myxedema treatment search fix, 2026-11-16

Added the source-supported equivalence myxedema coma = decompensated hypothyroidism to reviewed search synonyms and the Thyroid consult aliases. Named the condition in steroid-first and IV levothyroxine step titles and introductory lines. No drug doses or treatment algorithms changed.

Source: https://emcrit.org/ibcc/myxedema/ (verified November 16, 2026).

Exact reported query now returns thyroid-hypo-steroids first; elderly/CAD levothyroxine query returns thyroid-hypo-t4 first. Regression coverage added. Existing 197-test suite passed; updated focused search suite 15/15. TypeScript and reference gates passed; two existing cross-link baseline warnings unchanged. WingMan drift check passed. Phone-sized browser confirmed first search result and opening the thyroid step. Supabase thyroid nodes synced before Pages release.
