# Architecture

A small client-side Next.js (App Router) app. Imports point downward and use the `@/` alias.

```
app/                 Page, layout and global CSS. Composes the components; no logic.
  tokens.css         Design tokens: colours, type scale, spacing, radius, motion.
  base.css           Resets and base rules.
  globals.css        Tailwind layers plus the glass, card, button and motion styles.
components/
  layout/            Header, Footer.
  calculator/        CalculatorForm (owns the screen), Intro, LiveMeter, Results.
  ui/                Button, NumberField, Alert, ResultCard, BreakdownTable, Reveal.
hooks/               useCalculator (form state, validation, results), useReveal, useToggle.
services/            calculator.service.ts: the calculation, pure functions.
utils/               validate, format, stagger, cn. Pure helpers, unit-tested.
data/                Page text, field definitions and formulas (site.ts).
types/               calculator.ts: inputs, usage and result types.
assets/icons/        Result card icons.
```

## Data flow

```
NumberField input
  -> useCalculator   (form values as strings)
  -> validate()      (strings -> CalculatorInput, or error messages)
  -> calculate()     (CalculatorInput -> hourly, daily and custom Usage)
  -> LiveMeter, Results, BreakdownTable
```

## Rules

- `services/` and `utils/` contain no React or DOM code, so they are tested directly.
- Components take props and draw markup; `CalculatorForm` is the only one that holds state, through `useCalculator`.
- Colours, fonts, radii and durations come from `app/tokens.css`, never hard-coded in components.
- Anything that moves has a fallback under `prefers-reduced-motion`, and content is visible before scripts run.
- Tests sit next to the code they cover (`*.test.ts`, `app/page.test.tsx`).

## Not used, on purpose

There is no backend, database, API layer or global state library. The calculation is arithmetic on three numbers, so it all runs in the browser. Add a service, API or context only when a real need appears, for example saved appliances or live tariffs.
