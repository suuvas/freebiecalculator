// Cookie Consent — GDPR/CCPA-compliant banner
// 'accepted' → personalized ads   'declined' → non-personalized ads only

// Key includes version so redesigned banner shows to all existing visitors
const CONSENT_KEY = 'fc_consent_v2';

export function initCookieConsent() {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'declined') {
        window.__loadAdSense(stored === 'accepted');
        return true;
    }
    renderBanner();
    return false;
}

function renderBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
        <div class="cc-inner">
            <p class="cc-text">
                🍪 We use cookies for ads &amp; analytics.
                <a href="/privacy.html" target="_blank" rel="noopener">Learn more</a>
            </p>
            <div class="cc-buttons">
                <button id="cc-decline" class="cc-btn cc-btn-decline">Essential Only</button>
                <button id="cc-accept"  class="cc-btn cc-btn-accept">Accept All</button>
            </div>
        </div>`;
    document.body.appendChild(banner);
    // rAF → next paint: banner is in DOM, transition fires correctly in all browsers
    requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('visible')));
    document.getElementById('cc-accept').addEventListener('click', () => decide('accepted'));
    document.getElementById('cc-decline').addEventListener('click', () => decide('declined'));
}

function decide(choice) {
    localStorage.setItem(CONSENT_KEY, choice);
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.classList.remove('visible');
        setTimeout(() => banner.remove(), 300);
    }
    window.__loadAdSense(choice === 'accepted');
}
