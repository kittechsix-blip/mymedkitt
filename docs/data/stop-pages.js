// myMedKitt — Stop Pages (Do NOT Items)
// All "Do NOT" info pages for every consult — 5-10 critical pitfalls per consult.
// Auto-registered via info-service.ts. Auto-surfaced via 🛑 Stop button in contextual toolbar.
import { STOP_PAGES_01 } from './stop-pages/batch-01.js';
import { STOP_PAGES_02 } from './stop-pages/batch-02.js';
import { STOP_PAGES_03 } from './stop-pages/batch-03.js';
import { STOP_PAGES_04 } from './stop-pages/batch-04.js';
import { STOP_PAGES_05 } from './stop-pages/batch-05.js';
import { STOP_PAGES_06 } from './stop-pages/batch-06.js';
import { STOP_PAGES_07 } from './stop-pages/batch-07.js';
import { STOP_PAGES_08 } from './stop-pages/batch-08.js';
import { STOP_PAGES_09 } from './stop-pages/batch-09.js';
import { STOP_PAGES_10 } from './stop-pages/batch-10.js';
import { STOP_PAGES_11 } from './stop-pages/batch-11.js';
import { STOP_PAGES_12 } from './stop-pages/batch-12.js';
import { STOP_PAGES_13 } from './stop-pages/batch-13.js';
export const STOP_PAGES = {
    ...STOP_PAGES_01,
    ...STOP_PAGES_02,
    ...STOP_PAGES_03,
    ...STOP_PAGES_04,
    ...STOP_PAGES_05,
    ...STOP_PAGES_06,
    ...STOP_PAGES_07,
    ...STOP_PAGES_08,
    ...STOP_PAGES_09,
    ...STOP_PAGES_10,
    ...STOP_PAGES_11,
    ...STOP_PAGES_12,
    ...STOP_PAGES_13,
};
export function getAllStopPages() {
    return Object.values(STOP_PAGES);
}
