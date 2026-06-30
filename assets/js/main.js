// Main application entry point
import { initHeader } from './components/header.js?v=101';
import { initFooter } from './components/footer.js';
import { initThemeToggle } from './components/theme-toggle.js';
import { initAdSlots, insertBlogAdSlots } from './components/ad-slots.js';
import AccessibilityEnhancements from './components/accessibility.js';
import { LanguageSwitcher } from './components/language-switcher.js?v=3';
import { RecentlyViewed } from './components/recently-viewed.js';
import { TopCalculators } from './components/top-calculators.js?v=3';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initHeader(); // Re-enabled - with protection for hardcoded HTML
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
    
    console.log('freebiecalculator.com initialized - VERSION 108 LOADED');
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

// Homepage search functionality
function initHomepageSearch() {
    const searchInput = document.getElementById('calculator-search');
    const calculatorCards = document.querySelectorAll('.calculator-card');
    
    if (!searchInput || calculatorCards.length === 0) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        calculatorCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.parentElement.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide empty categories
        document.querySelectorAll('.calculator-grid').forEach(grid => {
            const visibleCards = grid.querySelectorAll('.calculator-card[style*="block"], .calculator-card:not([style])');
            if (visibleCards.length === 0 && searchTerm !== '') {
                grid.style.display = 'none';
            } else {
                grid.style.display = 'grid';
            }
        });
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
