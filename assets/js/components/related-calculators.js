// Related Calculators component for FreebieCalculator.com

class RelatedCalculators {
    constructor() {
        this.calculatorData = {
            // Finance Calculators
            'emi': {
                title: 'EMI Calculator',
                description: 'Calculate Equated Monthly Installments',
                url: '/calculators/emi.html',
                category: 'Finance',
                related: ['car-loan', 'mortgage', 'simple-interest', 'compound-interest']
            },
            'car-loan': {
                title: 'Car Loan Calculator',
                description: 'Calculate car loan payments and total cost',
                url: '/calculators/car-loan.html',
                category: 'Finance',
                related: ['emi', 'simple-interest', 'compound-interest', 'discount']
            },
            'mortgage': {
                title: 'Mortgage Calculator',
                description: 'Calculate mortgage payments and amortization',
                url: '/calculators/mortgage.html',
                category: 'Finance',
                related: ['emi', 'compound-interest', 'simple-interest', 'tax']
            },
            'compound-interest': {
                title: 'Compound Interest Calculator',
                description: 'Calculate compound interest and investment growth',
                url: '/calculators/compound-interest.html',
                category: 'Finance',
                related: ['simple-interest', 'investment-roi', 'emi', 'mortgage']
            },
            'simple-interest': {
                title: 'Simple Interest Calculator',
                description: 'Calculate simple interest on loans and investments',
                url: '/calculators/simple-interest.html',
                category: 'Finance',
                related: ['compound-interest', 'emi', 'investment-roi', 'car-loan']
            },
            'investment-roi': {
                title: 'Investment ROI Calculator',
                description: 'Calculate return on investment percentage',
                url: '/calculators/investment-roi.html',
                category: 'Finance',
                related: ['compound-interest', 'simple-interest', 'percentage', 'tax']
            },
            'salary-after-tax': {
                title: 'Salary After Tax Calculator',
                description: 'Calculate take-home salary after taxes',
                url: '/calculators/salary-after-tax.html',
                category: 'Finance',
                related: ['tax', 'percentage', 'investment-roi', 'compound-interest']
            },
            'tax': {
                title: 'Tax Calculator',
                description: 'Estimate your tax liability',
                url: '/calculators/tax.html',
                category: 'Finance',
                related: ['salary-after-tax', 'percentage', 'investment-roi', 'mortgage']
            },
            'currency-converter': {
                title: 'Currency Converter',
                description: 'Convert between different currencies',
                url: '/calculators/currency-converter.html',
                category: 'Finance',
                related: ['percentage', 'unit-converter', 'investment-roi', 'discount']
            },
            
            // Health Calculators
            'bmi': {
                title: 'BMI Calculator',
                description: 'Calculate your Body Mass Index',
                url: '/calculators/bmi.html',
                category: 'Health',
                related: ['bmr', 'calorie', 'age', 'unit-converter']
            },
            'bmr': {
                title: 'BMR Calculator',
                description: 'Calculate your Basal Metabolic Rate',
                url: '/calculators/bmr.html',
                category: 'Health',
                related: ['bmi', 'calorie', 'age', 'percentage']
            },
            'calorie': {
                title: 'Daily Calorie Calculator',
                description: 'Calculate your daily calorie needs',
                url: '/calculators/calorie.html',
                category: 'Health',
                related: ['bmi', 'bmr', 'percentage', 'age']
            },
            
            // General & Education Calculators
            'age': {
                title: 'Age Calculator',
                description: 'Calculate your exact age in years, months, and days',
                url: '/calculators/age.html',
                category: 'General',
                related: ['date-difference', 'percentage', 'bmi', 'bmr']
            },
            'percentage': {
                title: 'Percentage Calculator',
                description: 'Calculate percentages, increases, and decreases',
                url: '/calculators/percentage.html',
                category: 'General',
                related: ['discount', 'investment-roi', 'tax', 'gpa']
            },
            'unit-converter': {
                title: 'Unit Converter',
                description: 'Convert between different units of measurement',
                url: '/calculators/unit-converter.html',
                category: 'General',
                related: ['currency-converter', 'bmi', 'percentage', 'age']
            },
            'date-difference': {
                title: 'Date Difference Calculator',
                description: 'Calculate days between dates or add/subtract days',
                url: '/calculators/date-difference.html',
                category: 'General',
                related: ['age', 'compound-interest', 'simple-interest', 'percentage']
            },
            'gpa': {
                title: 'GPA Calculator',
                description: 'Calculate your Grade Point Average',
                url: '/calculators/gpa.html',
                category: 'Education',
                related: ['cgpa', 'percentage', 'average', 'age']
            },
            'cgpa': {
                title: 'CGPA Calculator',
                description: 'Calculate your Cumulative Grade Point Average',
                url: '/calculators/cgpa.html',
                category: 'Education',
                related: ['gpa', 'average', 'percentage', 'age']
            },
            'average': {
                title: 'Average Calculator',
                description: 'Calculate mean, median, and mode of numbers',
                url: '/calculators/average.html',
                category: 'General',
                related: ['gpa', 'cgpa', 'percentage', 'unit-converter']
            },
            'discount': {
                title: 'Discount Calculator',
                description: 'Calculate discounts and final prices',
                url: '/calculators/discount.html',
                category: 'General',
                related: ['percentage', 'tax', 'car-loan', 'currency-converter']
            },
            // New Finance Calculators
            'hourly-to-salary': {
                title: 'Hourly to Salary Calculator',
                description: 'Convert hourly wage to annual salary',
                url: '/calculators/hourly-to-salary.html',
                category: 'Finance',
                related: ['salary-after-tax', 'paycheck', 'tax', 'compound-interest']
            },
            'paycheck': {
                title: 'Paycheck Calculator',
                description: 'Estimate take-home pay after taxes',
                url: '/calculators/paycheck.html',
                category: 'Finance',
                related: ['salary-after-tax', 'hourly-to-salary', 'tax', 'debt-to-income']
            },
            'debt-to-income': {
                title: 'Debt-to-Income Calculator',
                description: 'Calculate your DTI ratio for loan approval',
                url: '/calculators/debt-to-income.html',
                category: 'Finance',
                related: ['mortgage', 'loan-to-value', 'paycheck', 'net-worth']
            },
            'cagr': {
                title: 'CAGR Calculator',
                description: 'Compound Annual Growth Rate for investments',
                url: '/calculators/cagr.html',
                category: 'Finance',
                related: ['compound-interest', 'investment-roi', 'simple-interest', 'retirement']
            },
            'net-worth': {
                title: 'Net Worth Calculator',
                description: 'Calculate total assets minus liabilities',
                url: '/calculators/net-worth.html',
                category: 'Finance',
                related: ['retirement', 'investment-roi', 'debt-to-income', 'mortgage']
            },
            'loan-to-value': {
                title: 'Loan-to-Value Calculator',
                description: 'LTV ratio for mortgages and PMI',
                url: '/calculators/loan-to-value.html',
                category: 'Finance',
                related: ['mortgage', 'debt-to-income', 'amortization', 'net-worth']
            },
            'gst-hst': {
                title: 'GST/HST Calculator',
                description: 'Calculate Canadian GST, HST, PST and QST',
                url: '/calculators/gst-hst.html',
                category: 'Finance',
                related: ['sales-tax', 'tax', 'discount', 'tip']
            },
            // New Health Calculators
            'sleep': {
                title: 'Sleep Calculator',
                description: 'Find best wake-up time based on sleep cycles',
                url: '/calculators/sleep.html',
                category: 'Health',
                related: ['bmr', 'calorie', 'water-intake', 'bmi']
            },
            'ovulation': {
                title: 'Ovulation Calculator',
                description: 'Predict your most fertile days',
                url: '/calculators/ovulation.html',
                category: 'Health',
                related: ['due-date', 'pregnancy', 'bmi', 'ideal-weight']
            },
            'due-date': {
                title: 'Due Date Calculator',
                description: 'Calculate your baby\'s due date and milestones',
                url: '/calculators/due-date.html',
                category: 'Health',
                related: ['pregnancy', 'ovulation', 'bmi', 'water-intake']
            },
            'macro-calculator': {
                title: 'Macro Calculator',
                description: 'Daily protein, carbs and fat targets',
                url: '/calculators/macro-calculator.html',
                category: 'Health',
                related: ['calorie', 'bmr', 'bmi', 'body-fat', 'ideal-weight']
            },
            // New Other Calculators
            'love': {
                title: 'Love Calculator',
                description: 'Test romantic compatibility percentage',
                url: '/calculators/love.html',
                category: 'Other',
                related: ['age', 'date-difference', 'random-number', 'percentage']
            },
            'square-footage': {
                title: 'Square Footage Calculator',
                description: 'Calculate room or floor area in sq ft',
                url: '/calculators/square-footage.html',
                category: 'Construction',
                related: ['area', 'concrete', 'volume', 'unit-converter']
            }
        };
    }
    
