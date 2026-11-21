import type { OncSource } from '../onc-drugs/types.js';

const dm = (setid: string): string => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;

export const TX_SOURCES: Record<string, OncSource> = {
  // ---- calcineurin inhibitors (src/data/transplant-drugs/drugs/calcineurin.ts); labels read in full from the saved DailyMed SPL XML, 2026-11-20
  'pi-prograf': { key: 'pi-prograf', kind: 'fda-pi', text: 'PROGRAF (tacrolimus) capsules, injection and granules for oral suspension, Astellas Pharma US, Inc. Prescribing information, DailyMed set ID 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b, SPL effective 2023-08-25.', url: dm('7f667de1-9dfa-4bd6-8ba0-15ee2d78873b'), revised: '8/2023' },
  'pi-astagraf': { key: 'pi-astagraf', kind: 'fda-pi', text: 'ASTAGRAF XL (tacrolimus extended-release capsules), Astellas Pharma US, Inc. Prescribing information, DailyMed set ID 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e, SPL effective 2026-01-14.', url: dm('550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e') },
  'pi-envarsus': { key: 'pi-envarsus', kind: 'fda-pi', text: 'ENVARSUS XR (tacrolimus extended-release tablets), Veloxis Pharmaceuticals, Inc. Prescribing information, DailyMed set ID de2315b0-6344-43ac-9aea-3e3b68d828e7, SPL effective 2025-02-26.', url: dm('de2315b0-6344-43ac-9aea-3e3b68d828e7'), revised: '4/2024' },
  'pi-neoral': { key: 'pi-neoral', kind: 'fda-pi', text: 'NEORAL (cyclosporine) soft gelatin capsules and oral solution, MODIFIED, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID 94461af3-11f1-4670-95d4-2965b9538ae3, SPL effective 2026-08-10.', url: dm('94461af3-11f1-4670-95d4-2965b9538ae3'), revised: 'September 2023' },
  'pi-gengraf': { key: 'pi-gengraf', kind: 'fda-pi', text: 'GENGRAF (cyclosporine capsules, USP [MODIFIED]), AbbVie Inc. Prescribing information, DailyMed set ID e896cbfe-4745-4088-82a3-8dc10b75c41f, SPL effective 2024-08-21.', url: dm('e896cbfe-4745-4088-82a3-8dc10b75c41f') },
  'pi-sandimmune': { key: 'pi-sandimmune', kind: 'fda-pi', text: 'SANDIMMUNE (cyclosporine) capsules and injection, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID 5e5926a7-1de0-4b54-a5c0-286b6200ff82, SPL effective 2026-07-10.', url: dm('5e5926a7-1de0-4b54-a5c0-286b6200ff82'), revised: 'March 2026' },
};
