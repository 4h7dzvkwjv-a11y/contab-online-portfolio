import type { SourceId } from "./sources";
import type { UpdateSelection } from "./updates";

export const november9Revisions: Record<string, SourceId[]> = {
  "declaratia-d311-tva-cod-anulat": [
    "maintenance1512Nov9"
  ],
  "tva-furnizor-inactiv-cod-anulat": [
    "maintenance1512Nov9"
  ],
  "restituire-sume-platite-in-plus-anaf": [
    "maintenance1512Nov9"
  ],
  "esalonare-datorii-anaf-conditii": [
    "maintenance1512Nov9"
  ],
  "declaratia-unica-pfa": [
    "maintenance1457Nov9"
  ],
  "cass-venituri-extrasalariale-plafoane": [
    "maintenance1457Nov9"
  ],
  "impozite-locale-firma-cladire-teren-auto": [
    "maintenance1389Nov9"
  ],
  "sediu-social-apartament-comodat": [
    "maintenance1389Nov9"
  ]
};

export const november9Events: UpdateSelection[] = [
  {
    "articleSlug": "declaratia-d311-tva-cod-anulat",
    "eventDate": "2026-11-03",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1512/2026 · anularea obligațiilor TVA",
    "summary": "Procedura separă deciziile din oficiu de D311 autodeclarată și păstrează excluderile pentru TVA distinctă ori colectată.",
    "sourceId": "maintenance1512Nov9"
  },
  {
    "articleSlug": "tva-furnizor-inactiv-cod-anulat",
    "eventDate": "2026-11-03",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1512/2026 · furnizorul și deducerea cumpărătorului",
    "summary": "Anularea unor obligații istorice ale furnizorului nu acordă automat cumpărătorului deducerea curentă.",
    "sourceId": "maintenance1512Nov9"
  },
  {
    "articleSlug": "restituire-sume-platite-in-plus-anaf",
    "eventDate": "2026-11-03",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1512/2026 · restituirea sumelor stinse",
    "summary": "Cererea din anexa 4, confirmarea listelor și compensarea preced restituirea efectivă a sumelor eligibile.",
    "sourceId": "maintenance1512Nov9"
  },
  {
    "articleSlug": "esalonare-datorii-anaf-conditii",
    "eventDate": "2026-11-03",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1512/2026 · obligațiile eșalonate",
    "summary": "Anexa 2 trimite la procedurile eșalonării; eligibilitatea posibilă nu justifică oprirea unilaterală a ratelor.",
    "sourceId": "maintenance1512Nov9"
  },
  {
    "articleSlug": "declaratia-unica-pfa",
    "eventDate": "2026-11-02",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1457/2026 · impunerea CAS și CASS pentru 2025",
    "summary": "Notificarea, audierea, declararea după decizie și contestația au termene distincte; ordinul privește anul 2025.",
    "sourceId": "maintenance1457Nov9"
  },
  {
    "articleSlug": "cass-venituri-extrasalariale-plafoane",
    "eventDate": "2026-11-02",
    "eventKind": "publicare",
    "eventLabel": "OPANAF 1457/2026 · perioada contribuțiilor verificate",
    "summary": "Procedura din oficiu pentru 2025 nu aplică retroactiv plafonul PFA din 2026 și nu schimbă exemplul veniturilor curente.",
    "sourceId": "maintenance1457Nov9"
  },
  {
    "articleSlug": "impozite-locale-firma-cladire-teren-auto",
    "eventDate": "2026-11-06",
    "eventKind": "publicare",
    "eventLabel": "Ordinul MDLPA 1389/2026 · balconul și majorarea impozitului",
    "summary": "Instrucțiunile administrative disting balconul închis al unei clădiri legale de clădirea edificată ilegal; cotele obișnuite rămân distincte.",
    "sourceId": "maintenance1389Nov9"
  },
  {
    "articleSlug": "sediu-social-apartament-comodat",
    "eventDate": "2026-11-06",
    "eventKind": "publicare",
    "eventLabel": "Ordinul MDLPA 1389/2026 · apartamentul folosit ca sediu",
    "summary": "Clarificarea impozitului pentru balcon nu validează automat lucrările, destinația spațiului sau activitatea firmei.",
    "sourceId": "maintenance1389Nov9"
  }
];
