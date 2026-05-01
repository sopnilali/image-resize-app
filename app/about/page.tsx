import type { Metadata } from "next";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "About ImageResizer: Fast, Private and Reliable Image Optimization Team",
  description:
    "Learn how ImageResizer helps creators, developers, and businesses resize, compress, and optimize images quickly with a private browser-based workflow, modern performance, and practical export options.",
};

export default function AboutPage() {
  return (
    <main className="landing">
      <LandingHeader />
      <section className="content-page">
        <p className="image-resizer-section-title">About</p>
        <h1 className="content-page-title">Built for fast, high-quality image workflows</h1>
        <p className="content-page-subtitle">
          ImageResizer is designed to help teams and solo creators prepare assets quickly without sacrificing quality.
        </p>
      </section>
      <LandingFooter />
    </main>
  );
}
