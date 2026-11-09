export const categories = [
  {
    slug: "contabilitate",
    name: "Contabilitate",
    shortName: "Contabilitate",
    description: "Monografii, înregistrări și plan de conturi.",
    icon: "book",
    color: "blue",
  },
  {
    slug: "fiscalitate",
    name: "Fiscalitate",
    shortName: "Fiscalitate",
    description: "TVA, impozite și cheltuieli deductibile.",
    icon: "percent",
    color: "teal",
  },
  {
    slug: "declaratii",
    name: "Declarații și raportări",
    shortName: "Declarații",
    description: "SAF-T, e-Factura și obligații declarative.",
    icon: "file",
    color: "violet",
  },
  {
    slug: "salarizare",
    name: "Salarizare",
    shortName: "Salarizare",
    description: "Salarii, contribuții și relații de muncă.",
    icon: "users",
    color: "amber",
  },
  {
    slug: "antreprenoriat",
    name: "Antreprenoriat",
    shortName: "Antreprenoriat",
    description: "Decizii informate pentru afacerea ta.",
    icon: "briefcase",
    color: "rose",
  },
  {
    slug: "ghiduri",
    name: "Ghiduri practice",
    shortName: "Ghiduri practice",
    description: "Pași clari pentru situații concrete.",
    icon: "compass",
    color: "slate",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
export type ArticleType = "ghid" | "monografie" | "noutate";
export const articleTypes: Record<ArticleType, string> = {
  ghid: "Ghid practic",
  monografie: "Monografie",
  noutate: "Noutate legislativă",
};
export const getCategory = (slug: string) =>
  categories.find((item) => item.slug === slug);
