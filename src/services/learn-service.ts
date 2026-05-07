// myMedKitt — MedKitt Learn data accessor
// Thin wrapper over the hardcoded rotations data file. No three-tier fallback
// in v1 — content lives in src/data/learn-rotations.ts only. Promote to
// Supabase once content stabilizes and we want over-the-air updates.

import {
  getAllLearnRotations,
  getLearnRotation as _getRotation,
  getStudentCard as _getCard,
  getCardsForSection as _getCardsForSection,
  getAllCardsForRotation as _getAllCardsForRotation,
} from '../data/learn-rotations.js';
import type { LearnRotation, StudentCard } from '../data/learn-rotations.js';

export type { LearnRotation, StudentCard, PimpQuestion, LearnSection } from '../data/learn-rotations.js';

export function listRotations(): LearnRotation[] {
  return getAllLearnRotations();
}

export function getRotation(id: string): LearnRotation | undefined {
  return _getRotation(id);
}

export function getCard(id: string): StudentCard | undefined {
  return _getCard(id);
}

export function getCardsForSection(rotationId: string, sectionId: string): StudentCard[] {
  return _getCardsForSection(rotationId, sectionId);
}

export function getAllCardsForRotation(rotationId: string): StudentCard[] {
  return _getAllCardsForRotation(rotationId);
}
