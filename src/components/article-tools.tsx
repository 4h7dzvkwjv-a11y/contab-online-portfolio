"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Printer } from "lucide-react";

export function ArticleTools() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Link copiat.");
    } catch {
      setStatus("Copiază adresa din bara browserului.");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 3500);
  }
  return (
    <div className="share-tools">
      <span>Distribuie</span>
      <button
        type="button"
        className="icon-button"
        onClick={copyLink}
        aria-label="Copiază linkul articolului"
        title="Copiază linkul"
      >
        {status === "Link copiat." ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <button
        type="button"
        className="icon-button"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/sharing/share-offsite/?url=" +
              encodeURIComponent(window.location.href),
            "_blank",
            "noopener,noreferrer",
          )
        }
        aria-label="Distribuie pe LinkedIn"
        title="Distribuie pe LinkedIn"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9.1H7V21H3.4V9.1Zm6 0h3.5v1.6h.1c.5-.9 1.6-1.9 3.5-1.9 3.8 0 4.5 2.4 4.5 5.5V21h-3.7v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6H9.4V9.1Z" />
        </svg>
      </button>
      <button
        type="button"
        className="icon-button"
        onClick={() => window.print()}
        aria-label="Tipărește articolul"
        title="Tipărește articolul"
      >
        <Printer size={14} />
      </button>
      <span className="share-status" role="status">
        {status}
      </span>
    </div>
  );
}

export function ArticleNavigation({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const body = document.getElementById("article-body");
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight + 180);
      setProgress(Math.min(1, Math.max(0, (120 - rect.top) / distance)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        className="reading-progress"
        style={{ transform: "scaleX(" + progress + ")" }}
        aria-hidden="true"
      />
      <aside className="toc" aria-label="Cuprins">
        <h2>În acest articol</h2>
        <ol>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={"#" + heading.id}
                aria-current={active === heading.id ? "location" : undefined}
                onClick={() => setActive(heading.id)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
        <p className="toc-bottom">Citește. Verifică. Aplică.</p>
      </aside>
    </>
  );
}
