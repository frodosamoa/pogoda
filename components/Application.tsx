import { Dispatch, SetStateAction } from "react";
import { Search as SearchIcon } from "react-feather";

import Settings from "./Settings";

import { THEME } from "../constants/themes";

type TitleProps = {
  weather?: object;
};

const Title = ({ weather }: TitleProps) => (
  <div
    style={{
      position: "fixed",
      top: 24,
      left: 24,
      textAlign: "start",
      opacity: weather ? 0 : 1,
      transition: "opacity 150ms ease-in-out",
    }}
  >
    <p className="is-size-4">pogoda</p>
    <p className="is-size-6">weather dashboard</p>
  </div>
);

type ApplicationProps = {
  theme: THEME;
  latLon: [number, number];
  isMetric: boolean;
  isSettingsOpen: boolean;
  dailyForecastView: string;
  weather: { daily: []; current: object };
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
  setDailyForecastView: Dispatch<SetStateAction<string>>;
  setTheme: Dispatch<SetStateAction<THEME>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  setWeather: Dispatch<SetStateAction<{ daily: []; current: object }>>;
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
      <Title />
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
          opacity: weather ? 1 : 0,
          transition: "opacity 150ms ease-in-out",
        }}
      />
    </div>
  );
};

export default Application;
