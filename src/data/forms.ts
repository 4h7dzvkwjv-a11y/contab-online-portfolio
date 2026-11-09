export const FORMS_REVIEWED_AT = "2026-11-03";

export interface OfficialForm {
  id: string;
  code: string;
  references: readonly string[];
  institution: "ANAF" | "ONRC";
  title: string;
  officialTitle: string;
  description: string;
  applicability: string;
  sourcePage: string;
  officialFileUrl: string;
  filePath: string;
  downloadName: string;
  sha256: string;
  bytes: number;
  format: "xfa" | "acroform";
  reviewedAt: string;
}

// Originale oficiale, copiate fără rescriere. Audit: docs/research/forms-20261103.json.
const formCatalog: readonly OfficialForm[] = [
  {
    "id": "anaf-d100",
    "code": "D100",
    "institution": "ANAF",
    "title": "Obligații de plată la bugetul de stat",
    "officialTitle": "Declarație privind obligațiile de plată la bugetul de stat",
    "description": "Pentru impozitele și taxele datorate la bugetul de stat: de exemplu, impozitul microîntreprinderii și anumite impozite reținute la sursă. Obligația și periodicitatea depind de categoria fiscală aplicabilă firmei.",
    "applicability": "Perioade de raportare începând cu ianuarie 2024.",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/100.html",
    "officialFileUrl": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D100_710_XML_0126_191026.pdf",
    "filePath": "/formulare/anaf-d100-0e3793592df0.pdf",
    "downloadName": "anaf-d100.pdf",
    "sha256": "0e3793592df0e59bcac3a0a7b0a4b9b63d52ec08a64bc25179ad2570e163f93f",
    "bytes": 165805,
    "format": "xfa",
    "reviewedAt": "2026-11-03",
    "references": [
      "D100",
      "D710"
    ]
  },
  {
    "id": "anaf-d101",
    "code": "D101",
    "institution": "ANAF",
    "title": "Impozitul anual pe profit",
    "officialTitle": "Declarație privind impozitul pe profit",
    "description": "Definitivează impozitul anual pe profit și corelează rezultatul fiscal cu obligațiile declarate în cursul anului. Se folosește de către contribuabilii plătitori de impozit pe profit, inclusiv pentru rectificarea situației anuale.",
    "applicability": "Ani fiscali încheiați în 2024 sau ulterior.",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/101.html",
    "officialFileUrl": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D101_XML_2025_091026.pdf",
    "filePath": "/formulare/anaf-d101-3c6136af3e10.pdf",
    "downloadName": "anaf-d101.pdf",
    "sha256": "3c6136af3e10ff405c624623f62fc079a7a7c28a9ebb8eeb44b6eddce4dfcbd0",
    "bytes": 167757,
    "format": "xfa",
    "reviewedAt": "2026-11-03",
    "references": [
      "D101"
    ]
  },
  {
    "id": "anaf-d112",
    "code": "D112",
    "institution": "ANAF",
    "title": "Salarii, contribuții și persoane asigurate",
    "officialTitle": "Declarație privind obligațiile de plată a contribuțiilor sociale, impozitului pe venit și evidența nominală a persoanelor asigurate",
    "description": "Pentru raportarea salariilor, impozitului pe venit, contribuțiilor sociale și datelor nominale ale persoanelor asigurate. Include informațiile individuale ale angajaților și permite corectarea prin declarație rectificativă, conform instrucțiunilor.",
    "applicability": "Luni de raportare începând cu iulie 2026.",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/112.html",
    "officialFileUrl": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D112_XML_2026_0726_070926.pdf",
    "filePath": "/formulare/anaf-d112-8e6337759133.pdf",
    "downloadName": "anaf-d112.pdf",
    "sha256": "8e6337759133e50bf10608434eb10c293515859a07ecff3aa4e8bb0fb50462a4",
    "bytes": 318864,
    "format": "xfa",
    "reviewedAt": "2026-11-03",
    "references": [
      "D112"
    ]
  },
  {
    "id": "anaf-d205",
    "code": "D205",
    "institution": "ANAF",
    "title": "Venituri cu impozit reținut la sursă",
    "officialTitle": "Declarație informativă privind impozitul reținut la sursă și câștigurile/pierderile din investiții, pe beneficiari de venit",
    "description": "Raportează anual veniturile și impozitul reținut la sursă, pe beneficiari: de exemplu, dividende și anumite venituri din chirii. Cuprinde și câștigurile sau pierderile din investiții prevăzute de instrucțiunile ANAF.",
    "applicability": "Raportarea anului 2025; pentru alte perioade, consultă pagina ANAF.",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/205.html",
    "officialFileUrl": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D205_XML_2025_120226.pdf",
    "filePath": "/formulare/anaf-d205-90229920b346.pdf",
    "downloadName": "anaf-d205.pdf",
    "sha256": "90229920b346ae23aa305e2d5e7989a3dbd6e4d39bc1aaa4534a650a0fbf7ea0",
    "bytes": 141502,
    "format": "xfa",
    "reviewedAt": "2026-11-03",
    "references": [
      "D205"
    ]
  },
  {
    "id": "anaf-d300",
    "code": "D300",
    "institution": "ANAF",
    "title": "Decontul de TVA",
    "officialTitle": "Decont de taxă pe valoarea adăugată",
    "description": "Reunește TVA colectată și deductibilă, regularizările și sumele reportate, pentru fiecare perioadă fiscală. Este folosit de persoanele înregistrate normal în scopuri de TVA, potrivit perioadei fiscale atribuite.",
    "applicability": "Perioade de raportare începând cu ianuarie 2026.",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/300.html",
    "officialFileUrl": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D300_v12.0.2_12022026.pdf",
    "filePath": "/formulare/anaf-d300-12c9f29f0808.pdf",
    "downloadName": "anaf-d300.pdf",
    "sha256": "12c9f29f080816878574b8a56aea45169ede466d091d830ca3c03330b9e21aa0",
    "bytes": 175525,
    "format": "xfa",
    "reviewedAt": "2026-11-03",
    "references": [
      "D300"
    ]
  },
  {
    "id": "anaf-d700",
    "code": "D700",
    "institution": "ANAF",
    "title": "Mențiuni și radiere fiscală",
    "officialTitle": "Declarație pentru înregistrarea/modificarea în mediu electronic a mențiunilor ulterioare înregistrării fiscale, precum și pentru radierea înregistrării fiscale",
    "description": "Pentru mențiunile ulterioare înregistrării fiscale: modificarea vectorului fiscal, actualizarea datelor și radierea înregistrării fiscale, în cazurile acoperite de instrucțiuni. În funcție de operațiune, se atașează documentele justificative cerute.",
    "applicability": "Model ANAF actualizat la 11 martie 2026.",
    "sourcePage": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/700.html",
    "officialFileUrl": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D700_XML_0126_110326.pdf",
    "filePath": "/formulare/anaf-d700-71ef0f8c3b42.pdf",
    "downloadName": "anaf-d700.pdf",
    "sha256": "71ef0f8c3b425e3e2842dcecf01efd82b240145dc632e313a8d457f134a79470",
    "bytes": 334317,
    "format": "xfa",
    "reviewedAt": "2026-11-03",
    "references": [
      "D700"
    ]
  },
  {
    "id": "onrc-anexa-2a",
    "code": "Anexa 2a",
    "institution": "ONRC",
    "title": "Înregistrarea societăților și mențiuni",
    "officialTitle": "Cerere de înregistrare - persoane juridice",
    "description": "Cerere oficială pentru înmatricularea unui SRL sau a altei persoane juridice, înscrierea mențiunilor, radiere și corectarea erorilor. Include și rubrica pentru actualizarea obiectului principal de activitate potrivit CAEN Rev. 3.",
    "applicability": "Persoane juridice; include actualizarea CAEN Rev. 3.",
    "sourcePage": "https://www.onrc.ro/index.php/ro/informatii-publice/formulare-tip",
    "officialFileUrl": "https://www.onrc.ro/templates/site/formulare/11-10-150.pdf",
    "filePath": "/formulare/onrc-anexa-2a-a468c682e442.pdf",
    "downloadName": "onrc-anexa-2a.pdf",
    "sha256": "a468c682e442b5ed886289b0ba5235407d7ae4fa18443ae66dafc430aa99c243",
    "bytes": 560332,
    "format": "acroform",
    "reviewedAt": "2026-11-03",
    "references": [
      "Anexa 2a ONRC",
      "ONRC Anexa 2a"
    ]
  },
  {
    "id": "onrc-anexa-2b",
    "code": "Anexa 2b",
    "institution": "ONRC",
    "title": "Înregistrare pentru PFA, II și IF",
    "officialTitle": "Cerere de înregistrare - persoane fizice",
    "description": "Formular oficial pentru înregistrarea PFA, întreprinderii individuale sau întreprinderii familiale și pentru modificarea datelor declarate la registrul comerțului. Acoperă mențiuni, radiere, îndreptarea erorilor și actualizarea activităților conform CAEN Rev. 3.",
    "applicability": "PFA, II și IF; include actualizarea CAEN Rev. 3.",
    "sourcePage": "https://www.onrc.ro/index.php/ro/informatii-publice/formulare-tip",
    "officialFileUrl": "https://www.onrc.ro/templates/site/formulare/11-10-180.pdf",
    "filePath": "/formulare/onrc-anexa-2b-7dd7ac3dfe39.pdf",
    "downloadName": "onrc-anexa-2b.pdf",
    "sha256": "7dd7ac3dfe39235dfcd90a624619fdcd5c52a0950660a6f354a8cd8f004d71a5",
    "bytes": 410203,
    "format": "acroform",
    "reviewedAt": "2026-11-03",
    "references": [
      "Anexa 2b ONRC",
      "ONRC Anexa 2b"
    ]
  },
  {
    "id": "onrc-anexa-4",
    "code": "Anexa 4",
    "institution": "ONRC",
    "title": "Condițiile de funcționare",
    "officialTitle": "Declarație privind îndeplinirea condițiilor de funcționare",
    "description": "Declarație pe propria răspundere privind îndeplinirea condițiilor de funcționare, pentru activitățile desfășurate la sediul social sau profesional, la terți ori în sedii secundare. Include rubrici pentru codurile CAEN și denumirea activităților.",
    "applicability": "Activități la sediu, la terți sau în sedii secundare.",
    "sourcePage": "https://www.onrc.ro/index.php/ro/informatii-publice/formulare-tip",
    "officialFileUrl": "https://www.onrc.ro/templates/site/formulare/11-10-141.pdf",
    "filePath": "/formulare/onrc-anexa-4-3be459d2f545.pdf",
    "downloadName": "onrc-anexa-4.pdf",
    "sha256": "3be459d2f5453c2ad0120410c11819278de1f51c972badad07a960188472f029",
    "bytes": 216523,
    "format": "acroform",
    "reviewedAt": "2026-11-03",
    "references": [
      "Anexa 4 ONRC",
      "ONRC Anexa 4"
    ]
  },
  {
    "id": "onrc-beneficiari-reali-3a",
    "code": "Formular 3a",
    "institution": "ONRC",
    "title": "Declarația privind beneficiarii reali",
    "officialTitle": "Declarație privind beneficiarii reali - semnătură privată",
    "description": "Declarație privind beneficiarii reali ai persoanei juridice, în varianta cu semnătură privată. Include identificarea beneficiarilor, modalitatea de exercitare a controlului și motivul depunerii, precum înmatricularea, modificarea datelor sau corectarea unei erori.",
    "applicability": "Varianta cu semnătură privată, publicată de ONRC.",
    "sourcePage": "https://www.onrc.ro/index.php/ro/informatii-publice/formulare-tip",
    "officialFileUrl": "https://www.onrc.ro/templates/site/formulare/Declaratie%20privind%20beneficiarii%20reali%20-%20semnatura%20privata-nr.6A.pdf",
    "filePath": "/formulare/onrc-beneficiari-reali-3a-277174d88f1f.pdf",
    "downloadName": "onrc-beneficiari-reali-3a.pdf",
    "sha256": "277174d88f1f1daf0b5cb8627c27b2b91f32e8ed5f864199511bd46ee0918951",
    "bytes": 258687,
    "format": "acroform",
    "reviewedAt": "2026-11-03",
    "references": [
      "Formular 3a ONRC",
      "Formularul 3a ONRC",
      "ONRC Formular 3a",
      "ONRC Formularul 3a"
    ]
  }
];

// Regulă editorială: declarațiile fiscale de depus apar după celelalte formulare.
// Sortarea stabilă păstrează ordinea existentă în interiorul fiecărui grup.
const isTaxDeclaration = (form: OfficialForm) =>
  form.institution === "ANAF" && /^D\d{3}$/i.test(form.code);

export const officialForms: readonly OfficialForm[] = [...formCatalog].sort(
  (first, second) => Number(isTaxDeclaration(first)) - Number(isTaxDeclaration(second)),
);
