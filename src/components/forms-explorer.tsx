"use client";

import { useRef, useState, type FormEvent } from "react";
import { Search, SearchX, X } from "lucide-react";
import { officialForms } from "@/data/forms";
import { searchForms } from "@/lib/form-search";
import { FormCard } from "./form-card";

export function FormsExplorer() {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const hasQuery = Boolean(query.trim());
  // Acest catalog caută direct în indexul formularelor, fără indexul articolelor.
  const visibleForms = hasQuery
    ? searchForms(query).map(({ form }) => form)
    : officialForms;

  function clear() {
    setQuery("");
    input.current?.focus();
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setQuery(query.trim());
  }

  return (
    <div className="forms-catalog">
      <form className="forms-search-form" role="search" aria-label="Căutare formulare" onSubmit={submit}>
        <Search className="forms-search-icon" size={23} strokeWidth={1.8} aria-hidden="true" />
        <label className="sr-only" htmlFor="forms-query">Caută formulare</label>
        <input
          ref={input}
          id="forms-query"
          type="search"
          name="formular"
          placeholder="Cod, denumire sau scop — D100, TVA, înființare SRL..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Escape") clear(); }}
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
          aria-controls="forms-results"
          aria-describedby="forms-search-help"
        />
        {query ? (
          <button className="forms-search-clear" type="button" aria-label="Șterge căutarea formularelor" onClick={clear}>
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
        <button className="forms-search-submit" type="submit">Caută</button>
      </form>
      <p id="forms-search-help" className="forms-search-help">
        Caută după cod, denumire, instituție sau ceea ce vrei să declari.
      </p>

      <section id="forms-results" className="forms-catalog-results" aria-labelledby="forms-results-title">
        <div className="forms-catalog-heading">
          <h2 id="forms-results-title">{hasQuery ? "Rezultatele căutării" : "Toate formularele"}</h2>
          <span role="status" aria-live="polite" aria-atomic="true">
            {visibleForms.length} {visibleForms.length === 1
              ? (hasQuery ? "formular găsit" : "formular disponibil")
              : (hasQuery ? "formulare găsite" : "formulare disponibile")}
          </span>
        </div>
        {visibleForms.length ? (
          <>
            <p className="form-results-help">Descarcă și completează în Adobe Acrobat Reader desktop.</p>
            {hasQuery && visibleForms.some((form) => form.references.includes("D710")) ? (
              <p className="form-results-help">Pentru D710 selectează modul D710 în programul comun D100/D710.</p>
            ) : null}
            <ul className="forms-grid">
              {visibleForms.map((form) => <li key={form.id}><FormCard form={form} query={query} /></li>)}
            </ul>
          </>
        ) : (
          <div className="empty-state forms-empty-state">
            <SearchX size={30} strokeWidth={1.5} aria-hidden="true" />
            <h3>Nu am găsit un formular pentru această căutare.</h3>
            <p>Încearcă un cod precum D100, o denumire precum decont TVA sau instituția ANAF ori ONRC.</p>
            <button className="button" type="button" onClick={clear}>Vezi toate formularele</button>
          </div>
        )}
      </section>
    </div>
  );
}
