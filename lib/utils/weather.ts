import { format } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";

import weatherIcons from "../constants/weatherIcons";
import {
  METERS_TO_MILES,
  MPS_TO_MPH,
  MM_TO_INCHES,
} from "../constants/conversion";

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

const degreeToCompass = (num: number) => {
  const degreeLookup = Math.floor(num / 22.5 + 0.5);
  return COMPASS_LOOKUP[degreeLookup % 16];
};

const kelvinToFahrenheit = (temp: number) =>
  Math.round(1.8 * (temp - 273) + 32);

const kelvinToCelcius = (temp: number) => Math.round(temp - 273.15);

interface weatherIcon {
  [id: string]: {
    icon: string;
    label: string;
  };
}

const getWeatherCodeIconInfo = (code: number) =>
  (weatherIcons as weatherIcon)[String(code)];

const weatherToIcon = (code: number, isDay: boolean) => {
  const prefix = "wi wi-";
  let icon = getWeatherCodeIconInfo(code).icon;

  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    if (isDay) {
      icon = "day-" + icon;
    } else {
      if (code === 800) {
        icon = "night-clear";
      } else {
        icon = "night-alt-" + icon;
      }
    }
  }

  return prefix + icon;
};

const getWeatherIconId = (weather: WeatherCondition[]) => {
  if (weather) {
    return weather[0].id;
  }

  return null;
};

const getWeatherLabel = (weather: WeatherCondition[]) => {
  if (weather) {
    const label = getWeatherCodeIconInfo(weather[0].id).label;
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  return null;
};

const getLength = (length: number, isMetric: boolean) => {
  return +(isMetric ? length : length * MM_TO_INCHES).toFixed(2);
};

const getAirQualityLabel = (airQuality: number): string => {
  if (airQuality <= 33) {
    return "Very Good";
  } else if (airQuality <= 66) {
    return "Good";
  } else if (airQuality <= 99) {
    return "Fair";
  } else if (airQuality <= 149) {
    return "Poor";
  } else if (airQuality <= 200) {
    return "Very Poor";
  }

  return "Hazardous";
};

const getUVLabel = (airQuality: number): string => {
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

const getTemp = (temp: number, isMetric: boolean) =>
  isMetric ? kelvinToCelcius(temp) : kelvinToFahrenheit(temp);

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
      temp: getTemp(temp, isMetric),
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
      min: getTemp(temp.min, isMetric),
      max: getTemp(temp.max, isMetric),
    },
    label: getWeatherLabel(weather),
    iconClassName: weatherToIcon(getWeatherIconId(weather), true),
    precipitationChance: Math.round(pop * 100),
  }));

const formatCurrent = (
  current: CurrentWeatherResponse,
  airPollution: AirPollutionResponse,
  isMetric: boolean,
  sunrisesSunsets: SunriseSunset[]
) => ({
  sunrisesSunsets,
  humidity: current.humidity,
  temp: getTemp(current.temp, isMetric),
  label: getWeatherLabel(current.weather),
  visibility: isMetric
    ? `${Math.round(current.visibility / 1000)} km`
    : `${Math.round(current.visibility * METERS_TO_MILES)} miles`,
  iconId: getWeatherIconId(current.weather),
  feelsLike: getTemp(current.feels_like, isMetric),
  pressure: current.pressure,
  rain: getLength(current.rain ? current.rain["1h"] : 0, isMetric),
  rainLabel: isMetric ? "mm" : '"',
  snow: getLength(current.snow ? current.snow["1h"] : 0, isMetric),
  snowLabel: isMetric ? "mm" : '"',
  uvIndex: Math.floor(current.uvi),
  uvLabel: getUVLabel(current.uvi),
  windSpeed: isMetric
    ? `${current.wind_speed.toFixed(1)} m/s`
    : `${(current.wind_speed * MPS_TO_MPH).toFixed(1)} mph`,
  windDegree: degreeToCompass(current.wind_deg),
  airQuality: `${Math.round(
    airPollution.list[0].components.pm2_5
  )} - ${getAirQualityLabel(airPollution.list[0].components.pm2_5)}`,
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
    .slice(0, 4)
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

  console.log(sunrisesSunsets);
  return {
    timezone,
    alerts: formatAlerts(alerts, timezone),
    current: formatCurrent(current, airPollution, isMetric, sunrisesSunsets),
    hourly: formatHourly(hourly, timezone, isMetric, sunrisesSunsets),
    daily: formatDaily(daily, isMetric),
  };
};
