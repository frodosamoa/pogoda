import { getWindLabel, getWindSpeed, getWindDirection } from "@/lib/utils/wind";

test("getWindLabel", () => {
  expect(getWindLabel(true)).toBe("m/s");
  expect(getWindLabel(false)).toBe("mph");
});

test("getWindSpeed", () => {
  expect(getWindSpeed(10, true)).toBe("10.0");
  expect(getWindSpeed(10, false)).toBe("22.4");
});

test("getWindDirection", () => {
  expect(getWindDirection(0)).toBe("N");
  expect(getWindDirection(90)).toBe("E");
  expect(getWindDirection(180)).toBe("S");
  expect(getWindDirection(270)).toBe("W");
});
