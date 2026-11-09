export default `## Ce este raportarea SAF-T Active

**Secțiunea Active din D406 este raportarea anuală privind activele, distinctă de D406 periodică și de raportarea Stocuri la cererea ANAF. Termenul ei este termenul legal de depunere a situațiilor financiare pentru exercițiul financiar raportat, conform anexei nr. 4 la OPANAF nr. 1783/2021.** O D406 lunară validă nu dovedește, singură, îndeplinirea fluxului anual Active.

Articolul urmărește pregătirea registrului, maparea și reconcilierea unei societăți care aplică OMFP nr. 1802/2014. Pentru sfera persoanelor obligate și raportarea periodică vezi [ghidul general SAF-T](/articol/saf-t-d406-pregatire-validare). Aici accentul este pe explicația fiecărui activ și a mișcărilor sale anuale, înaintea exportului tehnic.

## Începi cu exercițiul și versiunea tehnică

Stabilește data de început și de sfârșit a exercițiului și regulile care fixează termenul situațiilor financiare. Nu folosi automat termenul D101 sau ultima zi a lunii următoare, aplicabilă fluxului periodic. Pentru exercițiul 2026, pregătirea registrului începe în 2026, chiar dacă depunerea anuală se efectuează în 2027.

[Pagina ANAF D406](https://static.anaf.ro/static/10/Anaf/Declaratii_R/406.html) publică schema XSD, schema explicată și validatorul. La verificarea din 3 noiembrie 2026 sunt indicate actualizări ale validatorului în februarie 2026 și ale documentației tehnice în februarie 2026. Păstrează versiunea folosită la export și nu presupune că o configurare salvată cu ani în urmă rămâne suficientă.

Obligația și conținutul juridic provin din ordin și anexe, iar regulile de câmp din schema curentă. Dacă aplicația comercială numește diferit un câmp, construiește o corespondență documentată, în loc să ghicești din asemănarea denumirilor.

## Registrul de active trebuie să explice contabilitatea

Pentru fiecare poziție urmărește identificatorul stabil, denumirea, categoria, datele achiziției și punerii în funcțiune, costul, durata și metoda amortizării, amortizarea acumulată și modificările relevante. Verifică și datele fiscale cerute de schema aplicabilă, fără a considera că amortizarea contabilă și cea fiscală sunt identice.

Un număr de inventar nu trebuie să fie reutilizat pentru alt bun după casarea celui vechi, dacă aceasta ar rupe trasabilitatea. Dacă un activ este transferat între gestiuni sau centre de cost, verifică dacă aplicația îl menține ca același activ și dacă schimbarea nu creează artificial o achiziție nouă.

| Control pe activ | Ce problemă poate descoperi |
| --- | --- |
| Factură și document de recepție | Cost ori dată greșită, activ omis |
| Punere în funcțiune | Amortizare începută înaintea utilizării legale |
| Valoare brută și amortizare acumulată | Import incomplet al istoricului |
| Amortizare contabilă versus fiscală | Diferență legitimă tratată greșit ca eroare |
| Vânzare, casare sau transfer | Bun ieșit păstrat în registru ori radiat de două ori |
| Modernizare și imobilizare în curs | Mișcare clasificată ca reparație sau achiziție independentă |

Lista este o procedură de control, nu un set de etichete tehnice inventate pentru XML. Câmpurile obligatorii și condițiile de completare se verifică în documentația ANAF a versiunii utilizate.

## Exemplu de reconciliere anuală

Presupunem o singură clasă de active, fără reevaluare și ajustări pentru depreciere. Valoarea brută inițială este **100.000 lei**, intrările anului sunt **30.000 lei**, iar ieșirile la valoarea brută sunt **20.000 lei**. Valoarea brută finală trebuie să fie **100.000 + 30.000 − 20.000 = 110.000 lei**.

Amortizarea acumulată inițială este 40.000 lei. Amortizarea anului este 12.000 lei, iar amortizarea aferentă activelor ieșite este 15.000 lei. Soldul final al amortizării este **40.000 + 12.000 − 15.000 = 37.000 lei**.

| Indicator | Calcul | Final, lei |
| --- | --- | ---: |
| Valoare brută | 100.000 + 30.000 − 20.000 | 110.000 |
| Amortizare acumulată | 40.000 + 12.000 − 15.000 | 37.000 |
| Valoare netă, fără alte ajustări | 110.000 − 37.000 | 73.000 |
| Valoare netă a ieșirilor | 20.000 − 15.000 | 5.000 |

Controlul net este **60.000 inițial + 30.000 intrări − 5.000 ieșiri − 12.000 amortizare = 73.000 lei**. Dacă exportul ar scădea 20.000 lei și din valoarea netă, fără eliminarea amortizării aferente, diferența ar indica o mapare greșită a ieșirii.

## Cum tratezi diferențele contabile și fiscale

Societatea poate avea metode sau durate diferite în evidența contabilă și fiscală, în limitele legale. Registrul trebuie să permită explicarea acestora, iar exportul să preia informația cerută, nu o singură valoare copiată în toate câmpurile disponibile.

Un activ integral amortizat, dar utilizat în continuare, nu dispare numai pentru că valoarea netă este zero. Se menține evidența și se verifică raportarea sa potrivit schemei și situației reale. Similar, un activ casat trebuie să aibă document și înregistrare, nu doar un marcaj tehnic prin care este exclus din export.

Pentru recunoaștere și tratament distinct vezi [imobilizările în curs](/articol/imobilizari-in-curs-231-receptie), [amortizarea contabilă și fiscală](/articol/amortizare-mijloace-fixe) și [vânzarea sau casarea mijloacelor fixe](/articol/casare-vanzare-mijloc-fix-monografie).

## Export, validare și recipisă

1. Definitivează registrul și mișcările exercițiului.
2. Reconcilează totalurile cu balanța și documentele situațiilor financiare.
3. Verifică mapările, identificatorii, datele și câmpurile obligatorii din schema curentă.
4. Generează fișierul pentru fluxul Active, fără a-l confunda cu fișierul periodic.
5. Rulează validatorul, corectează erorile în aplicația-sursă și regenerează.
6. Semnează și transmite prin circuitul D406, apoi descarcă recipisa finală.

Validarea tehnică nu certifică existența activului și corectitudinea amortizării. Un fișier care trece schema poate reflecta costuri incomplete sau o vânzare neînregistrată. De aceea, totalurile reconciliate și documentele se păstrează alături de fișier, nu numai mesajul verde din aplicație.

## Ce faci dacă descoperi o eroare după depunere

Stabilește dacă eroarea este exclusiv de export sau provine din contabilitatea exercițiului. Corectează sursa și documentează efectul asupra raportării și situațiilor financiare, dacă există. Nu edita izolat XML-ul pentru a-l face să coincidă cu un total, lăsând registrul de active nemodificat.

Anexa nr. 4 prevede corectarea prin transmiterea integrală a raportării aferente perioadei, nu numai a rândurilor modificate. Păstrează versiunea inițială, motivul, calculele, noua versiune și recipisele. Evidența trebuie să explice de ce același identificator are o valoare diferită după corecție.

**Bază legală și tehnică:** OPANAF nr. 1783/2021, anexele nr. 1, 3 și 4, forma actualizată; Codul de procedură fiscală, art. 59¹; OMFP nr. 1802/2014; schema și validatorul oficial ANAF D406.`;
