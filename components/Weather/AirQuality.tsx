import { Component } from "lucide-react";

import WeatherItem from "./WeatherItem";

type AirQualityProps = {
  airQuality: number;
};

const AirQuality = ({ airQuality }: AirQualityProps) => (
  <WeatherItem Icon={Component} title="Air Quality" $animationDelay={1400}>
    {airQuality}
  </WeatherItem>
);

export default AirQuality;
