"use client";

import { Results } from "@/components/calculator/Results";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { NumberField } from "@/components/ui/NumberField";
import { fields } from "@/data/site";
import { useCalculator } from "@/hooks/useCalculator";

export function CalculatorForm() {
  const { values, errors, result, setField, submit, reset } = useCalculator();

  return (
    <>
      {errors.length > 0 && <Alert title="Please fix the following errors:" items={errors} />}

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <NumberField
              key={f.name}
              id={f.name}
              label={f.label}
              hint={f.hint}
              placeholder={f.placeholder}
              step={f.step}
              min={f.min}
              value={values[f.name]}
              onChange={(e) => setField(f.name, e.target.value)}
            />
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button type="submit" className="flex-1">Calculate</Button>
          <Button variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </form>

      {result && <Results result={result} />}
    </>
  );
}
