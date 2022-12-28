import { Eye } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type VisibilityProps = {
  visibility: number;
  visibilityUnit: string;
};

const Value = styled.div`
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Visibility = ({ visibility, visibilityUnit }: VisibilityProps) => (
  <WeatherItem Icon={Eye} title="Visibility">
    <Value>
      {visibility} {visibilityUnit}
    </Value>
  </WeatherItem>
);

export default Visibility;
