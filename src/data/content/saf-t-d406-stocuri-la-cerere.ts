export default `## Când se depune SAF-T Stocuri

**SAF-T Stocuri se transmite la solicitarea organului fiscal central, în termenul indicat în cerere, care nu poate fi mai mic de 30 de zile calendaristice de la solicitare. Nu este o raportare anuală automată și nici o anexă pe care o trimiți obligatoriu la fiecare D406 periodică.** Regula este în anexa nr. 4 la [OPANAF nr. 1783/2021](https://legislatie.just.ro/Public/DetaliiDocument/296117).

Cererea stabilește perioada de analizat. Pentru aceasta se pregătesc una sau mai multe declarații cu subsecțiunile relevante pentru stocuri, separate pentru lunile sau trimestrele calendaristice cuprinse în interval, potrivit anexei. Nu înlocuiești istoricul solicitat cu inventarul disponibil în ziua primirii cererii.

Ghidul urmărește răspunsul unei societăți aflate în sfera SAF-T. Încadrarea contribuabilului și fluxul periodic sunt explicate în [ghidul general D406](/articol/saf-t-d406-pregatire-validare). Raportarea [Active](/articol/saf-t-d406-active-raportare-anuala) are alt conținut și termen.

## Ce verifici în solicitarea ANAF

Înregistrează data, numărul, emitentul, contribuabilul și intervalul cerut. Păstrează documentul integral și dovada comunicării. Desemnează persoanele responsabile de gestiune, contabilitate și export; informațiile pot proveni din aplicații diferite, dar răspunsul trebuie să fie coerent.

Compară data-limită înscrisă cu regula de minimum 30 de zile calendaristice. Nu transforma acest minim într-un termen universal de exact 30 de zile: organul fiscal poate stabili un interval mai lung. Dacă documentul este neclar asupra perioadei ori datelor cerute, solicită clarificarea prin canal oficial și continuă pregătirea informațiilor certe.

Termenul raportării Stocuri nu se calculează prin copierea scadenței lunare D406. Nici perioada de grație istorică pentru primele raportări periodice ale contribuabililor mici nu se extinde automat asupra unei cereri primite în noiembrie 2026.

## Ce informații trebuie să poată explica firma

Anexa nr. 1 descrie datele despre produse, stocuri și proprietari, precum și mișcările de bunuri. Sunt relevante identificatorul produsului, depozitul, cantitățile și valorile inițiale/finale, proprietarul și documentele mișcărilor. Câmpurile obligatorii și condițiile tehnice se verifică în schema curentă.

Pornește de la [pagina oficială a programului D406](https://static.anaf.ro/static/10/Anaf/Declaratii_R/406.html), care publică validatorul, schema XSD și schema explicată. La verificarea din 5 noiembrie 2026, pagina indică validatorul actualizat în februarie 2026. Data unui program nu modifică termenul juridic al solicitării.

| Evidență de pregătit | Ce trebuie să poată fi verificat |
| --- | --- |
| Nomenclatorul produselor | Același articol are un identificator stabil și o unitate de măsură explicabilă |
| Gestiuni și depozite | Mișcarea se leagă de locația corectă |
| Proprietari | Bunurile proprii sunt delimitate de cele primite de la terți |
| Documente de intrare/ieșire | Cantitatea și data provin din operațiuni identificabile |
| Solduri și valori | Evidența operativă poate fi reconciliată cu contabilitatea |

Lista organizează controlul firmei. Nu reprezintă o schemă XML alternativă și nu permite inventarea codurilor tehnice pe baza etichetelor din programul comercial.

## Cum reconciliezi cantitățile și valorile

Pentru fiecare produs și gestiune verifică relația dintre cantitatea inițială, intrări, ieșiri și cantitatea finală. Separă vânzările, consumurile, transferurile, retururile și celelalte tipuri de mișcări; aceeași scădere de cantitate poate avea cauze economice diferite.

Apoi verifică valorile conform metodei de evaluare aplicate. Cantitatea înmulțită cu ultimul preț de cumpărare nu este automat costul întregului stoc. FIFO, costul mediu și evidența la preț de vânzare cer corelări proprii. Vezi [monografia stocurilor](/articol/monografia-contabila-stocuri).

Transferul între două depozite ale aceleiași firme poate genera ieșire din prima gestiune și intrare în a doua, fără să reducă stocul total al societății. Un export care tratează fiecare transfer ca vânzare produce o informație greșită chiar dacă fișierul trece verificarea de structură.

## Exemplu: stocul unui singur articol

Presupunem marfă proprie, inventar permanent, cost constant de 40 lei/bucată și absența deprecierilor. La început sunt 100 de bucăți. Intră 60 prin cumpărare, ies 80 prin vânzare, iar clientul returnează 5, reacceptate la același cost.

| Element | Cantitate | Valoare la cost, lei |
| --- | ---: | ---: |
| Stoc inițial | 100 | 4.000 |
| Achiziție | 60 | 2.400 |
| Vânzare, ieșire la cost | −80 | −3.200 |
| Retur de la client | 5 | 200 |
| Stoc final | 85 | 3.400 |

Controlul cantitativ este 100 + 60 − 80 + 5 = 85. Controlul valoric este 4.000 + 2.400 − 3.200 + 200 = 3.400 lei. Venitul și TVA ale vânzării nu intră în acest calcul al costului.

Dacă evidența fizică arată 84 de bucăți, nu modifici ultima mișcare pentru a forța egalitatea. Cauți documentul lipsă sau diferența reală și aplici procedura de constatare și înregistrare corespunzătoare.

## Custodie, diferențe și perioade istorice

Identifică separat bunurile proprii aflate la terți și bunurile altora aflate în depozitul firmei. Locul fizic nu stabilește proprietatea. Contractele și documentele trebuie să explice încadrarea raportată; [custodia](/articol/stocuri-la-terti-custodie-monografie) are evidențe distincte la proprietar și custode.

Verifică și conversiile unităților de măsură: cutii, bucăți, kilograme ori litri. O conversie de zece bucăți pe cutie aplicată numai intrărilor poate multiplica artificial soldul. Păstrează regula folosită și istoricul schimbărilor.

Pentru perioade anterioare, recuperează nomenclatoarele și datele valabile atunci. Nu redenumi retroactiv toate articolele după structura actuală dacă astfel pierzi legătura cu documentele. Diferențele contabile și de gestiune se documentează înaintea exportului final.

## Validare, depunere și dosarul final

Generează fișierele pentru perioadele cerute, rulează validatorul oficial și corectează cauzele în aplicația-sursă. După semnare și transmitere, descarcă recipisele. Un index de încărcare singur nu închide obligația.

Anexa nr. 4 cere retransmiterea integrală a declarației corectate, fără corecții parțiale limitate la rândurile schimbate. Arhivează cererea ANAF, fișierele, versiunea tehnică, reconcilierile și recipisele, împreună cu explicația diferențelor remediate.

**Surse primare:** OPANAF nr. 1783/2021, anexele nr. 1, 3 și 4; Codul de procedură fiscală, art. 59¹; documentația oficială ANAF D406.`;
