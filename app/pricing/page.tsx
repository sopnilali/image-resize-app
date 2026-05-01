"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

const plans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Best for trying core tools",
    features: [
      "20 images/day",
      "Basic resizing",
      "Limited formats (JPG, PNG)",
      "Watermark added",
    ],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$9",
    yearlyPrice: "$7",
    description: "Most balanced for creators",
    features: [
      "Unlimited images",
      "Bulk resize",
      "All formats (WebP, AVIF)",
      "No watermark",
      "Fast processing",
    ],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Business",
    monthlyPrice: "$29",
    yearlyPrice: "$23",
    description: "Built for scaling teams",
    features: [
      "Everything in Pro",
      "API access",
      "Team accounts",
      "Priority support",
      "Cloud storage",
    ],
    cta: "Start Business Plan",
    featured: false,
  },
] as const;

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes. You can cancel your Pro or Business plan anytime from billing settings.",
  },
  {
    question: "Do you support bulk upload?",
    answer: "Yes. Pro and Business include batch upload and bulk resizing workflows.",
  },
  {
    question: "Is there API documentation?",
    answer: "Business users get full API docs, keys, and quick-start examples.",
  },
] as const;

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const isYearly = billingCycle === "yearly";
  const billingPeriodLabel = isYearly ? "/ month, billed yearly" : "/ month";

  const visiblePlans = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        price: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
      })),
    [isYearly],
  );

  return (
    <main className="landing">
      <LandingHeader />
      <section className="pricing-hero content-page">
        <p className="image-resizer-section-title">Pricing</p>
        <h1 className="content-page-title">Simple, Fast Image Resizing - Choose Your Plan</h1>
        <p className="content-page-subtitle">Resize, compress, and optimize images in seconds.</p>
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={`billing-toggle-btn${billingCycle === "monthly" ? " active" : ""}`}
            aria-pressed={billingCycle === "monthly"}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`billing-toggle-btn${billingCycle === "yearly" ? " active" : ""}`}
            aria-pressed={billingCycle === "yearly"}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly
          </button>
          <span className="billing-badge">Save 20%</span>
        </div>
      </section>

      <section className="pricing-grid" aria-label="Pricing plans">
        {visiblePlans.map((plan) => (
          <article
            key={plan.name}
            className={`pricing-card${plan.featured ? " pricing-card-featured" : ""}`}
            aria-label={`${plan.name} plan`}
          >
            {plan.featured ? <p className="pricing-popular-badge">Most Popular</p> : null}
            <p className="pricing-plan-name">{plan.name}</p>
            <p className="pricing-plan-price">
              {plan.price}
              <span>{billingPeriodLabel}</span>
            </p>
            <p className="pricing-plan-desc">{plan.description}</p>
            <ul className="pricing-feature-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button type="button" className={`pricing-cta${plan.featured ? " featured" : ""}`}>
              {plan.cta}
            </button>
          </article>
        ))}
      </section>

      <section className="content-page">
        <p className="image-resizer-section-title">Comparison</p>
        <h2 className="content-page-title">Feature comparison</h2>
        <div className="pricing-table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Business</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Daily Limit</td>
                <td>20/day</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Bulk Resize</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>API Access</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Watermark</td>
                <td>Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-page">
        <p className="image-resizer-section-title">Use Cases</p>
        <h2 className="content-page-title">Built for every workflow</h2>
        <div className="use-case-grid">
          <article className="use-case-card">
            <p className="use-case-icon" aria-hidden="true">
              👨‍💻
            </p>
            <h3>Developers</h3>
            <p>Integrate API-powered image resizing directly into your app and pipelines.</p>
          </article>
          <article className="use-case-card">
            <p className="use-case-icon" aria-hidden="true">
              🧑‍🎨
            </p>
            <h3>Designers</h3>
            <p>Batch edit design exports and optimize assets before handoff.</p>
          </article>
          <article className="use-case-card">
            <p className="use-case-icon" aria-hidden="true">
              🛒
            </p>
            <h3>E-commerce</h3>
            <p>Prepare product images faster for storefronts, ads, and marketplaces.</p>
          </article>
        </div>
      </section>

      <section className="content-page">
        <p className="image-resizer-section-title">Testimonials</p>
        <h2 className="content-page-title">Loved by teams and creators</h2>
        <blockquote className="testimonial-card">
          <p className="testimonial-stars">★★★★★</p>
          <p className="testimonial-quote">Saved hours of work resizing product images!</p>
          <cite className="testimonial-author">- Product Manager, Retail Team</cite>
        </blockquote>
      </section>

      <section className="content-page">
        <p className="image-resizer-section-title">FAQ</p>
        <h2 className="content-page-title">Frequently asked questions</h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pricing-final-cta">
        <h2>Start resizing images faster today</h2>
        <p>Launch free in seconds and upgrade only when your workflow grows.</p>
        <Link href="/" className="pricing-cta featured">
          Start Free Now
        </Link>
      </section>
      <LandingFooter />
    </main>
  );
}
