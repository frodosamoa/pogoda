import { format } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";

import {
  weatherToIcon,
  getWeatherIconId,
  getWeatherLabel,
} from "./weatherIcons";
import { formatTemp } from "./temperature";
import { getUVLabel, getUVMessage } from "./uv";
import { getAirQualityLabel, getAirQualityMessage } from "./airQuality";
import { getPrecipitation, getPrecipitationLabel } from "./precipitation";
import { getWindSpeed, getWindLabel, getWindDirection } from "./wind";
import { getVisibility, getVisibilityUnit } from "./visibility";

const formatAlerts = (alerts: AlertResponse[], timezone: string) =>
  alerts?.map(({ sender_name: senderName, event, end }) => ({
    senderName,
    event,
    end: formatInTimeZone(
      new Date(end * 1000),
      timezone,
      "HH:mm, eeee, MMMM dd"
    ),
  }));

const formatHourly = (
  hourly: HourlyForecastResponse[],
  timezone: string,
  isMetric: boolean,
  sunrisesSunsets: SunriseSunset[]
): (HourlyForecast | SunriseSunset)[] =>
  [
    ...hourly?.map(({ dt, temp, weather, pop }, index: number) => ({
      date:
        index === 0
          ? "Now"
          : formatInTimeZone(new Date(dt * 1000), timezone, "HH"),
      dt: utcToZonedTime(new Date(dt * 1000), timezone),
      temp: formatTemp(temp, isMetric),
      label: getWeatherLabel(weather),
      iconClassName: weatherToIcon(getWeatherIconId(weather), false),
      precipitationChance: Math.round(pop * 100),
    })),
    ...sunrisesSunsets,
  ].sort((a, b) => (a.dt < b.dt ? -1 : 1));

const formatDaily = (daily: DailyForecastResponse[], isMetric: boolean) =>
  daily?.map(({ dt, temp, weather, sunrise, sunset, pop }, index: number) => ({
    sunrise,
    sunset,
    fullDate: format(new Date(dt * 1000), "PP"),
    date: index === 0 ? "Today" : format(new Date(dt * 1000), "ccc"),
    temp: {
      min: formatTemp(temp.min, isMetric),
      max: formatTemp(temp.max, isMetric),
    },
    label: getWeatherLabel(weather),
    iconClassName: weatherToIcon(getWeatherIconId(weather), true),
    precipitationChance: Math.round(pop * 100),
  }));

const formatCurrent = (
  current: CurrentWeatherResponse,
  airPollution: AirPollutionResponse,
  isMetric: boolean,
  sunrisesSunsets: SunriseSunset[],
  hourly: HourlyForecastResponse[],
  timezone: string
): CurrentWeather => ({
  sunrisesSunsets,
  humidity: current.humidity,
  temp: formatTemp(current.temp, isMetric),
  label: getWeatherLabel(current.weather),
  dewPoint: formatTemp(current.dew_point, isMetric),
  visibility: getVisibility(current.visibility, isMetric),
  visibilityUnit: getVisibilityUnit(isMetric),
  iconId: getWeatherIconId(current.weather),
  feelsLike: formatTemp(current.feels_like, isMetric),
  pressure: current.pressure,
  rain: getPrecipitation(current.rain ? current.rain["1h"] : 0, isMetric),
  rainLabel: getPrecipitationLabel(isMetric),
  snow: getPrecipitation(current.snow ? current.snow["1h"] : 0, isMetric),
  snowLabel: getPrecipitationLabel(isMetric),
  uvIndex: Math.floor(current.uvi),
  uvLabel: getUVLabel(current.uvi),
  uvMessage: getUVMessage(hourly, timezone),
  windSpeed: getWindSpeed(current.wind_speed, isMetric),
  windLabel: getWindLabel(isMetric),
  windDirection: getWindDirection(current.wind_deg),
  airQuality: Math.round(airPollution.list[0].components.pm2_5),
  airQualityLabel: getAirQualityLabel(airPollution.list[0].components.pm2_5),
  airQualityMessage: getAirQualityMessage(
    airPollution.list[0].components.pm2_5
  ),
});

const getSunrisesSunsets = (
  current: CurrentWeatherResponse,
  daily: DailyForecastResponse[],
  timezone: string
): SunriseSunset[] => {
  const now = utcToZonedTime(new Date(Date.now()), timezone);

  let sunriseDate = utcToZonedTime(new Date(current.sunrise * 1000), timezone);
  let sunsetDate = utcToZonedTime(new Date(current.sunset * 1000), timezone);

  return [
    { dt: sunriseDate, type: "Sunrise" },
    { dt: sunsetDate, type: "Sunset" },
    {
      dt: utcToZonedTime(new Date(daily[1].sunrise * 1000), timezone),
      type: "Sunrise",
    },
    {
      dt: utcToZonedTime(new Date(daily[1].sunset * 1000), timezone),
      type: "Sunset",
    },
    {
      dt: utcToZonedTime(new Date(daily[2].sunrise * 1000), timezone),
      type: "Sunrise",
    },
    {
      dt: utcToZonedTime(new Date(daily[2].sunset * 1000), timezone),
      type: "Sunset",
    },
  ]
    .filter((s) => now < s.dt)
    .map(({ dt, type }) => ({
      dt,
      type,
      date: format(dt, "HH:mm"),
    }));
};

export const formatWeather = (
  weather: WeatherResponse,
  isMetric: boolean
): Weather => {
  if (!weather) return null;

  const { timezone, current, daily, hourly, airPollution, alerts } = weather;

  const sunrisesSunsets = getSunrisesSunsets(current, daily, timezone);

  return {
    timezone,
    alerts: formatAlerts(alerts, timezone),
    current: formatCurrent(
      current,
      airPollution,
      isMetric,
      sunrisesSunsets,
      hourly,
      timezone
    ),
    hourly: formatHourly(hourly, timezone, isMetric, sunrisesSunsets),
    daily: formatDaily(daily, isMetric),
  };
};
