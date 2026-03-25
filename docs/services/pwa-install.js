/**
 * PWA Install Prompt Service
 * Handles deferred install prompt and PWA installation flow
 */
let deferredPrompt = null;
let isPWA = false;
/**
 * Check if app is running as installed PWA
 */
export function checkIfPWA() {
    isPWA = window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
    return isPWA;
}
/**
 * Check if PWA is installable
 */
export function isPWAInstallable() {
    return deferredPrompt !== null;
}
/**
 * Initialize PWA install prompt capture
 */
export function initPWAInstall() {
    // Capture the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        console.log('[PWA] Install prompt available');
    });
    // Track successful installation
    window.addEventListener('appinstalled', () => {
        console.log('[PWA] App installed successfully');
        deferredPrompt = null;
        isPWA = true;
    });
}
/**
 * Show PWA install prompt
 */
export async function showPWAInstallPrompt() {
    if (!deferredPrompt) {
        console.warn('[PWA] No install prompt available');
        return false;
    }
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        console.log('[PWA] User accepted install prompt');
        deferredPrompt = null;
        return true;
    }
    else {
        console.log('[PWA] User dismissed install prompt');
        return false;
    }
}
/**
 * Get install instructions for current platform
 */
export function getInstallInstructions() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) {
        return {
            platform: 'iOS',
            instructions: 'Tap the Share button (□↑) and select "Add to Home Screen"',
        };
    }
    else if (/Android/.test(ua)) {
        return {
            platform: 'Android',
            instructions: 'Tap the menu (⋮) and select "Add to Home screen" or "Install app"',
        };
    }
    else if (/Mac/.test(ua)) {
        return {
            platform: 'macOS',
            instructions: 'Click the install icon (⊕) in the address bar',
        };
    }
    else {
        return {
            platform: 'Desktop',
            instructions: 'Click the install icon in your browser\'s address bar',
        };
    }
}
/**
 * Open iOS share sheet or show instructions
 */
export function triggerIOSInstall() {
    const instructions = getInstallInstructions();
    if (instructions.platform === 'iOS') {
        alert(`To install myMedKitt:\n\n${instructions.instructions}`);
    }
    else {
        showPWAInstallPrompt();
    }
}
