export default function Loading() {
  return (
    <main id="main-content" className="container library-page" aria-busy="true">
      <div className="page-heading">
        <div className="skeleton-line skeleton-short" />
        <div className="skeleton-line skeleton-heading" />
        <div className="skeleton-line skeleton-medium" />
      </div>
      <div className="article-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-line skeleton-short" />
            <div className="skeleton-line skeleton-heading" />
            <div className="skeleton-line" />
          </div>
        ))}
      </div>
      <span role="status" className="sr-only">
        Se încarcă pagina…
      </span>
    </main>
  );
}
