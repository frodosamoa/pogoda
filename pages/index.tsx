import { useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { DEFAULT_THEME } from "../lib/constants/theme";
import Application from "../components/Application";
import Hero from "../components/Hero";
import useGetWeather from "../lib/hooks/useGetWeather";

const Home = () => {
  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [weather, setWeather] = useGetWeather({ latLon, isMetric });
  const [theme, setTheme] = useState<Theme>("dark");

  const providedTheme: DefaultTheme = {
    theme,
    ...DEFAULT_THEME,
  };

  return (
    <ThemeProvider theme={providedTheme}>
      <Hero
        latLon={latLon}
        setLatLon={setLatLon}
        setCity={setCity}
        setIsSettingsOpen={setIsSettingsOpen}
        city={city}
        weather={weather}
      />
      <Application
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        setTheme={setTheme}
        latLon={latLon}
        setLatLon={setLatLon}
        setCity={setCity}
        setWeather={setWeather}
        weather={weather}
      />
    </ThemeProvider>
  );
};

export default Home;
