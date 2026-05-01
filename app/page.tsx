import type { Metadata } from "next";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";
import { LandingHero } from "@/components/landing/hero";
import { LandingWorkspace } from "@/components/landing/workspace";

export const metadata: Metadata = {
  title: "Image Resizer, Compress and Optimize Images Online in Seconds",
  description:
    "Use a fast online image resizer to set exact width and height, keep aspect ratio, compress large images, and export in multiple formats including JPG, PNG, and WebP without installing software.",
};

export default function HomePage() {
  return (
    <main className="landing">
      <LandingHeader />
      <LandingHero />
      <LandingWorkspace />
      <LandingFooter />
    </main>
  );
}
