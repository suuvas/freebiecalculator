// Related Posts Widget for Blog
// Shows related posts within the same calculator category

export class RelatedPosts {
    constructor(options = {}) {
        this.container = options.container || '#related-posts';
        this.maxPosts = options.maxPosts || 5;
        this.currentSlug = this.getCurrentCalculatorSlug();
    }

    init() {
        if (this.currentSlug) {
            this.render();
        }
    }

    getCurrentCalculatorSlug() {
        const path = window.location.pathname;
        if (path.includes('/blog/posts/')) {
            const pathParts = path.split('/');
            return pathParts[3]; // /blog/posts/[calculator]/[post].html
        }
        return null;
    }

    getCurrentPostType() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        if (filename.startsWith('what-is-')) return 'what-is';
        if (filename.includes('how-') && filename.includes('-works')) return 'how-works';
        if (filename.includes('formula-explained')) return 'formula-explained';
        if (filename.includes('examples')) return 'examples';
        if (filename.includes('common-mistakes')) return 'common-mistakes';
        if (filename.startsWith('ultimate-guide-')) return 'ultimate-guide';
        
        return 'unknown';
    }

    getRelatedPosts() {
        if (!this.currentSlug) return [];

        const currentPostType = this.getCurrentPostType();
        const postTypes = [
            { type: 'what-is', title: 'What Is Guide', file: `what-is-${this.currentSlug}.html` },
            { type: 'how-works', title: 'How It Works', file: `how-${this.currentSlug}-works.html` },
            { type: 'formula-explained', title: 'Formula Explained', file: `${this.currentSlug}-formula-explained.html` },
            { type: 'examples', title: 'Examples & Practice', file: `${this.currentSlug}-examples.html` },
            { type: 'common-mistakes', title: 'Common Mistakes', file: `${this.currentSlug}-common-mistakes.html` },
            { type: 'ultimate-guide', title: 'Ultimate Guide', file: `ultimate-guide-to-${this.currentSlug}.html` }
        ];

        // Filter out current post and return others
        return postTypes
            .filter(post => post.type !== currentPostType)
            .slice(0, this.maxPosts);
    }

    render() {
        const container = document.querySelector(this.container);
        if (!container) return;

        const relatedPosts = this.getRelatedPosts();
        if (!relatedPosts.length) return;

        const widget = document.createElement('div');
        widget.className = 'related-posts-widget';

        const title = document.createElement('h3');
        title.className = 'related-posts-title';
        title.textContent = `📚 More ${this.getCalculatorName()} Guides`;

        const postsList = document.createElement('ul');
        postsList.className = 'related-posts-list';

        relatedPosts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.className = 'related-post-item';

            const link = document.createElement('a');
            link.href = `/blog/posts/${this.currentSlug}/${post.file}`;
            link.className = 'related-post-link';
            link.textContent = post.title;

            // Add description based on post type
            const description = document.createElement('span');
            description.className = 'related-post-description';
            description.textContent = this.getPostDescription(post.type);

            listItem.appendChild(link);
            listItem.appendChild(description);
            postsList.appendChild(listItem);
        });

        widget.appendChild(title);
        widget.appendChild(postsList);
        container.appendChild(widget);
    }

    getCalculatorName() {
        const nameMap = {
            'mortgage': 'Mortgage Calculator',
            'car-loan': 'Car Loan Calculator',
            'emi': 'EMI Calculator',
            'bmi': 'BMI Calculator',
            'percentage': 'Percentage Calculator',
            'age': 'Age Calculator'
            // Add more as needed
        };

        return nameMap[this.currentSlug] || this.capitalizeWords(this.currentSlug.replace(/-/g, ' '));
    }

    getPostDescription(postType) {
        const descriptions = {
            'what-is': 'Learn the basics and when to use this calculator',
            'how-works': 'Step-by-step instructions and usage tips',
            'formula-explained': 'Mathematical formulas and calculations',
            'examples': 'Real-world examples and practice problems',
            'common-mistakes': 'Avoid these frequent calculation errors',
            'ultimate-guide': 'Comprehensive guide covering everything'
        };

        return descriptions[postType] || '';
    }

    capitalizeWords(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    }
}

// Auto-initialize if related posts container exists
document.addEventListener('DOMContentLoaded', () => {
    const relatedPostsContainer = document.querySelector('#related-posts');
    if (relatedPostsContainer) {
        const relatedPosts = new RelatedPosts();
        relatedPosts.init();
    }
});