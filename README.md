# Electricity Calculator

Find out what an appliance costs to run. Enter its voltage, current and your tariff, and the calculator shows its power (W), energy (kWh) and cost (RM) per hour, per day and for any number of hours. A live meter then runs the cost in ringgit while you read, and a 24-hour table breaks the day down hour by hour.

Everything is calculated in the browser. There is no server, database, account or API key.

## What you need

- [Node.js](https://nodejs.org) 20.9 or newer (includes npm)
- Git

## Get started

```bash
git clone <repository-url>
cd electricity-calculator
npm install
npm run dev
```

Open <http://localhost:3000>.

## How to use it

1. Find the appliance's **voltage (V)** and **current (A)** on its label. In Malaysia, mains is usually 230 V.
2. Find your **rate in sen per kWh** on your electricity bill. For example, RM 0.50 per kWh is 50 sen.
3. Optionally enter **custom hours** for how long it runs. Leave it blank to count 1 hour.
4. Press **Calculate**. You get:
   - **Power**: voltage × current, in watts
   - **Per Hour**, **Per Day (24h)** and **Custom** energy (kWh) with the total charge (RM)
   - **Live meter**: the cost running up in real time at that appliance's rate
   - **24-Hour Breakdown**: energy and charge for each hour from 1 to 24
5. Press **Reset** to clear everything and start again.

Example: 230 V × 5 A at 50 sen/kWh is 1,150 W. That is 1.15 kWh and RM 0.575 per hour, or RM 13.80 per day.

## How it is worked out

- Power (W) = Voltage (V) × Current (A)
- Energy (kWh) = Power × Hours ÷ 1000
- Total Charge (RM) = Energy (kWh) × (Rate ÷ 100)

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create the production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm test` | Run the unit and component tests |
| `npm run test:watch` | Re-run tests on change |
| `npm run lint` | Check code style |
| `npm run typecheck` | Check TypeScript types |

Before you commit, run `npm run typecheck && npm run lint && npm test && npm run build`.

## Project layout

```
app/          page, layout and global styles (design tokens live in tokens.css)
components/   screens and UI pieces (calculator/, layout/, ui/)
services/     the calculation itself (pure, no React)
hooks/        form state, scroll reveal and toggle logic
utils/        validation, number formatting, small helpers
data/         text, field definitions and formulas shown on the page
types/        shared TypeScript types
assets/icons/ result card icons
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for how the pieces fit together.

## Common tasks

- **Change a formula:** edit `services/calculator.service.ts`, then update its test next to it and the formula text in `data/site.ts`.
- **Change validation rules or messages:** edit `utils/validate.ts` and its test.
- **Change wording, hints or fields:** edit `data/site.ts`.
- **Change colours, fonts, spacing or radius:** edit the tokens in `app/tokens.css`. The Tailwind config reads them, so one change updates the whole page.
- **Add a result card:** add it in `components/calculator/Results.tsx` using `ResultCard`, and compute its numbers in the service.

## Troubleshooting

- **Port 3000 is busy:** run `npm run dev -- -p 3001`.
- **Fonts do not load:** they are fetched from Google Fonts at build and start time, so the first `dev` or `build` needs an internet connection.
- **"Invalid value" messages:** voltage and current must be above 0, rate must be 0 or more, and hours must be a whole number of 1 or more.
- **Stale styles or odd errors after pulling changes:** stop the server, delete the `.next` folder and run `npm install` and `npm run dev` again.

## Deploying

It is a standard Next.js app with no environment variables. Push it to a Git host and import it into [Vercel](https://vercel.com) or Netlify, or run `npm run build && npm start` on any machine with Node.js.

## License

[MIT](LICENSE) © 2026 Qorish
