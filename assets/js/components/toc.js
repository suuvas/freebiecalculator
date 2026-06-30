// Table of Contents component for FreebieCalculator.com

class TableOfContents {
    constructor() {
        this.config = {
            selectors: 'h2, h3, h4', // Headings to include in TOC
            containerSelector: '#table-of-contents, .toc',
            contentSelector: '.post-content, .content-section, main',
            offset: 100, // Scroll offset for smooth navigation
            activeClass: 'active',
            numbering: false
        };
    }
    
    generateTOC(container, options = {}) {
        const config = { ...this.config, ...options };
        
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) return;
        
        // Find content area
        const contentArea = document.querySelector(config.contentSelector);
        if (!contentArea) return;
        
        // Get all headings
        const headings = contentArea.querySelectorAll(config.selectors);
        if (headings.length === 0) return;
        
        // Generate TOC structure
        const tocItems = this.buildTOCStructure(headings, config);
        
        // Render TOC
        this.renderTOC(container, tocItems, config);
        
        // Add smooth scrolling
        this.addSmoothScrolling(container, config);
        
        // Add scroll spy for active highlighting
        this.addScrollSpy(headings, container, config);
    }
    
    buildTOCStructure(headings, config) {
        const tocItems = [];
        
        headings.forEach((heading, index) => {
            // Generate ID if not present
            if (!heading.id) {
                heading.id = this.generateId(heading.textContent);
            }
            
            // Add anchor link
            this.addAnchorLink(heading);
            
            const level = parseInt(heading.tagName.substring(1));
            const text = heading.textContent.replace('🔗', '').trim(); // Remove anchor symbol
            
            tocItems.push({
                id: heading.id,
                text: text,
                level: level,
                element: heading,
                index: index
            });
        });
        
        return tocItems;
    }
    
    generateId(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim('-'); // Remove leading/trailing hyphens
    }
    
    addAnchorLink(heading) {
        // Check if anchor link already exists
        if (heading.querySelector('.anchor-link')) return;
        
        const anchor = document.createElement('a');
        anchor.href = `#${heading.id}`;
        anchor.className = 'anchor-link';
        anchor.innerHTML = '🔗';
        anchor.title = 'Link to this section';
        anchor.setAttribute('aria-label', 'Link to this section');
        
        heading.appendChild(anchor);
    }
    
    renderTOC(container, tocItems, config) {
        if (tocItems.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        const tocTitle = container.querySelector('h3, h4, .toc-title');
        const existingTitle = tocTitle ? tocTitle.textContent : 'Table of Contents';
        
        let html = `
            <h3 class="toc-title">${existingTitle}</h3>
            <nav class="toc-nav">
                <ul class="toc-list">
        `;
        
        let currentLevel = 0;
        let openLists = 0;
        
        tocItems.forEach((item, index) => {
            const isLast = index === tocItems.length - 1;
            const nextLevel = isLast ? 0 : tocItems[index + 1]?.level || 0;
            
            // Handle nesting
            if (item.level > currentLevel) {
                // Opening new nested level
                if (currentLevel > 0) {
                    html += '<ul class="toc-sublist">';
                    openLists++;
                }
            } else if (item.level < currentLevel) {
                // Closing nested levels
                const levelsToClose = currentLevel - item.level;
                for (let i = 0; i < levelsToClose && openLists > 0; i++) {
                    html += '</ul>';
                    openLists--;
                }
            }
            
            // Add the item
            const number = config.numbering ? `${index + 1}. ` : '';
            html += `
                <li class="toc-item level-${item.level}">
                    <a href="#${item.id}" class="toc-link" data-target="${item.id}">
                        ${number}${item.text}
                    </a>
                </li>
            `;
            
            currentLevel = item.level;
        });
        
        // Close any remaining open lists
        for (let i = 0; i < openLists; i++) {
            html += '</ul>';
        }
        
        html += `
                </ul>
            </nav>
        `;
        
        container.innerHTML = html;
    }
    
    addSmoothScrolling(container, config) {
        const links = container.querySelectorAll('.toc-link');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.dataset.target;
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - config.offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without triggering scroll
                    if (history.pushState) {
                        history.pushState(null, null, `#${targetId}`);
                    }
                }
            });
        });
    }
    
    addScrollSpy(headings, container, config) {
        if (!('IntersectionObserver' in window)) {
            return; // Fallback for older browsers
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = container.querySelector(`[data-target="${id}"]`);
                
                if (tocLink) {
                    if (entry.isIntersecting) {
                        // Remove active class from all links
                        container.querySelectorAll('.toc-link').forEach(link => {
                            link.classList.remove(config.activeClass);
                        });
                        
                        // Add active class to current link
                        tocLink.classList.add(config.activeClass);
                    }
                }
            });
        }, {
            rootMargin: `-${config.offset}px 0px -50% 0px`,
            threshold: 0
        });
        
        headings.forEach(heading => {
            observer.observe(heading);
        });
    }
    
    // Auto-initialize TOC on pages with content
    autoRender() {
        const containers = document.querySelectorAll(this.config.containerSelector);
        
        containers.forEach(container => {
            // Check if this page should have a TOC
            const contentArea = document.querySelector(this.config.contentSelector);
            if (contentArea) {
                const headings = contentArea.querySelectorAll(this.config.selectors);
                if (headings.length >= 3) { // Only show TOC if there are 3+ headings
                    this.generateTOC(container);
                } else {
                    container.style.display = 'none';
                }
            }
        });
    }
    
    // Utility method to add reading progress indicator
    addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        
        document.body.appendChild(progressBar);
        
        const progressBarFill = progressBar.querySelector('.reading-progress-bar');
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = (scrollTop / documentHeight) * 100;
            progressBarFill.style.width = `${Math.min(progress, 100)}%`;
        });
    }
}

// Auto-initialize TOC on page load
document.addEventListener('DOMContentLoaded', function() {
    const toc = new TableOfContents();
    toc.autoRender();
    
    // Add reading progress on long content pages
    const isLongContent = document.body.scrollHeight > window.innerHeight * 2;
    if (isLongContent) {
        toc.addReadingProgress();
    }
});

export default TableOfContents;