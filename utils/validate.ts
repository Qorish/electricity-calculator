import type { CalculatorInput, FormValues } from "@/types/calculator";

export type Validation = { input: CalculatorInput | null; errors: string[] };

const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

export function validate(values: FormValues): Validation {
  const voltage = num(values.voltage);
  const current = num(values.current);
  const rate = num(values.rate);
  const hours = values.hours.trim() === "" ? 1 : Number(values.hours);

  const errors: string[] = [];
  if (!(voltage > 0)) errors.push("Please enter a valid positive voltage value.");
  if (!(current > 0)) errors.push("Please enter a valid positive current value.");
  if (!(rate >= 0)) errors.push("Please enter a valid rate value (0 or more).");
  if (!(Number.isInteger(hours) && hours > 0)) errors.push("Custom hours must be a whole number of 1 or more.");

  return errors.length ? { input: null, errors } : { input: { voltage, current, rate, hours }, errors };
}
