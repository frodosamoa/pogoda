import { Wind as WindIcon } from "lucide-react";
import { degreeToCompass } from "../../lib/utils/weather";
import { MPS_TO_MPH } from "../../lib/constants/conversion";
import WeatherItem from "./WeatherItem";

type WindProps = {
  isMetric: boolean;
  windSpeed: number;
  windDegree: number;
};

const Wind = ({ isMetric, windDegree, windSpeed }: WindProps) => (
  <WeatherItem Icon={WindIcon} title="Wind" $animationDelay={800}>
    {isMetric
      ? `${windSpeed.toFixed(1)}m/s`
      : `${(windSpeed * MPS_TO_MPH).toFixed(1)}mph`}{" "}
    {degreeToCompass(windDegree)}
  </WeatherItem>
);

export default Wind;
