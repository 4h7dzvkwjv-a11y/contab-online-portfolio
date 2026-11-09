import { november9Revisions } from "./maintenance-20261109";
import { liveMaintenanceArticles, liveMaintenanceRevisions } from "./maintenance-live-20261106";
import { batch60Articles } from "./expansion-batch60-20261103";
import { batch3FinanceArticles } from "./expansion-batch60-round3-finance-20261105";
import { batch3ReportingArticles } from "./expansion-batch60-round3-reporting-20261105";
import { batch3PeopleArticles } from "./expansion-batch60-round3-people-20261105";
import { batch4SalarizareArticles } from "./expansion-batch60-round4-salarizare-20261106";
import { batch4AntreprenoriatArticles } from "./expansion-batch60-round4-antreprenoriat-20261106";
import { batch4GhiduriArticles } from "./expansion-batch60-round4-ghiduri-20261106";
import { batch2Articles } from "./expansion-batch60-round2-20261103";
import { novemberUpdateArticles } from "./expansion-updates-20261104";
import { maintenanceArticles } from "./maintenance-20261105";
import { type ArticleType, type CategorySlug } from "./categories";
import type { SourceId } from "./sources";
import { SITE_NAME } from "@/lib/site";
import { novemberArticles } from "./expansion-20261103";
import content1 from "./content/tva-deductibil-conditii-documente-exemple";
import content2 from "./content/saf-t-d406-pregatire-validare";
import content3 from "./content/monografia-contabila-stocuri";
import content4 from "./content/impozit-dividende-repartizare-declarare";
import content5 from "./content/ro-e-factura-ghid";
import content6 from "./content/plan-conturi-omfp-1802-2014";
import content7 from "./content/salarizare-salariu-contributii";
import content8 from "./content/cheltuieli-deductibile-impozit-profit";
import content9 from "./content/amortizare-mijloace-fixe";
import content10 from "./content/inchidere-luna-contabila";
import content11 from "./content/pfa-sau-srl-cum-alegi";
import content12 from "./content/situatii-financiare-anuale";
import content13 from "./content/corectarea-erorilor-contabile";
import content14 from "./content/avansuri-clienti-furnizori";
import content15 from "./content/declaratia-unica-pfa";
import content16 from "./content/inventarierea-patrimoniului";
import content17 from "./content/tva-la-incasare-verificari";
import content18 from "./content/microintreprindere-schimbare-regim";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  type: ArticleType;
  // Prima etichetă indică subiectul principal, folosit și la căutările generale.
  tags: string[];
  publishedAt: string;
  reviewedAt: string;
  author: string;
  readingTime: number;
  content: string;
  sources: SourceId[];
}

export type ArticleSummary = Omit<Article, "content" | "sources">;
export type ArticleDefinition = Omit<Article, "author" | "readingTime">;

// Datele sunt stabilite editorial pentru fiecare articol, după revizuire.
// Baza verificării: docs/CONTENT-REVIEW.md. Un build nu actualizează datele.

