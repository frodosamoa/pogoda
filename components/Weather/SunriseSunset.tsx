import { Sunrise, Sunset } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";

import WeatherItem from "./WeatherItem";

type SunrisePropsSunset = {
  sunset: number;
  sunrise: number;
  timezone: string;
};

const SunriseSunset = ({ sunrise, sunset, timezone }: SunrisePropsSunset) => {
  const now = Date.now();
  const isDay = now > sunrise && now < sunset;

  return (
    <WeatherItem
      Icon={isDay ? Sunset : Sunrise}
      title={isDay ? "Sunset" : "Sunrise"}
      $animationDelay={600}
    >
      {isDay
        ? formatInTimeZone(new Date(sunset * 1000), timezone, "kk:mm")
        : formatInTimeZone(new Date(sunrise * 1000), timezone, "kk:mm")}
    </WeatherItem>
  );
};

export default SunriseSunset;
