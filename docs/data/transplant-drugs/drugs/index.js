import * as calcineurin from './calcineurin.js';
import * as antimetabolites from './antimetabolites.js';
import * as mtor from './mtor.js';
import * as biologicsInduction from './biologics-induction.js';
import * as corticosteroids from './corticosteroids.js';
import * as antivirals from './antivirals.js';
import * as pjpProphylaxis from './pjp-prophylaxis.js';
import * as azoles from './azoles.js';
import * as rejectionOfflabel from './rejection-offlabel.js';
// One file per drug group, each exporting any of DRUGS, CLASSES, SOURCES, MEMBERS, REGIMENS (see TxGroup in ../types.ts).
// To add a group: create the file, import it here and add ONE line to TX_GROUPS.
export const TX_GROUPS = {
    'calcineurin.ts': calcineurin,
    'antimetabolites.ts': antimetabolites,
    'mtor.ts': mtor,
    'biologics-induction.ts': biologicsInduction,
    'corticosteroids.ts': corticosteroids,
    'antivirals.ts': antivirals,
    'pjp-prophylaxis.ts': pjpProphylaxis,
    'azoles.ts': azoles,
    'rejection-offlabel.ts': rejectionOfflabel,
};
