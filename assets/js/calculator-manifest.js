// Calculator Manifest for FreebieCalculator.com Blog Engine
// All 60+ calculators with categories and related tools for maximum AdSense revenue

export const CALCULATORS = [
    // HIGH-CPC FINANCE CALCULATORS (Premium AdSense Revenue)
    {
        slug: "mortgage",
        title: "Mortgage Calculator", 
        category: "Finance",
        cpcTier: "premium", // $3-8 CPC
        related: ["car-loan", "emi", "compound-interest", "simple-interest", "amortization"]
    },
    {
        slug: "car-loan",
        title: "Car Loan Calculator",
        category: "Finance", 
        cpcTier: "premium",
        related: ["mortgage", "emi", "simple-interest", "compound-interest", "discount"]
    },
    {
        slug: "emi",
        title: "EMI Calculator",
        category: "Finance",
        cpcTier: "premium", 
        related: ["mortgage", "car-loan", "simple-interest", "compound-interest", "amortization"]
    },
    {
        slug: "investment-roi",
        title: "Investment ROI Calculator",
        category: "Finance",
        cpcTier: "high", // $2-5 CPC
        related: ["compound-interest", "simple-interest", "retirement", "inflation", "percentage"]
    },
    {
        slug: "compound-interest",
        title: "Compound Interest Calculator", 
        category: "Finance",
        cpcTier: "high",
        related: ["simple-interest", "investment-roi", "retirement", "mortgage", "car-loan"]
    },
    {
        slug: "simple-interest",
        title: "Simple Interest Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["compound-interest", "investment-roi", "mortgage", "car-loan", "emi"]
    },
    {
        slug: "salary-after-tax", 
        title: "Salary After Tax Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["tax", "percentage", "investment-roi", "retirement", "compound-interest"]
    },
    {
        slug: "tax",
        title: "Tax Calculator",
        category: "Finance", 
        cpcTier: "high",
        related: ["salary-after-tax", "sales-tax", "percentage", "investment-roi", "retirement"]
    },
    {
        slug: "retirement",
        title: "Retirement Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["compound-interest", "investment-roi", "salary-after-tax", "tax", "inflation"]
    },
    {
        slug: "amortization",
        title: "Amortization Calculator",
        category: "Finance",
        cpcTier: "high", 
        related: ["mortgage", "car-loan", "emi", "simple-interest", "compound-interest"]
    },
    {
        slug: "sales-tax",
        title: "Sales Tax Calculator",
        category: "Finance",
        cpcTier: "medium", // $1-3 CPC
        related: ["tax", "discount", "percentage", "tip", "currency-converter"]
    },
    {
        slug: "discount",
        title: "Discount Calculator", 
        category: "Finance",
        cpcTier: "medium",
        related: ["percentage", "sales-tax", "tip", "car-loan", "currency-converter"]
    },
    {
        slug: "inflation",
        title: "Inflation Calculator",
        category: "Finance",
        cpcTier: "medium",
        related: ["investment-roi", "retirement", "compound-interest", "currency-converter", "percentage"]
    },
    {
        slug: "currency-converter",
        title: "Currency Converter",
        category: "Finance", 
        cpcTier: "medium",
        related: ["percentage", "discount", "sales-tax", "inflation", "tip"]
    },
    {
        slug: "fuel-cost",
        title: "Fuel Cost Calculator",
        category: "Finance",
        cpcTier: "medium",
        related: ["car-loan", "discount", "percentage", "currency-converter", "tip"]
    },
    {
        slug: "payment",
        title: "Payment Calculator",
        category: "Finance",
        cpcTier: "medium",
        related: ["emi", "mortgage", "car-loan", "amortization", "simple-interest"]
    },
    {
        slug: "tip",
        title: "Tip Calculator",
        category: "Finance", 
        cpcTier: "low", // $0.5-1.5 CPC
        related: ["percentage", "discount", "sales-tax", "currency-converter", "fuel-cost"]
    },

    // HEALTH CALCULATORS (Medium CPC)
    {
        slug: "bmi",
        title: "BMI Calculator",
        category: "Health",
        cpcTier: "medium", // $1-3 CPC
        related: ["bmr", "calorie", "body-fat", "ideal-weight", "water-intake"]
    },
    {
        slug: "bmr", 
        title: "BMR Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["bmi", "calorie", "body-fat", "ideal-weight", "water-intake"]
    },
    {
        slug: "calorie",
        title: "Daily Calorie Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["bmr", "bmi", "body-fat", "ideal-weight", "water-intake"]
    },
    {
        slug: "body-fat",
        title: "Body Fat Calculator", 
        category: "Health",
        cpcTier: "medium",
        related: ["bmi", "bmr", "calorie", "ideal-weight", "water-intake"]
    },
    {
        slug: "ideal-weight",
        title: "Ideal Weight Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["bmi", "bmr", "calorie", "body-fat", "water-intake"]
    },
    {
        slug: "water-intake",
        title: "Water Intake Calculator",
        category: "Health", 
        cpcTier: "medium",
        related: ["bmi", "bmr", "calorie", "body-fat", "ideal-weight"]
    },
    {
        slug: "pregnancy",
        title: "Pregnancy Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["age", "date-difference", "calorie", "water-intake", "bmi"]
    },
    {
        slug: "pace",
        title: "Pace Calculator",
        category: "Health",
        cpcTier: "low",
        related: ["calorie", "bmr", "time-calculator", "unit-converter", "fuel-cost"]
    },

    // EDUCATION CALCULATORS (Low-Medium CPC but High Volume)
    {
        slug: "gpa",
        title: "GPA Calculator",
        category: "Education", 
        cpcTier: "medium", // $1-2 CPC but high search volume
        related: ["cgpa", "grade", "percentage", "average", "fraction"]
    },
    {
        slug: "cgpa", 
        title: "CGPA Calculator",
        category: "Education",
        cpcTier: "medium",
        related: ["gpa", "grade", "percentage", "average", "fraction"]
    },
    {
        slug: "grade",
        title: "Grade Calculator",
        category: "Education",
        cpcTier: "medium",
        related: ["gpa", "cgpa", "percentage", "average", "fraction"]
    },
    {
        slug: "percentage",
        title: "Percentage Calculator",
        category: "Education",
        cpcTier: "low", // $0.3-1 CPC but huge volume
        related: ["discount", "sales-tax", "investment-roi", "gpa", "average"]
    },
    {
        slug: "average",
        title: "Average Calculator", 
        category: "Education",
        cpcTier: "low",
        related: ["percentage", "gpa", "cgpa", "standard-deviation", "fraction"]
    },
    {
        slug: "standard-deviation",
        title: "Standard Deviation Calculator",
        category: "Education",
        cpcTier: "low",
        related: ["average", "percentage", "gpa", "scientific", "fraction"]
    },
    {
        slug: "fraction",
        title: "Fraction Calculator",
        category: "Education",
        cpcTier: "low",
        related: ["percentage", "average", "scientific", "binary-converter", "unit-converter"]
    },
    {
        slug: "scientific",
        title: "Scientific Calculator", 
        category: "Education",
        cpcTier: "low",
        related: ["fraction", "standard-deviation", "binary-converter", "area", "volume"]
    },

    // GENERAL/UTILITY CALCULATORS (Low CPC but High Volume)
    {
        slug: "age",
        title: "Age Calculator",
        category: "General",
        cpcTier: "low", // $0.2-0.8 CPC
        related: ["date-difference", "time-calculator", "pregnancy", "hours", "percentage"]
    },
    {
        slug: "date-difference",
        title: "Date Difference Calculator",
        category: "General", 
        cpcTier: "low",
        related: ["age", "time-calculator", "pregnancy", "hours", "unit-converter"]
    },
    {
        slug: "time-calculator",
        title: "Time Calculator",
        category: "General",
        cpcTier: "low",
        related: ["age", "date-difference", "hours", "pace", "unit-converter"]
    },
    {
        slug: "hours",
        title: "Hours Calculator",
        category: "General",
        cpcTier: "low",
        related: ["time-calculator", "age", "date-difference", "pace", "salary-after-tax"]
    },
    {
        slug: "unit-converter",
        title: "Unit Converter", 
        category: "General",
        cpcTier: "low",
        related: ["area", "volume", "currency-converter", "binary-converter", "fraction"]
    },
    {
        slug: "binary-converter",
        title: "Binary Converter",
        category: "Technology",
        cpcTier: "low",
        related: ["unit-converter", "scientific", "subnet", "password-generator", "qr-code"]
    },
    {
        slug: "area",
        title: "Area Calculator",
        category: "General",
        cpcTier: "low",
        related: ["volume", "triangle", "unit-converter", "concrete", "scientific"]
    },
    {
        slug: "volume",
        title: "Volume Calculator", 
        category: "General",
        cpcTier: "low",
        related: ["area", "triangle", "unit-converter", "concrete", "scientific"]
    },
    {
        slug: "triangle",
        title: "Triangle Calculator",
        category: "General",
        cpcTier: "low",
        related: ["area", "volume", "scientific", "unit-converter", "fraction"]
    },
    {
        slug: "concrete",
        title: "Concrete Calculator",
        category: "Construction",
        cpcTier: "medium", // Construction keywords have decent CPC
        related: ["area", "volume", "unit-converter", "fuel-cost", "triangle"]
    },

    // TECHNOLOGY/UTILITY CALCULATORS
    {
        slug: "password-generator",
        title: "Password Generator", 
        category: "Technology",
        cpcTier: "low",
        related: ["binary-converter", "qr-code", "random-number", "subnet", "scientific"]
    },
    {
        slug: "qr-code",
        title: "QR Code Generator",
        category: "Technology",
        cpcTier: "low",
        related: ["password-generator", "binary-converter", "random-number", "subnet", "unit-converter"]
    },
    {
        slug: "random-number",
        title: "Random Number Generator",
        category: "Technology",
        cpcTier: "low",
        related: ["password-generator", "qr-code", "binary-converter", "scientific", "subnet"]
    },
    {
        slug: "subnet",
        title: "Subnet Calculator", 
        category: "Technology",
        cpcTier: "medium", // Tech keywords can have decent CPC
        related: ["binary-converter", "password-generator", "qr-code", "random-number", "scientific"]
    }

    // NEW HIGH-VALUE FINANCIAL CALCULATORS
    {
        slug: "hourly-to-salary",
        title: "Hourly to Salary Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["salary-after-tax", "paycheck", "tax", "compound-interest", "retirement"]
    },
    {
        slug: "paycheck",
        title: "Paycheck Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["salary-after-tax", "tax", "hourly-to-salary", "debt-to-income", "retirement"]
    },
    {
        slug: "debt-to-income",
        title: "Debt-to-Income Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["mortgage", "loan-to-value", "paycheck", "amortization", "net-worth"]
    },
    {
        slug: "cagr",
        title: "CAGR Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["compound-interest", "investment-roi", "retirement", "inflation", "simple-interest"]
    },
    {
        slug: "net-worth",
        title: "Net Worth Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["retirement", "investment-roi", "compound-interest", "debt-to-income", "mortgage"]
    },
    {
        slug: "loan-to-value",
        title: "Loan-to-Value Calculator",
        category: "Finance",
        cpcTier: "high",
        related: ["mortgage", "debt-to-income", "amortization", "paycheck", "net-worth"]
    },
    {
        slug: "gst-hst",
        title: "GST/HST Calculator",
        category: "Finance",
        cpcTier: "medium",
        related: ["sales-tax", "tax", "discount", "tip", "salary-after-tax"]
    },

    // NEW HEALTH CALCULATORS
    {
        slug: "sleep",
        title: "Sleep Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["bmr", "calorie", "water-intake", "pace", "bmi"]
    },
    {
        slug: "ovulation",
        title: "Ovulation Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["due-date", "pregnancy", "bmi", "ideal-weight", "water-intake"]
    },
    {
        slug: "due-date",
        title: "Due Date Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["pregnancy", "ovulation", "bmi", "water-intake", "calorie"]
    },
    {
        slug: "macro-calculator",
        title: "Macro Calculator",
        category: "Health",
        cpcTier: "medium",
        related: ["calorie", "bmr", "bmi", "body-fat", "ideal-weight"]
    },

    // NEW OTHER CALCULATORS
    {
        slug: "love",
        title: "Love Calculator",
        category: "Other",
        cpcTier: "low",
        related: ["age", "date-difference", "random-number", "percentage", "time-calculator"]
    },
    {
        slug: "square-footage",
        title: "Square Footage Calculator",
        category: "Construction",
        cpcTier: "medium",
        related: ["area", "concrete", "volume", "unit-converter", "triangle"]
    },
];

