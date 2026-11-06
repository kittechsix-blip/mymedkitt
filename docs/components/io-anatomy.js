import { IO_SITES, IO_SAFETY, IO_CONFIRM, IO_SOURCES } from '../data/io-anatomy.js';
export const IO_ANATOMY_TOOL = {
    id: 'io-anatomy', title: 'IO Anatomy', subtitle: 'Landmark → position → trajectory → confirm',
    description: 'Choose an IO site for a labeled anatomical schematic and device-specific placement guidance. Diagrams are not to scale and do not determine insertion depth.',
    fields: [], results: [], thresholdNote: IO_SAFETY, citations: IO_SOURCES,
    customRender(container) {
        const label = document.createElement('label');
        label.htmlFor = 'io-anatomy-site';
        label.textContent = 'Choose IO site';
        label.style.fontWeight = '700';
        const select = document.createElement('select');
        select.id = 'io-anatomy-site';
        select.style.cssText = 'display:block;width:100%;min-height:48px;margin:8px 0 18px;padding:10px;font-size:17px;border:1px solid var(--color-umber);border-radius:10px;color:var(--color-text);background:var(--color-bg)';
        IO_SITES.forEach(site => { const option = document.createElement('option'); option.value = site.id; option.textContent = site.title; select.append(option); });
        const detail = document.createElement('section');
        detail.setAttribute('aria-live', 'polite');
        const render = () => {
            const site = IO_SITES.find(s => s.id === select.value) ?? IO_SITES[0];
            detail.replaceChildren();
            const heading = document.createElement('h2');
            heading.textContent = site.title;
            detail.append(heading);
            const img = document.createElement('img');
            img.src = 'images/difficult-vascular-access/' + site.image;
            img.alt = site.title + ': anatomical landmarks and insertion target; schematic, not to scale';
            img.style.cssText = 'width:100%;height:auto;display:block;border-radius:12px;background:#fff8f2';
            detail.append(img);
            const full = document.createElement('a');
            full.href = img.src;
            full.target = '_blank';
            full.rel = 'noopener';
            full.textContent = 'Open full-size diagram';
            full.style.cssText = 'display:inline-block;padding:12px 0;color:var(--color-umber);font-weight:700';
            detail.append(full);
            const note = document.createElement('p');
            note.textContent = 'Original teaching schematic. Palpation and device instructions determine the actual target; never estimate insertion depth from this image.';
            note.style.fontSize = '13px';
            detail.append(note);
            for (const [title, text] of [['1 · Position', site.position], ['2 · Adult / larger-child landmarks', site.adult], ['Pediatric differences', site.pediatric], ['3 · Needle direction', site.trajectory], ['Avoid these placement errors', site.pitfalls], ['4 · Insert, confirm and monitor', IO_CONFIRM]]) {
                const h = document.createElement('h3');
                h.textContent = title;
                h.style.marginTop = '20px';
                const p = document.createElement('p');
                p.textContent = text;
                p.style.lineHeight = '1.6';
                detail.append(h, p);
            }
        };
        select.addEventListener('change', render);
        container.append(label, select, detail);
        render();
    },
};
