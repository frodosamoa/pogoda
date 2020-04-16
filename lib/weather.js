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

export const getWeatherCodeIconInfo = (code) => weatherIcons[code];

export const weatherToIcon = (code) => {
  const prefix = "wi wi-";
  let icon = getWeatherCodeIconInfo(code).icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  return prefix + icon;
};
