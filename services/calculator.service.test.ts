import { calculate, usageFor } from "./calculator.service";

test("230V x 5A at 50 sen/kWh", () => {
  const r = calculate({ voltage: 230, current: 5, rate: 50, hours: 8 });
  expect(r.hourly.power).toBe(1150);
  expect(r.hourly.energy).toBeCloseTo(1.15);
  expect(r.hourly.totalCharge).toBeCloseTo(0.575);
  expect(r.daily.energy).toBeCloseTo(27.6);
  expect(r.custom.energy).toBeCloseTo(9.2);
  expect(r.custom.totalCharge).toBeCloseTo(4.6);
});

test("zero rate costs nothing", () => {
  expect(usageFor(1000, 0, 3).totalCharge).toBe(0);
});
