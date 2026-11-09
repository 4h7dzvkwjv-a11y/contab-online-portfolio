import test from "node:test";
import assert from "node:assert/strict";
import { calculatePfa, calculateSalary, calculateSrl, investmentCass, parseAmount, TaxInputError,
  type PfaInput, type SalaryInput, type SrlInput } from "../src/lib/tax-calculators";

const pfa = (changes: Partial<PfaInput> = {}) => calculatePfa({ regime: "real", revenue: 60_000, expenses: 0,
  norm: 0, pensioner: false, minimumCassException: false, voluntaryCas: false, ...changes });
const srl = (changes: Partial<SrlInput> = {}) => calculateSrl({ regime: "micro", revenue: 180_000, expenses: 60_000,
  microBase: 180_000, ceilingRevenue: 180_000, linkedRevenue: 0, microEligible: true, fiscalAdjustment: 0,
  unavailableProfit: 0, distributionPercent: 100, otherCassIncome: 0, ...changes });
const salary = (changes: Partial<SalaryInput> = {}) => calculateSalary({ gross: 5_000, period: "second", baseJob: true,
  dependents: 0, young: false, schoolChildren: 0, minimumRelief: false, ...changes });

for (const [income, cas, cass, tax, total] of [
  [0, 0, 0, 0, 0], [10_000, 0, 2430, 900, 3330], [24_300, 0, 2430, 2187, 4617],
  [48_600, 12_150, 4860, 3159, 20_169], [60_000, 12_150, 6000, 4185, 22_335],
  [97_200, 24_300, 9720, 6318, 40_338], [300_000, 24_300, 29_160, 24_654, 78_114],
]) test("PFA: exemplu fiscal independent pentru venit net " + income, () => {
  const result = pfa({ revenue: income });
  assert.deepEqual([result.cas, result.cass, result.incomeTax, result.totalTax], [cas, cass, tax, total]);
  assert.equal(result.available, income - total);
});

test("PFA: completarea CASS la minim este nedeductibilă; excepția nu elimină CASS pe venit", () => {
  const regular = pfa({ revenue: 10_000 });
  assert.equal(regular.cassOnIncome, 1000);
  assert.equal(regular.cassTopUp, 1430);
  assert.equal(regular.taxableIncome, 9000);
  const employee = pfa({ revenue: 10_000, minimumCassException: true });
  assert.equal(employee.totalTax, 1900);
  assert.equal(employee.incomeTax, 900);
  assert.equal(pfa({ minimumCassException: true }).cas, 12_150);
});

test("PFA: pragurile CAS sunt inclusive și CASS este plafonată la 72 salarii", () => {
  assert.equal(pfa({ revenue: 48_599.99 }).cas, 0);
  assert.equal(pfa({ revenue: 48_600 }).cas, 12_150);
  assert.equal(pfa({ revenue: 97_199.99 }).cas, 12_150);
  assert.equal(pfa({ revenue: 97_200 }).cas, 24_300);
  assert.equal(pfa({ revenue: 291_600 }).cass, 29_160);
  assert.equal(pfa({ revenue: 1_000_000 }).cass, 29_160);
});

test("PFA: pensionarul întregului an este scutit CAS și de completare, nu de CASS pe venit", () => {
  const result = pfa({ revenue: 10_000, pensioner: true, voluntaryCas: true, chosenCasBase: 97_200 });
  assert.deepEqual([result.cas, result.cass, result.cassTopUp, result.incomeTax], [0, 1000, 0, 900]);
});

test("PFA: pierderea nu produce contribuții obligatorii; CAS opțional și baza aleasă sunt explicite", () => {
  const loss = pfa({ revenue: 1000, expenses: 2000 });
  assert.deepEqual([loss.totalTax, loss.available], [0, -1000]);
  assert.equal(pfa({ revenue: 10_000, voluntaryCas: true }).cas, 12_150);
  assert.equal(pfa({ chosenCasBase: 100_000 }).cas, 25_000);
  assert.throws(() => pfa({ revenue: 100_000, chosenCasBase: 48_600 }), TaxInputError);
});

test("PFA la normă: CAS/CASS nu reduc norma și norma minus taxe nu este venit efectiv", () => {
  const result = pfa({ regime: "norm", norm: 60_000 });
  assert.deepEqual([result.cas, result.cass, result.incomeTax, result.totalTax, result.available], [12_150, 6000, 6000, 24_150, null]);
});

test("SRL: două scenarii independente, aceleași venituri și cheltuieli", () => {
  const micro = srl();
  assert.deepEqual([micro.companyTax, micro.dividendGross, micro.dividendTax, micro.dividendNet, micro.cassTotal, micro.personalNet],
    [1800, 118_200, 18_912, 99_288, 9720, 89_568]);
  const profit = srl({ regime: "profit" });
  assert.deepEqual([profit.companyTax, profit.dividendGross, profit.dividendTax, profit.dividendNet, profit.cassTotal, profit.personalNet],
    [19_200, 100_800, 16_128, 84_672, 4860, 79_812]);
});

