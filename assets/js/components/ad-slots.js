// Ad Slots — Revenue-optimized, AdSense-compliant placement system
// Replace ca-pub-XXXXXXXXXXXXXXXX and slot IDs after AdSense approval

const PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

// Each placement gets its own unique slot ID — required by AdSense policy.
// Create all 7 slots in the AdSense dashboard and paste IDs here after approval.
const SLOT_IDS = {
    top:      '1000000001', // Below calculator form — avoids blocking primary tool
    mid:      '1000000002', // Between results and content sections
    result:   '1000000003', // Immediately after results (HIGHEST CTR — post-calculation)
    bottom:   '1000000004', // Before related links / pre-footer
    sidebar:  '1000000005', // Desktop sticky sidebar (300×250 / 300×600)
    sticky:   '1000000006', // Mobile anchor bottom banner
    blogMid2: '1000000007', // Second mid-article ad on long blog posts (must be unique)
};

export function initAdSlots() {
    repositionTopAd();      // Fix: move #ad-top from above form to below it
    injectAdCodeIntoSlots();
    injectResultAd();
    injectSidebarAd();
    injectStickyMobileAd();

    const count = document.querySelectorAll('.ad-slot').length;
    console.log(`Initialized ${count} ad slots`);
}

// ── Fix: Reposition #ad-top to between content sections ────────────────────
//
// PROBLEM (original HTML): #ad-top sits between <h1> and the form — blocks
// the primary tool and violates AdSense placement policy.
//
// PROBLEM (naive fix): Moving it to right after the form puts it back-to-back
// with #ad-mid (which is already there in HTML), creating adjacent ads with
// nothing between them — a density flag for AdSense reviewers.
//
// CORRECT FIX: Place #ad-top between the 1st and 2nd .content-section elements.
// This creates a natural reading break with real content on both sides:
//   Form → #ad-mid → Content-1 → #ad-top → Content-2 → FAQ → #ad-bottom
//
// On mobile: #ad-top is hidden via CSS (long form pushes it far below fold,
// giving it near-zero viewability; sticky banner handles mobile coverage instead).
function repositionTopAd() {
    const adTop = document.getElementById('ad-top');
    const calcTool = document.querySelector('.calculator-tool');
    if (!adTop || !calcTool) return; // not a calculator page

    const contentSections = document.querySelectorAll('.content-section');

    if (contentSections.length >= 2) {
        // Insert between section 1 and section 2 — natural reading break
        contentSections[1].parentNode.insertBefore(adTop, contentSections[1]);
    } else if (contentSections.length === 1) {
        // Only one section: insert after it (before FAQ / bottom ad)
        contentSections[0].parentNode.insertBefore(adTop, contentSections[0].nextSibling);
    } else {
        // No content sections found: remove to avoid adjacent-ad problem with #ad-mid
        adTop.remove();
    }
}

// ── Inject <ins> tags into existing .ad-slot placeholders ────────────────────
function injectAdCodeIntoSlots() {
    const slotMap = {
        'ad-top':    SLOT_IDS.top,
        'ad-mid':    SLOT_IDS.mid,
        'ad-bottom': SLOT_IDS.bottom,
    };

    for (const [slotId, adSlotNum] of Object.entries(slotMap)) {
        const el = document.getElementById(slotId);
        if (!el || el.querySelector('ins.adsbygoogle')) continue;
        injectIns(el, adSlotNum);
    }
}

