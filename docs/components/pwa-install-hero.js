// myMedKitt landing install hero.
// Keeps the landing page install section pointed at the actual app shell.

(function () {
  const APP_URL = 'https://kittechsix-blip.github.io/mymedkitt/app.html';
  const DISMISS_KEY = 'mymedkitt-pwa-install-hero-dismissed-at';
  const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
  let deferredPrompt = null;

  function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.indexOf('android-app://') === 0;
  }

  function recentlyDismissed() {
    const value = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    return value > 0 && Date.now() - value < DISMISS_MS;
  }

  function iconSvg() {
    return `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" fill="#0f0f1a"/>
        <path d="M12 7v10M7 12h10" stroke="#00d4aa" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `;
  }

  function renderInstalled(container) {
    container.innerHTML = `
      <div class="pwa-install-installed">
        <div class="pwa-installed-content">
          <div class="pwa-installed-icon">${iconSvg()}</div>
          <div class="pwa-installed-text">myMedKitt is already running as an installed app.</div>
        </div>
      </div>
    `;
  }

  function renderHero(container) {
    container.innerHTML = `
      <div class="pwa-install-hero">
        <button class="pwa-close-hero" type="button" aria-label="Dismiss install prompt">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="pwa-hero-content">
          <div class="pwa-app-preview">
            <div class="pwa-app-icon-large">${iconSvg()}</div>
            <div class="pwa-app-icon-shadow"></div>
            <div class="pwa-icon-label">
              <span class="pwa-icon-label-text">myMedKitt</span>
            </div>
          </div>
          <div class="pwa-hero-text">
            <h2 class="pwa-hero-title">Open the clinical app</h2>
            <p class="pwa-hero-subtitle">The QR and install button open the actual PWA app, not this marketing page.</p>
            <div class="pwa-features">
              <span class="pwa-feature">Offline-ready</span>
              <span class="pwa-feature">Home-screen install</span>
              <span class="pwa-feature">No login required</span>
            </div>
          </div>
        </div>
        <div class="pwa-hero-actions">
          <button class="pwa-install-btn" type="button">
            <span class="pwa-install-btn-text">Open myMedKitt App</span>
            <span class="pwa-install-btn-subtext">Then Add to Home Screen</span>
          </button>
          <div class="pwa-qr-section">
            <div class="pwa-qr-label">Phone camera QR</div>
            <div class="pwa-qr-code">
              <img src="assets/qr-install.svg" alt="QR code opening myMedKitt app" width="176" height="176">
            </div>
            <div class="pwa-qr-hint">${APP_URL}</div>
          </div>
        </div>
      </div>
    `;

    const openButton = container.querySelector('.pwa-install-btn');
    openButton?.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice.catch(() => undefined);
        deferredPrompt = null;
      }
      window.location.href = APP_URL;
    });

    const closeButton = container.querySelector('.pwa-close-hero');
    closeButton?.addEventListener('click', () => {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
      container.innerHTML = `
        <div class="pwa-install-minimized">
          <button class="pwa-minimized-btn" type="button">
            <span class="pwa-minimized-icon">${iconSvg()}</span>
            <span class="pwa-minimized-text">Open app</span>
          </button>
        </div>
      `;
      container.querySelector('.pwa-minimized-btn')?.addEventListener('click', () => {
        window.localStorage.removeItem(DISMISS_KEY);
        renderHero(container);
      });
    });
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('pwa-install-hero');
    if (!container) return;
    if (isInstalled()) {
      renderInstalled(container);
      return;
    }
    renderHero(container);
    if (recentlyDismissed()) {
      container.querySelector('.pwa-close-hero')?.click();
    }
  });
})();
