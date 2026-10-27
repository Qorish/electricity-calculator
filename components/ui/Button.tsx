import { cn } from "@/utils/cn";

const variants = { primary: "btn--primary", secondary: "btn--secondary" } as const;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants };

export function Button({ className, variant = "primary", type = "button", ...props }: Readonly<Props>) {
  return (
    <button
      type={type}
      className={cn("btn inline-flex items-center justify-center gap-2 px-6", variants[variant], className)}
      {...props}
    />
  );
}
