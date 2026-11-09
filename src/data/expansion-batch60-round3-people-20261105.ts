import type { ArticleDefinition } from "./articles";
import content01 from "./content/absente-urgente-familiale-recuperare";
import content02 from "./content/concediu-ingrijitor-cinci-zile-platite";
import content03 from "./content/modificare-cim-act-aditional-reges";
import content04 from "./content/maternitate-risc-maternal-diferente-calcul";
import content05 from "./content/somaj-tehnic-indemnizatie-angajator";
import content06 from "./content/concediu-formare-profesionala-platit";
import content07 from "./content/clauza-neconcurenta-indemnizatie";
import content08 from "./content/prejudiciu-salariat-recuperare-paguba";
import content09 from "./content/program-inegal-individualizat-munca";
import content10 from "./content/angajare-minori-program-salariu";
import content11 from "./content/asociat-unic-mai-multe-srl";
import content12 from "./content/retragere-excludere-asociat-srl";
import content13 from "./content/imputernicire-onrc-semnare-depunere";
import content14 from "./content/prelungire-sediu-social-aceeasi-adresa";
import content15 from "./content/srl-asociat-administrator-strain-acte";
import content16 from "./content/trecere-pfa-srl-transfer-activitate";
import content17 from "./content/marca-osim-denumire-firma-onrc";
import content18 from "./content/autorizatii-functionare-dupa-onrc";
import content19 from "./content/plangere-respingere-cerere-onrc";
import content20 from "./content/aga-srl-convocare-vot-hotarare";

