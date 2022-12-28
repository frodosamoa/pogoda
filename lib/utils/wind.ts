import { MPS_TO_MPH } from "@/lib/constants/conversion";

const COMPASS_LOOKUP = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export const getWindDirection = (num: number) => {
  const degreeLookup = Math.floor(num / 22.5 + 0.5);
  return COMPASS_LOOKUP[degreeLookup % 16];
};

export const getWindSpeed = (windSpeed: number, isMetric: boolean) =>
  (isMetric ? windSpeed : windSpeed * MPS_TO_MPH).toFixed(1);

export const getWindLabel = (isMetric: boolean) => (isMetric ? "m/s" : "mph");
