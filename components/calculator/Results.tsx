import { BreakdownTable } from "@/components/ui/BreakdownTable";
import { Button } from "@/components/ui/Button";
import { ResultCard } from "@/components/ui/ResultCard";
import dayIcon from "@/assets/icons/24-hour-service.gif";
import hourIcon from "@/assets/icons/1-hour.gif";
import powerIcon from "@/assets/icons/electric-power.gif";
import timeIcon from "@/assets/icons/time.gif";
import { formulas } from "@/data/site";
import { useToggle } from "@/hooks/useToggle";
import type { CalculationResult, Usage } from "@/types/calculator";
import { formatNumber, formatRM } from "@/utils/format";

const charge = (u: Usage) => (
  <>Total Charge: <strong>{formatRM(u.totalCharge)}</strong></>
);

export function Results({ result }: { result: CalculationResult }) {
  const { input, hourly, daily, custom } = result;
  const [showTable, toggleTable] = useToggle();

  return (
    <section className="mt-8 border-t border-slate-200 pt-6">
      <p className="text-sm text-slate-600">
        Rate: <strong>RM {formatNumber(input.rate / 100, 2)}/kWh</strong> · Power:{" "}
        <strong>{formatNumber(hourly.power, 2)} W ({formatNumber(hourly.power / 1000, 2)} kW)</strong>
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ResultCard icon={powerIcon} title="Power" value={`${formatNumber(hourly.power, 2)} W`}>
          {input.voltage}V × {input.current}A = {formatNumber(hourly.power, 2)}W
        </ResultCard>
        <ResultCard icon={hourIcon} title="Per Hour" value={`${formatNumber(hourly.energy, 4)} kWh`}>{charge(hourly)}</ResultCard>
        <ResultCard icon={dayIcon} title="Per Day (24h)" value={`${formatNumber(daily.energy, 4)} kWh`}>{charge(daily)}</ResultCard>
        <ResultCard icon={timeIcon} title={`Custom (${input.hours}h)`} value={`${formatNumber(custom.energy, 4)} kWh`}>{charge(custom)}</ResultCard>
      </div>

      <div className="mt-6 rounded-2xl bg-indigo-50 p-4">
        <h3 className="font-semibold text-indigo-700">Formulas Used</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {formulas.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <Button onClick={toggleTable}>{showTable ? "Hide" : "Show"} 24-Hour Breakdown</Button>
      </div>
      {showTable && (
        <div className="mt-4 overflow-x-auto">
          <BreakdownTable power={hourly.power} rate={input.rate} />
        </div>
      )}
    </section>
  );
}
