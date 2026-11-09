import type { UpdateSelection } from "./updates";

// Cronologia evenimentelor reale este separată de data publicării editoriale.
export const peopleUpdateEvents: UpdateSelection[] = [
  {
    articleSlug: "fnuass-cerere-recuperare-rubrici-iulie-2026",
    eventDate: "2026-07-24",
    eventKind: "publicare",
    eventLabel: "Ordinul MS/CNAS 909/1.231/2026 · Monitorul Oficial nr. 606",
    summary: "Cererea de recuperare FNUASS primește rubricile J1.2–J1.5 pentru procentele de indemnizație și diferențele din recalculare.",
    sourceId: "updatePeopleFnuass909",
  },
  {
    articleSlug: "concediu-odihna-indemnizatie-calcul",
    eventDate: "2026-08-11",
    eventKind: "publicare",
    eventLabel: "Decizia ÎCCJ 40/2026 · Monitorul Oficial nr. 665",
    summary: "Prescripția compensației concediului curge de la încetare; zilele care depășesc reportul cer verificarea posibilității reale de efectuare.",
    sourceId: "updatePeopleIccj40",
  },
  {
    articleSlug: "saf-t-d406-pregatire-validare",
    eventDate: "2026-11-03",
    eventKind: "versiune",
    eventLabel: "ANAF SAF-T · aplicațiile de la punctele 6 și 7",
    summary: "Instrumentele de consistență D406 și de evaluare în șablon D300 sunt actualizate la 3 noiembrie, în perioada de testare anunțată de ANAF.",
    sourceId: "updatePeopleSaftPagina",
  },
  {
    articleSlug: "tollro-tarife-plata-firme-octombrie-2026",
    eventDate: "2026-10-08",
    eventKind: "publicare",
    eventLabel: "Ordinul MTI 959/2026 · Monitorul Oficial nr. 847",
    summary: "Anexa tarifelor TollRo include vehiculele electrice; pentru firme contează încadrarea, plata prin sistem și documentele fiecărei curse.",
    sourceId: "updatePeopleToll959",
  },
];