    getRelatedCalculators(currentCalculator, count = 4) {
        const calculator = this.calculatorData[currentCalculator];
        if (!calculator) return [];
        
        const related = calculator.related.slice(0, count);
        return related.map(slug => ({
            slug: slug,
            ...this.calculatorData[slug]
        })).filter(calc => calc.title); // Filter out any undefined calculators
    }
    
    getCalculatorsByCategory(category, excludeSlug = null, count = 6) {
        const calculators = [];
        
        for (const [slug, data] of Object.entries(this.calculatorData)) {
            if (data.category === category && slug !== excludeSlug) {
                calculators.push({
                    slug: slug,
                    ...data
                });
            }
        }
        
        return calculators.slice(0, count);
    }
    
    renderRelatedCalculators(container, currentCalculator, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        const {
            count = 4,
            title = 'Related Calculators',
            showDescription = true,
            className = 'related-calculators'
        } = options;
        
        const related = this.getRelatedCalculators(currentCalculator, count);
        
        if (related.length === 0) return;
        
        const html = `
            <section class="${className}">
                <h2>${title}</h2>
                <div class="calculator-grid">
                    ${related.map(calc => `
                        <a href="${calc.url}" class="calculator-card">
                            <h3>${calc.title}</h3>
                            ${showDescription ? `<p>${calc.description}</p>` : ''}
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
        
        container.innerHTML = html;
    }
    
