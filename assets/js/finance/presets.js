// Regional presets for financial calculators
export const FinancePresets = {
    // Mortgage presets by region
    mortgage: {
        US: {
            name: "US 30-Year Fixed",
            homePrice: 400000,
            downPayment: 20, // percentage
            interestRate: 6.8,
            loanTerm: 30,
            paymentFrequency: "monthly",
            propertyTax: 1.2,
            homeInsurance: 0.35,
            pmiRate: 0.5
        },
        CA: {
            name: "Canada 25-Year Fixed",
            homePrice: 500000,
            downPayment: 20,
            interestRate: 5.5,
            loanTerm: 25,
            paymentFrequency: "monthly",
            propertyTax: 1.0,
            homeInsurance: 0.3,
            pmiRate: 0.6
        },
        UK: {
            name: "UK 25-Year Fixed",
            homePrice: 350000,
            downPayment: 20,
            interestRate: 5.8,
            loanTerm: 25,
            paymentFrequency: "monthly",
            propertyTax: 1.5,
            homeInsurance: 0.4,
            pmiRate: 0
        },
        EU: {
            name: "European 20-Year Fixed",
            homePrice: 300000,
            downPayment: 20,
            interestRate: 4.2,
            loanTerm: 20,
            paymentFrequency: "monthly",
            propertyTax: 0.8,
            homeInsurance: 0.2,
            pmiRate: 0
        },
        IN: {
            name: "India Home Loan",
            homePrice: 5000000,
            downPayment: 20,
            interestRate: 8.5,
            loanTerm: 20,
            paymentFrequency: "monthly",
            propertyTax: 0.5,
            homeInsurance: 0.1,
            pmiRate: 0
        }
    },

    // EMI/Personal Loan presets
    emi: {
        US: {
            name: "US Personal Loan",
            principal: 25000,
            interestRate: 10.5,
            loanTerm: 5,
            paymentFrequency: "monthly"
        },
        CA: {
            name: "Canada Personal Loan",
            principal: 30000,
            interestRate: 8.9,
            loanTerm: 5,
            paymentFrequency: "monthly"
        },
        UK: {
            name: "UK Personal Loan",
            principal: 20000,
            interestRate: 7.2,
            loanTerm: 5,
            paymentFrequency: "monthly"
        },
        EU: {
            name: "European Personal Loan",
            principal: 25000,
            interestRate: 6.5,
            loanTerm: 5,
            paymentFrequency: "monthly"
        },
        IN: {
            name: "India Personal Loan",
            principal: 500000,
            interestRate: 12.5,
            loanTerm: 4,
            paymentFrequency: "monthly"
        }
    },

    // Car loan presets
    carLoan: {
        US: {
            name: "US Auto Loan",
            carPrice: 35000,
            downPayment: 5000,
            tradeIn: 8000,
            salesTax: 8.5,
            fees: 1500,
            interestRate: 6.2,
            loanTerm: 6
        },
        CA: {
            name: "Canada Auto Loan",
            carPrice: 40000,
            downPayment: 6000,
            tradeIn: 10000,
            salesTax: 12.0,
            fees: 1200,
            interestRate: 5.8,
            loanTerm: 6
        },
        UK: {
            name: "UK Car Finance",
            carPrice: 30000,
            downPayment: 5000,
            tradeIn: 7000,
            salesTax: 20.0,
            fees: 800,
            interestRate: 7.5,
            loanTerm: 5
        },
        EU: {
            name: "European Car Loan",
            carPrice: 32000,
            downPayment: 6000,
            tradeIn: 8000,
            salesTax: 19.0,
            fees: 1000,
            interestRate: 4.8,
            loanTerm: 5
        },
        IN: {
            name: "India Car Loan",
            carPrice: 1200000,
            downPayment: 200000,
            tradeIn: 300000,
            salesTax: 28.0,
            fees: 50000,
            interestRate: 9.5,
            loanTerm: 7
        }
    },

    // Compound interest presets
    compoundInterest: {
        US: {
            name: "US Investment Account",
            principal: 10000,
            interestRate: 7.5,
            timeYears: 20,
            compoundFrequency: "monthly",
            monthlyContribution: 500
        },
        CA: {
            name: "Canada RRSP",
            principal: 15000,
            interestRate: 6.8,
            timeYears: 25,
            compoundFrequency: "monthly",
            monthlyContribution: 400
        },
        UK: {
            name: "UK ISA",
            principal: 12000,
            interestRate: 6.2,
            timeYears: 20,
            compoundFrequency: "monthly",
            monthlyContribution: 300
        },
        EU: {
            name: "European Savings",
            principal: 8000,
            interestRate: 5.5,
            timeYears: 15,
            compoundFrequency: "monthly",
            monthlyContribution: 250
        },
        IN: {
            name: "India SIP",
            principal: 100000,
            interestRate: 12.0,
            timeYears: 15,
            compoundFrequency: "monthly",
            monthlyContribution: 10000
        }
    },

    // Savings goal presets
    savingsGoal: {
        US: {
            name: "US Retirement",
            savingsGoal: 1000000,
            currentSavings: 50000,
            interestRate: 7.0,
            timeYears: 25,
            compoundFrequency: "monthly"
        },
        CA: {
            name: "Canada House Down Payment",
            savingsGoal: 100000,
            currentSavings: 15000,
            interestRate: 5.5,
            timeYears: 5,
            compoundFrequency: "monthly"
        },
        UK: {
            name: "UK Emergency Fund",
            savingsGoal: 20000,
            currentSavings: 2000,
            interestRate: 4.5,
            timeYears: 3,
            compoundFrequency: "monthly"
        },
        EU: {
            name: "European Education Fund",
            savingsGoal: 50000,
            currentSavings: 5000,
            interestRate: 5.0,
            timeYears: 10,
            compoundFrequency: "monthly"
        },
        IN: {
            name: "India Child Education",
            savingsGoal: 2500000,
            currentSavings: 200000,
            interestRate: 10.0,
            timeYears: 15,
            compoundFrequency: "monthly"
        }
    },

    // ROI calculation presets
    roi: {
        US: {
            name: "US Stock Investment",
            initialInvestment: 10000,
            finalValue: 15000,
            timeYears: 3,
            fees: 50
        },
        CA: {
            name: "Canada Mutual Fund",
            initialInvestment: 20000,
            finalValue: 28000,
            timeYears: 4,
            fees: 200
        },
        UK: {
            name: "UK Property Investment",
            initialInvestment: 50000,
            finalValue: 75000,
            timeYears: 5,
            fees: 2500
        },
        EU: {
            name: "European Bond Fund",
            initialInvestment: 15000,
            finalValue: 18000,
            timeYears: 3,
            fees: 75
        },
        IN: {
            name: "India Equity Fund",
            initialInvestment: 500000,
            finalValue: 800000,
            timeYears: 5,
            fees: 5000
        }
    }
};

// Utility functions for preset management
export class PresetManager {
    static loadPreset(calculatorType, region, formFieldMappings) {
        const preset = FinancePresets[calculatorType]?.[region];
        if (!preset) return false;

        Object.entries(preset).forEach(([key, value]) => {
            if (key === 'name') return; // Skip name field
            
            const fieldId = formFieldMappings[key];
            if (fieldId) {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.value = value;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        });

        return true;
    }

    static getPresetsList(calculatorType) {
        const presets = FinancePresets[calculatorType];
        if (!presets) return [];

        return Object.entries(presets).map(([key, value]) => ({
            key,
            name: value.name
        }));
    }

    static createPresetDropdown(calculatorType, containerId, onPresetChange) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const presets = this.getPresetsList(calculatorType);
        if (presets.length === 0) return;

        const select = document.createElement('select');
        select.id = `${calculatorType}-preset-select`;
        select.className = 'preset-selector';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Load Example...';
        select.appendChild(defaultOption);

        // Add preset options
        presets.forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.key;
            option.textContent = preset.name;
            select.appendChild(option);
        });

        // Add change event listener
        select.addEventListener('change', (e) => {
            if (e.target.value) {
                onPresetChange(e.target.value);
            }
        });

        container.appendChild(select);
    }
}