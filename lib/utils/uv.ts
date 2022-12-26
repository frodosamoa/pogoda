import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";

const formatHourForUV = (dt: number, timezone: string) =>
  formatInTimeZone(new Date(dt * 1000), timezone, "HH:mm");

export const getUVLabel = (airQuality: number): string => {
  if (airQuality <= 2) {
    return "Low";
  } else if (airQuality <= 5) {
    return "Moderate";
  } else if (airQuality <= 8) {
    return "High";
  } else if (airQuality <= 10) {
    return "Very High";
  }

  return "Extreme";
};

export const getUVMessage = (
  hourly: HourlyForecastResponse[],
  timezone: string
) => {
  const todaysDate = utcToZonedTime(hourly[0].dt * 1000, timezone).getDate();

  const hours = hourly
    .filter(
      (hour) =>
        utcToZonedTime(hour.dt * 1000, timezone).getDate() === todaysDate
    )
    .filter((hour) => hour.uvi >= 3);

  if (hours.length === 0) {
    return "Low levels rest of the day.";
  } else if (hours.length === 1) {
    return `Use sun protection around ${formatHourForUV(
      hours[0].dt,
      timezone
    )}.`;
  }

  return `Use sun protection:\n${formatHourForUV(
    hours[0].dt,
    timezone
  )} - ${formatHourForUV(hours[hours.length - 1].dt, timezone)}`;
};
