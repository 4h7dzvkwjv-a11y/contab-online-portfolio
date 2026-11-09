# Contact Contab

Serviciu pentru formularul public, separat de exportul static Sites. Domeniu: `mesaje.contab-online.ro`, rută: `POST /api/contact`. Nu necesită chei Resend și nu acceptă un destinatar din datele vizitatorului.

## Configurație

`wrangler.jsonc` descrie contul, domeniul, bindingul Email Routing către destinația verificată a căsuței Contact, limita de frecvență și observabilitatea. Valorile nu includ credențiale. La publicarea prin API Cloudflare, se încarcă cele două module ESM și metadatele echivalente; schimbările de frontend se publică prin fluxul Sites obișnuit.

## Contract

Cererea JSON include `name`, `email`, `subject`, `message`, `consent: true`, `website: ""` și opțional `context`. Subiectele acceptate sunt declarate în `handler.mjs`. Răspunsul de succes include `ok: true` și o referință; validarea, abuzurile și eșecurile de livrare întorc răspunsuri non-2xx fără confirmare de succes. CORS permite numai originile Contab declarate în handler; formularul nu trimite cookie-uri.

Emailul are expeditor din domeniul Contab, destinatar public `contact@contab-online.ro`, `Reply-To` egal cu adresa validată a vizitatorului și alternative MIME text/HTML. Antetele nu acceptă caractere de control, iar textul este escapat în HTML. Numele românești sunt codificate și împărțite pe cuvinte RFC 2047. Nu se scriu mesajele în jurnalele aplicației și nu se creează o bază de date a solicitărilor.

## Verificare

`npm test` verifică inclusiv validarea, limita corpului, originea, limitarea frecvenței, antetele, escaparea și eșecul livrării. După o schimbare de serviciu se verifică și un mesaj real în căsuța Contact și destinatarul răspunsului. Succesul API atestă acceptarea, nu înlocuiește verificarea primirii.
