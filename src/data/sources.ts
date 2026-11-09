import { batch60Sources } from "./sources-batch60-20261103";
import { batch3FinanceSources } from "./sources-batch60-round3-finance-20261105";
import { batch3ReportingSources } from "./sources-batch60-round3-reporting-20261105";
import { batch3PeopleSources } from "./sources-batch60-round3-people-20261105";
import { batch4SalarizareSources } from "./sources-batch60-round4-salarizare-20261106";
import { batch4AntreprenoriatSources } from "./sources-batch60-round4-antreprenoriat-20261106";
import { batch4GhiduriSources } from "./sources-batch60-round4-ghiduri-20261106";
import { batch2Sources } from "./sources-batch60-round2-20261103";
import { businessUpdateSources } from "./sources-updates-business-20261104";
import { financeUpdateSources } from "./sources-updates-finance-20261104";
import { peopleUpdateSources } from "./sources-updates-people-20261104";

export const sources = {
  "maintenance1512Nov9": {
    "label": "OPANAF nr. 1512/2026 — procedurile Legii nr. 177/2026, M.Of. 923 din 3 noiembrie 2026",
    "url": "https://legislatie.just.ro/Public/DetaliiDocumentAfis/316014"
  },
  "maintenance1457Nov9": {
    "label": "OPANAF nr. 1457/2026 — stabilirea din oficiu CAS/CASS pentru anul 2025, M.Of. 919 din 2 noiembrie 2026",
    "url": "https://legislatie.just.ro/Public/DetaliiDocumentAfis/315989"
  },
  "maintenance1389Nov9": {
    "label": "Ordinul MDLPA nr. 1389/2026 — instrucțiunile privind balcoanele, M.Of. 932 din 6 noiembrie 2026",
    "url": "https://legislatie.just.ro/Public/DetaliiDocumentAfis/316101"
  },
  "liveMm1668": {
    "label": "Ordinul MMFTSS nr. 1668/2026 — metodologia Listei ocupațiilor deficitare, M.Of. 928 din 5 noiembrie 2026",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/316069"
  },
  "liveOug32": {
    "label": "OUG nr. 32/2026 — accesul străinilor pe piața muncii, art. 1 și art. 3 alin. (2) lit. o)",
    "url": "https://legislatie.just.ro/Public/DetaliiDocumentAfis/309832"
  },
  "liveWorkinRomaniaStatus": {
    "label": "WorkinRomania — avertizarea oficială privind fluxurile dezactivate, verificată la 6 noiembrie 2026",
    "url": "https://workinromania.gov.ro/"
  },
  "liveIgiSep15": {
    "label": "IGI — precizarea din 15 septembrie 2026 privind adaptarea fluxurilor WorkinRomania la hotărârea instanței",
    "url": "https://igi.mai.gov.ro/precizare-5/"
  },
  "liveOpanaf1227": {
    "label": "OPANAF nr. 1227/2026 — modelul adresei de poprire asigurătorie, M.Of. 891 din 23 octombrie 2026",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/OPANAF_1227_2026.pdf"
  },
  ...batch4SalarizareSources,
  ...batch4AntreprenoriatSources,
  ...batch4GhiduriSources,
  ...batch3FinanceSources,
  ...batch3ReportingSources,
  ...batch3PeopleSources,
  maintenanceOug43: {
    label: "OUG nr. 43/2026 — art. III și XIX–XXI, Monitorul Oficial nr. 915 din 30 octombrie 2026, text integral ANAF",
    url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_43_2026.pdf",
  },
  ...businessUpdateSources,
  ...financeUpdateSources,
  ...peopleUpdateSources,
  ...batch2Sources,
  ...batch60Sources,
  omfp: {
    label: "OMFP nr. 1802/2014 — reglementări contabile, forma consolidată",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/314289",
  },
  fiscal: {
    label: "Codul fiscal și normele metodologice — forma actualizată ANAF",
    url: "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm",
  },
  saft: {
    label: "OPANAF nr. 1783/2021 — SAF-T, anexele și forma actualizată",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/296117",
  },
  procedura: {
    label: "Legea nr. 207/2015 — Codul de procedură fiscală",
    url: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/312603",
  },
  efacturaLaw: {
    label: "OUG nr. 120/2021 — RO e-Factura, forma consolidată",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/310662",
  },
  efactura: {
    label: "RO e-Factura — documentație tehnică și ghiduri ANAF",
    url: "https://static.anaf.ro/static/10/Anaf/Informatii_R/e_factura.htm",
  },
  formulare: {
    label: "Formulare și programe de asistență — ANAF",
    url: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Toateformularele/Toate_Formularele.html",
  },
  lege141: {
    label: "Legea nr. 141/2025 — cote TVA și impozit pe dividende",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/305568",
  },
  lege239: {
    label: "Legea nr. 239/2025 — modificări fiscale și distribuirea profitului",
    url: "https://static.anaf.ro/static/10/Anaf/legislatie/L_239_2025.pdf",
  },
  oug89: {
    label: "OUG nr. 89/2025 — microîntreprinderi și termenul e-Factura",
    url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf",
  },
  oug8: {
    label: "OUG nr. 8/2026 — modificări fiscale pentru 2026",
    url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_8_2026.pdf",
  },
  inventariere: {
    label: "OMFP nr. 2861/2009 — normele de inventariere",
    url: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/112431",
  },
  documente: {
    label: "OMFP nr. 2634/2015 — documente financiar-contabile",
    url: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/286043",
  },
  societati: {
    label: "Legea nr. 31/1990 — societăți, forma consolidată",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/304533",
  },
  contabilitate: {
    label: "Legea nr. 82/1991 — contabilitate, forma consolidată",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/293379",
  },
  catalog: {
    label: "HG nr. 2139/2004 — Catalogul mijloacelor fixe",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/249448",
  },
  pfa: {
    label: "OUG nr. 44/2008 — organizarea activităților PFA",
    url: "https://legislatie.just.ro/public/detaliidocument/91808",
  },
  duGhid: {
    label: "ANAF — D212 și activități independente, 22 aprilie 2026",
    url: "https://static.anaf.ro/static/10/Cluj/cj_DU_activ_indep_22apr2026.pdf",
  },
  duFormular: {
    label: "ANAF — formularul D212 și instrucțiunile în vigoare",
    url: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/declaratie_unica.html",
  },
  raportare2025: {
    label: "OMF nr. 2036/2025 — situații financiare pentru exercițiul 2025",
    url: "https://static.anaf.ro/static/10/Anaf/legislatie/OMF_2036_2025.pdf",
  },
  termenBilant: {
    label: "ANAF — termenul de 2 iunie 2026 pentru situațiile financiare 2025",
    url: "https://static.anaf.ro/static/3/Cluj/20260427103851_cj_termen_sit_fin_27apr2026.pdf",
  },
  bilantProgram: {
    label: "ANAF — programe și documentație pentru situațiile financiare 2025",
    url: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/situatiifinanciare/2025/1002_5_2025.html",
  },
  corectare: {
    label: "OMFP nr. 450/2016 — procedura de corectare a situațiilor depuse",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/177435",
  },
  tvaIncasare: {
    label: "ANAF — modificarea plafonului TVA la încasare, martie 2026",
    url: "https://static.anaf.ro/static/3/Ploiesti/20260311121028_comunicat_modificari_plafon%20_tva_la_incasare.pdf",
  },
  "financeOug138": {
    "label": "OUG nr. 138/2024 — obligația balanței de verificare lunare, art. X",
    "url": "https://legislatie.just.ro/Public/DetaliiDocumentAfis/292029"
  },
  "financeCash": {
    "label": "Legea nr. 70/2015 — disciplina financiară; art. 4 alin. (4), împrumuturi fără numerar",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/304521"
  },
  "financeCivil": {
    "label": "Codul civil — împrumutul de consumație, art. 2158–2159",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/130143"
  },
  "financeLege239": {
    "label": "Legea nr. 239/2025 — restricțiile finanțărilor asociaților, art. XXIV",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/315441"
  },
  "financeOg22": {
    "label": "OG nr. 22/2025 — plafonul și regimul de scutire TVA pentru întreprinderi mici",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/301801"
  },
  "financeLege204": {
    "label": "Legea nr. 204/2026 — aprobarea OG nr. 22/2025, forma promulgată publicată de Senat",
    "url": "https://www.senat.ro/legis/PDF/2025/25L228FP.PDF?nocache=true"
  },
  "financePlafon": {
    "label": "ANAF — precizări privind plafonul de 395.000 lei și data înregistrării în scopuri de TVA",
    "url": "https://static.anaf.ro/static/10/Galati/Vrancea/Preciz-inreg-TVA-cu-01-09-25.pdf"
  },
  "financeD301": {
    "label": "ANAF — D301, decont special de TVA: program și documentație",
    "url": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/301.html"
  },
  "financeD390": {
    "label": "ANAF — D390, declarația recapitulativă intracomunitară: program și documentație",
    "url": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/390.html"
  },
  "financeVies": {
    "label": "Comisia Europeană — VIES, verificarea codurilor de TVA",
    "url": "https://ec.europa.eu/taxation_customs/vies/"
  },
  "financeD700": {
    "label": "OPANAF nr. 15/2026 — formulare de înregistrare și mențiuni fiscale",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/OPANAF_15_2026.pdf"
  },
  "peopleHg146": {
    "label": "HG nr. 146/2026 — salariul minim general de la 1 iulie 2026",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/308231"
  },
  "peopleHg1506": {
    "label": "HG nr. 1506/2024 — salariul minim aplicabil până la 30 iunie 2026",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/291450"
  },
  "peopleCodMuncii": {
    "label": "Legea nr. 53/2003 — Codul muncii",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/290668"
  },
  "peopleReges295": {
    "label": "HG nr. 295/2025 — REGES-ONLINE și termenele de transmitere",
    "url": "https://legislatie.just.ro/Public/DetaliiDocumentAfis/295995"
  },
  "peopleRegesHelp": {
    "label": "Inspecția Muncii — întrebări frecvente REGES-ONLINE și prima angajare",
    "url": "https://reges.inspectiamuncii.ro/ajutor/intrebari-frecvente"
  },
  "peopleCimModel": {
    "label": "Ordinul nr. 2171/2022 — modelul-cadru al contractului individual de muncă",
    "url": "https://legislatie.just.ro/public/DetaliiDocument/262299"
  },
  "peopleMedicine": {
    "label": "HG nr. 355/2007 — supravegherea sănătății lucrătorilor și fișa de aptitudine",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/82130"
  },
  "peopleSsm": {
    "label": "Legea nr. 319/2006 — securitatea și sănătatea în muncă",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/73772"
  },
  "peopleAnofm": {
    "label": "AJOFM — comunicarea locurilor vacante și a ocupării lor, 16 octombrie 2026",
    "url": "https://www.anofm.ro/bistrita-nasaud/ajofm-bistrita-nasaud-reaminteste-angajatorilor-obligatiile-privind-comunicarea-locurilor-de-munca-vacante/"
  },
  "peopleOnrcSrl": {
    "label": "ONRC — documentele și procedura pentru înmatricularea unui SRL",
    "url": "https://www.onrc.ro/index.php/ro/inmatriculari/persoane-juridice/nume-colectiv"
  },
  "peopleOnrcCaen": {
    "label": "ONRC — clasificarea CAEN și documentația Rev. 3",
    "url": "https://www.onrc.ro/index.php/ro/caen"
  },
  "peopleBeneficiar": {
    "label": "ONRC — declararea beneficiarului real și includerea datelor în actul constitutiv",
    "url": "https://www.onrc.ro/index.php/ro/inmatriculari/persoane-juridice/nume-colectiv?id=856"
  },
  "peoplePlati70": {
    "label": "Legea nr. 70/2015 — disciplina financiară și contul de plăți al persoanelor juridice",
    "url": "https://legislatie.just.ro/Public/FormaPrintabila/00000G2DDE6J3HMADWZ2H1OCPZ25RW0N"
  },
  "peopleRuc": {
    "label": "Legea nr. 252/2003 — registrul unic de control",
    "url": "https://legislatie.just.ro/Public/FormaPrintabila/00000G02XSAU4MGZG7V2ZHG2UIG8U59L"
  },
  "peopleS1046": {
    "label": "ANAF — declarația S1046 și condiția lipsei activității de la constituire",
    "url": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/situatiifinanciare/2025/1046_2025.html"
  },
  "peopleCpfActualizat": {
    "label": "ANAF — Codul de procedură fiscală actualizat, art. 92 și 101",
    "url": "https://static.anaf.ro/static/10/Anaf/cod_procedura/Cod_Procedura_Fiscala_2023.htm"
  },
  "peopleDerogatoriu": {
    "label": "OPANAF nr. 889/2016 — regimul de declarare derogatoriu",
    "url": "https://legislatie.just.ro/Public/DetaliiDocument/176686"
  },
  "reportingD394": {
    "label": "ANAF — D394, programul pentru perioadele începând cu august 2025",
    "url": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/394.html"
  },
  "reportingD394Norme": {
    "label": "OPANAF nr. 77/2022 — anexele și instrucțiunile D394",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/OPANAF_77_2022.pdf"
  },
  "reportingD700": {
    "label": "ANAF — formularul D700 și validările actualizate în 2026",
    "url": "https://static.anaf.ro/static/10/Anaf/Declaratii_R/700.html"
  },
  "reportingD700Ordin": {
    "label": "OPANAF nr. 15/2026 — modificarea formularelor de înregistrare fiscală",
    "url": "https://legislatie.just.ro/public/DetaliiDocument/306390"
  },
  "reportingProceduraANAF": {
    "label": "ANAF — Codul de procedură fiscală actualizat, art. 75 și 88–89",
    "url": "https://static.anaf.ro/static/10/Anaf/cod_procedura/Cod_Procedura_Fiscala_2023.htm"
  },
  "reportingMicro2026": {
    "label": "ANAF Argeș — comunicarea regimului micro pentru 2026",
    "url": "https://static.anaf.ro/static/3/Ploiesti/20260127145415_comunicat%20ajfp%20arges%20-%20sistem%20micro%202027%20site.pdf"
  },
  "reportingRegistruTVA": {
    "label": "ANAF — Registrul persoanelor înregistrate normal în scopuri de TVA",
    "url": "https://www.anaf.ro/RegistruTVA/"
  },
  "reportingInactivi": {
    "label": "ANAF — Registrul contribuabililor inactivi/reactivați",
    "url": "https://www.anaf.ro/inactivi/"
  },
  "reportingVies": {
    "label": "Comisia Europeană — verificarea unui cod TVA prin VIES",
    "url": "https://europa.eu/youreurope/business/finance-and-tax/vat/check-vat-number-vies/index_ro.htm"
  },
  "reportingEfProcedura": {
    "label": "OMF nr. 1365/2021 — procedura RO e-Factura, corecții și comunicare",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/OMF_1365_2021.pdf"
  },
} as const;

export type SourceId = keyof typeof sources;
