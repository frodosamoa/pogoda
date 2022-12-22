import { Component } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type AirQualityProps = {
  airQuality: string;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const AirQuality = ({ airQuality }: AirQualityProps) => (
  <WeatherItem Icon={Component} title="Air Quality" $animationDelay={400}>
    <Value>{airQuality}</Value>
  </WeatherItem>
);

export default AirQuality;
