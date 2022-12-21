import { Umbrella } from "lucide-react";

import WeatherItem from "./WeatherItem";

type RainfallProps = {
  rain: string;
};

const Rainfall = ({ rain }: RainfallProps) => (
  <WeatherItem Icon={Umbrella} title="Rainfall" $animationDelay={1000}>
    {rain}
  </WeatherItem>
);

export default Rainfall;
