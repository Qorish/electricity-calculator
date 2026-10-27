import { usageFor } from "@/services/calculator.service";
import { formatNumber } from "@/utils/format";

export function BreakdownTable({ power, rate }: { power: number; rate: number }) {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-2">Hour</th>
          <th className="p-2">Energy (kWh)</th>
          <th className="p-2">Charge (RM)</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 }, (_, i) => i + 1).map((h) => {
          const u = usageFor(power, rate, h);
          return (
            <tr key={h} className="border-b border-slate-100">
              <td className="p-2">{h}h</td>
              <td className="p-2">{formatNumber(u.energy, 4)}</td>
              <td className="p-2">RM {formatNumber(u.totalCharge, 2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
