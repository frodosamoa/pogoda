import { format } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";

import { getWeatherIconInfo } from "@/lib/utils/weatherIcons";
import { formatTemp } from "@/lib/utils/temperature";
import { getUVLabel, getUVMessage } from "@/lib/utils/uv";
import {
  getAirQualityLabel,
  getAirQualityMessage,
} from "@/lib/utils/airQuality";
import {
  getPrecipitation,
  getPrecipitationLabel,
  getPrecipitationMessage,
} from "@/lib/utils/precipitation";
import { getWindSpeed, getWindLabel, getWindDirection } from "@/lib/utils/wind";
import { getVisibility, getVisibilityUnit } from "@/lib/utils/visibility";

const formatAlerts = ({
  alerts,
  timezone,
  is24hr,
}: {
  alerts: AlertResponse[];
  timezone: string;
  is24hr: boolean;
}) =>
  alerts?.map(({ sender_name: senderName, event, end }) => ({
    senderName,
    event,
    end: formatInTimeZone(
      new Date(end * 1000),
      timezone,
      is24hr ? "HH:mm, eeee, MMMM dd" : "h:mma, eeee, MMMM dd"
    ),
  }));

const formatHourly = ({
  hourly,
  timezone,
  isMetric,
  sunrisesSunsets,
  is24hr,
}: {
  hourly: HourlyForecastResponse[];
  timezone: string;
  isMetric: boolean;
  sunrisesSunsets: SunriseSunset[];
  is24hr: boolean;
}): (HourlyForecast | SunriseSunset)[] => {
  let sunriseSunsetIndex = 0;
  let isDay = sunrisesSunsets[sunriseSunsetIndex]?.type !== "sunrise";

  return hourly?.reduce((hours, { dt, temp, weather, pop }, index: number) => {
    let hour = {
      date:
        index === 0
          ? "Now"
          : formatInTimeZone(
              new Date(dt * 1000),
              timezone,
              is24hr ? "HH" : "ha"
            ),
      dt: utcToZonedTime(new Date(dt * 1000), timezone),
      temp: formatTemp(temp, isMetric),
      precipitationChance: Math.round(pop * 100),
      ...getWeatherIconInfo(weather, isDay),
    };

    if (sunrisesSunsets[sunriseSunsetIndex]?.dt < hour.dt) {
      let sunriseSunset = sunrisesSunsets[sunriseSunsetIndex];
      sunriseSunsetIndex++;
      isDay = !isDay;
      hour = {
        ...hour,
        ...getWeatherIconInfo(weather, isDay),
      };
      return [...hours, sunriseSunset, hour];
    }

    return [...hours, hour];
  }, []);
};

const formatDaily = ({
  daily,
  isMetric,
}: {
  daily: DailyForecastResponse[];
  isMetric: boolean;
}) =>
  daily?.map(({ dt, temp, weather, sunrise, sunset, pop }, index: number) => ({
    sunrise,
    sunset,
    fullDate: format(new Date(dt * 1000), "PP"),
    date: index === 0 ? "Today" : format(new Date(dt * 1000), "ccc"),
    temp: {
      min: formatTemp(temp.min, isMetric),
      max: formatTemp(temp.max, isMetric),
    },
    precipitationChance: Math.round(pop * 100),
    ...getWeatherIconInfo(weather, true),
  }));

const formatCurrent = ({
  current,
  airPollution,
  isMetric,
  sunrisesSunsets,
  hourly,
  daily,
  timezone,
}: {
  current: CurrentWeatherResponse;
  airPollution: AirPollutionResponse;
  isMetric: boolean;
  sunrisesSunsets: SunriseSunset[];
  hourly: HourlyForecastResponse[];
  daily: DailyForecastResponse[];
  timezone: string;
}): CurrentWeather => ({
  sunrisesSunsets,
  humidity: current.humidity,
  temp: formatTemp(current.temp, isMetric),
  dewPoint: formatTemp(current.dew_point, isMetric),
  visibility: getVisibility(current.visibility, isMetric),
  visibilityUnit: getVisibilityUnit(isMetric),
  feelsLike: formatTemp(current.feels_like, isMetric),
  pressure: current.pressure,
  rain: getPrecipitation(current.rain ? current.rain["1h"] : 0, isMetric),
  rainLabel: getPrecipitationLabel(isMetric),
  rainMessage: getPrecipitationMessage(hourly, daily, isMetric, timezone),
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
  moonPhase: daily[0].moon_phase,
  ...getWeatherIconInfo(current.weather, true),
});

const getSunrisesSunsets = ({
  daily,
  timezone,
  is24hr,
}: {
  daily: DailyForecastResponse[];
  timezone: string;
  is24hr: boolean;
}): SunriseSunset[] => {
  const now = utcToZonedTime(new Date(Date.now()), timezone);

  return daily
    .reduce(
      (sunrisesSunsets, day) => [
        ...sunrisesSunsets,
        {
          dt: day.sunrise,
          type: "sunrise",
          label: "Sunrise",
        },
        {
          dt: day.sunset,
          type: "sunset",
          label: "Sunset",
        },
      ],
      []
    )
    .map(({ dt, ...s }) => ({
      ...s,
      dt: utcToZonedTime(new Date(dt * 1000), timezone),
      date: formatInTimeZone(
        new Date(dt * 1000),
        timezone,
        is24hr ? "HH:mm" : "h:mma"
      ),
    }))
    .filter((s) => now < s.dt);
};

export const formatWeather = ({
  data,
  isMetric,
  is24hr,
}: {
  data: WeatherResponse;
  isMetric: boolean;
  is24hr: boolean;
}): Weather => {
  if (!data) return null;

  const { timezone, current, daily, hourly, airPollution, alerts } = data;

  const sunrisesSunsets = getSunrisesSunsets({ daily, timezone, is24hr });

  return {
    timezone,
    alerts: formatAlerts({ alerts, timezone, is24hr }),
    current: formatCurrent({
      current,
      airPollution,
      isMetric,
      sunrisesSunsets,
      hourly,
      daily,
      timezone,
    }),
    hourly: formatHourly({
      hourly,
      timezone,
      isMetric,
      sunrisesSunsets,
      is24hr,
    }),
    daily: formatDaily({ daily, isMetric }),
  };
};
