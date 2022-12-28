import { getPrecipitationLabel } from "./precipitation";

test("getPrecipitationLabel", () => {
  expect(getPrecipitationLabel(true)).toBe("mm");
  expect(getPrecipitationLabel(false)).toBe('"');
});
