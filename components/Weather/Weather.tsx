import styled from "styled-components";

import Loader from "../Loader";

import { fadeIn } from "../../lib/constants/animations";
import CurrentWeather from "./CurrentWeather";

import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import City from "./City";

type WeatherProps = {
  city?: City;
  isMetric: boolean;
  dailyForecastView: string;
  weather: Weather;
};

const LoaderContainer = styled.div`
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const WeatherItems = styled.div`
  display: grid;
  margin-bottom: 16px;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  grid-auto-rows: minmax(100px, auto);
`;

const Weather = ({
  weather,
  city,
  isMetric,
  dailyForecastView,
}: WeatherProps) => {
  if (!weather) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <>
      <City city={city} weather={weather} isMetric={isMetric} />

      <WeatherItems>
        <CurrentWeather current={weather.current} isMetric={isMetric} />
        <HourlyForecast hourly={weather.hourly} isMetric={isMetric} />
        <DailyForecast
          daily={weather.daily}
          isMetric={isMetric}
          dailyForecastView={dailyForecastView}
        />
      </WeatherItems>
    </>
  );
};

export default Weather;
