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
import MoonPhase from "./MoonPhase";

import { fadeIn } from "@/lib/constants/animations";

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
  grid-template-columns: repeat(6, 125px);
  // grid-template-rows: repeat(4, 125px);
  gap: 16px;
  grid-auto-rows: 125px;
  grid-auto-columns: 125px;
  opacity: 0;

  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 400ms 1 normal forwards running
    ${fadeIn};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.container}px) {
    grid-template-columns: repeat(4, 125px);
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-template-columns: repeat(3, 125px);
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-template-columns: repeat(2, 125px);
  }

  // esample of selecting a specific child
  // & > div:nth-child(-n + 6) {
  //   // background-color: blue;
  // }
`;

const Weather = ({ weather, city }: WeatherProps) => {
  const {
    airQuality,
    airQualityLabel,
    airQualityMessage,
    dewPoint,
    feelsLike,
    humidity,
    pressure,
    rain,
    rainLabel,
    rainMessage,
    moonPhase,
    snow,
    snowLabel,
    sunrisesSunsets,
    uvIndex,
    uvLabel,
    uvMessage,
    visibility,
    visibilityUnit,
    windDirection,
    windSpeed,
    windLabel,
  } = weather.current;

  return (
    <>
      <City
        city={city}
        current={weather.current}
        min={weather.daily[0].temp.min}
        max={weather.daily[0].temp.max}
      />

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
          <AirQuality
            airQuality={airQuality}
            airQualityLabel={airQualityLabel}
            airQualityMessage={airQualityMessage}
            hasAlerts={weather?.alerts?.length > 0}
          />
          <UVIndex uvIndex={uvIndex} uvLabel={uvLabel} uvMessage={uvMessage} />
          <SunriseSunset sunrisesSunsets={sunrisesSunsets} />
          <Wind
            windDirection={windDirection}
            windSpeed={windSpeed}
            windLabel={windLabel}
          />
          {snow === 0 && (
            <Rainfall
              rain={rain}
              rainLabel={rainLabel}
              rainMessage={rainMessage}
            />
          )}
          {snow > 0 && <Snowfall snow={snow} snowLabel={snowLabel} />}
          <FeelsLike feelsLike={feelsLike} />
          <Humidity humidity={humidity} dewPoint={dewPoint} />
          <Visibility visibility={visibility} visibilityUnit={visibilityUnit} />
          <Pressure pressure={pressure} />
          <MoonPhase moonPhase={moonPhase} />
        </WeatherItems>
      </WeatherItemsContainer>
    </>
  );
};

export default Weather;
