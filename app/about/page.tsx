import type { Metadata } from "next";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "About ImageResizer: Fast, Private and Reliable Image Optimization Team",
  description:
    "Learn how ImageResizer helps creators, developers, and businesses resize, compress, and optimize images quickly with a private browser-based workflow, modern performance, and practical export options.",
};

type ValueCard = {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  tag?: string;
};

const values: ValueCard[] = [
  {
    icon: "⛨",
    title: "Privacy First",
    description:
      "Every image is processed entirely in your browser using canvas. No uploads, no server queues, no metadata leak.",
    bullets: ["100% client-side processing", "EXIF / GPS stripped on export", "Works offline after first load"],
    tag: "Core value",
  },
  {
    icon: "⚡",
    title: "Speed Matters",
    description:
      "A lean canvas pipeline that runs as fast as your device — no waiting in line, no progress bars that lie to you.",
    bullets: ["Instant previews", "No upload round-trips", "Hardware-accelerated rendering"],
  },
  {
    icon: "✦",
    title: "Quality without Compromise",
    description:
      "HD and Clear clarity profiles preserve detail when shrinking, with high-quality resampling and tuned export quality.",
    bullets: ["Standard, HD, Clear modes", "Format-aware quality control", "Live size estimate"],
  },
  {
    icon: "▥",
    title: "Built for Bulk",
    description:
      "Whether it's three images or three hundred, the workflow is the same: drag, configure once, export everything.",
    bullets: ["Drag & drop multi-file queue", "Unified export settings", "Bulk rename presets"],
  },
  {
    icon: "⇄",
    title: "Open & Predictable",
    description:
      "Predictable formats, no watermarks on Pro, and outputs that look exactly like the previews — every time.",
    bullets: ["JPG / PNG / WebP", "No surprise watermarks on Pro", "Stable, repeatable exports"],
  },
  {
    icon: "♿",
    title: "Inclusive Defaults",
    description:
      "Accessible controls, sensible defaults, and full keyboard support so anyone can ship clean images quickly.",
    bullets: ["Keyboard-friendly controls", "High-contrast theme support", "Reduced motion respected"],
  },
];

const process = [
  {
    title: "Listen",
    description: "We watch real workflows from creators, devs, and e-commerce teams to learn what actually slows them down.",
  },
  {
    title: "Build",
    description: "We ship focused tools — pixel-perfect resize, clarity profiles, bulk pipelines — without bolting on bloat.",
  },
  {
    title: "Polish",
    description: "Defaults, accessibility, and performance are tuned each release so the simple path stays the fastest.",
  },
];

const promises = [
  { title: "No data sent", description: "Your images never leave the device — processing is fully local." },
  { title: "No watermark", description: "Clean exports on Pro and Business with no overlay branding." },
  { title: "Cross-platform", description: "Runs in any modern browser on Windows, macOS, Linux, iOS, and Android." },
  { title: "Continuously improved", description: "Regular updates focused on speed, quality, and quality-of-life touches." },
];

export default function AboutPage() {
  return (
    <main className="landing">
      <LandingHeader />

      <section className="content-page features-hero">
        <p className="image-resizer-section-title">About</p>
        <h1 className="content-page-title">Built for fast, high-quality image workflows</h1>
        <p className="content-page-subtitle">
          ImageResizer helps teams and solo creators prepare assets in seconds — without sacrificing quality, privacy,
          or the simple, predictable controls that make bulk work actually enjoyable.
        </p>
        <div className="features-hero-actions">
          <Link href="/#workspace" className="pricing-cta featured">
            Try It Free
          </Link>
          <Link href="/features" className="pricing-cta">
            View Features
          </Link>
        </div>
        <div className="features-hero-stats" aria-label="ImageResizer at a glance">
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">2024</span>
            <span className="features-hero-stat-label">Founded</span>
          </div>
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">10M+</span>
            <span className="features-hero-stat-label">Files processed</span>
          </div>
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">120+</span>
            <span className="features-hero-stat-label">Countries</span>
          </div>
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">&lt;2s</span>
            <span className="features-hero-stat-label">Avg. resize time</span>
          </div>
        </div>
      </section>

      <section className="content-page" aria-label="Our story">
        <p className="image-resizer-section-title">Our story</p>
        <h2 className="content-page-title">Why we built ImageResizer</h2>
        <p className="content-page-subtitle">
          Most image tools online force a tradeoff: they're either fast but watermarked, private but clunky, or capable
          but slow because every file has to round-trip a server. We built ImageResizer to remove that tradeoff entirely
          — a clean, browser-native workflow that's instantly fast, privacy-first by default, and powerful enough for
          serious bulk work.
        </p>
        <p className="content-page-subtitle" style={{ marginTop: "0.85rem" }}>
          Today the same tool serves indie creators preparing portfolio assets, developers wiring image pipelines, and
          e-commerce teams shipping thousands of product photos. Different needs, one shared expectation: the simple
          path should also be the fastest, cleanest, and most predictable one.
        </p>
      </section>

      <section className="content-page" aria-label="What we value">
        <p className="image-resizer-section-title">What we value</p>
        <h2 className="content-page-title">The principles behind every release</h2>
        <p className="content-page-subtitle">
          These six commitments shape every feature we ship — from the resize engine to the smallest UI affordance.
        </p>
        <div className="feature-3d-grid">
          {values.map((value) => (
            <article key={value.title} className="feature-3d-card" aria-label={value.title}>
              {value.tag ? <span className="feature-3d-tag">{value.tag}</span> : null}
              <span className="feature-3d-icon" aria-hidden="true">
                {value.icon}
              </span>
              <h3 className="feature-3d-title">{value.title}</h3>
              <p className="feature-3d-desc">{value.description}</p>
              <ul className="feature-3d-list">
                {value.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-page" aria-label="How we work">
        <p className="image-resizer-section-title">How we work</p>
        <h2 className="content-page-title">A small, focused process</h2>
        <div className="features-workflow">
          {process.map((step, index) => (
            <article key={step.title} className="features-workflow-step">
              <span className="features-workflow-step-num" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-page" aria-label="What we promise">
        <p className="image-resizer-section-title">What we promise</p>
        <h2 className="content-page-title">Commitments you can count on</h2>
        <div className="features-highlights">
          {promises.map((item) => (
            <div key={item.title} className="features-highlight">
              <p className="features-highlight-title">{item.title}</p>
              <p className="features-highlight-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-page" aria-label="Testimonial">
        <p className="image-resizer-section-title">In their words</p>
        <h2 className="content-page-title">Trusted by people who ship images for a living</h2>
        <blockquote className="testimonial-card">
          <p className="testimonial-stars">★★★★★</p>
          <p className="testimonial-quote">
            ImageResizer cut our product image prep from an afternoon to a coffee break. Quality is sharper than what we
            were getting from our old desktop tool — and nothing leaves the browser.
          </p>
          <cite className="testimonial-author">- Lead Designer, DTC Brand</cite>
        </blockquote>
      </section>

      <section className="pricing-final-cta">
        <h2>Ship cleaner images, faster — starting today</h2>
        <p>Open the workspace and resize your first batch in under a minute. No signup required.</p>
        <Link href="/#workspace" className="pricing-cta featured">
          Open the Workspace
        </Link>
      </section>

      <LandingFooter />
    </main>
  );
}
