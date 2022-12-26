import { MM_TO_INCHES } from "../constants/conversion";

export const getPrecipitation = (length: number, isMetric: boolean) =>
  +(isMetric ? length : length * MM_TO_INCHES).toFixed(2);

export const getPrecipitationLabel = (isMetric: boolean) =>
  isMetric ? "mm" : '"';
