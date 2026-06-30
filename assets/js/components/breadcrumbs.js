// Breadcrumbs component for FreebieCalculator.com

class Breadcrumbs {
    constructor() {
        this.routes = {
            '/': 'Home',
            '/blog/': 'Blog',
            '/calculators/': 'Calculators',
            '/about.html': 'About',
            '/contact.html': 'Contact',
            '/privacy.html': 'Privacy Policy',
            '/terms.html': 'Terms of Service',
            '/disclaimer.html': 'Disclaimer',
            '/editorial-policy.html': 'Editorial Policy',
            '/review-process.html': 'Review Process',
            '/update-log.html': 'Update Log',
            
            // Calculator pages
            '/calculators/age.html': 'Age Calculator',
            '/calculators/percentage.html': 'Percentage Calculator',
            '/calculators/unit-converter.html': 'Unit Converter',
            '/calculators/date-difference.html': 'Date Difference Calculator',
            '/calculators/gpa.html': 'GPA Calculator',
            '/calculators/cgpa.html': 'CGPA Calculator',
            '/calculators/average.html': 'Average Calculator',
            '/calculators/discount.html': 'Discount Calculator',
            '/calculators/bmi.html': 'BMI Calculator',
            '/calculators/bmr.html': 'BMR Calculator',
            '/calculators/calorie.html': 'Daily Calorie Calculator',
            '/calculators/emi.html': 'EMI Calculator',
            '/calculators/mortgage.html': 'Mortgage Calculator',
            '/calculators/compound-interest.html': 'Compound Interest Calculator',
            '/calculators/simple-interest.html': 'Simple Interest Calculator',
            '/calculators/investment-roi.html': 'Investment ROI Calculator',
            '/calculators/salary-after-tax.html': 'Salary After Tax Calculator',
            '/calculators/tax.html': 'Tax Calculator',
            '/calculators/car-loan.html': 'Car Loan Calculator',
            '/calculators/currency-converter.html': 'Currency Converter',
            
            // Blog posts
            '/blog/posts/how-to-use-loan-calculator.html': 'How to Use a Loan Calculator',
            '/blog/posts/compound-interest-vs-simple-interest.html': 'Compound vs Simple Interest',
            '/blog/posts/bmi-vs-body-fat.html': 'BMI vs Body Fat'
        };
        
        this.categories = {
            '/calculators/age.html': 'General & Education',
            '/calculators/percentage.html': 'General & Education',
            '/calculators/unit-converter.html': 'General & Education',
            '/calculators/date-difference.html': 'General & Education',
            '/calculators/gpa.html': 'General & Education',
            '/calculators/cgpa.html': 'General & Education',
            '/calculators/average.html': 'General & Education',
            '/calculators/discount.html': 'General & Education',
            '/calculators/bmi.html': 'Health',
            '/calculators/bmr.html': 'Health',
            '/calculators/calorie.html': 'Health',
            '/calculators/emi.html': 'Finance',
            '/calculators/mortgage.html': 'Finance',
            '/calculators/compound-interest.html': 'Finance',
            '/calculators/simple-interest.html': 'Finance',
            '/calculators/investment-roi.html': 'Finance',
            '/calculators/salary-after-tax.html': 'Finance',
            '/calculators/tax.html': 'Finance',
            '/calculators/car-loan.html': 'Finance',
            '/calculators/currency-converter.html': 'Finance'
        };
    }
    
    generateBreadcrumbs(currentPath) {
        const breadcrumbs = [];
        
        // Always start with Home
        breadcrumbs.push({
            name: 'Home',
            url: '/',
            current: currentPath === '/'
        });
        
        // Handle special cases
        if (currentPath === '/') {
            return breadcrumbs;
        }
        
        // Parse the path
        const pathParts = currentPath.split('/').filter(part => part);
        let currentUrl = '';
        
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            currentUrl += '/' + part;
            
            // Handle index files
            if (part === 'index.html' || part === '') continue;
            
            // Build the full path for lookup
            let lookupPath = currentUrl;
            if (!lookupPath.endsWith('.html') && !lookupPath.endsWith('/')) {
                lookupPath += '/';
            }
            
            // Get the name from routes or generate it
            let name = this.routes[lookupPath] || this.routes[currentUrl + '.html'];
            
            if (!name) {
                // Generate name from path
                name = part.replace(/-/g, ' ').replace(/\.html$/, '');
                name = name.charAt(0).toUpperCase() + name.slice(1);
            }
            
            // Check if this is the current page
            const isCurrent = (i === pathParts.length - 1);
            
            breadcrumbs.push({
                name: name,
                url: isCurrent ? null : (lookupPath.endsWith('/') ? lookupPath : currentUrl + '.html'),
                current: isCurrent
            });
        }
        
        return breadcrumbs;
    }
    
    renderBreadcrumbs(container, currentPath) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        const breadcrumbs = this.generateBreadcrumbs(currentPath);
        
        const breadcrumbHtml = breadcrumbs.map((crumb, index) => {
            if (crumb.current || !crumb.url) {
                return `<span>${crumb.name}</span>`;
            } else {
                return `<a href="${crumb.url}">${crumb.name}</a>`;
            }
        }).join(' › ');
        
        container.innerHTML = breadcrumbHtml;
    }
    
    generateStructuredData(currentPath) {
        const breadcrumbs = this.generateBreadcrumbs(currentPath);
        
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": crumb.url ? `https://freebiecalculator.com${crumb.url}` : undefined
            })).filter(item => item.item) // Remove items without URLs
        };
    }
}

// Auto-initialize breadcrumbs on page load
document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbsInstance = new Breadcrumbs();
    const currentPath = window.location.pathname;
    
    // Render breadcrumbs in any element with class 'breadcrumbs'
    const breadcrumbContainers = document.querySelectorAll('.breadcrumbs');
    breadcrumbContainers.forEach(container => {
        breadcrumbsInstance.renderBreadcrumbs(container, currentPath);
    });
    
    // Add structured data if not already present
    const existingBreadcrumbSchema = document.querySelector('script[type="application/ld+json"]');
    if (!existingBreadcrumbSchema || !existingBreadcrumbSchema.textContent.includes('BreadcrumbList')) {
        const structuredData = breadcrumbsInstance.generateStructuredData(currentPath);
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
});

export default Breadcrumbs;