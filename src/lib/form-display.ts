import type { OfficialForm } from "@/data/forms";

export function formSearchLabel(form: OfficialForm) {
  return form.references.includes("D710") ? "D100 / D710" : form.code;
}
