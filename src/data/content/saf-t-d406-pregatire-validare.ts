export default `## Cine raportează și ce verifici înainte de export

SAF-T este fișierul standard de control fiscal transmis prin declarația informativă **D406**, în condițiile art. 59¹ din Codul de procedură fiscală și ale OPANAF nr. 1783/2021. Raportarea cuprinde date contabile și fiscale structurate; nu se rezumă la balanța de verificare sau la facturile emise.

Pentru contribuabilii mici incluși în sfera ordinului, obligația a început la **1 ianuarie 2025**. Încadrarea drept contribuabil mic nu este aceeași cu încadrarea ca microîntreprindere la impozitare. Există categorii exceptate în anexa nr. 5, inclusiv anumite forme de activitate ale persoanelor fizice. Verificarea se face după forma juridică și prevederile ordinului, nu doar după cifra de afaceri.

Pentru o societate existentă care raportează din 2025, în 2026 nu se reia automat perioada de grație. O schimbare de program contabil nu produce o nouă dată legală de intrare în sistem.

## Raportarea periodică, Active și Stocuri

Anexa nr. 4 distinge trei fluxuri, cu termene diferite:

| Flux | Periodicitate | Termen prevăzut de ordin |
| --- | --- | --- |
| D406 periodică | Lunar sau trimestrial, după perioada fiscală TVA | Ultima zi calendaristică a lunii următoare perioadei raportate |
| Active | Anual | Termenul de depunere a situațiilor financiare pentru exercițiul respectiv |
| Stocuri | La solicitarea organului fiscal | Termenul din solicitare, de cel puțin 30 de zile calendaristice |

Contribuabilii cu perioadă TVA semestrială sau anuală raportează D406 trimestrial; cei neînregistrați în scopuri de TVA raportează tot trimestrial. La stabilirea datei efective de depunere se aplică și regulile generale privind termenele care se încheie într-o zi nelucrătoare.

Raportarea Stocuri poate necesita fișiere separate pentru lunile sau trimestrele cerute de organul fiscal. Nu se confundă această secțiune cu simpla transmitere a soldului contului 371 în raportarea periodică.

## Pregătirea datelor și maparea contabilă

Construiește mapări explicite între evidența internă și câmpurile SAF-T: plan de conturi, parteneri, produse, unități de măsură, cote și coduri de taxă, tipuri de documente și tranzacții. Un cod intern de TVA trebuie asociat tratamentului fiscal real al operațiunii, inclusiv scutire sau taxare inversă.

1. Stabilește perioada, entitatea și versiunea schemei publicate de ANAF.
2. Reconcilează balanța finală cu registrele contabile și cu subregistrele.
3. Verifică identificatorii unici ai clienților, furnizorilor, facturilor și înregistrărilor.
4. Revizuiește soldurile inițiale, rulajele și soldurile finale.
5. Documentează mapările pentru conturile analitice și tratamentele de TVA.
6. Blochează exportul final până la înregistrarea corecțiilor perioadei.

Actualizarea unei cote de TVA în program nu trebuie să rescrie codificarea operațiunilor istorice. Păstrează delimitarea între tranzacțiile la 19%, 21% sau alte cote legal aplicabile perioadei lor.

## Exemplu de reconciliere înainte de validare

Pentru contul de mărfuri, în evidența la cost de achiziție: sold inițial 3.000 lei, intrări 5.000 lei și ieșiri la cost de 2.000 lei. Soldul final trebuie să fie **3.000 + 5.000 − 2.000 = 6.000 lei**.

Aceeași valoare trebuie explicată de balanță, fișa contului și evidența de gestiune. TVA deductibilă nu se adaugă costului mărfurilor când există drept integral de deducere. Prețul de vânzare de pe factură nu este costul ieșirii din stoc.

Pentru ansamblul fișierului, verifică egalitatea debitelor și creditelor, continuitatea soldurilor și corelațiile cu documentele-sursă. Reconcilierea cu D300 sau D394 se face pe baze comparabile: diferențele de perioadă, exigibilitate sau sferă de raportare se explică într-un tabel de legătură, fără a forța egalități care nu sunt cerute de lege.

## De la XML la recipisa finală

Validarea are cel puțin două niveluri. Validarea de structură verifică schema, tipurile de câmpuri și regulile tehnice. Controlul contabil verifică dacă datele reflectă integral și corect operațiunile societății. Un XML acceptat tehnic poate conține o mapare fiscală eronată.

Folosește pachetul de asistență și validatorul corespunzător versiunii curente ANAF. După transmitere, urmărește indexul de încărcare și descarcă recipisa. Confirmarea încărcării nu este identică cu validarea fără erori a declarației. Arhivează fișierul transmis, documentul semnat, indexul și recipisa împreună cu raportul de reconciliere.

## Corecții și dosarul de control

Când recipisa semnalează erori, se corectează datele din aplicația-sursă și se retransmite **integral** declarația pentru perioada respectivă, conform anexei nr. 4. Ordinul nu permite corecții parțiale prin transmiterea exclusivă a rândurilor sau câmpurilor modificate.

Dacă ulterior depunerii se schimbă contabilitatea perioadei, evaluează efectul asupra D406 și asupra celorlalte declarații. Păstrează o evidență a versiunilor: motivul corecției, înregistrările modificate, persoana care a verificat și noua recipisă. Evită editarea izolată a XML-ului dacă modificarea lasă contabilitatea și raportarea în dezacord.

## Actualizarea din 3 noiembrie 2026: aplicațiile de control

La verificarea din **4 noiembrie 2026**, [pagina oficială SAF-T](https://static.anaf.ro/static/10/Anaf/Informatii_R/saf_t.htm) afișează **3 noiembrie 2026** pentru actualizarea aplicațiilor de la punctele 6 și 7: verificarea consistenței D406 și evaluarea informațiilor într-un șablon D300. Instrumentele sunt în continuare etichetate „în testare”. Aceasta este data versiunilor, nu o dată nouă de intrare în obligația SAF-T.

| Instrument | Rol | Ce nu dovedește rezultatul |
| --- | --- | --- |
| TestSafT / TestSafTW, punctul 6 | Aplică verificări de consistență asupra XML-urilor D406 | Nu certifică toate tratamentele contabile și fiscale |
| D300_2026, punctul 7 | Transpune informațiile D406 într-un șablon pentru compararea cu decontul TVA | Nu reprezintă prin el însuși depunerea D300 |

[Comunicatul ANAF nr. 782 din 26 august 2026](https://static.anaf.ro/static/3/Anaf/20260826180239_com%20782%2026august2026.pdf) a anunțat lansarea și testarea în septembrie–noiembrie. Precizează că verificările se fac pe calculatorul utilizatorului, fără transmiterea datelor ANAF în această etapă. Observațiile privind instrumentele se pot transmite la saft@anaf.ro.

Păstrează separat XML-ul original, copia verificată, versiunea aplicației și rezultatele. O verificare locală nu înlocuiește validatorul și fluxul de depunere descrise mai sus; raportul de control și recipisa au roluri diferite.

## Cum interpretezi verificarea de consistență

Conform [documentației AppVerifXML](https://static.anaf.ro/static/10/Anaf/Informatii_R/AppVerifXML.pdf), verificarea poate fi rulată prin interfață grafică sau din linia de comandă. Cerința indicată este Java 8 sau ulterior. Se selectează directorul cu XML-urile; cele două interfețe aplică aceleași verificări.

Pentru fiecare fișier analizat se generează un rezultat Header. Dacă sunt identificate erori, apare și un fișier Err, care indică testul ce a semnalat eroarea. Rezultatele sunt CSV, cu separator „#”. Lipsa unui fișier Err arată rezultatul testelor aplicate, nu o confirmare ANAF a întregii situații fiscale.

O observație se investighează în evidența-sursă: document, cont, partener, valoare sau mapare. După remediere refaci exportul și verificarea. Dacă schimbi numai XML-ul, exportul următor poate reproduce problema, iar legătura cu balanța și registrele se pierde.

## Cum compari șablonul D300 cu decontul firmei

[Ghidul D300_2026 pentru Java 17](https://static.anaf.ro/static/10/Anaf/Informatii_R/Ghid_D300_2026_Java17_v2.pdf) descrie încărcarea XML-ului și exportul rezultatului în PDF, XML sau JSON. Pentru o raportare modulară, documentația indică fișierul aferent secțiunii General Ledger Entries. Pagina ANAF arată atât varianta JAR, cât și pachetul D300_2026-3.0; ghidurile au propriile versiuni și nu se presupune că toate au fost revizuite în ziua actualizării aplicației.

Compară aceleași perioade și operațiuni. Un XML lunar și un decont trimestrial cer agregarea lunilor relevante. Analiza se face pe rânduri și după natura operațiunilor, separând regularizările, exigibilitatea și particularitățile fiscale. O diferență nu se elimină prin mutarea artificială a deducerii.

De exemplu, pentru aceeași perioadă, proiectul D300 indică TVA colectată de **21.000 lei**, iar șablonul din SAF-T arată **20.580 lei**. Diferența este **420 lei**. În ipoteza exemplului, o factură cu bază de 2.000 lei și TVA 21% este în jurnal, dar lipsește din export: **2.000 × 21% = 420 lei**. Corectezi cauza exportului, nu reduci automat TVA din decont pentru a obține egalitatea.

Dacă declarațiile au fost deja depuse, identifică întâi raportarea greșită. D406 are procedura sa de corectare integrală, iar D300 are mecanismul legal de regularizare sau corectare aplicabil situației; nu se tratează automat ca formulare rectificative identice. Păstrează explicația diferenței, documentele și rezultatele înainte și după remediere.

**Bază legală și documentație:** OPANAF nr. 1783/2021, anexele nr. 1, 3, 4 și 5, în forma actualizată; Codul de procedură fiscală, art. 59¹; aplicațiile și manualele publicate de ANAF, verificate la 4 noiembrie 2026. Actualizarea instrumentelor nu modifică prin ea însăși termenele legale de raportare.`;
