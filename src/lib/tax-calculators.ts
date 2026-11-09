/** Reguli pentru veniturile anului 2026. Surse și perimetru: docs/research/calculator-taxe-2026.md. */
export const TAX_YEAR = 2026;
export const ANNUAL_MINIMUM = 4_050;
export const MICRO_CEILING = 509_850;
export const THRESHOLDS = { six: 24_300, twelve: 48_600, twentyFour: 97_200, seventyTwo: 291_600 } as const;
export type CalculatorKind = "pfa" | "micro" | "profit" | "salary";

export class TaxInputError extends Error {
  constructor(public field: string, message: string) { super(message); this.name = "TaxInputError"; }
}

export function money(value: number) { return Math.round((value + Number.EPSILON) * 100) / 100; }

function amount(value: number, field: string, signed = false) {
  if (!Number.isFinite(value) || Math.abs(value) > 1_000_000_000 || (!signed && value < 0))
    throw new TaxInputError(field, "Introdu o sumă validă, între 0 și 1 miliard de lei.");
  return money(value);
}

/** Acceptă atât 1234,56, cât și 1.234,56; nu transformă câmpul gol în zero. */
export function parseAmount(value: string): number | null {
  const text = value.trim().replace(/[\s\u00a0]/g, "");
  if (!text) return null;
  let normalized = text;
  if (/^-?\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?$/.test(text)) normalized = text.replaceAll(".", "").replace(",", ".");
  else if (/^-?\d+(?:[.,]\d{1,2})?$/.test(text)) normalized = text.replace(",", ".");
  else return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

export interface PfaInput {
  regime: "real" | "norm";
  revenue: number;
  expenses: number;
  norm: number;
  pensioner: boolean;
  minimumCassException: boolean;
  voluntaryCas: boolean;
  chosenCasBase?: number;
}

export function calculatePfa(input: PfaInput) {
  const revenue = amount(input.revenue, "revenue");
  const expenses = amount(input.expenses, "expenses");
  const norm = amount(input.norm, "norm");
  const income = input.regime === "norm" ? norm : money(revenue - expenses);
  const positiveIncome = Math.max(0, income);
  let minimumCasBase = positiveIncome >= THRESHOLDS.twentyFour ? THRESHOLDS.twentyFour
    : positiveIncome >= THRESHOLDS.twelve || input.voluntaryCas ? THRESHOLDS.twelve : 0;
  if (input.pensioner) minimumCasBase = 0;
  let casBase = minimumCasBase;
  if (!input.pensioner && input.chosenCasBase !== undefined) {
    const chosen = amount(input.chosenCasBase, "chosenCasBase");
    if (!minimumCasBase && chosen > 0) throw new TaxInputError("chosenCasBase", "Activează opțiunea CAS pentru venituri sub plafon.");
    if (minimumCasBase && chosen < minimumCasBase) throw new TaxInputError("chosenCasBase", "Baza CAS aleasă nu poate fi sub " + minimumCasBase.toLocaleString("ro-RO") + " lei.");
    casBase = chosen;
  }
  const cas = money(casBase * .25);
  const cassOnIncome = money(Math.min(positiveIncome, THRESHOLDS.seventyTwo) * .1);
  const cassTopUp = positiveIncome > 0 && !input.pensioner && !input.minimumCassException
    ? money(Math.max(0, THRESHOLDS.six * .1 - cassOnIncome)) : 0;
  const cass = money(cassOnIncome + cassTopUp);
  // Completarea CASS art.174(6) nu se deduce din baza impozitului în sistem real.
  const taxableIncome = input.regime === "norm" ? norm : money(Math.max(0, income - cas - cassOnIncome));
  const incomeTax = money(taxableIncome * .1);
  const totalTax = money(cas + cass + incomeTax);
  return { income, minimumCasBase, casBase, cas, cassOnIncome, cassTopUp, cass, taxableIncome, incomeTax, totalTax,
    available: input.regime === "real" ? money(income - totalTax) : null };
}

/** Coș art.155(1)c–h: se exclude PFA, salariul și pensia. */
export function investmentCass(income: number) {
  amount(income, "otherCassIncome");
  if (income >= THRESHOLDS.twentyFour) return THRESHOLDS.twentyFour * .1;
  if (income >= THRESHOLDS.twelve) return THRESHOLDS.twelve * .1;
  if (income >= THRESHOLDS.six) return THRESHOLDS.six * .1;
  return 0;
}

export interface SrlInput {
  regime: "micro" | "profit";
  revenue: number;
  expenses: number;
  microBase: number;
  ceilingRevenue: number;
  linkedRevenue: number;
  microEligible: boolean;
  fiscalAdjustment: number;
  unavailableProfit: number;
  distributionPercent: number;
  otherCassIncome: number;
}

export function calculateSrl(input: SrlInput) {
  const revenue = amount(input.revenue, "revenue");
  const expenses = amount(input.expenses, "expenses");
  const unavailable = amount(input.unavailableProfit, "unavailableProfit");
  const other = amount(input.otherCassIncome, "otherCassIncome");
  if (!Number.isFinite(input.distributionPercent) || input.distributionPercent < 0 || input.distributionPercent > 100)
    throw new TaxInputError("distributionPercent", "Procentul distribuit trebuie să fie între 0 și 100.");
  if (input.regime === "micro") {
    if (amount(input.ceilingRevenue, "ceilingRevenue") + amount(input.linkedRevenue, "linkedRevenue") > MICRO_CEILING)
      throw new TaxInputError("ceilingRevenue", "Veniturile relevante cumulate depășesc plafonul de 509.850 lei. Scenariul micro pe tot anul nu se aplică; ieșirea se calculează pe trimestre.");
    if (!input.microEligible) throw new TaxInputError("microEligible", "Confirmă condițiile regimului micro pe tot anul pentru a calcula acest scenariu.");
  }
  const accountingProfit = money(revenue - expenses);
  const taxBase = input.regime === "micro" ? amount(input.microBase, "microBase")
    : money(Math.max(0, accountingProfit + amount(input.fiscalAdjustment, "fiscalAdjustment", true)));
  const companyTax = money(taxBase * (input.regime === "micro" ? .01 : .16));
  const profitAfterTax = money(accountingProfit - companyTax);
  const distributableScenario = money(Math.max(0, profitAfterTax - unavailable));
  const dividendGross = money(distributableScenario * input.distributionPercent / 100);
  const dividendTax = money(dividendGross * .16);
  const dividendNet = money(dividendGross - dividendTax);
  // Pentru pragul CASS contează dividendele PLĂTITE, diminuate cu impozitul reținut.
  const cassTotal = investmentCass(money(dividendNet + other));
  const cassWithoutDividends = investmentCass(other);
  const cassIncrease = money(cassTotal - cassWithoutDividends);
  return { accountingProfit, taxBase, companyTax, profitAfterTax, distributableScenario, dividendGross, dividendTax, dividendNet,
    cassTotal, cassWithoutDividends, cassIncrease, personalNet: money(dividendNet - cassIncrease),
    retainedProfit: money(profitAfterTax - dividendGross), totalTax: money(companyTax + dividendTax + cassIncrease) };
}

export interface SalaryInput {
  gross: number;
  period: "first" | "second";
  baseJob: boolean;
  dependents: number;
  young: boolean;
  schoolChildren: number;
  minimumRelief: boolean;
}

/** D112: obligații la leu, rotunjire aritmetică; contribuții pozitive subunitare întregite la 1. */
function contribution(value: number) { return value > 0 ? Math.max(1, Math.round(value + Number.EPSILON)) : 0; }

export function calculateSalary(input: SalaryInput) {
  const gross = amount(input.gross, "gross");
  const minimum = input.period === "first" ? 4050 : 4325;
  const reliefCap = input.period === "first" ? 4300 : 4600;
  if (!Number.isInteger(gross)) throw new TaxInputError("gross", "Introdu brutul lunar în lei întregi, ca în scenariul D112 calculat aici.");
  if (gross < minimum) throw new TaxInputError("gross", "Pentru o lună completă cu normă întreagă, brutul trebuie să fie cel puțin " + minimum.toLocaleString("ro-RO") + " lei.");
  if (!Number.isInteger(input.dependents) || input.dependents < 0 || input.dependents > 4)
    throw new TaxInputError("dependents", "Selectează între 0 și 4 sau mai multe persoane în întreținere.");
  if (!Number.isInteger(input.schoolChildren) || input.schoolChildren < 0 || input.schoolChildren > 20)
    throw new TaxInputError("schoolChildren", "Introdu un număr întreg de copii, între 0 și 20.");
  const relief = input.minimumRelief && input.baseJob && gross <= reliefCap ? (input.period === "first" ? 300 : 200) : 0;
  const socialBase = gross - relief;
  const cas = contribution(socialBase * .25);
  const cass = contribution(socialBase * .1);
  const cam = contribution(socialBase * .0225);
  const deductionEligible = input.baseJob && gross <= minimum + 2000;
  const bracket = Math.ceil(Math.max(0, gross - minimum) / 50);
  const deductionRate = Math.max(0, [20, 25, 30, 35, 45][input.dependents] - bracket * .5) / 100;
  const basicDeduction = deductionEligible ? Math.round(minimum * deductionRate) : 0;
  const youthDeduction = deductionEligible && input.young ? Math.round(minimum * .15) : 0;
  const childDeduction = input.baseJob ? input.schoolChildren * 100 : 0;
  const incomeBeforeDeductions = Math.max(0, gross - relief - cas - cass);
  const deduction = Math.min(incomeBeforeDeductions, basicDeduction + youthDeduction + childDeduction);
  const taxableIncome = Math.max(0, incomeBeforeDeductions - deduction);
  const incomeTax = Math.round(taxableIncome * .1 + Number.EPSILON);
  const net = money(gross - cas - cass - incomeTax);
  const employerCost = money(gross + cam);
  return { minimum, reliefCap, relief, socialBase, cas, cass, cam, basicDeduction, youthDeduction, childDeduction,
    deduction, taxableIncome, incomeTax, net, employerCost, totalTax: money(cas + cass + cam + incomeTax) };
}
