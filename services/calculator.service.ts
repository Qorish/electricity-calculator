import type { CalculationResult, CalculatorInput, Usage } from "@/types/calculator";

/** Power (W) = V x A; Energy (kWh) = W x h / 1000; Charge (RM) = kWh x (sen / 100). */
export const usageFor = (power: number, rate: number, hours: number): Usage => {
  const energy = (power * hours) / 1000;
  return { power, energy, totalCharge: energy * (rate / 100) };
};

export const calculate = (input: CalculatorInput): CalculationResult => {
  const power = input.voltage * input.current;
  return {
    input,
    hourly: usageFor(power, input.rate, 1),
    daily: usageFor(power, input.rate, 24),
    custom: usageFor(power, input.rate, input.hours),
  };
};
