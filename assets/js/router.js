// Simple client-side router for single page navigation
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        
        // Listen for popstate events (back/forward buttons)
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
    }
    
    // Add a route
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }
    
    // Navigate to a route
    navigate(path, pushState = true) {
        if (pushState) {
            history.pushState({}, '', path);
        }
        this.handleRoute(path);
    }
    
    // Handle route change
    handleRoute(path) {
        const handler = this.routes.get(path);
        
        if (handler) {
            this.currentRoute = path;
            handler();
        } else {
            // Try to find a matching pattern
            for (const [route, handler] of this.routes) {
                if (this.matchRoute(route, path)) {
                    this.currentRoute = path;
                    handler(this.extractParams(route, path));
                    return;
                }
            }
            
            // No route found, handle 404
            this.handle404();
        }
    }
    
    // Simple route matching (supports :param patterns)
    matchRoute(route, path) {
        const routeParts = route.split('/');
        const pathParts = path.split('/');
        
        if (routeParts.length !== pathParts.length) {
            return false;
        }
        
        return routeParts.every((part, index) => {
            return part.startsWith(':') || part === pathParts[index];
        });
    }
    
    // Extract parameters from route
    extractParams(route, path) {
        const routeParts = route.split('/');
        const pathParts = path.split('/');
        const params = {};
        
        routeParts.forEach((part, index) => {
            if (part.startsWith(':')) {
                const paramName = part.slice(1);
                params[paramName] = pathParts[index];
            }
        });
        
        return params;
    }
    
    // Handle 404 errors
    handle404() {
        console.warn('Route not found:', window.location.pathname);
        // In a real app, you might redirect to a 404 page
        // For now, just stay on the current page
    }
    
    // Initialize router
    init() {
        this.handleRoute(window.location.pathname);
    }
}

// Export router instance
export const router = new Router();

// Utility function to handle internal links
export function setupInternalLinks() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        
        if (link && link.hostname === window.location.hostname) {
            const href = link.getAttribute('href');
            
            // Only handle internal links that don't have special attributes
            if (!link.hasAttribute('target') && 
                !link.hasAttribute('download') && 
                !href.startsWith('mailto:') && 
                !href.startsWith('tel:')) {
                
                e.preventDefault();
                router.navigate(href);
            }
        }
    });
}
