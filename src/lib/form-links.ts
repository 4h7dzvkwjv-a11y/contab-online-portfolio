import { officialForms } from "@/data/forms";
import { articleFormDestinations, type OfficialFormDestination } from "@/data/form-reference-destinations";

const destinations: readonly OfficialFormDestination[] = [...officialForms, ...articleFormDestinations];

function referenceKey(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "").toUpperCase();
}

const byReference = new Map(
  destinations.flatMap((form) => form.references.map((reference) =>
    [referenceKey(reference), form] as const)),
);
const byFile = new Map(destinations.map((form) => [form.filePath, form]));
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const alternatives = destinations.flatMap((form) => form.references)
  .sort((a, b) => b.length - a.length)
  .map((reference) => /^[A-Z]\d{2,4}$/.test(reference)
    ? `${reference[0]}\\s*[-–]?\\s*${reference.slice(1)}`
    : reference.split(/\s+/).map(escapeRegex).join("\\s+"));
const referencePattern = `(?<![\\p{L}\\p{N}_])(?:${alternatives.join("|")})(?![\\p{L}\\p{N}_])`;

export interface FormTextPart {
  text: string;
  form?: OfficialFormDestination;
}

export function splitFormReferences(text: string): FormTextPart[] {
  const parts: FormTextPart[] = [];
  let offset = 0;
  for (const match of text.matchAll(new RegExp(referencePattern, "giu"))) {
    if (match.index > offset) parts.push({ text: text.slice(offset, match.index) });
    parts.push({ text: match[0], form: byReference.get(referenceKey(match[0])) });
    offset = match.index + match[0].length;
  }
  if (offset < text.length) parts.push({ text: text.slice(offset) });
  return parts.length ? parts : [{ text }];
}

export function formForFile(href?: string) {
  return href ? byFile.get(href) : undefined;
}

export function formActionLabel(form: OfficialFormDestination) {
  return form.resourceType === "document" ? "deschide modelul și instrucțiunile oficiale"
    : form.resourceType === "application" ? "deschide aplicația oficială"
    : form.resourceType === "program" ? "deschide programul oficial"
    : "descarcă PDF completabil";
}

export function formDownloadTitle(form: OfficialFormDestination, label = form.code) {
  if (form.resourceType === "document") {
    return `${label} — modelul și instrucțiunile oficiale. ${form.applicability}`;
  }
  if (form.resourceType === "application" || form.resourceType === "program") {
    return `${label} — ${formActionLabel(form)}. ${form.applicability}`;
  }
  const extra = referenceKey(label) === "D710"
    ? " Selectează D710 în programul comun D100/D710."
    : "";
  return `Descarcă ${label} — PDF completabil. ${form.applicability}${extra} Deschide în Adobe Acrobat Reader desktop.`;
}

export function nodeText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("children" in node && Array.isArray(node.children)) return node.children.map(nodeText).join("");
  return "";
}
