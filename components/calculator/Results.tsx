"use client";

import { BreakdownTable } from "@/components/ui/BreakdownTable";
import { Button } from "@/components/ui/Button";
import { ResultCard } from "@/components/ui/ResultCard";
import { Reveal } from "@/components/ui/Reveal";
import dayIcon from "@/assets/icons/24-hour-service.gif";
import hourIcon from "@/assets/icons/1-hour.gif";
import powerIcon from "@/assets/icons/electric-power.gif";
import timeIcon from "@/assets/icons/time.gif";
import { formulas } from "@/data/site";
import { useToggle } from "@/hooks/useToggle";
import type { CalculationResult, Usage } from "@/types/calculator";
import { formatNumber, formatRM } from "@/utils/format";

const charge = (u: Usage) => (
  <>
    Total Charge: <strong className="text-ink">{formatRM(u.totalCharge)}</strong>
  </>
);

export function Results({ result }: Readonly<{ result: CalculationResult }>) {
  const { input, hourly, daily, custom } = result;
  const [showTable, toggleTable] = useToggle();

  return (
    <section className="mt-[var(--section-gap-s)]" aria-labelledby="results-title">
      <Reveal>
        <h2 id="results-title" className="max-w-[24ch] text-[length:var(--text-section)] font-semibold leading-[1.05]" style={{ letterSpacing: "var(--tracking-display)" }}>
          What it draws and what it costs
        </h2>
        <p className="mt-3 text-ink-2">
          At RM {formatNumber(input.rate / 100, 2)} per kWh, drawing {formatNumber(hourly.power / 1000, 2)} kW.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal index={0}>
          <ResultCard icon={powerIcon} title="Power" value={`${formatNumber(hourly.power, 2)} W`}>
            {input.voltage}V × {input.current}A = {formatNumber(hourly.power, 2)}W
          </ResultCard>
        </Reveal>
        <Reveal index={1}>
          <ResultCard icon={hourIcon} title="Per Hour" value={`${formatNumber(hourly.energy, 4)} kWh`}>{charge(hourly)}</ResultCard>
        </Reveal>
        <Reveal index={2}>
          <ResultCard icon={dayIcon} title="Per Day (24h)" value={`${formatNumber(daily.energy, 4)} kWh`}>{charge(daily)}</ResultCard>
        </Reveal>
        <Reveal index={3}>
          <ResultCard icon={timeIcon} title={`Custom (${input.hours}h)`} value={`${formatNumber(custom.energy, 4)} kWh`}>{charge(custom)}</ResultCard>
        </Reveal>
      </div>

      <Reveal className="mt-[var(--section-gap-s)]">
        <h2 className="max-w-[24ch] text-[length:var(--text-section)] font-semibold leading-[1.05]" style={{ letterSpacing: "var(--tracking-display)" }}>
          How each number is worked out
        </h2>
        <ul className="mt-6 max-w-2xl">
          {formulas.map((f) => (
            <li key={f} className="border-t border-rule py-4 text-ink-2 last:border-b">
              {f}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-[var(--section-gap-s)]">
        <Button variant="secondary" onClick={toggleTable} aria-expanded={showTable} aria-controls="breakdown">
          {showTable ? "Hide" : "Show"} 24-Hour Breakdown
        </Button>
        <div id="breakdown" className="mt-6 max-w-3xl">
          {showTable && <BreakdownTable power={hourly.power} rate={input.rate} />}
        </div>
      </Reveal>
    </section>
  );
}
