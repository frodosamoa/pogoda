import { Umbrella } from "lucide-react";

import { MM_TO_INCHES } from "../../lib/constants/conversion";
import WeatherItem from "./WeatherItem";

const getRainString = (rain: number | { "1h": number }, isMetric: boolean) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || 0;
  }

  rainStr = isMetric ? rainStr : rainStr * MM_TO_INCHES;

  return rainStr;
};

type PrecipitationProps = {
  isMetric: boolean;
  rain: number | { "1h": number };
};

const Precipitation = ({ isMetric, rain }: PrecipitationProps) => (
  <WeatherItem Icon={Umbrella} title="Precipitation" $animationDelay={1000}>
    {getRainString(rain, isMetric)}
    {isMetric ? "mm" : " inches"}
  </WeatherItem>
);

export default Precipitation;
