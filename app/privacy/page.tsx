import type { Metadata } from "next";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Privacy Policy | ImageResizer",
  description:
    "Read how ImageResizer protects your privacy with local-first, in-browser image processing, minimal data collection, and clear data rights for every user.",
};

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-information", title: "3. How We Use Information" },
  { id: "local-first-processing", title: "4. Local-First Image Processing" },
  { id: "cookies", title: "5. Cookies and Local Storage" },
  { id: "third-party", title: "6. Third-Party Services" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "your-rights", title: "8. Your Rights" },
  { id: "children", title: "9. Children's Privacy" },
  { id: "changes", title: "10. Changes to This Policy" },
  { id: "contact", title: "11. Contact" },
];

const lastUpdated = "May 7, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="landing">
      <LandingHeader />

      <section className="content-page features-hero">
        <p className="image-resizer-section-title">Legal</p>
        <h1 className="content-page-title">Privacy Policy</h1>
        <p className="content-page-subtitle">
          We built ImageResizer to be a privacy-first tool. This policy explains exactly what we collect, how we use it,
          and the rights you have over your data.
        </p>
        <p className="content-page-subtitle" style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
          Last updated: {lastUpdated}
        </p>
        <nav className="features-hero-actions" aria-label="Quick links">
          <Link href="#information-we-collect" className="pricing-cta">
            What we collect
          </Link>
          <Link href="#your-rights" className="pricing-cta">
            Your rights
          </Link>
          <Link href="#contact" className="pricing-cta featured">
            Contact us
          </Link>
        </nav>
      </section>

      <section className="content-page" aria-label="Table of contents">
        <p className="image-resizer-section-title">On this page</p>
        <h2 className="content-page-title">Contents</h2>
        <ul className="feature-3d-list">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-page" aria-label="Privacy policy details">
        <article className="legal-article">
          <h2 id="introduction">1. Introduction</h2>
          <p>
            ImageResizer (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a browser-based image optimization tool.
            We are committed to protecting your privacy and being transparent about how the service works. By using
            ImageResizer, you agree to the practices described in this policy.
          </p>

          <h2 id="information-we-collect" style={{ marginTop: "1.5rem" }}>
            2. Information We Collect
          </h2>
          <p>We collect only what is necessary to operate the service. This may include:</p>
          <ul>
            <li>
              <strong>Account information</strong> (email, hashed password) when you sign up for a paid plan.
            </li>
            <li>
              <strong>Billing information</strong> processed by our payment provider; we never store full card numbers
              on our servers.
            </li>
            <li>
              <strong>Usage analytics</strong> such as page views, feature usage, and error reports — collected in
              aggregate and never tied to images you upload.
            </li>
            <li>
              <strong>Device data</strong> such as browser type and screen size, used to render the app correctly.
            </li>
          </ul>

          <h2 id="how-we-use-information" style={{ marginTop: "1.5rem" }}>
            3. How We Use Information
          </h2>
          <p>We use the limited information we collect to:</p>
          <ul>
            <li>Operate, maintain, and improve the service.</li>
            <li>Authenticate paid accounts and process subscription payments.</li>
            <li>Detect and prevent abuse, fraud, and security incidents.</li>
            <li>Communicate important service updates (you can opt out of marketing email anytime).</li>
          </ul>

          <h2 id="local-first-processing" style={{ marginTop: "1.5rem" }}>
            4. Local-First Image Processing
          </h2>
          <p>
            Images you process with ImageResizer are read, resized, and exported entirely inside your browser using
            client-side canvas APIs. They are <strong>never uploaded</strong> to our servers, never stored on our
            infrastructure, and never analyzed by us. EXIF and GPS metadata are stripped on export by default.
          </p>

          <h2 id="cookies" style={{ marginTop: "1.5rem" }}>
            5. Cookies and Local Storage
          </h2>
          <p>We use a small set of cookies and local storage entries to:</p>
          <ul>
            <li>Remember your theme preference (light / dark).</li>
            <li>Keep you signed in if you have a paid account.</li>
            <li>Measure aggregate, privacy-respecting usage analytics.</li>
          </ul>
          <p>You can clear or block these via your browser settings at any time.</p>

          <h2 id="third-party" style={{ marginTop: "1.5rem" }}>
            6. Third-Party Services
          </h2>
          <p>
            We work with a small number of vetted providers — for example, a payment processor, an email delivery
            service, and a privacy-respecting analytics tool. These providers receive only the minimum data needed to
            perform their function and are bound by data processing agreements.
          </p>

          <h2 id="data-retention" style={{ marginTop: "1.5rem" }}>
            7. Data Retention
          </h2>
          <p>
            We retain account information for as long as your account is active. If you delete your account, we remove
            personally identifiable information within 30 days, except where we are legally required to retain it (e.g.
            for tax records).
          </p>

          <h2 id="your-rights" style={{ marginTop: "1.5rem" }}>
            8. Your Rights
          </h2>
          <p>Depending on your jurisdiction (such as the EU/UK GDPR or California CCPA), you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate data or complete incomplete data.</li>
            <li>Delete your account and associated personal data.</li>
            <li>Export a copy of your data in a portable format.</li>
            <li>Object to or restrict certain types of processing.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <a href="mailto:privacy@imageresizer.app">privacy@imageresizer.app</a>.
          </p>

          <h2 id="children" style={{ marginTop: "1.5rem" }}>
            9. Children&apos;s Privacy
          </h2>
          <p>
            ImageResizer is not directed to children under 13. We do not knowingly collect personal information from
            children. If you believe a child has provided us with personal data, please contact us so we can remove it.
          </p>

          <h2 id="changes" style={{ marginTop: "1.5rem" }}>
            10. Changes to This Policy
          </h2>
          <p>
            We may update this policy from time to time. When we make material changes we will update the &quot;Last
            updated&quot; date at the top of this page and, where appropriate, notify you in the app or by email.
          </p>

          <h2 id="contact" style={{ marginTop: "1.5rem" }}>
            11. Contact
          </h2>
          <p>
            Questions about this privacy policy? Email <a href="mailto:privacy@imageresizer.app">privacy@imageresizer.app</a>
            {" "}or use the contact link in our footer.
          </p>
        </article>
      </section>

      <section className="pricing-final-cta">
        <h2>Privacy you can verify, performance you can feel</h2>
        <p>Try the workspace and watch your images stay safely on your device.</p>
        <Link href="/#workspace" className="pricing-cta featured">
          Open the Workspace
        </Link>
      </section>

      <LandingFooter />
    </main>
  );
}
