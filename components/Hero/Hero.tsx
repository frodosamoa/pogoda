import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { KeyedMutator } from "swr";

import HeroContent from "./HeroContent";

type HeroProps = {
  city: City;
  weather: Weather;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  error: Error;
  isLoading: boolean;
  setWeather: KeyedMutator<WeatherResponse>;
};

const Container = styled.div`
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
`;

const Hero = ({
  city,
  weather,
  setLatLon,
  setCity,
  setIsSettingsOpen,
  error,
  setWeather,
  isLoading,
}: HeroProps) => (
  <Container className="hero is-fullheight">
    <div className="hero-body" onClick={() => setIsSettingsOpen(false)}>
      <div className="container is-max-desktop">
        <HeroContent
          setLatLon={setLatLon}
          setCity={setCity}
          city={city}
          weather={weather}
          error={error}
          setWeather={setWeather}
          isLoading={isLoading}
        />
      </div>
    </div>
  </Container>
);

export default Hero;
