import { validate } from "./validate";

const ok = { voltage: "230", current: "5", rate: "50", hours: "8" };

test("accepts valid input and defaults blank hours to 1", () => {
  expect(validate(ok).input).toEqual({ voltage: 230, current: 5, rate: 50, hours: 8 });
  expect(validate({ ...ok, hours: "" }).input?.hours).toBe(1);
});

test.each([
  [{ voltage: "" }, 1],
  [{ voltage: "0" }, 1],
  [{ current: "-2" }, 1],
  [{ rate: "-1" }, 1],
  [{ hours: "1.5" }, 1],
  [{ voltage: "", current: "", rate: "" }, 3],
])("rejects %j", (patch, count) => {
  const r = validate({ ...ok, ...patch });
  expect(r.input).toBeNull();
  expect(r.errors).toHaveLength(count);
});

test("rate 0 is allowed", () => {
  expect(validate({ ...ok, rate: "0" }).input?.rate).toBe(0);
});
