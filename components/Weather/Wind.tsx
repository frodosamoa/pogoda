import { Wind as WindIcon } from "lucide-react";

import WeatherItem from "./WeatherItem";

type WindProps = {
  windSpeed: string;
  windDirection: string;
  windLabel: string;
};

const Wind = ({ windDirection, windSpeed, windLabel }: WindProps) => (
  <WeatherItem Icon={WindIcon} title="Wind" $animationDelay={400}>
    {windSpeed} {windLabel} {windDirection}
  </WeatherItem>
);

export default Wind;
