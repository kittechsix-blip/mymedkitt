// myMedKitt — MedKitt Learn data accessor
// Thin wrapper over the hardcoded rotations data file. No three-tier fallback
// in v1 — content lives in src/data/learn-rotations.ts only. Promote to
// Supabase once content stabilizes and we want over-the-air updates.
import { getAllLearnRotations, getLearnRotation as _getRotation, getStudentCard as _getCard, getCardsForSection as _getCardsForSection, getAllCardsForRotation as _getAllCardsForRotation, } from '../data/learn-rotations.js';
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
