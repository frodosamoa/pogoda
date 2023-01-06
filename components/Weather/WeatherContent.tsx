import { UIEventHandler, useState, Dispatch, SetStateAction } from "react";
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
import Units from "./Units";

import { fadeIn } from "@/lib/constants/animations";

type WeatherContentProps = {
  city?: City;
  weather: Weather;
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
};

const WeatherItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100% - 200px);
  overflow: scroll;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    height: calc(100% - 160px);
  }
`;

const TopBoxShadow = styled.div<{ $show: boolean }>`
  position: absolute;
  height: 32px;
  width: 100%;
  top: 200px;
  z-index: 50;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  box-shadow: inset 0px 32px 16px -16px ${({ theme: { theme, themes } }) => themes[theme]};
  transition: opacity ease-in-out 150ms, box-shadow ease-in-out 150ms;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    top: 160px;
  }
`;

const BottomBoxShadow = styled.div<{ $show: boolean }>`
  position: absolute;
  height: 32px;
  width: 100%;
  bottom: -2px;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  box-shadow: inset 0px -32px 16px -16px
    ${({ theme: { theme, themes } }) => themes[theme]};
  transition: opacity ease-in-out 150ms, box-shadow ease-in-out 150ms;
`;

const WeatherItems = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 125px);
  gap: 16px;
  grid-auto-rows: 125px;
  grid-auto-columns: 125px;
  opacity: 0;
  height: fit-content;
  margin-bottom: 48px;

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
`;

const WeatherContent = ({
  weather,
  city,
  isMetric,
  setIsMetric,
}: WeatherContentProps) => {
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

  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(true);

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    setShowTopShadow(e.currentTarget.scrollTop > 10);
    setShowBottomShadow(
      e.currentTarget.scrollTop < e.currentTarget.scrollHeight - 10
    );
  };

  return (
    <>
      <City
        city={city}
        current={weather.current}
        min={weather.daily[0].temp.min}
        max={weather.daily[0].temp.max}
      />

      <WeatherItemsContainer onScroll={handleScroll}>
        <TopBoxShadow $show={showTopShadow} />
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
        <BottomBoxShadow $show={showBottomShadow} />
      </WeatherItemsContainer>
      <Units setIsMetric={setIsMetric} isMetric={isMetric} />
    </>
  );
};

export default WeatherContent;
