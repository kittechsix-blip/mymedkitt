/**
 * Dosing Banner — Sticky summary of key dosing info
 * Shows extracted doses from current consult for quick reference.
 * Persists at top of card stack so user never loses the dose.
 */
let bannerEl = null;
/** Regex patterns to extract dosing info */
const DOSE_PATTERNS = [
    // mg/kg patterns
    /(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?)\s*mg\/kg/gi,
    // mcg/kg patterns
    /(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?)\s*mcg\/kg/gi,
    // Fixed dose patterns (e.g., "5 mg IV", "100 mg PO")
    /(\d+(?:\.\d+)?)\s*mg\s+(IV|IM|PO|SQ|SC|IN|PR)/gi,
    // Drip rates
    /(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?)\s*(mcg|mg)\/min/gi,
    /(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?)\s*(mcg|mg)\/kg\/min/gi,
];
/** Drug name patterns to associate with doses */
const DRUG_KEYWORDS = [
    'metoprolol', 'diltiazem', 'amiodarone', 'adenosine', 'epinephrine', 'norepinephrine',
    'fentanyl', 'morphine', 'ketamine', 'propofol', 'etomidate', 'rocuronium', 'succinylcholine',
    'heparin', 'enoxaparin', 'tpa', 'alteplase', 'tenecteplase', 'ceftriaxone', 'vancomycin',
    'hydrocortisone', 'dexamethasone', 'methylprednisolone', 'magnesium', 'calcium', 'bicarb',
    'lovenox', 'levophed', 'lopressor', 'cardizem', 'narcan', 'naloxone',
];
/** Extract dosing info from a node's text content */
export function extractDosing(node) {
    const entries = [];
    const text = [node.body, node.recommendation, node.title].filter(Boolean).join(' ');
    if (!text)
        return entries;
    const textLower = text.toLowerCase();
    const seen = new Set();
    // Look for drug names near dose patterns
    for (const drugName of DRUG_KEYWORDS) {
        if (textLower.includes(drugName)) {
            // Find dose patterns near this drug mention
            for (const pattern of DOSE_PATTERNS) {
                pattern.lastIndex = 0;
                let match;
                while ((match = pattern.exec(text)) !== null) {
                    // Check if drug name is within ~100 chars of this dose
                    const dosePos = match.index;
                    const drugPos = textLower.indexOf(drugName);
                    if (Math.abs(dosePos - drugPos) < 100) {
                        const key = `${drugName}-${match[0]}`;
                        if (!seen.has(key)) {
                            seen.add(key);
                            entries.push({
                                drug: drugName.charAt(0).toUpperCase() + drugName.slice(1),
                                dose: match[0],
                                route: extractRoute(text, match.index),
                            });
                        }
                    }
                }
            }
        }
    }
    // If no drug-associated doses found, extract standalone doses
    if (entries.length === 0) {
        for (const pattern of DOSE_PATTERNS) {
            pattern.lastIndex = 0;
            let match;
            while ((match = pattern.exec(text)) !== null) {
                const key = match[0];
                if (!seen.has(key)) {
                    seen.add(key);
                    entries.push({
                        drug: '',
                        dose: match[0],
                        route: extractRoute(text, match.index),
                    });
                }
                if (entries.length >= 3)
                    break;
            }
            if (entries.length >= 3)
                break;
        }
    }
    return entries.slice(0, 3); // Max 3 entries
}
/** Extract route (IV, IM, PO, etc.) near a dose */
function extractRoute(text, nearIndex) {
    const nearby = text.slice(Math.max(0, nearIndex - 30), nearIndex + 50);
    const routeMatch = nearby.match(/\b(IV|IM|PO|SQ|SC|IN|PR|IO|ETT)\b/i);
    return routeMatch ? routeMatch[1].toUpperCase() : undefined;
}
/** Render the sticky dosing banner */
export function renderDosingBanner(container, nodes) {
    removeDosingBanner();
    // Collect dosing from all provided nodes
    const allEntries = [];
    for (const node of nodes) {
        const entries = extractDosing(node);
        allEntries.push(...entries);
    }
    // Dedupe and limit
    const unique = [];
    const seen = new Set();
    for (const entry of allEntries) {
        const key = `${entry.drug}-${entry.dose}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(entry);
        }
        if (unique.length >= 4)
            break;
    }
    if (unique.length === 0)
        return; // No dosing to show
    const banner = document.createElement('div');
    banner.className = 'dosing-banner';
    const label = document.createElement('span');
    label.className = 'dosing-banner__label';
    label.textContent = 'Dosing:';
    banner.appendChild(label);
    const pills = document.createElement('div');
    pills.className = 'dosing-banner__pills';
    for (const entry of unique) {
        const pill = document.createElement('button');
        pill.className = 'dosing-banner__pill';
        let text = entry.dose;
        if (entry.drug)
            text = `${entry.drug} ${text}`;
        if (entry.route)
            text += ` ${entry.route}`;
        pill.textContent = text;
        // Copy to clipboard on tap
        pill.addEventListener('click', () => {
            navigator.clipboard.writeText(text).then(() => {
                pill.classList.add('dosing-banner__pill--copied');
                setTimeout(() => pill.classList.remove('dosing-banner__pill--copied'), 1000);
            }).catch(() => { });
        });
        pills.appendChild(pill);
    }
    banner.appendChild(pills);
    // Insert after the header
    const header = container.querySelector('.consult-flow-header');
    if (header && header.nextSibling) {
        header.parentNode?.insertBefore(banner, header.nextSibling);
    }
    else {
        container.prepend(banner);
    }
    bannerEl = banner;
}
/** Remove the dosing banner */
export function removeDosingBanner() {
    bannerEl?.remove();
    bannerEl = null;
}
/** Check if banner is currently visible */
export function hasDosingBanner() {
    return bannerEl !== null;
}
