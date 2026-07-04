// Ad Slots — Revenue-optimized, AdSense-compliant placement system
// Replace ca-pub-XXXXXXXXXXXXXXXX and slot IDs after AdSense approval

const PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

// Each placement gets its own unique slot ID — required by AdSense policy.
// Create all 8 slots in the AdSense dashboard and paste IDs here after approval.
const SLOT_IDS = {
    top:           '1000000001', // Desktop only: between content sections 1 and 2
    mid:           '1000000002', // Below form / between form and first content section
    result:        '1000000003', // After results — HIGHEST CTR (post-calculation)
    bottom:        '1000000004', // Before related links / pre-footer
    sidebar:       '1000000005', // Desktop sticky sidebar (300×250 / 300×600)
    sticky:        '1000000006', // Mobile anchor bottom banner
    mobileArticle: '1000000007', // Mobile only: mid-content in-article (replaces hidden #ad-top)
    blogMid2:      '1000000008', // Second mid-article ad on long blog posts
};

export function initAdSlots() {
    injectAdCodeIntoSlots();     // wire up #ad-mid (desktop) and #ad-bottom
    injectTopAdBetweenSections();// desktop only: between content sections 1 and 2
    // Mobile in-article ad removed — mobile uses result ad + sticky anchor only
    injectResultAd();            // highest-CTR: after calculation results appear
    injectSidebarAd();           // desktop 300px sticky sidebar
    injectStickyMobileAd();      // mobile anchor bottom banner

    const count = document.querySelectorAll('.ad-slot').length;
    console.log(`Initialized ${count} ad slots`);
}

// ── Inject <ins> tags into existing #ad-mid and #ad-bottom placeholders ───────
// #ad-mid is skipped on mobile (≤900px) — it sits inside the calculator form
// flow on mobile and would block tool usability. CSS also hides it on mobile.
// Skipping the <ins> injection means no hidden-ad policy violation occurs.
function injectAdCodeIntoSlots() {
    const isMobile = window.innerWidth <= 900;
    const slotMap = {
        'ad-mid':    isMobile ? null : SLOT_IDS.mid,  // desktop-only
        'ad-bottom': SLOT_IDS.bottom,
    };
    for (const [slotId, adSlotNum] of Object.entries(slotMap)) {
        if (!adSlotNum) continue;
        const el = document.getElementById(slotId);
        if (!el || el.querySelector('ins.adsbygoogle')) continue;
        injectIns(el, adSlotNum);
    }
}

// ── DESKTOP ONLY: Create #ad-top between content sections 1 and 2 ────────────
//
// WHY desktop-only: pushing ads into hidden elements (display:none) violates
// AdSense policy. Since #ad-top is hidden on mobile via CSS, we must not
// create or push it on mobile. Mobile uses #ad-mobile-article instead.
//
// Layout on desktop:
//   Form → #ad-mid → Content-1 → #ad-top (HERE) → Content-2 → FAQ → #ad-bottom
function injectTopAdBetweenSections() {
    if (window.innerWidth <= 900) return;            // mobile/tablet: skip entirely
    if (!document.querySelector('.calculator-tool')) return; // not a calculator page
    if (document.getElementById('ad-top')) return;   // already placed

    const sections = document.querySelectorAll('.content-section');
    if (!sections.length) return;

    const adTop = createSlotEl('ad-top', 'ad-slot ad-top-slot');

    if (sections.length >= 2) {
        sections[1].parentNode.insertBefore(adTop, sections[1]);
    } else {
        sections[0].parentNode.insertBefore(adTop, sections[0].nextSibling);
    }

    injectIns(adTop, SLOT_IDS.top);
}

