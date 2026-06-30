// Ad slots component - manages advertisement containers
export function initAdSlots() {
    const adSlots = document.querySelectorAll('.ad-slot');
    adSlots.forEach(slot => {
        if (!slot.getAttribute('aria-label')) {
            slot.setAttribute('aria-label', 'Advertisement');
        }
        slot.dataset.adSlot = 'true';
    });
    console.log(`Initialized ${adSlots.length} ad slots`);

    // Inject result ad when calculator produces output
    injectResultAd();

    // Inject sticky mobile bottom banner
    injectStickyMobileAd();
}

// Inject a 300x250 ad slot that appears right after calculator results
// This is the highest-intent placement — user just got their answer
function injectResultAd() {
    const resultContainer = document.querySelector('.result-container');
    if (!resultContainer || document.getElementById('ad-result')) return;

    const adResult = document.createElement('div');
    adResult.id = 'ad-result';
    adResult.className = 'ad-slot';
    adResult.setAttribute('aria-label', 'Advertisement');
    adResult.dataset.adSlot = 'true';
    adResult.style.display = 'none'; // hidden until results show

    // Insert directly after the result container
    resultContainer.parentNode.insertBefore(adResult, resultContainer.nextSibling);

    // Watch for results becoming visible and reveal the ad
    const observer = new MutationObserver(() => {
        const isVisible = resultContainer.style.display !== 'none' &&
                          !resultContainer.hidden &&
                          resultContainer.offsetParent !== null;
        if (isVisible) {
            adResult.style.display = 'flex';
        }
    });

    observer.observe(resultContainer, {
        attributes: true,
        attributeFilter: ['style', 'hidden', 'class']
    });

    // Also handle cases where result is shown via class toggle
    observer.observe(document.body, {
        subtree: true,
        childList: false,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
}

// Inject sticky bottom banner for mobile — dismissed after one click
// Compliant with AdSense anchor ad policy (closeable, not covering content)
function injectStickyMobileAd() {
    if (document.getElementById('ad-sticky-mobile')) return;

    // Only show on mobile widths
    if (window.innerWidth > 900) return;

    const sticky = document.createElement('div');
    sticky.id = 'ad-sticky-mobile';
    sticky.className = 'ad-sticky-mobile';
    sticky.setAttribute('aria-label', 'Advertisement');
    sticky.setAttribute('role', 'complementary');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ad-sticky-close';
    closeBtn.setAttribute('aria-label', 'Close advertisement');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => {
        sticky.style.display = 'none';
        // Add padding to body so footer isn't hidden behind banner
        document.body.style.paddingBottom = '0';
    });

    sticky.appendChild(closeBtn);
    document.body.appendChild(sticky);

    // Show after 2 seconds — avoids covering content immediately
    setTimeout(() => {
        sticky.style.display = 'flex';
        document.body.style.paddingBottom = '64px';
    }, 2000);
}

export function createAdSlot(id, className = 'ad-slot', size = 'default') {
    const adSlot = document.createElement('div');
    adSlot.id = id;
    adSlot.className = `${className} ad-size-${size}`;
    adSlot.setAttribute('aria-label', 'Advertisement');
    adSlot.dataset.adSlot = 'true';
    adSlot.dataset.adSize = size;

    switch(size) {
        case 'banner':
            adSlot.style.minHeight = '90px';
            adSlot.style.maxWidth = '728px';
            adSlot.style.margin = '0 auto';
            break;
        case 'mobile-banner':
            adSlot.style.minHeight = '50px';
            adSlot.style.maxWidth = '320px';
            adSlot.style.margin = '0 auto';
            break;
        case 'rectangle':
            adSlot.style.minHeight = '250px';
            adSlot.style.maxWidth = '336px';
            adSlot.style.margin = '0 auto';
            break;
        default:
            adSlot.style.minHeight = '90px';
            break;
    }

    return adSlot;
}

export function insertBlogAdSlots() {
    const main = document.querySelector('main');
    if (!main) return;

    if (window.location.pathname.includes('/blog/posts/') &&
        !document.querySelector('.ad-slot')) {

        const article = main.querySelector('article.blog-post');
        if (!article) return;

        const paragraphs = article.querySelectorAll('p');
        const sections = article.querySelectorAll('section, .content-section, h2');
        const isLongPost = article.scrollHeight > 1000 || paragraphs.length > 15;

        const insertAfter = sections.length > 0 ? sections[0] : paragraphs[2];
        if (insertAfter) {
            const topAd = createAdSlot('ad-top', 'ad-slot', 'banner');
            insertAfter.parentNode.insertBefore(topAd, insertAfter.nextSibling);
        }

        if (sections.length >= 2) {
            const midIndex = Math.floor(sections.length / 2);
            const midAd = createAdSlot('ad-mid', 'ad-slot', 'rectangle');
            sections[midIndex].parentNode.insertBefore(midAd, sections[midIndex]);
        }

        if (isLongPost && sections.length >= 4) {
            const mid2Index = Math.floor(sections.length * 0.75);
            const mid2Ad = createAdSlot('ad-mid2', 'ad-slot', 'banner');
            sections[mid2Index].parentNode.insertBefore(mid2Ad, sections[mid2Index]);
        }

        const relatedSection = article.querySelector('.related-content, .related-posts');
        const footer = document.querySelector('footer');
        const insertBefore = relatedSection || footer;
        if (insertBefore) {
            const bottomAd = createAdSlot('ad-bottom', 'ad-slot', isLongPost ? 'rectangle' : 'banner');
            insertBefore.parentNode.insertBefore(bottomAd, insertBefore);
        }

        initAdSlots();
    }
}
