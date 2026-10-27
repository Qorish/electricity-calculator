import { cn } from "@/utils/cn";

const variants = {
  primary: "bg-indigo-500 text-white hover:bg-indigo-600",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
} as const;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants };

export function Button({ className, variant = "primary", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn("inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors", variants[variant], className)}
      {...props}
    />
  );
}
