import type { Metadata } from "next";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Advanced Image Resizer Features for Bulk, Format and Quality Control",
  description:
    "Explore powerful image optimization features including pixel and percentage resize modes, bulk processing, format conversion, quality tuning, and quick export tools designed for creators and business workflows.",
};

type FeatureCard = {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  tag?: string;
};

const features: FeatureCard[] = [
  {
    icon: "↔",
    title: "Pixel & Percentage Resize",
    description:
      "Resize by exact pixels, inches, centimeters, or by uniform percentage with a single click. Perfect for print and web targets.",
    bullets: ["Aspect ratio lock", "Do-not-enlarge guard", "Px / in / cm units"],
  },
  {
    icon: "▥",
    title: "Bulk Processing",
    description:
      "Drop a whole folder of images and process them in one clean queue with consistent settings across every file.",
    bullets: ["Multi-file drag & drop", "Unified export pipeline", "Per-file size readout"],
  },
  {
    icon: "⇄",
    title: "Format Conversion",
    description:
      "Convert between JPG, PNG and WebP with format-aware defaults so transparency, metadata, and quality stay correct.",
    bullets: ["JPG / PNG / WebP", "Transparency-safe", "Format-aware quality"],
  },
  {
    icon: "✦",
    title: "HD & Clear Image Profiles",
    description:
      "Two new clarity presets keep more detail when shrinking large images, using stronger resampling and higher export quality.",
    bullets: ["Standard, HD, Clear modes", "High-quality resampling", "Subtle contrast boost"],
    tag: "New",
  },
  {
    icon: "◴",
    title: "Quality & Target Size",
    description:
      "Tune lossy quality directly or set a target file size and the app will automatically search for the best quality that fits.",
    bullets: ["0–100 quality slider", "KB-based size limit", "Web-optimized cap"],
  },
  {
    icon: "⛨",
    title: "Privacy-first Local Processing",
    description:
      "Images are processed entirely in your browser using canvas. No upload to a server, no metadata leak, no waiting in queues.",
    bullets: ["100% client-side", "EXIF / GPS stripped", "Works offline after load"],
  },
];

const workflow = [
  {
    title: "Upload",
    description: "Drag & drop one image or hundreds. Previews appear instantly with size and dimensions.",
  },
  {
    title: "Configure",
    description: "Pick pixels or %, choose a clarity profile, set format, quality, and a target file size.",
  },
  {
    title: "Export",
    description: "Hit resize and download each file with a clean, predictable, custom-named output.",
  },
];

const highlights = [
  { title: "No watermark", description: "Clean exports with no overlay on Pro and Business plans." },
  { title: "Bulk rename", description: "Add a base name, dimensions, or original filename pattern." },
  { title: "Live size estimate", description: "See the projected output size before you export." },
  { title: "Aspect lock", description: "Stay perfectly proportional or unlock for free-form sizing." },
];

export default function FeaturesPage() {
  return (
    <main className="landing">
      <LandingHeader />

      <section className="content-page features-hero">
        <p className="image-resizer-section-title">Features</p>
        <h1 className="content-page-title">Everything you need to optimize images</h1>
        <p className="content-page-subtitle">
          Resize by pixels or percentage, convert formats, tune quality, and export results in one clean workflow built
          for creators, developers, and busy teams.
        </p>
        <div className="features-hero-actions">
          <Link href="/#workspace" className="pricing-cta featured">
            Start Resizing Free
          </Link>
          <Link href="/pricing" className="pricing-cta">
            View Pricing
          </Link>
        </div>
        <div className="features-hero-stats" aria-label="Highlights">
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">3</span>
            <span className="features-hero-stat-label">Output formats</span>
          </div>
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">100%</span>
            <span className="features-hero-stat-label">Client-side</span>
          </div>
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">HD</span>
            <span className="features-hero-stat-label">Clarity profiles</span>
          </div>
          <div className="features-hero-stat">
            <span className="features-hero-stat-value">∞</span>
            <span className="features-hero-stat-label">Bulk files</span>
          </div>
        </div>
      </section>

      <section className="content-page" aria-label="Core capabilities">
        <p className="image-resizer-section-title">Core capabilities</p>
        <h2 className="content-page-title">Powerful tools, simple controls</h2>
        <p className="content-page-subtitle">
          Each feature is tuned for real workflows: predictable output, sensible defaults, and full manual control when
          you need it.
        </p>
        <div className="feature-3d-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-3d-card" aria-label={feature.title}>
              {feature.tag ? <span className="feature-3d-tag">{feature.tag}</span> : null}
              <span className="feature-3d-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="feature-3d-title">{feature.title}</h3>
              <p className="feature-3d-desc">{feature.description}</p>
              <ul className="feature-3d-list">
                {feature.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-page" aria-label="How it works">
        <p className="image-resizer-section-title">How it works</p>
        <h2 className="content-page-title">A three-step workflow</h2>
        <div className="features-workflow">
          {workflow.map((step, index) => (
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

      <section className="content-page" aria-label="Highlights">
        <p className="image-resizer-section-title">Highlights</p>
        <h2 className="content-page-title">Built-in quality-of-life touches</h2>
        <div className="features-highlights">
          {highlights.map((item) => (
            <div key={item.title} className="features-highlight">
              <p className="features-highlight-title">{item.title}</p>
              <p className="features-highlight-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-final-cta">
        <h2>Ready to ship cleaner, faster images?</h2>
        <p>Resize, compress, and convert in seconds — directly in your browser.</p>
        <Link href="/#workspace" className="pricing-cta featured">
          Start Free Now
        </Link>
      </section>

      <LandingFooter />
    </main>
  );
}
