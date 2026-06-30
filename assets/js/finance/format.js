// Currency and number formatting utilities
export class FinanceFormatter {
    constructor() {
        this.currencies = {
            USD: { symbol: '$', locale: 'en-US' },
            EUR: { symbol: '€', locale: 'de-DE' },
            GBP: { symbol: '£', locale: 'en-GB' },
            INR: { symbol: '₹', locale: 'en-IN' },
            CAD: { symbol: 'C$', locale: 'en-CA' },
            AUD: { symbol: 'A$', locale: 'en-AU' },
            JPY: { symbol: '¥', locale: 'ja-JP' }
        };
        
        this.currentCurrency = 'USD';
        this.currentLocale = 'en-US';
    }

    setCurrency(currency) {
        if (this.currencies[currency]) {
            this.currentCurrency = currency;
            this.currentLocale = this.currencies[currency].locale;
        }
    }

    formatCurrency(amount, currency = this.currentCurrency) {
        const currencyInfo = this.currencies[currency] || this.currencies.USD;
        return new Intl.NumberFormat(currencyInfo.locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    formatNumber(number, decimals = 2) {
        return new Intl.NumberFormat(this.currentLocale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    }

    formatPercent(rate, decimals = 2) {
        return new Intl.NumberFormat(this.currentLocale, {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(rate / 100);
    }

    formatInteger(number) {
        return new Intl.NumberFormat(this.currentLocale, {
            maximumFractionDigits: 0
        }).format(number);
    }

    parseCurrency(str) {
        // Remove currency symbols and parse as float
        const cleaned = str.replace(/[^\d.-]/g, '');
        return parseFloat(cleaned) || 0;
    }

    parsePercent(str) {
        const cleaned = str.replace(/[^\d.-]/g, '');
        return parseFloat(cleaned) || 0;
    }

    abbreviateNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    formatDuration(months) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        if (years === 0) {
            return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        } else if (remainingMonths === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
        } else {
            return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        }
    }

    formatDate(date) {
        return new Intl.DateTimeFormat(this.currentLocale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }
}

// Export a singleton instance
export const formatter = new FinanceFormatter();