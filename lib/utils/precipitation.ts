import { formatInTimeZone } from "date-fns-tz";

import { MM_TO_INCHES } from "@/lib/constants/conversion";

export const getPrecipitation = (length: number, isMetric: boolean) => {
  const precipication = +(isMetric ? length : length * MM_TO_INCHES).toFixed(2);

  if (precipication === 0) {
    return +(isMetric ? length : length * MM_TO_INCHES).toFixed(3);
  }

  return precipication;
};

export const getPrecipitationLabel = (isMetric: boolean) =>
  isMetric ? "mm" : '"';

export const getPrecipitationMessage = ({
  hourly,
  daily,
  isMetric,
  timezone,
  type,
}: {
  hourly: HourlyForecastResponse[];
  daily: DailyForecastResponse[];
  isMetric: boolean;
  timezone: string;
  type: "snow" | "rain";
}) => {
  const precipitationLabel = getPrecipitationLabel(isMetric);

  const precipitationInNext24Hours = hourly
    .slice(0, 23)
    .reduce(
      (precipitation, hour) => precipitation + (hour[type]?.["1h"] ?? 0),
      0
    );

  if (precipitationInNext24Hours > 0) {
    return `${getPrecipitation(
      precipitationInNext24Hours,
      isMetric
    )}${precipitationLabel} expected in next 24hr.`;
  }

  const nextPrecipitation = daily.slice(1).find((day) => day[type] > 0);

  if (nextPrecipitation) {
    return `Next expected is ${getPrecipitation(
      nextPrecipitation[type],
      isMetric
    )}${precipitationLabel} ${formatInTimeZone(
      new Date(nextPrecipitation.dt * 1000),
      timezone,
      "eee d"
    )}.`;
  }

  return `None expected in next ${daily.length} days.`;
};
