// Language switcher component with localStorage persistence
export class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = {};
        this.availableLanguages = ['en', 'es', 'fr'];
        this.isReady = false;
        this.loadTranslations();
    }

    detectLanguage() {
        // Check URL path first (for /es/ or /fr/ paths)
        const urlPath = window.location.pathname;
        if (urlPath.startsWith('/es/')) {
            return 'es';
        } else if (urlPath.startsWith('/fr/')) {
            return 'fr';
        }
        
        // Check localStorage second
        const savedLang = localStorage.getItem('freebiecalc-language');
        if (savedLang && ['en', 'es', 'fr'].includes(savedLang)) {
            return savedLang;
        }

        // Check browser language as fallback
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Return supported language or default to English
        return ['es', 'fr'].includes(langCode) ? langCode : 'en';
    }

    async loadTranslations() {
        try {
            const promises = this.availableLanguages.map(async lang => {
                const response = await fetch(`/assets/js/lang/${lang}.json?v=105`);
                const translations = await response.json();
                return { lang, translations };
            });

            const results = await Promise.all(promises);
            results.forEach(({ lang, translations }) => {
                this.translations[lang] = translations;
            });

            this.updatePageContent();
            this.isReady = true;
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to English if translations fail to load
            this.currentLang = 'en';
            this.isReady = true;
        }
    }

    switchLanguage(newLang) {
        if (!this.availableLanguages.includes(newLang)) {
            console.warn(`Language ${newLang} not supported`);
            return;
        }

        this.currentLang = newLang;
        localStorage.setItem('freebiecalc-language', newLang);
        this.updatePageContent();
        this.updateLanguageDropdown();
        
        // Update document language attribute
        document.documentElement.lang = newLang;
        
        // Update page URLs for language switching
        this.updateLanguageLinks(newLang);
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: newLang } 
        }));
    }

    translate(key, defaultValue = '') {
        const keys = key.split('.');
        let current = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (current && current[k] !== undefined) {
                current = current[k];
            } else {
                // Fallback to English
                current = this.translations['en'];
                for (const fallbackKey of keys) {
                    if (current && current[fallbackKey] !== undefined) {
                        current = current[fallbackKey];
                    } else {
                        return defaultValue || key;
                    }
                }
                break;
            }
        }
        
        return current || defaultValue || key;
    }

    updatePageContent() {
        if (!this.translations[this.currentLang]) {
            return; // Translations not loaded yet
        }

        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement && document.querySelector('.hero h1')) {
            titleElement.textContent = this.translate('homepage.title');
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && document.querySelector('.hero-description')) {
            metaDesc.setAttribute('content', this.translate('homepage.description'));
        }

        // Update header navigation
        this.updateHeader();
        
        // Update homepage content
        this.updateHomepage();
        
        // Update footer
        this.updateFooter();
        
        // Update common elements
        this.updateCommonElements();
    }

    updateHeader() {
        const navLinks = {
            '.nav-menu a[href="/"]': 'header.home',
            '.nav-menu a[href="/blog/"]': 'header.guides',
            '.nav-menu a[href="/help/"]': 'header.help'
        };

        Object.entries(navLinks).forEach(([selector, key]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = this.translate(key);
            }
        });
    }

    updateHomepage() {
        // Update hero section
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.textContent = this.translate('homepage.title');
        }

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.textContent = this.translate('homepage.description');
        }

        const searchInput = document.querySelector('#calculator-search');
        if (searchInput) {
            searchInput.setAttribute('placeholder', this.translate('homepage.searchPlaceholder'));
        }

        // Update category headers
        const categoryMapping = {
            'math-calculators': 'homepage.categories.math',
            'health-calculators': 'homepage.categories.health',
            'finance-calculators': 'homepage.categories.finance',
            'other-calculators': 'homepage.categories.other'
        };

        Object.entries(categoryMapping).forEach(([id, key]) => {
            const categoryHeader = document.querySelector(`#${id} h2`);
            if (categoryHeader) {
                categoryHeader.textContent = this.translate(key);
            }
        });

        // Update calculator cards
        this.updateCalculatorCards();

        // Update "Browse All" section
        const browseAllHeader = document.querySelector('.all-calculators-section h2');
        if (browseAllHeader) {
            browseAllHeader.textContent = this.translate('homepage.browseAll');
        }
    }

    updateCalculatorCards() {
        // Define explicit calculator mappings with more specific logic
        const calculatorUpdates = [
            { href: '/calculators/percentage.html', key: 'percentage' },
            { href: '/calculators/area.html', key: 'area' },
            { href: '/calculators/volume.html', key: 'volume' },
            { href: '/calculators/triangle.html', key: 'triangle' },
            { href: '/calculators/scientific.html', key: 'scientific' },
            { href: '/calculators/average.html', key: 'average' },
            { href: '/calculators/standard-deviation.html', key: 'standardDeviation' },
            { href: '/calculators/fraction.html', key: 'fraction' },
            { href: '/calculators/unit-converter.html', key: 'unitConverter' },
            { href: '/calculators/binary-converter.html', key: 'binaryConverter' },
            { href: '/calculators/gpa.html', key: 'gpa' },
            { href: '/calculators/cgpa.html', key: 'cgpa' },
            { href: '/calculators/grade.html', key: 'grade' },
            { href: '/calculators/bmi.html', key: 'bmi' },
            { href: '/calculators/bmr.html', key: 'bmr' },
            { href: '/calculators/calorie.html', key: 'calorie' },
            { href: '/calculators/water-intake.html', key: 'waterIntake' },
            { href: '/calculators/ideal-weight.html', key: 'idealWeight' },
            { href: '/calculators/body-fat.html', key: 'bodyFat' },
            { href: '/calculators/pregnancy.html', key: 'pregnancy' },
            { href: '/calculators/pace.html', key: 'pace' },
            { href: '/calculators/tip.html', key: 'tip' },
            { href: '/calculators/emi.html', key: 'emi' },
            { href: '/calculators/mortgage.html', key: 'mortgage' },
            { href: '/calculators/car-loan.html', key: 'carLoan' },
            { href: '/calculators/compound-interest.html', key: 'compoundInterest' },
            { href: '/calculators/simple-interest.html', key: 'simpleInterest' },
            { href: '/calculators/investment-roi.html', key: 'investment' },
            { href: '/calculators/retirement.html', key: 'retirement' },
            { href: '/calculators/salary-after-tax.html', key: 'salaryAfterTax' },
            { href: '/calculators/tax.html', key: 'tax' },
            { href: '/calculators/sales-tax.html', key: 'salesTax' },
            { href: '/calculators/discount.html', key: 'discount' },
            { href: '/calculators/currency-converter.html', key: 'currencyConverter' },
            { href: '/calculators/inflation.html', key: 'inflation' },
            { href: '/calculators/fuel-cost.html', key: 'fuelCost' },
            { href: '/calculators/amortization.html', key: 'amortization' },
            { href: '/calculators/payment.html', key: 'payment' },
            { href: '/calculators/qr-code.html', key: 'qrCode' },
            { href: '/calculators/password-generator.html', key: 'passwordGenerator' },
            { href: '/calculators/random-number.html', key: 'randomNumber' },
            { href: '/calculators/age.html', key: 'age' },
            { href: '/calculators/date-difference.html', key: 'dateDifference' },
            { href: '/calculators/time-calculator.html', key: 'timeCalculator' },
            { href: '/calculators/hours.html', key: 'hours' },
            { href: '/calculators/concrete.html', key: 'concrete' },
            { href: '/calculators/subnet.html', key: 'subnet' }
        ];

        calculatorUpdates.forEach(({ href, key }) => {
            // Use exact href match to avoid conflicts
            const cards = document.querySelectorAll(`a[href="${href}"]`);
            cards.forEach(card => {
                const titleElement = card.querySelector('h3');
                const descElement = card.querySelector('p');
                
                if (titleElement) {
                    titleElement.textContent = this.translate(`calculators.${key}.name`);
                }
                if (descElement) {
                    descElement.textContent = this.translate(`calculators.${key}.description`);
                }
            });
        });
    }

    updateFooter() {
        const footerLinks = {
            'a[href="/privacy.html"]': 'footer.privacy',
            'a[href="/terms.html"]': 'footer.terms',
            'a[href="/contact.html"]': 'footer.contact',
            'a[href="/about.html"]': 'footer.about',
            'a[href="/disclaimer.html"]': 'footer.disclaimer'
        };

        Object.entries(footerLinks).forEach(([selector, key]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = this.translate(key);
            }
        });

        const copyrightElement = document.querySelector('.footer-copyright');
        if (copyrightElement) {
            copyrightElement.textContent = this.translate('footer.copyright');
        }
    }

    updateCommonElements() {
        // Update common buttons and elements
        const commonMapping = {
            'button[type="submit"], .calculate-btn': 'common.calculate',
            'button[type="reset"], .reset-btn': 'common.reset',
            '.result-label': 'common.result',
            '.loading-text': 'common.loading',
            '.error-text': 'common.error'
        };

        Object.entries(commonMapping).forEach(([selector, key]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.textContent.trim()) {
                    element.textContent = this.translate(key);
                }
            });
        });
    }

    updateLanguageDropdown() {
        const currentButton = document.querySelector('.language-current');
        if (currentButton && this.translations[this.currentLang]) {
            const currentLangData = this.translations[this.currentLang].meta;
            currentButton.innerHTML = `${currentLangData.flag} ${currentLangData.name}`;
        }
    }

    createLanguageSelector() {
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <button class="language-current" aria-label="Select language" aria-expanded="false">
                🇺🇸 English
            </button>
            <div class="language-dropdown">
                ${this.availableLanguages.map(lang => {
                    const langData = this.translations[lang]?.meta || { flag: '🌐', name: lang.toUpperCase() };
                    return `
                        <button class="language-option" data-lang="${lang}" ${lang === this.currentLang ? 'aria-current="true"' : ''}>
                            ${langData.flag} ${langData.name}
                        </button>
                    `;
                }).join('')}
            </div>
        `;

        // Add event listeners
        const currentButton = languageSelector.querySelector('.language-current');
        const dropdown = languageSelector.querySelector('.language-dropdown');
        const options = languageSelector.querySelectorAll('.language-option');

        currentButton.addEventListener('click', () => {
            const isOpen = dropdown.style.display === 'block';
            dropdown.style.display = isOpen ? 'none' : 'block';
            currentButton.setAttribute('aria-expanded', !isOpen);
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const newLang = e.target.dataset.lang;
                this.switchLanguage(newLang);
                dropdown.style.display = 'none';
                currentButton.setAttribute('aria-expanded', 'false');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                dropdown.style.display = 'none';
                currentButton.setAttribute('aria-expanded', 'false');
            }
        });

        return languageSelector;
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    getAvailableLanguages() {
        return this.availableLanguages;
    }
    
    createLanguageSelector() {
        const container = document.createElement('div');
        container.className = 'language-selector';
        
        const currentBtn = document.createElement('button');
        currentBtn.className = 'language-current';
        currentBtn.setAttribute('aria-haspopup', 'true');
        currentBtn.setAttribute('aria-expanded', 'false');
        currentBtn.setAttribute('type', 'button');
        
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        dropdown.style.display = 'none';
        
        // Create options
        const languages = {
            'en': { name: 'English', flag: '🇺🇸' },
            'es': { name: 'Español', flag: '🇪🇸' },
            'fr': { name: 'Français', flag: '🇫🇷' }
        };
        
        Object.entries(languages).forEach(([code, info]) => {
            const option = document.createElement('button');
            option.className = 'language-option';
            option.setAttribute('type', 'button');
            option.innerHTML = `${info.flag} ${info.name}`;
            
            if (code === this.currentLang) {
                option.setAttribute('aria-current', 'true');
                currentBtn.innerHTML = `${info.flag} ${info.name}`;
            }
            
            option.addEventListener('click', () => {
                this.switchLanguage(code);
                dropdown.style.display = 'none';
                currentBtn.setAttribute('aria-expanded', 'false');
            });
            
            dropdown.appendChild(option);
        });
        
        // Toggle dropdown
        currentBtn.addEventListener('click', () => {
            const isOpen = dropdown.style.display === 'block';
            dropdown.style.display = isOpen ? 'none' : 'block';
            currentBtn.setAttribute('aria-expanded', !isOpen);
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.style.display = 'none';
                currentBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        container.appendChild(currentBtn);
        container.appendChild(dropdown);
        
        return container;
    }

    updateLanguageLinks(newLang) {
        // Update hreflang links if they exist
        const currentPath = window.location.pathname;
        let basePath = currentPath;
        
        // Remove language prefix from current path
        if (currentPath.startsWith('/es/') || currentPath.startsWith('/fr/')) {
            basePath = currentPath.substring(3);
        }
        
        // Update alternate language links
        const hreflangs = document.querySelectorAll('link[hreflang]');
        hreflangs.forEach(link => {
            const lang = link.getAttribute('hreflang');
            if (lang === 'en') {
                link.href = `https://freebiecalculator.com${basePath}`;
            } else if (lang === 'es' || lang === 'fr') {
                link.href = `https://freebiecalculator.com/${lang}${basePath}`;
            }
        });
        
        // Update canonical link
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            if (newLang === 'en') {
                canonical.href = `https://freebiecalculator.com${basePath}`;
            } else {
                canonical.href = `https://freebiecalculator.com/${newLang}${basePath}`;
            }
        }
    }
}

// Initialize language switcher
export async function initLanguageSwitcher() {
    const switcher = new LanguageSwitcher();
    
    // Wait for translations to load
    while (!switcher.isReady) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    return switcher;
}