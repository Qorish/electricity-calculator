import { cn } from "./cn";

test("cn drops falsy values", () => {
  expect(cn("a", false, null, "b")).toBe("a b");
});
