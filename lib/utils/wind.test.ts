import { getWindLabel, getWindSpeed } from "@/lib/utils/wind";

test("getWindLabel", () => {
  expect(getWindLabel(true)).toBe("m/s");
  expect(getWindLabel(false)).toBe("mph");
});

test("getWindSpeed", () => {
  expect(getWindSpeed(10, true)).toBe("10.0");
  expect(getWindSpeed(10, false)).toBe("22.4");
});
