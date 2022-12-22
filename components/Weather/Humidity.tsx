import { Droplets } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type HumidityProps = {
  humidity: number;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Humidity = ({ humidity }: HumidityProps) => (
  <WeatherItem Icon={Droplets} title="Humidity" $animationDelay={400}>
    <Value>{humidity}%</Value>
  </WeatherItem>
);

export default Humidity;
