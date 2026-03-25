/**
 * Exit Intent Modal
 * Shows "Before you go..." modal when user attempts to leave the app
 * Encourages PWA install, rating, sharing
 */
let isModalOpen = false;
let lastShownTime = 0;
let hasShownThisSession = false;
let exitIntentEnabled = true;
const COOLDOWN_KEY = 'exit-intent-cooldown';
const DISMISSED_COUNT_KEY = 'exit-intent-dismissed-count';
/**
 * Initialize exit intent detection
 */
export function initExitIntent(config) {
    // Don't initialize if already done
    if (!exitIntentEnabled)
        return;
    // Check cooldown
    const cooldownMs = (config.cooldownMinutes || 60) * 60 * 1000;
    const lastCooldown = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
    if (Date.now() - lastCooldown < cooldownMs) {
        return; // Still in cooldown period
    }
    // Check if should show only once per session
    if (config.showOnce && hasShownThisSession) {
        return;
    }
    // Desktop: Detect mouse leaving viewport at top
    document.addEventListener('mouseout', (e) => {
        handleMouseOut(e, config);
    });
    // Mobile: Detect back button or swipe gestures
    if ('ontouchstart' in window) {
        let touchStartX = 0;
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        document.addEventListener('touchmove', (e) => {
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            // Detect swipe from left edge (back gesture on iOS)
            if (touchStartX < 50 && deltaX > 100 && Math.abs(deltaY) < 50) {
                handleExitIntent(config);
            }
        });
        // Back button detection
        window.addEventListener('popstate', () => {
            handleExitIntent(config);
        });
    }
    // Visibility change (tab switch, app minimize)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            handleExitIntent(config);
        }
    });
}
/**
 * Handle mouse leaving viewport
 */
function handleMouseOut(e, config) {
    // Only trigger if mouse leaves from top (attempting to close tab/window)
    if (e.clientY < 10 && !isModalOpen) {
        handleExitIntent(config);
    }
}
/**
 * Show exit intent modal
 */
function handleExitIntent(config) {
    // Throttle - don't show more than once per 5 seconds
    const now = Date.now();
    if (now - lastShownTime < 5000)
        return;
    // Don't show if modal already open
    if (isModalOpen)
        return;
    // Check if should show only once per session
    if (config.showOnce && hasShownThisSession)
        return;
    lastShownTime = now;
    hasShownThisSession = true;
    showExitIntentModal(config);
}
/**
 * Render and show the exit intent modal
 */
function showExitIntentModal(config) {
    isModalOpen = true;
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'exit-intent-overlay';
    overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease-out;
  `;
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'exit-intent-modal';
    modal.style.cssText = `
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    max-width: 440px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;
    position: relative;
  `;
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'exit-intent-close';
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 32px;
    line-height: 1;
    color: #999;
    cursor: pointer;
    padding: 4px 8px;
    transition: color 0.2s;
  `;
    closeBtn.addEventListener('click', () => closeModal(overlay));
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = '#333';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = '#999';
    });
    modal.appendChild(closeBtn);
    // Emoji icon
    const icon = document.createElement('div');
    icon.style.cssText = `
    font-size: 48px;
    text-align: center;
    margin-bottom: 16px;
  `;
    icon.textContent = '👋';
    modal.appendChild(icon);
    // Title
    const title = document.createElement('h2');
    title.style.cssText = `
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin: 0 0 12px 0;
    color: #1d1d1f;
  `;
    title.textContent = config.title;
    modal.appendChild(title);
    // Message
    const message = document.createElement('p');
    message.style.cssText = `
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    color: #666;
    margin: 0 0 24px 0;
  `;
    message.textContent = config.message;
    modal.appendChild(message);
    // Actions
    const actionsContainer = document.createElement('div');
    actionsContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;
    for (const actionConfig of config.actions) {
        const button = document.createElement('button');
        button.className = `exit-intent-action exit-intent-action--${actionConfig.type}`;
        const isPrimary = actionConfig.type === 'primary';
        const isLink = actionConfig.type === 'link';
        button.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: ${isLink ? '8px 16px' : '14px 24px'};
      border-radius: ${isLink ? '6px' : '12px'};
      border: ${isLink ? 'none' : isPrimary ? 'none' : '1px solid #ddd'};
      background: ${isPrimary ? 'var(--color-primary, #007aff)' : isLink ? 'transparent' : 'white'};
      color: ${isPrimary ? 'white' : isLink ? 'var(--color-primary, #007aff)' : '#333'};
      font-size: ${isLink ? '14px' : '16px'};
      font-weight: ${isLink ? '500' : '600'};
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
    `;
        // Icon
        const iconSpan = document.createElement('span');
        iconSpan.textContent = actionConfig.icon;
        iconSpan.style.fontSize = isLink ? '14px' : '18px';
        button.appendChild(iconSpan);
        // Label
        const labelSpan = document.createElement('span');
        labelSpan.textContent = actionConfig.label;
        button.appendChild(labelSpan);
        // Hover effects
        button.addEventListener('mouseenter', () => {
            if (isPrimary) {
                button.style.background = 'var(--color-primary-dark, #0051d5)';
                button.style.transform = 'translateY(-1px)';
                button.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
            }
            else if (isLink) {
                button.style.background = 'rgba(0, 122, 255, 0.08)';
            }
            else {
                button.style.background = '#f5f5f5';
                button.style.borderColor = '#ccc';
            }
        });
        button.addEventListener('mouseleave', () => {
            if (isPrimary) {
                button.style.background = 'var(--color-primary, #007aff)';
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            }
            else if (isLink) {
                button.style.background = 'transparent';
            }
            else {
                button.style.background = 'white';
                button.style.borderColor = '#ddd';
            }
        });
        button.addEventListener('click', () => {
            actionConfig.action();
            closeModal(overlay);
            trackDismissal(actionConfig.id);
        });
        actionsContainer.appendChild(button);
    }
    modal.appendChild(actionsContainer);
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
    document.head.appendChild(style);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay);
            trackDismissal('overlay-click');
        }
    });
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(overlay);
            trackDismissal('escape-key');
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}
/**
 * Close modal
 */
function closeModal(overlay) {
    overlay.style.animation = 'fadeOut 0.2s ease-out';
    overlay.addEventListener('animationend', () => {
        overlay.remove();
    });
    isModalOpen = false;
    // Set cooldown
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
}
/**
 * Track dismissal
 */
function trackDismissal(actionId) {
    const count = parseInt(localStorage.getItem(DISMISSED_COUNT_KEY) || '0', 10);
    localStorage.setItem(DISMISSED_COUNT_KEY, (count + 1).toString());
    // Optional: Send analytics
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'exit_intent_action', {
            action_id: actionId,
            dismissal_count: count + 1,
        });
    }
}
/**
 * Disable exit intent (for testing or user preference)
 */
export function disableExitIntent() {
    exitIntentEnabled = false;
}
/**
 * Reset exit intent state (for testing)
 */
export function resetExitIntent() {
    hasShownThisSession = false;
    lastShownTime = 0;
    localStorage.removeItem(COOLDOWN_KEY);
    localStorage.removeItem(DISMISSED_COUNT_KEY);
}
