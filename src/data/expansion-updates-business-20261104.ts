import type { ArticleDefinition } from "./articles";
import registru from "./content/registrul-evidenta-fiscala-omf-808-2026";
import durabilitate from "./content/raportare-durabilitate-omf-1281-2026";
import plata from "./content/plata-tarife-onrc-casierii-inchise-2026";
import preschimbare from "./content/preschimbare-termen-onrc-audienta-2026";

export const businessUpdateArticles: ArticleDefinition[] = [
  {
    slug: "registrul-evidenta-fiscala-omf-808-2026",
    title: "Registrul de evidență fiscală: noul model OMF 808/2026",
    excerpt: "Regulile din 7 iulie 2026 pentru plătitorii de impozit pe profit: modelul obligatoriu, forma electronică, conturile și reconcilierea cu declarațiile.",
    category: "contabilitate",
    type: "noutate",
    tags: ["Registrul de evidență fiscală", "OMF 808/2026", "impozit pe profit", "registru electronic", "D101", "D100", "rezultat fiscal"],
    sources: ["updateBusinessRegistru808", "fiscal"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: registru,
  },
  {
    slug: "raportare-durabilitate-omf-1281-2026",
    title: "Raportarea durabilității: praguri și scutiri după OMF 1281/2026",
    excerpt: "Ce schimbă ordinul publicat la 13 octombrie: pragurile pentru 2027, derogarea 2025–2026 și protecția furnizorilor din lanțul valoric.",
    category: "contabilitate",
    type: "noutate",
    tags: ["raportare durabilitate", "OMF 1281/2026", "CSRD", "ESG", "sustenabilitate", "lanț valoric", "entitate protejată", "2027"],
    sources: ["updateBusinessDurabilitate1281", "omfp"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: durabilitate,
  },
  {
    slug: "plata-tarife-onrc-casierii-inchise-2026",
    title: "Casieriile ONRC s-au închis: cum plătești tarifele din 15 octombrie",
    excerpt: "Portal, terminale, ordin de plată sau mandat poștal: cum alegi beneficiarul, verifici nota de calcul și documentezi plata serviciilor ONRC.",
    category: "antreprenoriat",
    type: "noutate",
    tags: ["plată tarife ONRC", "casierii ONRC", "15 octombrie 2026", "Monitorul Oficial", "ordin de plată", "IBAN", "înființare firmă"],
    sources: ["updateBusinessOnrcCasierii", "updateBusinessOnrcIban", "updateBusinessOnrcFormulare"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: plata,
  },
  {
    slug: "preschimbare-termen-onrc-audienta-2026",
    title: "Dosar ONRC amânat: preschimbarea termenului sau audiență?",
    excerpt: "Clarificarea ONRC din 5 octombrie 2026: când folosești Formularul 5, termenele legale și de ce audiența nu aduce automat prioritate.",
    category: "antreprenoriat",
    type: "noutate",
    tags: ["preschimbare termen ONRC", "audiență publică", "Formularul 5 ONRC", "dosar ONRC întârziat", "cerere amânată", "Legea 265/2022"],
    sources: ["updateBusinessOnrcPreschimbare", "updateBusinessOnrcLege265", "updateBusinessOnrcForm5", "updateBusinessOnrcFormulare"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    content: preschimbare,
  },
];
