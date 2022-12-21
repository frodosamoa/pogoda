import { Thermometer } from "lucide-react";

import WeatherItem from "./WeatherItem";

type FeelsLikeProps = {
  feelsLike: number;
};

const FeelsLike = ({ feelsLike }: FeelsLikeProps) => (
  <WeatherItem Icon={Thermometer} title="Feels Like" $animationDelay={1000}>
    {feelsLike}°
  </WeatherItem>
);

export default FeelsLike;
