import { ArrowUpRight, Download } from "lucide-react";
import type { OfficialForm } from "@/data/forms";
import { formSearchLabel } from "@/lib/form-display";
import { Highlight } from "./highlight";

export function FormCard({ form, query = "" }: { form: OfficialForm; query?: string }) {
  return (
    <article className="form-card" aria-labelledby={"form-" + form.id} data-form-id={form.id}>
      <div className="form-card-top">
        <span className="form-code"><Highlight text={formSearchLabel(form)} query={query} /></span>
        <span className="form-institution">{form.institution}</span>
      </div>
      <h3 id={"form-" + form.id}><Highlight text={form.title} query={query} /></h3>
      <p className="form-description"><Highlight text={form.description} query={query} /></p>
      <p className="form-applicability">{form.applicability}</p>
      <div className="form-actions">
        <a
          className="form-download"
          href={form.filePath}
          download={form.downloadName}
          aria-label={"Descarcă PDF completabil: " + formSearchLabel(form) + " — " + form.title}
        >
          <Download size={16} aria-hidden="true" />
          Descarcă PDF
        </a>
        <a
          className="form-source"
          href={form.sourcePage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={"Pagina oficială " + form.institution + ": " + formSearchLabel(form)}
        >
          Pagina oficială <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
      <p className="form-file-meta">
        {form.format === "xfa" ? "PDF inteligent ANAF" : "PDF cu câmpuri completabile"}
        <span aria-hidden="true"> · </span>
        {Math.ceil(form.bytes / 1024).toLocaleString("ro-RO")} KB
      </p>
    </article>
  );
}
