import { Sun } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type UVIndexProps = {
  uvIndex: number;
  uvLabel: string;
};

const Index = styled.p`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Label = styled.p`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const UVIndex = ({ uvIndex, uvLabel }: UVIndexProps) => (
  <WeatherItem Icon={Sun} title="UV Index" $animationDelay={1200}>
    <Index>{uvIndex}</Index>
    <Label>{uvLabel}</Label>
  </WeatherItem>
);

export default UVIndex;
