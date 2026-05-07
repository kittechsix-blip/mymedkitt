// myMedKitt — MedKitt Learn pre-round template (psychiatry)
// Static psych pre-rounding checklist. Scratch text lives in sessionStorage
// only and clears on tab close. Visible warning banner — DO NOT type PHI.
import { getRotation } from '../services/learn-service.js';
import { router } from '../services/router.js';
const SESSION_KEY_PREFIX = 'mymedkitt-learn-preround-';
const PSYCH_FIELDS = [
    { id: 'cue', label: 'Patient cue (NO names — use "Bed 3", "Pt A", etc.)', type: 'text', placeholder: 'Bed 3' },
    { id: 'legal', label: 'Legal status', type: 'radio', options: ['Voluntary', 'EDO', 'Certification', 'Not applicable'] },
    { id: 'sleep', label: 'Sleep last night (hours)', type: 'number', placeholder: 'e.g., 4' },
    { id: 'meals', label: 'Meal intake', type: 'radio', options: ['None', 'Partial', 'Full'] },
    { id: 'group', label: 'Group attendance', type: 'radio', options: ['Yes', 'No', 'N/A'] },
    { id: 'prn', label: 'PRN psych meds in last 24h', type: 'textarea', placeholder: 'e.g., Lorazepam 2 mg PO x1 for anxiety at 2am' },
    { id: 'mse', label: 'MSE delta from yesterday', type: 'textarea', placeholder: 'e.g., Affect brighter, less guarded; speech still pressured' },
    { id: 'sihi', label: 'SI / HI re-screen', type: 'radio', options: ['None', 'Passive', 'Active no plan', 'Active with plan'] },
    { id: 'capacity', label: 'Capacity', type: 'radio', options: ['Intact', 'Impaired', 'Not assessed'] },
    { id: 'withdrawal', label: 'Substance withdrawal scale + score (CIWA / COWS)', type: 'text', placeholder: 'e.g., CIWA 6' },
    { id: 'dispo', label: 'Disposition barrier', type: 'textarea', placeholder: 'e.g., Awaiting subacute placement; insurance denied' },
];
export function renderLearnPreRound(container, rotationId) {
    container.innerHTML = '';
    const rotation = getRotation(rotationId);
    const page = document.createElement('div');
    page.className = 'learn-preround';
    // Header
    const header = document.createElement('div');
    header.className = 'learn-card__header';
    const back = document.createElement('button');
    back.className = 'learn-back-btn';
    back.type = 'button';
    back.textContent = `← ${rotation?.name ?? 'Back'}`;
    back.addEventListener('click', () => router.navigate(`/learn/${rotationId}`));
    header.appendChild(back);
    const title = document.createElement('h1');
    title.className = 'learn-card__title';
    title.textContent = 'Psych Pre-Round Template';
    header.appendChild(title);
    page.appendChild(header);
    // Privacy banner
    const banner = document.createElement('div');
    banner.className = 'learn-preround__banner';
    const bannerIcon = document.createElement('span');
    bannerIcon.className = 'learn-preround__banner-icon';
    bannerIcon.textContent = '🛑';
    bannerIcon.setAttribute('aria-hidden', 'true');
    banner.appendChild(bannerIcon);
    const bannerText = document.createElement('div');
    bannerText.className = 'learn-preround__banner-text';
    bannerText.textContent = 'Do not type identifying patient information. This page does not save anything when you close the tab.';
    banner.appendChild(bannerText);
    page.appendChild(banner);
    // Form fields
    const form = document.createElement('div');
    form.className = 'learn-preround__form';
    const inputs = [];
    for (const field of PSYCH_FIELDS) {
        const fieldWrap = document.createElement('div');
        fieldWrap.className = 'learn-preround__field';
        const label = document.createElement('label');
        label.className = 'learn-preround__label';
        label.textContent = field.label;
        label.htmlFor = `pr-${field.id}`;
        fieldWrap.appendChild(label);
        const sessionKey = SESSION_KEY_PREFIX + field.id;
        const stored = sessionStorage.getItem(sessionKey) ?? '';
        if (field.type === 'radio' && field.options) {
            const group = document.createElement('div');
            group.className = 'learn-preround__radio-group';
            group.setAttribute('role', 'radiogroup');
            group.setAttribute('aria-label', field.label);
            for (const opt of field.options) {
                const optBtn = document.createElement('button');
                optBtn.className = 'learn-preround__radio-btn';
                optBtn.type = 'button';
                optBtn.textContent = opt;
                if (stored === opt)
                    optBtn.classList.add('selected');
                optBtn.addEventListener('click', () => {
                    group.querySelectorAll('.learn-preround__radio-btn').forEach(b => b.classList.remove('selected'));
                    optBtn.classList.add('selected');
                    sessionStorage.setItem(sessionKey, opt);
                });
                group.appendChild(optBtn);
            }
            fieldWrap.appendChild(group);
            inputs.push(group);
        }
        else if (field.type === 'textarea') {
            const ta = document.createElement('textarea');
            ta.className = 'learn-preround__textarea';
            ta.id = `pr-${field.id}`;
            ta.placeholder = field.placeholder ?? '';
            ta.rows = 2;
            ta.value = stored;
            ta.addEventListener('input', () => {
                sessionStorage.setItem(sessionKey, ta.value);
            });
            fieldWrap.appendChild(ta);
            inputs.push(ta);
        }
        else {
            const input = document.createElement('input');
            input.className = 'learn-preround__input';
            input.id = `pr-${field.id}`;
            input.type = field.type === 'number' ? 'number' : 'text';
            input.placeholder = field.placeholder ?? '';
            input.value = stored;
            input.addEventListener('input', () => {
                sessionStorage.setItem(sessionKey, input.value);
            });
            fieldWrap.appendChild(input);
            inputs.push(input);
        }
        form.appendChild(fieldWrap);
    }
    page.appendChild(form);
    // Clear button
    const actions = document.createElement('div');
    actions.className = 'learn-preround__actions';
    const clearBtn = document.createElement('button');
    clearBtn.className = 'learn-preround__clear-btn';
    clearBtn.type = 'button';
    clearBtn.textContent = 'Clear all fields';
    clearBtn.addEventListener('click', () => {
        for (const field of PSYCH_FIELDS) {
            sessionStorage.removeItem(SESSION_KEY_PREFIX + field.id);
        }
        renderLearnPreRound(container, rotationId);
    });
    actions.appendChild(clearBtn);
    page.appendChild(actions);
    container.appendChild(page);
}
