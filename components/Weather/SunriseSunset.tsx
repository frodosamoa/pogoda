import { Sunrise, Sunset } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type SunrisePropsSunset = {
  sunset: string;
  sunrise: string;
  isDay: boolean;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const SunriseSunset = ({ sunrise, sunset, isDay }: SunrisePropsSunset) =>
  sunrise &&
  sunset && (
    <WeatherItem
      Icon={isDay ? Sunset : Sunrise}
      title={isDay ? "Sunset" : "Sunrise"}
      $animationDelay={600}
    >
      <Value>{isDay ? sunset : sunrise}</Value>
    </WeatherItem>
  );

export default SunriseSunset;