export const batch3PeopleArticles: ArticleDefinition[] = [
  {
    "slug": "absente-urgente-familiale-recuperare",
    "title": "Urgențe familiale: absența de 10 zile și recuperarea orelor",
    "excerpt": "Informarea angajatorului, limita anuală și recuperarea convenită, cu diferențele față de concediul de îngrijitor, învoire și suspendare.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "urgențe familiale",
        "10 zile lucrătoare",
        "art. 152²",
        "recuperare ore",
        "pontaj"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleReges"
    ],
    "content": content01,
  },
  {
    "slug": "concediu-ingrijitor-cinci-zile-platite",
    "title": "Concediul de îngrijitor: cinci zile plătite și documentele cerute",
    "excerpt": "Cine poate solicita dreptul, persoanele eligibile, problemele medicale grave și termenul de 30 de zile lucrătoare pentru documente.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "concediu de îngrijitor",
        "cinci zile plătite",
        "art. 152¹",
        "gospodărie",
        "acte medicale"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleIngrijitor"
    ],
    "content": content02,
  },
  {
    "slug": "modificare-cim-act-aditional-reges",
    "title": "Modificarea CIM: act adițional, normă, funcție și termene REGES",
    "excerpt": "Semnarea înaintea efectului, termenele diferite pentru salariu și funcție și un exemplu de calcul pentru luna cu două salarii.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "modificare CIM",
        "act adițional",
        "REGES-ONLINE",
        "modificare salariu",
        "normă",
        "funcție"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleReges"
    ],
    "content": content03,
  },
  {
    "slug": "maternitate-risc-maternal-diferente-calcul",
    "title": "Maternitate și risc maternal: condiții, zile și indemnizații",
    "excerpt": "126 sau 120 de zile, stagiu, protecția la locul de muncă, excepția primei zile și calculul brut/net pentru salariate.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "maternitate",
        "risc maternal",
        "cod 08",
        "cod 15",
        "126 zile",
        "120 zile",
        "FNUASS"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleOug158",
        "r3PeopleProtectieMaternitate",
        "r3PeopleLege64",
        "r3PeopleFiscal",
        "r3PeopleReges"
    ],
    "content": content04,
  },
  {
    "slug": "somaj-tehnic-indemnizatie-angajator",
    "title": "Șomajul tehnic: suspendare, indemnizația de 75% și plata firmei",
    "excerpt": "Regimul obișnuit suportat de firmă, decizia și registrul, plata unei luni parțiale și diferența față de schemele speciale.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "șomaj tehnic",
        "indemnizație 75%",
        "art. 53",
        "suspendare CIM",
        "angajator"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleReges",
        "r3PeopleFiscal"
    ],
    "content": content05,
  },
  {
    "slug": "concediu-formare-profesionala-platit",
    "title": "Formarea profesională: concediul plătit, costurile și cererea",
    "excerpt": "Când se acordă până la 10 zile sau 80 de ore, ce plătește firma la cursurile inițiate de ea și condițiile recuperării costurilor.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "formare profesională",
        "concediu plătit",
        "80 ore",
        "10 zile",
        "cost curs"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii"
    ],
    "content": content06,
  },
  {
    "slug": "clauza-neconcurenta-indemnizatie",
    "title": "Clauza de neconcurență: condiții și indemnizația după plecare",
    "excerpt": "Clauzele obligatorii, baza de minimum 50%, încetările relevante și taxarea separată a indemnizației după plecarea din firmă.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "neconcurență",
        "indemnizație",
        "50%",
        "CASS",
        "încetare CIM"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleFiscal"
    ],
    "content": content07,
  },
  {
    "slug": "prejudiciu-salariat-recuperare-paguba",
    "title": "Paguba produsă de salariat: acord, instanță și limitele reținerii",
    "excerpt": "Probele vinovăției și prejudiciului, limita acordului de cinci salarii minime și de ce nota internă nu permite oprirea unilaterală a banilor.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "prejudiciu salariat",
        "recuperare pagubă",
        "art. 254",
        "reținere salariu",
        "răspundere patrimonială"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii"
    ],
    "content": content08,
  },
  {
    "slug": "program-inegal-individualizat-munca",
    "title": "Program inegal sau individualizat: contract, ore și pontaj",
    "excerpt": "Clauza din CIM, perioada fixă și cea variabilă, două exemple de program și controlul orelor efective și al repausului.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "program inegal",
        "program individualizat",
        "pontaj",
        "40 ore",
        "art. 118"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleReges"
    ],
    "content": content09,
  },
  {
    "slug": "angajare-minori-program-salariu",
    "title": "Angajarea minorilor: acord, program de șase ore și salariu",
    "excerpt": "Condițiile la 15 și 16 ani, norma proprie 6/30, salariul minim și protecțiile speciale privind școala, pauzele și repausul.",
    "category": "salarizare",
    "type": "ghid",
    "tags": [
        "angajare minori",
        "15 ani",
        "16 ani",
        "6 ore",
        "salariu minim",
        "HG 600"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleCodMuncii",
        "r3PeopleMinoriReges",
        "r3PeopleMinori600",
        "r3PeopleMinim146",
        "r3PeopleFiscal"
    ],
    "content": content10,
  },
  {
    "slug": "asociat-unic-mai-multe-srl",
    "title": "Asociat unic în mai multe SRL-uri: reguli și separarea firmelor",
    "excerpt": "Permisiunea societară, deciziile scrise, contractele cu propria firmă și separarea banilor, distinct de condițiile fiscale micro.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "asociat unic",
        "mai multe SRL",
        "patrimoniu",
        "art. 14 abrogat",
        "decizie asociat"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleSocietati",
        "r3PeopleFiscal"
    ],
    "content": content11,
  },
  {
    "slug": "retragere-excludere-asociat-srl",
    "title": "Retragerea sau excluderea asociatului din SRL: condiții și pași",
    "excerpt": "Ieșirea prin acord sau tribunal, motivele excluderii, evaluarea drepturilor și dosarul ONRC după hotărârea definitivă.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "retragere asociat",
        "excludere asociat",
        "SRL",
        "art. 222",
        "art. 226",
        "evaluare"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleSocietati",
        "r3PeopleOnrcRetragere",
        "r3PeopleRegistru"
    ],
    "content": content12,
  },
  {
    "slug": "imputernicire-onrc-semnare-depunere",
    "title": "Împuternicirea la ONRC: cine semnează și cine depune dosarul",
    "excerpt": "Reprezentant legal, avocat, mandatar și salariat: diferența dintre semnare, depunere și ridicare și limitele certificatului digital.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "împuternicire ONRC",
        "procură autentică",
        "semnare cerere",
        "depunere dosar",
        "reprezentare"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleRegistru",
        "r3PeopleOnrcImputernicire",
        "r3PeopleOnrcSrl"
    ],
    "content": content13,
  },
  {
    "slug": "prelungire-sediu-social-aceeasi-adresa",
    "title": "Prelungirea sediului social: aceeași adresă, titlu și mențiune ONRC",
    "excerpt": "Rubrica distinctă din Anexa 2a, actul adițional sau noul contract, continuitatea folosinței și verificarea mențiunii admise.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "prelungire sediu social",
        "act de spațiu",
        "aceeași adresă",
        "Anexa 2a ONRC",
        "comodat"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleOnrcAnexa2a",
        "r3PeopleOnrcFolosinta",
        "r3PeopleRegistru"
    ],
    "content": content14,
  },
  {
    "slug": "srl-asociat-administrator-strain-acte",
    "title": "SRL cu asociat sau administrator străin: acte și traduceri",
    "excerpt": "Dosarul pentru persoane fizice și juridice străine, declarația fiscală, reprezentarea și diferențele dintre traducere, apostilă și supralegalizare.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "asociat străin",
        "administrator străin",
        "SRL",
        "traducere",
        "apostilă",
        "ONRC"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleOnrcSrl",
        "r3PeopleOnrcStraini",
        "r3PeopleOnrcFondatori",
        "r3PeopleRegistru",
        "r3PeopleSocietati"
    ],
    "content": content15,
  },
  {
    "slug": "trecere-pfa-srl-transfer-activitate",
    "title": "Trecerea de la PFA la SRL: contracte, bunuri și facturare",
    "excerpt": "Planul de mutare între titulari distincți, acordul clienților, creanțele vechi, documentele bunurilor și protecția personalului.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "trecere PFA SRL",
        "transfer activitate",
        "contracte",
        "stocuri",
        "facturare",
        "cesiune"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeoplePfa44",
        "r3PeopleSocietati",
        "r3PeopleCivil",
        "r3PeopleTransfer67",
        "r3PeopleFiscal"
    ],
    "content": content16,
  },
  {
    "slug": "marca-osim-denumire-firma-onrc",
    "title": "Marca OSIM și denumirea ONRC: ce protejează fiecare",
    "excerpt": "Denumire, brand și domeniu: cercetarea mărcilor, clasele Nisa, titularul, teritoriul și reînnoirea, fără confundarea procedurilor.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "marcă OSIM",
        "denumire ONRC",
        "brand",
        "Nisa",
        "EUIPO",
        "protecție marcă"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleOsim",
        "r3PeopleOnrcDenumire",
        "r3PeopleRegistru"
    ],
    "content": content17,
  },
  {
    "slug": "autorizatii-functionare-dupa-onrc",
    "title": "Autorizații de funcționare după ONRC: ce verifici înainte să deschizi",
    "excerpt": "Matricea activitate–spațiu–autoritate, acordul local și autorizațiile speciale, inclusiv actualizarea documentelor după deschidere.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "autorizație funcționare",
        "ONRC",
        "acord primărie",
        "DSVSA",
        "autorizații speciale"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleRegistru",
        "r3PeopleOg99",
        "r3PeopleAnsvsa111"
    ],
    "content": content18,
  },
  {
    "slug": "plangere-respingere-cerere-onrc",
    "title": "Cerere ONRC respinsă: plângerea, termenul și documentele",
    "excerpt": "Comunicarea și publicarea, depunerea pentru SRL sau PFA, probele și lipsa suspendării automate, distinct de o cerere nouă.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "plângere ONRC",
        "cerere respinsă",
        "10 zile",
        "încheiere registrator",
        "tribunal"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleRegistru",
        "r3PeopleOnrcSrl"
    ],
    "content": content19,
  },
  {
    "slug": "aga-srl-convocare-vot-hotarare",
    "title": "AGA la SRL: convocare, majorități și hotărârea asociaților",
    "excerpt": "Dovezile convocării, majoritățile pe asociați și capital, regula actuală a reconvocării și participarea la distanță.",
    "category": "antreprenoriat",
    "type": "ghid",
    "tags": [
        "AGA SRL",
        "convocare",
        "dublă majoritate",
        "RIL 9/2026",
        "hotărâre asociați"
    ],
    "publishedAt": "2026-11-05",
    "reviewedAt": "2026-11-05",
    "sources": [
        "r3PeopleSocietati",
        "r3PeopleRil9",
        "r3PeopleRegistru"
    ],
    "content": content20,
  },
];
