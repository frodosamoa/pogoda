import { getVisibilityUnit } from "@/lib/utils/visibility";

test("getVisibilityUnit", () => {
  expect(getVisibilityUnit(true)).toBe("km");
  expect(getVisibilityUnit(false)).toBe("miles");
});
