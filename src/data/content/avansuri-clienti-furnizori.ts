export default `## Ce reprezintă avansul

Avansul este o sumă plătită înaintea livrării bunurilor sau prestării serviciilor. Pentru cumpărător, plata nu este automat cheltuială; pentru vânzător, încasarea nu reprezintă automat venit din vânzare. Operațiunea se urmărește până la livrare, facturarea finală și regularizare.

Monografia privește mărfuri interne, în evidență la cost de achiziție, cu TVA standard de **21%** și drept integral de deducere. Părțile sunt înregistrate normal în scopuri de TVA și nu aplică TVA la încasare. Factura de avans este emisă și achitată înaintea livrării. Nu există valută, reduceri sau modificări de cotă.

Pentru servicii, imobilizări, operațiuni scutite, taxare inversă sau TVA la încasare se adaptează conturile și momentul fiscal.

## Datele exemplului și tratamentul TVA

Valoarea totală a mărfurilor este **10.000 lei fără TVA**. Se facturează și se achită un avans de **5.000 lei fără TVA**, plus 1.050 lei TVA, adică **6.050 lei**.

La livrare se emite factura pentru întreaga valoare: 10.000 lei plus 2.100 lei TVA, total 12.100 lei, și se regularizează avansul de 6.050 lei. Diferența rămasă de plată este **6.050 lei**.

Art. 282 alin. (2) reglementează exigibilitatea TVA inclusiv pentru avansurile încasate și emiterea facturii înaintea faptului generator, cu excepțiile legale. Cumpărătorul exercită deducerea numai dacă sunt îndeplinite art. 297 și 299; o proformă sau simplul ordin de plată nu înlocuiește factura cerută pentru deducere.

## Înregistrări la cumpărător

Pentru avansul destinat mărfurilor se folosește analiticul **4091**. Înregistrările sunt prezentate distinct pentru facturare, plată și regularizare:

| Operațiune | Debit | Credit | Sumă, lei |
| --- | --- | --- | ---: |
| Factura de avans, baza | 4091 | 401 | 5.000 |
| TVA deductibilă aferentă avansului | 4426 | 401 | 1.050 |
| Plata avansului | 401 | 5121 | 6.050 |
| Factura finală, intrarea mărfurilor | 371 | 401 | 10.000 |
| TVA aferentă valorii integrale | 4426 | 401 | 2.100 |
| Regularizarea bazei avansului | 401 | 4091 | 5.000 |
| Regularizarea TVA a avansului | 401 | 4426 | 1.050 |
| Plata diferenței | 401 | 5121 | 6.050 |

Regularizarea este redată prin înregistrări în sens invers; în aplicație poate fi reflectată și ca stornare cu minus, potrivit politicii și programului utilizat.

După toate operațiunile, 4091 și 401 aferente achiziției sunt închise. Marfa are costul de **10.000 lei**, TVA deductibilă netă este **2.100 lei**, iar plățile totale sunt **12.100 lei**. Înregistrarea facturii finale fără regularizarea avansului ar dubla parțial datoria și TVA.

## Înregistrări la vânzător

Vânzătorul urmărește avansul prin **419**, distinct de venitul din mărfuri. Se presupune că livrarea finală îndeplinește condițiile recunoașterii venitului.

| Operațiune | Debit | Credit | Sumă, lei |
| --- | --- | --- | ---: |
| Factura de avans, baza | 4111 | 419 | 5.000 |
| TVA colectată aferentă avansului | 4111 | 4427 | 1.050 |
| Încasarea avansului | 5121 | 4111 | 6.050 |
| Factura finală, venitul din mărfuri | 4111 | 707 | 10.000 |
| TVA aferentă valorii integrale | 4111 | 4427 | 2.100 |
| Regularizarea bazei avansului | 419 | 4111 | 5.000 |
| Regularizarea TVA a avansului | 4427 | 4111 | 1.050 |
| Încasarea diferenței | 5121 | 4111 | 6.050 |

La final, venitul este **10.000 lei**, TVA colectată netă este **2.100 lei**, iar încasările sunt **12.100 lei**. Conturile analitice 419 și 4111 sunt închise pentru această tranzacție.

Descărcarea costului mărfurilor vândute, prin 607 = 371, se înregistrează separat la livrare, pe baza costului din gestiunea vânzătorului. Ea nu poate fi calculată din valoarea avansului.

## Documentele și factura finală

Dosarul include contractul sau comanda, factura de avans, plata sau încasarea, documentele de livrare și factura finală cu regularizarea. Documentul final trebuie să permită identificarea avansului și să prezinte corect baza, taxa și suma rămasă.

Factura de avans și factura finală se transmit prin RO e-Factura când operațiunea intră în sfera sistemului. Prezența facturii în SPV nu înlocuiește verificarea livrării și a regularizării. Importul automat trebuie să prevină atât dublarea documentului, cât și omiterea stornării avansului.

## Situații speciale și controlul soldurilor

Pentru avansuri destinate imobilizărilor se folosesc conturile specifice, precum cele pentru avansuri de imobilizări, nu 4091 în mod nediferențiat. Pentru prestări de servicii se alege analiticul și contul final corespunzător naturii prestației.

În valută se analizează caracterul monetar sau nemonetar al avansului și regulile cursului, fără a reevalua automat orice sold. În cazul anulării contractului, restituirea banilor și corectarea facturii sunt documentate separat.

La închidere, soldul 409 sau 419 trebuie explicat prin contracte și stadiul livrării. Un avans vechi nu se trece automat pe cheltuieli ori venituri doar pentru a elimina soldul. Se verifică drepturile contractuale, recuperabilitatea și consecințele fiscale.

**Bază legală:** OMFP nr. 1802/2014, funcțiunea conturilor 409, 419, 401 și 4111; Codul fiscal, art. 282, 291, 297, 299 și 319; OUG nr. 120/2021.`;
