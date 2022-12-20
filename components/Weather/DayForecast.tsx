import { format } from "date-fns";
import styled from "styled-components";
import chroma from "chroma-js";

import { fadeIn } from "../../lib/constants/animations";
import { MM_TO_INCHES, MPS_TO_MPH } from "../../lib/constants/conversion";
import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
  degreeToCompass,
} from "../../lib/utils/weather";

type DayForecastProps = {
  index: number;
  day: DailyForecast;
  isMetric: boolean;
  dailyForecastView: string;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme: { theme, colors } }) =>
        theme === "yellow" || theme === "light"
          ? chroma(colors.greyDark).alpha(0.3).css()
          : chroma(colors.whiteTer).alpha(0.3).css()};
  }
`;

const Title = styled.p`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Icon = styled.i`
  flex: 1;
  height: ${({ theme }) => theme.fontSizes[6]};
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const DayForecast = ({
  index,
  day,
  isMetric,
  dailyForecastView,
}: DayForecastProps) => {
  const {
    weather: weatherArray,
    temp,
    dt: date,
    rain,
    wind_speed: windSpeed,
    wind_deg: windDegree,
  } = day;
  const weather = weatherArray[0];
  const isFirstDay = index === 0;
  const currentDate = new Date().getTime() / 1000;

  const isDay =
    (isFirstDay && (day.sunrise > currentDate || currentDate < day.sunset)) ||
    !isFirstDay;

  return (
    <Container>
      <Title title={format(new Date(date * 1000), "PP")}>
        {format(new Date(date * 1000), "ccc")}
      </Title>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Icon
          title={getWeatherCodeIconInfo(weather.id).label}
          className={weatherToIcon(weather.id, isDay)}
        />
        {/* {pop > 0 && <PercentChance>{Math.round(pop * 100)}%</PercentChance>} */}
      </div>
      <div style={{ flex: 3, display: "flex" }}>
        {dailyForecastView === "temperature" && (
          <>
            <Title>
              {isMetric
                ? kelvinToCelcius(temp.min)
                : kelvinToFahrenheit(temp.min)}
              °
            </Title>
            <Title>
              {isMetric
                ? kelvinToCelcius(temp.max)
                : kelvinToFahrenheit(temp.max)}
              °
            </Title>
          </>
        )}
        {dailyForecastView === "precipitation" && (
          <Title>
            {isMetric
              ? (rain ?? 0).toFixed(1)
              : ((rain ?? 0) * MM_TO_INCHES).toFixed(1)}
            {isMetric ? "mm" : " inches"}
          </Title>
        )}
        {dailyForecastView === "wind" && (
          <>
            <Title>
              {isMetric
                ? `${windSpeed.toFixed(1)}m/s`
                : `${(windSpeed * MPS_TO_MPH).toFixed(1)}mph`}
            </Title>
            <Title>{degreeToCompass(windDegree)}</Title>
          </>
        )}
      </div>
    </Container>
  );
};

export default DayForecast;
