import { Component } from "lucide-react";
import styled from "styled-components";
import chroma from "chroma-js";

import { WeatherItemTitle } from "./WeatherItem";

const Container = styled.div<{ $hasAlerts: boolean }>`
  grid-column: ${({ $hasAlerts }) => ($hasAlerts ? "3 / 5" : "5 / 7")};
  grid-row: ${({ $hasAlerts }) => ($hasAlerts ? "2 / 3" : "1 / 2")};
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
    grid-column: 3 / 5;
    grid-row: ${({ $hasAlerts }) => ($hasAlerts ? "1 / 2" : "2 / 3")};
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 3;
    grid-row: ;

    grid-row: ${({ $hasAlerts }) => ($hasAlerts ? "6 / 7" : "5 / 6")};
  }
`;

type AirQualityProps = {
  airQuality: number;
  airQualityLabel: string;
  airQualityMessage: string;
  hasAlerts: boolean;
};

const Value = styled.div`
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Message = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const AirQuality = ({
  airQuality,
  airQualityLabel,
  airQualityMessage,
  hasAlerts,
}: AirQualityProps) => (
  <Container $hasAlerts={hasAlerts}>
    <WeatherItemTitle Icon={Component} title="Air Quality" />
    <Value>
      {airQuality} - {airQualityLabel}
    </Value>
    <Message>
      Air quality index is {airQualityLabel.toLowerCase()}. {airQualityMessage}
    </Message>
  </Container>
);

export default AirQuality;
