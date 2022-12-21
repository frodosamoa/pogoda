import styled from "styled-components";
import chroma from "chroma-js";

import { weatherToIcon } from "../../../lib/utils/weather";
import TemperatureBar from "./TemperatureBar";

type DayForecastProps = {
  day: DailyForecast;
  minTemp: number;
  maxTemp: number;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme: { theme, colors } }) =>
        theme === "yellow" || theme === "light"
          ? chroma(colors.greyDark).alpha(0.3).css()
          : chroma(colors.whiteTer).alpha(0.3).css()};
  }
`;

const TitleContainer = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
`;

const Title = styled.div`
  text-align: start;
  line-height: 1;

  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Subtitle = styled.div`
  text-align: start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: ${({ theme }) => theme.fontSizes[7]};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    display: none;
  }
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Icon = styled.i`
  flex: 1;

  height: ${({ theme }) => theme.fontSizes[6]};
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const DayForecast = ({ day, minTemp, maxTemp }: DayForecastProps) => (
  <Container>
    <TitleContainer>
      <Title title={day.fullDate}>{day.date}</Title>
      {/* <Subtitle title={day.label}>{day.label}</Subtitle> */}
    </TitleContainer>
    <IconContainer>
      <Icon title={day.label} className={weatherToIcon(day.iconId, true)} />
    </IconContainer>

    <TemperatureBar
      minTemp={minTemp}
      maxTemp={maxTemp}
      dayMin={day.temp.min}
      dayMax={day.temp.max}
    />
    {/* {pop > 0 && <PercentChance>{Math.round(pop * 100)}%</PercentChance>} */}
  </Container>
);

export default DayForecast;
