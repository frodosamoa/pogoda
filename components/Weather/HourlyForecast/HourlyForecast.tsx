import styled from "styled-components";
import chroma from "chroma-js";
import { Clock } from "lucide-react";

import HourForecast from "./HourForecast";

import { WeatherItemTitle } from "@/components/Weather/WeatherItem";

type HourlyForecastProps = {
  hourly: (HourlyForecast | SunriseSunset)[];
  hasAlerts: boolean;
};

const Container = styled.div<{ $hasAlerts: boolean }>`
  grid-column: ${({ $hasAlerts }) => ($hasAlerts ? "3 / 7" : "1 / 5")};
  grid-row: 1 / 2;
  padding: 8px;
  border-radius: 8px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  position: relative;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.3).css()
      : chroma(colors.greyDark).alpha(0.2).css()};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.container}px) {
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-row: 2 / 3;" : "")}
    ${({ $hasAlerts }) => ($hasAlerts ? "grid-column: 1 / 5;" : "")}
  }

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

const HourlyForecast = ({ hourly = [], hasAlerts }: HourlyForecastProps) => (
  <Container $hasAlerts={hasAlerts}>
    <WeatherItemTitle Icon={Clock} title="Hourly Forecast" />
    <HourContainer>
      {hourly.map((hour, index) => (
        <HourForecast key={index} hour={hour} />
      ))}
    </HourContainer>
  </Container>
);

export default HourlyForecast;
