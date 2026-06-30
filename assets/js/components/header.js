// Header component
export function initHeader() {
    const headerElement = document.getElementById('header');
    if (!headerElement) return;
    
    // Check if header already has content - if so, just add event handlers
    if (headerElement.querySelector('.logo')) {
        // Header has hardcoded content, just add navigation handlers
        setupHeaderInteractions(headerElement);
        headerElement.classList.add('loaded');
        return;
    }
    
    // Create header with freebiecalculator.com as site name
    headerElement.innerHTML = `
        <div class="header-content">
            <a href="/" class="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="currentColor"/>
                    <rect x="6" y="6" width="20" height="20" rx="2" fill="white"/>
                    <rect x="8" y="8" width="4" height="2" fill="currentColor"/>
                    <rect x="14" y="8" width="4" height="2" fill="currentColor"/>
                    <rect x="20" y="8" width="4" height="2" fill="currentColor"/>
                    <rect x="8" y="12" width="4" height="2" fill="currentColor"/>
                    <rect x="14" y="12" width="4" height="2" fill="currentColor"/>
                    <rect x="20" y="12" width="4" height="2" fill="currentColor"/>
                    <rect x="8" y="16" width="4" height="2" fill="currentColor"/>
                    <rect x="14" y="16" width="4" height="2" fill="currentColor"/>
                    <rect x="20" y="16" width="4" height="2" fill="currentColor"/>
                    <rect x="8" y="20" width="16" height="2" fill="#f59e0b"/>
                </svg>
                freebiecalculator.com
            </a>
            
            <nav role="navigation" aria-label="Main navigation">
                <ul class="nav-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/blog/">Guides</a></li>
                    <li><a href="/help/">Help</a></li>
                    <li><a href="#math-calculators">General</a></li>
                    <li><a href="#health-calculators">Health</a></li>
                    <li><a href="#financial-calculators">Finance</a></li>
                    <li><a href="#other-calculators">Other</a></li>
                </ul>
            </nav>
            
            <div class="header-actions">
                <div id="language-selector-container"></div>
                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                    <span class="theme-icon">🌙</span>
                </button>
                <button class="mobile-menu-btn" aria-label="Toggle mobile menu" aria-expanded="false">
                    ☰
                </button>
            </div>
        </div>
    `;
    
    setupHeaderInteractions(headerElement);
    headerElement.classList.add('loaded');
}

function setupHeaderInteractions(headerElement) {
    // Handle navigation clicks for smooth scrolling on homepage
    const navLinks = headerElement.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = headerElement.querySelector('.mobile-menu-btn');
    const navMenu = headerElement.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
}