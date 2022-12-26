const kelvinToFahrenheit = (temp: number) =>
  Math.round(1.8 * (temp - 273) + 32);

const kelvinToCelcius = (temp: number) => Math.round(temp - 273.15);

export const formatTemp = (temp: number, isMetric: boolean) =>
  isMetric ? kelvinToCelcius(temp) : kelvinToFahrenheit(temp);
