import { Search as SearchIcon } from "react-feather";

import Settings from "./Settings";

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
}) => {
  return (
    <div
      className={
        theme === "warning" || theme === "light"
          ? "has-text-dark"
          : "has-text-light"
      }
    >
      <div style={{ position: "fixed", top: 24, left: 24, textAlign: "start" }}>
        <p className="is-size-4">pogoda</p>
        <p className="is-size-6">your weather dashboard</p>
      </div>
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
        className={
          latLon.length > 0 && weather ? "quick-fade-in" : "quick-fade-out"
        }
        size={42}
        onClick={() => {
          setLatLon([]);
          setWeather(null);
          setIsSettingsOpen(false);
        }}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Application;