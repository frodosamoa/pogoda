import { getUVLabel } from "./uv";

test("getUVLabel", () => {
  expect(getUVLabel(0)).toBe("Low");
  expect(getUVLabel(2)).toBe("Low");
  expect(getUVLabel(5)).toBe("Moderate");
  expect(getUVLabel(8)).toBe("High");
  expect(getUVLabel(10)).toBe("Very High");
  expect(getUVLabel(13)).toBe("Extreme");
});
