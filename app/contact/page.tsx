import type { Metadata } from "next";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Contact Us | ImageResizer",
  description:
    "Get in touch with the ImageResizer team for support, billing questions, partnerships, or feedback.",
};

const contactChannels = [
  {
    icon: "✉",
    title: "Support",
    description: "Need help with resizing, exports, or account access?",
    bullets: ["support@imageresizer.app", "Response in 24 hours", "Technical troubleshooting"],
  },
  {
    icon: "$",
    title: "Billing",
    description: "Questions about invoices, upgrades, refunds, or subscription status.",
    bullets: ["billing@imageresizer.app", "Plan and invoice help", "Fast priority handling"],
  },
  {
    icon: "🤝",
    title: "Partnerships",
    description: "Discuss integrations, affiliates, reseller opportunities, or collaborations.",
    bullets: ["partners@imageresizer.app", "Integration partnerships", "Affiliate program requests"],
  },
];

export default function ContactPage() {
  return (
    <main className="landing">
      <LandingHeader />

      <section className="content-page features-hero">
        <p className="image-resizer-section-title">Contact</p>
        <h1 className="content-page-title">We are here to help</h1>
        <p className="content-page-subtitle">
          Reach out for support, billing, or business questions. Our team reads every message and replies as quickly as possible.
        </p>
        <div className="features-hero-actions">
          <a href="mailto:support@imageresizer.app" className="pricing-cta featured">
            Email Support
          </a>
          <Link href="/#workspace" className="pricing-cta">
            Open Workspace
          </Link>
        </div>
      </section>

      <section className="content-page" aria-label="Contact channels">
        <p className="image-resizer-section-title">How to reach us</p>
        <h2 className="content-page-title">Choose the right channel</h2>
        <div className="feature-3d-grid">
          {contactChannels.map((item) => (
            <article key={item.title} className="feature-3d-card" aria-label={item.title}>
              <span className="feature-3d-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="feature-3d-title">{item.title}</h3>
              <p className="feature-3d-desc">{item.description}</p>
              <ul className="feature-3d-list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-page" aria-label="FAQ">
        <p className="image-resizer-section-title">Quick answers</p>
        <h2 className="content-page-title">Before you send a message</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>How fast do you usually reply?</summary>
            <p>Most support emails get a reply within one business day.</p>
          </details>
          <details className="faq-item">
            <summary>Can you help with bulk workflows?</summary>
            <p>Yes. Share your use case and sample output targets, and we will suggest the best setup.</p>
          </details>
          <details className="faq-item">
            <summary>Do you offer enterprise plans?</summary>
            <p>Yes. Contact our partnerships team for custom pricing, onboarding, and priority support.</p>
          </details>
        </div>
      </section>

      <section className="pricing-final-cta">
        <h2>Prefer to start right away?</h2>
        <p>You can use ImageResizer immediately and contact us anytime if you need help.</p>
        <Link href="/#workspace" className="pricing-cta featured">
          Start Resizing
        </Link>
      </section>

      <LandingFooter />
    </main>
  );
}
