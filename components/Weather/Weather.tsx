import styled from "styled-components";

import Loader from "../Loader";

import { fadeIn, fadeUp } from "../../lib/constants/animations";
import CurrentWeather from "./CurrentWeather";
import DailySummary from "./DailySummary";

type WeatherProps = {
  city: City;
  isMetric: boolean;
  dailyForecastView: string;
  weather: Weather;
};

const LoaderContainer = styled.div`
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const StyledP = styled.p`
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeUp};
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
      <div style={{ padding: 24 }}>
        <StyledP className="is-size-2">{city.name}</StyledP>
        <StyledP className="is-size-3">
          {city.administrativeName ? `${city.administrativeName}, ` : ""}
          {city.countryName}
        </StyledP>
      </div>
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
