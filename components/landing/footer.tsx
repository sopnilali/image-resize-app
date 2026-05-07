import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="rt-footer">
      <section className="footer-newsletter" aria-label="Newsletter">
        <div>
          <p className="footer-title">Get image optimization tips & updates</p>
          <p className="footer-muted">Weekly practical ideas for faster image workflows.</p>
        </div>
        <form className="footer-newsletter-form" action="#">
          <input type="email" placeholder="Enter your email" aria-label="Email address" required />
          <button type="submit" className="footer-subscribe-btn">
            Subscribe
          </button>
        </form>
      </section>

      <div className="footer-grid footer-grid-5">
        <div className="footer-brand-col">
          <Link href="/" className="footer-brand-link">
            <span className="image-resizer-logo-icon" aria-hidden="true">
              IR
            </span>
            <span className="footer-brand-name">ImageResizer</span>
          </Link>
          <p className="footer-muted">
            Fast, secure image resizing & optimization tool for creators and businesses.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="#" aria-label="GitHub">
              GitHub
            </a>
          </div>
        </div>

        <div>
          <p className="footer-title">Product</p>
          <div className="stack">
            <Link href="/">Image Resizer</Link>
            <Link href="/features">Bulk Resize</Link>
            <Link href="/features">Image Compressor</Link>
            <Link href="/features">Format Converter</Link>
            <a href="#">API Access</a>
          </div>
        </div>
        <div>
          <p className="footer-title">Resources</p>
          <div className="stack">
            <a href="#">Blog</a>
            <a href="#">Documentation</a>
            <a href="#">API Docs</a>
            <a href="#">Help Center</a>
            <a href="#">Tutorials</a>
          </div>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <div className="stack">
            <Link href="/about">About Us</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
            <a href="#">Careers</a>
            <a href="#">Affiliate Program</a>
          </div>
        </div>
        <div>
          <p className="footer-title">Legal</p>
          <div className="stack">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href="#">Cookie Policy</a>
            <a href="#">GDPR Compliance</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="footer-muted">© 2026 ImageResizer. All rights reserved.</p>
        <div className="footer-bottom-meta">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
      <div id="contact" />
    </footer>
  );
}
