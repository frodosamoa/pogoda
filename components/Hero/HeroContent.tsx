import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { KeyedMutator } from "swr";

import Weather from "../../components/Weather";
import { fadeIn } from "../../lib/constants/animations";
import CitySearch from "../CitySearch";
import Loader from "../Loader";

import ErrorMessage from "./ErrorMessage";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

type HeroContentProps = {
  city: City;
  weather: Weather;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  error: Error;
  isLoading: boolean;
  setWeather: KeyedMutator<WeatherResponse>;
};

const HeroContent = ({
  setLatLon,
  setCity,
  city,
  weather,
  error,
  setWeather,
  isLoading,
}: HeroContentProps) => {
  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (weather) {
    return <Weather city={city} weather={weather} />;
  }

  if (error) {
    return <ErrorMessage setLatLon={setLatLon} setWeather={setWeather} />;
  }

  return <CitySearch setLatLon={setLatLon} setCity={setCity} />;
};

export default HeroContent;
