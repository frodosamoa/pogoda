import { getWindLabel } from "@/lib/utils/wind";

test("getWindLabel", () => {
  expect(getWindLabel(true)).toBe("m/s");
  expect(getWindLabel(false)).toBe("mph");
});
