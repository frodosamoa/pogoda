import { Sun } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type UVIndexProps = {
  uvIndex: number;
  uvLabel: string;
  uvMessage: string;
};

const Index = styled.p`
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

const UVIndex = ({ uvIndex, uvLabel, uvMessage }: UVIndexProps) => (
  <WeatherItem Icon={Sun} title="UV Index" $animationDelay={400}>
    <Index>{uvIndex}</Index>
    <Label>{uvLabel}</Label>
    <Subtitle>{uvMessage}</Subtitle>
  </WeatherItem>
);

export default UVIndex;
