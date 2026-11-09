export default `## Încasarea prin card nu este numerar în casierie

**Încasările autorizate prin POS și încă nevirate de bancă se pot urmări în 5125 „Sume în curs de decontare”. La virament se separă suma intrată în bancă de comisionul reținut.** Venitul din vânzare nu este valoarea netă virată după comision, iar o plată cu cardul nu se înregistrează fictiv prin 5311.

Monografia privește un SRL care aplică OMFP nr. 1802/2014, vânzări interne cu TVA standard 21% și un contract bancar în lei. Nu tratează ratele de credit, valutele, încasările prin marketplace în numele altuia ori portofelele electronice cu structură contractuală diferită.

## Cele trei documente care se reconciliază

Factura sau documentul legal de vânzare susține venitul și taxa. Raportul POS identifică tranzacțiile autorizate, anulările și restituirile. Extrasul ori raportul de decontare explică suma virată efectiv, comisioanele și eventualele rețineri contractuale.

Dacă activitatea intră sub obligația utilizării casei de marcat, se respectă regulile fiscale aplicabile inclusiv încasărilor prin card. POS-ul nu înlocuiește automat aparatul de marcat și factura nu rezolvă singură orice obligație. Vezi [când este obligatorie casa de marcat](/articol/casa-de-marcat-cand-obligatorie).

Nu înregistra aceeași vânzare de două ori, o dată din factura emisă și încă o dată din raportul Z sau raportul POS. Procedura trebuie să identifice facturile incluse în documentele zilnice și să elimine dublarea veniturilor și TVA.

## Înregistrarea veniturilor și decontării

Contul 5125 permite separarea vânzării de momentul viramentului bancar. Soldul reprezintă sume reale în curs de decontare și trebuie justificat prin tranzacții și rapoarte. El nu este un cont general pentru orice diferență neexplicată între vânzări și bancă.

Pentru o vânzare facturată unui client identificat poate exista circuitul prin 4111, urmat de stingerea creanței prin 5125. În vânzările cu amănuntul, schema se adaptează documentelor și procedurii, fără a crea creanțe fictive sau numerar inexistent.

Comisionul serviciului bancar se recunoaște distinct, de exemplu în 627. Contractele cu alți procesatori pot implica alte servicii și tratamente TVA; nu orice sumă denumită „fee” este automat serviciu bancar scutit de taxă.

## Exemplu: 1.210 lei plătiți de client

Firma vinde mărfuri cu preț de 1.000 lei fără TVA, plus TVA 210 lei. Costul mărfii este 600 lei. Clientul achită prin POS 1.210 lei, iar banca virează 1.200 lei, reținând comision bancar de 10 lei. În ipoteză, comisionul nu are TVA de dedus, conform documentului bancar și naturii serviciului.

| Operațiune | Debit | Credit | Lei |
| --- | --- | --- | ---: |
| Vânzarea facturată | 4111 | 707 | 1.000 |
| TVA colectată | 4111 | 4427 | 210 |
| Descărcarea mărfii | 607 | 371 | 600 |
| Plata autorizată prin POS | 5125 | 4111 | 1.210 |
| Viramentul net al băncii | 5121 | 5125 | 1.200 |
| Comisionul reținut | 627 | 5125 | 10 |

După decontare, 4111 și 5125 aferente tranzacției sunt zero. Firma are venit de 1.000 lei, cost al mărfii 600 lei și comision 10 lei: efectul asupra rezultatului este 390 lei înainte de alte cheltuieli și impozite. TVA colectată rămâne 210 lei, nu se calculează din viramentul net de 1.200 lei.

## Tranzacții la sfârșit de lună

O tranzacție autorizată în ultima zi a lunii poate fi virată în luna următoare. Dacă suma este justificată în curs de decontare, soldul 5125 nu este neapărat eroare. Nu muta automat vânzarea în luna viramentului; recunoașterea venitului și regulile TVA se stabilesc după operațiunea efectivă.

Exemplu separat: tranzacții autorizate de 8.000 lei la sfârșitul lunii, comision contractual 80 lei, virament ulterior 7.920 lei. Soldul brut în curs se reconciliază cu 7.920 + 80 = 8.000 lei, cu recunoașterea comisionului în perioada corespunzătoare serviciului.

Dacă există rețineri de garanție, diferențe de curs sau alte deduceri, identifică-le separat. Nu forța închiderea 5125 printr-un comision estimat numai din diferența aritmetică. Raportul de decontare trebuie să explice fiecare componentă.

## Anulări, restituiri și chargeback

O autorizare anulată înaintea decontării diferă de un retur după vânzare și de un chargeback contestat. Verifică dacă vânzarea a avut loc, dacă bunul s-a întors și dacă prețul a fost corectat prin documentele fiscale necesare.

Restituirea banilor nu anulează singură venitul și TVA fără documentarea operațiunii. Invers, o dispută bancară nu dovedește automat că livrarea nu a existat. Creanța, taxa, stocul și comisionul se analizează separat; unele comisioane pot rămâne datorate chiar dacă plata a fost restituită.

Pentru o corecție a facturii folosește [circuitul storno și e-Factura](/articol/corectare-factura-storno-efactura). Nu trata o corecție comercială ca simplă cheltuială bancară și nu înregistra intrarea mărfii înapoi în stoc fără dovada returului.

## TVA și deductibilitatea comisionului

Baza TVA a vânzării se stabilește potrivit prețului și condițiilor fiscale, nu după suma rămasă după comision. Dacă firma aplică TVA la încasare, momentul relevant se verifică după regulile specifice plății prin card; extrasul net trebuie corelat cu plata clientului, nu folosit izolat.

Comisionul aferent activității se analizează la impozitul pe profit potrivit art. 25 și documentelor serviciului. Pentru microîntreprindere, el afectează profitul contabil fără să reducă automat baza impozitului pe venituri. Facturile procesatorilor externi pot genera obligații TVA diferite de cele ale comisionului bancar intern din exemplu.

## Controlul zilnic și lunar

Compară numărul și totalul tranzacțiilor cu documentele de vânzare, anulările, retururile și decontările. Urmărește termenele contractuale și tranzacțiile care depășesc durata normală. Reconcilează pe procesator, terminal și monedă, dacă volumul o cere.

La închiderea lunii, fiecare sumă rămasă în 5125 trebuie identificată. O diferență veche poate proveni din dublarea vânzării, înregistrarea netă a venitului, comision omis ori tranzacție contestată; cauza se repară documentat, fără reglaje arbitrare.

**Surse:** [OMFP nr. 1802/2014](https://legislatie.just.ro/Public/DetaliiDocument/314289), pct. 53, planul de conturi 5125 și funcțiunea 512/627/411; [Codul fiscal](https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm), art. 25, 282, 286 și 292.`;
