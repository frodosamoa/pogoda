import { METERS_TO_MILES } from "../constants/conversion";

export const getVisibility = (visibility: number, isMetric: boolean) =>
  Math.round(isMetric ? visibility / 1000 : visibility * METERS_TO_MILES);

export const getVisibilityUnit = (isMetric: boolean) =>
  isMetric ? "km" : "miles";
