"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Building2, Calculator, Check, ChevronDown, CircleHelp, RotateCcw, ShieldCheck, UserRound, Wallet } from "lucide-react";
import { calculatePfa, calculateSalary, calculateSrl, parseAmount, TaxInputError, type CalculatorKind } from "@/lib/tax-calculators";
import styles from "./tax-calculator.module.css";

const formatMoney = new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const lei = (value: number) => formatMoney.format(value) + " lei";
const choices = [
  { id: "pfa", name: "PFA", description: "Sistem real sau normă", icon: UserRound },
  { id: "micro", name: "SRL micro", description: "Impozit pe venit · 1%", icon: Building2 },
  { id: "profit", name: "SRL pe profit", description: "Impozit pe profit · 16%", icon: Wallet },
  { id: "salary", name: "Salarii", description: "Din brut în net", icon: Calculator },
] as const;

const defaults = {
  revenue: "120000", expenses: "20000", norm: "60000", chosenCasBase: "48600",
  srlRevenue: "180000", srlExpenses: "60000", microBase: "180000", ceilingRevenue: "180000", linkedRevenue: "0",
  fiscalAdjustment: "0", unavailableProfit: "0", distributionPercent: "100", otherCassIncome: "0",
  gross: "5000", schoolChildren: "0",
};
type Field = keyof typeof defaults;
type Row = { name: string; value: number; detail?: string };
type View = { label: string; value: number; period: string; rows: Row[]; totalTax: number; steps: string[]; note?: string; monthly?: number; net?: number };

function NumberField({ id, label, value, onChange, help, unit = "lei / an", error }: {
  id: Field; label: string; value: string; onChange: (value: string) => void; help?: string; unit?: string; error?: TaxInputError;
}) {
  const invalid = error?.field === id;
  return <div className={styles.field}>
    <label htmlFor={"tax-" + id}>{label}</label>
    <div className={styles.inputWrap} data-invalid={invalid || undefined}>
      <input id={"tax-" + id} type="text" inputMode="decimal" autoComplete="off" spellCheck={false} maxLength={22}
        value={value} onChange={event => onChange(event.target.value)} aria-invalid={invalid || undefined}
        aria-describedby={(help ? "tax-help-" + id : "") + (invalid ? " tax-calculation-error" : "")} />
      <span>{unit}</span>
    </div>
    {help ? <p id={"tax-help-" + id}>{help}</p> : null}
  </div>;
}

function Toggle({ checked, onChange, children, help }: { checked: boolean; onChange: (checked: boolean) => void; children: ReactNode; help?: string }) {
  return <label className={styles.toggle}><input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} />
    <span><span>{children}</span>{help ? <small>{help}</small> : null}</span></label>;
}

