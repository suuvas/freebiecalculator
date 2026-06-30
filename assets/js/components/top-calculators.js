// Top Calculators Widget for FreebieCalculator.com
// Highlights highest-revenue calculators for maximum AdSense earnings

class TopCalculators {
    constructor() {
        this.topCalculators = [
            // Tier 1: Highest CPC/RPM - Finance calculators with loan/mortgage keywords
            {
                slug: 'mortgage',
                title: 'Mortgage Calculator',
                description: 'Calculate monthly payments & total interest',
                url: '/calculators/mortgage.html',
                category: 'Finance',
                cpcTier: 'premium', // $3-8 CPC range
                icon: '🏠',
                priority: 1,
                tags: ['mortgage', 'home loan', 'real estate']
            },
            {
                slug: 'car-loan',
                title: 'Car Loan Calculator',
                description: 'Auto loan payments & financing costs',
                url: '/calculators/car-loan.html',
                category: 'Finance',
                cpcTier: 'premium',
                icon: '🚗',
                priority: 2,
                tags: ['auto loan', 'car financing', 'vehicle payment']
            },
            {
                slug: 'emi',
                title: 'EMI Calculator',
                description: 'Equated Monthly Installment calculator',
                url: '/calculators/emi.html',
                category: 'Finance',
                cpcTier: 'premium',
                icon: '💳',
                priority: 3,
                tags: ['EMI', 'loan EMI', 'monthly payment']
            },
            
            // Tier 2: High CPC - Investment & tax calculators
            {
                slug: 'investment-roi',
                title: 'Investment ROI Calculator',
                description: 'Return on investment & profit calculator',
                url: '/calculators/investment-roi.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '📈',
                priority: 4,
                tags: ['ROI', 'investment return', 'profit calculation']
            },
            {
                slug: 'compound-interest',
                title: 'Compound Interest Calculator',
                description: 'Investment growth with compound interest',
                url: '/calculators/compound-interest.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '📊',
                priority: 5,
                tags: ['compound interest', 'investment growth', 'savings']
            },
            {
                slug: 'salary-after-tax',
                title: 'Salary After Tax Calculator',
                description: 'Take-home salary after deductions',
                url: '/calculators/salary-after-tax.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '💼',
                priority: 6,
                tags: ['salary calculator', 'tax deduction', 'net income']
            },
            // Tier 2: New high-value calculators
            {
                slug: 'paycheck',
                title: 'Paycheck Calculator',
                description: 'Estimate take-home pay after taxes',
                url: '/calculators/paycheck.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '🧾',
                priority: 7,
                tags: ['paycheck', 'take-home pay', 'salary']
            },
            {
                slug: 'debt-to-income',
                title: 'Debt-to-Income Calculator',
                description: 'Check your DTI ratio for loan approval',
                url: '/calculators/debt-to-income.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '⚖️',
                priority: 8,
                tags: ['debt-to-income', 'DTI', 'mortgage approval']
            },
            {
                slug: 'cagr',
                title: 'CAGR Calculator',
                description: 'Compound Annual Growth Rate for investments',
                url: '/calculators/cagr.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '📉',
                priority: 9,
                tags: ['CAGR', 'investment growth', 'annual return']
            },
            {
                slug: 'net-worth',
                title: 'Net Worth Calculator',
                description: 'Calculate total assets minus liabilities',
                url: '/calculators/net-worth.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '💎',
                priority: 10,
                tags: ['net worth', 'assets', 'wealth']
            },
            {
                slug: 'loan-to-value',
                title: 'Loan-to-Value Calculator',
                description: 'LTV ratio for mortgages and PMI',
                url: '/calculators/loan-to-value.html',
                category: 'Finance',
                cpcTier: 'high',
                icon: '🏦',
                priority: 11,
                tags: ['LTV', 'loan-to-value', 'PMI', 'mortgage']
            }
        ];
    }

    // Generate widget HTML optimized for AdSense revenue
    generateWidget(variant = 'sidebar') {
        if (variant === 'sidebar') {
            return this.generateSidebarWidget();
        } else if (variant === 'footer') {
            return this.generateFooterWidget();
        } else if (variant === 'homepage') {
            return this.generateHomepageWidget();
        }
    }

    generateSidebarWidget() {
        const topCalcs = this.topCalculators.slice(0, 4); // Show top 4 for sidebar
        
        const calculatorCards = topCalcs.map(calc => `
            <a href="${calc.url}" class="top-calc-card ${calc.cpcTier}-tier" data-calculator="${calc.slug}">
                <div class="calc-icon">${calc.icon}</div>
                <div class="calc-content">
                    <h4 class="calc-title">${calc.title}</h4>
                    <p class="calc-desc">${calc.description}</p>
                    <span class="calc-category">${calc.category}</span>
                </div>
                <div class="calc-arrow">→</div>
            </a>
        `).join('');

        return `
            <div class="widget top-calculators-widget sidebar-variant">
                <div class="widget-header">
                    <h3>🔥 Most Popular Calculators</h3>
                    <p class="widget-subtitle">High-value financial tools</p>
                </div>
                <div class="top-calculators-grid">
                    ${calculatorCards}
                </div>
                <div class="widget-footer">
                    <a href="/search.html" class="view-all-link">View All 60+ Calculators →</a>
                </div>
            </div>
        `;
    }

