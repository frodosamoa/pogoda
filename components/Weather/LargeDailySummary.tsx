import { format } from "date-fns";
import styled from "styled-components";

import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../../lib/utils/weather";

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

type LargeDailySummaryProps = {
  current: CurrentWeather;
  isMetric: boolean;
};

const LargeDailySummary = ({ current, isMetric }: LargeDailySummaryProps) => {
  const { dt, sunrise, sunset, weather, temp } = current;
  const weatherIconInfo = weather && weather[0];
  let weatherLabel = getWeatherCodeIconInfo(weatherIconInfo.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  const isDay = dt > sunrise && dt < sunset;

  return (
    <>
      <Title>
        <i className={weatherToIcon(weatherIconInfo.id, isDay)}></i>{" "}
        {isMetric
          ? `${kelvinToCelcius(temp)} °C`
          : `${kelvinToFahrenheit(temp)} °F`}
      </Title>

      <Subtitle>{format(new Date(dt * 1000), `EEEE p`)}</Subtitle>
      <Subtitle>{format(new Date(dt * 1000), `MMM d`)}</Subtitle>
      <Subtitle>{weatherLabel}</Subtitle>
    </>
  );
};

export default LargeDailySummary;
