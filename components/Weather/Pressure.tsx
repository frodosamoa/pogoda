import { Ruler } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type PressureProps = {
  pressure: number;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Pressure = ({ pressure }: PressureProps) => (
  <WeatherItem Icon={Ruler} title="Pressure" $animationDelay={400}>
    <Value>{pressure} hPa</Value>
  </WeatherItem>
);

export default Pressure;
