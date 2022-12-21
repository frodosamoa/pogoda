import { Wind as WindIcon } from "lucide-react";

import WeatherItem from "./WeatherItem";

type WindProps = {
  windSpeed: string;
  windDegree: string;
};

const Wind = ({ windDegree, windSpeed }: WindProps) => (
  <WeatherItem Icon={WindIcon} title="Wind" $animationDelay={800}>
    {windSpeed} {windDegree}
  </WeatherItem>
);

export default Wind;
