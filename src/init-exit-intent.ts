/**
 * Initialize Exit Intent Modal
 * Shows "Before you go..." modal when user attempts to leave
 */

import { initExitIntent, ExitIntentConfig } from './components/exit-intent.js';
import {
  showPWAInstallPrompt,
  triggerIOSInstall,
  checkIfPWA,
  initPWAInstall,
} from './services/pwa-install.js';

/**
 * Initialize exit intent detection
 */
export function setupExitIntent(): void {
  // Initialize PWA install prompt capture
  initPWAInstall();

  // Don't show exit intent if already installed as PWA
  if (checkIfPWA()) {
    console.log('[Exit Intent] Disabled - running as installed PWA');
    return;
  }

  const config: ExitIntentConfig = {
    title: 'Before you go...',
    message: 'myMedKitt helps you save time in the ED. Add it to your home screen for instant access!',
    showOnce: false, // Show multiple times (with cooldown)
    cooldownMinutes: 60, // Don't show again for 1 hour after dismissal
    actions: [
      {
        id: 'install-pwa',
        label: 'Add to Home Screen',
        icon: '📱',
        type: 'primary',
        action: () => {
          const ua = navigator.userAgent;
          if (/iPhone|iPad|iPod/.test(ua)) {
            triggerIOSInstall();
          } else {
            showPWAInstallPrompt();
          }
        },
      },
      {
        id: 'rate-app',
        label: 'Rate on App Store',
        icon: '⭐',
        type: 'secondary',
        action: () => {
          // TODO: Replace with actual App Store link when published
          window.open('https://apps.apple.com/app/mymedkitt', '_blank');
        },
      },
      {
        id: 'share',
        label: 'Share with Colleagues',
        icon: '📢',
        type: 'secondary',
        action: () => {
          if (navigator.share) {
            navigator.share({
              title: 'myMedKitt',
              text: 'Check out myMedKitt - clinical decision support for emergency medicine',
              url: window.location.origin,
            }).catch(() => {
              // User cancelled or share failed
            });
          } else {
            // Fallback - copy link to clipboard
            navigator.clipboard.writeText(window.location.origin).then(() => {
              alert('Link copied to clipboard!');
            });
          }
        },
      },
      {
        id: 'dismiss',
        label: "No thanks, I'm good",
        icon: '👍',
        type: 'link',
        action: () => {
          // Just closes the modal
        },
      },
    ],
  };

  // Initialize exit intent with config
  initExitIntent(config);
}
