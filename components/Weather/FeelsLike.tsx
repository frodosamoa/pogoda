import { Thermometer } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type FeelsLikeProps = {
  feelsLike: number;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const FeelsLike = ({ feelsLike }: FeelsLikeProps) => (
  <WeatherItem Icon={Thermometer} title="Feels Like">
    <Value>{feelsLike}°</Value>
  </WeatherItem>
);

export default FeelsLike;
