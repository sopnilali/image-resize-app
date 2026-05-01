"use client";

import dynamic from "next/dynamic";

const ImageResizer = dynamic(
  () => import("@/components/image-resizer").then((mod) => mod.ImageResizer),
  {
    ssr: false,
    loading: () => <div className="card">Loading workspace...</div>,
  },
);

export function LandingWorkspace() {
  return (
    <section className="landing-workspace" id="workspace">
      <p className="image-resizer-section-title">Workspace</p>
      <div className="resizer-card">
        <ImageResizer />
      </div>
    </section>
  );
}
