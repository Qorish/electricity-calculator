"use client";

import { LiveMeter } from "@/components/calculator/LiveMeter";
import { Results } from "@/components/calculator/Results";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { NumberField } from "@/components/ui/NumberField";
import { fields } from "@/data/site";
import { useCalculator } from "@/hooks/useCalculator";
import { stagger } from "@/utils/stagger";

export function CalculatorForm({ intro }: Readonly<{ intro: React.ReactNode }>) {
  const { values, errors, result, run, setField, submit, reset } = useCalculator();

  return (
    <>
      <section className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-[var(--gap-columns)]">
        <div className="lg:col-span-7">
          {intro}
          {errors.length > 0 && <Alert title="Please fix the following errors:" items={errors} />}

          <form
            noValidate
            className="rise"
            style={stagger(3)}
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
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="sm:min-w-48">
                Calculate
                <svg className="arrow h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Button>
              <Button variant="secondary" onClick={reset}>Reset</Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
          <LiveMeter hourly={result?.hourly ?? null} run={run} />
        </div>
      </section>

      {result && <Results result={result} />}
    </>
  );
}
