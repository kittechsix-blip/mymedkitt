// myMedKitt — MSE Dictation Formatter
// Pure function: walks the MSE builder answers and produces clinical-prose text
// suitable for reading aloud while dictating into an EMR.
/** Ordered list of MSE builder nodes — drives the order of domains in the output. */
export const MSE_BUILDER_DOMAINS = [
    { nodeId: 'mse-build-appearance', label: 'Appearance' },
    { nodeId: 'mse-build-behavior', label: 'Behavior' },
    { nodeId: 'mse-build-speech', label: 'Speech' },
    { nodeId: 'mse-build-mood', label: 'Mood' },
    { nodeId: 'mse-build-affect', label: 'Affect' },
    { nodeId: 'mse-build-thought-process', label: 'Thought process' },
    { nodeId: 'mse-build-thought-content', label: 'Thought content' },
    { nodeId: 'mse-build-perceptions', label: 'Perceptions' },
    { nodeId: 'mse-build-cognition', label: 'Cognition' },
    { nodeId: 'mse-build-insight-judgment-risk', label: 'Insight, judgment & risk' },
];
/** Phrase substrings that mark a high-risk finding when present in selections. */
const CRITICAL_PHRASES = [
    'active suicidal ideation with plan',
    'active suicidal ideation with plan and intent',
    'active homicidal ideation with plan',
    'command auditory hallucinations to harm self',
    'command auditory hallucinations to harm others',
];
const EXCLUSIVE_GROUPS = [
    ['denies suicidal ideation', 'passive suicidal ideation', 'active suicidal ideation without plan', 'active suicidal ideation with plan', 'active suicidal ideation with plan and intent'],
    ['denies homicidal ideation', 'passive homicidal ideation', 'active homicidal ideation without plan', 'active homicidal ideation with plan'],
    ['illusions present', 'no illusions'],
    ['alert and oriented to person, place, time, and situation', 'oriented to person, place, and time', 'oriented to person and place only', 'oriented to person only', 'disoriented'],
    ['attention intact', 'attention impaired'],
    ['good insight', 'fair insight', 'poor insight'],
    ['intact judgment', 'fair judgment', 'impaired judgment'],
    ['LOW suicide risk — no SI/HI, no plan, protective factors present', 'MODERATE suicide risk — passive SI or prior attempts, limited protective factors', 'HIGH suicide risk — active SI with plan, intent, or command AH; admission and safety planning indicated'],
];
const NEGATIVE_FINDING_CONFLICTS = [
    {
        negative: 'no delusions',
        positives: ['paranoid delusions', 'grandiose delusions', 'somatic delusions', 'religious delusions', 'erotomanic delusions', 'ideas of reference'],
    },
    {
        negative: 'denies hallucinations',
        positives: ['non-command auditory hallucinations', 'command auditory hallucinations without harm content', 'command auditory hallucinations to harm self', 'command auditory hallucinations to harm others', 'visual hallucinations', 'tactile hallucinations', 'olfactory hallucinations'],
    },
    {
        negative: 'memory intact (immediate, recent, remote)',
        positives: ['short-term memory impairment', 'long-term memory impairment'],
    },
];
function asStringArray(value) {
    if (Array.isArray(value)) {
        return value.filter((v) => typeof v === 'string');
    }
    return [];
}
function sanitizePhrases(phrases) {
    let sanitized = [...phrases];
    for (const group of EXCLUSIVE_GROUPS) {
        const lastSelected = [...sanitized].reverse().find(phrase => group.includes(phrase));
        if (lastSelected) {
            sanitized = sanitized.filter(phrase => !group.includes(phrase) || phrase === lastSelected);
        }
    }
    for (const rule of NEGATIVE_FINDING_CONFLICTS) {
        const negativeIndex = sanitized.lastIndexOf(rule.negative);
        if (negativeIndex === -1)
            continue;
        const positiveIndexes = rule.positives
            .map(positive => sanitized.lastIndexOf(positive))
            .filter(index => index !== -1);
        if (positiveIndexes.length === 0)
            continue;
        const lastPositiveIndex = Math.max(...positiveIndexes);
        if (negativeIndex > lastPositiveIndex) {
            sanitized = sanitized.filter(phrase => !rule.positives.includes(phrase));
        }
        else {
            sanitized = sanitized.filter(phrase => phrase !== rule.negative);
        }
    }
    return sanitized;
}
function containsCritical(phrases) {
    for (const phrase of phrases) {
        const lower = phrase.toLowerCase();
        for (const critical of CRITICAL_PHRASES) {
            if (lower.includes(critical))
                return true;
        }
    }
    return false;
}
/**
 * Build a clinical-prose dictation summary from the MSE builder answers.
 * Domains with no selections are listed as "not assessed" so the clinician
 * can see at a glance which sections still need attention.
 */
export function buildMseDictation(answers) {
    const lines = [];
    let hasCritical = false;
    lines.push('Mental Status Exam:');
    lines.push('');
    for (const domain of MSE_BUILDER_DOMAINS) {
        const phrases = sanitizePhrases(asStringArray(answers[domain.nodeId]));
        if (phrases.length === 0) {
            lines.push(`${domain.label}: not assessed.`);
            continue;
        }
        if (containsCritical(phrases))
            hasCritical = true;
        lines.push(`${domain.label}: ${phrases.join('; ')}.`);
    }
    return {
        text: lines.join('\n'),
        hasCritical,
    };
}