// ── MOBILE ONLY: In-article ad between content sections 2 and 3 ──────────────
//
// On mobile, #ad-top is not created (see above). This places a visible,
// compliant in-article ad between reading sections — high viewability score.
// Only runs on calculator pages that have at least 2 content sections.
function injectMobileInArticleAd() {
    if (window.innerWidth > 900) return;             // desktop: #ad-top handles this
    if (!document.querySelector('.calculator-tool')) return;
    if (document.getElementById('ad-mobile-article')) return;

    const sections = document.querySelectorAll('.content-section');
    if (sections.length < 2) return; // need at least 2 sections for this to make sense

    // Insert before the 3rd section (index 2), or after the 2nd if only 2 exist
    const targetSection = sections[2] || sections[sections.length - 1];
    const el = createSlotEl('ad-mobile-article', 'ad-slot ad-mobile-article');
    targetSection.parentNode.insertBefore(el, targetSection);
    injectIns(el, SLOT_IDS.mobileArticle);
}

// ── Post-calculation result ad ────────────────────────────────────────────────
// Inserted after results become visible — HIGHEST CTR of any position.
// Selector covers all result wrapper patterns across all calculator layouts:
//   .result-container  — standard old layout (33 pages)
//   .result-section    — compact new layout (39 pages)
//   .results-container — alternative old layout (26 pages, note the plural)
function injectResultAd() {
    const resultContainer = document.querySelector('.result-container, .result-section, .results-container');
    if (!resultContainer || document.getElementById('ad-result')) return;

    const wrapper = createSlotEl('ad-result', 'ad-slot ad-result-slot');
    wrapper.setAttribute('role', 'complementary');
    wrapper.style.display = 'none';

    resultContainer.parentNode.insertBefore(wrapper, resultContainer.nextSibling);

    // Watch result container for when it becomes visible after calculation
    const observer = new MutationObserver(() => {
        const isVisible =
            resultContainer.style.display !== 'none' &&
            !resultContainer.hidden &&
            resultContainer.offsetParent !== null;

        if (isVisible && wrapper.style.display === 'none') {
            wrapper.style.display = 'block';
            if (!wrapper.querySelector('ins.adsbygoogle')) {
                injectIns(wrapper, SLOT_IDS.result);
            }
            observer.disconnect();
        }
    });

    observer.observe(resultContainer, {
        attributes: true,
        attributeFilter: ['style', 'hidden', 'class'],
    });
    if (resultContainer.parentNode) {
        observer.observe(resultContainer.parentNode, {
            childList: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
        });
    }
}

// ── Desktop sidebar ad (≥1025px) ──────────────────────────────────────────────
// 300px wide — supports 300×250 (most-filled worldwide) and 300×600 (premium).
// JS guard ensures it never runs on mobile or tablet screens.
function injectSidebarAd() {
    if (window.innerWidth < 1025) return;
    if (!document.querySelector('.calculator-tool')) return;
    if (document.getElementById('ad-sidebar')) return;

    const calcContainer = document.querySelector('.calculator-container');
    if (!calcContainer) return;

    const sidebar = document.createElement('aside');
    sidebar.id = 'ad-sidebar';
    sidebar.className = 'ad-sidebar';
    sidebar.setAttribute('aria-label', 'Advertisement');

    const sidebarSlot = createSlotEl('ad-sidebar-slot', 'ad-slot ad-sidebar-slot');
    sidebar.appendChild(sidebarSlot);

    const parent = calcContainer.parentNode;
    const wrapper = document.createElement('div');
    wrapper.className = 'calculator-with-sidebar';
    parent.insertBefore(wrapper, calcContainer);
    wrapper.appendChild(calcContainer);
    wrapper.appendChild(sidebar);

    injectIns(sidebarSlot, SLOT_IDS.sidebar);
}

