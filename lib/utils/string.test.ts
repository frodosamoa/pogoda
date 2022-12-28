import { capitalize } from "./string";

test("capitalize", () => {
  expect(capitalize("lowercase")).toBe("Lowercase");
});
