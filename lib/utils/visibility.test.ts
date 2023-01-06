import { getVisibilityUnit, getVisibility } from "@/lib/utils/visibility";

test("getVisibilityUnit", () => {
  expect(getVisibilityUnit(true)).toBe("km");
  expect(getVisibilityUnit(false)).toBe("miles");
});

test("getVisibility", () => {
  expect(getVisibility(1000, true)).toBe(1);
  expect(getVisibility(1600, false)).toBe(1);
});
