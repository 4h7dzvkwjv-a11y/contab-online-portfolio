import type { ArticleDefinition } from "./articles";
import content0 from "./content/saf-t-d406-stocuri-la-cerere";
import content1 from "./content/formular-d163-registru-entitati-sponsorizari";
import content2 from "./content/declaratia-d224-salarii-strainatate-romania";
import content3 from "./content/dac7-f7000-raportare-operator-platforma";
import content4 from "./content/corectare-situatii-financiare-depuse-omfp-450";
import content5 from "./content/formular-c168-inregistrare-contract-locatiune";
import content6 from "./content/declaratia-d010-inregistrare-fiscala-ong";
import content7 from "./content/f4109-casa-marcat-neutilizata";
import content8 from "./content/declaratia-d216-autoturisme-valoare-mare";
import content9 from "./content/declaratie-anaf-respinsa-recipisa-retransmitere";
import content10 from "./content/certificat-constatator-onrc-online-informatii";
import content11 from "./content/duplicat-certificat-constatator-autorizare-onrc";
import content12 from "./content/reactivare-firma-inactiva-anaf";
import content13 from "./content/registrul-unic-control-obtinere-pastrare";
import content14 from "./content/verificare-documentara-anaf-raspuns";
import content15 from "./content/nota-receptie-nir-cand-obligatorie";
import content16 from "./content/aviz-insotire-marfa-transfer-retur";
import content17 from "./content/cmr-transport-international-documente-rezerve";
import content18 from "./content/cod-eori-obtinere-vama-firma";
import content19 from "./content/restituire-sume-platite-in-plus-anaf";

