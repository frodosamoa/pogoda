import { Sunrise, Sunset } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type SunrisePropsSunset = {
  sunrisesSunsets: SunriseSunset[];
};

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Subtitle = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const SunriseSunset = ({ sunrisesSunsets }: SunrisePropsSunset) =>
  sunrisesSunsets.length > 2 && (
    <WeatherItem
      Icon={sunrisesSunsets[0].type === "sunset" ? Sunset : Sunrise}
      title={sunrisesSunsets[0].type === "sunset" ? "Sunset" : "Sunrise"}
      $animationDelay={400}
    >
      <Title>{sunrisesSunsets[0].date}</Title>
      <Subtitle>
        {sunrisesSunsets[1].type === "sunrise" ? "Sunrise" : "Sunset"}:{" "}
        {sunrisesSunsets[1].date}
      </Subtitle>
    </WeatherItem>
  );

export default SunriseSunset;
