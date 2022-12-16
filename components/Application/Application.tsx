import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Settings from "../Settings";
import SearchIcon from "./SearchIcon";
import AppTitle from "./AppTitle";

const Container = styled.div`
  transition: color 150ms ease-in-out;
  color: ${({ theme: { themes, theme } }) =>
    theme === "yellow" || theme === "light" ? themes.dark : themes.light};
`;

type ApplicationProps = {
  latLon: [number, number];
  isMetric: boolean;
  isSettingsOpen: boolean;
  dailyForecastView: string;
  weather: Weather;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  setDailyForecastView: Dispatch<SetStateAction<string>>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  setWeather: Dispatch<SetStateAction<Weather>>;
};

const Application = ({
  isSettingsOpen,
  setIsSettingsOpen,
  isMetric,
  setIsMetric,
  setTheme,
  latLon,
  setLatLon,
  dailyForecastView,
  setDailyForecastView,
  setCity,
  setWeather,
  weather,
}: ApplicationProps) => (
  <Container>
    <AppTitle hasWeather={weather !== null} />
    <Settings
      isSettingsOpen={isSettingsOpen}
      setIsSettingsOpen={setIsSettingsOpen}
      isMetric={isMetric}
      setIsMetric={setIsMetric}
      setTheme={setTheme}
      latLon={latLon}
      setLatLon={setLatLon}
      dailyForecastView={dailyForecastView}
      setDailyForecastView={setDailyForecastView}
      setCity={setCity}
      setWeather={setWeather}
    />
    <SearchIcon
      hasWeather={weather !== null}
      setLatLon={setLatLon}
      setIsSettingsOpen={setIsSettingsOpen}
      setWeather={setWeather}
    />
  </Container>
);

export default Application;
