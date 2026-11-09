import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { officialForms } from "@/data/forms";
import { FormCard } from "./form-card";
import { FormsVerification } from "./form-instructions";

const featuredForms = officialForms.filter((form) =>
  ["anaf-d100", "onrc-anexa-2a"].includes(form.id),
);

export function FormsSection() {
  return (
    <section
      id="formulare"
      className="forms-section container"
      aria-labelledby="forms-title"
    >
      <div className="section-heading forms-heading">
        <div>
          <p className="section-intro">Documentele de care ai nevoie.</p>
          <h2 id="forms-title">Formulare oficiale</h2>
          <p className="forms-description">
            Declarații fiscale și formulare pentru Registrul Comerțului,
            într-un singur loc. Descarcă PDF-ul completabil și consultă
            instrucțiunile instituției emitente.
          </p>
        </div>
        <span className="forms-count">
          <FileCheck2 size={16} aria-hidden="true" />
          {officialForms.length} PDF-uri completabile
        </span>
      </div>

      <ul className="forms-grid">
        {featuredForms.map((form) => (
          <li key={form.id}>
            <FormCard form={form} />
          </li>
        ))}
      </ul>
      <div className="forms-preview-footer">
        <Link className="button" href="/formulare">
          Vezi toate formularele <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <p>Descarcă PDF-ul și completează-l în Adobe Acrobat Reader desktop.</p>
      </div>
      <FormsVerification />
    </section>
  );
}
