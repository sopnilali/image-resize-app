import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export default function NotFoundPage() {
  return (
    <main className="landing">
      <LandingHeader />
      <section className="content-page">
        <p className="image-resizer-section-title">404 Error</p>
        <h1 className="content-page-title">Page not found</h1>
        <p className="content-page-subtitle">
          The page you are looking for does not exist, may have been moved, or is temporarily unavailable.
        </p>
        <div className="hero-cta">
          <Link href="/" className="hero-btn-primary">
            Go Home
          </Link>
          <Link href="/pricing" className="hero-btn-outline">
            View Pricing
          </Link>
        </div>
      </section>
      <LandingFooter />
    </main>
  );
}
