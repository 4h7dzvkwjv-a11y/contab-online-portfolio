import type { UpdateSelection } from "./updates";

// Datele reprezintă evenimentele legislative, nu publicarea editorială.
export const financeUpdateEvents: UpdateSelection[] = [
  {
    articleSlug: "sfia-2026-procedura-omf-1128",
    eventDate: "2026-09-07",
    eventKind: "publicare",
    eventLabel: "OMF 1128/2026 · Monitorul Oficial nr. 757",
    summary: "Noua procedură pentru soluția fiscală individuală anticipată: cereri, documente, termene și limitele efectelor pentru solicitant.",
    sourceId: "updateFinanceSfia",
  },
  {
    articleSlug: "persoane-afiliate-preturi-transfer",
    eventDate: "2026-07-02",
    eventKind: "publicare",
    eventLabel: "OPANAF 828/2026 · Monitorul Oficial nr. 543",
    summary: "Praguri pe tranzacție și afiliat, documentarea anuală 2026 și cadrul procedural pentru inițierile de după 1 ianuarie 2027.",
    sourceId: "updateFinanceTransfer828",
  },
  {
    articleSlug: "rambursare-tva-decont-negativ",
    eventDate: "2026-10-16",
    eventKind: "publicare",
    eventLabel: "OPANAF 1425/2026 · Monitorul Oficial nr. 868",
    summary: "Criterii de risc revizuite pentru rambursarea TVA, aplicabile deconturilor septembrie și trimestrul III; tranziție pentru dosarele în curs.",
    sourceId: "updateFinanceTva1425",
  },
  {
    articleSlug: "formular-081-efactura-optional-scoatere-2026",
    eventDate: "2026-09-03",
    eventKind: "publicare",
    eventLabel: "OPANAF 1021/2026 · Monitorul Oficial nr. 743",
    summary: "Formularul 081 permite expres scoaterea după înscriere; secțiunea V și efectul din prima zi a lunii următoare transmiterii.",
    sourceId: "updateFinanceRegistru081",
  },
  {
    articleSlug: "d300-nedepus-impunere-oficiu-2026",
    eventDate: "2026-09-03",
    eventKind: "publicare",
    eventLabel: "OPANAF 1022/2026 · Monitorul Oficial nr. 745",
    summary: "Estimarea TVA pentru D300 lipsă folosește e-TVA și sistemele naționale; procedura acoperă obligații declarative începând cu iulie 2024.",
    sourceId: "updateFinanceD300Oficiu",
  },
];
