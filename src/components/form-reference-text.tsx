import { formActionLabel, formDownloadTitle, splitFormReferences } from "@/lib/form-links";

export function FormReferenceText({ text }: { text: string }) {
  return splitFormReferences(text).map((part, index) => part.form ? (
    <a
      key={index}
      href={part.form.filePath}
      download={part.form.downloadName}
      target={part.form.filePath.startsWith("http") ? "_blank" : undefined}
      rel={part.form.filePath.startsWith("http") ? "noopener noreferrer" : undefined}
      className="official-form-reference"
      data-official-form={part.form.id}
      title={formDownloadTitle(part.form, part.text)}
      aria-label={part.text + " — " + formActionLabel(part.form)}
    >
      {part.text}
    </a>
  ) : part.text);
}
