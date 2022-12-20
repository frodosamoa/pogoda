import { format } from "date-fns";
import { Sunrise, Sunset } from "lucide-react";

import WeatherItem from "./WeatherItem";

type SunrisePropsSunset = {
  sunset: number;
  sunrise: number;
};

const SunriseSunset = ({ sunrise, sunset }: SunrisePropsSunset) => {
  const now = Date.now();
  const isDay = now > sunrise && now < sunset;

  return (
    <WeatherItem
      Icon={isDay ? Sunset : Sunrise}
      title={isDay ? "Sunset" : "Sunrise"}
      $animationDelay={600}
    >
      {isDay
        ? format(new Date(sunset * 1000), "kk:mm")
        : format(new Date(sunrise * 1000), "kk:mm")}
    </WeatherItem>
  );
};

export default SunriseSunset;
