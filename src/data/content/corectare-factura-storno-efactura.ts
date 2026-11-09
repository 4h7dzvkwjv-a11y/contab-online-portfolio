export default `## Cum corectezi o factură greșită

**Dacă factura nu a fost transmisă beneficiarului, art. 330 alin. (1) lit. a) din Codul fiscal prevede anularea și emiterea unei facturi noi. Dacă a fost transmisă, corecția păstrează referința la documentul inițial și valorile corectate.** O factură deja comunicată prin RO e-Factura nu poate fi ștearsă sau returnată în sistem pentru a elimina operațiunea din istoric.

Ghidul privește în principal societăți înregistrate normal în scopuri de TVA, cu operațiuni interne obișnuite. Pentru persoanele neînregistrate și care nu au obligația înregistrării în scopuri de TVA, normele de la pct. 108 alin. (7) trimit la art. 319 alin. (2), privind documentele care modifică fără ambiguități factura inițială. Nu adăuga TVA unei facturi doar fiindcă folosești o funcție numită „storno”.

În practică, storno este denumirea folosită pentru documentul sau înregistrarea care reduce ori inversează valorile inițiale. Alegerea tehnică din aplicație trebuie să corespundă motivului juridic: eroare de date, cantitate facturată greșit, retur, reducere ulterioară sau anularea unei prestații. Aceste situații nu au întotdeauna aceeași dată fiscală sau același tratament contabil.

## Mai întâi stabilești starea documentului

| Starea constatată | Acțiunea care trebuie analizată |
| --- | --- |
| Factură emisă, netransmisă beneficiarului | Anulare în evidență și emitere nouă, potrivit art. 330 |
| XML respins la validare | Corectarea erorilor tehnice și retransmitere; verifici și dacă documentul a fost comunicat pe alt canal |
| Factură validată și comunicată | Document corectiv legat de factura inițială și transmis prin circuitul aplicabil |
| Beneficiarul contestă factura | Documentarea obiecției și analiza operațiunii; mesajul nu anulează factura |
| Aceeași factură importată de două ori în contabilitate | Corectarea dublurii contabile, fără emiterea unei corecții comerciale inexistente |

Nu confunda respingerea XML-ului cu anularea unei facturi deja emise și comunicate comercial. Sistemul poate respinge fișierul pentru structură, dar documentul poate să fi fost trimis anterior clientului. Starea fiscală și comercială se stabilește din întregul circuit, nu numai dintr-un indicator al aplicației.

## Ce permite art. 330 pentru o factură transmisă

Pentru informații greșite dintr-o factură transmisă, art. 330 alin. (1) lit. b) permite două variante:

1. Un document nou care cuprinde datele facturii inițiale, numărul și data ei, valorile cu semn negativ și informațiile și valorile corecte.
2. O factură nouă cu informațiile și valorile corecte, împreună cu o factură cu valorile negative care identifică documentul corectat.

Păstrează în ambele cazuri traseul **factură inițială → motiv documentat → documente de corecție**. Nu reutiliza numărul anulat ca și cum factura inițială nu ar fi existat și nu modifica retroactiv un XML comunicat.

Dacă nu este o eroare inițială, ci un eveniment ulterior care modifică baza de impozitare, se analizează art. 287 și art. 330 alin. (2). Un retur real sau o reducere comercială ulterioară necesită documentarea evenimentului. Facturile nu se stornează doar pentru că beneficiarul întârzie plata; ajustarea pentru neîncasare are condiții legale distincte.

## Exemplu complet: valoare facturată prea mare

În noiembrie 2026, o societate facturează un serviciu intern cu baza de 1.000 lei și TVA 21%, total 1.210 lei. După comunicare se constată că prețul contractual corect era 800 lei, fără TVA. Părțile confirmă eroarea. Ambele societăți aplică regimul normal de TVA, cu drept integral de deducere la beneficiar, fără TVA la încasare. Nu există diferențe de curs sau operațiuni din alte exerciții.

| Document | Bază, lei | TVA, lei | Total, lei |
| --- | ---: | ---: | ---: |
| Factura inițială | 1.000 | 210 | 1.210 |
| Factura care inversează integral documentul inițial | −1.000 | −210 | −1.210 |
| Factura cu valorile corecte | 800 | 168 | 968 |
| Efect cumulat al tuturor documentelor | 800 | 168 | 968 |

Exemplul folosește a doua variantă a art. 330 alin. (1) lit. b). Reducerea economică totală este **200 lei bază + 42 lei TVA = 242 lei**. Firma nu datorează simultan 1.210 și 968 lei pentru același serviciu: documentul negativ trebuie asociat facturii inițiale.

La furnizor, corecția diminuează venitul din servicii, TVA colectată și creanța asupra clientului cu 200, 42 și, respectiv, 242 lei. La beneficiar diminuează cheltuiala, TVA deductibilă și datoria cu aceleași valori, în ipotezele date. În program se poate folosi stornarea în roșu, cu valori negative pe aceleași conturi, potrivit politicii contabile și modului de lucru al aplicației.

Conturile uzuale pentru acest serviciu sunt 704/4111/4427 la prestator și 628/401/4426 la beneficiar. Nu utiliza automat 709/609 pentru orice factură negativă: o eroare de preț se distinge de o reducere comercială ulterioară, iar pentru bunuri pot exista și efecte asupra stocurilor.

## Ce se întâmplă dacă factura era deja plătită

Plata nu împiedică emiterea corecției. În exemplu, dacă beneficiarul plătise 1.210 lei, după corecție există o diferență de 242 lei de restituit sau de regularizat legal între părți. Păstrează documentul care justifică restituirea ori compensarea; nu marca automat suma ca venit pentru că a rămas în bancă.

În evidența prestatorului, restituirea prin bancă a diferenței se înregistrează uzual 4111 = 5121, cu 242 lei, stingând soldul creditor al clientului rezultat din corecție. La beneficiar, încasarea restituirii este uzual 5121 = 401, cu 242 lei, stingând soldul debitor al furnizorului. Verifică fișele de partener pentru ca toate documentele și plățile să se închidă corect.

Pentru un avans regularizat la factura finală, urmează tratamentul specific, explicat în [monografia avansurilor](/articol/avansuri-clienti-furnizori). Avansul nu devine automat reducere comercială sau venit suplimentar.

## Cum transmiți corecția în RO e-Factura

OUG nr. 120/2021, art. 4 alin. (8)–(10), distinge obiecția beneficiarului de corectarea facturii. Beneficiarul poate comunica obiecțiile, inclusiv prin mesajul din sistem. Emitentul întocmește corecția potrivit regulilor fiscale și o transmite prin același sistem atunci când operațiunea intră în obligația RO e-Factura.

Verifică referința la factura corectată, datele beneficiarului, categoria documentului, semnele și totalurile, conform regulilor tehnice RO_CIUS și aplicației utilizate. Nu presupune că orice combinație dintre un cod de tip document și sume negative este acceptată. Urmărește răspunsul, descarcă XML-ul și păstrează legătura cu documentul inițial.

În 2026, termenul aplicabil transmiterii pentru operațiunile cuprinse în lege este **5 zile lucrătoare de la emitere**, fără depășirea limitei raportate la termenul legal de emitere, potrivit OUG nr. 89/2025. Corecția nu trebuie antedatată pentru a cosmetiza un termen ratat. Calculul fiscal se face pentru perioada legală, iar eventualele obligații declarative se analizează distinct.

## Cum verifici efectul în contabilitate și declarații

Controlează împreună documentele inițiale și corective, fișele clientului/furnizorului, jurnalele TVA și plățile. Pentru D394 verifică perioada și instrucțiunile de corectare; pentru D300 nu utiliza mecanic o declarație rectificativă ca la alte impozite. Procedura depinde de natura diferenței și de regulile de regularizare.

Dacă eroarea privește un exercițiu anterior, analiza contabilă poate implica regulile privind erorile din perioade precedente, nu simpla diminuare a cheltuielii curente. Vezi [corectarea erorilor contabile](/articol/corectarea-erorilor-contabile) și [verificarea facturii înainte de plată](/articol/cum-verifici-o-factura-inainte-de-plata).

## Întrebări frecvente

### Pot anula din SPV o factură deja acceptată?

Nu prin ștergerea sau returnarea documentului comunicat. Se documentează motivul și se emite corecția aplicabilă; istoricul trebuie păstrat.

### Clientul a refuzat factura. Este anulată?

Obiecția nu produce singură anularea operațiunii sau a creanței. Verifici contractul, prestația și motivul invocat, apoi stabilești dacă există o corecție justificată.

### Am scris greșit doar o informație, fără diferență de valoare. Refac TVA?

Nu orice corecție schimbă baza ori taxa. Normele de la pct. 108 alin. (3) tratează și corectarea anumitor informații obligatorii care nu modifică valorile sau regimul fiscal; documentele se leagă de factura inițială, fără înregistrări artificiale în decont.

### Pot storna doar diferența?

Documentul trebuie să corespundă motivului și regulii aplicabile. Reducerile ulterioare și corectarea informațiilor facturate inițial se analizează distinct; nu aplica aceeași funcție din program tuturor situațiilor.

**Bază legală:** Codul fiscal, art. 287, 319 și 330; Normele metodologice, pct. 108; OUG nr. 120/2021, art. 4; OUG nr. 89/2025, dispozițiile privind termenul de transmitere; OMFP nr. 1802/2014 pentru efectele contabile.`;