    generateHomepageWidget() {
        const topCalcs = this.topCalculators.slice(0, 11); // Show top 11 for homepage
        
        const calculatorCards = topCalcs.map(calc => `
            <a href="${calc.url}" class="featured-calc-card ${calc.cpcTier}-tier" data-calculator="${calc.slug}">
                <div class="calc-badge">${calc.icon}</div>
                <h3 class="calc-title">${calc.title}</h3>
                <p class="calc-description">${calc.description}</p>
                <div class="calc-meta">
                    <span class="calc-category">${calc.category}</span>
                    <span class="calc-popularity">⭐ Popular</span>
                </div>
            </a>
        `).join('');

        return `
            <section class="featured-calculators-section">
                <div class="section-header">
                    <h2>💰 High-Value Financial Calculators</h2>
                    <p class="section-subtitle">Professional-grade tools for loans, investments, and financial planning</p>
                </div>
                <div class="featured-calculators-grid">
                    ${calculatorCards}
                </div>
                <div class="section-footer">
                    <p class="section-note">🔒 All calculations are secure and private • No registration required</p>
                </div>
            </section>
        `;
    }

    generateFooterWidget() {
        const topCalcs = this.topCalculators.slice(0, 8); // Show top 8 for footer
        
        const calculatorLinks = topCalcs.map(calc => `
            <a href="${calc.url}" class="footer-calc-link ${calc.cpcTier}-tier" data-calculator="${calc.slug}">
                ${calc.icon} ${calc.title}
            </a>
        `).join('');

        return `
            <div class="footer-top-calculators">
                <h4>🚀 Top Revenue Calculators</h4>
                <div class="footer-calc-links">
                    ${calculatorLinks}
                </div>
            </div>
        `;
    }

    // Insert widget into page
    insertWidget(containerId, variant = 'sidebar') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.generateWidget(variant);
            this.attachClickTracking(container);
        }
    }

    // Track clicks for revenue optimization analytics
    attachClickTracking(container) {
        const links = container.querySelectorAll('a[data-calculator]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const calculatorSlug = e.currentTarget.getAttribute('data-calculator');
                const calculator = this.topCalculators.find(c => c.slug === calculatorSlug);
                
                if (calculator) {
                    // Track high-value calculator click
                    this.trackCalculatorClick(calculator);
                    
                    // Update recently viewed if available
                    if (window.recentlyViewed) {
                        window.recentlyViewed.trackCalculator(calculatorSlug, calculator.url);
                    }
                }
            });
        });
    }

    trackCalculatorClick(calculator) {
        // Revenue tracking for optimization
        const clickData = {
            calculator: calculator.slug,
            title: calculator.title,
            tier: calculator.cpcTier,
            timestamp: Date.now(),
            url: calculator.url
        };

        // Store in localStorage for analytics
        const clickHistory = JSON.parse(localStorage.getItem('freebiecalc-revenue-clicks') || '[]');
        clickHistory.unshift(clickData);
        
        // Keep last 50 clicks for analysis
        const limitedHistory = clickHistory.slice(0, 50);
        localStorage.setItem('freebiecalc-revenue-clicks', JSON.stringify(limitedHistory));

        // Optional: Send to analytics if configured
        if (window.gtag) {
            gtag('event', 'calculator_click', {
                'event_category': 'Revenue Optimization',
                'event_label': calculator.title,
                'value': calculator.priority
            });
        }
    }

    // Get revenue analytics data
    getRevenueAnalytics() {
        const clickHistory = JSON.parse(localStorage.getItem('freebiecalc-revenue-clicks') || '[]');
        
        const analytics = {
            totalClicks: clickHistory.length,
            tierDistribution: { premium: 0, high: 0, medium: 0 },
            topPerformers: {},
            recentActivity: clickHistory.slice(0, 10)
        };

        clickHistory.forEach(click => {
            const calculator = this.topCalculators.find(c => c.slug === click.calculator);
            if (calculator) {
                analytics.tierDistribution[calculator.cpcTier]++;
                analytics.topPerformers[click.calculator] = (analytics.topPerformers[click.calculator] || 0) + 1;
            }
        });

        return analytics;
    }

    // Initialize on page load
    init() {
        // Auto-insert widgets if containers exist
        this.insertWidget('top-calculators-sidebar', 'sidebar');
        this.insertWidget('top-calculators-homepage', 'homepage');
        this.insertWidget('top-calculators-footer', 'footer');
    }
}

// Auto-initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.topCalculators === 'undefined') {
        window.topCalculators = new TopCalculators();
        window.topCalculators.init();
    }
});

export { TopCalculators };