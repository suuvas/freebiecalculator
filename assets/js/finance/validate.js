// Input validation utilities for financial calculators
export class FinanceValidator {
    constructor() {
        this.errors = new Map();
    }

    clearErrors() {
        this.errors.clear();
        // Remove all error messages from DOM
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    }

    addError(fieldId, message) {
        this.errors.set(fieldId, message);
        this.showFieldError(fieldId, message);
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        // Add error class to field
        field.classList.add('input-error');

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    validateRequired(value, fieldId, fieldName) {
        if (!value || value.toString().trim() === '') {
            this.addError(fieldId, `${fieldName} is required`);
            return false;
        }
        return true;
    }

    validateNumber(value, fieldId, fieldName, min = null, max = null) {
        const num = parseFloat(value);
        
        if (isNaN(num)) {
            this.addError(fieldId, `${fieldName} must be a valid number`);
            return false;
        }

        if (min !== null && num < min) {
            this.addError(fieldId, `${fieldName} must be at least ${min}`);
            return false;
        }

        if (max !== null && num > max) {
            this.addError(fieldId, `${fieldName} must be no more than ${max}`);
            return false;
        }

        return true;
    }

    validatePositiveNumber(value, fieldId, fieldName) {
        return this.validateNumber(value, fieldId, fieldName, 0.01);
    }

    validatePercentage(value, fieldId, fieldName, max = 100) {
        return this.validateNumber(value, fieldId, fieldName, 0, max);
    }

    validateInteger(value, fieldId, fieldName, min = null, max = null) {
        const num = parseInt(value);
        
        if (isNaN(num) || num !== parseFloat(value)) {
            this.addError(fieldId, `${fieldName} must be a whole number`);
            return false;
        }

        if (min !== null && num < min) {
            this.addError(fieldId, `${fieldName} must be at least ${min}`);
            return false;
        }

        if (max !== null && num > max) {
            this.addError(fieldId, `${fieldName} must be no more than ${max}`);
            return false;
        }

        return true;
    }

    validateLoanAmount(value, fieldId) {
        return this.validateNumber(value, fieldId, 'Loan amount', 1, 100000000);
    }

    validateInterestRate(value, fieldId) {
        return this.validateNumber(value, fieldId, 'Interest rate', 0, 50);
    }

    validateLoanTerm(value, fieldId, unit = 'years') {
        const min = unit === 'years' ? 1 : 1;
        const max = unit === 'years' ? 50 : 600;
        return this.validateInteger(value, fieldId, `Loan term (${unit})`, min, max);
    }

    validateDownPayment(value, fieldId, homePrice, isPercentage = false) {
        if (isPercentage) {
            return this.validateNumber(value, fieldId, 'Down payment', 0, 100);
        } else {
            const maxDown = homePrice * 0.99; // Allow up to 99% down payment
            return this.validateNumber(value, fieldId, 'Down payment', 0, maxDown);
        }
    }

    validatePropertyTax(value, fieldId) {
        return this.validateNumber(value, fieldId, 'Property tax rate', 0, 10);
    }

    validateInsurance(value, fieldId) {
        return this.validateNumber(value, fieldId, 'Insurance rate', 0, 5);
    }

    validatePMI(value, fieldId) {
        return this.validateNumber(value, fieldId, 'PMI rate', 0, 2);
    }

    validateHOA(value, fieldId) {
        return this.validateNumber(value, fieldId, 'HOA fee', 0, 10000);
    }

    validateExtraPayment(value, fieldId) {
        return this.validateNumber(value, fieldId, 'Extra payment', 0, 1000000);
    }

    hasErrors() {
        return this.errors.size > 0;
    }

    getErrors() {
        return Array.from(this.errors.entries());
    }

    showSummaryErrors() {
        if (this.hasErrors()) {
            const errorCount = this.errors.size;
            const message = `Please fix ${errorCount} error${errorCount !== 1 ? 's' : ''} before calculating.`;
            
            // Show toast or alert
            this.showToast(message, 'error');
        }
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        
        // Add to page
        document.body.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Export a singleton instance
export const validator = new FinanceValidator();