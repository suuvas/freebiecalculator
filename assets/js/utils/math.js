// Mathematical utility functions for calculators

/**
 * Round a number to specified decimal places
 * @param {number} num - The number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
export function roundTo(num, decimals = 2) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale for formatting (default: en-US)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Format a number with thousand separators
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export function formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Calculate percentage
 * @param {number} value - The value
 * @param {number} total - The total
 * @returns {number} Percentage
 */
export function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
}

/**
 * Calculate percentage increase/decrease
 * @param {number} oldValue - Original value
 * @param {number} newValue - New value
 * @returns {number} Percentage change (positive for increase, negative for decrease)
 */
export function calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Apply percentage to a value
 * @param {number} value - Base value
 * @param {number} percentage - Percentage to apply
 * @returns {number} Result
 */
export function applyPercentage(value, percentage) {
    return value * (percentage / 100);
}

/**
 * Calculate compound interest
 * @param {number} principal - Initial amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} time - Time in years
 * @param {number} compound - Compounding frequency per year
 * @returns {object} Result object with final amount and interest earned
 */
export function calculateCompoundInterest(principal, rate, time, compound = 1) {
    const amount = principal * Math.pow((1 + rate / compound), compound * time);
    const interest = amount - principal;
    
    return {
        finalAmount: roundTo(amount),
        interestEarned: roundTo(interest),
        principal: principal
    };
}

/**
 * Calculate simple interest
 * @param {number} principal - Initial amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} time - Time in years
 * @returns {object} Result object with final amount and interest earned
 */
export function calculateSimpleInterest(principal, rate, time) {
    const interest = principal * rate * time;
    const amount = principal + interest;
    
    return {
        finalAmount: roundTo(amount),
        interestEarned: roundTo(interest),
        principal: principal
    };
}

/**
 * Calculate EMI (Equated Monthly Installment)
 * @param {number} principal - Loan amount
 * @param {number} rate - Annual interest rate (as percentage)
 * @param {number} tenure - Loan tenure in months
 * @returns {object} EMI calculation result
 */
export function calculateEMI(principal, rate, tenure) {
    const monthlyRate = (rate / 100) / 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;
    
    return {
        emi: roundTo(emi),
        totalAmount: roundTo(totalAmount),
        totalInterest: roundTo(totalInterest),
        principal: principal
    };
}

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in meters
 * @returns {object} BMI result with category
 */
export function calculateBMI(weight, height) {
    const bmi = weight / (height * height);
    let category = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    
    return {
        bmi: roundTo(bmi, 1),
        category: category
    };
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories per day
 */
export function calculateBMR(weight, height, age, gender) {
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    
    if (gender.toLowerCase() === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }
    
    return roundTo(bmr);
}

/**
 * Calculate daily calorie needs based on BMR and activity level
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level code
 * @returns {number} Daily calorie needs
 */
export function calculateDailyCalories(bmr, activityLevel) {
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very_active': 1.9
    };
    
    const multiplier = activityMultipliers[activityLevel] || 1.2;
    return roundTo(bmr * multiplier);
}

/**
 * Convert units of measurement
 * @param {number} value - Value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @param {string} type - Type of measurement (length, weight, temperature)
 * @returns {number} Converted value
 */
export function convertUnits(value, fromUnit, toUnit, type) {
    const conversions = {
        length: {
            // Base unit: meters
            mm: 0.001,
            cm: 0.01,
            m: 1,
            km: 1000,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.344
        },
        weight: {
            // Base unit: grams
            mg: 0.001,
            g: 1,
            kg: 1000,
            oz: 28.3495,
            lb: 453.592
        },
        temperature: {
            // Special handling required
        }
    };
    
    if (type === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }
    
    const unitConversions = conversions[type];
    if (!unitConversions || !unitConversions[fromUnit] || !unitConversions[toUnit]) {
        throw new Error('Invalid unit conversion');
    }
    
    // Convert to base unit, then to target unit
    const baseValue = value * unitConversions[fromUnit];
    const result = baseValue / unitConversions[toUnit];
    
    return roundTo(result, 6);
}

/**
 * Convert temperature between different scales
 * @param {number} value - Temperature value
 * @param {string} from - Source scale (C, F, K)
 * @param {string} to - Target scale (C, F, K)
 * @returns {number} Converted temperature
 */
export function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (from === 'F') {
        celsius = (value - 32) * 5/9;
    } else if (from === 'K') {
        celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    let result = celsius;
    if (to === 'F') {
        result = (celsius * 9/5) + 32;
    } else if (to === 'K') {
        result = celsius + 273.15;
    }
    
    return roundTo(result, 2);
}

/**
 * Calculate age from birth date
 * @param {Date} birthDate - Birth date
 * @param {Date} currentDate - Current date (optional, defaults to today)
 * @returns {object} Age breakdown in years, months, and days
 */
export function calculateAge(birthDate, currentDate = new Date()) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += daysInLastMonth;
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

/**
 * Calculate difference between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {object} Difference in various units
 */
export function calculateDateDifference(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44); // Average days per month
    const diffYears = Math.floor(diffDays / 365.25); // Account for leap years
    
    return {
        days: diffDays,
        weeks: diffWeeks,
        months: diffMonths,
        years: diffYears,
        totalHours: Math.floor(diffTime / (1000 * 60 * 60)),
        totalMinutes: Math.floor(diffTime / (1000 * 60))
    };
}

/**
 * Validate numeric input
 * @param {string|number} value - Value to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export function validateNumber(value, options = {}) {
    const {
        min = -Infinity,
        max = Infinity,
        required = false,
        allowDecimals = true
    } = options;
    
    if (value === '' || value === null || value === undefined) {
        return {
            valid: !required,
            error: required ? 'This field is required' : null,
            value: null
        };
    }
    
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        return {
            valid: false,
            error: 'Please enter a valid number',
            value: null
        };
    }
    
    if (!allowDecimals && num % 1 !== 0) {
        return {
            valid: false,
            error: 'Please enter a whole number',
            value: null
        };
    }
    
    if (num < min) {
        return {
            valid: false,
            error: `Value must be at least ${min}`,
            value: null
        };
    }
    
    if (num > max) {
        return {
            valid: false,
            error: `Value must not exceed ${max}`,
            value: null
        };
    }
    
    return {
        valid: true,
        error: null,
        value: num
    };
}
