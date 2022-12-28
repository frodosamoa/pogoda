import { getPrecipitationLabel } from "@/lib/utils/precipitation";

test("getPrecipitationLabel", () => {
  expect(getPrecipitationLabel(true)).toBe("mm");
  expect(getPrecipitationLabel(false)).toBe('"');
});
