import { ArrowUpRight, Download, FileDown } from "lucide-react";
import type { FormSearchHit } from "@/lib/form-search";
import { formSearchLabel } from "@/lib/form-display";
import { Highlight } from "./highlight";

export function FormSearchResults({ hits, query }: { hits: FormSearchHit[]; query: string }) {
  if (!hits.length) return null;
  return (
    <section className="form-search-results" aria-labelledby="form-results-title">
      <div className="form-results-heading">
        <h2 id="form-results-title"><FileDown size={19} aria-hidden="true" />Formulare oficiale</h2>
        <span role="status">{hits.length} {hits.length === 1 ? "formular găsit" : "formulare găsite"}</span>
      </div>
      <p className="form-results-help">
        Descarcă și completează în Adobe Acrobat Reader desktop.
        {hits.some(({ form }) => form.references.includes("D710"))
          ? " Pentru D710 selectează modul D710 în programul comun D100/D710."
          : null}
      </p>
      <ul className="form-results-list">
        {hits.map(({ form }) => (
          <li key={form.id}>
            <article className="form-result" data-form-result={form.id}>
              <div className="form-card-top">
                <span className="form-code"><Highlight text={formSearchLabel(form)} query={query} /></span>
                <span className="form-institution">{form.institution} · PDF completabil</span>
              </div>
              <h3>
                <a href={form.filePath} download={form.downloadName} title={form.applicability}>
                  <Highlight text={form.title} query={query} />
                </a>
              </h3>
              <p className="form-result-description"><Highlight text={form.description} query={query} /></p>
              <p className="form-applicability">{form.applicability}</p>
              <div className="form-actions">
                <a className="form-download" href={form.filePath} download={form.downloadName}
                  aria-label={"Descarcă PDF completabil: " + formSearchLabel(form)}>
                  <Download size={15} aria-hidden="true" />Descarcă PDF
                </a>
                <a className="form-source" href={form.sourcePage} target="_blank" rel="noopener noreferrer">
                  Pagina {form.institution}<ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
