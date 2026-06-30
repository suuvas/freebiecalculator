// Accessibility enhancements for FreebieCalculator.com

class AccessibilityEnhancements {
    constructor() {
        this.initializeAccessibilityFeatures();
    }
    
    initializeAccessibilityFeatures() {
        this.addSkipToContentLink();
        this.enhanceFocusManagement();
        this.addKeyboardNavigation();
        this.addScreenReaderEnhancements();
        this.addMotionPreferences();
        this.enhanceFormAccessibility();
    }
    
    addSkipToContentLink() {
        // Add skip to content link for screen readers and keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.setAttribute('aria-label', 'Skip to main content');
        
        // Insert at the beginning of the body
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add styles if not present
        if (!document.querySelector('style[data-accessibility]')) {
            const style = document.createElement('style');
            style.setAttribute('data-accessibility', 'true');
            style.textContent = `
                .skip-to-content {
                    position: absolute;
                    top: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #000;
                    color: #fff;
                    padding: 8px 16px;
                    text-decoration: none;
                    border-radius: 4px;
                    z-index: 9999;
                    transition: top 0.2s ease;
                }
                
                .skip-to-content:focus {
                    top: 10px;
                }
                
                /* Enhanced focus styles */
                *:focus {
                    outline: 2px solid #0066cc;
                    outline-offset: 2px;
                }
                
                button:focus,
                input:focus,
                select:focus,
                textarea:focus,
                a:focus {
                    outline: 2px solid #0066cc;
                    outline-offset: 2px;
                }
                
                /* High contrast focus for better visibility */
                @media (prefers-contrast: high) {
                    *:focus {
                        outline: 3px solid #000;
                        outline-offset: 2px;
                    }
                }
                
                /* Reduced motion preferences */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
                
                /* Screen reader only content */
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
                
                /* Color contrast improvements */
                @media (prefers-contrast: high) {
                    body {
                        background: #fff;
                        color: #000;
                    }
                    
                    a {
                        color: #0000ff;
                        text-decoration: underline;
                    }
                    
                    a:visited {
                        color: #800080;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    enhanceFocusManagement() {
        // Ensure main content has an ID for skip link
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
        
        // Add tabindex to main for focus management
        if (main) {
            main.setAttribute('tabindex', '-1');
        }
        
        // Handle skip link activation
        const skipLink = document.querySelector('.skip-to-content');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    addKeyboardNavigation() {
        // Enhance keyboard navigation for calculator forms
        document.addEventListener('keydown', (e) => {
            // Enter key should submit forms
            if (e.key === 'Enter' && e.target.type === 'number') {
                const form = e.target.closest('form');
                if (form) {
                    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                    if (submitButton) {
                        submitButton.click();
                    }
                }
            }
            
            // Escape key to close modals or clear focus
            if (e.key === 'Escape') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.blur) {
                    activeElement.blur();
                }
            }
        });
        
        // Add keyboard navigation for calculator cards
        const calculatorCards = document.querySelectorAll('.calculator-card');
        calculatorCards.forEach(card => {
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }
    
    addScreenReaderEnhancements() {
        // Add aria-labels to inputs without labels
        const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            const label = input.closest('.form-group')?.querySelector('label');
            
            if (label) {
                // Associate input with label
                if (!input.id) {
                    input.id = 'input-' + Math.random().toString(36).substr(2, 9);
                }
                label.setAttribute('for', input.id);
            } else if (placeholder) {
                input.setAttribute('aria-label', placeholder);
            }
        });
        
        // Add role and aria-label to result containers
        const resultContainers = document.querySelectorAll('.result-container, .calculator-result');
        resultContainers.forEach(container => {
            container.setAttribute('role', 'region');
            container.setAttribute('aria-label', 'Calculation Results');
            container.setAttribute('aria-live', 'polite');
        });
        
        // Add semantic landmarks
        const nav = document.querySelector('nav, .navigation');
        if (nav && !nav.getAttribute('role')) {
            nav.setAttribute('role', 'navigation');
        }
        
        // Enhance ad slots with proper labels
        const adSlots = document.querySelectorAll('.ad-slot');
        adSlots.forEach((slot, index) => {
            slot.setAttribute('role', 'complementary');
            slot.setAttribute('aria-label', `Advertisement ${index + 1}`);
        });
    }
    
    addMotionPreferences() {
        // Respect user's motion preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (e) => {
            if (e.matches) {
                // Disable animations and smooth scrolling
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        };
        
        // Check initial preference
        handleMotionPreference(mediaQuery);
        
        // Listen for changes
        mediaQuery.addEventListener('change', handleMotionPreference);
    }
    
    enhanceFormAccessibility() {
        // Add required indicators
        const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`) || 
                          input.closest('.form-group')?.querySelector('label');
            
            if (label && !label.querySelector('.required-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'required-indicator';
                indicator.textContent = ' *';
                indicator.setAttribute('aria-label', 'required');
                label.appendChild(indicator);
            }
            
            // Add aria-required
            input.setAttribute('aria-required', 'true');
        });
        
        // Enhance error messages
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const invalidInputs = form.querySelectorAll(':invalid');
                invalidInputs.forEach(input => {
                    input.setAttribute('aria-invalid', 'true');
                    
                    // Add error message if not present
                    if (!input.getAttribute('aria-describedby')) {
                        const errorId = 'error-' + Math.random().toString(36).substr(2, 9);
                        const errorElement = document.createElement('div');
                        errorElement.id = errorId;
                        errorElement.className = 'error-message';
                        errorElement.setAttribute('role', 'alert');
                        errorElement.textContent = input.validationMessage || 'This field contains an error';
                        
                        input.setAttribute('aria-describedby', errorId);
                        input.parentNode.appendChild(errorElement);
                    }
                });
            });
        });
    }
    
    // Announce page changes for single-page applications
    announcePageChange(title) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Page changed to ${title}`;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Auto-initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    new AccessibilityEnhancements();
});

export default AccessibilityEnhancements;