import test from "node:test";
import assert from "node:assert/strict";
import { getArticle } from "../src/data/articles";

function content(slug: string) {
  const article = getArticle(slug);
  assert.ok(article, slug);
  return article.content;
}
const number = (value: string) => Number(value.replace(/\*/g, "").replace(/\./g, "").replace(",", ".").trim());
function ledger(slug: string) {
  const balances = new Map<string, number>();
  for (const line of content(slug).split("\n")) {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== 4 || !/^\d{3,4}(?:\/angajat)?$/.test(cells[1]) || !/^\d{3,4}(?:\/angajat)?$/.test(cells[2])) continue;
    const amount = number(cells[3]);
    assert.ok(Number.isFinite(amount) && amount > 0, line);
    const debit = cells[1].split("/")[0], credit = cells[2].split("/")[0];
    balances.set(debit, (balances.get(debit) ?? 0) + amount);
    balances.set(credit, (balances.get(credit) ?? 0) - amount);
  }
  assert.ok(balances.size > 0, slug);
  return balances;
}

test("obiectele de inventar separă stocul rămas, consumul și stingerea furnizorului", () => {
  const b = ledger("obiecte-inventar-303-603-8035");
  assert.equal(b.get("401"), 0);
  assert.equal(b.get("303"), 2 * 300);
  assert.equal(b.get("603"), 8 * 300);
  assert.equal(b.get("4426"), 3000 * 0.21);
  assert.equal(b.get("303")! + b.get("603")!, 3000);
});

test("avansul angajatului se stinge prin cheltuieli documentate și restituirea numerarului", () => {
  const b = ledger("avans-trezorerie-542-decont-cheltuieli");
  assert.equal(b.get("542"), 0);
  assert.equal(b.get("401"), 0);
  assert.equal(b.get("5311"), -(300 + 63 + 100 + 21));
  assert.equal(b.get("4426"), (300 + 100) * 0.21);
  assert.equal(-b.get("5311")!, b.get("3028")! + b.get("628")! + b.get("4426")!);
});

test("subvenția pentru investiție se reia proporțional și nu reduce costul activului", () => {
  const b = ledger("subventii-investitii-475-amortizare");
  assert.equal(b.get("404"), 0);
  assert.equal(b.get("4451"), 0);
  assert.equal(b.get("2131"), 120000);
  assert.equal(b.get("6811"), 120000 / 60);
  assert.equal(-b.get("7584")!, 48000 / 60);
  assert.equal(-b.get("4751")!, 48000 - 48000 / 60);
  assert.equal(b.get("6811")! + b.get("7584")!, (120000 - 48000) / 60);
});

test("POS stinge clientul și tranzitul fără pierderea comisionului sau dublarea vânzării", () => {
  const b = ledger("incasari-pos-card-comisioane-monografie");
  assert.equal(b.get("4111"), 0);
  assert.equal(b.get("5125"), 0);
  assert.equal(b.get("5121")! + b.get("627")!, 1000 * 1.21);
  assert.equal(-b.get("707")! - b.get("607")! - b.get("627")!, 390);
});

test("prima salarială reconciliază netul, reținerile și costul suplimentar al angajatorului", () => {
  const rows = content("prime-bonusuri-salariu-impozitare").split("\n").map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const value = (label: string, column: number) => {
    const row = rows.find((cells) => cells[0] === label);
    assert.ok(row, label);
    return number(row[column]);
  };
  for (const column of [1, 2]) {
    const gross = value("Brut salarial", column);
    const cas = value("CAS 25%", column), cass = value("CASS 10%", column);
    const tax = value("Impozit 10%", column), net = value("Net", column);
    const cam = value("CAM 2,25%, suportată de firmă", column);
    assert.equal(cas, gross * 0.25);
    assert.equal(cass, gross * 0.10);
    assert.equal(tax, (gross - cas - cass) * 0.10);
    assert.equal(net + cas + cass + tax, gross);
    assert.equal(value("Cost total în ipoteză", column), gross + cam);
  }
  assert.equal(value("Net", 2) - value("Net", 1), 1170);
  assert.equal(value("Cost total în ipoteză", 2) - value("Cost total în ipoteză", 1), 2045);
});

test("exemplul de preaviz exclude weekendurile și sărbătorile de la finalul lui noiembrie", () => {
  const days: string[] = [];
  const holidays = new Set(["2026-11-30", "2026-12-01"]);
  for (const day = new Date("2026-11-03T12:00:00Z"); days.length < 20; day.setUTCDate(day.getUTCDate() + 1)) {
    const date = day.toISOString().slice(0, 10);
    if (![0, 6].includes(day.getUTCDay()) && !holidays.has(date)) days.push(date);
  }
  assert.equal(days.at(-1), "2026-12-02");
  const md = content("concediere-desfiintare-post-procedura");
  assert.match(md, /4 \+ 5 \+ 5 \+ 5 = 19/);
  assert.match(md, /Ultima zi este 2 decembrie/);
});
