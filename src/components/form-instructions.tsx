import { FileCheck2, Info } from "lucide-react";
import { FORMS_REVIEWED_AT } from "@/data/forms";
import { formatDate } from "@/lib/format";

export function FormInstructions() {
  return (
    <div className="forms-instructions" role="note">
      <Info size={18} aria-hidden="true" />
      <p>
        <strong>Descarcă, apoi completează.</strong> Salvează fișierul pe
        dispozitiv și deschide-l în Adobe Acrobat Reader. Formularele
        inteligente ANAF au câmpuri și validări care necesită aplicația
        desktop. Alege versiunea pentru perioada raportată și urmează
        instrucțiunile emitentului pentru semnare și depunere.
      </p>
    </div>
  );
}

export function FormsVerification() {
  return (
    <p className="forms-verification">
      <FileCheck2 size={15} aria-hidden="true" />
      <span>
        Fișiere oficiale originale. Verificate la{" "}
        <time dateTime={FORMS_REVIEWED_AT}>{formatDate(FORMS_REVIEWED_AT, true)}</time>.
      </span>
    </p>
  );
}
