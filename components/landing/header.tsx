import Link from "next/link";
import { HeaderThemeToggle } from "@/components/header-theme-toggle";

export function LandingHeader() {
  return (
    <header className="image-resizer-nav">
      <div className="container nav-inner">
        <div className="navbar-logo-slot">
          <Link href="/" className="image-resizer-brand-link">
            <span className="image-resizer-logo-icon" aria-hidden="true">
              IR
            </span>
            <span>
              <span className="image-resizer-nav-brand">ImageResizer</span>
              <span className="brand-subtitle">Resize · Convert · Export</span>
            </span>
          </Link>
        </div>

        <nav className="navbar-menu-slot" aria-label="Main navigation">
          <div className="navbar-menu">
            <Link href="/" className="navbar-link">
              Home
            </Link>
            <Link href="/pricing" className="navbar-link">
              Pricing
            </Link>
            <Link href="/features" className="navbar-link">
              Features
            </Link>
            <Link href="/about" className="navbar-link">
              About
            </Link>
            <Link href="/contact" className="navbar-link">
              Contact Us
            </Link>
          </div>
        </nav>

        <div className="navbar-cta-slot">
          <span className="saas-pill">SAAS</span>
          <Link href="/#workspace" className="navbar-cta">
            Start Resizing
          </Link>
          <HeaderThemeToggle />
        </div>
      </div>
    </header>
  );
}
