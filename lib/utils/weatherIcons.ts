import weatherIcons from "../constants/weatherIcons";

import { capitalize } from "./string";

interface weatherIcon {
  [id: string]: {
    icon: string;
    label: string;
  };
}

const getWeatherCodeIconInfo = (code: number) =>
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

export const getWeatherLabel = (weather: WeatherCondition[]) => {
  if (weather) {
    const label = getWeatherCodeIconInfo(weather[0].id).label;
    return capitalize(label);
  }

  return null;
};

export const getWeatherIconInfo = (
  weather: WeatherCondition[],
  isDay: boolean
) => {
  return {
    iconClassName: weatherToIcon(weather[0]?.id, isDay),
    label: getWeatherLabel(weather),
  };
};
