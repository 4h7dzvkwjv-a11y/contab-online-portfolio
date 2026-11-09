export default `## Cum citești o balanță de verificare

**Începe cu perioada, soldurile și câteva conturi esențiale: bancă, clienți, furnizori, taxe și rezultat.** Balanța de verificare sintetizează înregistrările contabile ale firmei. Îți arată ce există și ce se datorează la o anumită dată, precum și mișcările din perioada raportată. Nu arată, singură, câți bani poți retrage din societate.

Ghidul privește un SRL care aplică OMFP nr. 1802/2014 și contabilitatea în partidă dublă. Pentru PFA care ține evidența în partidă simplă se folosesc alte registre; explicațiile nu se transferă automat. Potrivit **art. 22 din Legea contabilității nr. 82/1991**, în forma modificată prin OUG nr. 138/2024, balanța se întocmește lunar.

## Ce înseamnă debit, credit, rulaj și sold

Debit și credit sunt cele două părți ale unui cont contabil. Nu înseamnă universal încasare și plată, bine și rău sau plus și minus. Semnificația lor depinde de funcțiunea contului.

La contul de bancă 5121, o încasare se înregistrează în debit, iar o plată în credit. La furnizori, în contul 401, factura primită creează de regulă o datorie în credit, iar plata o stinge prin debit. Aceeași sumă plătită apare, așadar, în părți diferite ale celor două conturi.

| Coloană | Ce urmărești |
| --- | --- |
| Sold inițial debitor/creditor | Poziția preluată la începutul perioadei indicate în raport |
| Rulaj debitor/creditor | Mișcările înregistrate în perioada indicată |
| Total sume debitoare/creditoare | Soldul inițial plus rulajele corespunzătoare modelului de balanță |
| Sold final debitor/creditor | Poziția rămasă la sfârșitul perioadei |

Unele programe prezintă separat rulajul lunii și rulajele cumulate de la începutul anului. Citește antetul înainte să aduni coloanele: **nu adaugi încă o dată rulajul lunar peste un total care îl conține deja**. Pentru un cont de activ simplu, soldul final se determină din soldul debitor inițial plus rulajul debitor minus rulajul creditor. Conturile de pasiv au logica inversă; există și conturi bifuncționale.

Structura claselor și funcțiunea conturilor sunt explicate în [ghidul planului de conturi](/articol/plan-conturi-omfp-1802-2014).

## Ce conturi verifici mai întâi

1. **5121 și 5311:** disponibilul în lei la bancă și în casierie. Confruntă soldurile cu extrasul și registrul de casă; conturile în valută se verifică separat.
2. **4111:** sumele de încasat de la clienți. Cere situația facturilor și scadențelor, nu numai totalul sintetic.
3. **401 și 404:** datoriile către furnizori curenți și furnizorii de imobilizări. Verifică dacă plățile și facturile sunt asociate partenerului corect.
4. **44x și 43x:** obligațiile fiscale și contribuțiile. Soldul contabil se reconciliază cu declarațiile, plățile și evidența fiscală, care pot avea decalaje de procesare.
5. **121:** rezultatul contabil, dacă veniturile și cheltuielile perioadei au fost închise. Pentru o balanță înaintea închiderii trebuie analizate și conturile din clasele 6 și 7.
6. **4551:** datoria firmei față de asociați din finanțări. Nu este disponibilul personal al asociatului și nici profit distribuibil.

La conturi sintetice, compensarea unor poziții poate ascunde o factură neachitată și un avans acordat altui partener. Cere balanța analitică sau fișele de cont atunci când ai nevoie de explicația soldului. Nu concluziona dintr-un singur semn că există o eroare: verifică natura operațiunii și documentele.

## Exemplu complet: profitul nu este soldul băncii

Un SRL prestator de servicii, înregistrat normal în scopuri de TVA, începe perioada cu **5.000 lei în bancă** și capital social vărsat de aceeași valoare. Nu are alte solduri. Primește și plătește o factură pentru servicii de la un furnizor din România de **2.000 lei + 420 lei TVA**. Prestează servicii de **10.000 lei + 2.100 lei TVA**, încasează numai jumătate din factura de 12.100 lei și nu are alte operațiuni. TVA este integral deductibilă; nu se aplică TVA la încasare.

| Operațiune | Debit | Credit | Sumă, lei |
| --- | --- | --- | ---: |
| Servicii cumpărate | 628 | 401 | 2.000 |
| TVA deductibilă | 4426 | 401 | 420 |
| Plata furnizorului | 401 | 5121 | 2.420 |
| Servicii prestate | 4111 | 704 | 10.000 |
| TVA colectată | 4111 | 4427 | 2.100 |
| Încasarea parțială a clientului | 5121 | 4111 | 6.050 |

Balanța de mai jos este prezentată **înaintea închiderii veniturilor și cheltuielilor și înaintea regularizării TVA**. În acest model, rulajele sunt ale perioadei, iar totalurile includ soldurile inițiale:

| Cont | Inițial D | Inițial C | Rulaj D | Rulaj C | Total D | Total C | Final D | Final C |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1012 | 0 | 5.000 | 0 | 0 | 0 | 5.000 | 0 | 5.000 |
| 5121 | 5.000 | 0 | 6.050 | 2.420 | 11.050 | 2.420 | 8.630 | 0 |
| 401 | 0 | 0 | 2.420 | 2.420 | 2.420 | 2.420 | 0 | 0 |
| 4111 | 0 | 0 | 12.100 | 6.050 | 12.100 | 6.050 | 6.050 | 0 |
| 628 | 0 | 0 | 2.000 | 0 | 2.000 | 0 | 2.000 | 0 |
| 4426 | 0 | 0 | 420 | 0 | 420 | 0 | 420 | 0 |
| 704 | 0 | 0 | 0 | 10.000 | 0 | 10.000 | 0 | 10.000 |
| 4427 | 0 | 0 | 0 | 2.100 | 0 | 2.100 | 0 | 2.100 |
| **Total** | **5.000** | **5.000** | **22.990** | **22.990** | **27.990** | **27.990** | **17.100** | **17.100** |

Rezultatul înainte de impozitare este **10.000 − 2.000 = 8.000 lei**. Banca arată **5.000 − 2.420 + 6.050 = 8.630 lei**, iar clientul mai datorează 6.050 lei. TVA colectată minus TVA deductibilă este 1.680 lei, înaintea altor ajustări. Nici 8.630 lei din bancă, nici profitul de 8.000 lei nu reprezintă automat dividende disponibile.

## Cele patru egalități și limita lor

În modelul prezentat, totalul debitor este egal cu totalul creditor pentru solduri inițiale, rulaje, total sume și solduri finale. O diferență cere verificarea preluării soldurilor, a înregistrărilor și a raportului generat.

Egalitățile pot exista însă și când o factură lipsește complet, când este înregistrată de două ori sau când s-a ales un cont nepotrivit pe ambele laturi. Balanța este un control aritmetic și o bază de analiză; **nu certifică singură realitatea operațiunilor, deductibilitatea cheltuielilor ori corectitudinea declarațiilor**.

La închiderea lunii verifică documentele neprimite, avansurile, inventarul, amortizarea și delimitarea cheltuielilor pe perioade. Folosește [lista controalelor de închidere lunară](/articol/inchidere-luna-contabila) pentru reconcilierea acestor poziții.

## Întrebări frecvente

### Balanța este același document cu bilanțul?

Nu. Balanța detaliază conturile și mișcările lor. Bilanțul este o componentă a situațiilor financiare și grupează elementele potrivit formularului și regulilor de raportare.

### Un sold creditor la 121 înseamnă bani disponibili?

Nu. El indică, în condițiile închiderii conturilor, profit contabil. Încasările, plățile, investițiile și finanțările explică separat disponibilul bănesc.

### Dacă toate totalurile sunt egale, contabilitatea este corectă?

Egalitatea confirmă un echilibru numeric. Verificarea documentelor și reconcilierea analiticelor rămân necesare, inclusiv pentru depistarea omisiunilor și dublurilor.

### Balanța lunară se trimite automat la ANAF?

Întocmirea balanței nu echivalează cu o declarație lunară distinctă obligatorie pentru orice SRL. Obligațiile de raportare, inclusiv SAF-T, au propria sferă și propriile termene.

**Bază legală:** Legea nr. 82/1991, art. 6, 20–23; OUG nr. 138/2024, art. X pct. 1; OMFP nr. 2634/2015, normele privind balanța de verificare; OMFP nr. 1802/2014, planul de conturi și regulile de recunoaștere. Exemplele privesc operațiuni interne supuse cotei standard de TVA din 2026.`;
