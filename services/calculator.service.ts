import type { CalculationResult, CalculatorInput, Usage } from "@/types/calculator";

export const HOURS_PER_DAY = 24;

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
    daily: usageFor(power, input.rate, HOURS_PER_DAY),
    custom: usageFor(power, input.rate, input.hours),
  };
};
