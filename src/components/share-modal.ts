// myMedKitt — Share & Install Modal
// Shows a QR code + URL + Copy button + Add-to-Home-Screen instructions
// so other users can scan to load the PWA on their phone.

const INSTALL_URL = 'https://kittechsix-blip.github.io/mymedkitt/app.html';

/** Show the share/install modal as a full-screen overlay. */
export function showShareModal(): void {
  // Prevent duplicate modals
  if (document.getElementById('share-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'share-modal-overlay';
  overlay.className = 'share-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'share-modal-title');

  const sheet = document.createElement('div');
  sheet.className = 'share-modal';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'share-modal__close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', closeModal);
  sheet.appendChild(closeBtn);

  // Title
  const title = document.createElement('h2');
  title.id = 'share-modal-title';
  title.className = 'share-modal__title';
  title.textContent = 'Share & Install myMedKitt';
  sheet.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'share-modal__subtitle';
  subtitle.textContent = 'Scan this QR code with any phone camera to open myMedKitt. Add to Home Screen for the full app experience.';
  sheet.appendChild(subtitle);

  // QR image
  const qrWrap = document.createElement('div');
  qrWrap.className = 'share-modal__qr-wrap';
  const qrImg = document.createElement('img');
  qrImg.className = 'share-modal__qr';
  qrImg.src = 'assets/qr-install.svg';
  qrImg.alt = 'QR code to install myMedKitt';
  qrImg.width = 240;
  qrImg.height = 240;
  qrWrap.appendChild(qrImg);
  sheet.appendChild(qrWrap);

  // URL row + copy
  const urlRow = document.createElement('div');
  urlRow.className = 'share-modal__url-row';

  const urlText = document.createElement('span');
  urlText.className = 'share-modal__url';
  urlText.textContent = INSTALL_URL;
  urlRow.appendChild(urlText);

  const copyBtn = document.createElement('button');
  copyBtn.className = 'share-modal__copy';
  copyBtn.type = 'button';
  copyBtn.textContent = 'Copy';
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_URL);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    } catch {
      copyBtn.textContent = 'Copy failed';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    }
  });
  urlRow.appendChild(copyBtn);
  sheet.appendChild(urlRow);

  // Instructions
  const instructions = document.createElement('div');
  instructions.className = 'share-modal__instructions';
  instructions.innerHTML = `
    <div class="share-modal__instructions-title">Add to Home Screen</div>
    <ol class="share-modal__steps">
      <li><strong>iPhone (Safari):</strong> tap the Share icon, then "Add to Home Screen".</li>
      <li><strong>Android (Chrome):</strong> tap the three-dot menu, then "Install app" or "Add to Home Screen".</li>
    </ol>
  `;
  sheet.appendChild(instructions);

  // Native share button (if supported)
  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-modal__native-share';
    shareBtn.type = 'button';
    shareBtn.textContent = 'Share link…';
    shareBtn.addEventListener('click', async () => {
      try {
        await navigator.share({
          title: 'myMedKitt',
          text: 'Evidence-based clinical decision support',
          url: INSTALL_URL,
        });
      } catch {
        // user cancelled — no-op
      }
    });
    sheet.appendChild(shareBtn);
  }

  overlay.appendChild(sheet);

  // Click outside to close
  overlay.addEventListener('click', (ev) => {
    if (ev.target === overlay) closeModal();
  });

  // Escape to close
  function onKey(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') closeModal();
  }
  document.addEventListener('keydown', onKey);

  function closeModal(): void {
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('hashchange', closeModal);
    overlay.remove();
  }

  // Close on any navigation — the overlay is on document.body, outside the routed
  // view, so it would otherwise persist over the next screen (FlowRider 2026-07-28).
  window.addEventListener('hashchange', closeModal);

  document.body.appendChild(overlay);
}
