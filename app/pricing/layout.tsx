import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer Pricing Plans for Free, Pro and Business Workflows",
  description:
    "Compare ImageResizer plans and choose the best option for your workflow, from a free starter tier to Pro and Business packages with bulk resizing, API access, priority support, and scalable image processing.",
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
