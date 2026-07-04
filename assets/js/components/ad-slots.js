// Ad Slots — Revenue-optimized, AdSense-compliant placement system
// Replace ca-pub-XXXXXXXXXXXXXXXX and slot IDs after AdSense approval

const PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

// Each placement gets its own unique slot ID — required by AdSense policy.
// Create all 7 slots in the AdSense dashboard and paste IDs here after approval.
const SLOT_IDS = {
    top:      '1000000001', // Between content sections 1 and 2
    mid:      '1000000002', // Between form and first content section
    result:   '1000000003', // After results — HIGHEST CTR (post-calculation)
    bottom:   '1000000004', // Before related links / pre-footer
    sidebar:  '1000000005', // Desktop sticky sidebar (300×250 / 300×600)
    sticky:   '1000000006', // Mobile anchor bottom banner
    blogMid2: '1000000007', // Second mid-article ad on long blog posts
};

export function initAdSlots() {
    injectAdCodeIntoSlots(); // wire up #ad-mid and #ad-bottom
    injectTopAdBetweenSections(); // create #ad-top in correct position
    injectResultAd();        // high-CTR ad after calculation
    injectSidebarAd();       // desktop 300px sidebar
    injectStickyMobileAd();  // mobile anchor bottom banner

    const count = document.querySelectorAll('.ad-slot').length;
    console.log(`Initialized ${count} ad slots`);
}

// ── Inject <ins> tags into existing .ad-slot placeholders ────────────────────
function injectAdCodeIntoSlots() {
    const slotMap = {
        'ad-mid':    SLOT_IDS.mid,
        'ad-bottom': SLOT_IDS.bottom,
    };
    for (const [slotId, adSlotNum] of Object.entries(slotMap)) {
        const el = document.getElementById(slotId);
        if (!el || el.querySelector('ins.adsbygoogle')) continue;
        injectIns(el, adSlotNum);
    }
}

// ── Create #ad-top between content sections 1 and 2 ─────────────────────────
//
// WHY: The original HTML had #ad-top between the <h1> and the calculator form,
// blocking users from reaching the primary tool — an AdSense policy violation.
// We removed it from all 60 HTML files and create it here in the correct
// position: between the first and second .content-section elements.
//
// This creates a natural reading break with real content on both sides:
//   Form → #ad-mid → Content-1 → #ad-top (HERE) → Content-2 → FAQ → #ad-bottom
//
// Hidden on mobile via CSS — the sticky banner handles mobile coverage.
function injectTopAdBetweenSections() {
    if (!document.querySelector('.calculator-tool')) return; // not a calculator page
    if (document.getElementById('ad-top')) return; // already placed

    const sections = document.querySelectorAll('.content-section');
    if (!sections.length) return;

    const adTop = createSlotEl('ad-top', 'ad-slot');

    if (sections.length >= 2) {
        // Insert between section 1 and section 2 — best reading break
        sections[1].parentNode.insertBefore(adTop, sections[1]);
    } else {
        // Only one section: insert after it
        sections[0].parentNode.insertBefore(adTop, sections[0].nextSibling);
    }

    injectIns(adTop, SLOT_IDS.top);
}

// ── Create and push a responsive <ins class="adsbygoogle"> ───────────────────
// Sizes come from the container CSS — do NOT set min-width/min-height on <ins>.
// AdSense calculates available space from the container div, not the <ins> tag.
function injectIns(container, slotId) {
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = PUB_ID;
    ins.dataset.adSlot = slotId;
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    container.appendChild(ins);
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { /* AdSense script not yet loaded — push queued automatically */ }
}

// ── Post-calculation result ad ───────────────────────────────────────────────
// Inserted after .result-container the moment results become visible.
// Highest CTR of any position: user just got their answer, peak purchase intent.
function injectResultAd() {
    const resultContainer = document.querySelector('.result-container');
    if (!resultContainer || document.getElementById('ad-result')) return;

    const wrapper = createSlotEl('ad-result', 'ad-slot ad-result-slot');
    wrapper.setAttribute('role', 'complementary');
    wrapper.style.display = 'none';

    resultContainer.parentNode.insertBefore(wrapper, resultContainer.nextSibling);

    // Watch only the result container — not the whole body (avoids jank + CLS)
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
            observer.disconnect(); // stop watching once shown
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

// ── Desktop sidebar ad (≥1025px) ─────────────────────────────────────────────
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

// ── Sticky mobile bottom anchor banner ───────────────────────────────────────
// Fixed at bottom of screen on mobile. Compliant with AdSense anchor policy:
// must be dismissible and not cover more than 30% of screen height.
// CLS fix: body padding added immediately (not after timeout) via CSS class.
function injectStickyMobileAd() {
    if (document.getElementById('ad-sticky-mobile')) return;
    if (window.innerWidth > 900) return;

    const sticky = document.createElement('div');
    sticky.id = 'ad-sticky-mobile';
    sticky.className = 'ad-sticky-mobile';

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

    // Reserve space immediately — prevents CLS when ad slides in after 3s
    document.body.classList.add('has-sticky-ad');

    setTimeout(() => {
        sticky.classList.add('visible');
        if (!adSlot.querySelector('ins.adsbygoogle')) {
            injectIns(adSlot, SLOT_IDS.sticky);
        }
    }, 3000);
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

    // Second mid for long posts — must use its own unique slot ID
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
