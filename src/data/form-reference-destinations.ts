// Referințe suplimentare din articole; catalogul homepage păstrează cele 10 PDF-uri.
export interface OfficialFormDestination {
  id: string;
  code: string;
  references: readonly string[];
  filePath: string;
  downloadName?: string;
  applicability: string;
  resourceType?: "pdf" | "application" | "program" | "document";
  sourcePage?: string;
}

// Probe: batch60-round2/form-reference-destinations.json și batch60-round3-20261105/form-*.json,
// în docs/research. Tipul resursei se verifică separat de extensia fișierului.
export const articleFormDestinations: readonly OfficialFormDestination[] = [
  {
    id: "anaf-reference-f1129",
    code: "F1129",
    references: ["F1129", "OPME"],
    filePath: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/31.OrdinPlataElectronic_2026_11_05_A2.0.48.pdf",
    applicability: "Ordin de plată multiplu electronic pentru conturi deschise la Trezorerie. Programul oficial XFA este versiunea 2.0.48 din 5 noiembrie 2026; plata presupune drepturile de semnătură și depunerea prin circuitul aplicabil titularului.",
    resourceType: "pdf",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/descarcare_declaratii.htm",
  },
  {
    id: "anaf-reference-z01",
    code: "Z01",
    references: ["Z01"],
    filePath: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/Z01_v1.0.4_13022025.pdf",
    applicability: "Cererea certificatului de rezidență fiscală pentru persoane juridice rezidente în România, potrivit OMFP nr. 583/2016. Programul XFA 1.0.4 din 13 februarie 2025 este indicat de pagina ANAF curentă la 6 noiembrie 2026.",
    resourceType: "pdf",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/Z01.html",
  },
  {
    id: "anaf-reference-d030",
    code: "D030",
    references: ["D030", "formularul 030"],
    filePath: "https://static.anaf.ro/static/10/Anaf/formulare/D_030_OPANAF_15_2026.pdf",
    applicability: "Modelul și instrucțiunile OPANAF nr. 15/2026 pentru persoanele fizice fără cod numeric personal. Document oficial static de 14 pagini, fără câmpuri de completare digitală.",
    resourceType: "document",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html",
  },
  {
    id: "anaf-reference-231",
    code: "231",
    references: ["formularul 231", "cererea 231"],
    filePath: "https://static.anaf.ro/static/10/Anaf/formulare/A1_231_cerere_OPANAF_1048_2024.pdf",
    applicability: "Cererea de eliberare a unei adeverințe de venit, modelul OPANAF nr. 1048/2024. Document oficial static; se folosește serviciul electronic sau circuitul legal aplicabil solicitantului.",
    resourceType: "document",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html",
  },
  {
    id: "anaf-reference-232",
    code: "232",
    references: ["formularul 232", "modelul 232"],
    filePath: "https://static.anaf.ro/static/10/Anaf/formulare/A2_232_adeverinta_OPANAF_1048_2024.pdf",
    applicability: "Modelul adeverinței de venit din OPANAF nr. 1048/2024, emisă de organul fiscal. Este document static de referință, fără câmpuri pentru completare digitală de către solicitant.",
    resourceType: "document",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html",
  },
  {
    id: "anaf-reference-233",
    code: "233",
    references: ["formularul 233", "modelul 233"],
    filePath: "https://static.anaf.ro/static/10/Anaf/formulare/A3_233_adeverinta_OPANAF_1048_2024.pdf",
    applicability: "Modelul adeverinței prin care ANAF atestă lipsa înregistrării în evidența fiscală, potrivit OPANAF nr. 1048/2024. Document static emis de instituție, fără câmpuri pentru completare digitală de către solicitant.",
    resourceType: "document",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html",
  },
  {
    id: "anaf-reference-d110",
    code: "D110",
    references: ["D110"],
    filePath: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D110_XML_2026_270326.pdf",
    applicability: "Declarația de regularizare și cererea de restituire a impozitului reținut la sursă; programul oficial XFA este actualizat la 27 martie 2026, potrivit procedurii aplicabile.",
    resourceType: "pdf",
    sourcePage: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/110.html",
  },
  {
    "id": "anaf-reference-d107",
    "code": "D107",
    "references": [
      "D107"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D107_XML_2024_010726.pdf",
    "applicability": "Modelul OPANAF nr. 355/2024, pentru raportări începând cu 2024; program curent actualizat la 1 iulie 2026. Cazurile istorice se citesc conform instrucțiunilor.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/107.html"
  },
  {
    "id": "anaf-reference-d177",
    "code": "D177",
    "references": [
      "D177"
    ],
    "filePath": "https://www.anaf.ro/declaratii/d177/",
    "applicability": "Cererea curentă de redirecționare a impozitului pe profit; procedura OPANAF nr. 3562/2024 se aplică în forma consolidată cu OPANAF nr. 773/2026. Versiunile istorice nu creează o facilitate micro nouă pentru 2026.",
    "resourceType": "application",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/177.html"
  },
  {
    "id": "anaf-reference-d307",
    "code": "D307",
    "references": [
      "D307"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D307_XML_2017_071117.pdf",
    "applicability": "Modelul OPANAF nr. 793/2016, indicat de pagina ANAF curentă pentru perioade începând cu 2016. Numele fișierului din 2017 nu înseamnă că programul curent a expirat; regulile fiscale se verifică pentru perioada ajustării.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/307.html"
  },
  {
    "id": "anaf-reference-d311",
    "code": "D311",
    "references": [
      "D311"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D311_XML_2021_290121.pdf",
    "applicability": "Modelul OPANAF nr. 188/2018 indicat în pagina curentă pentru obligațiile aplicabile din 2016. Legea nr. 177/2026 are sferă istorică și condiții distincte, fără eliminarea D311 pentru operațiunile curente.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/311.html"
  },
  {
    "id": "anaf-reference-d318",
    "code": "D318",
    "references": [
      "D318"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D318_XML_2024_300926.pdf",
    "applicability": "Program curent actualizat la 30 septembrie 2026. Cereri potrivit art. 302 alin. (2) și normelor pct. 73; TVA din 2025 avea termen 30 septembrie 2026, TVA din 2026 are reperul 30 septembrie 2027 potrivit regulilor curente.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/318.html"
  },
  {
    "id": "anaf-reference-d204",
    "code": "D204",
    "references": [
      "D204"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D204_XML_2025_030226.pdf",
    "applicability": "Venituri începând cu anul 2025, instrucțiuni modificate prin OPANAF nr. 138/2026; programul este actualizat la 3 februarie 2026. Se aplică termenul actual din ultima zi a lunii februarie a anului următor, cu regulile zilelor nelucrătoare.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/204.html"
  },
  {
    "id": "anaf-reference-d230",
    "code": "D230",
    "references": [
      "D230"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D230_v109_09012025.pdf",
    "applicability": "Modelul curent OPANAF nr. 103/2025, indicat de ANAF la verificarea din 3 noiembrie 2026. Pentru venitul 2025 termenul 25 mai 2026 a trecut. Nu este pretinsă publicarea unui model nou pentru campania 2027.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/230.html"
  },
  {
    "id": "anaf-reference-c168",
    "code": "C168",
    "references": [
      "C168"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/C168_XML_2026_260326.pdf",
    "applicability": "Modelul OPANAF nr. 161/2025, pentru înregistrarea, modificarea și încetarea contractelor de locațiune; programul curent este actualizat la 26 martie 2026.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/168.html"
  },
  {
    "id": "anaf-reference-d010",
    "code": "D010",
    "references": [
      "D010"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/formulare/D_010_OPANAF_15_2026.pdf",
    "applicability": "Modelul și instrucțiunile OPANAF nr. 15/2026. Documentul oficial are 30 de pagini și nu conține câmpuri pentru completare digitală.",
    "resourceType": "document",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html"
  },
  {
    "id": "anaf-reference-d163",
    "code": "D163",
    "references": [
      "D163"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D163_XML_15022021.pdf",
    "applicability": "Cerere de înscriere sau radiere din Registrul entităților/unităților de cult, potrivit OPANAF nr. 819/2019, cu modificările ulterioare; programul indicat de pagina ANAF curentă.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/163.html"
  },
  {
    "id": "anaf-reference-d207",
    "code": "D207",
    "references": [
      "D207"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D207_XML_2025_200226.pdf",
    "applicability": "Declarația privind veniturile nerezidenților, pentru raportări începând cu anul 2025; programul curent este actualizat la 20 februarie 2026.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/207.html"
  },
  {
    "id": "anaf-reference-d212",
    "code": "D212",
    "references": [
      "D212"
    ],
    "filePath": "https://www.anaf.ro/declaratii/duf",
    "applicability": "Aplicația ANAF Declarație unică 2026, pentru veniturile anului 2025 și opțiunile CASS din 2026. Pentru veniturile anului 2026 se utilizează modelul aferent campaniei de declarare, după publicarea sa.",
    "resourceType": "application",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html"
  },
  {
    "id": "anaf-reference-d216",
    "code": "D216",
    "references": [
      "D216"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D216_2026_121026.pdf",
    "applicability": "Impozitul special pe bunurile imobile și mobile de valoare mare, pentru anul 2026, potrivit OPANAF nr. 917/2026; programul publicat de ANAF în octombrie 2026.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/216.html"
  },
  {
    "id": "anaf-reference-d224",
    "code": "D224",
    "references": [
      "D224"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D224_v3.0.0_01042026.pdf",
    "applicability": "Venituri salariale din străinătate pentru activitatea desfășurată în România, începând cu luna martie 2026, potrivit OPANAF nr. 507/2026.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/224.html"
  },
  {
    "id": "anaf-reference-d301",
    "code": "D301",
    "references": [
      "D301"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D301_XML_2017_260320.pdf",
    "applicability": "Decont special de TVA, numai pentru operațiunile și persoanele prevăzute de Codul fiscal. Fișierul din 2020 este programul indicat de pagina ANAF curentă.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/301.html"
  },
  {
    "id": "anaf-reference-d390",
    "code": "D390",
    "references": [
      "D390"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D390_XML_2020_300424.pdf",
    "applicability": "Declarația recapitulativă privind operațiunile intracomunitare, în condițiile art. 325 din Codul fiscal; programul curent este actualizat la 30 aprilie 2024.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/390.html"
  },
  {
    "id": "anaf-reference-d394",
    "code": "D394",
    "references": [
      "D394"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D394_26092025.pdf",
    "applicability": "Declarația informativă privind operațiunile realizate pe teritoriul național; programul indicat de ANAF este actualizat la 26 septembrie 2025.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/394.html"
  },
  {
    "id": "anaf-reference-d406",
    "code": "D406",
    "references": [
      "D406"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D406_20260216.zip",
    "applicability": "Programul oficial SAF-T, actualizat la 16 februarie 2026. Arhiva ZIP conține aplicațiile Java pentru generare și validare; nu este un PDF de completat direct.",
    "resourceType": "program",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/406.html"
  },
  {
    "id": "anaf-reference-f4109",
    "code": "F4109",
    "references": [
      "F4109"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/F4109_15012019.pdf",
    "applicability": "Declarația pentru aparatele de marcat electronice fiscale neutilizate în nicio zi din luna de raportare, inclusiv cele conectate. Programul curent este cel indicat de ANAF din 15 ianuarie 2019.",
    "resourceType": "pdf",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/4109.html"
  },
  {
    "id": "anaf-reference-f7000",
    "code": "F7000",
    "references": [
      "F7000"
    ],
    "filePath": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/F7000_18122025.zip",
    "applicability": "Programul oficial DAC7, arhivă ZIP din decembrie 2025, cu aplicațiile Java de generare și validare. Nu este un PDF de completat direct.",
    "resourceType": "program",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/F7000.html"
  }
];
