import { processTerm, queryTerms } from "@/lib/search-normalize";

export function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return text;
  const terms = queryTerms(query);
  if (terms.includes("d406")) terms.push("saf");
  if (terms.includes("efactura")) terms.push("factura");
  return text.split(/([\p{L}\p{N}]+)/gu).map((part, index) => {
    const canonical = processTerm(part);
    const match =
      canonical &&
      terms.some(
        (term) =>
          canonical === term ||
          (term.length >= 3 && canonical.startsWith(term)),
      );
    return match ? <mark key={index}>{part}</mark> : part;
  });
}