// ── Create and push a responsive <ins class="adsbygoogle"> ───────────────────
// Sizes are set on the CONTAINER (via CSS), not the <ins> tag.
// AdSense calculates available space from the container — inline sizing on <ins>
// interferes with that calculation and reduces fill rate.
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
// Appears the moment results become visible. Highest CTR of any position:
// user just got their answer and has peak purchase intent.
function injectResultAd() {
    const resultContainer = document.querySelector('.result-container');
    if (!resultContainer || document.getElementById('ad-result')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'ad-result';
    wrapper.className = 'ad-slot ad-result-slot';
    wrapper.setAttribute('aria-label', 'Advertisement');
    wrapper.setAttribute('role', 'complementary');
    wrapper.style.display = 'none';

    resultContainer.parentNode.insertBefore(wrapper, resultContainer.nextSibling);

    // Watch only the result container for visibility changes — not the whole body.
    // Broad body observers cause jank and hurt CLS scores.
    const observer = new MutationObserver(() => {
        const isVisible =
            resultContainer.style.display !== 'none' &&
            !resultContainer.hidden &&
            resultContainer.offsetParent !== null;

        if (isVisible && wrapper.style.display === 'none') {
            wrapper.style.display = 'block'; // matches .ad-slot display:block
            if (!wrapper.querySelector('ins.adsbygoogle')) {
                injectIns(wrapper, SLOT_IDS.result);
            }
            observer.disconnect(); // stop watching once the ad is shown
        }
    });

    // Scope: only watch the result container itself and its direct parent
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
// 300px wide sidebar supports 300×250 (most-filled format worldwide)
// and 300×600 (half-page — highest eCPM premium format).
// Zero impact on mobile — JS guard ensures it never runs on small screens.
function injectSidebarAd() {
    if (window.innerWidth < 1025) return;

    const calcContainer = document.querySelector('.calculator-container');
    if (!calcContainer || document.getElementById('ad-sidebar')) return;
    if (!document.querySelector('.calculator-tool')) return;

    const sidebar = document.createElement('aside');
    sidebar.id = 'ad-sidebar';
    sidebar.className = 'ad-sidebar';
    sidebar.setAttribute('aria-label', 'Advertisement');

    const sidebarSlot = document.createElement('div');
    sidebarSlot.className = 'ad-slot ad-sidebar-slot';
    sidebarSlot.setAttribute('aria-label', 'Advertisement');
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
// Fixed at bottom of screen. Compliant with AdSense anchor ad policy:
// must be dismissible and must not take more than 30% of screen height.
// CLS fix: body padding reserved immediately (hidden state), not after timeout.
function injectStickyMobileAd() {
    if (document.getElementById('ad-sticky-mobile')) return;
    if (window.innerWidth > 900) return;

    const sticky = document.createElement('div');
    sticky.id = 'ad-sticky-mobile';
    sticky.className = 'ad-sticky-mobile'; // visible class added after timeout

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
        // Remove after CSS transition so it doesn't flash
        setTimeout(() => {
            sticky.remove();
            document.body.classList.remove('has-sticky-ad');
        }, 300);
    });
    sticky.appendChild(closeBtn);

    document.body.appendChild(sticky);

    // Reserve body padding immediately so scroll position doesn't jump when ad appears.
    // Using a CSS class instead of inline style prevents CLS on the timeout tick.
    document.body.classList.add('has-sticky-ad');

    // Show ad after 3s — user has had time to see the primary content first
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
    const sections = article.querySelectorAll('section, .content-section, h2');
    const isLongPost = paragraphs.length > 15;

    // After first section
    const firstSection = sections[0] || paragraphs[2];
    if (firstSection) {
        const el = createSlotEl('ad-blog-top', 'ad-slot');
        firstSection.parentNode.insertBefore(el, firstSection.nextSibling);
        injectIns(el, SLOT_IDS.top);
    }

    // Mid-article
    if (sections.length >= 2) {
        const midSection = sections[Math.floor(sections.length / 2)];
        const el = createSlotEl('ad-blog-mid', 'ad-slot');
        midSection.parentNode.insertBefore(el, midSection);
        injectIns(el, SLOT_IDS.mid);
    }

    // Second mid for long posts — uses its own unique slot ID (blogMid2)
    // Two <ins> units on the same page MUST have different slot IDs or AdSense may
    // only fill one of them, cutting blog revenue in half on long posts.
    if (isLongPost && sections.length >= 4) {
        const lateSection = sections[Math.floor(sections.length * 0.75)];
        const el = createSlotEl('ad-blog-mid2', 'ad-slot');
        lateSection.parentNode.insertBefore(el, lateSection);
        injectIns(el, SLOT_IDS.blogMid2);
    }

    // Pre-footer
    const footer = document.querySelector('footer');
    if (footer) {
        const el = createSlotEl('ad-blog-bottom', 'ad-slot');
        footer.parentNode.insertBefore(el, footer);
        injectIns(el, SLOT_IDS.bottom);
    }

    labelExistingSlots();
}

function labelExistingSlots() {
    document.querySelectorAll('.ad-slot').forEach(slot => {
        if (!slot.getAttribute('aria-label')) {
            slot.setAttribute('aria-label', 'Advertisement');
        }
        slot.dataset.adSlotInit = 'true';
    });
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
