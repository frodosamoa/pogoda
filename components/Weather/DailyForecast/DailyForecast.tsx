import styled from "styled-components";
import { CalendarDays } from "lucide-react";
import chroma from "chroma-js";

import { fadeIn } from "../../../lib/constants/animations";
import { WeatherItemTitle } from "../WeatherItem";

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

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.3).css()
      : chroma(colors.greyDark).alpha(0.2).css()};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.container}px) {
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 3 / 6;" : "")}
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 3 / 6;" : "")}
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 3 / 6;" : "")}
  }
`;

const DayForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DailyForecast = ({ daily = [], hasAlerts }: DailyForecastProps) => {
  const minTemp = Math.min(...daily.map((day) => day.temp.min));
  const maxTemp = Math.max(...daily.map((day) => day.temp.max));

  return (
    <Container $hasAlerts={hasAlerts}>
      <WeatherItemTitle Icon={CalendarDays} title="Daily Forecast" />
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
