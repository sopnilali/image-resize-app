import type { Metadata } from "next";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Advanced Image Resizer Features for Bulk, Format and Quality Control",
  description:
    "Explore powerful image optimization features including pixel and percentage resize modes, bulk processing, format conversion, quality tuning, and quick export tools designed for creators and business workflows.",
};

export default function FeaturesPage() {
  return (
    <main className="landing">
      <LandingHeader />
      <section className="content-page">
        <p className="image-resizer-section-title">Features</p>
        <h1 className="content-page-title">Everything you need to optimize images</h1>
        <p className="content-page-subtitle">
          Resize by pixels or percentage, convert formats, tune quality, and export results in one clean workflow.
        </p>
      </section>
      <LandingFooter />
    </main>
  );
}
