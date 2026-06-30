// Breadcrumbs Component for Blog Posts
// Renders: Home › Blog › [Category] › Post

export class Breadcrumbs {
    constructor(options = {}) {
        this.container = options.container || '#breadcrumbs';
        this.separator = options.separator || '›';
        this.homeText = options.homeText || 'Home';
        this.blogText = options.blogText || 'Blog';
    }

    init() {
        this.render();
    }

    render() {
        const container = document.querySelector(this.container);
        if (!container) return;

        const breadcrumbsData = this.getBreadcrumbsData();
        const breadcrumbsList = document.createElement('nav');
        breadcrumbsList.className = 'breadcrumbs';
        breadcrumbsList.setAttribute('aria-label', 'Breadcrumb navigation');

        const ol = document.createElement('ol');
        ol.className = 'breadcrumbs-list';

        breadcrumbsData.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';
            
            if (index === breadcrumbsData.length - 1) {
                // Current page - no link
                li.className += ' breadcrumb-current';
                li.textContent = item.name;
                li.setAttribute('aria-current', 'page');
            } else {
                // Link to parent pages
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.name;
                link.className = 'breadcrumb-link';
                li.appendChild(link);
            }

            ol.appendChild(li);

            // Add separator (except for last item)
            if (index < breadcrumbsData.length - 1) {
                const separator = document.createElement('span');
                separator.className = 'breadcrumb-separator';
                separator.textContent = ` ${this.separator} `;
                separator.setAttribute('aria-hidden', 'true');
                ol.appendChild(separator);
            }
        });

        breadcrumbsList.appendChild(ol);
        container.appendChild(breadcrumbsList);
    }

    getBreadcrumbsData() {
        const path = window.location.pathname;
        const breadcrumbs = [
            { name: this.homeText, url: '/' }
        ];

        // Check if we're in the blog section
        if (path.includes('/blog/')) {
            breadcrumbs.push({ name: this.blogText, url: '/blog/' });

            // Check if we're in a specific post
            if (path.includes('/blog/posts/')) {
                const pathParts = path.split('/');
                const calculatorSlug = pathParts[3]; // /blog/posts/[calculator]/[post].html
                const postFile = pathParts[4];

                if (calculatorSlug && postFile) {
                    // Get calculator name from manifest
                    const calculatorName = this.getCalculatorName(calculatorSlug);
                    if (calculatorName) {
                        breadcrumbs.push({
                            name: calculatorName,
                            url: `/calculators/${calculatorSlug}.html`
                        });
                    }

                    // Current post (no URL, will be handled as current page)
                    const postTitle = this.getPostTitle(postFile);
                    breadcrumbs.push({
                        name: postTitle,
                        url: null
                    });
                }
            }
        }

        return breadcrumbs;
    }

    getCalculatorName(slug) {
        // Convert slug to readable name
        const nameMap = {
            'mortgage': 'Mortgage Calculator',
            'car-loan': 'Car Loan Calculator', 
            'emi': 'EMI Calculator',
            'bmi': 'BMI Calculator',
            'percentage': 'Percentage Calculator',
            'age': 'Age Calculator'
            // Add more mappings as needed
        };

        return nameMap[slug] || this.capitalizeWords(slug.replace(/-/g, ' '));
    }

    getPostTitle(filename) {
        // Extract title from filename
        if (!filename) return 'Guide';
        
        const name = filename.replace('.html', '');
        
        if (name.startsWith('what-is-')) {
            return 'What Is Guide';
        } else if (name.includes('how-') && name.includes('-works')) {
            return 'How It Works';
        } else if (name.includes('formula-explained')) {
            return 'Formula Explained';
        } else if (name.includes('examples')) {
            return 'Examples';
        } else if (name.includes('common-mistakes')) {
            return 'Common Mistakes';
        } else if (name.startsWith('ultimate-guide-')) {
            return 'Ultimate Guide';
        }

        return this.capitalizeWords(name.replace(/-/g, ' '));
    }

    capitalizeWords(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    }
}

// Auto-initialize if breadcrumbs container exists
document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbsContainer = document.querySelector('#breadcrumbs');
    if (breadcrumbsContainer) {
        const breadcrumbs = new Breadcrumbs();
        breadcrumbs.init();
    }
});