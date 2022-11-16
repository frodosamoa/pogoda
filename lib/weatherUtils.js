import weatherIcons from "../weatherIcons.json";

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

export const degreeToCompass = (num) => {
  const degreeLookup = Math.floor(num / 22.5 + 0.5);
  return COMPASS_LOOKUP[degreeLookup % 16];
};

export const kelvinToFahrenheit = (temp) => Math.round(1.8 * (temp - 273) + 32);

export const kelvinToCelcius = (temp) => Math.round(temp - 273.15);

export const getWeatherCodeIconInfo = (code) => weatherIcons[code];

export const weatherToIcon = (code, isDay) => {
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
