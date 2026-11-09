"use client";

import Link from "next/link";
import { Fragment, Suspense, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  RotateCcw,
  SearchX,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { type ArticleSummary } from "@/data/articles";
import {
  articleTypes,
  categories,
  getCategory,
  type ArticleType,
} from "@/data/categories";
import { formatDate } from "@/lib/format";
import { getSearchProvider } from "@/lib/search-provider";
import type { SearchHit } from "@/lib/search";
import type { FormSearchHit } from "@/lib/form-search";
import { ArticleCard } from "./article-card";
import { Highlight } from "./highlight";
import { FormSearchResults } from "./form-search-results";

export function ArticleExplorer({
  articles,
  lockedCategory,
  search = false,
}: {
  articles: ArticleSummary[];
  lockedCategory?: string;
  search?: boolean;
}) {
  const [paramsString, setParamsString] = useState<string | null>(null);
  const params = useMemo(()=>new URLSearchParams(paramsString ?? ""),[paramsString]);
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const query = search ? (params.get("q") ?? "").slice(0, 200) : "";
  const categoryValue = lockedCategory || params.get("categorie") || "";
  const category = getCategory(categoryValue) ? categoryValue : "";
  const years = [
    ...new Set(articles.map((article) => article.publishedAt.slice(0, 4))),
  ]
    .sort()
    .reverse();
  const yearValue = params.get("an") ?? "";
  const year = years.includes(yearValue) ? yearValue : "";
  const typeValue = params.get("tip") ?? "";
  const type = Object.hasOwn(articleTypes, typeValue)
    ? (typeValue as ArticleType)
    : "";
  const orderValue = params.get("ordine");
  const order =
    orderValue === "vechi"
      ? "vechi"
      : orderValue === "recente"
        ? "recente"
        : query
          ? "relevanta"
          : "recente";
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [formHits, setFormHits] = useState<FormSearchHit[]>([]);
  const [completedQuery, setCompletedQuery] = useState("");
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    if (!query) return;
    let current = true;
    setHits(null);
    setFormHits([]);
    setSearchError(false);
    getSearchProvider()
      .then((provider) => Promise.all([provider.search(query), provider.searchForms(query)]))
      .then(([results, forms]) => {
        if (current) {
          setHits(results);
          setFormHits(forms);
          setCompletedQuery(query);
        }
      })
      .catch(() => {
        if (current) {
          setSearchError(true);
          setHits([]);
          setCompletedQuery(query);
        }
      });
    return () => {
      current = false;
    };
  }, [query]);

  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    if (!Object.hasOwn(values, "pagina")) next.delete("pagina");
    for (const [key, value] of Object.entries(values))
      value ? next.set(key, value) : next.delete(key);
    let targetPath = pathname;
    if (lockedCategory && Object.hasOwn(values, "categorie")) {
      targetPath = values.categorie
        ? "/categorii/" + values.categorie
        : "/articole";
      next.delete("categorie");
    }
    startTransition(() =>
      router.push(targetPath + (next.size ? "?" + next.toString() : ""), {
        scroll: false,
      }),
    );
  }

  const base: SearchHit[] = query
    ? (hits ?? [])
    : articles.map((article) => ({ article, score: 0 }));
  const filtered = base.filter(
    ({ article }) =>
      (!category || article.category === category) &&
      (!year || article.publishedAt.startsWith(year)) &&
      (!type || article.type === type),
  );
  if (order !== "relevanta")
    filtered.sort((a, b) =>
      order === "vechi"
        ? a.article.publishedAt.localeCompare(b.article.publishedAt)
        : b.article.publishedAt.localeCompare(a.article.publishedAt),
    );
  const perPage = search ? 6 : 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const requestedPage = Number(params.get("pagina") ?? "1");
  const page = Math.min(
    pageCount,
    Math.max(1, Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1),
  );
  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  ).filter((value) =>
    pageCount <= 7 || value === 1 || value === pageCount ||
    Math.abs(value - page) <= 1 || (page <= 2 && value <= 3) ||
    (page >= pageCount - 1 && value >= pageCount - 2),
  );
  const visible = filtered.slice((page - 1) * perPage, page * perPage);
  const loading = (search && paramsString === null) || Boolean(query) && (hits === null || completedQuery !== query);
  const filterCount =
    Number(Boolean(category)) + Number(Boolean(year)) + Number(Boolean(type));

  return (
    <>
      <Suspense fallback={null}><SearchParamsSync onChange={setParamsString} /></Suspense>
      <div className="explorer">
        <button
          className="mobile-filter-button"
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="article-filters"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={17} />
          Filtre{filterCount ? <span>{filterCount}</span> : null}
        </button>
        <aside
          id="article-filters"
          className={"filter-panel" + (filtersOpen ? " is-open" : "")}
          aria-label="Filtre articole"
        >
          <div className="filter-heading">
            <h2>{search ? "Filtrează articolele" : "Filtrează"}</h2>
            {filterCount ? (
              <button
                type="button"
                onClick={() => update({ categorie: "", an: "", tip: "" })}
              >
                Resetează
              </button>
            ) : (
              <SlidersHorizontal size={16} aria-hidden="true" />
            )}
          </div>
          <fieldset className="filter-fieldset">
            <legend>Categorie</legend>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={!category}
                onChange={() => update({ categorie: "" })}
              />
              <span>Toate categoriile</span>
              <small>{base.length}</small>
            </label>
            {categories.map((item) => (
              <label className="filter-option" key={item.slug}>
                <input
                  type="radio"
                  name="category"
                  checked={category === item.slug}
                  onChange={() => update({ categorie: item.slug })}
                />
                <span>{item.shortName}</span>
                <small>
                  {
                    base.filter(({ article }) => article.category === item.slug)
                      .length
                  }
                </small>
              </label>
            ))}
          </fieldset>
          <div className="select-filter">
            <label htmlFor="filter-year">Anul publicării</label>
            <select
              id="filter-year"
              value={year}
              onChange={(event) => update({ an: event.target.value })}
            >
              <option value="">Toți anii</option>
              {years.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="select-filter">
            <label htmlFor="filter-type">Tipul articolului</label>
            <select
              id="filter-type"
              value={type}
              onChange={(event) => update({ tip: event.target.value })}
            >
              <option value="">Toate tipurile</option>
              {Object.entries(articleTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-note">
            <span className="small-note-line" />
            <p>
              Explicații clare.
              <br />
              Surse la îndemână.
            </p>
          </div>
        </aside>
        <div
          className={"explorer-main" + (pending ? " is-pending" : "")}
          aria-busy={pending || loading}
        >
          <div className="results-toolbar">
            <p role="status">
              {loading ? (
                "Se caută în bibliotecă…"
              ) : (
                <>
                  <strong>{filtered.length}</strong>{" "}
                  {filtered.length === 1 ? "articol" : "articole"}
                  {query ? (filtered.length === 1 ? " găsit" : " găsite") : ""}
                </>
              )}
            </p>
            <div className="sort-control">
              <label htmlFor="sort-order">Ordonează:</label>
              <select
                id="sort-order"
                aria-label="Ordonează articolele"
                value={order}
                onChange={(event) => update({ ordine: event.target.value })}
              >
                {query ? <option value="relevanta">Relevanță</option> : null}
                <option value="recente">Cele mai recente</option>
                <option value="vechi">Cele mai vechi</option>
              </select>
            </div>
          </div>
          {filterCount ? (
            <div className="active-filters" aria-label="Filtre active">
              {category ? (
                <button
                  type="button"
                  onClick={() => update({ categorie: "" })}
                  aria-label={"Elimină filtrul " + getCategory(category)?.name}
                >
                  {getCategory(category)?.shortName}
                  <X size={13} />
                </button>
              ) : null}
              {year ? (
                <button
                  type="button"
                  onClick={() => update({ an: "" })}
                  aria-label={"Elimină anul " + year}
                >
                  {year}
                  <X size={13} />
                </button>
              ) : null}
              {type ? (
                <button
                  type="button"
                  onClick={() => update({ tip: "" })}
                  aria-label={"Elimină tipul " + articleTypes[type]}
                >
                  {articleTypes[type]}
                  <X size={13} />
                </button>
              ) : null}
            </div>
          ) : null}
          {loading ? (
            <ArticleSkeleton count={search ? 3 : 4} list={search} />
          ) : searchError ? (
            <div className="empty-state" role="alert">
              <SearchX />
              <h2>Căutarea nu s-a încărcat</h2>
              <p>Reîncarcă pagina sau explorează biblioteca de articole.</p>
              <Link className="button button-primary" href="/articole">
                Deschide biblioteca <ArrowRight size={16} />
              </Link>
            </div>
          ) : !filtered.length ? (
            <div className="empty-state">
              <span className="empty-symbol">
                <SearchX size={30} strokeWidth={1.5} />
              </span>
              <h2>
                {query
                  ? formHits.length ? "Niciun articol pentru această căutare" : "Niciun răspuns pentru această căutare"
                  : "Niciun articol cu aceste filtre"}
              </h2>
              <p>
                {query
                  ? "Încearcă mai puțini termeni sau o formulare mai generală. De exemplu: TVA, stocuri sau D406."
                  : "Schimbă anul, categoria sau tipul articolului pentru a vedea alte resurse."}
              </p>
              {filterCount ? (
                <button
                  className="button button-primary"
                  onClick={() => update({ categorie: "", an: "", tip: "" })}
                >
                  <RotateCcw size={16} />
                  Resetează filtrele
                </button>
              ) : (
                <Link className="button button-primary" href="/articole">
                  Explorează toate articolele <ArrowRight size={16} />
                </Link>
              )}
            </div>
          ) : search ? (
            <div className="search-results">
              {visible.map((hit) => (
                <SearchResult key={hit.article.slug} hit={hit} query={query} />
              ))}
            </div>
          ) : (
            <div className="article-grid explorer-grid">
              {visible.map(({ article }) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  headingLevel={2}
                />
              ))}
            </div>
          )}
          {!loading && pageCount > 1 ? (
            <nav className="pagination" aria-label="Paginare articole">
              <button
                type="button"
                className="pagination-arrow"
                aria-label="Pagina anterioară"
                disabled={page === 1}
                onClick={() => update({ pagina: String(page - 1) })}
              >
                <ChevronLeft size={18} />
              </button>
              {pageNumbers.map((value, index) => (
                <Fragment key={value}>
                  {index > 0 && value - pageNumbers[index - 1] > 1 ? (
                    <span className="pagination-gap" aria-hidden="true">…</span>
                  ) : null}
                  <button
                    type="button"
                    aria-current={page === value ? "page" : undefined}
                    aria-label={"Pagina " + value}
                    onClick={() => update({ pagina: String(value) })}
                  >
                    {value}
                  </button>
                </Fragment>
              ))}
              <button
                type="button"
                className="pagination-arrow"
                aria-label="Pagina următoare"
                disabled={page === pageCount}
                onClick={() => update({ pagina: String(page + 1) })}
              >
                <ChevronRight size={18} />
              </button>
              <span>
                Pagina {page} din {pageCount}
              </span>
            </nav>
          ) : null}
          {search && query && !loading && !searchError ? (
            <FormSearchResults hits={formHits} query={query} />
          ) : null}
        </div>
      </div>
    </>
  );
}

// Numai sincronizarea query-ului depinde de browser; cardurile inițiale se redau în HTML.
function SearchParamsSync({onChange}: {onChange: (value:string)=>void}) {
  const params = useSearchParams();
  const value = params.toString();
  useEffect(()=>onChange(value),[value,onChange]);
  return null;
}

function SearchResult({ hit, query }: { hit: SearchHit; query: string }) {
  const { article, score, snippet } = hit;
  const category = getCategory(article.category)!;
  return (
    <article className="search-result">
      <div className="result-top">
        <Link
          className={"category-label text-" + category.color}
          href={"/categorii/" + category.slug}
        >
          {category.shortName}
        </Link>
        <span className="result-type">{articleTypes[article.type]}</span>
      </div>
      <h2>
        <Link href={"/articol/" + article.slug}>
          <Highlight text={article.title} query={query} />
        </Link>
      </h2>
      <p className="result-excerpt">
        <Highlight text={snippet ?? article.excerpt} query={query} />
      </p>
      <div className="result-meta">
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
        <span>
          <Clock3 size={13} aria-hidden="true" />
          {article.readingTime} min de citit
        </span>
        {query ? (
          <span
            className="relevance"
            title="Scor lexical al căutării; nu evaluează corectitudinea fiscală."
          >
            Scor relevanță: {score.toLocaleString("ro-RO")}
          </span>
        ) : null}
        <Link
          href={"/articol/" + article.slug}
          className="result-read"
          aria-label={"Citește: " + article.title}
        >
          Citește articolul <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function ArticleSkeleton({
  count = 4,
  list = false,
}: {
  count?: number;
  list?: boolean;
}) {
  return (
    <div
      className={list ? "search-results" : "article-grid explorer-grid"}
      role="status"
      aria-label="Se încarcă articolele"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className={"skeleton-card" + (list ? " skeleton-list" : "")}
          key={index}
        >
          <div className="skeleton-line skeleton-short" />
          <div className="skeleton-line skeleton-heading" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-medium" />
        </div>
      ))}
    </div>
  );
}
