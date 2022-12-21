import { formatInTimeZone } from "date-fns-tz";
import styled from "styled-components";
import {
  getWeatherCodeIconInfo,
  kelvinToCelcius,
  kelvinToFahrenheit,
  weatherToIcon,
} from "../../../lib/utils/weather";

const Icon = styled.i`
  height: ${({ theme }) => theme.fontSizes[5]};
  font-size: ${({ theme }) => theme.fontSizes[5]};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 0 0 8.33%;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    flex: 0 0 11.11%;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    flex: 0 0 16.66%;
  }
`;

type HourForecastProps = {
  hour: HourlyForecast;
  timezone: string;
  isMetric: boolean;
  index: number;
};

const HourForecast = ({
  hour,
  timezone,
  isMetric,
  index,
}: HourForecastProps) => {
  return (
    <Container>
      <div>
        {index === 0
          ? "Now"
          : formatInTimeZone(new Date(hour.dt * 1000), timezone, "HH")}
      </div>
      <Icon
        title={getWeatherCodeIconInfo(hour.weather[0].id).label}
        className={weatherToIcon(hour.weather[0].id, false)}
      />
      <div>
        {isMetric ? kelvinToCelcius(hour.temp) : kelvinToFahrenheit(hour.temp)}°
      </div>
    </Container>
  );
};

export default HourForecast;
