import { Dispatch, SetStateAction } from "react";

import Settings from "../Settings";
import SearchIcon from "./SearchIcon";
import AppTitle from "./AppTitle";

type ApplicationProps = {
  theme: Theme;
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
  theme,
  latLon,
  setLatLon,
  dailyForecastView,
  setDailyForecastView,
  setCity,
  setWeather,
  weather,
}: ApplicationProps) => (
  <div
    style={{ transition: "color 150ms ease-in-out" }}
    className={
      theme === "warning" || theme === "light"
        ? "has-text-dark"
        : "has-text-light"
    }
  >
    <AppTitle hasWeather={weather !== null} />
    <Settings
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
    />
    <SearchIcon
      hasWeather={weather !== null}
      setLatLon={setLatLon}
      setIsSettingsOpen={setIsSettingsOpen}
      setWeather={setWeather}
    />
  </div>
);

export default Application;
