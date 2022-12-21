import { SetStateAction, Dispatch } from "react";
import styled from "styled-components";

import Weather from "../components/Weather";
import CitySearch from "./CitySearch";

type HeroProps = {
  city: City;
  latLon: [number, number];
  weather: Weather;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Container = styled.div`
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "yellow" || theme === "light" ? themes.dark : themes.light};
`;

const Hero = ({
  city,
  latLon,
  weather,
  setLatLon,
  setCity,
  setIsSettingsOpen,
}: HeroProps) => (
  <Container className="hero is-fullheight">
    <div
      className="hero-body has-text-centered"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div className="container is-max-desktop">
        {!(latLon?.length > 0) ? (
          <CitySearch setLatLon={setLatLon} setCity={setCity} />
        ) : (
          <Weather city={city} weather={weather} />
        )}
      </div>
    </div>
  </Container>
);

export default Hero;
