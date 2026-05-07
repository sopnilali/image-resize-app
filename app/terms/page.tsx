import type { Metadata } from "next";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Terms of Service | ImageResizer",
  description:
    "Read the ImageResizer Terms of Service: account rules, billing, acceptable use, intellectual property, and the limits of our service so you know exactly what to expect.",
};

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "service", title: "2. Description of Service" },
  { id: "accounts", title: "3. Account Registration" },
  { id: "billing", title: "4. Subscriptions and Billing" },
  { id: "acceptable-use", title: "5. Acceptable Use" },
  { id: "ip", title: "6. Intellectual Property" },
  { id: "user-content", title: "7. User Content & Image Ownership" },
  { id: "prohibited", title: "8. Prohibited Uses" },
  { id: "termination", title: "9. Termination" },
  { id: "disclaimer", title: "10. Disclaimer of Warranties" },
  { id: "liability", title: "11. Limitation of Liability" },
  { id: "law", title: "12. Governing Law" },
  { id: "changes", title: "13. Changes to Terms" },
  { id: "contact", title: "14. Contact" },
];

const lastUpdated = "May 7, 2026";

export default function TermsOfServicePage() {
  return (
    <main className="landing">
      <LandingHeader />

      <section className="content-page features-hero">
        <p className="image-resizer-section-title">Legal</p>
        <h1 className="content-page-title">Terms of Service</h1>
        <p className="content-page-subtitle">
          These terms govern your use of ImageResizer. We&apos;ve kept them clear and reasonable — please read carefully
          before using the service.
        </p>
        <p className="content-page-subtitle" style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
          Last updated: {lastUpdated}
        </p>
        <nav className="features-hero-actions" aria-label="Quick links">
          <Link href="#acceptable-use" className="pricing-cta">
            Acceptable use
          </Link>
          <Link href="#billing" className="pricing-cta">
            Billing
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

      <section className="content-page" aria-label="Terms of service details">
        <article className="legal-article">
          <h2 id="acceptance">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ImageResizer (the &quot;Service&quot;), you agree to be bound by these Terms of
            Service. If you do not agree, you may not use the Service.
          </p>

          <h2 id="service" style={{ marginTop: "1.5rem" }}>
            2. Description of Service
          </h2>
          <p>
            ImageResizer provides browser-based tools to resize, convert, compress, and otherwise optimize images. Image
            processing happens on your device; we do not upload or store your images on our servers.
          </p>

          <h2 id="accounts" style={{ marginTop: "1.5rem" }}>
            3. Account Registration
          </h2>
          <p>
            Some features (such as paid plans) require an account. You agree to provide accurate information, keep your
            credentials secure, and accept responsibility for activity under your account.
          </p>

          <h2 id="billing" style={{ marginTop: "1.5rem" }}>
            4. Subscriptions and Billing
          </h2>
          <ul>
            <li>Paid plans are billed in advance on a monthly or yearly cycle.</li>
            <li>Subscriptions auto-renew until cancelled from your billing settings.</li>
            <li>Refunds are issued on a case-by-case basis in line with consumer protection laws.</li>
            <li>Taxes may apply based on your billing address.</li>
          </ul>

          <h2 id="acceptable-use" style={{ marginTop: "1.5rem" }}>
            5. Acceptable Use
          </h2>
          <p>You agree to use the Service only for lawful purposes and in a way that does not:</p>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe the intellectual property or privacy rights of others.</li>
            <li>Disrupt, damage, or attempt to gain unauthorized access to the Service or its infrastructure.</li>
            <li>Misrepresent your identity or affiliation with any person or organization.</li>
          </ul>

          <h2 id="ip" style={{ marginTop: "1.5rem" }}>
            6. Intellectual Property
          </h2>
          <p>
            The Service, including its branding, design, code, and documentation, is owned by ImageResizer and
            protected by intellectual property laws. You may not copy, modify, or redistribute it except as expressly
            permitted.
          </p>

          <h2 id="user-content" style={{ marginTop: "1.5rem" }}>
            7. User Content & Image Ownership
          </h2>
          <p>
            You retain all rights to the images you process with ImageResizer. Because images are processed locally,
            we do not receive a copy and we claim no rights to them. You are responsible for ensuring you have the right
            to process any image you use with the Service.
          </p>

          <h2 id="prohibited" style={{ marginTop: "1.5rem" }}>
            8. Prohibited Uses
          </h2>
          <p>You may not use ImageResizer to process or distribute content that:</p>
          <ul>
            <li>Is illegal under applicable law.</li>
            <li>Depicts the sexual exploitation of minors.</li>
            <li>Promotes violence, terrorism, or hate against protected groups.</li>
            <li>Infringes copyrights or trademarks you do not own or have permission to use.</li>
          </ul>

          <h2 id="termination" style={{ marginTop: "1.5rem" }}>
            9. Termination
          </h2>
          <p>
            We may suspend or terminate access to the Service at any time if we reasonably believe you have violated
            these terms. You may cancel your account at any time from your account settings; cancellation stops future
            renewals.
          </p>

          <h2 id="disclaimer" style={{ marginTop: "1.5rem" }}>
            10. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong>{" "}
            without warranties of any kind, whether express or implied. We do not warrant that the Service will be
            uninterrupted, error-free, or fit for any particular purpose.
          </p>

          <h2 id="liability" style={{ marginTop: "1.5rem" }}>
            11. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, ImageResizer and its team will not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits, data, or images, arising
            from your use of the Service.
          </p>

          <h2 id="law" style={{ marginTop: "1.5rem" }}>
            12. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which ImageResizer is established, without
            regard to its conflict-of-laws principles. Disputes will be handled in the competent courts of that
            jurisdiction unless local consumer law requires otherwise.
          </p>

          <h2 id="changes" style={{ marginTop: "1.5rem" }}>
            13. Changes to Terms
          </h2>
          <p>
            We may update these terms occasionally. When we make material changes we will update the &quot;Last
            updated&quot; date at the top of this page and, where appropriate, notify you in the app or by email.
            Continued use after changes constitutes acceptance of the updated terms.
          </p>

          <h2 id="contact" style={{ marginTop: "1.5rem" }}>
            14. Contact
          </h2>
          <p>
            Questions about these terms? Email <a href="mailto:legal@imageresizer.app">legal@imageresizer.app</a>{" "}
            or use the contact link in our footer.
          </p>
        </article>
      </section>

      <section className="pricing-final-cta">
        <h2>Ready to use ImageResizer?</h2>
        <p>Open the workspace and start optimizing your images right in your browser.</p>
        <Link href="/#workspace" className="pricing-cta featured">
          Open the Workspace
        </Link>
      </section>

      <LandingFooter />
    </main>
  );
}
