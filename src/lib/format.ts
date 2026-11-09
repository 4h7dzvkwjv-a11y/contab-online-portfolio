export function formatDate(value: string, long = false) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: long ? "long" : "short",
    year: "numeric",
    timeZone: "Europe/Bucharest",
  }).format(new Date(value + "T12:00:00Z"));
}

export function headingId(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

export { SITE_URL } from "./site";
