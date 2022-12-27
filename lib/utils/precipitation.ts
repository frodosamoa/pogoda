import { formatInTimeZone } from "date-fns-tz";

import { MM_TO_INCHES } from "../constants/conversion";

export const getPrecipitation = (length: number, isMetric: boolean) =>
  +(isMetric ? length : length * MM_TO_INCHES).toFixed(2);

export const getPrecipitationLabel = (isMetric: boolean) =>
  isMetric ? "mm" : '"';

export const getPrecipitationMessage = (
  hourly: HourlyForecastResponse[],
  daily: DailyForecastResponse[],
  isMetric: boolean,
  timezone: string
) => {
  const precipitaitonLabel = getPrecipitationLabel(isMetric);
  const precipitationInNext24Hours = hourly
    .slice(0, 23)
    .reduce(
      (precipitaiton, hour) => precipitaiton + (hour.rain?.["1h"] ?? 0),
      0
    );

  if (precipitationInNext24Hours > 0) {
    return `${getPrecipitation(
      precipitationInNext24Hours,
      isMetric
    )}${precipitaitonLabel} expected in next 24hr.`;
  }

  const nextPrecipitaion = daily.find((day) => day.rain > 0);

  if (nextPrecipitaion) {
    return `Next expected is ${getPrecipitation(
      nextPrecipitaion.rain,
      isMetric
    )}${precipitaitonLabel} ${formatInTimeZone(
      new Date(nextPrecipitaion.dt * 1000),
      timezone,
      "eee d"
    )}.`;
  }

  return `None expected in next ${daily.length} days.`;
};
