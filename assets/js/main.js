// Main application entry point
import { initHeader } from './components/header.js?v=110';
import { initFooter } from './components/footer.js?v=2';
import { initThemeToggle } from './components/theme-toggle.js';
import { initAdSlots, insertBlogAdSlots } from './components/ad-slots.js?v=5';
import AccessibilityEnhancements from './components/accessibility.js';
import { LanguageSwitcher } from './components/language-switcher.js?v=4';
import { RecentlyViewed } from './components/recently-viewed.js';
import { TopCalculators } from './components/top-calculators.js?v=4';
import searchIndex from './search-index.js?v=2';
import { initCookieConsent } from './components/cookie-consent.js?v=1';

// Load Google AdSense script once per page (all pages share this entry point).
// Called by initCookieConsent() after the user accepts or declines.
// personalized=true  → standard ads (user accepted)
// personalized=false → non-personalized ads only (user declined / no consent yet)
window.__loadAdSense = function loadAdSense(personalized) {
    if (document.querySelector('script[src*="adsbygoogle"]')) return;
    if (!personalized) {
        // Signal non-personalized before the script tag is created
        (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
    }
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
    s.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(s);
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // initCookieConsent checks localStorage — if the user has already chosen,
    // it immediately calls window.__loadAdSense and returns true (no banner).
    // If this is a first visit, it shows the banner and defers AdSense loading
    // until the user taps Accept or Essential Only.
    initCookieConsent();

    // Initialize components
    initHeader();
    initFooter();
    initThemeToggle();
    initAdSlots();
    
    // Initialize blog-specific ad slots for longer posts
    if (window.location.pathname.includes('/blog/posts/')) {
        insertBlogAdSlots();
    }
    
    // Initialize accessibility enhancements
    new AccessibilityEnhancements();
    
    // Initialize revenue optimization components
    window.recentlyViewed = new RecentlyViewed();
    window.topCalculators = new TopCalculators();
    
    // Initialize revenue widgets
    window.recentlyViewed.init();
    window.topCalculators.init();
    
    // Initialize language switcher - fixed approach
    setTimeout(() => {
        try {
            // Create language switcher instance
            const languageSwitcher = new LanguageSwitcher();
            
            // Find or create container
            let container = document.getElementById('language-selector-container');
            if (!container) {
                // Create container manually
                container = document.createElement('div');
                container.id = 'language-selector-container';
                
                // Insert into header actions
                const headerActions = document.querySelector('.header-actions');
                const themeToggle = headerActions?.querySelector('.theme-toggle');
                if (headerActions && themeToggle) {
                    headerActions.insertBefore(container, themeToggle);
                }
            }
            
            // Create and add language selector
            if (container) {
                const selector = createLanguageDropdown(languageSwitcher);
                container.appendChild(selector);
            }
        } catch (error) {
            console.error('Language initialization error:', error);
        }
    }, 100);
    
    // Initialize homepage features
    if (document.getElementById('calculator-search')) {
        initHomepageSearch();
    }
    
    // Initialize mobile navigation
    initMobileNav();
    
    console.log('freebiecalculator.com initialized - VERSION 109 LOADED');
});

// Simple language dropdown creator
function createLanguageDropdown(switcher) {
    const container = document.createElement('div');
    container.className = 'language-selector';
    
    const currentBtn = document.createElement('button');
    currentBtn.className = 'language-current';
    currentBtn.innerHTML = '🇺🇸 English';
    currentBtn.setAttribute('aria-expanded', 'false');
    
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.style.display = 'none';
    
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ];
    
    languages.forEach(lang => {
        const option = document.createElement('button');
        option.className = 'language-option';
        option.innerHTML = `${lang.flag} ${lang.name}`;
        option.onclick = () => {
            currentBtn.innerHTML = `${lang.flag} ${lang.name}`;
            dropdown.style.display = 'none';
            currentBtn.setAttribute('aria-expanded', 'false');
            switcher.switchLanguage(lang.code);
        };
        dropdown.appendChild(option);
    });
    
    currentBtn.onclick = () => {
        const isOpen = dropdown.style.display === 'block';
        dropdown.style.display = isOpen ? 'none' : 'block';
        currentBtn.setAttribute('aria-expanded', !isOpen);
    };
    
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            dropdown.style.display = 'none';
            currentBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    container.appendChild(currentBtn);
    container.appendChild(dropdown);
    
    return container;
}

// Homepage search functionality — live dropdown
function initHomepageSearch() {
    const searchInput = document.getElementById('calculator-search');
    if (!searchInput) return;

    // Build dropdown container
    const container = searchInput.parentElement;
    container.style.position = 'relative';

    const dropdown = document.createElement('div');
    dropdown.id = 'search-dropdown';
    dropdown.setAttribute('role', 'listbox');
    dropdown.setAttribute('aria-label', 'Search results');
    container.appendChild(dropdown);

    function showDropdown(term) {
        dropdown.innerHTML = '';
        if (!term) { dropdown.classList.remove('active'); return; }

        const results = searchIndex.filter(item => {
            const haystack = (item.title + ' ' + item.description + ' ' + (item.tags || []).join(' ')).toLowerCase();
            return haystack.includes(term);
        }).slice(0, 8);

        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-no-results">No calculators found for "<strong>${term}</strong>"</div>`;
            dropdown.classList.add('active');
            return;
        }

        results.forEach(item => {
            const el = document.createElement('a');
            el.href = item.url;
            el.className = 'search-result-item';
            el.setAttribute('role', 'option');
            el.innerHTML = `
                <span class="search-result-badge">${item.category || item.type}</span>
                <span class="search-result-title">${item.title}</span>
                <span class="search-result-desc">${item.description.substring(0, 70)}…</span>`;
            dropdown.appendChild(el);
        });

        dropdown.classList.add('active');
    }

    searchInput.addEventListener('input', e => {
        showDropdown(e.target.value.toLowerCase().trim());
    });

    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Escape') { dropdown.classList.remove('active'); searchInput.value = ''; }
    });

    document.addEventListener('click', e => {
        if (!container.contains(e.target)) dropdown.classList.remove('active');
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) showDropdown(searchInput.value.toLowerCase().trim());
    });
}

// Mobile navigation
function initMobileNav() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when pressing escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    });
}

// Utility function for smooth scrolling
export function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Global error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'first-input') {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
            if (entry.entryType === 'layout-shift') {
                if (!entry.hadRecentInput) {
                    console.log('CLS:', entry.value);
                }
            }
        }
    });
    
    try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
        // Silently fail if not supported
    }
}
