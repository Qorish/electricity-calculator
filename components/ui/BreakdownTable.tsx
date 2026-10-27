import { HOURS_PER_DAY, usageFor } from "@/services/calculator.service";
import { formatNumber } from "@/utils/format";

export function BreakdownTable({ power, rate }: Readonly<{ power: number; rate: number }>) {
  return (
    <table className="breakdown w-full text-left">
      <caption className="sr-only">Energy and charge for each hour from 1 to 24</caption>
      <thead>
        <tr className="border-b border-rule text-sm text-muted">
          <th scope="col" className="py-3 pr-4 font-semibold">Hour</th>
          <th scope="col" className="py-3 pr-4 font-semibold">Energy (kWh)</th>
          <th scope="col" className="py-3 font-semibold">Charge (RM)</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: HOURS_PER_DAY }, (_, i) => i + 1).map((h) => {
          const u = usageFor(power, rate, h);
          return (
            <tr key={h} className="border-b border-rule">
              <td className="num py-3 pr-4 text-ink-2">{h}h</td>
              <td className="num py-3 pr-4">{formatNumber(u.energy, 4)}</td>
              <td className="num py-3">RM {formatNumber(u.totalCharge, 2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
