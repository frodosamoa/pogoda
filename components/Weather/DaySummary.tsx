import classNames from "classnames";
import { format } from "date-fns";
import styled from "styled-components";

import { fadeIn } from "../../lib/constants/animations";
import { MM_TO_INCHES, MPS_TO_MPH } from "../../lib/constants/conversion";

import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
  degreeToCompass,
} from "../../lib/utils/weather";

type DaySummaryProps = {
  index: number;
  day: DailyWeather;
  count: number;
  isMetric: boolean;
  dailyForecastView: string;
};

const Container = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
  animation-delay: ${({ $animationDelay = 200 }) => $animationDelay}ms;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Icon = styled.i`
  font-size: ${({ theme }) => theme.fontSizes[2]};
`;

const DaySummary = ({
  index,
  day,
  count,
  isMetric,
  dailyForecastView,
}: DaySummaryProps) => {
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

  const indexOffset = index + 1;
  const staggerNumber =
    indexOffset > count / 2 ? count - indexOffset + 1 : indexOffset;

  return (
    <Container $animationDelay={200 + staggerNumber * 100} className={"column"}>
      <div>
        <Title title={format(new Date(date * 1000), "PP")}>
          {format(new Date(date * 1000), "ccc")}
        </Title>
        <Subtitle>{format(new Date(date * 1000), "MMM d")}</Subtitle>
        <br></br>
        <p>
          <Icon
            title={getWeatherCodeIconInfo(weather.id).label}
            className={weatherToIcon(weather.id, isDay)}
          />
        </p>
        <br></br>
        <div>
          {dailyForecastView === "temperature" && (
            <>
              <Title>
                {isMetric
                  ? `${kelvinToCelcius(temp.max)} °C`
                  : `${kelvinToFahrenheit(temp.max)} °F`}
              </Title>
              <Subtitle>
                {isMetric
                  ? `${kelvinToCelcius(temp.min)} °C`
                  : `${kelvinToFahrenheit(temp.min)} °F`}
              </Subtitle>
            </>
          )}
          {dailyForecastView === "precipitation" && (
            <Subtitle>
              {isMetric
                ? (rain ?? 0).toFixed(1)
                : ((rain ?? 0) * MM_TO_INCHES).toFixed(1)}
              {isMetric ? "mm" : " inches"}
            </Subtitle>
          )}
          {dailyForecastView === "wind" && (
            <>
              <Subtitle>
                {isMetric
                  ? `${windSpeed.toFixed(1)}m/s`
                  : `${(windSpeed * MPS_TO_MPH).toFixed(1)}mph`}
              </Subtitle>
              <Subtitle>{degreeToCompass(windDegree)}</Subtitle>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DaySummary;
