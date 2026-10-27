export const site = {
  name: "Electricity Calculator",
  tagline: "Calculate Power, Energy & Total Charge",
  description:
    "Calculate your electricity consumption, power usage, and costs with this easy-to-use calculator.",
};

export const formulas = [
  "Power (W) = Voltage (V) × Current (A)",
  "Energy (kWh) = Power × Hours ÷ 1000",
  "Total Charge = Energy (kWh) × (Rate ÷ 100)",
];

export const fields = [
  { name: "voltage", label: "Voltage (V)", placeholder: "e.g., 220", hint: "Enter voltage in Volts", step: "0.01", min: "0" },
  { name: "current", label: "Current (A)", placeholder: "e.g., 5", hint: "Enter current in Amperes", step: "0.01", min: "0" },
  { name: "rate", label: "Rate (sen/kWh)", placeholder: "e.g., 120", hint: "Enter your electricity rate in sen per kWh", step: "0.01", min: "0" },
  { name: "hours", label: "Custom Hours", placeholder: "e.g., 8", hint: "Duration for custom calculation", step: "1", min: "1" },
] as const;
