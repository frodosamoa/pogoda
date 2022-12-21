import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

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

export const degreeToCompass = (num: number) => {
  const degreeLookup = Math.floor(num / 22.5 + 0.5);
  return COMPASS_LOOKUP[degreeLookup % 16];
};

export const kelvinToFahrenheit = (temp: number) =>
  Math.round(1.8 * (temp - 273) + 32);

export const kelvinToCelcius = (temp: number) => Math.round(temp - 273.15);

interface weatherIcon {
  [id: string]: {
    icon: string;
    label: string;
  };
}

export const getWeatherCodeIconInfo = (code: number) =>
  (weatherIcons as weatherIcon)[String(code)];

export const weatherToIcon = (code: number, isDay: boolean) => {
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

const getRainString = (rain: number | { "1h": number }, isMetric: boolean) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || 0;
  }

  rainStr = isMetric ? rainStr : rainStr * MM_TO_INCHES;

  return rainStr;
};

const getAirQuality = (airQuality: 1 | 2 | 3 | 4 | 5): string => {
  const qualityValues = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };
  return qualityValues[airQuality];
};

// {isMetric
//   ? (rain ?? 0).toFixed(1)
//   : ((rain ?? 0) * MM_TO_INCHES).toFixed(1)}
// {isMetric ? "mm" : " inches"}

export const formatWeather = (
  weather: WeatherResponse,
  isMetric: boolean
): Weather => {
  if (!weather) return null;

  const { timezone, current, daily, hourly, airPollution, alerts } = weather;
  const now = Date.now();

  return {
    timezone,
    alerts: alerts?.map(({ sender_name: senderName, event, end }) => ({
      senderName,
      event,
      end: formatInTimeZone(
        new Date(end * 1000),
        timezone,
        "HH:mm, eeee, MMMM dd"
      ),
    })),
    current: {
      sunrise: current.sunrise
        ? formatInTimeZone(new Date(current.sunrise * 1000), timezone, "kk:mm")
        : null,
      sunset: current.sunrise
        ? formatInTimeZone(new Date(current.sunset * 1000), timezone, "kk:mm")
        : null,
      humidity: current.humidity,
      temp: isMetric
        ? kelvinToCelcius(current.temp)
        : kelvinToFahrenheit(current.temp),
      label: getWeatherLabel(current.weather),
      visibility: isMetric
        ? `${Math.round(current.visibility / 1000)} km`
        : `${Math.round(current.visibility * METERS_TO_MILES)} miles`,
      iconId: getWeatherIconId(current.weather),
      isDay: now > current.sunrise && now < current.sunset,
      feelsLike: isMetric
        ? kelvinToCelcius(current.feels_like)
        : kelvinToFahrenheit(current.feels_like),
      pressure: current.pressure,
      rain: `${getRainString(current.rain || 0, isMetric)} ${
        isMetric ? "mm" : "inches"
      }`,
      uvIndex: current.uvi,
      windSpeed: isMetric
        ? `${current.wind_speed.toFixed(1)} m/s`
        : `${(current.wind_speed * MPS_TO_MPH).toFixed(1)} mph`,
      windDegree: degreeToCompass(current.wind_deg),
      airQuality: getAirQuality(airPollution.list[0].main.aqi),
    },
    hourly: hourly?.map(({ dt, temp, weather, ...hour }, index: number) => ({
      date:
        index === 0
          ? "Now"
          : formatInTimeZone(new Date(dt * 1000), timezone, "HH"),

      temp: isMetric ? kelvinToCelcius(temp) : kelvinToFahrenheit(temp),
      label: getWeatherLabel(weather),
      iconId: getWeatherIconId(weather),
    })),
    daily: daily?.map(
      ({ dt, temp, weather, sunrise, sunset, ...day }, index: number) => ({
        sunrise,
        sunset,
        fullDate: format(new Date(dt * 1000), "PP"),
        date: index === 0 ? "Today" : format(new Date(dt * 1000), "ccc"),
        temp: {
          min: isMetric
            ? kelvinToCelcius(temp.min)
            : kelvinToFahrenheit(temp.min),
          max: isMetric
            ? kelvinToCelcius(temp.max)
            : kelvinToFahrenheit(temp.max),
        },
        label: getWeatherLabel(weather),
        iconId: getWeatherIconId(weather),
      })
    ),
  };
};
