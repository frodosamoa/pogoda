import {
  getPrecipitationLabel,
  getPrecipitation,
} from "@/lib/utils/precipitation";

test("getPrecipitationLabel", () => {
  expect(getPrecipitationLabel(true)).toBe("mm");
  expect(getPrecipitationLabel(false)).toBe('"');
});

test("getPrecipitation", () => {
  expect(getPrecipitation(10, true)).toBe(10);
  expect(getPrecipitation(10, false)).toBe(0.39);
});
