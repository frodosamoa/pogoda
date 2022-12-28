import { Wind as WindIcon } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type WindProps = {
  windSpeed: string;
  windDirection: string;
  windLabel: string;
};

const Value = styled.div`
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Label = styled.p`
  line-height: 0.8;
  font-size: ${({ theme }) => theme.fontSizes[5]};
`;

const Wind = ({ windDirection, windSpeed, windLabel }: WindProps) => (
  <WeatherItem Icon={WindIcon} title="Wind">
    <Value>
      {windSpeed} {windLabel}
    </Value>
    <Label>{windDirection}</Label>
  </WeatherItem>
);

export default Wind;
