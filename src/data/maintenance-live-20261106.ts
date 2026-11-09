import type { ArticleDefinition } from "./articles";
import type { SourceId } from "./sources";
import type { UpdateSelection } from "./updates";
import body from "./content/lista-ocupatiilor-deficitare-propunere-angajator";

export const liveMaintenanceRevisions: Record<string, SourceId[]> = {
  "primul-angajat-contract-reges-online": [
    "liveMm1668",
    "liveWorkinRomaniaStatus",
    "liveIgiSep15"
  ],
  "srl-asociat-administrator-strain-acte": [
    "liveMm1668",
    "liveWorkinRomaniaStatus",
    "liveIgiSep15"
  ],
  "poprire-cont-bancar-anaf-firma": [
    "liveOpanaf1227"
  ]
};

export const liveMaintenanceArticles: ArticleDefinition[] = [{ ...{
  "slug": "lista-ocupatiilor-deficitare-propunere-angajator",
  "title": "Lista ocupațiilor deficitare: propunerea firmei și termenul de 10 zile",
  "excerpt": "Ce documentează angajatorul după Ordinul 1668/2026, cum se analizează propunerea și de ce termenul nu confirmă redeschiderea WorkinRomania.",
  "category": "salarizare",
  "type": "noutate",
  "tags": [
    "lucrători străini",
    "ocupații deficitare",
    "WorkinRomania",
    "COR",
    "Ordinul 1668/2026",
    "angajare"
  ],
  "publishedAt": "2026-11-06",
  "reviewedAt": "2026-11-06",
  "sources": [
    "liveMm1668",
    "liveOug32",
    "liveWorkinRomaniaStatus",
    "liveIgiSep15"
  ]
}, content: body }];

export const liveMaintenanceEvents: UpdateSelection[] = [
  {
    "articleSlug": "lista-ocupatiilor-deficitare-propunere-angajator",
    "eventDate": "2026-11-05",
    "eventKind": "publicare",
    "eventLabel": "Ordinul 1668/2026 · analiza propunerilor în 10 zile",
    "summary": "Documentarea propunerii, rolul ANOFM și limitele termenului de analiză, cu avertizarea oficială privind fluxurile încă dezactivate.",
    "sourceId": "liveMm1668"
  },
  {
    "articleSlug": "primul-angajat-contract-reges-online",
    "eventDate": "2026-11-05",
    "eventKind": "publicare",
    "eventLabel": "Ordinul 1668/2026 · metodologia Listei ocupațiilor deficitare",
    "summary": "Prima angajare se corelează cu dreptul de muncă și cu limitele fluxurilor WorkinRomania; modificarea metodologiei nu dovedește redeschiderea.",
    "sourceId": "liveMm1668"
  },
  {
    "articleSlug": "srl-asociat-administrator-strain-acte",
    "eventDate": "2026-11-05",
    "eventKind": "publicare",
    "eventLabel": "Ordinul 1668/2026 · metodologia Listei ocupațiilor deficitare",
    "summary": "Calitatea de asociat ori administrator și înregistrarea ONRC rămân distincte de procedura pentru angajarea unui lucrător străin.",
    "sourceId": "liveMm1668"
  },
  {
    "articleSlug": "poprire-cont-bancar-anaf-firma",
    "eventDate": "2026-10-23",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1227/2026 · poprire asigurătorie la terț",
    "summary": "Modelul special privește cumulativ debitorul fără domiciliu fiscal și fără înregistrare fiscală în România; obligațiile terțului se verifică pe act.",
    "sourceId": "liveOpanaf1227"
  }
];
