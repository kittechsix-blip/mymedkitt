/**
 * Readability Metrics
 * Measures text complexity using various readability formulas
 */

interface ReadabilityResult {
  fleschKincaid: number;      // Grade level (lower = easier)
  fleschReadingEase: number;  // 0-100 (higher = easier)
  gunningFog: number;         // Grade level
  smog: number;               // Grade level
  avgSentenceLength: number;
  avgSyllablesPerWord: number;
  wordCount: number;
}

export function calculateReadability(text: string): ReadabilityResult {
  // Clean text
  const cleanText = text
    .replace(/[#*`\[\]()]/g, '')  // Remove markdown
    .replace(/\s+/g, ' ')
    .trim();

  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.map(countSyllables);

  const totalSyllables = syllables.reduce((a, b) => a + b, 0);
  const complexWords = syllables.filter(s => s >= 3).length;

  const wordCount = words.length;
  const sentenceCount = sentences.length || 1;
  const avgSentenceLength = wordCount / sentenceCount;
  const avgSyllablesPerWord = totalSyllables / wordCount;

  // Flesch-Kincaid Grade Level
  const fleschKincaid =
    0.39 * avgSentenceLength +
    11.8 * avgSyllablesPerWord -
    15.59;

  // Flesch Reading Ease
  const fleschReadingEase =
    206.835 -
    1.015 * avgSentenceLength -
    84.6 * avgSyllablesPerWord;

  // Gunning Fog Index
  const gunningFog =
    0.4 * (avgSentenceLength + 100 * (complexWords / wordCount));

  // SMOG Index
  const smog =
    1.0430 * Math.sqrt(complexWords * (30 / sentenceCount)) + 3.1291;

  return {
    fleschKincaid: Math.max(0, fleschKincaid),
    fleschReadingEase: Math.min(100, Math.max(0, fleschReadingEase)),
    gunningFog: Math.max(0, gunningFog),
    smog: Math.max(0, smog),
    avgSentenceLength,
    avgSyllablesPerWord,
    wordCount
  };
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;

  // Count vowel groups
  const vowelGroups = word.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // Adjust for silent e
  if (word.endsWith('e')) count--;

  // Adjust for -le endings
  if (word.endsWith('le') && word.length > 2 && !/[aeiouy]/.test(word[word.length - 3])) {
    count++;
  }

  // Adjust for -ed endings
  if (word.endsWith('ed') && !word.endsWith('ted') && !word.endsWith('ded')) {
    count--;
  }

  return Math.max(1, count);
}

/**
 * Compare two texts and return improvement metrics
 */
export function compareReadability(
  original: string,
  revised: string
): {
  original: ReadabilityResult;
  revised: ReadabilityResult;
  improvement: {
    fleschKincaid: number;
    readingEase: number;
  };
} {
  const originalMetrics = calculateReadability(original);
  const revisedMetrics = calculateReadability(revised);

  return {
    original: originalMetrics,
    revised: revisedMetrics,
    improvement: {
      // Negative = better (lower grade level)
      fleschKincaid: originalMetrics.fleschKincaid - revisedMetrics.fleschKincaid,
      // Positive = better (higher reading ease)
      readingEase: revisedMetrics.fleschReadingEase - originalMetrics.fleschReadingEase
    }
  };
}
