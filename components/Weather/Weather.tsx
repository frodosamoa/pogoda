import styled from "styled-components";
import { KeyedMutator } from "swr";
import { Dispatch, SetStateAction } from "react";

import ErrorMessage from "./ErrorMessage";
import WeatherContent from "./WeatherContent";
import WelcomeMessage from "./WelcomeMessage";

import Loader from "@/components/Loader";
import { fadeIn } from "@/lib/constants/animations";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  height: 100%;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

type WeatherProps = {
  city?: City;
  weather: Weather;
  error: Error;
  isValidating: boolean;
  setWeather: KeyedMutator<WeatherResponse>;
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  is24hr: boolean;
  setIs24hr: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Weather = ({
  city,
  weather,
  error,
  setWeather,
  isValidating,
  isMetric,
  setIsMetric,
  is24hr,
  setIs24hr,
  setLatLon,
  setCity,
}: WeatherProps) => {
  if (isValidating) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (error) {
    return <ErrorMessage setWeather={setWeather} />;
  }

  if (weather) {
    return (
      <WeatherContent
        city={city}
        weather={weather}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        is24hr={is24hr}
        setIs24hr={setIs24hr}
      />
    );
  }

  return <WelcomeMessage setLatLon={setLatLon} setCity={setCity} />;
};

export default Weather;
