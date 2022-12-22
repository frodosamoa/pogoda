import { Snowflake } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type SnowfallProps = {
  snow: number;
  snowLabel: string;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Label = styled.p`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Snowfall = ({ snow, snowLabel }: SnowfallProps) => (
  <WeatherItem Icon={Snowflake} title="Snowfall" $animationDelay={400}>
    <Value>
      {snow}
      {snowLabel}
    </Value>
    <Label>in the last hour</Label>
  </WeatherItem>
);

export default Snowfall;
