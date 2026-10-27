"use client";

import { useReveal } from "@/hooks/useReveal";
import { stagger } from "@/utils/stagger";

type Props = { index?: number; className?: string; children: React.ReactNode };

export function Reveal({ index = 0, className, children }: Readonly<Props>) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={stagger(index)}>
      {children}
    </div>
  );
}