export function TaxCalculator() {
  const [kind, setKind] = useState<CalculatorKind>("pfa");
  const [values, setValues] = useState(defaults);
  const [pfaRegime, setPfaRegime] = useState<"real" | "norm">("real");
  const [pensioner, setPensioner] = useState(false);
  const [minimumCassException, setMinimumCassException] = useState(false);
  const [voluntaryCas, setVoluntaryCas] = useState(false);
  const [customCas, setCustomCas] = useState(false);
  const [microEligible, setMicroEligible] = useState(false);
  const [customMicroBase, setCustomMicroBase] = useState(false);
  const [customCeiling, setCustomCeiling] = useState(false);
  const [period, setPeriod] = useState<"first" | "second">("second");
  const [baseJob, setBaseJob] = useState(true);
  const [dependents, setDependents] = useState(0);
  const [young, setYoung] = useState(false);
  const [minimumRelief, setMinimumRelief] = useState(false);
  const minimum = period === "first" ? 4050 : 4325;

  function update(id: Field, value: string) { setValues(previous => ({ ...previous, [id]: value })); }
  function number(id: Field) {
    const value = parseAmount(values[id]);
    if (value === null) throw new TaxInputError(id, "Completează suma în cifre. Poți folosi virgula pentru bani: 1.234,56.");
    return value;
  }
  let view: View | undefined;
  let error: TaxInputError | undefined;
  try {
    if (kind === "pfa") {
      const result = calculatePfa({ regime: pfaRegime, revenue: pfaRegime === "real" ? number("revenue") : 0,
        expenses: pfaRegime === "real" ? number("expenses") : 0, norm: pfaRegime === "norm" ? number("norm") : 0,
        pensioner, minimumCassException, voluntaryCas, chosenCasBase: customCas && !pensioner ? number("chosenCasBase") : undefined });
      view = { label: pfaRegime === "real" ? "Rezultat după taxe" : "Total obligații PFA", value: result.available ?? result.totalTax,
        period: "pentru anul 2026", totalTax: result.totalTax, net: result.available ?? undefined,
        monthly: result.available === null ? undefined : result.available / 12,
        rows: [ { name: pfaRegime === "real" ? "Venit net înainte de contribuții" : "Normă anuală ajustată", value: result.income },
          { name: "CAS · pensie", value: result.cas, detail: "25% × " + lei(result.casBase) },
          { name: "CASS · sănătate", value: result.cass, detail: result.cassTopUp ? "Include completarea la minim: " + lei(result.cassTopUp) : "10% din baza anuală, în limita a 72 salarii minime" },
          { name: "Impozit pe venit · 10%", value: result.incomeTax } ],
        steps: pfaRegime === "real" ? ["Venit net = încasări − cheltuieli = " + lei(result.income),
          "Bază impozit = max(0, venit net − CAS − CASS aferentă venitului) = " + lei(result.taxableIncome),
          "Impozit = 10% × baza impozabilă = " + lei(result.incomeTax),
          "CASS de completare la minim nu se deduce din baza impozitului."]
          : ["Impozit = 10% × norma ajustată = " + lei(result.incomeTax), "CAS și CASS se calculează separat, fără a reduce norma impozabilă."],
        note: pfaRegime === "norm" ? "Norma fiscală nu este încasarea efectivă. De aceea, rezultatul arată obligațiile, fără a prezenta norma minus taxe ca venit disponibil." : undefined };
    } else if (kind === "micro" || kind === "profit") {
      const revenue = number("srlRevenue");
      const result = calculateSrl({ regime: kind, revenue, expenses: number("srlExpenses"),
        microBase: kind === "micro" && customMicroBase ? number("microBase") : revenue,
        ceilingRevenue: kind === "micro" && customCeiling ? number("ceilingRevenue") : revenue,
        linkedRevenue: kind === "micro" ? number("linkedRevenue") : 0, microEligible,
        fiscalAdjustment: kind === "profit" ? number("fiscalAdjustment") : 0,
        unavailableProfit: number("unavailableProfit"), distributionPercent: number("distributionPercent"), otherCassIncome: number("otherCassIncome") });
      view = { label: "Dividende nete după CASS alocată", value: result.personalNet, period: "pentru scenariul anual 2026",
        totalTax: result.totalTax, net: result.personalNet, monthly: result.personalNet / 12,
        rows: [{ name: "Profit contabil înainte de impozit", value: result.accountingProfit },
          { name: kind === "micro" ? "Impozit micro · 1%" : "Impozit pe profit · 16%", value: result.companyTax, detail: "Bază fiscală: " + lei(result.taxBase) },
          { name: "Dividende brute în scenariu", value: result.dividendGross }, { name: "Impozit pe dividende · 16%", value: result.dividendTax },
          { name: "CASS alocată dividendelor", value: result.cassIncrease, detail: "Diferența față de CASS aferentă celorlalte venituri" },
          { name: "Rezultat rămas în firmă", value: result.retainedProfit }],
        steps: ["Profit după impozitul firmei = " + lei(result.profitAfterTax),
          "Scenariu disponibil după sumele indisponibile = " + lei(result.distributableScenario),
          "Dividende nete înainte de CASS = " + lei(result.dividendNet),
          "CASS totală anuală pentru coșul art.155(1)c–h = " + lei(result.cassTotal),
          "CASS fără dividendele acestui scenariu = " + lei(result.cassWithoutDividends),
          "CASS alocată aici = diferența dintre cele două valori. Nu este o categorie fiscală separată."],
        note: "Medie de buget, fără a reprezenta un calendar de plată a dividendelor. Costurile salariale se includ în cheltuieli; nu sunt calculate din nou aici." };
    } else {
      const result = calculateSalary({ gross: number("gross"), period, baseJob, dependents, young, schoolChildren: baseJob ? number("schoolChildren") : 0, minimumRelief });
      view = { label: "Salariu net", value: result.net, period: "pentru o lună completă", totalTax: result.totalTax, net: result.net,
        rows: [{ name: "Salariu brut", value: number("gross") }, { name: "CAS · pensie · 25%", value: result.cas },
          { name: "CASS · sănătate · 10%", value: result.cass }, { name: "Deduceri personale aplicate", value: result.deduction },
          { name: "Impozit pe venit · 10%", value: result.incomeTax }, { name: "CAM angajator · 2,25%", value: result.cam },
          { name: "Cost total angajator", value: result.employerCost }],
        steps: ["Sumă neimpozabilă aplicată = " + lei(result.relief), "Bază CAS / CASS / CAM = " + lei(result.socialBase),
          "Deducere de bază = " + lei(result.basicDeduction) + "; tineri = " + lei(result.youthDeduction) + "; copii = " + lei(result.childDeduction),
          "Bază impozit după deduceri = " + lei(result.taxableIncome), "Net = brut − CAS − CASS − impozit = " + lei(result.net)],
        note: "Contribuțiile, deducerile și impozitul salarial sunt calculate la leu pentru scenariul D112. CAM este suportată de angajator, separat de brut." };
    }
  } catch (caught) {
    if (!(caught instanceof TaxInputError)) throw caught;
    const field = kind === "micro" || kind === "profit"
      ? ({ revenue: "srlRevenue", expenses: "srlExpenses", ...(!customCeiling ? { ceilingRevenue: "srlRevenue" } : {}) } as Record<string, string>)[caught.field] ?? caught.field
      : caught.field;
    error = new TaxInputError(field, caught.message);
  }

  function field(id: Field, label: string, help?: string, unit?: string) {
    return <NumberField key={id} id={id} label={label} value={values[id]} onChange={value => update(id, value)} help={help} unit={unit} error={error} />;
  }
  function reset() {
    const keys: Field[] = kind === "pfa" ? ["revenue", "expenses", "norm", "chosenCasBase"] : kind === "salary" ? ["gross", "schoolChildren"]
      : ["srlRevenue", "srlExpenses", "microBase", "ceilingRevenue", "linkedRevenue", "fiscalAdjustment", "unavailableProfit", "distributionPercent", "otherCassIncome"];
    setValues(previous => { const next = { ...previous }; for (const key of keys) next[key] = defaults[key]; return next; });
    if (kind === "pfa") { setPensioner(false); setMinimumCassException(false); setVoluntaryCas(false); setCustomCas(false); }
    else if (kind === "salary") { setPeriod("second"); setBaseJob(true); setDependents(0); setYoung(false); setMinimumRelief(false); }
    else { setMicroEligible(false); setCustomMicroBase(false); setCustomCeiling(false); }
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const index = choices.findIndex(choice => choice.id === kind);
    const next = event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : -1;
    if (next < 0) return;
    event.preventDefault(); setKind(choices[next].id); document.getElementById("tax-tab-" + choices[next].id)?.focus();
  }
  const active = choices.find(choice => choice.id === kind)!;
  const percentage = view && view.net !== undefined && view.net >= 0 && view.net + view.totalTax > 0 ? view.net / (view.net + view.totalTax) * 100 : null;

  return <div className={styles.calculator}>
    <div className={styles.choices} role="tablist" aria-label="Alege calculatorul fiscal">
      {choices.map(({ id, name, description, icon: Icon }) => <button key={id} id={"tax-tab-" + id} role="tab" type="button"
        aria-selected={kind === id} aria-controls="tax-panel" tabIndex={kind === id ? 0 : -1} onKeyDown={tabKey} onClick={() => setKind(id)}>
        <Icon size={22} strokeWidth={1.7} aria-hidden="true" /><span><strong>{name}</strong><small>{description}</small></span>{kind === id ? <Check size={16} aria-hidden="true" /> : null}
      </button>)}
    </div>
    <div className={styles.workspace} id="tax-panel" role="tabpanel" aria-labelledby={"tax-tab-" + kind}>
      <section className={styles.formCard} aria-label={"Configurare " + active.name}>
        <div className={styles.cardHeading}><div><p>01 / CONFIGUREAZĂ</p><h2>{kind === "salary" ? "Datele salariului" : "Datele activității"}</h2></div>
          <button type="button" onClick={reset} className={styles.reset} aria-label="Resetează acest calcul" title="Resetează acest calcul"><RotateCcw size={17} /></button></div>
        <form onSubmit={event => event.preventDefault()} noValidate>
          {kind === "pfa" ? <>
            <div className={styles.segment} role="group" aria-label="Regim PFA"><button type="button" aria-pressed={pfaRegime === "real"} onClick={() => setPfaRegime("real")}>Sistem real</button><button type="button" aria-pressed={pfaRegime === "norm"} onClick={() => setPfaRegime("norm")}>Normă de venit</button></div>
            {pfaRegime === "real" ? <>{field("revenue", "Încasări anuale", "Venituri fiscale ale activității, fără TVA colectată.")}{field("expenses", "Cheltuieli deductibile", "Fără CAS și CASS personale; acestea se calculează separat.")}</>
              : field("norm", "Normă anuală ajustată", "Introdu norma oficială după coeficienți și ajustarea perioadei de activitate, nu încasările efective.")}
            <details className={styles.options}><summary><CircleHelp size={17} /> Situația personală și CAS <ChevronDown size={16} /></summary><div>
              <Toggle checked={pensioner} onChange={setPensioner} help="Scutire CAS; CASS rămâne 10% din venitul relevant, fără completare la minim.">Pensionar pe întregul an 2026</Toggle>
              {!pensioner ? <><Toggle checked={minimumCassException} onChange={setMinimumCassException} help="De exemplu: salarii brute anuale de cel puțin 24.300 lei sau alte venituri pentru care datorezi CASS la cel puțin 6 salarii minime. Nu elimină CASS de 10% pe PFA.">Excepție de la completarea CASS la minim</Toggle>
                <Toggle checked={voluntaryCas} onChange={setVoluntaryCas} help="Sub 48.600 lei, alegi plata CAS la o bază de minimum 48.600 lei.">Optez pentru CAS și sub plafon</Toggle>
                <Toggle checked={customCas} onChange={checked => { setCustomCas(checked); if (checked) { const income = pfaRegime === "norm" ? parseAmount(values.norm) ?? 0 : (parseAmount(values.revenue) ?? 0) - (parseAmount(values.expenses) ?? 0); update("chosenCasBase", String(income >= 97200 ? 97200 : 48600)); } }} help="Implicit folosim baza minimă obligatorie, de 12 sau 24 salarii minime.">Aleg baza anuală CAS</Toggle>
                {customCas ? field("chosenCasBase", "Bază anuală CAS aleasă") : null}</> : null}
            </div></details>
            <p className={styles.scope}><ShieldCheck size={16} /> O activitate independentă, pe întregul an, fără scutiri speciale de impozit, pierderi reportate, cumuluri mixte sau opțiuni CASS care necesită regularizare.</p>
          </> : kind === "micro" || kind === "profit" ? <>
            {field("srlRevenue", "Venituri contabile anuale", "Fără TVA colectată. Nu confunda venitul firmei cu suma retrasă de asociat.")}
            {field("srlExpenses", "Cheltuieli contabile anuale", "Include costul complet al salariilor, contabilitatea și celelalte cheltuieli; fără impozitul firmei calculat aici.")}
            {kind === "profit" ? field("fiscalAdjustment", "Ajustare fiscală netă", "+ cheltuieli nedeductibile; − venituri neimpozabile și deduceri fiscale. Poate fi negativă.") : <details className={styles.options}><summary><CircleHelp size={17} /> Baza micro și plafonul <ChevronDown size={16} /></summary><div>
              <Toggle checked={customMicroBase} onChange={checked => { setCustomMicroBase(checked); if (checked) update("microBase", values.srlRevenue); }} help="Baza art.53 poate diferi de veniturile contabile; cheltuielile obișnuite nu o reduc.">Baza impozabilă micro este diferită</Toggle>
              {customMicroBase ? field("microBase", "Bază impozabilă micro · art.53") : null}
              <Toggle checked={customCeiling} onChange={checked => { setCustomCeiling(checked); if (checked) update("ceilingRevenue", values.srlRevenue); }} help="Plafonul folosește cifra de afaceri și elementele art.54, separat de baza impozabilă art.53.">Veniturile relevante pentru plafon diferă</Toggle>
              {customCeiling ? field("ceilingRevenue", "Venituri proprii relevante pentru plafon") : null}
              {field("linkedRevenue", "Venituri relevante ale întreprinderilor legate", "Se adună la veniturile proprii pentru plafonul de 509.850 lei în 2026.")}
            </div></details>}
            <div className={styles.divider} />
            <h3 className={styles.subheading}>Dividendele asociatului</h3>
            {field("unavailableProfit", "Sume indisponibile distribuirii", "Rezerve legale/statutare, pierderi de acoperit și alte sume care nu pot fi distribuite.")}
            {field("distributionPercent", "Procent din suma disponibilă", "Scenariu de distribuire eligibilă plătită în 2026, către o persoană fizică rezidentă adultă, fără excepții speciale CASS.", "%")}
            <details className={styles.options}><summary><CircleHelp size={17} /> Alte venituri pentru CASS <ChevronDown size={16} /></summary><div>
              {field("otherCassIncome", "Alte venituri relevante · art.155(1)c–h", "Introdu baza relevantă pentru CASS: alte dividende nete, chirii, investiții etc. Fără salarii, pensii sau PFA. Implicit: 0.")}
            </div></details>
            {kind === "micro" ? <div className={styles.eligibility}><Toggle checked={microEligible} onChange={setMicroEligible} help="Regimul se aplică pe întregul an, cu condițiile legale îndeplinite.">Societatea este eligibilă pentru micro în 2026</Toggle>
              <details><summary>Ce condiții verific?</summary><p>Plafon de 100.000 euro cumulat cu întreprinderile legate, salariat echivalent normei întregi sau mandat eligibil, capital privat, regula unei singure micro pentru dețineri de peste 25%, situații financiare depuse și activitate eligibilă. Nu include ieșirea din regim în cursul anului.</p></details></div> : null}
            <p className={styles.scope}><ShieldCheck size={16} /> Scenariu fără TVA, pierderi fiscale reportate, credite fiscale sau impozit minim. Distribuirea presupune îndeplinirea condițiilor legale privind rezervele, pierderile și activul net.</p>
          </> : <>
            <div className={styles.field}><label htmlFor="tax-period">Perioada din 2026</label><select id="tax-period" value={period} onChange={event => setPeriod(event.target.value as "first" | "second")}><option value="second">Iulie – decembrie · minim 4.325 lei</option><option value="first">Ianuarie – iunie · minim 4.050 lei</option></select></div>
            {field("gross", "Salariu brut lunar", "Pentru o lună completă cu normă întreagă, în lei întregi.", "lei / lună")}
            <button className={styles.preset} type="button" onClick={() => { update("gross", String(minimum)); setBaseJob(true); setMinimumRelief(true); }}>Exemplu la salariul minim <ArrowDownRight size={16} /></button>
            <Toggle checked={baseJob} onChange={setBaseJob}>Acesta este locul funcției de bază</Toggle>
            {baseJob ? <><div className={styles.field}><label htmlFor="tax-dependents">Persoane în întreținere</label><select id="tax-dependents" value={dependents} onChange={event => setDependents(Number(event.target.value))}>{[0, 1, 2, 3, 4].map(count => <option key={count} value={count}>{count === 4 ? "4 sau mai multe" : count === 0 ? "Nicio persoană" : count + (count === 1 ? " persoană" : " persoane")}</option>)}</select><p>Persoane care îndeplinesc condițiile art.77 din Codul fiscal.</p></div>
              <details className={styles.options}><summary><CircleHelp size={17} /> Deduceri și facilitatea la minim <ChevronDown size={16} /></summary><div>
                <Toggle checked={minimumRelief} onChange={setMinimumRelief} help={"Salariul de bază contractual este exact " + minimum.toLocaleString("ro-RO") + " lei și nu a fost diminuat în perioada legală. Facilitatea se aplică numai în limita brutului de " + (period === "first" ? "4.300" : "4.600") + " lei."}>Îndeplinesc condițiile facilității de {period === "first" ? "300" : "200"} lei</Toggle>
                <Toggle checked={young} onChange={setYoung} help="Deducere suplimentară de 15% din minim, în limita brutului de minim + 2.000 lei.">Eligibil pentru deducerea de până la 26 de ani</Toggle>
                {field("schoolChildren", "Copii eligibili pentru deducerea școlară", "100 lei deducere/copil sub 18 ani înscris într-o unitate de învățământ; un singur părinte și un singur angajator.", "copii")}
              </div></details></> : null}
            <p className={styles.scope}><ShieldCheck size={16} /> CIM cu normă întreagă, lună completă, condiții normale de muncă. Fără tichete, beneficii în natură, concedii medicale, scutiri speciale sau part-time.</p>
          </>}
          {error ? <p className={error.field === "microEligible" ? styles.pending : styles.validation} id="tax-calculation-error" role={error.field === "microEligible" ? "status" : "alert"}>{error.message}</p> : null}
        </form>
        <p className={styles.privacy}><ShieldCheck size={14} /> Sumele se calculează în browser și nu sunt trimise către Contab.</p>
      </section>

      <aside className={styles.resultColumn} aria-label="Rezultatul calculului">
        <div className={styles.resultCard}>
          <div className={styles.resultTop}><span>02 / REZULTATUL TĂU</span><span className={styles.year}>2026</span></div>
          {view ? <>
            <p className={styles.resultLabel}>{view.label}</p><p className={styles.resultAmount}>{formatMoney.format(view.value)}<span>lei</span></p><p className={styles.resultPeriod}>{view.period}</p>
            {view.monthly !== undefined ? <div className={styles.monthly}><ArrowUpRight size={17} /> {lei(view.monthly)} <span>/ lună, în medie</span></div> : null}
            {percentage !== null ? <div className={styles.allocation} aria-hidden="true"><span style={{ width: percentage + "%" }} /><span style={{ width: (100 - percentage) + "%" }} /></div> : null}
            <dl className={styles.breakdown}>{view.rows.map(row => <div key={row.name}><dt>{row.name}{row.detail ? <small>{row.detail}</small> : null}</dt><dd>{lei(row.value)}</dd></div>)}</dl>
            <div className={styles.total}><span>{kind === "salary" ? "Total taxe și contribuții" : "Taxe calculate în acest scenariu"}</span><strong>{lei(view.totalTax)}</strong></div>
            <p className={styles.rounding}>{kind === "salary" ? "Calcul salarial la leu, cu rotunjirile scenariului D112." : "Estimare în lei și bani, înaintea definitivării sumelor din declarațiile fiscale."}</p>
          </> : <div className={styles.empty}><Calculator size={38} strokeWidth={1.3} /><h3>Configurăm calculul.</h3><p>{error?.message ?? "Completează datele activității pentru a vedea rezultatul."}</p></div>}
        </div>
        {view ? <details className={styles.calculationSteps} open><summary>Vezi pașii de calcul <ChevronDown size={16} /></summary><ol>{view.steps.map(step => <li key={step}>{step}</li>)}</ol>{view.note ? <p>{view.note}</p> : null}</details> : null}
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{view ? view.label + ": " + lei(view.value) : "Calcul indisponibil: " + error?.message}</p>
      </aside>
    </div>
  </div>;
}
