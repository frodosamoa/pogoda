import styled from "styled-components";
import chroma from "chroma-js";

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
  flex: 1.5;
  white-space: nowrap;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const IconContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Icon = styled.i`
  flex: 1;

  text-align: center;
  line-height: initial;

  height: 24px;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const PercentChance = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[8]};
`;

const DayForecast = ({ day, minTemp, maxTemp }: DayForecastProps) => (
  <Container>
    <TitleContainer>
      <Title title={day.fullDate}>{day.date}</Title>
      {/* <Subtitle title={day.label}>{day.label}</Subtitle> */}
    </TitleContainer>
    <IconContainer>
      <Icon title={day.label} className={day.iconClassName} />
      {day.precipitationChance > 0 && (
        <PercentChance>{day.precipitationChance}%</PercentChance>
      )}
    </IconContainer>

    <TemperatureBar
      minTemp={minTemp}
      maxTemp={maxTemp}
      dayMin={day.temp.min}
      dayMax={day.temp.max}
    />
  </Container>
);

export default DayForecast;
