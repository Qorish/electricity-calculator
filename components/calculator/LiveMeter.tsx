"use client";

import { useEffect, useRef, useState } from "react";
import type { Usage } from "@/types/calculator";
import { formatNumber } from "@/utils/format";
import { stagger } from "@/utils/stagger";

const MS_PER_HOUR = 3_600_000;
const SECONDS_PER_HOUR = 3600;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Ticks the cost accrued since mount at the appliance's real rate. Mount a fresh one (via key) per calculation. */
function useRunningCost(perHour: number, still: boolean, host: React.RefObject<HTMLElement | null>) {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (still) return;
    const start = performance.now();
    let raf = 0;
    let last = 0;
    let visible = true;

    const tick = (t: number) => {
      if (visible && t - last > 100) {
        last = t;
        setCost(((t - start) / MS_PER_HOUR) * perHour);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const el = host.current;
    const io =
      el && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => (visible = e.isIntersecting))
        : null;
    if (el) io?.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [perHour, still, host]);

  return cost;
}

function Running({ hourly }: Readonly<{ hourly: Usage }>) {
  const host = useRef<HTMLDivElement>(null);
  const [still] = useState(prefersReducedMotion);
  const cost = useRunningCost(hourly.totalCharge, still, host);

  return (
    <div ref={host}>
      <div className="num text-[length:var(--text-3xl)] text-accent sm:text-[length:var(--text-display-s)]" aria-hidden>
        RM {(still ? hourly.totalCharge : cost).toFixed(5)}
      </div>
      <p className="mt-2 text-sm text-muted">
        {still ? "Cost for one hour at this draw." : "Cost running since you pressed Calculate."}
      </p>
      <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(7.5rem,1fr))] gap-4 border-t border-rule pt-5 text-sm">
        <div>
          <dt className="text-muted">Draw</dt>
          <dd className="num mt-1 text-ink">{formatNumber(hourly.power / 1000, 2)} kW</dd>
        </div>
        <div>
          <dt className="text-muted">Per hour</dt>
          <dd className="num mt-1 text-ink">RM {formatNumber(hourly.totalCharge, 4)}</dd>
        </div>
        <div>
          <dt className="text-muted">Per second</dt>
          <dd className="num mt-1 text-ink">RM {(hourly.totalCharge / SECONDS_PER_HOUR).toFixed(6)}</dd>
        </div>
      </dl>
      <p role="status" className="sr-only">
        Calculated. This appliance costs RM {formatNumber(hourly.totalCharge, 4)} per hour.
      </p>
    </div>
  );
}

export function LiveMeter({ hourly, run }: Readonly<{ hourly: Usage | null; run: number }>) {
  return (
    <aside
      aria-label="Live cost meter"
      className={`glass rise p-6 sm:p-8 ${hourly ? "meter-on" : ""}`}
      style={stagger(3)}
    >
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-ink-2">
        <span className="meter-dot" aria-hidden />
        Live meter
      </div>
      {hourly ? (
        <Running key={run} hourly={hourly} />
      ) : (
        <div>
          <div className="num text-[length:var(--text-3xl)] text-muted sm:text-[length:var(--text-display-s)]">RM 0.00000</div>
          <p className="mt-2 text-sm text-muted">Idle. Enter an appliance and press Calculate to start the meter.</p>
        </div>
      )}
    </aside>
  );
}
