import { Target } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type PressureProps = {
  pressure: number;
};

const Value = styled.div`
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Pressure = ({ pressure }: PressureProps) => (
  <WeatherItem Icon={Target} title="Pressure">
    <Value>{pressure} hPa</Value>
  </WeatherItem>
);

export default Pressure;
