import type { CalculatorInput, FormValues } from "@/types/calculator";

export type Validation = { input: CalculatorInput | null; errors: string[] };

// Number("1e999") is Infinity, which passes `> 0` and would print as "∞"; treat it as invalid.
const num = (v: string) => {
  const n = v.trim() === "" ? NaN : Number(v);
  return Number.isFinite(n) ? n : NaN;
};

export function validate(values: FormValues): Validation {
  const voltage = num(values.voltage);
  const current = num(values.current);
  const rate = num(values.rate);
  const hours = values.hours.trim() === "" ? 1 : num(values.hours);

  const errors: string[] = [];
  if (!(voltage > 0)) errors.push("Please enter a valid positive voltage value.");
  if (!(current > 0)) errors.push("Please enter a valid positive current value.");
  if (!(rate >= 0)) errors.push("Please enter a valid rate value (0 or more).");
  if (!(Number.isInteger(hours) && hours > 0)) errors.push("Custom hours must be a whole number of 1 or more.");

  return errors.length ? { input: null, errors } : { input: { voltage, current, rate, hours }, errors };
}
