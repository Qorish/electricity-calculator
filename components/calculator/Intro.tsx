import { stagger } from "@/utils/stagger";

export function Intro() {
  return (
    <div className="mb-8 lg:mb-10">
      <h1
        className="rise max-w-[16ch] text-[length:var(--text-display)] font-semibold leading-[1.02]"
        style={{ letterSpacing: "var(--tracking-display)", ...stagger(1) }}
      >
        What does your appliance cost per hour?
      </h1>
      <p className="rise mt-5 max-w-[34ch] text-[length:var(--text-lead)] text-ink-2" style={stagger(2)}>
        Enter volts, amps and your tariff. Get watts, kWh and ringgit.
      </p>
    </div>
  );
}
