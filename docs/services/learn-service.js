// myMedKitt — MedKitt Learn data accessor + lightweight progress tracker
// Thin wrapper over the hardcoded rotations data file. No three-tier fallback
// in v1 — content lives in src/data/learn-rotations.ts only. Promote to
// Supabase once content stabilizes and we want over-the-air updates.
import { getAllLearnRotations, getLearnRotation as _getRotation, getStudentCard as _getCard, getCardsForSection as _getCardsForSection, getAllCardsForRotation as _getAllCardsForRotation, getCardsForPillar as _getCardsForPillar, getCardsForDomain as _getCardsForDomain, getDrill as _getDrill, ADMSEP_DOMAINS, getDomainLabel, } from '../data/learn-rotations.js';
// Side-effect imports — registers additional cards/drills into the global
// ALL_CARDS registry at module load. Must come AFTER the import above so
// learn-rotations.ts is initialized first.
import '../data/learn-cards-conditions.js';
import '../data/learn-cards-pharmacology.js';
import '../data/learn-drills.js';
export { ADMSEP_DOMAINS, getDomainLabel };
export function listRotations() {
    return getAllLearnRotations();
}
export function getRotation(id) {
    return _getRotation(id);
}
export function getCard(id) {
    return _getCard(id);
}
export function getCardsForSection(rotationId, sectionId) {
    return _getCardsForSection(rotationId, sectionId);
}
export function getAllCardsForRotation(rotationId) {
    return _getAllCardsForRotation(rotationId);
}
export function getCardsForPillar(rotationId, pillar) {
    return _getCardsForPillar(rotationId, pillar);
}
export function getCardsForDomain(rotationId, domain) {
    return _getCardsForDomain(rotationId, domain);
}
export function getDrill(rotationId, drillId) {
    return _getDrill(rotationId, drillId);
}
// ===================================================================
// Lightweight progress tracker (localStorage)
// ===================================================================
const REVIEWED_KEY = (cardId) => `mymedkitt-learn-card-${cardId}-reviewed`;
const MODE_KEY = 'mymedkitt-learn-mode';
const DRILL_BEST_KEY = (drillId) => `mymedkitt-learn-drill-${drillId}-best`;
const PRE_ROUND_TEMPLATE_KEY = (rotationId) => `mymedkitt-learn-preround-template-${rotationId}`;
export function getLearnMode() {
    try {
        const v = localStorage.getItem(MODE_KEY);
        return v === 'domain' ? 'domain' : 'action';
    }
    catch {
        return 'action';
    }
}
export function setLearnMode(mode) {
    try {
        localStorage.setItem(MODE_KEY, mode);
    }
    catch {
        /* no-op */
    }
}
export function isCardReviewed(cardId) {
    try {
        return localStorage.getItem(REVIEWED_KEY(cardId)) === '1';
    }
    catch {
        return false;
    }
}
export function setCardReviewed(cardId, reviewed) {
    try {
        if (reviewed)
            localStorage.setItem(REVIEWED_KEY(cardId), '1');
        else
            localStorage.removeItem(REVIEWED_KEY(cardId));
    }
    catch {
        /* no-op */
    }
}
export function getCompletionStats(rotationId) {
    const cards = getAllCardsForRotation(rotationId);
    const stats = {
        total: cards.length,
        reviewed: 0,
        byDomain: {},
        byPillar: {},
    };
    for (const c of cards) {
        const reviewed = isCardReviewed(c.id);
        if (reviewed)
            stats.reviewed += 1;
        if (!stats.byDomain[c.domain])
            stats.byDomain[c.domain] = { total: 0, reviewed: 0 };
        stats.byDomain[c.domain].total += 1;
        if (reviewed)
            stats.byDomain[c.domain].reviewed += 1;
        if (!stats.byPillar[c.pillar])
            stats.byPillar[c.pillar] = { total: 0, reviewed: 0 };
        stats.byPillar[c.pillar].total += 1;
        if (reviewed)
            stats.byPillar[c.pillar].reviewed += 1;
    }
    return stats;
}
export function getDrillBestScore(drillId) {
    try {
        const v = localStorage.getItem(DRILL_BEST_KEY(drillId));
        if (!v)
            return null;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
    }
    catch {
        return null;
    }
}
export function recordDrillScore(drillId, score) {
    try {
        const prev = getDrillBestScore(drillId) ?? -Infinity;
        if (score > prev)
            localStorage.setItem(DRILL_BEST_KEY(drillId), String(score));
    }
    catch {
        /* no-op */
    }
}
export function getPreRoundTemplate(rotationId) {
    try {
        return localStorage.getItem(PRE_ROUND_TEMPLATE_KEY(rotationId)) ?? 'standard';
    }
    catch {
        return 'standard';
    }
}
export function setPreRoundTemplate(rotationId, templateId) {
    try {
        localStorage.setItem(PRE_ROUND_TEMPLATE_KEY(rotationId), templateId);
    }
    catch {
        /* no-op */
    }
}
