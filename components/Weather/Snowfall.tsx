import { Snowflake } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type SnowfallProps = {
  snow: number;
  snowLabel: string;
  snowMessage: string;
};

const Value = styled.div`
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Label = styled.p`
  line-height: 0.8;
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

const Snowfall = ({ snow, snowLabel, snowMessage }: SnowfallProps) => (
  <WeatherItem Icon={Snowflake} title="Snowfall">
    <Value>
      {snow}
      {snowLabel}
    </Value>
    <Label>in last 1h</Label>
    <Subtitle>{snowMessage}</Subtitle>
  </WeatherItem>
);

export default Snowfall;
