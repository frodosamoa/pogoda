import {
  getAirQualityLabel,
  getAirQualityMessage,
} from "@/lib/utils/airQuality";

test("getAirQualityLabel", () => {
  expect(getAirQualityLabel(0)).toBe("Very Good");
  expect(getAirQualityLabel(33)).toBe("Very Good");
  expect(getAirQualityLabel(66)).toBe("Good");
  expect(getAirQualityLabel(99)).toBe("Fair");
  expect(getAirQualityLabel(149)).toBe("Poor");
  expect(getAirQualityLabel(200)).toBe("Very Poor");
  expect(getAirQualityLabel(250)).toBe("Hazardous");
});

test("getAirQualityMessage", () => {
  expect(getAirQualityMessage(0)).toBe("Enjoy normal activities.");
  expect(getAirQualityMessage(33)).toBe("Enjoy normal activities.");
  expect(getAirQualityMessage(66)).toBe("Enjoy normal activities.");
  expect(getAirQualityMessage(99)).toBe(
    "People unusually sensitive to air pollution should reduce outdoor activity."
  );
  expect(getAirQualityMessage(149)).toBe(
    "Everyone should avoid outdoor actitivities if symptoms arise."
  );
  expect(getAirQualityMessage(200)).toBe(
    "Everyone should avoid outdoor actitivities if symptoms arise."
  );
  expect(getAirQualityMessage(250)).toBe("Stay indoors as much as possible.");
});
