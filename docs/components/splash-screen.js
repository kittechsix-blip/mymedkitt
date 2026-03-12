// myMedKitt — Splash Screen
// Dark overlay with centered logo. Fade in 0.5s → hold 1.5s → fade out 0.5s.
// Total duration: ~2.5s. Resolves promise when complete.
/** Show the splash screen, resolves after animation completes (~2.5s total) */
export function showSplashScreen() {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'splash-overlay';
        const content = document.createElement('div');
        content.className = 'splash-content';
        const logo = document.createElement('img');
        logo.className = 'splash-logo';
        logo.src = 'assets/medkitt-bag-logo.png';
        logo.alt = 'myMedKitt';
        const title = document.createElement('div');
        title.className = 'splash-title';
        title.textContent = 'myMedKitt';
        content.appendChild(logo);
        content.appendChild(title);
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        // Phase 1: Fade in (0.5s) — handled by CSS animation on .splash-content
        // Phase 2: Hold (1.5s) then start fade out
        setTimeout(() => {
            overlay.classList.add('splash-overlay--fading');
            // Phase 3: Fade out (0.5s) then remove
            setTimeout(() => {
                overlay.remove();
                resolve();
            }, 500);
        }, 2000); // 0.5s fade-in + 1.5s hold
    });
}
