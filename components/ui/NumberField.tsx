import { cn } from "@/utils/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint: string };

export function NumberField({ label, hint, id, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className={cn("rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-indigo-500", className)}
        {...props}
      />
      <span className="text-xs text-slate-500">{hint}</span>
    </div>
  );
}
