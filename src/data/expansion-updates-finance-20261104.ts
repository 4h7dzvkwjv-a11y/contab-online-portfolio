import type { ArticleDefinition } from "./articles";
import sfia from "./content/sfia-2026-procedura-omf-1128";
import optional from "./content/formular-081-efactura-optional-scoatere-2026";
import missing from "./content/d300-nedepus-impunere-oficiu-2026";

export const financeUpdateArticles: ArticleDefinition[] = [
  {
    slug: "sfia-2026-procedura-omf-1128",
    title: "SFIA în 2026: noua procedură pentru un răspuns fiscal anticipat",
    excerpt: "Ce schimbă OMF 1128/2026 din 7 septembrie: cererea înaintea efectelor fiscale, discuția preliminară, documentele, taxele și limitele soluției.",
    category: "fiscalitate",
    type: "noutate",
    tags: ["SFIA", "soluție fiscală individuală anticipată", "OMF 1128/2026", "Ministerul Finanțelor", "răspuns fiscal", "tranzacții viitoare"],
    sources: ["updateFinanceSfia", "updateFinanceSfiaAnterior", "updateFinanceProcedura", "updateFinanceBuletin31"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: sfia,
  },
  {
    slug: "formular-081-efactura-optional-scoatere-2026",
    title: "Formularul 081: scoaterea din e-Factura opțional după regulile noi",
    excerpt: "Schimbarea din 3 septembrie 2026: secțiunea V, efectul din luna următoare, renunțarea înaintea înscrierii și diferența față de registrul obligatoriu.",
    category: "declaratii",
    type: "noutate",
    tags: ["formular 081", "e-Factura opțional", "scoatere registru", "OPANAF 1021/2026", "CNP", "formular 082", "ONG"],
    sources: ["updateFinanceRegistru081", "updateFinanceModel081", "updateFinanceModel082", "updateFinanceBuletin31"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: optional,
  },
  {
    slug: "d300-nedepus-impunere-oficiu-2026",
    title: "D300 nedepus: noua impunere din oficiu și termenul de 60 de zile",
    excerpt: "OPANAF 1022/2026: notificarea, calculul cu 50% din TVA deductibilă, pragul de 20 lei și anularea deciziei prin depunerea decontului în termen.",
    category: "declaratii",
    type: "noutate",
    tags: ["D300 nedepus", "impunere din oficiu", "OPANAF 1022/2026", "RO e-TVA", "notificare ANAF", "60 de zile", "TVA"],
    sources: ["updateFinanceD300Oficiu", "updateFinanceProcedura", "updateFinanceBuletin31"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: missing,
  },
];
