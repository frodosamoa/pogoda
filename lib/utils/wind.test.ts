import { getWindLabel } from "./wind";

test("getWindLabel", () => {
  expect(getWindLabel(true)).toBe("m/s");
  expect(getWindLabel(false)).toBe("mph");
});
