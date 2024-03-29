import { Sunrise, Sunset } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type SunrisePropsSunset = {
  sunrisesSunsets: SunriseSunset[];
};

const Title = styled.div`
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

const SunriseSunset = ({ sunrisesSunsets }: SunrisePropsSunset) =>
  sunrisesSunsets.length > 2 && (
    <WeatherItem
      Icon={sunrisesSunsets[0].type === "sunset" ? Sunset : Sunrise}
      title={sunrisesSunsets[0].type === "sunset" ? "Sunset" : "Sunrise"}
    >
      <Title>{sunrisesSunsets[0].date}</Title>
      <Subtitle>
        {sunrisesSunsets[1].type === "sunrise" ? "Sunrise" : "Sunset"}:{" "}
        {sunrisesSunsets[1].date}
      </Subtitle>
    </WeatherItem>
  );

export default SunriseSunset;
