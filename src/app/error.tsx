"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="container not-found">
      <p>Ceva nu a funcționat</p>
      <h1>Pagina nu s-a încărcat complet.</h1>
      <p>Încearcă din nou. Dacă problema continuă, revino la prima pagină.</p>
      <button className="button button-primary" type="button" onClick={reset}>
        Reîncearcă
      </button>
    </main>
  );
}
