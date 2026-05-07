export default function RootLoading() {
  return (
    <main className="landing" aria-busy="true" aria-live="polite">
      <section className="content-page">
        <p className="image-resizer-section-title">Loading</p>
        <h1 className="content-page-title">Preparing page...</h1>
        <p className="content-page-subtitle">Please wait a moment.</p>
      </section>
    </main>
  );
}