// ── Sticky mobile bottom anchor banner ────────────────────────────────────────
// Fixed at bottom of screen on mobile. AdSense anchor ad policy requires:
//   1. Must be dismissible (close button) ✓
//   2. Must not cover more than 30% of screen height ✓ (70px = ~10% on average phone)
//   3. Must not overlap main content or navigation ✓
// CLS fix: body padding added immediately via CSS class so layout doesn't
// jump when the ad slides in after 3 seconds.
function injectStickyMobileAd() {
    if (document.getElementById('ad-sticky-mobile')) return;
    if (window.innerWidth > 900) return;

    const sticky = document.createElement('div');
    sticky.id = 'ad-sticky-mobile';
    sticky.className = 'ad-sticky-mobile';
    sticky.setAttribute('aria-label', 'Advertisement');
    sticky.setAttribute('role', 'complementary');

    const label = document.createElement('span');
    label.className = 'ad-sticky-label';
    label.textContent = 'Advertisement';
    sticky.appendChild(label);

    const adSlot = document.createElement('div');
    adSlot.className = 'ad-sticky-slot';
    sticky.appendChild(adSlot);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ad-sticky-close';
    closeBtn.setAttribute('aria-label', 'Close advertisement');
    closeBtn.innerHTML = '&#215;';
    closeBtn.addEventListener('click', () => {
        sticky.classList.remove('visible');
        setTimeout(() => {
            sticky.remove();
            document.body.classList.remove('has-sticky-ad');
        }, 300);
    });
    sticky.appendChild(closeBtn);

    document.body.appendChild(sticky);

    // Reserve body padding immediately to prevent CLS when ad slides in
    document.body.classList.add('has-sticky-ad');

    setTimeout(() => {
        sticky.classList.add('visible');
        if (!adSlot.querySelector('ins.adsbygoogle')) {
            injectIns(adSlot, SLOT_IDS.sticky);
        }
    }, 2000); // 2s delay — enough for LCP to complete, not too long to miss users
}

// ── Blog post dynamic ad insertion ───────────────────────────────────────────
export function insertBlogAdSlots() {
    const main = document.querySelector('main');
    if (!main || !window.location.pathname.includes('/blog/posts/')) return;
    if (document.querySelector('.ad-slot')) return;

    const article = main.querySelector('article.blog-post');
    if (!article) return;

    const paragraphs = article.querySelectorAll('p');
    const sections   = article.querySelectorAll('section, .content-section, h2');
    const isLongPost = paragraphs.length > 15;

    const firstSection = sections[0] || paragraphs[2];
    if (firstSection) {
        const el = createSlotEl('ad-blog-top', 'ad-slot');
        firstSection.parentNode.insertBefore(el, firstSection.nextSibling);
        injectIns(el, SLOT_IDS.top);
    }

    if (sections.length >= 2) {
        const midSection = sections[Math.floor(sections.length / 2)];
        const el = createSlotEl('ad-blog-mid', 'ad-slot');
        midSection.parentNode.insertBefore(el, midSection);
        injectIns(el, SLOT_IDS.mid);
    }

    if (isLongPost && sections.length >= 4) {
        const lateSection = sections[Math.floor(sections.length * 0.75)];
        const el = createSlotEl('ad-blog-mid2', 'ad-slot');
        lateSection.parentNode.insertBefore(el, lateSection);
        injectIns(el, SLOT_IDS.blogMid2);
    }

    const footer = document.querySelector('footer');
    if (footer) {
        const el = createSlotEl('ad-blog-bottom', 'ad-slot');
        footer.parentNode.insertBefore(el, footer);
        injectIns(el, SLOT_IDS.bottom);
    }
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

// Create and push a responsive <ins class="adsbygoogle">.
// data-ad-format="auto" + data-full-width-responsive="true" lets AdSense
// pick the best size for the available container width.
// Adds .ad-active to the container so CSS shows the gray background and
// "Advertisement" label — only slots that actually have an <ins> get the styling.
function injectIns(container, slotId) {
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = PUB_ID;
    ins.dataset.adSlot = slotId;
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    container.appendChild(ins);
    container.classList.add('ad-active'); // enables gray bg + label via CSS
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { /* AdSense not yet loaded — queued automatically on script load */ }
}

function createSlotEl(id, className) {
    const el = document.createElement('div');
    el.id = id;
    el.className = className;
    el.setAttribute('aria-label', 'Advertisement');
    return el;
}

export function createAdSlot(id, className = 'ad-slot') {
    return createSlotEl(id, className);
}