test("SRL micro: cheltuielile și pierderea nu reduc baza; nu distribuim dintr-o pierdere", () => {
  const result = srl({ revenue: 100_000, expenses: 110_000, microBase: 100_000 });
  assert.deepEqual([result.companyTax, result.profitAfterTax, result.dividendGross, result.personalNet], [1000, -11_000, 0, 0]);
});

test("SRL micro: baza art.53 este distinctă de plafon și eligibilitatea nu este presupusă", () => {
  assert.equal(srl({ microBase: 50_000, ceilingRevenue: 509_850 }).companyTax, 500);
  assert.throws(() => srl({ ceilingRevenue: 509_850.01 }), TaxInputError);
  assert.throws(() => srl({ ceilingRevenue: 500_000, linkedRevenue: 10_000 }), TaxInputError);
  assert.throws(() => srl({ microEligible: false }), TaxInputError);
});

test("SRL: ajustări fiscale, sume indisponibile și distribuire parțială rămân distincte", () => {
  const result = srl({ regime: "profit", fiscalAdjustment: 10_000, unavailableProfit: 20_000, distributionPercent: 50 });
  assert.equal(result.taxBase, 130_000);
  assert.equal(result.companyTax, 20_800);
  assert.equal(result.dividendGross, 39_600);
  assert.equal(result.retainedProfit, 59_600);
  assert.equal(srl({ regime: "profit", fiscalAdjustment: -200_000 }).companyTax, 0);
  assert.equal(srl({ distributionPercent: 0 }).dividendTax, 0);
});

test("CASS dividende: praguri inclusive și venit net, fără dublarea CASS celorlalte venituri", () => {
  for (const [base, expected] of [[24_299.99, 0], [24_300, 2430], [48_599.99, 2430], [48_600, 4860], [97_199.99, 4860], [97_200, 9720]])
    assert.equal(investmentCass(base), expected);
  const result = srl({ otherCassIncome: 100_000 });
  assert.equal(result.cassTotal, 9720);
  assert.equal(result.cassIncrease, 0);
  assert.equal(result.personalNet, result.dividendNet);
  const belowNetThreshold = srl({ revenue: 25_000, expenses: 0, microBase: 25_000 });
  assert.equal(belowNetThreshold.cassTotal, 0); // dividendul brut trece de 24.300, netul nu
});

for (const [period, gross, relief, cas, cass, deduction, tax, net, cam, cost] of [
  ["first", 4050, true, 938, 375, 810, 163, 2574, 84, 4134],
  ["second", 4325, true, 1031, 413, 865, 182, 2699, 93, 4418],
  ["second", 5000, false, 1250, 500, 562, 269, 2981, 113, 5113],
  ["second", 10_000, false, 2500, 1000, 0, 650, 5850, 225, 10_225],
] as const) test("Salarii: exemplu independent " + period + " / " + gross, () => {
  const result = salary({ period, gross, minimumRelief: relief });
  assert.deepEqual([result.cas, result.cass, result.deduction, result.incomeTax, result.net, result.cam, result.employerCost], [cas, cass, deduction, tax, net, cam, cost]);
  assert.equal(result.net + result.totalTax, result.employerCost);
});

test("Salarii: facilitatea dispare peste plafon; funcția netului nu este monotonă", () => {
  assert.equal(salary({ gross: 4600, minimumRelief: true }).net, 2847);
  assert.equal(salary({ gross: 4601, minimumRelief: true }).net, 2765);
  assert.equal(salary({ gross: 4325, minimumRelief: false }).relief, 0);
  assert.equal(salary({ gross: 4325, minimumRelief: true, baseJob: false }).relief, 0);
});

test("Salarii: pragul maxim al deducerii este inclusiv, deducerile suplimentare nu sunt confundate", () => {
  assert.equal(salary({ gross: 6325, dependents: 4 }).basicDeduction, 1081);
  assert.equal(salary({ gross: 6326, dependents: 4 }).basicDeduction, 0);
  assert.equal(salary({ gross: 6325, young: true }).youthDeduction, 649);
  assert.equal(salary({ gross: 6326, young: true }).youthDeduction, 0);
  assert.equal(salary({ gross: 10_000, schoolChildren: 1 }).net, 5860);
  assert.equal(salary({ gross: 10_000, schoolChildren: 1, baseJob: false }).childDeduction, 0);
  assert.equal(salary({ gross: 4325, minimumRelief: true, dependents: 4, young: true, schoolChildren: 1 }).incomeTax, 0);
});

test("Validare: fără rezultate pentru sume invalide și fără transformarea câmpurilor goale în zero", () => {
  assert.equal(parseAmount("1.234,56"), 1234.56);
  assert.equal(parseAmount("1234.56"), 1234.56);
  assert.equal(parseAmount("-1.000,25"), -1000.25);
  for (const value of ["", " ", "abc", "1,2,3", "Infinity", "NaN"]) assert.equal(parseAmount(value), null);
  assert.throws(() => pfa({ revenue: Number.NaN }), TaxInputError);
  assert.throws(() => pfa({ expenses: -1 }), TaxInputError);
  assert.throws(() => srl({ distributionPercent: 101 }), TaxInputError);
  assert.throws(() => salary({ gross: 4050 }), TaxInputError);
  assert.throws(() => salary({ gross: 5000.5 }), TaxInputError);
});
