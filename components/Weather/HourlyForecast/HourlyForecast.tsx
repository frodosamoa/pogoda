import styled from "styled-components";
import chroma from "chroma-js";
import { Clock } from "lucide-react";

import { fadeIn } from "../../../lib/constants/animations";

import HourForecast from "./HourForecast";

type HourlyForecastProps = {
  hourly: HourlyForecast[];
  hasAlerts: boolean;
};

const Container = styled.div<{ $hasAlerts: boolean }>`
  grid-column: ${({ $hasAlerts }) => ($hasAlerts ? "3 / 7" : "1 / 5")};
  grid-row: 1 / 2;
  padding: 8px;
  border-radius: 8px;
  overflow: scroll;
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 400ms 1 normal forwards running
    ${fadeIn};
  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 4;

    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 2 / 3;" : "")}
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;

    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 2 / 3;" : "")}
  }
`;

const HourContainer = styled.div`
  display: flex;
  overflow: scroll;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

function withIconStyles<T>(Component: React.ComponentType<T>) {
  return styled(Component)`
    margin-right: 6px;
    width: ${({ theme }) => theme.fontSizes[7]};
    height: ${({ theme }) => theme.fontSizes[7]};
  `;
}

const HourlyForecast = ({ hourly = [], hasAlerts }: HourlyForecastProps) => {
  const StyledIcon = withIconStyles(Clock);
  return (
    <Container $hasAlerts={hasAlerts}>
      <TitleContainer>
        <StyledIcon />
        <Title>Hourly Forecast</Title>
      </TitleContainer>
      <HourContainer>
        {hourly.map((hour, index) => (
          <HourForecast key={index} hour={hour} />
        ))}
      </HourContainer>
    </Container>
  );
};

export default HourlyForecast;
