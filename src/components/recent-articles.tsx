"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { type ArticleSummary } from "@/data/articles";
import { categories } from "@/data/categories";
import { ArticleCard } from "./article-card";

export function RecentArticles({ articles }: { articles: ArticleSummary[] }) {
  const [category, setCategory] = useState("");
  const visible = articles
    .filter((article) => !category || article.category === category)
    .slice(0, 6);
  return (
    <section
      className="recent-section container"
      aria-labelledby="recent-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-intro">
            Contabilitate și fiscalitate în practică.
          </p>
          <h2 id="recent-title">Articole recente</h2>
        </div>
        <Link
          className="text-link"
          href={"/articole" + (category ? "?categorie=" + category : "")}
        >
          Vezi toate articolele <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <div
        className="category-tabs"
        role="group"
        aria-label="Filtrează articolele recente"
      >
        <button
          type="button"
          aria-pressed={!category}
          onClick={() => setCategory("")}
        >
          Toate articolele
        </button>
        {categories.slice(0, 4).map((item) => (
          <button
            type="button"
            key={item.slug}
            aria-pressed={category === item.slug}
            onClick={() => setCategory(item.slug)}
          >
            {item.shortName}
          </button>
        ))}
      </div>
      <div className="article-grid" key={category} aria-live="polite">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
