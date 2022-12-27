import { Umbrella } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type RainfallProps = {
  rain: number;
  rainLabel: string;
  rainMessage: string;
};

const Value = styled.div`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;
const Label = styled.p`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Subtitle = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[8]};
  white-space: break-spaces;
  width: 110px;
`;

const Rainfall = ({ rain, rainLabel, rainMessage }: RainfallProps) => (
  <WeatherItem Icon={Umbrella} title="Rainfall" $animationDelay={400}>
    <Value>
      {rain}
      {rainLabel}
    </Value>
    <Label>in last 1h</Label>
    <Subtitle>{rainMessage}</Subtitle>
  </WeatherItem>
);

export default Rainfall;
