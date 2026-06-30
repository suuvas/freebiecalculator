// Recently Viewed Calculators component for FreebieCalculator.com
// Tracks user's calculator usage for better engagement and session length

class RecentlyViewed {
    constructor() {
        this.storageKey = 'freebiecalc-recent-calculators';
        this.maxItems = 5;
        this.calculatorData = {
            // High-CPC Finance Calculators (prioritized for revenue)
            'emi': { title: 'EMI Calculator', category: 'Finance', revenue: 'high' },
            'mortgage': { title: 'Mortgage Calculator', category: 'Finance', revenue: 'high' },
            'car-loan': { title: 'Car Loan Calculator', category: 'Finance', revenue: 'high' },
            'compound-interest': { title: 'Compound Interest Calculator', category: 'Finance', revenue: 'high' },
            'investment-roi': { title: 'Investment ROI Calculator', category: 'Finance', revenue: 'high' },
            'salary-after-tax': { title: 'Salary After Tax Calculator', category: 'Finance', revenue: 'high' },
            'tax': { title: 'Tax Calculator', category: 'Finance', revenue: 'high' },
            'simple-interest': { title: 'Simple Interest Calculator', category: 'Finance', revenue: 'medium' },
            'discount': { title: 'Discount Calculator', category: 'Finance', revenue: 'medium' },
            
            // Health Calculators (medium CPC)
            'bmi': { title: 'BMI Calculator', category: 'Health', revenue: 'medium' },
            'bmr': { title: 'BMR Calculator', category: 'Health', revenue: 'medium' },
            'calorie': { title: 'Daily Calorie Calculator', category: 'Health', revenue: 'medium' },
            'body-fat': { title: 'Body Fat Calculator', category: 'Health', revenue: 'medium' },
            'ideal-weight': { title: 'Ideal Weight Calculator', category: 'Health', revenue: 'medium' },
            
            // Educational/Math Calculators (lower CPC but high volume)
            'percentage': { title: 'Percentage Calculator', category: 'General', revenue: 'low' },
            'gpa': { title: 'GPA Calculator', category: 'Education', revenue: 'low' },
            'average': { title: 'Average Calculator', category: 'General', revenue: 'low' },
            'unit-converter': { title: 'Unit Converter', category: 'General', revenue: 'low' },
            
            // Other useful calculators
            'age': { title: 'Age Calculator', category: 'General', revenue: 'low' },
            'date-difference': { title: 'Date Difference Calculator', category: 'General', revenue: 'low' }
        };
    }

    // Track calculator visit for AdSense session optimization
    trackCalculator(slug, url) {
        if (!slug || !this.calculatorData[slug]) return;
        
        const recent = this.getRecentCalculators();
        const calculatorInfo = {
            slug: slug,
            title: this.calculatorData[slug].title,
            category: this.calculatorData[slug].category,
            revenue: this.calculatorData[slug].revenue,
            url: url || `/calculators/${slug}.html`,
            timestamp: Date.now(),
            date: new Date().toISOString().split('T')[0]
        };

        // Remove if already exists (move to front)
        const filtered = recent.filter(item => item.slug !== slug);
        
        // Add to beginning and limit to maxItems
        const updated = [calculatorInfo, ...filtered].slice(0, this.maxItems);
        
        localStorage.setItem(this.storageKey, JSON.stringify(updated));
        
        // Update widget if present on page
        this.updateWidget();
    }

    getRecentCalculators() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Failed to load recent calculators:', error);
            return [];
        }
    }

    // Generate widget HTML for better user engagement
    generateWidget() {
        const recent = this.getRecentCalculators();
        
        if (recent.length === 0) {
            return `
                <div class="widget recently-viewed-widget">
                    <h3>🕒 Recently Viewed</h3>
                    <p class="no-recent">Start using calculators to see your recent activity here!</p>
                </div>
            `;
        }

        const calculatorLinks = recent.map(calc => {
            const categoryIcon = this.getCategoryIcon(calc.category);
            const revenueClass = `revenue-${calc.revenue}`;
            
            return `
                <a href="${calc.url}" class="recent-calculator-link ${revenueClass}" data-calculator="${calc.slug}">
                    <span class="calculator-icon">${categoryIcon}</span>
                    <div class="calculator-info">
                        <span class="calculator-title">${calc.title}</span>
                        <span class="calculator-category">${calc.category}</span>
                    </div>
                    <span class="recent-indicator">✓</span>
                </a>
            `;
        }).join('');

        return `
            <div class="widget recently-viewed-widget">
                <h3>🕒 Recently Viewed Calculators</h3>
                <div class="recent-calculators-list">
                    ${calculatorLinks}
                </div>
                <div class="widget-footer">
                    <small>Keep calculating to unlock more features!</small>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            'Finance': '💰',
            'Health': '🏥',
            'Education': '📐',
            'General': '🔧'
        };
        return icons[category] || '🔧';
    }

    // Update widget if present on page
    updateWidget() {
        const container = document.getElementById('recently-viewed-container');
        if (container) {
            container.innerHTML = this.generateWidget();
        }
    }

    // Initialize widget on page load
    init() {
        // Auto-detect current calculator and track it
        const currentPath = window.location.pathname;
        const pathMatch = currentPath.match(/\/calculators\/([^\/]+)\.html/);
        
        if (pathMatch) {
            const slug = pathMatch[1];
            this.trackCalculator(slug, currentPath);
        }

        // Initialize widget if container exists
        this.updateWidget();
    }

    // Clear history (privacy feature)
    clearHistory() {
        localStorage.removeItem(this.storageKey);
        this.updateWidget();
    }

    // Get analytics data for revenue optimization
    getAnalytics() {
        const recent = this.getRecentCalculators();
        const analytics = {
            totalViews: recent.length,
            categories: {},
            revenueDistribution: { high: 0, medium: 0, low: 0 },
            topCalculators: recent.slice(0, 3)
        };

        recent.forEach(calc => {
            analytics.categories[calc.category] = (analytics.categories[calc.category] || 0) + 1;
            analytics.revenueDistribution[calc.revenue]++;
        });

        return analytics;
    }
}

// Auto-initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.recentlyViewed === 'undefined') {
        window.recentlyViewed = new RecentlyViewed();
        window.recentlyViewed.init();
    }
});

export { RecentlyViewed };