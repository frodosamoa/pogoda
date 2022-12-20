import { Sun } from "lucide-react";

import WeatherItem from "./WeatherItem";

type UVIndexProps = {
  uvIndex: number;
};

const UVIndex = ({ uvIndex }: UVIndexProps) => (
  <WeatherItem Icon={Sun} title="UV Index" $animationDelay={1200}>
    {uvIndex}
  </WeatherItem>
);

export default UVIndex;
