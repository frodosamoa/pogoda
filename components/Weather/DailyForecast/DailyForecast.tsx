import styled from "styled-components";
import { CalendarDays } from "lucide-react";
import chroma from "chroma-js";

import { fadeIn } from "../../../lib/constants/animations";
import DayForecast from "./DayForecast";

type DailyForecastProps = {
  daily: DailyForecast[];
  hasAlerts: boolean;
};

const Container = styled.div<{ $hasAlerts: boolean }>`
  grid-column: 1 / 3;
  grid-row: 2 / 5;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  opacity: 0;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 600ms 1 normal forwards running
    ${fadeIn};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 3 / 6;" : "")}
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 3 / 6;" : "")}
  }
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

const DayForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DailyForecast = ({ daily = [], hasAlerts }: DailyForecastProps) => {
  const StyledIcon = withIconStyles(CalendarDays);
  const minTemp = Math.min(...daily.map((day) => day.temp.min));
  const maxTemp = Math.max(...daily.map((day) => day.temp.max));

  return (
    <Container $hasAlerts={hasAlerts}>
      <TitleContainer>
        <StyledIcon />
        <Title>Daily Forecast</Title>
      </TitleContainer>
      <DayForecastContainer>
        {daily.map((day, index) => (
          <DayForecast
            key={index}
            day={day}
            minTemp={minTemp}
            maxTemp={maxTemp}
          />
        ))}
      </DayForecastContainer>
    </Container>
  );
};

export default DailyForecast;
