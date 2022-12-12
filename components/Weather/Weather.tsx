import styled from "styled-components";

import Loader from "../Loader";

import { fadeIn } from "../../lib/constants/animations";
import CurrentWeather from "./CurrentWeather";
import DailySummary from "./DailySummary";
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
      <City city={city} />
      <CurrentWeather current={weather.current} isMetric={isMetric} />
      <DailySummary
        daily={weather.daily}
        isMetric={isMetric}
        dailyForecastView={dailyForecastView}
      />
    </>
  );
};

export default Weather;
