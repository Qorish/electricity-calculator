export const site = {
  name: "Electricity Calculator",
  title: "Electricity Calculator: what an appliance costs per hour in ringgit",
  tagline: "Watts, kWh and ringgit from three numbers.",
  description:
    "Enter voltage, current and your tariff in sen per kWh. See the power, energy and cost per hour, per day and for any run time, with a live running cost.",
};

export const formulas = [
  "Power (W) = Voltage (V) × Current (A)",
  "Energy (kWh) = Power × Hours ÷ 1000",
  "Total Charge = Energy (kWh) × (Rate ÷ 100)",
];

export const fields = [
  { name: "voltage", label: "Voltage (V)", placeholder: "230", hint: "Printed on the appliance label", step: "0.01", min: "0" },
  { name: "current", label: "Current (A)", placeholder: "5", hint: "Also on the label", step: "0.01", min: "0" },
  { name: "rate", label: "Rate (sen/kWh)", placeholder: "50", hint: "Sen per kWh, from your bill", step: "0.01", min: "0" },
  { name: "hours", label: "Custom Hours", placeholder: "8", hint: "How long it runs; blank counts as 1", step: "1", min: "1" },
] as const;
