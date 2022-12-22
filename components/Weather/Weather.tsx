import styled from "styled-components";

import City from "./City";
import Alerts from "./Alerts";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import Visibility from "./Visibility";
import Humidity from "./Humidity";
import SunriseSunset from "./SunriseSunset";
import Wind from "./Wind";
import Rainfall from "./Rainfall";
import FeelsLike from "./FeelsLike";
import UVIndex from "./UVIndex";
import Pressure from "./Pressure";
import AirQuality from "./AirQuality";
import Snowfall from "./Snowfall";

type WeatherProps = {
  city?: City;
  weather: Weather;
};

const WeatherItemsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WeatherItems = styled.div`
  display: grid;
  margin-bottom: 16px;
  grid-template-columns: repeat(6, 120px);
  grid-template-rows: repeat(4, 120px);
  gap: 16px;
  grid-auto-rows: 120px;
  grid-auto-columns: 120px;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.container}px) {
    grid-template-columns: repeat(4, 120px);
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-template-columns: repeat(3, 120px);
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-template-columns: repeat(2, 120px);
  }
`;

const Weather = ({ weather, city }: WeatherProps) => {
  const {
    airQuality,
    feelsLike,
    humidity,
    pressure,
    rain,
    rainLabel,
    snow,
    snowLabel,
    sunrisesSunsets,
    uvIndex,
    uvLabel,
    visibility,
    windDegree,
    windSpeed,
  } = weather.current;

  return (
    <>
      <City city={city} current={weather.current} />

      <WeatherItemsContainer>
        <WeatherItems>
          <Alerts alerts={weather?.alerts} />
          <HourlyForecast
            hourly={weather.hourly}
            hasAlerts={weather?.alerts?.length > 0}
          />
          <DailyForecast
            daily={weather.daily}
            hasAlerts={weather?.alerts?.length > 0}
          />
          <AirQuality airQuality={airQuality} />
          <UVIndex uvIndex={uvIndex} uvLabel={uvLabel} />
          <SunriseSunset sunrisesSunsets={sunrisesSunsets} />
          <Wind windDegree={windDegree} windSpeed={windSpeed} />
          {snow === 0 && <Rainfall rain={rain} rainLabel={rainLabel} />}
          {snow > 0 && <Snowfall snow={snow} snowLabel={snowLabel} />}
          <FeelsLike feelsLike={feelsLike} />
          <Humidity humidity={humidity} />
          <Visibility visibility={visibility} />
          <Pressure pressure={pressure} />
        </WeatherItems>
      </WeatherItemsContainer>
    </>
  );
};

export default Weather;
