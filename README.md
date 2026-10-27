# Electricity Calculator

Calculate power (W), energy (kWh) and cost (RM) from voltage, current and a sen/kWh rate, with per-hour, per-day, custom-hours and 24-hour breakdown views.

Next.js (App Router) + React + TypeScript + Tailwind, laid out per [ARCHITECTURE.md](ARCHITECTURE.md) (from `Qorish/web-starter`). No backend: all maths runs in the browser.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # jest
npm run typecheck && npm run lint && npm run build
```

## Formulas

- Power (W) = Voltage (V) × Current (A)
- Energy (kWh) = Power × Hours ÷ 1000
- Total Charge (RM) = Energy × (Rate ÷ 100)
