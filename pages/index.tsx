import { useEffect, useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { UNITS, COLORS } from "../constants/theme";
import Application from "../components/Application";
import Hero from "../components/Hero";

const Home = () => {
  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [weather, setWeather] = useState<Weather>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [dailyForecastView, setDailyForecastView] = useState("temperature");

  useEffect(() => {
    const getWeather = async (latitude: number, longitude: number) => {
      const res = await fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
    };

    if (latLon?.length > 0) {
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  const providedTheme: DefaultTheme = {
    theme,
    units: UNITS,
    themes: COLORS,
  };

  return (
    <ThemeProvider theme={providedTheme}>
      <Hero
        theme={theme}
        latLon={latLon}
        setLatLon={setLatLon}
        setCity={setCity}
        setIsSettingsOpen={setIsSettingsOpen}
        city={city}
        weather={weather}
        isMetric={isMetric}
        dailyForecastView={dailyForecastView}
      />
      <Application
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        setTheme={setTheme}
        theme={theme}
        latLon={latLon}
        setLatLon={setLatLon}
        dailyForecastView={dailyForecastView}
        setDailyForecastView={setDailyForecastView}
        setCity={setCity}
        setWeather={setWeather}
        weather={weather}
      />
    </ThemeProvider>
  );
};

export default Home;
