import { Dispatch, SetStateAction } from "react";
import { Search as SearchIcon } from "react-feather";

import Settings from "./Settings";
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
  setCityName: Dispatch<SetStateAction<string>>;
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
  setCityName,
  setWeather,
  weather,
}: ApplicationProps) => {
  return (
    <div
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
        setCityName={setCityName}
        setWeather={setWeather}
      />
      <SearchIcon
        size={42}
        onClick={() => {
          setLatLon(null);
          setWeather(null);
          setIsSettingsOpen(false);
        }}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          cursor: "pointer",
          opacity: weather !== null ? 1 : 0,
          transition: "opacity 150ms ease-in-out",
        }}
      />
    </div>
  );
};

export default Application;
