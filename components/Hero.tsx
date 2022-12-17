import { SetStateAction, Dispatch } from "react";
import styled from "styled-components";

import Weather from "../components/Weather";
import Landing from "../components/Landing";

type HeroProps = {
  city: City;
  latLon: [number, number];
  isMetric: boolean;
  dailyForecastView: string;
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
  isMetric,
  dailyForecastView,
  setLatLon,
  setCity,
  setIsSettingsOpen,
}: HeroProps) => (
  <Container className={"hero is-fullheight"}>
    <div
      className="hero-body has-text-centered"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div className="container">
        {!(latLon?.length > 0) ? (
          <Landing setLatLon={setLatLon} setCity={setCity} />
        ) : (
          <Weather
            city={city}
            weather={weather}
            isMetric={isMetric}
            dailyForecastView={dailyForecastView}
          />
        )}
      </div>
    </div>
  </Container>
);

export default Hero;
