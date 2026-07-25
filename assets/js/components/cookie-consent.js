// Cookie Consent — GDPR/CCPA-compliant banner
// Stores user choice in localStorage under 'fc_consent'
// 'accepted' → personalized ads   'declined' → non-personalized ads only
// The AdSense script is NOT loaded until the user makes a choice.

const CONSENT_KEY = 'fc_consent';

/**
 * Call once on DOMContentLoaded.
 * Returns true if consent was already stored (no banner needed).
 * Calls window.__loadAdSense(personalized) once a decision is made.
 */
export function initCookieConsent() {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'declined') {
        window.__loadAdSense(stored === 'accepted');
        return true; // already decided
    }
    renderBanner();
    return false;
}

function renderBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', 'Cookie and advertising consent');
    banner.innerHTML = `
        <div class="cc-inner">
            <div class="cc-text">
                <strong>Cookies &amp; Ads</strong>
                We use Google AdSense and Analytics, which may set cookies to personalise ads
                and measure traffic. <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>
            </div>
            <div class="cc-buttons">
                <button id="cc-decline" class="cc-btn cc-btn-secondary">Essential Only</button>
                <button id="cc-accept"  class="cc-btn cc-btn-primary">Accept All</button>
            </div>
        </div>`;
    document.body.appendChild(banner);

    // Use setTimeout so the element is in the DOM before adding .visible (triggers CSS transition)
    setTimeout(() => banner.classList.add('visible'), 50);

    document.getElementById('cc-accept').addEventListener('click', () => decide('accepted'));
    document.getElementById('cc-decline').addEventListener('click', () => decide('declined'));
}

function decide(choice) {
    localStorage.setItem(CONSENT_KEY, choice);
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.classList.remove('visible');
        setTimeout(() => banner.remove(), 350);
    }
    window.__loadAdSense(choice === 'accepted');
}
