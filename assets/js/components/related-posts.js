// Related Posts component for FreebieCalculator.com

class RelatedPosts {
    constructor() {
        this.blogPosts = {
            'how-to-use-loan-calculator': {
                title: 'How to Use a Loan Calculator: EMI Calculation Guide',
                description: 'Learn how to calculate EMI accurately with our step-by-step guide. Understand loan formulas, factors affecting payments, and how to use calculators for better financial decisions.',
                url: '/blog/posts/how-to-use-loan-calculator.html',
                category: 'Finance',
                author: 'Sarah Chen',
                readingTime: '5 min read',
                date: '2025-08-19',
                tags: ['EMI', 'loans', 'financial planning', 'calculators'],
                relatedCalculators: ['emi', 'car-loan', 'mortgage'],
                relatedPosts: ['compound-interest-vs-simple-interest']
            },
            'compound-interest-vs-simple-interest': {
                title: 'Compound Interest vs Simple Interest: Complete Comparison',
                description: 'Understand the crucial difference between compound and simple interest. Learn how compounding frequency affects investments and which calculation method to use.',
                url: '/blog/posts/compound-interest-vs-simple-interest.html',
                category: 'Finance',
                author: 'Sarah Chen',
                readingTime: '7 min read',
                date: '2025-08-19',
                tags: ['compound interest', 'simple interest', 'investments', 'compounding'],
                relatedCalculators: ['compound-interest', 'simple-interest', 'investment-roi'],
                relatedPosts: ['how-to-use-loan-calculator']
            },
            'bmi-vs-body-fat': {
                title: 'BMI vs Body Fat: Understanding the Difference',
                description: 'Discover why BMI and body fat percentage tell different stories about your health. Learn when to use each measurement and their limitations.',
                url: '/blog/posts/bmi-vs-body-fat.html',
                category: 'Health',
                author: 'Dr. Michael Rodriguez',
                readingTime: '6 min read',
                date: '2025-08-19',
                tags: ['BMI', 'body fat', 'health assessment', 'fitness'],
                relatedCalculators: ['bmi', 'bmr', 'calorie'],
                relatedPosts: []
            }
        };
        
        this.categoryMap = {
            'Finance': ['how-to-use-loan-calculator', 'compound-interest-vs-simple-interest'],
            'Health': ['bmi-vs-body-fat'],
            'Education': [],
            'General': []
        };
    }
    
    getPostsByCategory(category, excludeSlug = null, count = 3) {
        const categoryPosts = this.categoryMap[category] || [];
        return categoryPosts
            .filter(slug => slug !== excludeSlug)
            .slice(0, count)
            .map(slug => ({
                slug: slug,
                ...this.blogPosts[slug]
            }))
            .filter(post => post.title); // Filter out undefined posts
    }
    
    getRelatedPosts(currentPostSlug, count = 3) {
        const currentPost = this.blogPosts[currentPostSlug];
        if (!currentPost) return [];
        
        // Get explicitly related posts first
        let related = currentPost.relatedPosts.slice();
        
        // If we need more posts, get others from the same category
        if (related.length < count) {
            const categoryPosts = this.getPostsByCategory(currentPost.category, currentPostSlug, count - related.length);
            related = related.concat(categoryPosts.map(post => post.slug));
        }
        
        return related.slice(0, count).map(slug => ({
            slug: slug,
            ...this.blogPosts[slug]
        })).filter(post => post.title);
    }
    
    getPostsByCalculator(calculatorSlug, count = 3) {
        const relatedPosts = [];
        
        for (const [slug, post] of Object.entries(this.blogPosts)) {
            if (post.relatedCalculators && post.relatedCalculators.includes(calculatorSlug)) {
                relatedPosts.push({
                    slug: slug,
                    ...post
                });
            }
        }
        
        return relatedPosts.slice(0, count);
    }
    