    renderCategoryCalculators(container, category, excludeSlug = null, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        const {
            count = 6,
            title = `${category} Calculators`,
            showDescription = true,
            className = 'category-calculators'
        } = options;
        
        const calculators = this.getCalculatorsByCategory(category, excludeSlug, count);
        
        if (calculators.length === 0) return;
        
        const html = `
            <section class="${className}">
                <h2>${title}</h2>
                <div class="calculator-grid">
                    ${calculators.map(calc => `
                        <a href="${calc.url}" class="calculator-card">
                            <h3>${calc.title}</h3>
                            ${showDescription ? `<p>${calc.description}</p>` : ''}
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
        
        container.innerHTML = html;
    }
    
    // Auto-detect current calculator from URL and render related calculators
    autoRender() {
        const currentPath = window.location.pathname;
        const match = currentPath.match(/\/calculators\/([^\.]+)\.html/);
        
        if (!match) return;
        
        const currentCalculator = match[1];
        
        // Look for related calculators containers
        const relatedContainers = document.querySelectorAll('.related-calculators-auto');
        relatedContainers.forEach(container => {
            this.renderRelatedCalculators(container, currentCalculator);
        });
        
        // Look for category calculators containers
        const categoryContainers = document.querySelectorAll('.category-calculators-auto');
        categoryContainers.forEach(container => {
            const calculator = this.calculatorData[currentCalculator];
            if (calculator) {
                this.renderCategoryCalculators(container, calculator.category, currentCalculator);
            }
        });
    }
}

// Auto-initialize related calculators on page load
document.addEventListener('DOMContentLoaded', function() {
    const relatedCalculators = new RelatedCalculators();
    relatedCalculators.autoRender();
});

export default RelatedCalculators;