import { useState } from "react";
import { calculate } from "@/services/calculator.service";
import type { CalculationResult, FormValues } from "@/types/calculator";
import { validate } from "@/utils/validate";

const empty: FormValues = { voltage: "", current: "", rate: "", hours: "1" };

export function useCalculator() {
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [run, setRun] = useState(0);

  const setField = (name: keyof FormValues, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const submit = () => {
    const { input, errors } = validate(values);
    setErrors(errors);
    setResult(input ? calculate(input) : null);
    if (input) setRun((n) => n + 1);
  };

  const reset = () => {
    setValues(empty);
    setErrors([]);
    setResult(null);
  };

  return { values, errors, result, run, setField, submit, reset };
}
