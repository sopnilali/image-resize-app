import Link from "next/link";

export function LandingHero() {
  return (
    <section className="image-resizer-hero">
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Resize Image</span>
      </nav>

      <div className="hero-grid">
        <div>
          <p className="image-resizer-hero-badge">Resize images in pixels fast, private &amp; precise</p>
          <h1 className="hero-title">Resize, Compress &amp; Optimize Images in Seconds</h1>
          <p className="hero-subtitle">
            Set custom dimensions, bulk resize images, and export in multiple formats - no software, no limits, no
            hassle.
          </p>
          <div className="hero-cta">
            <a className="hero-btn-primary" href="#workspace">
              Select images
            </a>
            <a className="hero-btn-outline" href="#workspace">
              Set dimensions
            </a>
          </div>
          <div className="hero-feature-chips">
            <span className="hero-feature-chip">100% on-device</span>
            <span className="hero-feature-chip">Exact pixel bounds</span>
            <span className="hero-feature-chip">Instant JPG/PNG/WebP</span>
          </div>
        </div>
        <div className="hero-mock" aria-hidden="true">
          <div className="hero-mock-inner">
            <div className="hero-mock-row">
              <div className="hero-mock-card">
                <div className="hero-mock-card-head">
                  <span className="hero-mock-pill">Before</span>
                  <span className="hero-mock-dims">1920 x 1080 px</span>
                </div>
                <div className="hero-mock-preview" />
              </div>
              <div className="hero-mock-arrow">→</div>
              <div className="hero-mock-card">
                <div className="hero-mock-card-head">
                  <span className="hero-mock-pill">After</span>
                  <span className="hero-mock-dims">800 x 600 px</span>
                </div>
                <div className="hero-mock-preview hero-mock-preview--after" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
