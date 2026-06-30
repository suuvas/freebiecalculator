// Search index for FreebieCalculator.com
// This file contains all searchable content for client-side search

const searchIndex = [
    // Calculators
    {
        title: 'EMI Calculator',
        description: 'Calculate Equated Monthly Installments for loans. Understand loan payments, interest costs, and plan your budget effectively.',
        url: '/calculators/emi.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['loan', 'emi', 'monthly payment', 'interest', 'finance', 'banking']
    },
    {
        title: 'Car Loan Calculator',
        description: 'Calculate car loan payments and total cost. Factor in down payments, trade-in values, and additional fees.',
        url: '/calculators/car-loan.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['car loan', 'auto loan', 'vehicle financing', 'down payment', 'trade-in', 'finance']
    },
    {
        title: 'Mortgage Calculator',
        description: 'Calculate mortgage payments and amortization schedules. Plan your home loan with PMI, taxes, and insurance.',
        url: '/calculators/mortgage.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['mortgage', 'home loan', 'real estate', 'property', 'amortization', 'pmi']
    },
    {
        title: 'Compound Interest Calculator',
        description: 'Calculate compound interest and investment growth. See how your money grows over time with compounding.',
        url: '/calculators/compound-interest.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['compound interest', 'investment', 'savings', 'compounding', 'wealth building']
    },
    {
        title: 'Simple Interest Calculator',
        description: 'Calculate simple interest on loans and investments. Understand basic interest calculations.',
        url: '/calculators/simple-interest.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['simple interest', 'basic interest', 'loan interest', 'investment returns']
    },
    {
        title: 'Investment ROI Calculator',
        description: 'Calculate return on investment percentage. Analyze investment performance and profitability.',
        url: '/calculators/investment-roi.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['roi', 'return on investment', 'investment analysis', 'profitability', 'gains']
    },
    {
        title: 'Salary After Tax Calculator',
        description: 'Calculate take-home salary after taxes. Understand your net income and deductions.',
        url: '/calculators/salary-after-tax.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['salary', 'take home pay', 'net income', 'tax deductions', 'payroll']
    },
    {
        title: 'Tax Calculator',
        description: 'Estimate your tax liability. Calculate income taxes and plan for tax season.',
        url: '/calculators/tax.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['tax', 'income tax', 'tax planning', 'tax liability', 'deductions']
    },
    {
        title: 'Currency Converter',
        description: 'Convert between different currencies. Get current exchange rates and conversion values.',
        url: '/calculators/currency-converter.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['currency', 'exchange rate', 'forex', 'international', 'money conversion']
    },
    {
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index. Assess your weight status and health category.',
        url: '/calculators/bmi.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['bmi', 'body mass index', 'weight', 'health', 'obesity', 'fitness']
    },
    {
        title: 'BMR Calculator',
        description: 'Calculate your Basal Metabolic Rate. Understand your daily calorie needs at rest.',
        url: '/calculators/bmr.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['bmr', 'basal metabolic rate', 'metabolism', 'calories', 'energy expenditure']
    },
    {
        title: 'Daily Calorie Calculator',
        description: 'Calculate your daily calorie needs. Plan your diet and nutrition goals effectively.',
        url: '/calculators/calorie.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['calories', 'nutrition', 'diet', 'weight management', 'tdee', 'energy needs']
    },
    {
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days. Track birthdays and milestones.',
        url: '/calculators/age.html',
        type: 'Calculator',
        category: 'General',
        tags: ['age', 'birthday', 'date calculation', 'time', 'years', 'months', 'days']
    },
    {
        title: 'Percentage Calculator',
        description: 'Calculate percentages, increases, and decreases. Solve percentage problems easily.',
        url: '/calculators/percentage.html',
        type: 'Calculator',
        category: 'General',
        tags: ['percentage', 'percent', 'increase', 'decrease', 'change', 'proportion']
    },
    {
        title: 'Unit Converter',
        description: 'Convert between different units of measurement. Length, weight, temperature, and more.',
        url: '/calculators/unit-converter.html',
        type: 'Calculator',
        category: 'General',
        tags: ['unit conversion', 'measurement', 'metric', 'imperial', 'length', 'weight', 'temperature']
    },
    {
        title: 'Date Difference Calculator',
        description: 'Calculate days between dates or add/subtract days. Plan events and deadlines.',
        url: '/calculators/date-difference.html',
        type: 'Calculator',
        category: 'General',
        tags: ['date', 'time', 'days between', 'calendar', 'planning', 'deadline']
    },
    {
        title: 'GPA Calculator',
        description: 'Calculate your Grade Point Average. Track academic performance and grades.',
        url: '/calculators/gpa.html',
        type: 'Calculator',
        category: 'Education',
        tags: ['gpa', 'grade point average', 'grades', 'academic', 'student', 'education']
    },
    {
        title: 'CGPA Calculator',
        description: 'Calculate your Cumulative Grade Point Average. Track overall academic performance.',
        url: '/calculators/cgpa.html',
        type: 'Calculator',
        category: 'Education',
        tags: ['cgpa', 'cumulative gpa', 'semester grades', 'academic performance', 'student']
    },
    {
        title: 'Average Calculator',
        description: 'Calculate mean, median, and mode of numbers. Statistical analysis made simple.',
        url: '/calculators/average.html',
        type: 'Calculator',
        category: 'General',
        tags: ['average', 'mean', 'median', 'mode', 'statistics', 'data analysis']
    },
    {
        title: 'Discount Calculator',
        description: 'Calculate discounts and final prices. Find sale prices and savings amounts.',
        url: '/calculators/discount.html',
        type: 'Calculator',
        category: 'General',
        tags: ['discount', 'sale price', 'savings', 'markdown', 'shopping', 'price reduction']
    },
    
    // Blog Posts
    {
        title: 'How to Use a Loan Calculator: EMI Calculation Guide',
        description: 'Learn how to calculate EMI accurately with our step-by-step guide. Understand loan formulas, factors affecting payments, and how to use calculators for better financial decisions.',
        url: '/blog/posts/how-to-use-loan-calculator.html',
        type: 'Guide',
        category: 'Finance',
        tags: ['loan calculator', 'emi guide', 'financial planning', 'loan tips', 'borrowing']
    },
    {
        title: 'Compound Interest vs Simple Interest: Complete Comparison',
        description: 'Understand the crucial difference between compound and simple interest. Learn how compounding frequency affects investments and which calculation method to use.',
        url: '/blog/posts/compound-interest-vs-simple-interest.html',
        type: 'Guide',
        category: 'Finance',
        tags: ['compound interest', 'simple interest', 'investment guide', 'compounding', 'interest comparison']
    },
    {
        title: 'BMI vs Body Fat: Understanding the Difference',
        description: 'Discover why BMI and body fat percentage tell different stories about your health. Learn when to use each measurement and their limitations.',
        url: '/blog/posts/bmi-vs-body-fat.html',
        type: 'Guide',
        category: 'Health',
        tags: ['bmi guide', 'body fat', 'health assessment', 'fitness metrics', 'body composition']
    },
    
    // Main Pages
    {
        title: 'FreebieCalculator - Free Online Calculators',
        description: 'Use free, fast, and accurate online calculators for finance, health, education, and everyday math. No login required. Mobile-friendly.',
        url: '/',
        type: 'Page',
        category: 'General',
        tags: ['home', 'calculators', 'free tools', 'math', 'finance', 'health', 'education']
    },
    {
        title: 'Calculator Guides & Tips - Blog',
        description: 'Expert guides on using financial, health, and educational calculators effectively. Learn formulas, tips, and best practices.',
        url: '/blog/',
        type: 'Page',
        category: 'General',
        tags: ['blog', 'guides', 'tips', 'calculator help', 'tutorials']
    },
    {
        title: 'About FreebieCalculator',
        description: 'Learn about FreebieCalculator.com, our mission to provide accurate and accessible calculation tools for everyone.',
        url: '/about.html',
        type: 'Page',
        category: 'General',
        tags: ['about', 'mission', 'company', 'calculator platform']
    },
    {
        title: 'Hourly to Salary Calculator',
        description: 'Convert hourly wage to annual, monthly, weekly, and daily salary. Includes full-time and part-time options.',
        url: '/calculators/hourly-to-salary.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['hourly to salary', 'hourly wage', 'annual salary', 'salary converter', 'wage calculator', 'pay calculator']
    },
    {
        title: 'Paycheck Calculator',
        description: 'Estimate take-home pay after federal tax, state tax, Social Security, and Medicare deductions.',
        url: '/calculators/paycheck.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['paycheck', 'take home pay', 'net pay', 'salary after tax', 'payroll calculator', 'paycheck estimator']
    },
    {
        title: 'Debt-to-Income Calculator',
        description: 'Calculate your debt-to-income ratio for mortgage and loan qualification. Know your DTI before applying.',
        url: '/calculators/debt-to-income.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['debt to income', 'DTI ratio', 'mortgage qualification', 'loan approval', 'debt ratio']
    },
    {
        title: 'CAGR Calculator',
        description: 'Calculate Compound Annual Growth Rate for investments, revenue, or any metric over time.',
        url: '/calculators/cagr.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['CAGR', 'compound annual growth rate', 'investment growth', 'annual return', 'growth rate calculator']
    },
    {
        title: 'Net Worth Calculator',
        description: 'Calculate your total net worth by subtracting liabilities from assets. Track your financial health.',
        url: '/calculators/net-worth.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['net worth', 'assets liabilities', 'wealth calculator', 'financial health', 'total worth']
    },
    {
        title: 'Loan-to-Value Calculator',
        description: 'Calculate LTV ratio for mortgages. Find out if you need PMI and how much equity you have.',
        url: '/calculators/loan-to-value.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['loan to value', 'LTV ratio', 'mortgage LTV', 'PMI calculator', 'home equity', 'down payment']
    },
    {
        title: 'GST/HST Calculator',
        description: 'Calculate Canadian GST, HST, PST, and QST for all provinces and territories.',
        url: '/calculators/gst-hst.html',
        type: 'Calculator',
        category: 'Finance',
        tags: ['GST', 'HST', 'PST', 'QST', 'Canadian sales tax', 'Canada tax calculator', 'Ontario HST', 'BC PST']
    },
    {
        title: 'Sleep Calculator',
        description: 'Find the best time to wake up or go to sleep based on 90-minute sleep cycles. Wake up refreshed.',
        url: '/calculators/sleep.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['sleep calculator', 'wake up time', 'sleep cycles', 'bedtime calculator', 'REM sleep', 'best sleep time']
    },
    {
        title: 'Ovulation Calculator',
        description: 'Predict your ovulation date and most fertile days based on your menstrual cycle.',
        url: '/calculators/ovulation.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['ovulation calculator', 'fertile days', 'ovulation date', 'menstrual cycle', 'fertility calculator', 'conception']
    },
    {
        title: 'Due Date Calculator',
        description: "Calculate your baby's due date and pregnancy milestones from your last menstrual period or conception date.",
        url: '/calculators/due-date.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['due date calculator', 'pregnancy due date', 'baby due date', 'LMP calculator', 'pregnancy week', 'EDD']
    },
    {
        title: 'Macro Calculator',
        description: 'Calculate daily protein, carbohydrate, and fat targets based on your goals, weight, and activity level.',
        url: '/calculators/macro-calculator.html',
        type: 'Calculator',
        category: 'Health',
        tags: ['macro calculator', 'macros', 'protein calculator', 'carb calculator', 'fat calculator', 'IIFYM', 'diet macros']
    },
    {
        title: 'Love Calculator',
        description: 'Fun love compatibility calculator. Test your romantic match percentage with your partner.',
        url: '/calculators/love.html',
        type: 'Calculator',
        category: 'Other',
        tags: ['love calculator', 'love compatibility', 'relationship match', 'romantic compatibility', 'love percentage']
    },
    {
        title: 'Square Footage Calculator',
        description: 'Calculate square footage of any room, floor, or space. Supports rectangles, triangles, and irregular shapes.',
        url: '/calculators/square-footage.html',
        type: 'Calculator',
        category: 'Construction',
        tags: ['square footage', 'square feet calculator', 'room size', 'floor area', 'house square footage', 'sq ft']
    },
    {
        title: 'Contact Us',
        description: 'Get in touch with the FreebieCalculator team. Questions, feedback, or suggestions welcome.',
        url: '/contact.html',
        type: 'Page',
        category: 'General',
        tags: ['contact', 'support', 'feedback', 'questions', 'help']
    },
    {
        title: 'Privacy Policy',
        description: 'Our privacy policy explains how we protect your data and respect your privacy while using our calculators.',
        url: '/privacy.html',
        type: 'Page',
        category: 'General',
        tags: ['privacy', 'data protection', 'policy', 'security']
    },
    {
        title: 'Terms of Service',
        description: 'Terms and conditions for using FreebieCalculator.com and our online calculation tools.',
        url: '/terms.html',
        type: 'Page',
        category: 'General',
        tags: ['terms', 'conditions', 'legal', 'usage policy']
    },
    {
        title: 'Disclaimer',
        description: 'Important disclaimers for using FreebieCalculator.com\'s financial, health, and educational calculators.',
        url: '/disclaimer.html',
        type: 'Page',
        category: 'General',
        tags: ['disclaimer', 'limitations', 'legal notice', 'accuracy']
    },
    {
        title: 'Editorial Policy',
        description: 'Our editorial standards and guidelines for creating accurate, reliable, and helpful online calculators and content.',
        url: '/editorial-policy.html',
        type: 'Page',
        category: 'General',
        tags: ['editorial policy', 'standards', 'accuracy', 'quality']
    },
    {
        title: 'Review Process',
        description: 'How we verify, test, and validate our online calculators to ensure accuracy and reliability.',
        url: '/review-process.html',
        type: 'Page',
        category: 'General',
        tags: ['review process', 'validation', 'testing', 'quality assurance']
    },
    {
        title: 'Update Log',
        description: 'Track updates, improvements, and changes to FreebieCalculator.com\'s online calculators and features.',
        url: '/update-log.html',
        type: 'Page',
        category: 'General',
        tags: ['updates', 'changelog', 'improvements', 'version history']
    }
];

export default searchIndex;