import { useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { UNITS, COLORS, FONT_SIZES } from "../lib/constants/theme";
import Application from "../components/Application";
import Hero from "../components/Hero";
import useGetWeather from "../lib/hooks/useGetWeather";

const Home = () => {
  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [weather, setWeather] = useGetWeather({ latLon });
  const [theme, setTheme] = useState<Theme>("dark");
  const [dailyForecastView, setDailyForecastView] = useState("temperature");

  const providedTheme: DefaultTheme = {
    theme,
    units: UNITS,
    themes: COLORS,
    fontSizes: FONT_SIZES,
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
