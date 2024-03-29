import { Droplets } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type HumidityProps = {
  humidity: number;
  dewPoint: number;
};

const Value = styled.div`
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Subtitle = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[8]};
`;

const Humidity = ({ humidity, dewPoint }: HumidityProps) => (
  <WeatherItem Icon={Droplets} title="Humidity">
    <Value>{humidity}%</Value>
    <Subtitle>Dew point: {dewPoint}°</Subtitle>
  </WeatherItem>
);

export default Humidity;
