import test from "node:test";
import assert from "node:assert/strict";
import { getArticle } from "../src/data/articles";

function content(slug: string) {
  const article = getArticle(slug);
  assert.ok(article, slug);
  return article.content;
}
function number(value: string) {
  return Number(
    value.replace(/\*/g, "").replace(/−/g, "-").replace(/\./g, "").replace(",", ".").trim(),
  );
}
function section(markdown: string, prefix: string) {
  const found = markdown.split(/^## /m).find((part) => part.startsWith(prefix));
  assert.ok(found, prefix);
  return found;
}
function ledger(markdown: string) {
  const balances = new Map<string, number>();
  const add = (account: string, amount: number) =>
    balances.set(account, (balances.get(account) ?? 0) + amount);
  let count = 0;
  for (const line of markdown.split("\n")) {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (
      cells.length !== 4 ||
      !/^\d{3,4}$/.test(cells[1]) ||
      !/^\d{3,4}$/.test(cells[2])
    )
      continue;
    const amount = number(cells[3]);
    assert.ok(Number.isFinite(amount) && amount > 0, line);
    add(cells[1], amount);
    add(cells[2], -amount);
    count++;
  }
  assert.ok(count > 0, "Lipsesc înregistrările contabile");
  return balances;
}
function amountInTable(markdown: string, label: string) {
  const row = markdown
    .split("\n")
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim()),
    )
    .find((cells) => cells[0] === label);
  assert.ok(row, label);
  return number(row.at(-1)!);
}

// Aceste controale verifică aritmetica și soldurile exemplelor publicate.
// Încadrarea legală este documentată separat în docs/CONTENT-REVIEW.md.
test("monografia stocurilor închide partenerii și explică stocul net", () => {
  const b = ledger(content("monografia-contabila-stocuri"));
  assert.equal(b.get("401"), 0);
  assert.equal(b.get("4111"), 0);
  assert.equal(b.get("371"), 60 * 50);
  assert.equal(b.get("607"), 40 * 50);
  assert.equal(-(b.get("707") ?? 0) - (b.get("607") ?? 0), 1000);
  assert.equal((b.get("371") ?? 0) + (b.get("397") ?? 0), 2700);
  assert.equal(b.get("4426"), 5000 * 0.21);
});

test("balanța exemplificată respectă cele patru egalități și soldurile fiecărui cont", () => {
  const md = content("balanta-de-verificare-cum-se-citeste");
  const rows = md.split("\n").map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const balances = rows.filter((row) => row.length === 9 && /^\d{3,4}$/.test(row[0]));
  assert.equal(balances.length, 8);
  const sums = Array<number>(8).fill(0);
  for (const row of balances) {
    const values = row.slice(1).map(number);
    values.forEach((value, index) => { sums[index] += value; });
    assert.equal(values[4], values[0] + values[2], `${row[0]}: total debit`);
    assert.equal(values[5], values[1] + values[3], `${row[0]}: total credit`);
    assert.equal(values[6] - values[7], values[4] - values[5], `${row[0]}: sold`);
  }
  for (let index = 0; index < 8; index += 2) assert.equal(sums[index], sums[index + 1]);
  const total = rows.find((row) => row[0] === "**Total**");
  assert.ok(total);
  assert.deepEqual(total.slice(1).map(number), sums);
  assert.equal(sums[2], 22990);
  assert.equal(sums[4], 27990);
  assert.equal(sums[6], 17100);
  const b = ledger(md);
  assert.equal(5000 + b.get("5121")!, 8630);
  assert.equal(b.get("4111"), 6050);
  assert.equal(-b.get("704")! - b.get("628")!, 8000);
});

test("creditarea și rambursarea lasă datoria de 18.000 lei fără a crea profit", () => {
  const b = ledger(content("creditare-firma-asociat-monografie"));
  assert.equal(b.get("5121"), 30000 - 12000);
  assert.equal(b.get("4551"), -(30000 - 12000));
  assert.ok([...b.keys()].every((account) => !/^[67]/.test(account)));
});