// Revenue optimization mapping
export const REVENUE_TIERS = {
    premium: ["mortgage", "car-loan", "emi"], // Highest CPC priority
    high: ["investment-roi", "compound-interest", "simple-interest", "salary-after-tax", "tax", "retirement", "amortization", "hourly-to-salary", "paycheck", "debt-to-income", "cagr", "net-worth", "loan-to-value"],
    medium: ["sales-tax", "discount", "inflation", "currency-converter", "fuel-cost", "payment", "bmi", "bmr", "calorie", "body-fat", "ideal-weight", "water-intake", "pregnancy", "gpa", "cgpa", "grade", "concrete", "subnet", "gst-hst", "sleep", "ovulation", "due-date", "macro-calculator", "square-footage"],
    low: ["tip", "pace", "percentage", "average", "standard-deviation", "fraction", "scientific", "age", "date-difference", "time-calculator", "hours", "unit-converter", "binary-converter", "area", "volume", "triangle", "password-generator", "qr-code", "random-number"]
};

// Category groupings for blog organization
export const CATEGORIES = {
    "Finance": ["mortgage", "car-loan", "emi", "investment-roi", "compound-interest", "simple-interest", "salary-after-tax", "tax", "retirement", "amortization", "sales-tax", "discount", "inflation", "currency-converter", "fuel-cost", "payment", "tip", "hourly-to-salary", "paycheck", "debt-to-income", "cagr", "net-worth", "loan-to-value", "gst-hst"],
    "Health": ["bmi", "bmr", "calorie", "body-fat", "ideal-weight", "water-intake", "pregnancy", "pace", "sleep", "ovulation", "due-date", "macro-calculator"],
    "Education": ["gpa", "cgpa", "grade", "percentage", "average", "standard-deviation", "fraction", "scientific"],
    "General": ["age", "date-difference", "time-calculator", "hours", "unit-converter", "area", "volume", "triangle"],
    "Technology": ["binary-converter", "password-generator", "qr-code", "random-number", "subnet"],
    "Construction": ["concrete"]
};

export default CALCULATORS;