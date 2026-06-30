// Table of Contents Generator for Blog Posts
// Automatically generates TOC from H2 and H3 headings

export class TableOfContents {
    constructor(options = {}) {
        this.tocContainer = options.container || '#table-of-contents';
        this.headingSelector = options.headings || 'h2, h3';
        this.tocClass = options.tocClass || 'toc-list';
        this.activeClass = options.activeClass || 'active';
        this.offset = options.offset || 80; // Header height offset
    }

    init() {
        this.generateTOC();
        this.addScrollSpy();
        this.addSmoothScrolling();
    }

    generateTOC() {
        const headings = document.querySelectorAll(this.headingSelector);
        const tocContainer = document.querySelector(this.tocContainer);
        
        if (!headings.length || !tocContainer) return;

        const tocList = document.createElement('ul');
        tocList.className = this.tocClass;
        
        let currentLevel = 2; // Start with H2
        let currentList = tocList;
        const listStack = [tocList];

        headings.forEach((heading, index) => {
            // Generate unique ID if heading doesn't have one
            if (!heading.id) {
                heading.id = this.generateId(heading.textContent);
            }

            const level = parseInt(heading.tagName.charAt(1));
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.className = 'toc-link';
            link.dataset.target = heading.id;
            
            listItem.appendChild(link);

            // Handle nesting for H3 under H2
            if (level > currentLevel) {
                const nestedList = document.createElement('ul');
                nestedList.className = 'toc-nested';
                if (currentList.lastElementChild) {
                    currentList.lastElementChild.appendChild(nestedList);
                }
                currentList = nestedList;
                listStack.push(nestedList);
            } else if (level < currentLevel) {
                // Go back to parent level
                listStack.pop();
                currentList = listStack[listStack.length - 1];
            }

            currentList.appendChild(listItem);
            currentLevel = level;
        });

        // Add TOC title
        const tocTitle = document.createElement('h3');
        tocTitle.textContent = 'Table of Contents';
        tocTitle.className = 'toc-title';
        
        tocContainer.appendChild(tocTitle);
        tocContainer.appendChild(tocList);
    }

    generateId(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .trim();
    }

    addScrollSpy() {
        const headings = document.querySelectorAll(this.headingSelector);
        const tocLinks = document.querySelectorAll('.toc-link');
        
        if (!headings.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const link = document.querySelector(`[data-target="${entry.target.id}"]`);
                if (link) {
                    if (entry.isIntersecting) {
                        // Remove active class from all links
                        tocLinks.forEach(l => l.classList.remove(this.activeClass));
                        // Add active class to current link
                        link.classList.add(this.activeClass);
                    }
                }
            });
        }, {
            rootMargin: `-${this.offset}px 0px -60% 0px`,
            threshold: 0
        });

        headings.forEach(heading => observer.observe(heading));
    }

    addSmoothScrolling() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - this.offset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// Auto-initialize if TOC container exists
document.addEventListener('DOMContentLoaded', () => {
    const tocContainer = document.querySelector('#table-of-contents');
    if (tocContainer) {
        const toc = new TableOfContents();
        toc.init();
    }
});