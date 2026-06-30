// Footer component with trust signals and comprehensive links
export function initFooter() {
    const footerElement = document.getElementById('footer');
    if (!footerElement) return;
    
    const currentYear = new Date().getFullYear();
    
    footerElement.innerHTML = `
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>FreebieCalculator</h3>
                    <p>Free, accurate, and reliable online calculators for finance, health, education, and everyday math. No registration required.</p>
                    <div class="footer-trust-signals">
                        <div class="trust-signal">
                            <span class="trust-icon">🔒</span>
                            <span>Privacy-First Design</span>
                        </div>
                        <div class="trust-signal">
                            <span class="trust-icon">⚡</span>
                            <span>Lightning Fast</span>
                        </div>
                        <div class="trust-signal">
                            <span class="trust-icon">📱</span>
                            <span>Mobile Optimized</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Calculators</h4>
                    <ul>
                        <li><a href="/calculators/emi.html">EMI Calculator</a></li>
                        <li><a href="/calculators/bmi.html">BMI Calculator</a></li>
                        <li><a href="/calculators/percentage.html">Percentage Calculator</a></li>
                        <li><a href="/calculators/mortgage.html">Mortgage Calculator</a></li>
                        <li><a href="/calculators/compound-interest.html">Compound Interest</a></li>
                        <li><a href="/">View All Calculators</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="/blog/">Calculator Guides</a></li>
                        <li><a href="/about.html">About Us</a></li>
                        <li><a href="/editorial-policy.html">Editorial Policy</a></li>
                        <li><a href="/review-process.html">Review Process</a></li>
                        <li><a href="/update-log.html">Update Log</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Support & Legal</h4>
                    <ul>
                        <li><a href="/contact.html">Contact Us</a></li>
                        <li><a href="/search.html">Search</a></li>
                        <li><a href="/privacy.html">Privacy Policy</a></li>
                        <li><a href="/terms.html">Terms of Service</a></li>
                        <li><a href="/disclaimer.html">Disclaimer</a></li>
                        <li><a href="/feed.xml">RSS Feed</a></li>
                        <li><a href="/sitemap.xml">Sitemap</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-company-info">
                    <p><strong>FreebieCalculator.com</strong> - Professional calculation tools since 2025</p>
                    <p>Contact: <a href="/contact.html">team@freebiecalculator.com</a></p>
                </div>
                <div class="footer-copyright">
                    <p>© ${currentYear} FreebieCalculator.com. All rights reserved.</p>
                    <p class="footer-disclaimer">All calculations are for informational purposes only. Consult professionals for important decisions.</p>
                </div>
            </div>
        </div>
    `;
}
