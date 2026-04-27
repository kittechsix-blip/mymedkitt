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
function asStringArray(value) {
    if (Array.isArray(value)) {
        return value.filter((v) => typeof v === 'string');
    }
    return [];
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
        const phrases = asStringArray(answers[domain.nodeId]);
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
