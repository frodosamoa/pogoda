import { Sunrise, Sunset } from "lucide-react";

import WeatherItem from "./WeatherItem";

type SunrisePropsSunset = {
  sunset: string;
  sunrise: string;
  isDay: boolean;
};

const SunriseSunset = ({ sunrise, sunset, isDay }: SunrisePropsSunset) =>
  sunrise &&
  sunset && (
    <WeatherItem
      Icon={isDay ? Sunset : Sunrise}
      title={isDay ? "Sunset" : "Sunrise"}
      $animationDelay={600}
    >
      {isDay ? sunset : sunrise}
    </WeatherItem>
  );

export default SunriseSunset;
