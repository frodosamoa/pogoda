import { Thermometer } from "lucide-react";

import { kelvinToCelcius, kelvinToFahrenheit } from "../../lib/utils/weather";
import WeatherItem from "./WeatherItem";

type FeelsLikeProps = {
  isMetric: boolean;
  feelsLike: number;
};

const FeelsLike = ({ isMetric, feelsLike }: FeelsLikeProps) => (
  <WeatherItem Icon={Thermometer} title="Feels Like" $animationDelay={1000}>
    {isMetric ? kelvinToCelcius(feelsLike) : kelvinToFahrenheit(feelsLike)}°
  </WeatherItem>
);

export default FeelsLike;