test("salariul minim din al doilea semestru se reconciliază cu deducerile și rotunjirile publicate", () => {
  const md = section(content("salariul-minim-2026-brut-net"), "Calcul complet pentru iulie–decembrie:");
  const gross = amountInTable(md, "Venit brut");
  const exempt = amountInTable(md, "Sumă netaxabilă");
  const base = amountInTable(md, "Bază CAS, CASS și CAM");
  const cas = amountInTable(md, "CAS");
  const cass = amountInTable(md, "CASS");
  const deduction = amountInTable(md, "Deducere personală de bază");
  const taxable = amountInTable(md, "Bază impozit");
  const tax = amountInTable(md, "Impozit pe salariu");
  const net = amountInTable(md, "Salariu net");
  const cam = amountInTable(md, "CAM");
  assert.equal(base, gross - exempt);
  assert.equal(cas, Math.round(base * 0.25));
  assert.equal(cass, Math.round(base * 0.1));
  assert.equal(deduction, gross * 0.2);
  assert.equal(taxable, gross - exempt - cas - cass - deduction);
  assert.equal(tax, Math.round(taxable * 0.1));
  assert.equal(net, gross - cas - cass - tax);
  assert.equal(cam, Math.round(base * 0.0225));
  assert.equal(amountInTable(md, "Cost total al angajatorului"), gross + cam);
});

test("storno și refacturarea lasă numai baza și TVA corecte", () => {
  const md = section(content("corectare-factura-storno-efactura"), "Exemplu complet:");
  const rows = md.split("\n").map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const initial = rows.find((row) => row[0] === "Factura inițială");
  const reversal = rows.find((row) => row[0] === "Factura care inversează integral documentul inițial");
  const corrected = rows.find((row) => row[0] === "Factura cu valorile corecte");
  const cumulative = rows.find((row) => row[0] === "Efect cumulat al tuturor documentelor");
  assert.ok(initial && reversal && corrected && cumulative);
  for (const row of [initial, reversal, corrected]) {
    const [base, vat, total] = row.slice(1).map(number);
    assert.equal(vat, base * 0.21);
    assert.equal(total, base + vat);
  }
  for (let index = 1; index <= 3; index++) {
    assert.equal(number(initial[index]) + number(reversal[index]) + number(corrected[index]), number(cumulative[index]));
  }
  assert.equal(number(initial[3]) - number(cumulative[3]), 242);
});

test("verificarea facturii separă baza, taxa și diferența comercială", () => {
  const md = section(content("cum-verifici-o-factura-inainte-de-plata"), "Exemplu:");
  const rows = md.split("\n").map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const base = rows.find((row) => row[0] === "Bază");
  const vat = rows.find((row) => row[0] === "TVA 21%");
  const total = rows.find((row) => row[0] === "Total");
  assert.ok(base && vat && total);
  for (let index = 1; index <= 3; index++) {
    assert.equal(number(vat[index]), number(base[index]) * 0.21);
    assert.equal(number(total[index]), number(base[index]) + number(vat[index]));
  }
  for (const row of [base, vat, total]) assert.equal(number(row[1]) - number(row[2]), number(row[3]));
});

test("avansul este regularizat integral, fără dublarea TVA la ambele părți", () => {
  const md = content("avansuri-clienti-furnizori");
  const buyer = ledger(section(md, "Înregistrări la cumpărător"));
  const seller = ledger(section(md, "Înregistrări la vânzător"));
  assert.equal(buyer.get("4091"), 0);
  assert.equal(buyer.get("401"), 0);
  assert.equal(buyer.get("371"), 10000);
  assert.equal(buyer.get("4426"), 2100);
  assert.equal(buyer.get("5121"), -12100);
  assert.equal(seller.get("419"), 0);
  assert.equal(seller.get("4111"), 0);
  assert.equal(seller.get("707"), -10000);
  assert.equal(seller.get("4427"), -2100);
  assert.equal(seller.get("5121"), 12100);
});

test("TVA la încasare transferă numai taxa aferentă plății parțiale", () => {
  const md = content("tva-la-incasare-verificari");
  const seller = ledger(section(md, "Exemplu la furnizor:"));
  const buyer = ledger(section(md, "Exemplu la cumpărător:"));
  const partialTax = (6050 * 21) / 121;
  assert.equal(seller.get("4427"), -partialTax);
  assert.equal(seller.get("4428"), -partialTax);
  assert.equal(seller.get("4111"), 6050);
  assert.equal(buyer.get("4426"), partialTax);
  assert.equal(buyer.get("4428"), partialTax);
  assert.equal(buyer.get("401"), -6050);
});

