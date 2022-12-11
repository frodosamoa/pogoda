import styled from "styled-components";

import ADMIN_CODES from "../../constants/adminCodes";
import COUNTRIES from "../../constants/countries";
import Loader from "../Loader";

import { fadeIn, fadeUp } from "../../constants/animations";
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
          {city.adminCode
            ? `${ADMIN_CODES[`${city.country}.${city.adminCode}`]}, `
            : ""}
          {COUNTRIES[city.country]}
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