export const batch3ReportingArticles: ArticleDefinition[] = [
  {
    "slug": "saf-t-d406-stocuri-la-cerere",
    "title": "SAF-T Stocuri: cererea ANAF, termenul și reconcilierea D406",
    "excerpt": "Termenul stabilit prin solicitare, perioadele distincte și reconcilierea produselor, gestiunilor și mișcărilor înaintea fișierului Stocuri.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "SAF-T Stocuri",
      "D406",
      "30 zile",
      "gestiune",
      "ANAF"
    ],
    "sources": [
      "r3ReportingSaft",
      "r3ReportingSaftProgram",
      "r3ReportingCpf"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content0,
  },
  {
    "slug": "formular-d163-registru-entitati-sponsorizari",
    "title": "D163: înscrierea ONG-ului în Registrul entităților ANAF",
    "excerpt": "Condițiile beneficiarului, certificatele locale, data aprobării deciziei și radierea, distinct de calculul creditului fiscal al sponsorului.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "D163",
      "ONG",
      "Registrul entităților",
      "sponsorizare",
      "ANAF"
    ],
    "sources": [
      "r3ReportingD163",
      "r3ReportingD163Program",
      "r3ReportingFiscal"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content1,
  },
  {
    "slug": "declaratia-d224-salarii-strainatate-romania",
    "title": "D224: salarii din străinătate pentru activitate în România",
    "excerpt": "Formularul aplicabil din martie 2026, acordul cu angajatorul, diferența față de D112 și un calcul lunar cu documente și termen.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "D224",
      "salarii străinătate",
      "activitate România",
      "angajator străin",
      "OPANAF 507/2026"
    ],
    "sources": [
      "r3ReportingD224",
      "r3ReportingD224Program",
      "r3ReportingFiscal"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content2,
  },
  {
    "slug": "dac7-f7000-raportare-operator-platforma",
    "title": "DAC7 și F7000: raportarea operatorilor de platforme",
    "excerpt": "Încadrarea operatorului, vânzătorii excluși, pragul pentru bunuri și reconcilierea datelor raportate cu comisioanele și încasările.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "DAC7",
      "F7000",
      "platformă",
      "vânzători",
      "raportare anuală"
    ],
    "sources": [
      "r3ReportingCpf",
      "r3ReportingDac7",
      "r3ReportingDac7Ordin",
      "r3ReportingF7000"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content3,
  },
  {
    "slug": "corectare-situatii-financiare-depuse-omfp-450",
    "title": "Bilanț depus greșit: corectarea permisă de OMFP 450/2016",
    "excerpt": "Cazurile de redepunere, termenele diferite după tipul erorii și dosarul administratorului, fără confundarea cu o corecție contabilă.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "bilanț greșit",
      "OMFP 450/2016",
      "CUI greșit",
      "situații financiare",
      "corectare depunere"
    ],
    "sources": [
      "r3ReportingB450",
      "r3ReportingOug138"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content4,
  },
  {
    "slug": "formular-c168-inregistrare-contract-locatiune",
    "title": "C168: înregistrarea, modificarea și încetarea contractului de chirie",
    "excerpt": "Procedura proprietarului, persoana desemnată la coproprietate și diferența dintre act adițional, încetare și cerere rectificativă.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "C168",
      "contract chirie",
      "înregistrare ANAF",
      "coproprietari",
      "încetare contract"
    ],
    "sources": [
      "r3ReportingC168",
      "r3ReportingC168Program",
      "r3ReportingFiscal"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content5,
  },
  {
    "slug": "declaratia-d010-inregistrare-fiscala-ong",
    "title": "D010: înregistrarea fiscală inițială a unei asociații",
    "excerpt": "Prima înregistrare a unei asociații constituite la instanță, termenul de 30 de zile, actele și diferența față de mențiunile D700.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "D010",
      "înregistrare fiscală ONG",
      "CIF",
      "asociație",
      "30 zile"
    ],
    "sources": [
      "r3ReportingD010",
      "r3ReportingOng",
      "r3ReportingCpf"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content6,
  },
  {
    "slug": "f4109-casa-marcat-neutilizata",
    "title": "F4109: declarația pentru casa de marcat neutilizată",
    "excerpt": "Luna întreagă fără utilizare, identificarea fiecărui aparat, termenul de 20 și obligația care rămâne și pentru AMEF conectate.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "F4109",
      "casă de marcat neutilizată",
      "AMEF",
      "20",
      "aparat conectat"
    ],
    "sources": [
      "r3ReportingF4109Procedura",
      "r3ReportingF4109",
      "r3ReportingF4109Conectate",
      "r3ReportingAmefCalendar"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content7,
  },
  {
    "slug": "declaratia-d216-autoturisme-valoare-mare",
    "title": "D216 pentru autoturisme: prag, cinci ani și declarare",
    "excerpt": "Cota de 0,9% pentru 2026, baza peste 375.000 lei, intervalul de cinci ani și verificarea declarației și plății către ANAF.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "D216",
      "autoturism valoare mare",
      "375.000 lei",
      "0,9%",
      "cinci ani"
    ],
    "sources": [
      "r3ReportingFiscal",
      "r3ReportingD216",
      "r3ReportingD216Program",
      "r3ReportingD216Validari"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content8,
  },
  {
    "slug": "declaratie-anaf-respinsa-recipisa-retransmitere",
    "title": "Declarație ANAF respinsă: recipisa, corectarea și retransmiterea",
    "excerpt": "Index, recipisă și declarație validă, cu condițiile art. 103 pentru păstrarea datei inițiale și diagnostic înainte de retransmitere.",
    "category": "declaratii",
    "type": "ghid",
    "tags": [
      "recipisă ANAF",
      "declarație respinsă",
      "erori validare",
      "retransmitere",
      "articol 103"
    ],
    "sources": [
      "r3ReportingCpf",
      "r3ReportingForms"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content9,
  },
  {
    "slug": "certificat-constatator-onrc-online-informatii",
    "title": "Certificat constatator ONRC: online, informații și verificare",
    "excerpt": "Fluxul actual InfoCert/Recom, alegerea documentului la zi sau istoric, plata și verificarea fișierului primit pentru firma corectă.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "certificat constatator ONRC",
      "InfoCert",
      "raport istoric",
      "Recom",
      "document firmă"
    ],
    "sources": [
      "r3ReportingOnrcInfoCert",
      "r3ReportingLegea265",
      "r3ReportingOnrcFormulare"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content10,
  },
  {
    "slug": "duplicat-certificat-constatator-autorizare-onrc",
    "title": "Duplicat ONRC pentru certificatul de autorizare: cerere și verificări",
    "excerpt": "Formularul ONRC nr. 6, identificarea declarației și reprezentarea, distinct de certificatul CUI și documentul informativ InfoCert.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "duplicat certificat autorizare",
      "ONRC Formular 6",
      "certificat constatator",
      "autorizare funcționare"
    ],
    "sources": [
      "r3ReportingOnrcDuplicat",
      "r3ReportingOnrcFormulare",
      "r3ReportingLegea265"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content11,
  },
  {
    "slug": "reactivare-firma-inactiva-anaf",
    "title": "Firmă inactivă ANAF: condițiile și pașii reactivării",
    "excerpt": "Condițiile în funcție de cauza inactivării, regulile noi din 2026, dosarul remedierii și verificarea separată a codului TVA.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "reactivare ANAF",
      "firmă inactivă",
      "cont de plăți",
      "bilanț nedepus",
      "decizie reactivare"
    ],
    "sources": [
      "r3ReportingCpf",
      "r3ReportingFiscal"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content12,
  },
  {
    "slug": "registrul-unic-control-obtinere-pastrare",
    "title": "Registrul unic de control: termen, cumpărare și utilizare",
    "excerpt": "Cine este obligat, cele 30 de zile pentru firma nouă, registrele la sedii și înscrierile înaintea și după finalizarea controlului.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "Registrul unic de control",
      "RUC",
      "30 zile",
      "sediu secundar",
      "control"
    ],
    "sources": [
      "r3ReportingRuc"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content13,
  },
  {
    "slug": "verificare-documentara-anaf-raspuns",
    "title": "Verificarea documentară ANAF: solicitarea, probele și răspunsul",
    "excerpt": "Termenul pentru documente, prelungirea motivată, răspunsul pe diferențe și drepturile la audiere, înaintea deciziei de impunere.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "verificare documentară",
      "ANAF",
      "30 zile",
      "audiere",
      "articol 149"
    ],
    "sources": [
      "r3ReportingCpf"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content14,
  },
  {
    "slug": "nota-receptie-nir-cand-obligatorie",
    "title": "NIR: când este obligatorie nota de recepție și cum o completezi",
    "excerpt": "Cele șase situații obligatorii, recepția în tranșe și constatarea diferențelor, cu exemplu de factură pentru 100 de bucăți și 98 primite.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "NIR",
      "notă de recepție",
      "14-3-1A",
      "diferențe recepție",
      "OMFP 2634/2015"
    ],
    "sources": [
      "r3ReportingDocumente",
      "r3ReportingDocumenteAnexe"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content15,
  },
  {
    "slug": "aviz-insotire-marfa-transfer-retur",
    "title": "Aviz de însoțire a mărfii: transfer, livrare și retur",
    "excerpt": "Documentele livrării, transferul între gestiuni, custodia și returul, cu mențiunile și controlul care previn dublarea stocurilor.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "aviz de însoțire",
      "14-3-6A",
      "transfer gestiuni",
      "retur marfă",
      "fără factură"
    ],
    "sources": [
      "r3ReportingDocumente",
      "r3ReportingDocumenteAnexe",
      "r3ReportingFiscal"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content16,
  },
  {
    "slug": "cmr-transport-international-documente-rezerve",
    "title": "CMR la transportul internațional: completare, semnături și rezerve",
    "excerpt": "Sfera convenției, exemplarele și verificările la preluare, plus rezervele pentru avarii aparente, neaparente și întârziere.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "CMR",
      "transport internațional",
      "rezerve",
      "avarii",
      "scrisoare de trăsură"
    ],
    "sources": [
      "r3ReportingCmr"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content17,
  },
  {
    "slug": "cod-eori-obtinere-vama-firma",
    "title": "Cod EORI: cererea, documentele și verificarea înainte de import",
    "excerpt": "Autoritatea competentă, verificările din registre, documentele pe categorii și notificarea de atribuire, distinct de codul TVA.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "EORI",
      "vama",
      "EORI-RO",
      "import",
      "cod vamal"
    ],
    "sources": [
      "r3ReportingEori"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content18,
  },
  {
    "slug": "restituire-sume-platite-in-plus-anaf",
    "title": "Bani plătiți în plus la ANAF: compensare și cerere de restituire",
    "excerpt": "Cum dovedești plata dublă, ce conține cererea și de ce restanțele se compensează înaintea viramentului, cu exemplu și termene.",
    "category": "ghiduri",
    "type": "ghid",
    "tags": [
      "restituire ANAF",
      "plată dublă impozit",
      "compensare fiscală",
      "articol 168",
      "45 zile"
    ],
    "sources": [
      "r3ReportingCpf"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    content: content19,
  }
];