const catalog: ArticleDefinition[] = [
  ...liveMaintenanceArticles,
  ...batch4SalarizareArticles.flatMap((article, index) => [
    article,
    batch4AntreprenoriatArticles[index],
    batch4GhiduriArticles[index],
  ]),
  ...batch3FinanceArticles,
  ...batch3ReportingArticles,
  ...batch3PeopleArticles,
  ...maintenanceArticles,
  ...novemberUpdateArticles,
  ...batch2Articles,
  ...batch60Articles,
  ...novemberArticles,
  {
    slug: "tva-deductibil-conditii-documente-exemple",
    title: "TVA deductibil în 2026: condiții, documente și înregistrări",
    excerpt:
      "Dreptul de deducere, cotele de TVA, limitarea de 50%, pro-rata și o monografie completă pentru o achiziție internă.",
    category: "fiscalitate",
    type: "ghid",
    tags: ["TVA", "TVA 2026", "deducere", "factură", "achiziții", "4426"],
    sources: ["fiscal", "lege141", "efacturaLaw", "omfp"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content1,
  },
  {
    slug: "saf-t-d406-pregatire-validare",
    title: "SAF-T (D406): obligații, termene și validarea datelor",
    excerpt:
      "Raportare, validare și corectare D406, cu aplicațiile ANAF actualizate la 3 noiembrie 2026 și verificarea în șablon D300.",
    category: "declaratii",
    type: "ghid",
    tags: ["SAF-T", "D406", "SAFT", "XML", "ANAF", "raportare", "TestSafT", "D300_2026", "aplicații SAF-T 3 noiembrie 2026"],
    sources: ["saft", "procedura", "formulare", "updatePeopleSaftPagina", "updatePeopleSaft782", "updatePeopleSaftManual", "updatePeopleD300Manual", "updatePeopleD300Instalare"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-04",
    content: content2,
  },
  {
    slug: "monografia-contabila-stocuri",
    title: "Monografia stocurilor: achiziție, vânzare și depreciere",
    excerpt:
      "Inventar permanent la cost de achiziție: înregistrări complete, TVA 21%, descărcarea gestiunii și ajustarea pentru depreciere.",
    category: "contabilitate",
    type: "monografie",
    tags: ["monografie", "stocuri", "mărfuri", "371", "607", "707", "gestiune"],
    sources: ["omfp", "inventariere", "documente", "fiscal"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content3,
  },
  {
    slug: "impozit-dividende-repartizare-declarare",
    title: "Dividende în 2026: impozit de 16%, declarare și CASS",
    excerpt:
      "Profitul distribuibil, restricțiile privind activul net, cota de 16%, regula tranzitorie din 2025 și obligațiile asociatului.",
    category: "fiscalitate",
    type: "ghid",
    tags: ["dividende", "impozit", "asociați", "CASS", "457", "profit", "2026"],
    sources: ["fiscal", "societati", "lege141", "lege239", "omfp", "formulare"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content4,
  },
  {
    slug: "ro-e-factura-ghid",
    title: "RO e-Factura în 2026: termen, validare și contabilizare",
    excerpt:
      "Termenul de 5 zile lucrătoare, documentul XML, corecțiile și controalele care previn facturile omise sau înregistrate de două ori.",
    category: "declaratii",
    type: "ghid",
    tags: ["e-Factura", "efactura", "SPV", "XML", "facturare", "ANAF"],
    sources: ["efacturaLaw", "oug89", "efactura", "fiscal"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content5,
  },
  {
    slug: "plan-conturi-omfp-1802-2014",
    title: "Planul de conturi OMFP 1802/2014: clase și funcțiune",
    excerpt:
      "Cum alegi contul după natura operațiunii, diferențele dintre 401 și 404, avansuri, TVA și închiderea conturilor de rezultat.",
    category: "contabilitate",
    type: "ghid",
    tags: [
      "plan de conturi",
      "OMFP 1802/2014",
      "clase",
      "debit",
      "credit",
      "conturi",
    ],
    sources: ["omfp", "fiscal"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content6,
  },
  {
    slug: "salarizare-salariu-contributii",
    title: "Salarizare în 2026: de la brut la net și D112",
    excerpt:
      "Calcul complet pentru un brut de 8.000 lei, CAS, CASS, impozit și CAM, cu înregistrările contabile și verificarea D112.",
    category: "salarizare",
    type: "ghid",
    tags: ["salarizare", "salariu", "brut net", "CAS", "CASS", "D112", "421"],
    sources: ["fiscal", "omfp", "formulare"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content7,
  },
  {
    slug: "cheltuieli-deductibile-impozit-profit",
    title: "Cheltuieli deductibile: reguli, plafoane și calcul fiscal",
    excerpt:
      "Analiza impozitului pe profit: protocol 2%, cheltuieli sociale 5%, autoturisme și legătura cu registrul de evidență fiscală.",
    category: "fiscalitate",
    type: "ghid",
    tags: [
      "cheltuieli deductibile",
      "impozit pe profit",
      "deductibilitate",
      "documente",
    ],
    sources: ["fiscal"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content8,
  },
  {
    slug: "amortizare-mijloace-fixe",
    title: "Amortizarea în 2026: contabil, fiscal și pragul de 5.000 lei",
    excerpt:
      "Durate diferite, amortizare liniară, regula tranzitorie a pragului și facilitatea de 65% pentru activele eligibile din 2026.",
    category: "contabilitate",
    type: "monografie",
    tags: [
      "amortizare",
      "mijloace fixe",
      "imobilizări",
      "6811",
      "281",
      "monografie",
    ],
    sources: ["omfp", "fiscal", "oug8", "catalog"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content9,
  },
  {
    slug: "inchidere-luna-contabila",
    title: "Închiderea lunii contabile: reconciliere și controale",
    excerpt:
      "Delimitarea perioadelor, facturi nesosite, stocuri, trezorerie, TVA și un dosar de închidere care explică soldurile.",
    category: "ghiduri",
    type: "ghid",
    tags: [
      "închidere lună",
      "balanță",
      "reconciliere",
      "checklist",
      "contabilitate",
    ],
    sources: ["omfp", "contabilitate", "documente", "fiscal"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content10,
  },
  {
    slug: "pfa-sau-srl-cum-alegi",
    title: "PFA sau SRL în 2026: fiscalitate, răspundere și bani",
    excerpt:
      "Compararea formelor de organizare, contribuțiile PFA și un calcul pentru impozitarea unui SRL eligibil micro sau pe profit.",
    category: "antreprenoriat",
    type: "ghid",
    tags: ["PFA", "SRL", "antreprenor", "afacere", "organizare"],
    sources: ["fiscal", "pfa", "societati", "duGhid"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content11,
  },
  {
    slug: "situatii-financiare-anuale",
    title: "Situațiile financiare anuale: dosar, formulare și termene",
    excerpt:
      "Raportarea exercițiului 2025 în 2026: criterii de mărime, inventariere, aprobări, depunere electronică și recipisă.",
    category: "declaratii",
    type: "ghid",
    tags: ["bilanț", "situații financiare", "raportare anuală", "balanță"],
    sources: [
      "omfp",
      "contabilitate",
      "raportare2025",
      "termenBilant",
      "inventariere",
      "bilantProgram",
    ],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content12,
  },
  {
    slug: "corectarea-erorilor-contabile",
    title: "Corectarea erorilor contabile: 1174 și efectul fiscal",
    excerpt:
      "Erori curente și anterioare, semnificație, rezultat reportat, D101 și diferența față de corectarea situațiilor depuse.",
    category: "contabilitate",
    type: "monografie",
    tags: [
      "erori contabile",
      "corecție",
      "1174",
      "rezultat reportat",
      "monografie",
    ],
    sources: ["omfp", "fiscal", "procedura", "corectare"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content13,
  },
  {
    slug: "avansuri-clienti-furnizori",
    title: "Avansuri de la clienți și către furnizori: monografie completă",
    excerpt:
      "Facturarea, plata și regularizarea unui avans, la cumpărător și vânzător, cu TVA 21% și controlul soldurilor 409 și 419.",
    category: "contabilitate",
    type: "monografie",
    tags: ["avans", "409", "419", "clienți", "furnizori", "monografie"],
    sources: ["omfp", "fiscal", "efacturaLaw"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content14,
  },
  {
    slug: "declaratia-unica-pfa",
    title: "Declarația unică în 2026: PFA, impozit, CAS și CASS",
    excerpt:
      "Calcul complet pentru venitul PFA din 2025, contribuțiile deductibile și separarea plafonului CASS de regulile veniturilor din 2026.",
    category: "antreprenoriat",
    type: "ghid",
    tags: ["declarația unică", "D212", "PFA", "venit", "contribuții"],
    sources: ["fiscal", "duFormular", "duGhid"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content15,
  },
  {
    slug: "inventarierea-patrimoniului",
    title: "Inventarierea patrimoniului: procedură, diferențe și evaluare",
    excerpt:
      "Comisia, verificarea bunurilor și soldurilor, lipsuri, depreciere și documentarea tratamentului contabil și fiscal.",
    category: "ghiduri",
    type: "ghid",
    tags: ["inventariere", "patrimoniu", "stocuri", "creanțe", "diferențe"],
    sources: ["inventariere", "omfp", "contabilitate", "fiscal"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content16,
  },
  {
    slug: "tva-la-incasare-verificari",
    title: "TVA la încasare în 2026: plafon și plăți parțiale",
    excerpt:
      "Plafonul de 5 milioane lei din martie 2026, eligibilitatea, înregistrările cu 4428 și un calcul pentru încasare parțială.",
    category: "fiscalitate",
    type: "ghid",
    tags: ["TVA la încasare", "TVA", "4428", "încasări", "plăți"],
    sources: ["fiscal", "oug8", "tvaIncasare"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content17,
  },
  {
    slug: "microintreprindere-schimbare-regim",
    title: "Microîntreprinderi în 2026: cotă de 1% și schimbarea regimului",
    excerpt:
      "Plafonul de 100.000 euro, întreprinderile legate, condiția salariatului și momentul trecerii la impozitul pe profit.",
    category: "antreprenoriat",
    type: "noutate",
    tags: [
      "microîntreprindere",
      "micro",
      "impozit",
      "regim fiscal",
      "noutate legislativă",
    ],
    sources: ["fiscal", "oug89", "oug8", "formulare"],
    publishedAt: "2026-11-03",
    reviewedAt: "2026-11-03",
    content: content18,
  },
];

export const articles: Article[] = catalog.map((article) => ({
  ...article,
  ...(liveMaintenanceRevisions[article.slug] ? { reviewedAt: "2026-11-06", sources: [...new Set([...article.sources, ...liveMaintenanceRevisions[article.slug]])] } : {}),
  ...(november9Revisions[article.slug] ? { reviewedAt: "2026-11-09", sources: [...new Set([...article.sources, ...november9Revisions[article.slug]])] } : {}),
  author: SITE_NAME,
  readingTime: Math.max(
    2,
    Math.ceil(article.content.split(/\s+/).length / 180),
  ),
}));

export const articleSummaries: ArticleSummary[] = articles.map(
  ({ content: _content, sources: _sources, ...summary }) => summary,
);
export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);
export const getRelatedArticles = (
  article: Article,
  limit = 3,
): ArticleSummary[] =>
  articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      article: item,
      score:
        (item.category === article.category ? 5 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(
      ({ article: { content: _content, sources: _sources, ...summary } }) =>
        summary,
    );
