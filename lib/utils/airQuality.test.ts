import { getAirQualityLabel } from "@/lib/utils/airQuality";

test("getAirQualityLabel", () => {
  expect(getAirQualityLabel(0)).toBe("Very Good");
  expect(getAirQualityLabel(33)).toBe("Very Good");
  expect(getAirQualityLabel(66)).toBe("Good");
  expect(getAirQualityLabel(99)).toBe("Fair");
  expect(getAirQualityLabel(149)).toBe("Poor");
  expect(getAirQualityLabel(200)).toBe("Very Poor");
  expect(getAirQualityLabel(250)).toBe("Hazardous");
});
