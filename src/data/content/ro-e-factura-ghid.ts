export default `## Sfera de aplicare: relația și locul operațiunii

RO e-Factura este sistemul național pentru transmiterea și primirea facturilor electronice structurate. Pentru o societate stabilită în România se verifică separat relațiile **B2B, B2G și B2C**, locul livrării sau prestării și excepțiile din OUG nr. 120/2021.

În relația B2B internă, obligația privește operatorii economici stabiliți în România în condițiile art. 10, indiferent dacă sunt sau nu înregistrați normal în scopuri de TVA. Un SRL neplătitor de TVA nu este exclus automat din e-Factura. Din 2026 există și prevederi pentru facturile către persoane impozabile nestabilite, dar înregistrate în scopuri de TVA în România, pentru operațiuni cu locul în România.

În relația B2C, raportarea facturilor emise pentru operațiunile incluse în lege se analizează separat de obligația de a emite factura. Transmiterea în sistem nu impune, singură, emiterea unei facturi pentru fiecare bon fiscal. Există excepții, inclusiv pentru anumite bonuri fiscale care îndeplinesc condițiile facturii simplificate. 

Din **1 iunie 2026**, furnizorii și prestatorii care se identifică fiscal prin **CNP** sunt exceptați de la obligațiile de transmitere în condițiile art. 10¹⁰, în forma modificată prin Legea nr. 88/2026. Ei pot opta pentru sistem și se înscriu în Registrul RO e-Factura opțional. Această excepție nu se extinde automat la un PFA identificat fiscal prin CUI sau la un SRL.

## Termenul de transmitere în 2026

Începând cu **1 ianuarie 2026**, termenul-limită este de **5 zile lucrătoare de la emiterea facturii**, fără a depăși 5 zile lucrătoare de la data-limită legală de emitere prevăzută la art. 319 alin. (16) din Codul fiscal. Regula este introdusă prin OUG nr. 89/2025 și acoperă și transmiterea B2C potrivit art. 10¹.

Cele două limite se urmăresc simultan. O factură emisă cu întârziere nu câștigă un nou termen integral care să înlăture limita raportată la data legală a emiterii. Pentru operațiunile obișnuite, art. 319 alin. (16) stabilește emiterea cel târziu în a 15-a zi a lunii următoare faptului generator, iar pentru avansuri există regula specifică din același alineat.

Calculul celor 5 zile lucrătoare se face conform Regulamentului nr. 1182/71, ținând cont de weekenduri și sărbători legale. Configurarea unui termen de „5 zile calendaristice” în aplicație este depășită pentru aceste transmiteri din 2026.

## Emiterea și controlul documentului XML

Documentul se generează în formatul XML conform standardului și regulilor naționale RO_CIUS, în versiunea acceptată de sistem. PDF-ul este o reprezentare lizibilă; nu este fișierul structurat transmis pentru validare.

Înainte de încărcare verifică:

- identitatea fiscală și statutul furnizorului și beneficiarului;
- seria, numărul, data emiterii și data livrării sau prestării;
- moneda, cantitățile, prețurile și reducerile;
- cota sau categoria TVA, motivul scutirii ori taxării inverse;
- egalitatea dintre baze, TVA pe categorii și totalul de plată;
- referința la documentul inițial pentru facturile de corecție.

Validarea tehnică nu confirmă că produsul se încadrează la cota redusă sau că beneficiarul poate deduce taxa. Aceste concluzii rezultă din operațiune și lege.

## Transmiterea și dovada primirii în sistem

După încărcarea prin SPV sau API, păstrează indexul și urmărește răspunsul de procesare. Dacă fișierul are erori, corectează cauza și retransmite. Un index de încărcare nu dovedește, singur, o factură validată.

Exemplarul original este documentul XML însoțit de sigiliul electronic al Ministerului Finanțelor, în condițiile art. 4 din OUG nr. 120/2021. Data comunicării către destinatar se stabilește după disponibilitatea documentului pentru descărcare în sistem. Evidența internă trebuie să distingă emiterea, transmiterea, validarea și comunicarea.

Arhivarea include XML-ul, sigiliul și mesajele relevante, plus reprezentarea lizibilă pentru lucru. Nu te baza exclusiv pe disponibilitatea temporară a fișierelor în interfața SPV.

## Exemplu contabil și prevenirea dublării

O societate primește un serviciu intern de 1.000 lei plus TVA standard 21%, cu drept integral de deducere și fără TVA la încasare. Factura validă are totalul de **1.210 lei**.

| Operațiune | Debit | Credit | Sumă, lei |
| --- | --- | --- | ---: |
| Serviciul primit | 628 | 401 | 1.000 |
| TVA deductibilă | 4426 | 401 | 210 |
| Plata furnizorului | 401 | 5121 | 1.210 |

Dacă factura a fost înregistrată din documentul primit de la furnizor, importul ulterior din e-Factura trebuie să identifice același document. Nu se contabilizează încă o dată aceeași cheltuială. Cheia de control combină identificatorul furnizorului, seria, numărul, data și valorile, nu doar numele fișierului.

Dacă bunul sau serviciul a fost recepționat înaintea primirii facturii, se analizează contabilitatea de angajamente și contul 408. Întârzierea circuitului electronic nu justifică mutarea arbitrară a cheltuielii în alt exercițiu.

## Corecții, refuz comercial și reconciliere

Factura deja comunicată prin sistem nu se șterge pentru că beneficiarul contestă operațiunea. Obiecțiile comerciale și corecția fiscală se tratează distinct. Corectarea se face conform art. 330 din Codul fiscal, cu referință la documentul inițial și transmiterea documentului corectiv când operațiunea intră în sistem.

La sfârșitul perioadei compară registrul facturilor emise cu fișierele acceptate și mesajele de eroare. Pentru achiziții, compară documentele descărcate cu facturile contabilizate, recepțiile și soldurile partenerilor. O factură prezentă în SPV nu trebuie acceptată contabil fără verificarea realității operațiunii.

**Bază legală:** OUG nr. 120/2021, art. 4, 10, 10¹ și 10¹⁰, în forma actualizată; OUG nr. 89/2025, art. X și XIV; Legea nr. 88/2026, art. III; Codul fiscal, art. 319 și 330.`;