test("statul salarial stinge netul și separă CAM de reținerile salariatului", () => {
  const b = ledger(content("salarizare-salariu-contributii"));
  const gross = b.get("641")!;
  assert.equal(b.get("421"), 0);
  assert.equal(-b.get("4315")!, gross * 0.25);
  assert.equal(-b.get("4316")!, gross * 0.1);
  assert.equal(b.get("646"), gross * 0.0225);
  assert.equal(b.get("5121"), -(gross - 2000 - 800 - 520));
  assert.equal(b.get("641")! + b.get("646")!, 8180);
});

test("D212 deduce contribuțiile o singură dată și totalul se reconciliază", () => {
  const md = content("declaratia-unica-pfa");
  const net = amountInTable(md, "Venit net anual înainte de contribuții");
  const cas = amountInTable(md, "CAS");
  const cass = amountInTable(md, "CASS");
  const taxable = amountInTable(md, "Venit anual impozabil");
  const incomeTax = amountInTable(md, "Impozit pe venit");
  const total = amountInTable(md, "Total impozit, CAS și CASS");
  const available = amountInTable(md, "Venit net după aceste obligații");
  assert.equal(cas, 24 * 4050 * 0.25);
  assert.equal(cass, net * 0.1);
  assert.equal(taxable, net - cas - cass);
  assert.equal(incomeTax, taxable * 0.1);
  assert.equal(total, incomeTax + cas + cass);
  assert.equal(available, net - total);
});

test("factura în valută închide datoria și viramentele fără dublarea diferenței de curs", () => {
  const b = ledger(content("facturi-valuta-diferente-curs"));
  for (const account of ["401", "5124", "581"]) assert.equal(b.get(account), 0, account);
  assert.equal(b.get("371"), 5000);
  assert.equal(b.get("5121"), -5080);
  assert.equal(b.get("6651")! + b.get("7651")!, 80);
});

test("leasingul separă finanțarea de dobândă, administrare și TVA", () => {
  const md = content("leasing-financiar-operational-monografie");
  const finance = ledger(section(md, "Monografie:"));
  assert.equal(finance.get("404"), 0);
  assert.equal(finance.get("167"), -(60000 - 4500));
  assert.equal(finance.get("666")! + finance.get("628")!, 400);
  assert.equal(finance.get("4426"), (4500 + 300 + 100) * 0.21);
  assert.equal(finance.get("5121"), -(4500 + 300 + 100 + 1029));
  const operating = ledger(section(md, "Leasing operațional:"));
  assert.equal(operating.get("401"), 0);
  assert.equal(operating.get("6123"), 2000);
  assert.equal(operating.get("5121"), -2420);
});

test("reducerea ulterioară împarte suma între stocul rămas și 609", () => {
  const b = ledger(section(content("reduceri-comerciale-financiare-monografie"), "Reducerea ulterioară:"));
  assert.equal(b.get("371"), -40 * 10);
  assert.equal(b.get("609"), -60 * 10);
  assert.equal(b.get("4426"), -1000 * 0.21);
  assert.equal(b.get("401"), 1210);
  assert.equal(b.get("371")! + b.get("609")!, -1000);
});

test("factura nesosită se regularizează fără solduri sau cheltuială dublată", () => {
  const b = ledger(content("facturi-nesosite-cont-408"));
  for (const account of ["408", "401", "4428"]) assert.equal(b.get(account), 0, account);
  assert.equal(b.get("628"), 6200);
  assert.equal(b.get("4426"), 6200 * 0.21);
  assert.equal(b.get("5121"), -7502);
});

test("producția vândută lasă numai cele 50 de produse la cost în 345", () => {
  const b = ledger(content("productie-produse-finite-cost-monografie"));
  assert.equal(b.get("345"), (200 - 150) * 120);
  assert.equal(b.get("711"), -b.get("345")!);
  assert.equal(b.get("7015"), -150 * 180);
  assert.equal(b.get("4427"), -150 * 180 * 0.21);
  assert.equal(b.get("4111"), 32670);
});

test("gestiunea la amănunt reconciliază prețul, adaosul și TVA cu costul rămas", () => {
  const b = ledger(content("gestiune-marfa-pret-vanzare-adaos"));
  const retailStock = 6050 + b.get("371")!;
  const markup = 1000 - b.get("378")!;
  const stockVat = 1050 - b.get("4428")!;
  assert.equal(retailStock, 10890);
  assert.equal(markup, 1800);
  assert.equal(stockVat, 1890);
  assert.equal(retailStock - markup - stockVat, 4000 + 8000 - b.get("607")!);
  assert.equal(b.get("607"), 6000 * (1 - 0.2));
});
