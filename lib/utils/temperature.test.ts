import { formatTemp } from "@/lib/utils/temperature";

test("formatTemp", () => {
  expect(formatTemp(233.15, true)).toBe(-40);
  expect(formatTemp(233.15, false)).toBe(-40);
});
