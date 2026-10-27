# Architecture

Imports point downward; use the `@/` alias.

```
app/                 CONTROLLER. Routes and layout; composes views.
components/          VIEW. Props in, markup out.
  layout/            Header, Footer.
  ui/                Button, NumberField, Alert, ResultCard, BreakdownTable.
  calculator/        CalculatorForm (client, owns the form), Results.
services/            MODEL. calculator.service.ts: pure calculation use-case.
types/               MODEL. CalculatorInput, Usage, CalculationResult.
hooks/               useCalculator (form state + validate + calculate), useToggle.
data/                Static copy and field config (site.ts).
utils/               Pure helpers: validate, format, cn. Unit-tested.
assets/icons/        GIFs imported by code.
```

Flow: `CalculatorForm` → `useCalculator` → `validate()` → `calculate()` → `Results`.

Omitted from the web-starter on purpose: `api/` + DTO mappers, `db/`, `context/`, `redux/` (no network, no database, no shared state). Add each when a real need appears.
