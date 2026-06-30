/**
 * Smart Header - Enhances reading experience with adaptive header behavior
 * FreebieCalculator.com
 */

class SmartHeader {
    constructor() {
        this.header = null;
        this.lastScrollY = 0;
        this.scrollThreshold = 100; // px before header starts changing
        this.isScrolled = false;
        
        // Only initialize on blog pages for better reading experience
        this.isBlogPage = document.body.classList.contains('blog-page');
        
        console.log('SmartHeader: Blog page detected:', this.isBlogPage);
        
        this.init();
    }
    
    init() {
        // Wait for header to be created by main.js
        this.waitForHeader();
    }
    
    waitForHeader() {
        const checkHeader = () => {
            this.header = document.querySelector('header');
            if (this.header) {
                console.log('SmartHeader: Header found, initializing scroll listener');
                this.setupScrollListener();
            } else {
                // Try again in 100ms
                setTimeout(checkHeader, 100);
            }
        };
        checkHeader();
    }
    
    setupScrollListener() {
        if (!this.header || !this.isBlogPage) return;
        
        // Enhanced scroll listener with throttling for better performance
        this.throttledScrollHandler = this.throttle(this.handleScroll.bind(this), 16); // ~60fps
        window.addEventListener('scroll', this.throttledScrollHandler, { passive: true });
        
        // Set initial state
        this.handleScroll();
    }
    
    handleScroll() {
        const currentScrollY = window.pageYOffset;
        const scrollingDown = currentScrollY > this.lastScrollY;
        const pastThreshold = currentScrollY > this.scrollThreshold;
        
        // Smart header behavior for blog pages
        if (this.isBlogPage && this.header) {
            if (pastThreshold && !this.isScrolled) {
                console.log('SmartHeader: Compacting header at scroll:', currentScrollY);
                this.compactHeader();
                this.isScrolled = true;
            } else if (!pastThreshold && this.isScrolled) {
                console.log('SmartHeader: Expanding header at scroll:', currentScrollY);
                this.expandHeader();
                this.isScrolled = false;
            }
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    compactHeader() {
        this.header.classList.add('header-scrolled');
        
        // Smooth transition for better UX
        this.header.style.transform = 'translateY(0)';
        this.header.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    expandHeader() {
        this.header.classList.remove('header-scrolled');
        
        // Reset transform
        this.header.style.transform = 'translateY(0)';
    }
    
    // Throttle utility for better scroll performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Destroy method for cleanup
    destroy() {
        window.removeEventListener('scroll', this.throttledScrollHandler);
    }
}

// Initialize smart header - wait a bit for main.js to load the header
function initSmartHeader() {
    console.log('SmartHeader: Initializing...');
    new SmartHeader();
}

// Initialize after a short delay to ensure header is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSmartHeader, 200);
    });
} else {
    setTimeout(initSmartHeader, 200);
}