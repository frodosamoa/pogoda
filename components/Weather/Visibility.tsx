import { Eye } from "lucide-react";
import styled from "styled-components";

import WeatherItem from "./WeatherItem";

type VisibilityProps = {
  visibility: string;
};

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Visibility = ({ visibility }: VisibilityProps) => (
  <WeatherItem Icon={Eye} title="Visibility" $animationDelay={400}>
    <Value>{visibility}</Value>
  </WeatherItem>
);

export default Visibility;
