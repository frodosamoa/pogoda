import { getVisibilityUnit } from "./visibility";

test("getVisibilityUnit", () => {
  expect(getVisibilityUnit(true)).toBe("km");
  expect(getVisibilityUnit(false)).toBe("miles");
});
