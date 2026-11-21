// Shared word counter for the transplant page gates. A citation marker is not a word: "[n]", "[a,b]" and "[a, b, c]" are all stripped.
export const CITE_MARKER = /\[\d+(?:\s*,\s*\d+)*\]/g;
export const stripCitations = (s: string): string => s.replace(CITE_MARKER, '');
/** text as a reader sees it: markdown links to their label, no citation markers, no bold, no bullets or pipes */
export const plainText = (s: string): string => stripCitations(s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')).replace(/\*\*/g, '').replace(/[•|]/g, ' ');
export const countWords = (s: string): number => plainText(s).split(/\s+/).filter(Boolean).length;
