// URL parameter management for sharable calculator links
export class URLParameterManager {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    // Get parameter from URL
    get(key, defaultValue = null) {
        return this.params.get(key) || defaultValue;
    }

    // Set parameter and update URL
    set(key, value) {
        if (value === null || value === undefined || value === '') {
            this.params.delete(key);
        } else {
            this.params.set(key, value);
        }
        this.updateURL();
    }

    // Set multiple parameters at once
    setMultiple(paramObject) {
        Object.entries(paramObject).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                this.params.delete(key);
            } else {
                this.params.set(key, value);
            }
        });
        this.updateURL();
    }

    // Update browser URL without page reload
    updateURL() {
        const newURL = window.location.pathname + '?' + this.params.toString();
        window.history.replaceState(null, '', newURL);
    }

    // Get sharable link
    getShareableLink() {
        const baseURL = window.location.origin + window.location.pathname;
        const queryString = this.params.toString();
        return queryString ? `${baseURL}?${queryString}` : baseURL;
    }

    // Load parameters into form fields
    loadIntoForm(fieldMappings) {
        Object.entries(fieldMappings).forEach(([paramKey, fieldId]) => {
            const value = this.get(paramKey);
            if (value) {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.value = value;
                    // Trigger change event to update any dependent calculations
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        });
    }

    // Save form fields to parameters
    saveFromForm(fieldMappings) {
        const paramObject = {};
        Object.entries(fieldMappings).forEach(([paramKey, fieldId]) => {
            const field = document.getElementById(fieldId);
            if (field && field.value) {
                paramObject[paramKey] = field.value;
            }
        });
        this.setMultiple(paramObject);
    }

    // Clear all parameters
    clear() {
        this.params = new URLSearchParams();
        this.updateURL();
    }

    // Copy current link to clipboard
    async copyToClipboard() {
        const link = this.getShareableLink();
        try {
            await navigator.clipboard.writeText(link);
            return { success: true, link };
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = link;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return { success: true, link };
            } catch (err) {
                document.body.removeChild(textArea);
                return { success: false, error: 'Unable to copy to clipboard' };
            }
        }
    }

    // Generate parameter mappings for common calculator fields
    static getMortgageFieldMappings() {
        return {
            'p': 'homePrice',
            'dp': 'downPayment',
            'r': 'interestRate',
            't': 'loanTerm',
            'f': 'paymentFrequency',
            'ep': 'extraPayment',
            'pt': 'propertyTax',
            'ins': 'homeInsurance',
            'pmi': 'pmiRate',
            'hoa': 'hoaFee'
        };
    }

    static getEMIFieldMappings() {
        return {
            'p': 'principal',
            'r': 'interestRate',
            't': 'loanTerm',
            'f': 'paymentFrequency',
            'ep': 'extraPayment'
        };
    }

    static getCarLoanFieldMappings() {
        return {
            'p': 'carPrice',
            'dp': 'downPayment',
            'ti': 'tradeIn',
            'st': 'salesTax',
            'f': 'fees',
            'r': 'interestRate',
            't': 'loanTerm',
            'ep': 'extraPayment'
        };
    }

    static getCompoundInterestFieldMappings() {
        return {
            'p': 'principal',
            'r': 'interestRate',
            't': 'timeYears',
            'c': 'compoundFrequency',
            'pmt': 'monthlyContribution'
        };
    }

    static getSavingsGoalFieldMappings() {
        return {
            'goal': 'savingsGoal',
            'current': 'currentSavings',
            'r': 'interestRate',
            't': 'timeYears',
            'c': 'compoundFrequency'
        };
    }

    static getROIFieldMappings() {
        return {
            'initial': 'initialInvestment',
            'final': 'finalValue',
            't': 'timeYears',
            'f': 'fees'
        };
    }
}

// Export a singleton instance
export const urlManager = new URLParameterManager();