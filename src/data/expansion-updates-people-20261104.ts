import type { ArticleDefinition } from "./articles";
import fnuass from "./content/fnuass-cerere-recuperare-rubrici-iulie-2026";
import tollro from "./content/tollro-tarife-plata-firme-octombrie-2026";

export const peopleUpdateArticles: ArticleDefinition[] = [
  {
    slug: "fnuass-cerere-recuperare-rubrici-iulie-2026",
    title: "Recuperare FNUASS: cererea cu rubricile noi din 24 iulie 2026",
    excerpt: "Ce completezi la J1.2–J1.5, cum separi diferențele de indemnizație și ce verifici în dosarul angajatorului înainte de depunere.",
    category: "salarizare",
    type: "noutate",
    tags: ["cerere recuperare FNUASS 2026", "J1.5", "Ordin 909/1231/2026", "concedii medicale", "diferențe indemnizații"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    sources: ["updatePeopleFnuass909", "updatePeopleOug158", "updatePeopleNormeMedicale"],
    content: fnuass,
  },
  {
    slug: "tollro-tarife-plata-firme-octombrie-2026",
    title: "TollRo: tarifele din 8 octombrie 2026 și plata pentru firme",
    excerpt: "Încadrarea vehiculelor, tarifele cu TVA inclus, regula pentru electrice și documentele care leagă plata de cursă și de contabilitate.",
    category: "ghiduri",
    type: "noutate",
    tags: ["TollRo tarife 8 octombrie 2026", "Ordin 959/2026", "vehicule electrice", "etoll", "transport marfă", "tarif rutier"],
    publishedAt: "2026-11-04",
    reviewedAt: "2026-11-04",
    sources: ["updatePeopleToll959", "updatePeopleTollTarife", "updatePeopleTollLege", "updatePeopleCnairLansare", "updatePeopleCnairPlata", "updatePeopleUntrr"],
    content: tollro,
  },
];
