import { Droplets } from "lucide-react";

import WeatherItem from "./WeatherItem";

type HumidityProps = {
  humidity: number;
};

const Humidity = ({ humidity }: HumidityProps) => (
  <WeatherItem Icon={Droplets} title="Humidity" $animationDelay={800}>
    {humidity}%
  </WeatherItem>
);

export default Humidity;