    renderRelatedPosts(container, currentPostSlug, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        const {
            count = 3,
            title = 'Related Articles',
            showDescription = true,
            showMeta = true,
            className = 'related-posts'
        } = options;
        
        const relatedPosts = this.getRelatedPosts(currentPostSlug, count);
        
        if (relatedPosts.length === 0) return;
        
        const html = `
            <section class="${className}">
                <h2>${title}</h2>
                <div class="posts-grid">
                    ${relatedPosts.map(post => `
                        <article class="post-card">
                            ${showMeta ? `
                                <div class="post-meta">
                                    <span class="category">${post.category}</span>
                                    <time datetime="${post.date}">${this.formatDate(post.date)}</time>
                                </div>
                            ` : ''}
                            <h3><a href="${post.url}">${post.title}</a></h3>
                            ${showDescription ? `<p>${post.description}</p>` : ''}
                            ${showMeta ? `
                                <div class="post-footer">
                                    <span class="author">By ${post.author}</span>
                                    <span class="reading-time">${post.readingTime}</span>
                                </div>
                            ` : ''}
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        
        container.innerHTML = html;
    }
    
    renderPostsByCategory(container, category, excludeSlug = null, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        const {
            count = 3,
            title = `${category} Articles`,
            showDescription = true,
            showMeta = true,
            className = 'category-posts'
        } = options;
        
        const posts = this.getPostsByCategory(category, excludeSlug, count);
        
        if (posts.length === 0) return;
        
        const html = `
            <section class="${className}">
                <h2>${title}</h2>
                <div class="posts-grid">
                    ${posts.map(post => `
                        <article class="post-card">
                            ${showMeta ? `
                                <div class="post-meta">
                                    <span class="category">${post.category}</span>
                                    <time datetime="${post.date}">${this.formatDate(post.date)}</time>
                                </div>
                            ` : ''}
                            <h3><a href="${post.url}">${post.title}</a></h3>
                            ${showDescription ? `<p>${post.description}</p>` : ''}
                            ${showMeta ? `
                                <div class="post-footer">
                                    <span class="author">By ${post.author}</span>
                                    <span class="reading-time">${post.readingTime}</span>
                                </div>
                            ` : ''}
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        
        container.innerHTML = html;
    }
    
    renderCalculatorPosts(container, calculatorSlug, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        const {
            count = 3,
            title = 'Related Guides',
            className = 'calculator-posts'
        } = options;
        
        const posts = this.getPostsByCalculator(calculatorSlug, count);
        
        if (posts.length === 0) return;
        
        const html = `
            <section class="${className}">
                <h2>${title}</h2>
                <div class="posts-list">
                    ${posts.map(post => `
                        <article class="post-item">
                            <a href="${post.url}">${post.title}</a>
                            <p>${post.description}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        
        container.innerHTML = html;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    // Auto-detect current context and render appropriate related content
    autoRender() {
        const currentPath = window.location.pathname;
        
        // Check if we're on a blog post
        const blogMatch = currentPath.match(/\/blog\/posts\/([^\.]+)\.html/);
        if (blogMatch) {
            const currentPost = blogMatch[1];
            
            // Render related posts
            const relatedContainer = document.querySelector('.related-posts-auto');
            if (relatedContainer) {
                this.renderRelatedPosts(relatedContainer, currentPost);
            }
            return;
        }
        
        // Check if we're on a calculator page
        const calcMatch = currentPath.match(/\/calculators\/([^\.]+)\.html/);
        if (calcMatch) {
            const calculatorSlug = calcMatch[1];
            
            // Render related blog posts for this calculator
            const postsContainer = document.querySelector('.calculator-posts-auto');
            if (postsContainer) {
                this.renderCalculatorPosts(postsContainer, calculatorSlug);
            }
        }
    }
}

// Auto-initialize related posts on page load
document.addEventListener('DOMContentLoaded', function() {
    const relatedPosts = new RelatedPosts();
    relatedPosts.autoRender();
});

export default RelatedPosts;