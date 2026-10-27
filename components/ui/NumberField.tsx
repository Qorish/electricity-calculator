import { cn } from "@/utils/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint: string; id: string };

export function NumberField({ label, hint, id, className, ...props }: Readonly<Props>) {
  return (
    <div className="field flex flex-col gap-2">
      <label htmlFor={id} className="field-label text-sm font-semibold text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        aria-describedby={`${id}-hint`}
        className={cn("field-input h-12 px-4 text-base", className)}
        {...props}
      />
      <span id={`${id}-hint`} className="text-sm text-muted">
        {hint}
      </span>
    </div>
  );
}
