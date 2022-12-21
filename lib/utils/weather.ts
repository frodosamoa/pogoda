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

const getRainString = (
  rain: number | { "1h": number },
  isMetric: boolean
): string | number => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || 0;
  }

  rainStr = isMetric ? rainStr : rainStr * MM_TO_INCHES;
  rainStr = rainStr.toFixed(1);

  return rainStr === "0.0" ? 0 : rainStr;
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

  return "Very Poor";
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
        ? formatInTimeZone(new Date(current.sunrise * 1000), timezone, "HH:mm")
        : null,
      sunset: current.sunrise
        ? formatInTimeZone(new Date(current.sunset * 1000), timezone, "HH:mm")
        : null,
      humidity: current.humidity,
      temp: getTemp(current.temp, isMetric),
      label: getWeatherLabel(current.weather),
      visibility: isMetric
        ? `${Math.round(current.visibility / 1000)} km`
        : `${Math.round(current.visibility * METERS_TO_MILES)} miles`,
      iconId: getWeatherIconId(current.weather),
      isDay: now > current.sunrise && now < current.sunset,
      feelsLike: getTemp(current.feels_like, isMetric),
      pressure: current.pressure,
      rain: `${getRainString(current.rain || 0, isMetric)} ${
        isMetric ? "mm" : "inches"
      }`,
      uvIndex: Math.floor(current.uvi),
      uvLabel: getUVLabel(current.uvi),
      windSpeed: isMetric
        ? `${current.wind_speed.toFixed(1)} m/s`
        : `${(current.wind_speed * MPS_TO_MPH).toFixed(1)} mph`,
      windDegree: degreeToCompass(current.wind_deg),
      airQuality: `${Math.round(
        airPollution.list[0].components.pm2_5
      )} - ${getAirQualityLabel(airPollution.list[0].components.pm2_5)}`,
    },
    hourly: hourly?.map(({ dt, temp, weather, pop }, index: number) => ({
      date:
        index === 0
          ? "Now"
          : formatInTimeZone(new Date(dt * 1000), timezone, "HH"),

      temp: getTemp(temp, isMetric),
      label: getWeatherLabel(weather),
      iconClassName: weatherToIcon(getWeatherIconId(weather), false),
      precipitationChance: Math.round(pop * 100),
    })),
    daily: daily?.map(
      ({ dt, temp, weather, sunrise, sunset, pop }, index: number) => ({
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
      })
    ),
  };
};
