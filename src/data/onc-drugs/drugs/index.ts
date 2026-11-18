import type { OncGroup } from '../types.js';
import * as g0 from './targeted-heme-kinase.js';
import * as g1 from './targeted-heme-other.js';
import * as g2 from './targeted-lung-melanoma.js';
import * as g3 from './targeted-vegf-multikinase.js';
import * as g4 from './targeted-breast-parp-hormonal.js';
import * as g5 from './biologic-monoclonal.js';
import * as g6 from './biologic-adc.js';
import * as g7 from './biologic-tcell-cellular.js';
import * as g8 from './targeted-erlotinib-supplement.js';
import * as g9 from './biologic-fda-repository-supplement.js';
import { CHECKPOINT_INHIBITORS } from './checkpoint-inhibitors.js';
import * as cyto0 from './cytotoxic-platinum-topoisomerase.js';
import * as cyto1 from './cytotoxic-anthracycline-fluoropyrimidine.js';
import * as cyto2 from './cytotoxic-antimetabolite.js';
import * as cyto3 from './cytotoxic-microtubule.js';
import * as cyto4 from './cytotoxic-alkylator.js';
import * as cyto5 from './cytotoxic-other.js';

// One file per drug group, each owned by one author: drugs/<group>.ts exports any of
//   DRUGS, CLASSES, SOURCES, CANCERS, REGIMENS   (see OncGroup in ../types.ts)
// To add a group: create the file, `import * as <name> from './<file>.js';` below, and add ONE line to ONC_GROUPS.
// ../index.ts merges every group with the shared files (classes.ts, sources.ts, cancers.ts, regimens.ts).
// scripts/onc-drugs.test.ts fails if a drugs/*.ts file is not imported here, or if ids / source keys repeat across files.
// The first group predates the convention and exports its drugs under another name, so it is wrapped here.

export const ONC_GROUPS: Record<string, OncGroup> = {
  'checkpoint-inhibitors.ts': { DRUGS: CHECKPOINT_INHIBITORS },
  'cytotoxic-platinum-topoisomerase.ts': cyto0,
  'cytotoxic-anthracycline-fluoropyrimidine.ts': cyto1,
  'cytotoxic-antimetabolite.ts': cyto2,
  'cytotoxic-microtubule.ts': cyto3,
  'cytotoxic-alkylator.ts': cyto4,
  'cytotoxic-other.ts': cyto5,
  'targeted-heme-kinase.ts': g0,
  'targeted-heme-other.ts': g1,
  'targeted-lung-melanoma.ts': g2,
  'targeted-vegf-multikinase.ts': g3,
  'targeted-breast-parp-hormonal.ts': g4,
  'biologic-monoclonal.ts': g5,
  'biologic-adc.ts': g6,
  'biologic-tcell-cellular.ts': g7,
  'targeted-erlotinib-supplement.ts': g8,
  'biologic-fda-repository-supplement.ts': g9,
};
