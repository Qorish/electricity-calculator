export type FormValues = { voltage: string; current: string; rate: string; hours: string };

export type CalculatorInput = { voltage: number; current: number; rate: number; hours: number };

export type Usage = { power: number; energy: number; totalCharge: number };

export type CalculationResult = {
  input: CalculatorInput;
  hourly: Usage;
  daily: Usage;
  custom: Usage;
};
