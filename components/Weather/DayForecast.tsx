import styled from "styled-components";
import chroma from "chroma-js";
import { format } from "date-fns";

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
  minTemp: number;
  maxTemp: number;
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

const Temp = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Icon = styled.i`
  flex: 1;
  height: ${({ theme }) => theme.fontSizes[6]};
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Bar = styled.div`
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  height: 10px;
  flex: 1;
  border-radius: 5px;
  margin: 0px 8px;
  position: relative;

  transition: background-color 150ms ease-in-out;
`;

const InnerBar = styled.div<{ $start: string; $end: string }>`
  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};
  height: 6px;
  flex: 1;
  border-radius: 3px;
  margin: 2px;
  position: absolute;
  z-index: 100;

  left: ${({ $start }) => $start}%;
  right: ${({ $end }) => $end}%;

  transition: background-color 150ms ease-in-out;
`;

const DayForecast = ({
  index,
  day,
  isMetric,
  dailyForecastView,
  minTemp,
  maxTemp,
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

  const barWidth = maxTemp - minTemp;
  const innerBarStart = (((temp.min - minTemp) / barWidth) * 100).toFixed(2);
  const innerBarEnd = (((maxTemp - temp.max) / barWidth) * 100).toFixed(2);

  return (
    <Container>
      <Title title={format(new Date(date * 1000), "PP")}>
        {index === 0 ? "Today" : format(new Date(date * 1000), "ccc")}
      </Title>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Icon
          title={getWeatherCodeIconInfo(weather.id).label}
          className={weatherToIcon(weather.id, isDay)}
        />
      </div>

      {dailyForecastView === "temperature" && (
        <div
          style={{
            flex: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Temp>
            {isMetric
              ? kelvinToCelcius(temp.min)
              : kelvinToFahrenheit(temp.min)}
            °
          </Temp>
          <Bar>
            <InnerBar $start={innerBarStart} $end={innerBarEnd} />
          </Bar>
          <Temp>
            {isMetric
              ? kelvinToCelcius(temp.max)
              : kelvinToFahrenheit(temp.max)}
            °
          </Temp>
        </div>
      )}
      {dailyForecastView === "precipitation" && (
        <div
          style={{ flex: 3, display: "flex", justifyContent: "space-between" }}
        >
          {/* {pop > 0 && <PercentChance>{Math.round(pop * 100)}%</PercentChance>} */}
          <Title>
            {isMetric
              ? (rain ?? 0).toFixed(1)
              : ((rain ?? 0) * MM_TO_INCHES).toFixed(1)}
            {isMetric ? "mm" : " inches"}
          </Title>
        </div>
      )}
      {dailyForecastView === "wind" && (
        <div
          style={{ flex: 3, display: "flex", justifyContent: "space-between" }}
        >
          <Title>
            {isMetric
              ? `${windSpeed.toFixed(1)}m/s`
              : `${(windSpeed * MPS_TO_MPH).toFixed(1)}mph`}
          </Title>
          <Title>{degreeToCompass(windDegree)}</Title>
        </div>
      )}
    </Container>
  );
};

export default DayForecast;
